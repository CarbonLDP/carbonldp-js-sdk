/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import AuthenticationToken from "./Auth/AuthenticationToken";
import Authenticator from "./Auth/Authenticator";
import BasicAuthenticator from "./Auth/BasicAuthenticator";
import TokenAuthenticator from "./Auth/TokenAuthenticator";
import UsernameAndPasswordToken from "./Auth/UsernameAndPasswordToken";

import * as HTTP from "./HTTP";
import * as Errors from "./Errors";
import Context from "./Context";
import * as Utils from "./Utils";

export enum Method {
	BASIC,
	TOKEN
}

export class Class {
	private context:Context;

	private method:Method = null;
	private authenticators:Array<Authenticator<AuthenticationToken>>;
	private authenticator:Authenticator<AuthenticationToken>;

	constructor( context:Context ) {
		this.context = context;

		this.authenticators = [];
		this.authenticators.push( new TokenAuthenticator( this.context ) );
		this.authenticators.push( new BasicAuthenticator() );
	}

	isAuthenticated( askParent:boolean = true ):boolean {
		return (
			( this.authenticator && this.authenticator.isAuthenticated() ) ||
			( askParent && ! ! this.context.parentContext && this.context.parentContext.Auth !== this && this.context.parentContext.Auth.isAuthenticated() )
		);
	}

	authenticate( username:string, password:string ):Promise<void>;
	authenticate( authenticationToken:AuthenticationToken ):Promise<void>;
	authenticate( usernameOrToken:any, password:string = null ):Promise<void> {
		return new Promise<void>( ( resolve:( result:any ) => void, reject:( reject:Error ) => void ) => {
			if( ! usernameOrToken ) throw new Errors.IllegalArgumentError( "Either a username or an authenticationToken are required." );

			let authenticationToken:AuthenticationToken;
			if( Utils.isString( usernameOrToken ) ) {
				let username:string = usernameOrToken;
				if( ! password ) throw new Errors.IllegalArgumentError( "A password is required when providing a username." );
				authenticationToken = new UsernameAndPasswordToken( username, password );
			} else {
				authenticationToken = usernameOrToken;
			}

			if( this.authenticator ) this.clearAuthentication();

			this.authenticator = this.getAuthenticator( authenticationToken );

			resolve( this.authenticator.authenticate( authenticationToken ) );
		});
	}

	addAuthentication( requestOptions:HTTP.Request.Options ):void {
		if( this.isAuthenticated( false ) ) {
			this.authenticator.addAuthentication( requestOptions );
		} else if( "parentContext" in this.context ) {
			this.context.parentContext.Auth.addAuthentication( requestOptions );
		} else {
			console.warn( "There is no authentication to add to the request." );
		}
	}

	clearAuthentication():void {
		if( ! this.authenticator ) return;

		this.authenticator.clearAuthentication();
		this.authenticator = null;
	}

	private getAuthenticator( authenticationToken:AuthenticationToken ):Authenticator<AuthenticationToken> {
		// TODO: FOR_OF_TYPEDEF
		/* tslint:disable: typedef */
		for( let authenticator of this.authenticators ) {
		/* tslint:enable: typedef */
			if( authenticator.supports( authenticationToken ) ) return authenticator;
		}

		throw new Errors.IllegalStateError( "The configured authentication method isn\'t supported." );
	}
}

export default Class;
