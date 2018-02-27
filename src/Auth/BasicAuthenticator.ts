import * as Errors from "../Errors";
import { Header } from "../HTTP/Header";
import { RequestOptions } from "../HTTP/Request";
import Authenticator from "./Authenticator";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";

export class Class implements Authenticator<UsernameAndPasswordToken.Class, UsernameAndPasswordCredentials.Class> {
	private credentials:UsernameAndPasswordCredentials.Class;

	isAuthenticated():boolean {
		return ! ! this.credentials;
	}

	authenticate( authenticationToken:UsernameAndPasswordToken.Class ):Promise<UsernameAndPasswordCredentials.Class> {
		if( authenticationToken === null ) throw new Errors.IllegalArgumentError( "The authenticationToken cannot be null." );

		return new Promise<UsernameAndPasswordCredentials.Class>( ( resolve:( result:any ) => void, reject:( error:any ) => void ) => {
			if( ! authenticationToken.username ) throw new Errors.IllegalArgumentError( "The username cannot be empty." );
			if( ! authenticationToken.password ) throw new Errors.IllegalArgumentError( "The password cannot be empty." );

			this.credentials = new UsernameAndPasswordCredentials.Class( authenticationToken.username, authenticationToken.password );

			resolve( this.credentials );
		} );
	}

	addAuthentication( requestOptions:RequestOptions ):RequestOptions {
		if( ! this.isAuthenticated() ) throw new Errors.IllegalStateError( "The authenticator isn't authenticated." );

		let headers:Map<string, Header> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, Header>();

		this.addBasicAuthenticationHeader( headers );

		return requestOptions;
	}

	clearAuthentication():void {
		this.credentials = null;
	}

	private addBasicAuthenticationHeader( headers:Map<string, Header> ):void {
		if( headers.has( "authorization" ) ) return;

		let header:Header = new Header();
		headers.set( "authorization", header );

		let authorization:string = "Basic " + toB64( this.credentials.username + ":" + this.credentials.password );
		header.values.push( authorization );
	}
}

function toB64( str:string ):string {
	return ( typeof btoa !== "undefined" ) ? btoa( str ) : new Buffer( str ).toString( "base64" );
}

export default Class;
