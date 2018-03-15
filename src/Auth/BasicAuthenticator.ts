import { IllegalArgumentError } from "../Errors";
import { promiseMethod } from "../Utils";
import Authenticator from "./Authenticator";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";

export class Class extends Authenticator<UsernameAndPasswordToken.Class, UsernameAndPasswordCredentials.Class> {

	protected credentials:UsernameAndPasswordCredentials.Class;

	authenticate( authenticationToken:UsernameAndPasswordToken.Class ):Promise<UsernameAndPasswordCredentials.Class> {
		return promiseMethod( () => {
			if( authenticationToken === null ) throw new IllegalArgumentError( "The authenticationToken cannot be null." );

			if( ! authenticationToken.username ) throw new IllegalArgumentError( "The username cannot be empty." );
			if( ! authenticationToken.password ) throw new IllegalArgumentError( "The password cannot be empty." );

			this.credentials = new UsernameAndPasswordCredentials.Class( authenticationToken.username, authenticationToken.password );

			return this.credentials;
		} );
	}

	protected getHeaderValue():string {
		return "Basic " + toB64( this.credentials.username + ":" + this.credentials.password );
	}

}

function toB64( str:string ):string {
	return (typeof btoa !== "undefined") ? btoa( str ) : new Buffer( str ).toString( "base64" );
}

export default Class;
