import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import AuthenticationToken from "./AuthenticationToken";
import * as Errors from "./../Errors";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";


export class Class implements Authenticator<UsernameAndPasswordToken> {
	private credentials:UsernameAndPasswordCredentials.Class;

	isAuthenticated():boolean {
		return !! this.credentials;
	}

	authenticate( authenticationToken:UsernameAndPasswordToken ):Promise<UsernameAndPasswordCredentials.Class>  {
		if( authenticationToken === null ) throw new Errors.IllegalArgumentError( "The authenticationToken cannot be null." );

		return new Promise<UsernameAndPasswordCredentials.Class>( ( resolve:( result:any ) => void, reject:( error:any ) => void ) => {
			if( ! authenticationToken.username ) throw new Errors.IllegalArgumentError( "The username cannot be empty." );
			if( ! authenticationToken.password ) throw new Errors.IllegalArgumentError( "The password cannot be empty." );

			this.credentials = new UsernameAndPasswordCredentials.Class( authenticationToken.username, authenticationToken.password );

			resolve( this.credentials );
		});
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options {
		if( ! this.isAuthenticated() ) throw new Errors.IllegalStateError( "The authenticator isn't authenticated." );

		let headers:Map<string, HTTP.Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();

		this.addBasicAuthenticationHeader( headers );

		return requestOptions;
	}

	clearAuthentication():void {
		this.credentials = null;
	}

	supports( authenticationToken:AuthenticationToken ):boolean {
		return authenticationToken instanceof UsernameAndPasswordToken;
	}

	private addBasicAuthenticationHeader( headers:Map<string, HTTP.Header.Class> ):Map<string, HTTP.Header.Class> {
		let header:HTTP.Header.Class;
		if ( headers.has( "authorization" ) ) {
			header = headers.get( "authorization" );
		} else {
			header = new HTTP.Header.Class();
			headers.set( "authorization", header );
		}
		let authorization:string = "Basic " + toB64( this.credentials.username + ":" + this.credentials.password );
		header.values.push( new HTTP.Header.Value( authorization ) );

		return headers;
	}
}

function toB64( str:string ):string {
	return  ( typeof btoa !== "undefined" ) ? btoa( str ) : new Buffer( str ).toString( "base64" );
}

export default Class;
