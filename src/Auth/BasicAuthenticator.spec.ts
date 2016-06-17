import {
	INSTANCE,

	module,

	isDefined,

	clazz,

	hasConstructor,
	hasMethod,
} from "./../test/JasmineExtender";

import * as Errors from "./../Errors";
import * as HTTP from "./../HTTP";
import * as Utils from "./../Utils";

import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";

import * as BasicAuthenticator from "./BasicAuthenticator";

describe( module( "Carbon/Auth/BasicAuthenticator" ), ():void => {
	it( isDefined(), ():void => {
		expect( BasicAuthenticator ).toBeDefined();
		expect( Utils.isObject( BasicAuthenticator ) ).toEqual( true );
	});

	describe( clazz( "Carbon.Auth.BasicAuthenticator.Class", "Authenticates requests using HTTP Basic Authentication." ), ():void => {
		it( isDefined(), ():void => {
			expect( BasicAuthenticator.Class ).toBeDefined();
			expect( Utils.isFunction( BasicAuthenticator.Class ) ).toEqual( true );
		});

		it( hasConstructor(), ():void => {
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( !! authenticator ).toEqual( true );
			expect( authenticator instanceof BasicAuthenticator.Class ).toEqual( true );
		});

		it( hasMethod(
			INSTANCE,
			"isAuthenticated",
			"Returns true if the instance contains stored credentials.",
			{ type: "boolean" }
		), ( done:() => void ):void => {
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( authenticator.isAuthenticated ).toBeDefined();
			expect( Utils.isFunction( authenticator.isAuthenticated ) ).toBeDefined();

			expect( authenticator.isAuthenticated() ).toEqual( false );

			authenticator.authenticate( new UsernameAndPasswordToken( "foo", "foo" ) ).then( ():void => {
				expect( authenticator.isAuthenticated() ).toEqual( true );

				authenticator.clearAuthentication();

				expect( authenticator.isAuthenticated() ).toEqual( false );

				done();
			});
		});

		it( hasMethod(
			INSTANCE,
			"authenticate",
			"Stores credentials to authenticate future requests.", [
				{ name: "authenticationToken", type: "Carbon.Auth.UsernameAndPasswordToken" }
			],
			{ type: "Promise< Carbon.Auth.UsernameAndPasswordCredentials.Class >" }
		), ( done:{ ():void; fail:( error:any ) => void } ):void => {

			// Property Integrity
			(() => {
				let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

				expect( authenticator.authenticate ).toBeDefined();
				expect( Utils.isFunction( authenticator.authenticate ) ).toEqual( true );
			})();

			let promises:Promise<any>[] = [];

			// Successful Authentication
			(() => {
				let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();
				let promise:Promise<UsernameAndPasswordCredentials.Class>;
				promise = authenticator.authenticate( new UsernameAndPasswordToken( "foo", "foo" ) );

				expect( !! promise ).toEqual( true );
				expect( promise instanceof Promise ).toEqual( true );

				promises.push( promise.then( ( credentials: UsernameAndPasswordCredentials.Class ):void => {
					expect( authenticator.isAuthenticated() ).toEqual( true );

					expect( credentials ).toBeDefined();
					expect( credentials ).not.toBeNull();

					expect( "username" in credentials ).toEqual( true );
					expect( !! credentials.username ).toEqual( true );
					expect( Utils.isString( credentials.username ) ).toEqual( true );

					expect( "password" in credentials ).toEqual( true );
					expect( !! credentials.password ).toEqual( true );
					expect( Utils.isString( credentials.password ) ).toEqual( true );
				}, done ) );
			})();

			(() => {
				let unsuccessfulAuthenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();
				let promise:Promise<UsernameAndPasswordCredentials.Class>;
				promise = unsuccessfulAuthenticator.authenticate( new UsernameAndPasswordToken( null, null ) );

				expect( !! promise ).toEqual( true );
				expect( promise instanceof Promise ).toEqual( true );

				promises.push( promise.then( ():void => {
					done.fail( new Error( "Promise should have failed." ) );
				}, ( error:Error ):void => {
					expect( error instanceof Errors.IllegalArgumentError ).toEqual( true );

					expect( unsuccessfulAuthenticator.isAuthenticated() ).toEqual( false );
					return;
				}) );
			})();

			Promise.all( promises ).then( done, done.fail );
		});

		it( hasMethod(
			INSTANCE,
			"addAuthentication",
			"Adds the Basic authentication header to the passed request options object.\n" +
			"The `Carbon.HTTP.Request.Options` provided is returned without modifications if it already has an authentication header.", [
				{ name: "requestOptions", type:"Carbon.HTTP.Request.Options", description: "Request options object to add Authentication headers." }
			],
			{ type: "Carbon.HTTP.Request.Options", description: "The request options with the added authentication headers." }
		), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			let promises:Promise<void>[] = [];
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( authenticator.addAuthentication ).toBeDefined();
			expect( Utils.isFunction( authenticator.addAuthentication ) ).toEqual( true );

			expect( ():void => {
				authenticator.addAuthentication( {} );
			}).toThrow( new Errors.IllegalStateError( "The authenticator isn't authenticated." ) );

			promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
				let requestOptions = authenticator.addAuthentication( {} );

				expect( !! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Basic " ) ).toEqual( true );

				let auth:string = ( typeof atob !== "undefined" ) ? atob( authorization.substring( 6 ) ) : ( new Buffer( authorization.substring( 6 ), 'base64') ).toString( "utf8" );
				expect( auth ).toEqual( "user:pass" );
			} ) );

			promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:HTTP.Request.Options = {
					headers: new Map<string, HTTP.Header.Class>()
				};
				authenticator.addAuthentication( requestOptions );

				expect( !! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 1 );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Basic " ) ).toEqual( true );

				let auth:string = ( typeof atob !== "undefined" ) ? atob( authorization.substring( 6 ) ) : ( new Buffer( authorization.substring( 6 ), 'base64') ).toString( "utf8" );
				expect( auth ).toEqual( "user:pass" );
			} ) );

			promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:HTTP.Request.Options = {
					headers: new Map<string, HTTP.Header.Class>()
				};
				requestOptions.headers.set( "content-type", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "accept", new HTTP.Header.Class( "text/plain" ) );
				authenticator.addAuthentication( requestOptions );

				expect( !! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Basic " ) ).toEqual( true );

				let auth:string = ( typeof atob !== "undefined" ) ? atob( authorization.substring( 6 ) ) : ( new Buffer( authorization.substring( 6 ), 'base64') ).toString( "utf8" );
				expect( auth ).toEqual( "user:pass" );
			} ) );

			promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:HTTP.Request.Options = {
					headers: new Map<string, HTTP.Header.Class>()
				};
				requestOptions.headers.set( "content-type", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "accept", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "authorization", new HTTP.Header.Class( "Another YW5vdGhlci1hdXRob3JpemF0aW9uLXR5cGU=" ) );
				authenticator.addAuthentication( requestOptions );

				expect( !! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Another " ) ).toEqual( true );

				let auth:string = ( typeof atob !== "undefined" ) ? atob( authorization.substring( 7 ) ) : ( new Buffer( authorization.substring( 7 ), 'base64') ).toString( "utf8" );
				expect( auth ).toEqual( "another-authorization-type" );
			} ) );

			promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:HTTP.Request.Options = {
					headers: new Map<string, HTTP.Header.Class>()
				};
				requestOptions.headers.set( "content-type", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "accept", new HTTP.Header.Class( "text/plain" ) );
				requestOptions.headers.set( "authorization", new HTTP.Header.Class( "Basic YW5vdGhlci11c2VyOmFub3RoZXItcGFzcw==" ) );
				authenticator.addAuthentication( requestOptions );

				expect( !! requestOptions ).toEqual( true );
				expect( Utils.isObject( requestOptions ) ).toEqual( true );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:HTTP.Header.Class = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof HTTP.Header.Class ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( Utils.S.startsWith( authorization, "Basic " ) ).toEqual( true );

				let auth:string = ( typeof atob !== "undefined" ) ? atob( authorization.substring( 6 ) ) : ( new Buffer( authorization.substring( 6 ), 'base64') ).toString( "utf8" );
				expect( auth ).toEqual( "another-user:another-pass" );
			} ) );

			Promise.all( promises ).then( done, done.fail );
		});

		it( hasMethod(
			INSTANCE,
			"clearAuthentication",
			"Clears any saved credentials and restores the Authenticator to its initial state."
		), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			let promises:Promise<void>[] = [];
			let authenticator:BasicAuthenticator.Class = new BasicAuthenticator.Class();

			expect( authenticator.clearAuthentication ).toBeDefined();
			expect( Utils.isFunction( authenticator.clearAuthentication ) ).toEqual( true );

			expect( () => authenticator.clearAuthentication() ).not.toThrow();

			promises.push( authenticator.authenticate( new UsernameAndPasswordToken( "user", "pass" ) ).then( ():void => {
				expect( authenticator.isAuthenticated() ).toEqual( true );

				authenticator.clearAuthentication();

				expect( authenticator.isAuthenticated() ).toEqual( false );
			}, done ));

			Promise.all( promises ).then( done, done.fail );
		});

	});

});
