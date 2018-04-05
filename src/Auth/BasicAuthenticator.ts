import { IllegalArgumentError } from "../Errors";
import { promiseMethod } from "../Utils";
import { Authenticator } from "./Authenticator";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";


export class BasicAuthenticator extends Authenticator<UsernameAndPasswordToken, UsernameAndPasswordCredentials> {

	protected credentials:UsernameAndPasswordCredentials;

	authenticate( authenticationToken:UsernameAndPasswordToken ):Promise<UsernameAndPasswordCredentials> {
		return promiseMethod( () => {
			if( ! authenticationToken ) throw new IllegalArgumentError( "The authenticationToken cannot be empty." );

			if( ! authenticationToken.username ) throw new IllegalArgumentError( "The username cannot be empty." );
			if( ! authenticationToken.password ) throw new IllegalArgumentError( "The password cannot be empty." );

			this.credentials = new UsernameAndPasswordCredentials( authenticationToken.username, authenticationToken.password );
			return this.credentials;
		} );
	}

	protected _getHeaderValue():string {
		return "Basic " + toB64( this.credentials.username + ":" + this.credentials.password );
	}

}

function toB64( str:string ):string {
	return (typeof btoa !== "undefined") ? btoa( str ) : new Buffer( str ).toString( "base64" );
}
