import { Context } from "../Context";
import * as Errors from "../Errors";
import { FreeResources } from "../FreeResources";
import { BadResponseError } from "../HTTP/Errors";
import {
	RequestOptions,
	RequestService,
	RequestUtils
} from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { JSONLDParser } from "../JSONLD/Parser";
import * as ObjectSchema from "../ObjectSchema";
import { RDFNode } from "../RDF/Node";
import { URI } from "../RDF/URI";
import { Resource } from "../Resource";
import * as Utils from "../Utils";
import { LDP } from "../Vocabularies/LDP";
import { Authenticator } from "./Authenticator";
import { AuthMethod } from "./AuthMethod";
import { BasicAuthenticator } from "./BasicAuthenticator";
import { BasicCredentials } from "./BasicCredentials";
import { BasicToken } from "./BasicToken";
import * as PersistedUser from "./PersistedUser";
import * as Roles from "./Roles";
import * as Ticket from "./Ticket";
import TokenAuthenticator from "./TokenAuthenticator";
import * as TokenCredentials from "./TokenCredentials";
import * as Users from "./Users";

export class AuthService {
	public users:Users.Class;
	public roles:Roles.Class;

	protected _authenticatedUser:PersistedUser.Class;

	private context:Context;
	private authenticators:{ [ P in AuthMethod ]:Authenticator<object, object> };
	private authenticator:Authenticator<object, object>;

	public get authenticatedUser():PersistedUser.Class {
		if( this._authenticatedUser ) return this._authenticatedUser;
		if( this.context.parentContext ) return this.context.parentContext.auth.authenticatedUser;

		return null;
	}

	constructor( context:Context ) {
		this.roles = new Roles.Class( this.context );
		this.users = new Users.Class( this.context );

		this.context = context;

		this.authenticators = {
			[ AuthMethod.BASIC ]: new BasicAuthenticator(),
			[ AuthMethod.TOKEN ]: new TokenAuthenticator( this.context ),
		};
	}

	isAuthenticated( askParent:boolean = true ):boolean {
		return (
			(this.authenticator && this.authenticator.isAuthenticated()) ||
			(askParent && ! ! this.context.parentContext && ! ! this.context.parentContext.auth && this.context.parentContext.auth.isAuthenticated())
		);
	}

	authenticate( username:string, password:string ):Promise<TokenCredentials.Class> {
		return this.authenticateUsing( AuthMethod.TOKEN, username, password );
	}

	authenticateUsing( method:AuthMethod.BASIC, username:string, password:string ):Promise<BasicCredentials>;
	authenticateUsing( method:AuthMethod.TOKEN, username:string, password:string ):Promise<TokenCredentials.Class>;
	authenticateUsing( method:AuthMethod.TOKEN, token:TokenCredentials.Class ):Promise<TokenCredentials.Class>;
	authenticateUsing( method:AuthMethod, userOrCredentials:string | TokenCredentials.Class, password?:string ):Promise<BasicCredentials | TokenCredentials.Class> {
		switch( method ) {
			case AuthMethod.BASIC:
				return this.authenticateWithBasic( userOrCredentials as string, password );
			case AuthMethod.TOKEN:
				return this.authenticateWithToken( userOrCredentials, password );
			default:
				return Promise.reject( new Errors.IllegalArgumentError( `Unsupported authentication method "${method}"` ) );
		}
	}

	addAuthentication( requestOptions:RequestOptions ):void {
		if( this.isAuthenticated( false ) ) {
			this.authenticator.addAuthentication( requestOptions );
		} else if( ! ! this.context.parentContext && ! ! this.context.parentContext.auth ) {
			this.context.parentContext.auth.addAuthentication( requestOptions );
		} else {
			console.warn( "There is no authentication to add to the request." );
		}
	}

	clearAuthentication():void {
		if( ! this.authenticator ) return;

		this.authenticator.clearAuthentication();
		this.authenticator = null;
		this._authenticatedUser = null;
	}

	createTicket( uri:string, requestOptions:RequestOptions = {} ):Promise<[ Ticket.Class, Response ]> {
		const resourceURI:string = this.context.resolve( uri );

		const freeResources:FreeResources = FreeResources.create( this.context.documents );
		Ticket.Factory.createFrom( freeResources.createResource(), resourceURI );

		if( this.isAuthenticated() ) this.addAuthentication( requestOptions );
		RequestUtils.setAcceptHeader( "application/ld+json", requestOptions );
		RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );
		RequestUtils.setPreferredInteractionModel( LDP.RDFSource, requestOptions );

		return Utils.promiseMethod( () => {
			const containerURI:string = this.context._resolvePath( "system.security" ) + Ticket.TICKETS_CONTAINER;
			const body:string = JSON.stringify( freeResources );

			return RequestService.post( containerURI, body, requestOptions, new JSONLDParser() );
		} ).then<[ Ticket.Class, Response ]>( ( [ expandedResult, response ]:[ any, Response ] ) => {
			const freeNodes:RDFNode[] = RDFNode.getFreeNodes( expandedResult );

			const ticketNodes:RDFNode[] = freeNodes.filter( freeNode => RDFNode.hasType( freeNode, Ticket.RDF_CLASS ) );
			if( ticketNodes.length === 0 ) throw new BadResponseError( `No ${ Ticket.RDF_CLASS } was returned.`, response );
			if( ticketNodes.length > 1 ) throw new BadResponseError( `Multiple ${ Ticket.RDF_CLASS } were returned.`, response );

			const expandedTicket:RDFNode = ticketNodes[ 0 ];
			const ticket:Ticket.Class = <any> Resource.create();

			const digestedSchema:ObjectSchema.DigestedObjectSchema = this.context.documents.getSchemaFor( expandedTicket );
			this.context.documents.jsonldConverter.compact( expandedTicket, ticket, digestedSchema, this.context.documents );

			return [ ticket, response ];
		} )
			.catch( error => this.context.documents._parseErrorResponse( error ) );
	}

	getAuthenticatedURL( uri:string, requestOptions?:RequestOptions ):Promise<string> {
		let resourceURI:string = this.context.resolve( uri );

		return this.createTicket( resourceURI, requestOptions ).then( ( [ ticket ]:[ Ticket.Class, Response ] ) => {
			resourceURI += URI.hasQuery( resourceURI ) ? "&" : "?";
			resourceURI += `ticket=${ ticket.ticketKey }`;

			return resourceURI;
		} );
	}

	private authenticateWithBasic( username:string, password:string ):Promise<BasicCredentials> {
		const authenticator:BasicAuthenticator = <BasicAuthenticator> this.authenticators[ AuthMethod.BASIC ];
		const authenticationToken:BasicToken = new BasicToken( username, password );

		this.clearAuthentication();

		let newCredentials:BasicCredentials;
		return authenticator
			.authenticate( authenticationToken )
			.then( ( credentials:BasicCredentials ) => {
				newCredentials = credentials;

				return this.getAuthenticatedUser( authenticator );
			} )
			.then( ( persistedUser:PersistedUser.Class ) => {
				this._authenticatedUser = persistedUser;
				this.authenticator = authenticator;

				return newCredentials;
			} )
			;
	}

	private authenticateWithToken( userOrCredentials:string | TokenCredentials.Class, password?:string ):Promise<TokenCredentials.Class> {
		const authenticator:TokenAuthenticator = <TokenAuthenticator> this.authenticators[ AuthMethod.TOKEN ];
		const tokenOrCredentials:BasicToken | TokenCredentials.Class | Error = Utils.isString( userOrCredentials ) ?
			new BasicToken( userOrCredentials, password ) :
			TokenCredentials.Factory.hasClassProperties( userOrCredentials ) ?
				userOrCredentials :
				new Errors.IllegalArgumentError( "The token credentials provided in not valid." );

		if( tokenOrCredentials instanceof Error ) return Promise.reject( tokenOrCredentials );
		this.clearAuthentication();

		let newCredentials:TokenCredentials.Class;
		return authenticator.authenticate( tokenOrCredentials ).then( ( credentials:TokenCredentials.Class ) => {
			newCredentials = credentials;

			if( PersistedUser.Factory.is( credentials.user ) ) return credentials.user;
			return this.getAuthenticatedUser( authenticator );
		} ).then( ( persistedUser:PersistedUser.Class ) => {
			this._authenticatedUser = persistedUser;
			this.authenticator = authenticator;

			newCredentials.user = persistedUser;
			return newCredentials;
		} );
	}

	private getAuthenticatedUser( authenticator:Authenticator<object, object> ):Promise<PersistedUser.Class> {
		const requestOptions:RequestOptions = {};
		authenticator.addAuthentication( requestOptions );

		return this.users.get( "me/", requestOptions );
	}

}
