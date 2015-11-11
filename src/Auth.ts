/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as HTTP from "./HTTP";
import * as Errors from "./Errors";
import Parent from "./Parent";

enum Method {
	Basic
}

export interface Credentials {
	username:string;
	password:string;
}

class Auth {
	private parent:Parent;

	private authenticated:boolean = false;
	private method:Method = null;
	private credentials:Credentials;

	constructor( parent:Parent ) {
		this.parent = parent;
	}

	isAuthenticated( askParent:boolean = true ):boolean {
		return (
			this.authenticated ||
			(askParent && ! ! this.parent.parent && this.parent.parent.Auth.isAuthenticated())
		);
	}

	login( username:string, password:string ):Promise<void> {
		let method:Method = <any> this.parent.getSetting( "auth.method" );

		switch ( method ) {
			case Method.Basic:
				return this.basicAuthentication( username, password );
			default:
				return new Promise<void>( function():void {
					throw new Errors.IllegalStateError( "The authentication method specified isn\'t supported." );
				} );
		}
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):void {
		if( ! this.isAuthenticated( false ) ) {
			if( this.parent.parent ) {
				this.parent.parent.Auth.addAuthentication( requestOptions);
				return;
			} else {
				console.warn( "There is no authentication to add to the request." );
			}
		}

		let headers:Map<string, HTTP.Header.Class> = requestOptions.headers ? requestOptions.headers : requestOptions.headers = new Map<string, HTTP.Header.Class>();
		switch ( this.method ) {
			case Method.Basic:
				this.addBasicAuthHeader( headers );
				requestOptions.sendCredentialsOnCORS = true;
				break;
			default:
				break;
		}
	}


	private basicAuthentication( username:string, password:string ):Promise<void> {
		return new Promise<void>( ( resolve:() => void, reject:() => void ) => {
			// TODO: Check that the credentials are valid
			this.credentials = {
				username: username,
				password: password
			};

			this.method = Method.Basic;
			this.authenticated = true;

			resolve();
		} );
	}

	private addBasicAuthHeader( headers:Map<string, HTTP.Header.Class> ):void {
		let header:HTTP.Header.Class;
		if ( headers.has( "Authorization" ) ) {
			header = headers.get( "Authorization" );
		} else {
			header = new HTTP.Header.Class();
			headers.set( "Authorization", header );
		}
		let authorization:string = "Basic " + btoa( this.credentials.username + ":" + this.credentials.password );
		header.values.push( new HTTP.Header.Value( authorization ) );
	}


}

export default Auth;
export {
	Auth as Class,
	Method
};
