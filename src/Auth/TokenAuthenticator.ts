import Context from "./../Context";
import * as Errors from "./../Errors";
import * as FreeResources from "./../FreeResources";
import * as HTTP from "./../HTTP";
import * as LDP from "./../LDP";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedDocument from "./../PersistedDocument";
import * as RDF from "./../RDF";
import * as Resource from "./../Resource";
import Authenticator from "./Authenticator";
import AuthenticationToken from "./AuthenticationToken";
import BasicAuthenticator from "./BasicAuthenticator";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as Token from "./Token";
import * as Credentials from "./Credentials";
import * as Utils from "./../Utils";

export class Class implements Authenticator<UsernameAndPasswordToken> {
	private static TOKEN_CONTAINER:string = "auth-tokens/";

	private context:Context;
	private basicAuthenticator:BasicAuthenticator;
	private _credentials:Token.Class;

	constructor( context:Context ) {
		if( context === null ) throw new Errors.IllegalArgumentError( "context cannot be null" );

		this.context = context;
		this.basicAuthenticator = new BasicAuthenticator();
	}

	isAuthenticated():boolean {
		return ! ! this._credentials && this._credentials.expirationTime > new Date();
	}

	authenticate( authenticationToken:UsernameAndPasswordToken ):Promise<Token.Class>;
	authenticate( credentials:Token.Class ):Promise<Token.Class>;
	authenticate( authenticationOrCredentials:any ):Promise<Token.Class> {
		if( authenticationOrCredentials instanceof UsernameAndPasswordToken ) return this.basicAuthenticator.authenticate( authenticationOrCredentials ).then( () => {
			return this.createToken();
		} ).then( ( [ token, response ]:[ Token.Class, HTTP.Response.Class ] ):Token.Class => {
			this.basicAuthenticator.clearAuthentication();
			this._credentials = token;
			return token;
		} );

		let credentials:Token.Class = <Token.Class> authenticationOrCredentials;
		if( Utils.isString( credentials.expirationTime ) ) authenticationOrCredentials.expirationTime = new Date( <any> credentials.expirationTime );
		if( credentials.expirationTime <= new Date() ) return Promise.reject<any>( new Errors.IllegalArgumentError( "The token provided in not valid." ) );

		this._credentials = credentials;
		return Promise.resolve( credentials );
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options {
		let headers:Map<string, HTTP.Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();

		this.addTokenAuthenticationHeader( headers );

		return requestOptions;
	}

	clearAuthentication():void {
		this._credentials = null;
	}

	supports( authenticationToken:AuthenticationToken ):boolean {
		return authenticationToken instanceof UsernameAndPasswordToken;
	}

	private createToken():Promise<[ Token.Class, HTTP.Response.Class ]> {
		let uri:string = this.context.resolve( Class.TOKEN_CONTAINER );
		let requestOptions:HTTP.Request.Options = {};

		this.basicAuthenticator.addAuthentication( requestOptions );

		HTTP.Request.Util.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Util.setPreferredInteractionModel( NS.LDP.Class.RDFSource, requestOptions );

		return HTTP.Request.Service.post( uri, null, requestOptions, new HTTP.JSONLDParser.Class() ).then( ( [ expandedResult, response ]:[ any, HTTP.Response.Class ] ) => {
			let freeNodes:RDF.Node.Class[] = RDF.Node.Util.getFreeNodes( expandedResult );

			let freeResources:FreeResources.Class = this.context.documents._getFreeResources( freeNodes );
			let tokenResources:Token.Class[] = <Token.Class[]> freeResources.getResources().filter( resource => Resource.Util.hasType( resource, Token.RDF_CLASS ) );

			if( tokenResources.length === 0 ) throw new HTTP.Errors.BadResponseError( "No '" + Token.RDF_CLASS + "' was returned.", response );
			if( tokenResources.length > 1 ) throw new HTTP.Errors.BadResponseError( "Multiple '" + Token.RDF_CLASS + "' were returned. ", response );
			let token:Token.Class = tokenResources[ 0 ];

			let agentDocuments:RDF.Document.Class[] = RDF.Document.Util.getDocuments( expandedResult ).filter( rdfDocument => rdfDocument[ "@id" ] === token.agent.id );
			agentDocuments.forEach( document => this.context.documents._getPersistedDocument( document, response ) );

			let responseMetadata:LDP.ResponseMetadata.Class = <LDP.ResponseMetadata.Class> freeResources.getResources().find( resource => Resource.Util.hasType( resource, LDP.ResponseMetadata.RDF_CLASS ) );
			responseMetadata.resourcesMetadata.forEach( ( resourceMetadata:LDP.ResourceMetadata.Class ) => {
				(<PersistedDocument.Class> resourceMetadata.resource)._etag = resourceMetadata.eTag;
			} );

			return [ token, response ];
		} );
	}

	private addTokenAuthenticationHeader( headers:Map<string, HTTP.Header.Class> ):Map<string, HTTP.Header.Class> {
		let header:HTTP.Header.Class;
		if( headers.has( "authorization" ) ) {
			header = headers.get( "authorization" );
		} else {
			header = new HTTP.Header.Class();
			headers.set( "authorization", header );
		}
		let authorization:string = "Token " + this._credentials.key;
		header.values.push( new HTTP.Header.Value( authorization ) );

		return headers;
	}
}

export default Class;
