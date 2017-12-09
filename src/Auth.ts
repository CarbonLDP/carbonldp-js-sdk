import * as ACE from "./Auth/ACE";
import * as ACL from "./Auth/ACL";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import * as Credentials from "./Auth/Credentials";
import * as PersistedACE from "./Auth/PersistedACE";
import * as PersistedACL from "./Auth/PersistedACL";
import * as PersistedCredentials from "./Auth/PersistedCredentials";
import * as PersistedRole from "./Auth/PersistedRole";
import * as PersistedUser from "./Auth/PersistedUser";
import * as Role from "./Auth/Role";
import * as Roles from "./Auth/Roles";
import * as Ticket from "./Auth/Ticket";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import * as TokenCredentials from "./Auth/TokenCredentials";
import * as User from "./Auth/User";
import UsernameAndPasswordCredentials from "./Auth/UsernameAndPasswordCredentials";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";
import * as Users from "./Auth/Users";

import Context from "./Context";
import * as Errors from "./Errors";
import * as FreeResources from "./FreeResources";
import * as HTTP from "./HTTP";
import * as JSONLD from "./JSONLD";
import * as NS from "./NS";
import * as ObjectSchema from "./ObjectSchema";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as Utils from "./Utils";

export {
	ACE,
	ACL,
	User,
	Users,
	Authenticator,
	BasicAuthenticator,
	Credentials,
	PersistedACE,
	PersistedACL,
	PersistedCredentials,
	PersistedRole,
	PersistedUser,
	Role,
	Roles,
	Ticket,
	TokenCredentials,
	TokenAuthenticator,
	UsernameAndPasswordToken
};

export enum Method {
	BASIC = "BASIC",
	TOKEN = "TOKEN",
}

export class Class {
	public users:Users.Class;
	public roles:Roles.Class;

	protected _authenticatedUser:PersistedUser.Class;

	private context:Context;
	private authenticators:{ [ P in Method ]:Authenticator<object, object> };
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
			[ Method.BASIC ]: new BasicAuthenticator(),
			[ Method.TOKEN ]: new TokenAuthenticator( this.context ),
		};
	}

	isAuthenticated( askParent:boolean = true ):boolean {
		return (
			(this.authenticator && this.authenticator.isAuthenticated()) ||
			(askParent && ! ! this.context.parentContext && ! ! this.context.parentContext.auth && this.context.parentContext.auth.isAuthenticated())
		);
	}

	authenticate( username:string, password:string ):Promise<TokenCredentials.Class> {
		return this.authenticateUsing( Method.TOKEN, username, password );
	}

	authenticateUsing( method:Method.BASIC, username:string, password:string ):Promise<UsernameAndPasswordCredentials>;
	authenticateUsing( method:Method.TOKEN, username:string, password:string ):Promise<TokenCredentials.Class>;
	authenticateUsing( method:Method.TOKEN, token:TokenCredentials.Class ):Promise<TokenCredentials.Class>;
	authenticateUsing( method:Method, userOrCredentials:string | TokenCredentials.Class, password?:string ):Promise<UsernameAndPasswordCredentials | TokenCredentials.Class> {
		switch( method ) {
			case Method.BASIC:
				return this.authenticateWithBasic( userOrCredentials as string, password );
			case Method.TOKEN:
				return this.authenticateWithToken( userOrCredentials, password );
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

		let freeResources:FreeResources.Class = FreeResources.Factory.create( this.context.documents );
		Ticket.Factory.createFrom( freeResources.createResource(), resourceURI );

		if( this.isAuthenticated() ) this.addAuthentication( requestOptions );
		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setContentTypeHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( NS.LDP.Class.RDFSource, requestOptions );

		return Promise.resolve().then( () => {
			const containerURI:string = this.context.resolveSystemURI( Ticket.TICKETS_CONTAINER );
			return HTTP.Request.Service.post( containerURI, freeResources.toJSON(), requestOptions, new JSONLD.Parser.Class() )
				.catch( response => this.context.documents._parseErrorResponse( response ) );
		} ).then<[ Ticket.Class, HTTP.Response.Class ]>( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
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

		return this.createTicket( resourceURI, requestOptions ).then( ( [ ticket ]:[ Ticket.Class, HTTP.Response.Class ] ) => {
			resourceURI += RDF.URI.Util.hasQuery( resourceURI ) ? "&" : "?";
			resourceURI += `ticket=${ ticket.ticketKey }`;

			return resourceURI;
		} );
	}

	_resolveSecurityURL( relativeURI:string ):string {
		if( ! this.context.hasSetting( "system.security.container" ) ) throw new Errors.IllegalStateError( `The "system.security.container" setting hasn't been defined.` );
		const securityContainer:string = this.context.resolveSystemURI( this.context.getSetting( "system.security.container" ) );

		const securityURI:string = RDF.URI.Util.resolve( securityContainer, relativeURI );
		if( ! securityURI.startsWith( securityContainer ) ) throw new Errors.IllegalArgumentError( `The provided URI "${ relativeURI }" doesn't belong to the security container.` );

		return securityURI;
	}

	private authenticateWithBasic( username:string, password:string ):Promise<UsernameAndPasswordCredentials> {
		const authenticator:BasicAuthenticator = <BasicAuthenticator> this.authenticators[ Method.BASIC ];
		const authenticationToken:UsernameAndPasswordToken = new UsernameAndPasswordToken( username, password );

		this.clearAuthentication();

		let newCredentials:UsernameAndPasswordCredentials;
		return authenticator.authenticate( authenticationToken ).then( ( credentials:UsernameAndPasswordCredentials ) => {
			newCredentials = credentials;

			return this.getAuthenticatedUser( authenticator );
		} ).then( ( persistedUser:PersistedUser.Class ) => {
			this._authenticatedUser = persistedUser;
			this.authenticator = authenticator;

			return newCredentials;
		} );
	}

	private authenticateWithToken( userOrCredentials:string | TokenCredentials.Class, password?:string ):Promise<TokenCredentials.Class> {
		const authenticator:TokenAuthenticator = <TokenAuthenticator> this.authenticators[ Method.TOKEN ];
		const tokenOrCredentials:UsernameAndPasswordToken | TokenCredentials.Class | Error = Utils.isString( userOrCredentials ) ?
			new UsernameAndPasswordToken( userOrCredentials, password ) :
			TokenCredentials.Factory.hasClassProperties( userOrCredentials ) ?
				userOrCredentials :
				new Errors.IllegalArgumentError( "The token provided in not valid." );

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
		const requestOptions:HTTP.Request.Options = {};
		authenticator.addAuthentication( requestOptions );

		return this.context.documents
			.get<PersistedUser.Class>( "users/me/", requestOptions )
			.then( ( [ persistedUser ]:[ PersistedUser.Class, HTTP.Response.Class ] ) => persistedUser );
	}

}

export default Class;
