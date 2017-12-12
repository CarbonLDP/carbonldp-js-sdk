import { promiseMethod } from "../Utils";
import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import * as BasicCredentials from "./BasicCredentials";
import * as BasicToken from "./BasicToken";

export class Class extends Authenticator<BasicToken.Class, BasicCredentials.Class> {

	protected credentials:BasicCredentials.Class;

	authenticate( authenticationToken:BasicToken.Class ):Promise<BasicCredentials.Class> {
		return promiseMethod( () => {
			if( authenticationToken === null ) throw new Errors.IllegalArgumentError( "The authenticationToken cannot be null." );

			if( ! authenticationToken.username ) throw new Errors.IllegalArgumentError( "The username cannot be empty." );
			if( ! authenticationToken.password ) throw new Errors.IllegalArgumentError( "The password cannot be empty." );

			this.credentials = new BasicCredentials.Class( authenticationToken.username, authenticationToken.password );

			return this.credentials;
		} );
	}

	protected getHeaderValue():HTTP.Header.Value {
		let authorization:string = "Basic " + toB64( this.credentials.username + ":" + this.credentials.password );
		return new HTTP.Header.Value( authorization );
	}

}

function toB64( str:string ):string {
	return (typeof btoa !== "undefined") ? btoa( str ) : new Buffer( str ).toString( "base64" );
}

export default Class;
