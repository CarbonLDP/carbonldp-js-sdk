import { IllegalStateError } from "../Errors";
import {
	Header,
	RequestOptions,
} from "../HTTP";

import {
	clazz,
	constructor,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "../test/JasmineExtender";

import * as Authenticator from "./Authenticator";

describe( module( "carbonldp/Auth/Authenticator" ), ():void => {

	it( isDefined(), ():void => {
		expect( Authenticator ).toBeDefined();
		expect( Authenticator ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"CarbonLDP.Auth.Authenticator", [
			"T extends object",
			"W extends object",
		],
		"Abstract class that represents the base of an authentication token."
	), ():void => {

		it( "should exists", ():void => {
			expect( Authenticator.Authenticator ).toBeDefined();
			expect( Authenticator.Authenticator ).toEqual( jasmine.any( Function ) );
		} );


		function createAuthenticatorWith( credentials?:object, header?:string ):Authenticator.Authenticator<object, object> {
			return new class extends Authenticator.Authenticator<object, object> {

				protected credentials:object = credentials;

				authenticate():Promise<object> {
					throw new Error( "Method not implemented." );
				}

				protected getHeaderValue():string {
					return null;
				}
			};
		}

		describe( constructor(), ():void => {

			it( "should be extensible", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith();

				expect( authenticator ).toBeDefined();
				expect( authenticator ).toEqual( jasmine.any( Authenticator.Authenticator ) );
			} );

		} );

		describe( method( INSTANCE, "isAuthenticated" ), ():void => {

			it( hasSignature(
				"Returns if its authenticated by checking the stored credentials within.",
				{ type: "boolean", description: "Boolean that indicates if the authenticator is authenticated or not." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Authenticator.Authenticator.prototype.isAuthenticated ).toBeDefined();
				expect( Authenticator.Authenticator.prototype.isAuthenticated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no credentials", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return false when null credentials", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith( null );
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should return true when credentials an object", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith( {} );
				expect( authenticator.isAuthenticated() ).toBe( true );
			} );

		} );

		describe( method( INSTANCE, "authenticate" ), ():void => {

			it( hasSignature(
				"Abstract method that should perform an authentication and store the credentials for future use.", [
					{ name: "authenticationToken", type: "T", description: "The token that will be used to perform the authentication." },
				],
				{ type: "W", description: "Promise that contains the authentication credentials if the request is successful." }
			), ():void => {} );

		} );

		describe( method( INSTANCE, "clearAuthentication" ), ():void => {

			it( hasSignature(
				"Removes the stored credentials of any."
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Authenticator.Authenticator.prototype.clearAuthentication ).toBeDefined();
				expect( Authenticator.Authenticator.prototype.clearAuthentication ).toEqual( jasmine.any( Function ) );
			} );

			it( "should clear when existing", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith( {} );

				authenticator.clearAuthentication();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

			it( "should clear when non existing", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith();

				authenticator.clearAuthentication();
				expect( authenticator.isAuthenticated() ).toBe( false );
			} );

		} );

		describe( method( INSTANCE, "addAuthentication" ), ():void => {

			it( hasSignature(
				"If the authenticator is authenticated, it adds an authentication header in the request options object provided.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "The request options object where to add the authentication header." },
				],
				{ type: "CarbonLDP.HTTP.RequestOptions", description: "The request options object provided after adding the authentication header." }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Authenticator.Authenticator.prototype.addAuthentication ).toBeDefined();
				expect( Authenticator.Authenticator.prototype.addAuthentication ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if no authenticated", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith();
				expect( () => authenticator.addAuthentication( {} ) ).toThrowError( IllegalStateError, "The authenticator isn't authenticated." );
			} );

			it( "should options provided must be the same returned", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith( {} );

				const options:RequestOptions = {};
				const returned:RequestOptions = authenticator.addAuthentication( options );

				expect( returned ).toBe( options );
			} );

			it( "should create headers map if not defined", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith( {} );

				const options:RequestOptions = {};
				authenticator.addAuthentication( options );

				expect( options.headers ).toEqual( jasmine.any( Map ) );
			} );

			it( "should create not replace headers map if defined", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith( {} );

				const headers:RequestOptions[ "headers" ] = new Map();
				const options:RequestOptions = { headers };
				authenticator.addAuthentication( options );

				expect( options.headers ).toBe( headers );
			} );

			it( "should not alter if authorization header exists", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith( {} );

				const headers:RequestOptions[ "headers" ] = new Map( [
					[ "authorization", new Header() ],
				] );

				const options:RequestOptions = { headers };
				authenticator.addAuthentication( options );

				expect( options.headers ).toEqual( new Map( [
					[ "authorization", new Header() ],
				] ) );
			} );

			it( "should call and add the header value `createHeaderValue`", ():void => {
				const authenticator:Authenticator.Authenticator<object, object> = createAuthenticatorWith( {} );

				const spy:jasmine.Spy = spyOn( authenticator, "getHeaderValue" as any )
					.and.returnValue( "value" );

				const options:RequestOptions = {};
				authenticator.addAuthentication( options );

				expect( spy ).toHaveBeenCalled();
				expect( options.headers ).toEqual( new Map( [
					[ "authorization", new Header( [ "value" ] ) ],
				] ) );
			} );

		} );

	} );

} );
