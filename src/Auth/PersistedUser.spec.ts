import AbstractContext from "../AbstractContext";
import { Response } from "../HTTP/Response";
import { PersistedDocument } from "./../PersistedDocument";
import { PersistedProtectedDocument } from "./../PersistedProtectedDocument";
import {
	clazz,
	decoratedObject,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	INSTANCE,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	STATIC,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as PersistedCredentials from "./PersistedCredentials";

import * as PersistedUser from "./PersistedUser";
import DefaultExport from "./PersistedUser";

interface MockPersistedUser {
	name:string;
	credentials:PersistedCredentials.Class;
	enableCredentials:Function;
	disableCredentials:Function;
}

describe( module( "carbonldp/Auth/PersistedUser" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedUser ).toBeDefined();
		expect( Utils.isObject( PersistedUser ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.Auth.PersistedUser.Class",
		"Interface that represents the base of a persisted User in any context."
	), ():void => {

		it( extendsClass( "CarbonLDP.PersistedProtectedDocument.PersistedProtectedDocument" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"string",
			"The name of he current User."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"email",
			"string",
			"The email of he current User."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"enabled",
			"boolean",
			"Flag that indicates if the current user has been activated o not."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"password",
			"string",
			"Property that represents the password of the user. This property is not retrieved but you can change the current password by setting a new one here and saving it."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"enableCredentials",
			"Activate the account credentials of the user.",
			{ type: "Promise<[ CarbonLDP.Auth.PersistedUser.Class, CarbonLDP.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"disableCredentials",
			"Deactivate the account credentials of the user.",
			{ type: "Promise<[ CarbonLDP.Auth.PersistedUser.Class, CarbonLDP.HTTP.Response.Response ]>" }
		), ():void => {} );

	} );

	describe( clazz(
		"CarbonLDP.Auth.PersistedUser.Factory",
		"Factory class for `CarbonLDP.Auth.PersistedUser.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedUser.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedUser.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `CarbonLDP.Auth.PersistedUser.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedUser.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedUser.Factory.hasClassProperties ) ).toBe( true );

			let object:MockPersistedUser = void 0;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
				credentials: null,
				enableCredentials: ():void => {},
				disableCredentials: ():void => {},
			};
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( true );
			object.name = null;

			delete object.credentials;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( true );
			object.credentials = null;

			delete object.enableCredentials;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
			object.enableCredentials = ():void => {};

			delete object.disableCredentials;
			expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
			object.disableCredentials = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.Auth.PersistedUser.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedUser.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedUser.Factory.is ) ).toBe( true );

			let object:MockPersistedUser;

			object = {
				name: null,
				credentials: null,
				enableCredentials: ():void => {},
				disableCredentials: ():void => {},
			};
			expect( PersistedUser.Factory.is( object ) ).toBe( false );

			object = PersistedDocument.decorate<MockPersistedUser>( {
				name: null,
				credentials: null,
				enableCredentials: ():void => {},
				disableCredentials: ():void => {},
			}, null );
			expect( PersistedUser.Factory.is( object ) ).toBe( false );

			object = PersistedProtectedDocument.decorate( {
				name: null,
				credentials: null,
				enableCredentials: ():void => {},
				disableCredentials: ():void => {},
			}, null );
			expect( PersistedUser.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Auth.PersistedUser.Class` object.", [
				{ name: "object", type: "T", description: "The object to decorate." },
			],
			{ type: "T & CarbonLDP.Auth.PersistedUser.Class" }
		), ():void => {
			expect( PersistedUser.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedUser.Factory.decorate ) ).toBe( true );

			let object:Partial<MockPersistedUser> & { myProperty?:string };

			object = { myProperty: "My Property" };
			expect( object.myProperty ).toBe( "My Property" );
			expect( object.enableCredentials ).toBeUndefined();
			expect( object.disableCredentials ).toBeUndefined();

			let fn:Function = ():void => {};
			object = PersistedUser.Factory.decorate( {
				name: null,
				credentials: null,
				myProperty: "My Property",
				enableCredentials: fn,
				disableCredentials: fn,
			}, null );
			expect( object.myProperty ).toBe( "My Property" );
			expect( object.enableCredentials ).toBeDefined();
			expect( object.enableCredentials ).toBe( fn );
			expect( object.disableCredentials ).toBeDefined();
			expect( object.disableCredentials ).toBe( fn );

			object = PersistedUser.Factory.decorate( {
				name: null,
				credentials: null,
				myProperty: "My Property",
			}, null );
			expect( object.myProperty ).toBe( "My Property" );
			expect( object.enableCredentials ).toBeDefined();
			expect( object.enableCredentials ).not.toBe( fn );
			expect( object.disableCredentials ).toBeDefined();
			expect( object.disableCredentials ).not.toBe( fn );
		} );

		describe( decoratedObject( "Object decorated by the `CarbonLDP.Auth.PersistedUser.Factory.decorate()` function.", [
			"CarbonLDP.Auth.PersistedUser.Class",
		] ), ():void => {
			let context:AbstractContext;

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { paths: { system: ".system/" } };
					}
				}
				context = new MockedContext();
			} );

			it( hasMethod(
				INSTANCE,
				"enableCredentials",
				"Activate the account of the user.",
				{ type: "Promise<[ CarbonLDP.Auth.PersistedUser.Class, CarbonLDP.HTTP.Response.Response[] ]>" }
			), ( done:DoneFn ):void => {
				const mockedResponse:Response = new Response( {} as any, "response-data" );
				const promises:Promise<void>[] = [];

				function checkResponse( currentObject:PersistedUser.Class, expectedResponses:number, [ returnedObject, responses ]:[ PersistedUser.Class, Response[] ] ):void {
					expect( currentObject ).toBe( returnedObject );
					expect( responses.length ).toBe( expectedResponses );
					responses.forEach( response => expect( response ).toBe( mockedResponse ) );
				}

				// Property Integrity
				(() => {
					const user:PersistedUser.Class = PersistedUser.Factory.decorate( {}, null );
					expect( user.enableCredentials ).toBeDefined();
					expect( Utils.isFunction( user.enableCredentials ) ).toBe( true );
				})();

				// Will make a request for the credentials
				(() => {
					const mockCredentials:PersistedCredentials.Class = PersistedCredentials.Factory.decorate(
						context.documents.getPointer( "http://example.org/.system/credentials/my-user-credentials/" ),
						context.documents
					);
					const selectSPARQLSpy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" ).and.returnValue( Promise.resolve( [ { bindings: [ { credentials: mockCredentials } ] }, mockedResponse ] ) );
					Object.defineProperty( mockCredentials, "enable", { writable: true } );
					const enableSpy:jasmine.Spy = spyOn( mockCredentials, "enable" ).and.returnValue( [ {}, [ mockedResponse ] ] );

					const user:PersistedUser.Class = PersistedUser.Factory.decorate( {
						id: "http://example.com/user/my-user/",
					}, context.documents );
					const promise:Promise<[ PersistedUser.Class, Response[] ]> = user.enableCredentials();
					expect( promise ).toEqual( jasmine.any( Promise ) );
					promises.push( promise.then( checkResponse.bind( null, user, 2 ) ).then( () => {
						expect( selectSPARQLSpy ).toHaveBeenCalledTimes( 1 );
						expect( enableSpy ).toHaveBeenCalledTimes( 1 );
					} ) );
				})();

				// Already has the credentials relation
				(() => {
					const mockCredentials:PersistedCredentials.Class = PersistedCredentials.Factory.decorate( {}, context.documents );
					Object.defineProperty( mockCredentials, "enable", { writable: true } );
					const enableSpy:jasmine.Spy = spyOn( mockCredentials, "enable" ).and.returnValue( [ {}, [ mockedResponse ] ] );

					const user:PersistedUser.Class = PersistedUser.Factory.decorate( {
						credentials: mockCredentials,
					}, context.documents );
					const promise:Promise<[ PersistedUser.Class, Response[] ]> = user.enableCredentials();
					expect( promise ).toEqual( jasmine.any( Promise ) );
					promises.push( promise.then( checkResponse.bind( null, user, 1 ) ).then( () => {
						expect( enableSpy ).toHaveBeenCalledTimes( 1 );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

			it( hasMethod(
				INSTANCE,
				"disableCredentials",
				"Deactivate the account of the user.",
				{ type: "Promise<[ CarbonLDP.Auth.PersistedUser.Class, CarbonLDP.HTTP.Response.Response[] ]>" }
			), ( done:DoneFn ):void => {
				const mockedResponse:Response = new Response( {} as any, "response-data" );
				const promises:Promise<void>[] = [];

				function checkResponse( currentObject:PersistedUser.Class, expectedResponses:number, [ returnedObject, responses ]:[ PersistedUser.Class, Response[] ] ):void {
					expect( currentObject ).toBe( returnedObject );
					expect( responses.length ).toBe( expectedResponses );
					responses.forEach( response => expect( response ).toBe( mockedResponse ) );
				}

				// Property Integrity
				(() => {
					const user:PersistedUser.Class = PersistedUser.Factory.decorate( {}, null );
					expect( user.disableCredentials ).toBeDefined();
					expect( Utils.isFunction( user.disableCredentials ) ).toBe( true );
				})();

				// Will make a request for the credentials
				(() => {
					const mockCredentials:PersistedCredentials.Class = PersistedCredentials.Factory.decorate(
						context.documents.getPointer( "http://example.org/.system/credentials/my-user-credentials/" ),
						context.documents
					);
					const selectSPARQLSpy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" ).and.returnValue( Promise.resolve( [ { bindings: [ { credentials: mockCredentials } ] }, mockedResponse ] ) );
					Object.defineProperty( mockCredentials, "disable", { writable: true } );
					const enableSpy:jasmine.Spy = spyOn( mockCredentials, "disable" ).and.returnValue( [ {}, [ mockedResponse ] ] );

					const user:PersistedUser.Class = PersistedUser.Factory.decorate( { id: "http://example.com/user/my-user/" }, context.documents );

					const promise:Promise<[ PersistedUser.Class, Response[] ]> = user.disableCredentials();
					expect( promise ).toEqual( jasmine.any( Promise ) );
					promises.push( promise.then( checkResponse.bind( null, user, 2 ) ).then( () => {
						expect( selectSPARQLSpy ).toHaveBeenCalledTimes( 1 );
						expect( enableSpy ).toHaveBeenCalledTimes( 1 );
					} ) );
				})();

				// Already has the credentials relation
				(() => {
					const mockCredentials:PersistedCredentials.Class = PersistedCredentials.Factory.decorate( {}, context.documents );
					Object.defineProperty( mockCredentials, "disable", { writable: true } );
					const enableSpy:jasmine.Spy = spyOn( mockCredentials, "disable" ).and.returnValue( [ {}, [ mockedResponse ] ] );

					const user:PersistedUser.Class = PersistedUser.Factory.decorate( { credentials: mockCredentials }, context.documents );

					const promise:Promise<[ PersistedUser.Class, Response[] ]> = user.disableCredentials();
					expect( promise ).toEqual( jasmine.any( Promise ) );
					promises.push( promise.then( checkResponse.bind( null, user, 1 ) ).then( () => {
						expect( enableSpy ).toHaveBeenCalledTimes( 1 );
					} ) );
				})();

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.PersistedUser.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedUser.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
