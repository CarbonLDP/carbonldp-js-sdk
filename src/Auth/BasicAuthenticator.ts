import { IllegalArgumentError } from "../Errors";
import { promiseMethod } from "../Utils";
import { Authenticator } from "./Authenticator";
import * as BasicCredentials from "./BasicCredentials";
import * as BasicToken from "./BasicToken";

export class BasicAuthenticator extends Authenticator<BasicToken.Class, BasicCredentials.Class> {

	protected credentials:BasicCredentials.Class;

	authenticate( authenticationToken:BasicToken.Class ):Promise<BasicCredentials.Class> {
		return promiseMethod( () => {
			if( authenticationToken === null ) throw new IllegalArgumentError( "The authenticationToken cannot be null." );

			if( ! authenticationToken.username ) throw new IllegalArgumentError( "The username cannot be empty." );
			if( ! authenticationToken.password ) throw new IllegalArgumentError( "The password cannot be empty." );

			this.credentials = new BasicCredentials.Class( authenticationToken.username, authenticationToken.password );

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
