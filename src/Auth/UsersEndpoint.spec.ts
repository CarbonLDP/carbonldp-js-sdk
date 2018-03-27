import { Documents } from "../Documents";
import { IllegalArgumentError } from "../Errors";
import {
	hasSignature,
	INSTANCE,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { PersistedUser } from "./PersistedUser";

import { UsersEndpoint } from "./UsersEndpoint";


describe( module( "carbonldp/Auth/UsersEndpoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.UsersEndpoint",
		"Endpoint for manage the users of a Carbon LDP instance."
	), ():void => {

		describe( method( OBLIGATORY, "enable" ), ():void => {

			it( hasSignature(
				"Activate the account of the specified user.",
				[
					{ name: "userURI", type: "string", description: "The URI of the user to activate." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<CarbonLDP.Auth.PersistedUser>" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "disable" ), ():void => {

			it( hasSignature(
				"Deactivate the account of the specified user.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<CarbonLDP.Auth.PersistedUser>" }
			), ():void => {} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.UsersEndpointFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Auth.UsersEndpoint` objects."
	), ():void => {
		// TODO: Document
	} );

	describe( property(
		STATIC,
		"UsersEndpoint",
		"CarbonLDP.AuthUsersEndpointFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( UsersEndpoint ).toBeDefined();
			expect( UsersEndpoint ).toEqual( jasmine.any( Object ) );
		} );

		let documents:Documents;
		let users:UsersEndpoint;
		beforeEach( ():void => {
			documents = new Documents();

			users = UsersEndpoint.decorate( {
				id: "https://example.com/users/",
			}, documents );
		} );

		describe( method( INSTANCE, "enable" ), ():void => {


			it( "should exists", ():void => {
				expect( users.enable ).toBeDefined();
				expect( users.enable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call the `PersistedUser.enable` method", ( done:DoneFn ):void => {
				const persistedUser:PersistedUser = PersistedUser.decorate(
					documents.getPointer( "https://example.com/users/my-user/" ),
					documents
				);
				const spy:jasmine.Spy = spyOn( persistedUser, "enable" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				users
					.enable( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );

						expect( spy ).toHaveBeenCalledWith( void 0 );

						done();
					} )
				;
			} );

			it( "should pass on the request options", ( done:DoneFn ):void => {
				const persistedUser:PersistedUser = PersistedUser.decorate(
					documents.getPointer( "https://example.com/users/my-user/" ),
					documents
				);
				const spy:jasmine.Spy = spyOn( persistedUser, "enable" )
					.and.returnValue( Promise.reject( null ) );

				users
					.enable( "my-user/", { timeout: 55000 } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( { timeout: 55000 } );

						done();
					} )
				;
			} );


			it( "should reject when invalid user URI", ( done:DoneFn ):void => {
				users
					.enable( "https://example.com/another-container/not-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( IllegalArgumentError ) );
						expect( error.message ).toBe( `The URI "https://example.com/another-container/not-user/" isn't a child of "https://example.com/users/".` );

						done();
					} )
				;
			} );

		} );

		describe( method( INSTANCE, "disable" ), ():void => {

			it( "should exists", ():void => {
				expect( users.disable ).toBeDefined();
				expect( users.disable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call the `PersistedUser.disable` method", ( done:DoneFn ):void => {
				const persistedUser:PersistedUser = PersistedUser.decorate(
					documents.getPointer( "https://example.com/users/my-user/" ),
					documents
				);
				const spy:jasmine.Spy = spyOn( persistedUser, "disable" )
					.and.returnValue( Promise.reject( { fake: "Error" } ) );

				users
					.disable( "my-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( { fake: "Error" } );

						expect( spy ).toHaveBeenCalled();

						done();
					} )
				;
			} );

			it( "should pass on the request options", ( done:DoneFn ):void => {
				const persistedUser:PersistedUser = PersistedUser.decorate(
					documents.getPointer( "https://example.com/users/my-user/" ),
					documents
				);
				const spy:jasmine.Spy = spyOn( persistedUser, "disable" )
					.and.returnValue( Promise.reject( null ) );

				users
					.disable( "my-user/", { timeout: 55000 } )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						expect( spy ).toHaveBeenCalledWith( { timeout: 55000 } );

						done();
					} )
				;
			} );


			it( "should reject when invalid user URI", ( done:DoneFn ):void => {
				users
					.disable( "https://example.com/another-container/not-user/" )
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( error => {
						expect( error ).toEqual( jasmine.any( IllegalArgumentError ) );
						expect( error.message ).toBe( `The URI "https://example.com/another-container/not-user/" isn't a child of "https://example.com/users/".` );

						done();
					} )
				;
			} );

		} );

	} );

} );
