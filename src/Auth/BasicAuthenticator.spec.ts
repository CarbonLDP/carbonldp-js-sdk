import { CarbonLDP } from "../CarbonLDP";
import * as Errors from "../Errors";
import { Header } from "../HTTP/Header";
import { RequestOptions } from "../HTTP/Request";
import {
	clazz,
	extendsClass,
	hasConstructor,
	hasMethod,
	INSTANCE,
	isDefined,
	module,
} from "../test/JasmineExtender";
import { AbstractAuthenticator } from "./AbstractAuthenticator";

import { BasicAuthenticator } from "./BasicAuthenticator";

import { BasicCredentials } from "./BasicCredentials";
import { BasicToken } from "./BasicToken";

describe( module( "carbonldp/Auth/BasicAuthenticator" ), ():void => {

	let context:CarbonLDP;
	beforeEach( ():void => {
		context = new CarbonLDP( "https://example.com" );
	} );

	describe( clazz(
		"CarbonLDP.Auth.BasicAuthenticator",
		"Authenticates requests using HTTP Basic Authentication."
	), ():void => {

		it( isDefined(), ():void => {
			expect( BasicAuthenticator ).toBeDefined();
			expect( BasicAuthenticator ).toEqual( jasmine.any( Function ) );
		} );

		it( hasConstructor(), ():void => {
			const authenticator:BasicAuthenticator = new BasicAuthenticator( context );

			expect( authenticator ).toBeDefined();
			expect( authenticator ).toEqual( jasmine.any( BasicAuthenticator ) );
		} );

		it( extendsClass( "CarbonLDP.Auth.Authenticator<CarbonLDP.Auth.UsernameAndPasswordToken>" ), ():void => {
			const authenticator:BasicAuthenticator = new BasicAuthenticator( context );
			expect( authenticator ).toEqual( jasmine.any( AbstractAuthenticator ) );
		} );

		it( hasMethod(
			INSTANCE,
			"isAuthenticated",
			"Returns true if the instance contains stored credentials.",
			{ type: "boolean" }
		), ( done:() => void ):void => {
			let authenticator:BasicAuthenticator = new BasicAuthenticator( context );

			expect( authenticator.isAuthenticated ).toBeDefined();
			expect( authenticator.isAuthenticated ).toEqual( jasmine.any( Function ) );

			expect( authenticator.isAuthenticated() ).toEqual( false );

			authenticator.authenticate( new BasicToken( "foo", "foo" ) ).then( ():void => {
				expect( authenticator.isAuthenticated() ).toEqual( true );

				authenticator.clearAuthentication();

				expect( authenticator.isAuthenticated() ).toEqual( false );

				done();
			} );
		} );

		it( hasMethod(
			INSTANCE,
			"authenticate",
			"Stores credentials to authenticate future requests.", [
				{ name: "authenticationToken", type: "CarbonLDP.Auth.BasicToken" },
			],
			{ type: "Promise<CarbonLDP.Auth.BasicCredentials>" }
		), ( done:{ ():void; fail:( error:any ) => void } ):void => {

			// Property Integrity
			(() => {
				let authenticator:BasicAuthenticator = new BasicAuthenticator( context );

				expect( authenticator.authenticate ).toBeDefined();
				expect( authenticator.authenticate ).toEqual( jasmine.any( Function ) );
			})();

			let promises:Promise<any>[] = [];

			// Successful Authentication
			(() => {
				let authenticator:BasicAuthenticator = new BasicAuthenticator( context );
				let promise:Promise<BasicCredentials>;
				promise = authenticator.authenticate( new BasicToken( "foo", "foo" ) );

				expect( ! ! promise ).toEqual( true );
				expect( promise instanceof Promise ).toEqual( true );

				promises.push( promise.then( ( credentials:BasicCredentials ):void => {
					expect( authenticator.isAuthenticated() ).toEqual( true );

					expect( credentials ).toBeDefined();
					expect( credentials ).not.toBeNull();

					expect( "username" in credentials ).toEqual( true );
					expect( ! ! credentials.username ).toEqual( true );
					expect( credentials.username ).toEqual( jasmine.any( String ) );

					expect( "password" in credentials ).toEqual( true );
					expect( ! ! credentials.password ).toEqual( true );
					expect( credentials.password ).toEqual( jasmine.any( String ) );
				}, done ) );
			})();

			(() => {
				let unsuccessfulAuthenticator:BasicAuthenticator = new BasicAuthenticator( context );
				let promise:Promise<BasicCredentials>;
				promise = unsuccessfulAuthenticator.authenticate( new BasicToken( null, null ) );

				expect( ! ! promise ).toEqual( true );
				expect( promise instanceof Promise ).toEqual( true );

				promises.push( promise.then( ():void => {
					done.fail( new Error( "Promise should have failed." ) );
				}, ( error:Error ):void => {
					expect( error instanceof Errors.IllegalArgumentError ).toEqual( true );

					expect( unsuccessfulAuthenticator.isAuthenticated() ).toEqual( false );
					return;
				} ) );
			})();

			Promise.all( promises ).then( done, done.fail );
		} );

		it( hasMethod(
			INSTANCE,
			"addAuthentication",
			"Adds the Basic authentication header to the passed request options object.\n" +
			"The `CarbonLDP.HTTP.RequestOptions` provided is returned without modifications if it already has an authentication header.", [
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Request options object to add Authentication headers." },
			],
			{ type: "CarbonLDP.HTTP.RequestOptions", description: "The request options with the added authentication headers." }
		), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			let promises:Promise<void>[] = [];
			let authenticator:BasicAuthenticator = new BasicAuthenticator( context );

			expect( authenticator.addAuthentication ).toBeDefined();
			expect( authenticator.addAuthentication ).toEqual( jasmine.any( Function ) );

			expect( ():void => {
				authenticator.addAuthentication( {} );
			} ).toThrow( new Errors.IllegalStateError( "The authenticator isn't authenticated." ) );

			promises.push( authenticator.authenticate( new BasicToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:RequestOptions = authenticator.addAuthentication( {} );

				expect( ! ! requestOptions ).toEqual( true );
				expect( requestOptions ).toEqual( jasmine.any( Object ) );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:Header = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof Header ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( authorization ).toMatch( /^Basic/ );

				let auth:string = (typeof atob !== "undefined") ? atob( authorization.substring( 6 ) ) : (new Buffer( authorization.substring( 6 ), "base64" )).toString( "utf8" );
				expect( auth ).toEqual( "user:pass" );
			} ) );

			promises.push( authenticator.authenticate( new BasicToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:RequestOptions = {
					headers: new Map<string, Header>(),
				};
				authenticator.addAuthentication( requestOptions );

				expect( ! ! requestOptions ).toEqual( true );
				expect( requestOptions ).toEqual( jasmine.any( Object ) );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 1 );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:Header = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof Header ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( authorization ).toMatch( /^Basic/ );

				let auth:string = (typeof atob !== "undefined") ? atob( authorization.substring( 6 ) ) : (new Buffer( authorization.substring( 6 ), "base64" )).toString( "utf8" );
				expect( auth ).toEqual( "user:pass" );
			} ) );

			promises.push( authenticator.authenticate( new BasicToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:RequestOptions = {
					headers: new Map<string, Header>(),
				};
				requestOptions.headers.set( "content-type", new Header( "text/plain" ) );
				requestOptions.headers.set( "accept", new Header( "text/plain" ) );
				authenticator.addAuthentication( requestOptions );

				expect( ! ! requestOptions ).toEqual( true );
				expect( requestOptions ).toEqual( jasmine.any( Object ) );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:Header = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof Header ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( authorization ).toMatch( /^Basic/ );

				let auth:string = (typeof atob !== "undefined") ? atob( authorization.substring( 6 ) ) : (new Buffer( authorization.substring( 6 ), "base64" )).toString( "utf8" );
				expect( auth ).toEqual( "user:pass" );
			} ) );

			promises.push( authenticator.authenticate( new BasicToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:RequestOptions = {
					headers: new Map<string, Header>(),
				};
				requestOptions.headers.set( "content-type", new Header( "text/plain" ) );
				requestOptions.headers.set( "accept", new Header( "text/plain" ) );
				requestOptions.headers.set( "authorization", new Header( "Another YW5vdGhlci1hdXRob3JpemF0aW9uLXR5cGU=" ) );
				authenticator.addAuthentication( requestOptions );

				expect( ! ! requestOptions ).toEqual( true );
				expect( requestOptions ).toEqual( jasmine.any( Object ) );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:Header = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof Header ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( authorization ).toMatch( /^Another/ );

				let auth:string = (typeof atob !== "undefined") ? atob( authorization.substring( 7 ) ) : (new Buffer( authorization.substring( 7 ), "base64" )).toString( "utf8" );
				expect( auth ).toEqual( "another-authorization-type" );
			} ) );

			promises.push( authenticator.authenticate( new BasicToken( "user", "pass" ) ).then( ():void => {
				let requestOptions:RequestOptions = {
					headers: new Map<string, Header>(),
				};
				requestOptions.headers.set( "content-type", new Header( "text/plain" ) );
				requestOptions.headers.set( "accept", new Header( "text/plain" ) );
				requestOptions.headers.set( "authorization", new Header( "Basic YW5vdGhlci11c2VyOmFub3RoZXItcGFzcw==" ) );
				authenticator.addAuthentication( requestOptions );

				expect( ! ! requestOptions ).toEqual( true );
				expect( requestOptions ).toEqual( jasmine.any( Object ) );
				expect( "headers" in requestOptions ).toEqual( true );
				expect( requestOptions.headers instanceof Map ).toEqual( true );
				expect( requestOptions.headers.size ).toEqual( 3 );
				expect( requestOptions.headers.has( "content-type" ) ).toEqual( true );
				expect( requestOptions.headers.has( "accept" ) ).toEqual( true );
				expect( requestOptions.headers.has( "authorization" ) ).toEqual( true );

				let authorizationHeader:Header = requestOptions.headers.get( "authorization" );

				expect( authorizationHeader instanceof Header ).toEqual( true );
				expect( authorizationHeader.values.length ).toEqual( 1 );

				let authorization:string = authorizationHeader.toString();

				expect( authorization ).toMatch( /^Basic/ );

				let auth:string = (typeof atob !== "undefined") ? atob( authorization.substring( 6 ) ) : (new Buffer( authorization.substring( 6 ), "base64" )).toString( "utf8" );
				expect( auth ).toEqual( "another-user:another-pass" );
			} ) );

			Promise.all( promises ).then( done, done.fail );
		} );

		it( hasMethod(
			INSTANCE,
			"clearAuthentication",
			"Clears any saved credentials and restores the Authenticator to its initial state."
		), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			let promises:Promise<void>[] = [];
			let authenticator:BasicAuthenticator = new BasicAuthenticator( context );

			expect( authenticator.clearAuthentication ).toBeDefined();
			expect( authenticator.clearAuthentication ).toEqual( jasmine.any( Function ) );

			expect( () => authenticator.clearAuthentication() ).not.toThrow();

			promises.push( authenticator.authenticate( new BasicToken( "user", "pass" ) ).then( ():void => {
				expect( authenticator.isAuthenticated() ).toEqual( true );

				authenticator.clearAuthentication();

				expect( authenticator.isAuthenticated() ).toEqual( false );
			}, done ) );

			Promise.all( promises ).then( done, done.fail );
		} );

	} );

} );
