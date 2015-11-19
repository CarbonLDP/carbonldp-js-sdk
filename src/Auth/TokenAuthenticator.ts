import * as HTTP from "./../HTTP";
import * as Errors from "./../Errors";
import * as NS from "./../NS";
import Context from "./../Context";
import * as RDF from "./../RDF";
import * as Utils from "./../Utils";

import Authenticator from "./Authenticator";
import AuthenticationToken from "./AuthenticationToken";
import BasicAuthenticator from "./BasicAuthenticator";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as Token from "./Token";

export class Class implements Authenticator<UsernameAndPasswordToken> {
	private static TOKEN_CONTAINER:string = "auth-tokens/";

	private context:Context;
	private basicAuthenticator:BasicAuthenticator;
	private token:Token.Class;

	constructor( context:Context ) {
		if( context === null ) throw new Errors.IllegalArgumentError( "context cannot be null" );

		this.context = context;
		this.basicAuthenticator = new BasicAuthenticator();
	}

	isAuthenticated():boolean {
		return !! this.token && this.token.expirationTime > new Date();
	}

	authenticate( authenticationToken:UsernameAndPasswordToken ):Promise<void> {
		return this.basicAuthenticator.authenticate( authenticationToken ).then(
			():Promise<HTTP.ProcessedResponse<Token.Class>> => {
				return this.createToken();
			}
		).then(
			( processedResponse:HTTP.ProcessedResponse<Token.Class> ):void => {
				this.token = processedResponse.result;
			}
		);
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options {
		let headers:Map<string, HTTP.Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();

		this.addTokenAuthenticationHeader( headers );

		return requestOptions;
	}

	clearAuthentication():void {
		this.token = null;
	}

	supports( authenticationToken:AuthenticationToken ):boolean {
		return authenticationToken instanceof UsernameAndPasswordToken;
	}

	private createToken():Promise<HTTP.ProcessedResponse<Token.Class>> {
		let uri:string = this.context.resolve( Class.TOKEN_CONTAINER );
		let requestOptions:HTTP.Request.Options = {};

		this.basicAuthenticator.addAuthentication( requestOptions );

		HTTP.Request.Service.setAcceptHeader( "application/ld+json", requestOptions );
		HTTP.Request.Service.setPreferredInteractionModel( NS.LDP.Class.RDFSource, requestOptions );

		return HTTP.Request.Service.post( uri, null, requestOptions, new HTTP.JSONLDParser.Class() ).then( ( processedResponse:HTTP.ProcessedResponse<Object> ) => {
			let nodes:RDF.Node.Class[] = RDF.Document.Util.getResources( processedResponse.result );
			let resources:RDF.Resource.Class[] = RDF.Resource.factory.from( nodes );

			resources = resources.filter( Token.factory.hasRDFClass );

			if( resources.length === 0 ) throw new HTTP.Errors.BadResponseError( "No '" + Token.RDF_CLASS + "' was returned.", processedResponse.response );
			if( resources.length > 1 ) throw new HTTP.Errors.BadResponseError( "Multiple '" + Token.RDF_CLASS + "' were returned. ", processedResponse.response );

			return {
				result: Token.factory.from( resources[ 0 ] ),
				response: processedResponse.response
			};
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
		let authorization:string = "Token " + this.token.key;
		header.values.push( new HTTP.Header.Value( authorization ) );

		return headers;
	}
}

export default Class;
