import Context from "./../Context";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as NS from "./../NS";
import * as ObjectSchema from "./../ObjectSchema";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

import Authenticator from "./Authenticator";
import AuthenticationToken from "./AuthenticationToken";
import BasicAuthenticator from "./BasicAuthenticator";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as Token from "./Token";
import * as TokenCredentials from "./TokenCredentials";
import * as Credentials from "./Credentials";

export class Class implements Authenticator<UsernameAndPasswordToken> {
	private static TOKEN_CONTAINER:string = "auth-tokens/";

	private context:Context;
	private basicAuthenticator:BasicAuthenticator;
	private credentials:TokenCredentials.Class;

	constructor( context:Context ) {
		if( context === null ) throw new Errors.IllegalArgumentError( "context cannot be null" );

		this.context = context;
		this.basicAuthenticator = new BasicAuthenticator();
	}

	isAuthenticated():boolean {
		return !! this.credentials && this.credentials.token.expirationTime > new Date();
	}

	authenticate( authenticationToken:UsernameAndPasswordToken ):Promise<TokenCredentials.Class> {
		return this.basicAuthenticator.authenticate( authenticationToken ).then(
			( credentials:Credentials.Class ):Promise<[ Token.Class, HTTP.Response.Class ]> => {
				return this.createToken();
			}
		).then(
			( [ token, response ]:[ Token.Class, HTTP.Response.Class ] ):TokenCredentials.Class => {
				this.credentials = new TokenCredentials.Class( token );

				this.basicAuthenticator.clearAuthentication();

				return this.credentials;
			}
		);
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options {
		let headers:Map<string, HTTP.Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();

		this.addTokenAuthenticationHeader( headers );

		return requestOptions;
	}

	clearAuthentication():void {
		this.credentials = null;
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

		return HTTP.Request.Service.post( uri, null, requestOptions, new HTTP.JSONLDParser.Class() ).then( ( [ expandedResult, response ]:[ Object, HTTP.Response.Class ] ) => {
			let expandedNodes:RDF.Node.Class[] = RDF.Document.Util.getResources( expandedResult );

			expandedNodes = expandedNodes.filter( Token.Factory.hasRDFClass );

			if( expandedNodes.length === 0 ) throw new HTTP.Errors.BadResponseError( "No '" + Token.RDF_CLASS + "' was returned.", response );
			if( expandedNodes.length > 1 ) throw new HTTP.Errors.BadResponseError( "Multiple '" + Token.RDF_CLASS + "' were returned. ", response );

			let expandedToken:RDF.Node.Class = expandedNodes[ 0 ];
			let token:Token.Class = Token.Factory.decorate( {} );

			let digestedSchema:ObjectSchema.DigestedObjectSchema = this.context.documents.getSchemaFor( expandedToken );

			this.context.documents.jsonldConverter.compact( expandedToken, token, digestedSchema, this.context.documents );

			return [ token, response ];
		} );
	}

	private addTokenAuthenticationHeader( headers:Map<string, HTTP.Header.Class> ):Map<string, HTTP.Header.Class> {
		let header:HTTP.Header.Class;
		if( headers.has( "Authorization" ) ) {
			header = headers.get( "Authorization" );
		} else {
			header = new HTTP.Header.Class();
			headers.set( "Authorization", header );
		}
		let authorization:string = "Token " + this.credentials.token.key;
		header.values.push( new HTTP.Header.Value( authorization ) );

		return headers;
	}
}

export default Class;
