import * as ACE from "./Auth/ACE";
import * as ACL from "./Auth/ACL";
import * as User from "./Auth/User";
import * as Users from "./Auth/Users";
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as PersistedACE from "./Auth/PersistedACE";
import * as PersistedACL from "./Auth/PersistedACL";
import * as PersistedUser from "./Auth/PersistedUser";
import * as PersistedRole from "./Auth/PersistedRole";
import * as Role from "./Auth/Role";
import * as Roles from "./Auth/Roles";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import * as Ticket from "./Auth/Ticket";
import * as Token from "./Auth/Token";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import Credentials from "./Auth/Credentials";

import Context from "./Context";
import * as ObjectSchema from "./ObjectSchema";
import * as Errors from "./Errors";
import * as FreeResources from "./FreeResources";
import * as JSONLD from "./JSONLD";
import * as HTTP from "./HTTP";
import * as NS from "./NS";
import * as Resource from "./Resource";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export {
	ACE,
	ACL,
	User,
	Users,
	AuthenticationToken,
	Authenticator,
	BasicAuthenticator,
	PersistedACE,
	PersistedACL,
	PersistedUser,
	PersistedRole,
	Role,
	Roles,
	Ticket,
	Token,
	TokenAuthenticator,
	UsernameAndPasswordToken
};

export enum Method {
	BASIC,
	TOKEN,
}

export class Class {
	public users:Users.Class;
	public roles:Roles.Class;

	protected _authenticatedUser:PersistedUser.Class;

	private context:Context;
	private method:Method;
	private authenticators:Array<Authenticator<AuthenticationToken>>;
	private authenticator:Authenticator<AuthenticationToken>;

	public get authenticatedUser():PersistedUser.Class {
		if( ! this._authenticatedUser ) {
			if( this.context.parentContext && this.context.parentContext.auth ) return this.context.parentContext.auth.authenticatedUser;
			return null;
		}
		return this._authenticatedUser;
	}

	constructor( context:Context ) {
		this.roles = new Roles.Class( this.context );
		this.users = new Users.Class( this.context );

		this.context = context;

		this.authenticators = [];
		this.authenticators[ Method.BASIC ] = new BasicAuthenticator();
		this.authenticators[ Method.TOKEN ] = new TokenAuthenticator( this.context );
	}

	isAuthenticated( askParent:boolean = true ):boolean {
		return (
			( this.authenticator && this.authenticator.isAuthenticated() ) ||
			( askParent && ! ! this.context.parentContext && ! ! this.context.parentContext.auth && this.context.parentContext.auth.isAuthenticated() )
		);
	}

	authenticate( username:string, password:string ):Promise<Token.Class> {
		return this.authenticateUsing( "TOKEN", username, password );
	}

	authenticateUsing( method:"BASIC", username:string, password:string ):Promise<UsernameAndPasswordCredentials>;
	authenticateUsing( method:"TOKEN", username:string, password:string ):Promise<Token.Class>;

	authenticateUsing( method:"TOKEN", token:Token.Class ):Promise<Token.Class>;

	// TODO remove non-specific overloads. Reference https://github.com/Microsoft/TypeScript/pull/6278, seems to be added for 1.9
	authenticateUsing( method:string, username:string, password:string ):Promise<Credentials>;
	authenticateUsing( method:string, token:Credentials ):Promise<Credentials>;

	authenticateUsing( method:string, userOrTokenOrCredentials:any, password?:string ):Promise<any> {
		switch( method ) {
			case "BASIC":
				return this.authenticateWithBasic( userOrTokenOrCredentials, password );
			case "TOKEN":
				return this.authenticateWithToken( userOrTokenOrCredentials, password );
			default:
				return Promise.reject( new Errors.IllegalArgumentError( `No exists the authentication method '${method}'` ) );
		}
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):void {
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

	createTicket( uri:string, requestOptions:HTTP.Request.Options = {} ):Promise<[ Ticket.Class, HTTP.Response.Class ]> {
		let resourceURI:string = this.context.resolve( uri );
		let containerURI:string = this.context.resolve( Ticket.TICKETS_CONTAINER );

		let freeResources:FreeResources.Class = FreeResources.Factory.create( this.context.documents );
		Ticket.Factory.createFrom( freeResources.createResource(), resourceURI );

		if( this.isAuthenticated() ) this.addAuthentication( requestOptions );
		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( NS.LDP.Class.RDFSource, requestOptions );

		return HTTP.Request.Service.post( containerURI, freeResources.toJSON(), requestOptions, new JSONLD.Parser.Class() ).then( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
			let freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );

			let ticketNodes:RDF.Node.Class[] = freeNodes.filter( freeNode => RDF.Node.Util.hasType( freeNode, Ticket.RDF_CLASS ) );

			if( ticketNodes.length === 0 ) throw new HTTP.Errors.BadResponseError( `No ${ Ticket.RDF_CLASS } was returned.`, response );
			if( ticketNodes.length > 1 ) throw new HTTP.Errors.BadResponseError( `Multiple ${ Ticket.RDF_CLASS } were returned.`, response );

			let expandedTicket:RDF.Node.Class = ticketNodes[ 0 ];
			let ticket:Ticket.Class = <any> Resource.Factory.create();

			let digestedSchema:ObjectSchema.DigestedObjectSchema = this.context.documents.getSchemaFor( expandedTicket );

			this.context.documents.jsonldConverter.compact( expandedTicket, ticket, digestedSchema, this.context.documents );

			return [ ticket, response ];
		} );
	}

	getAuthenticatedURL( uri:string, requestOptions?:HTTP.Request.Options ):Promise<string> {
		let resourceURI:string = this.context.resolve( uri );

		return this.createTicket( resourceURI, requestOptions ).then( ( [ ticket, response ]:[ Ticket.Class, HTTP.Response.Class ] ) => {
			resourceURI += RDF.URI.Util.hasQuery( resourceURI ) ? "&" : "?";
			resourceURI += `ticket=${ ticket.ticketKey }`;

			return resourceURI;
		} );
	}

	private authenticateWithBasic( username:string, password:string ):Promise<UsernameAndPasswordCredentials> {
		let authenticator:BasicAuthenticator = <BasicAuthenticator> this.authenticators[ Method.BASIC ];
		let authenticationToken:UsernameAndPasswordToken;

		authenticationToken = new UsernameAndPasswordToken( username, password );
		this.clearAuthentication();

		let credentials:UsernameAndPasswordCredentials;
		return authenticator.authenticate( authenticationToken ).then( ( _credentials:UsernameAndPasswordCredentials ) => {
			credentials = _credentials;
			return this.getAuthenticatedUser( authenticator );
		} ).then( ( persistedUser:PersistedUser.Class ) => {
			this._authenticatedUser = persistedUser;
			this.authenticator = authenticator;
			return credentials;
		} );
	}

	private authenticateWithToken( userOrTokenOrCredentials:any, password:string ):Promise<Token.Class> {
		let authenticator:TokenAuthenticator = <TokenAuthenticator> this.authenticators[ Method.TOKEN ];
		let credentials:Token.Class = null;
		let authenticationToken:UsernameAndPasswordToken = null;

		if( Utils.isString( userOrTokenOrCredentials ) && Utils.isString( password ) ) {
			authenticationToken = new UsernameAndPasswordToken( userOrTokenOrCredentials, password );

		} else if( Token.Factory.hasRequiredValues( userOrTokenOrCredentials ) ) {
			credentials = userOrTokenOrCredentials;

		} else {
			return Promise.reject<Token.Class>( new Errors.IllegalArgumentError( "Parameters do not match with the authentication request." ) );
		}

		this.clearAuthentication();
		return authenticator.authenticate( ( authenticationToken ) ? authenticationToken : <any> credentials ).then( ( _credentials:Token.Class ) => {
			credentials = _credentials;

			if( PersistedUser.Factory.is( credentials.user ) ) return credentials.user;
			return this.getAuthenticatedUser( authenticator );

		} ).then( ( persistedUser:PersistedUser.Class ) => {
			this._authenticatedUser = persistedUser;
			credentials.user = persistedUser;

			this.authenticator = authenticator;
			return credentials;
		} );
	}

	private getAuthenticatedUser( authenticator:Authenticator<any> ):Promise<PersistedUser.Class> {
		let requestOptions:HTTP.Request.Options = {};
		authenticator.addAuthentication( requestOptions );

		return this.context.documents.get<PersistedUser.Class>( "users/me/", requestOptions ).then(
			( [ userDocument, response ]:[ PersistedUser.Class, HTTP.Response.Class ] ) => userDocument
		);
	}

}

export default Class;
