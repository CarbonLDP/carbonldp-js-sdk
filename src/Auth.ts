/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";

import * as HTTP from "./HTTP";
import * as Errors from "./Errors";
import Parent from "./Parent";
import * as Utils from "./Utils";

export enum Method {
	BASIC,
	TOKEN
}

export class Class {
	private parent:Parent;

	private method:Method = null;
	private authenticators:Map<Method, Authenticator<AuthenticationToken>>;

	constructor( parent:Parent ) {
		this.parent = parent;

		this.authenticators = new Map<Method, Authenticator<AuthenticationToken>>();
		this.authenticators.set( Method.BASIC, new BasicAuthenticator() );
		this.authenticators.set( Method.TOKEN, new TokenAuthenticator( this.parent ) );
	}

	isAuthenticated( askParent:boolean = true ):boolean {
		let authenticated:boolean = false;

		// TODO

		return (
			authenticated ||
			(askParent && ! ! this.parent.parent && this.parent.parent.Auth.isAuthenticated())
		);
	}

	login( username:string, password:string ):Promise<void> {
		let authenticationToken:AuthenticationToken = new UsernameAndPasswordToken( username, password );

		let method:Method = <any> this.parent.getSetting( "auth.method" );
		let authenticator:Authenticator<AuthenticationToken> = this.authenticators.get( method );

		if( authenticator === null ) return new Promise<void>( function():void {
			throw new Errors.IllegalStateError( "The authentication method specified isn\'t supported." );
		} );

		return authenticator.authenticate( authenticationToken );
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

		// TODO
	}
}

export default Class;
