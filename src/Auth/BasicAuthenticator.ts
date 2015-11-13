import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import * as Errors from "./../Errors";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";

export interface Credentials {
	username:string;
	password:string;
}

export class Class implements Authenticator<UsernameAndPasswordToken> {
	private credentials:Credentials;

	isAuthenticated():boolean {
		return this.credentials !== null;
	}

	authenticate( authenticationToken:UsernameAndPasswordToken ):Promise<void>  {
		if( authenticationToken === null ) throw new Errors.IllegalArgumentError( "The authenticationToken cannot be null." );

		return new Promise<void>( ( resolve:() => void, reject:( error:any ) => void ) => {
			if( ! authenticationToken.username ) throw new Errors.IllegalArgumentError( "The username cannot be empty." );
			if( ! authenticationToken.password ) throw new Errors.IllegalArgumentError( "The password cannot be empty." );

			// TODO: Check that the username and password are correct

			this.credentials = {
				username: authenticationToken.username,
				password: authenticationToken.password
			};

			resolve();
		});
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options {
		let headers:Map<string, HTTP.Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();

		this.addBasicAuthenticationHeader( headers );

		return requestOptions;
	}

	clearAuthentication():void {
		this.credentials = null;
	}

	private addBasicAuthenticationHeader( headers:Map<string, HTTP.Header.Class> ):Map<string, HTTP.Header.Class> {
		let header:HTTP.Header.Class;
		if ( headers.has( "Authorization" ) ) {
			header = headers.get( "Authorization" );
		} else {
			header = new HTTP.Header.Class();
			headers.set( "Authorization", header );
		}
		let authorization:string = "BASIC " + btoa( this.credentials.username + ":" + this.credentials.password );
		header.values.push( new HTTP.Header.Value( authorization ) );

		return headers
	}
}

export default Class;