import { IllegalArgumentError } from "../Errors";
import { promiseMethod } from "../Utils";
import { Authenticator } from "./Authenticator";
import { BasicCredentials } from "./BasicCredentials";
import { BasicToken } from "./BasicToken";


export class BasicAuthenticator extends Authenticator<BasicToken, BasicCredentials> {

	protected _credentials:BasicCredentials;

	authenticate( authenticationToken:BasicToken ):Promise<BasicCredentials> {
		return promiseMethod( () => {
			if( ! authenticationToken ) throw new IllegalArgumentError( "The authenticationToken cannot be empty." );

			if( ! authenticationToken.username ) throw new IllegalArgumentError( "The username cannot be empty." );
			if( ! authenticationToken.password ) throw new IllegalArgumentError( "The password cannot be empty." );

			this._credentials = new BasicCredentials( authenticationToken.username, authenticationToken.password );
			return this._credentials;
		} );
	}

	protected _getHeaderValue():string {
		return "Basic " + toB64( this._credentials.username + ":" + this._credentials.password );
	}

}

function toB64( str:string ):string {
	return (typeof btoa !== "undefined") ? btoa( str ) : new Buffer( str ).toString( "base64" );
}
