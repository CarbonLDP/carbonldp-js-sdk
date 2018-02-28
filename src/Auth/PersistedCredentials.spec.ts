import {
	STATIC,
	INSTANCE,

	OPTIONAL,
	OBLIGATORY,

	module,
	clazz,
	interfaze,
	decoratedObject,

	isDefined,
	hasMethod,
	extendsClass,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import AbstractContext from "../AbstractContext";
import { Documents } from "./../Documents";
import { Response } from "../HTTP/Response";
import * as Utils from "./../Utils";
import * as PersistedUser from "./PersistedUser";

import * as PersistedCredentials from "./PersistedCredentials";
import DefaultExport from "./PersistedCredentials";

interface MockCredentials {
	email:string;
	password:string;
	enabled:boolean;
	user:PersistedUser.Class;
	enable:Function;
	disable:Function;
}

describe( module( "Carbon/Auth/PersistedCredentials" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedCredentials ).toBeDefined();
		expect( Utils.isObject( PersistedCredentials ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Auth.PersistedCredentials.Class",
		"Interface that represents a persisted Credentials."
	), ():void => {

		it( extendsClass( "Carbon.PersistedProtectedDocument.Class" ), ():void => {} );
		it( extendsClass( "Carbon.Auth.Credentials.Class" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"email",
			"string",
			"Email of persisted user's credentials"
		), ():void => {
			const email:string = "";
			const persistedCredentials:PersistedCredentials.Class = <any> {};

			persistedCredentials.email = email;
		} );

		it( hasProperty(
			OPTIONAL,
			"password",
			"string",
			"The encrypted password of the persisted user's credentials.\nIf you modify the field and save it, this will trigger a password change in the platform."
		), ():void => {
			const password:string = "";
			const persistedCredentials:PersistedCredentials.Class = <any> {};

			persistedCredentials.password = password;
		} );

		it( hasProperty(
			OPTIONAL,
			"enabled",
			"boolean",
			"Flag that indicates if the user's credentials is active or not."
		), ():void => {
			const enabled:boolean = true;
			const persistedCredentials:PersistedCredentials.Class = <any> {};

			persistedCredentials.enabled = enabled;
		} );

		it( hasProperty(
			OPTIONAL,
			"user",
			"Carbon.Auth.PersistedUser.Class",
			"Reference to the persisted user's document metadata."
		), ():void => {
			const user:PersistedUser.Class = <any> {};
			const persistedCredentials:PersistedCredentials.Class = <any> {};

			persistedCredentials.user = user;
		} );

		it( hasMethod(
			OBLIGATORY,
			"enable",
			"Activate the persisted user's credentials.",
			{ type: "Promise<[ Carbon.Auth.PersistedCredentials.Class, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"disable",
			"Deactivate the persisted user's credentials.",
			{ type: "Promise<[ Carbon.Auth.PersistedCredentials.Class, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.Auth.PersistedCredentials.Factory",
		"Factory class for `Carbon.Auth.PersistedCredentials.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedCredentials.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedCredentials.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.Auth.PersistedCredentials.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedCredentials.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedCredentials.Factory.hasClassProperties ) ).toBe( true );

			let object:MockCredentials = void 0;
			expect( PersistedCredentials.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				email: null,
				password: null,
				enabled: null,
				user: null,
				enable: ():void => {},
				disable: ():void => {},
			};
			expect( PersistedCredentials.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.email;
			expect( PersistedCredentials.Factory.hasClassProperties( object ) ).toBe( true );
			object.email = null;

			delete object.password;
			expect( PersistedCredentials.Factory.hasClassProperties( object ) ).toBe( true );
			object.password = null;

			delete object.enabled;
			expect( PersistedCredentials.Factory.hasClassProperties( object ) ).toBe( true );
			object.enabled = null;

			delete object.user;
			expect( PersistedCredentials.Factory.hasClassProperties( object ) ).toBe( true );
			object.user = null;

			delete object.enable;
			expect( PersistedCredentials.Factory.hasClassProperties( object ) ).toBe( false );
			object.enable = ():void => {};

			delete object.disable;
			expect( PersistedCredentials.Factory.hasClassProperties( object ) ).toBe( false );
			object.disable = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.Auth.PersistedCredentials.Class` object.", [
				{ name: "object", type: "T", description: "The object to decorate." },
			],
			{ type: "T & Carbon.Auth.PersistedCredentials.Class" }
		), ():void => {
			expect( PersistedCredentials.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedCredentials.Factory.decorate ) ).toBe( true );

			interface AnotherMockCredentials extends MockCredentials {
				myProperty:string;
			}

			let persistedCredentials:PersistedCredentials.Class & AnotherMockCredentials;
			let fn:Function = ():void => {};

			let completeCredentials:AnotherMockCredentials = {
				email: null,
				password: null,
				enabled: null,
				user: null,
				myProperty: "My Property",
				enable: fn,
				disable: fn,
			};
			persistedCredentials = PersistedCredentials.Factory.decorate( completeCredentials, new Documents() );
			expect( persistedCredentials ).toBe( completeCredentials as PersistedCredentials.Class & AnotherMockCredentials );
			expect( persistedCredentials.myProperty ).toBe( "My Property" );
			expect( persistedCredentials.enable ).toBeDefined();
			expect( persistedCredentials.enable ).toBe( fn );
			expect( persistedCredentials.disable ).toBeDefined();
			expect( persistedCredentials.disable ).toBe( fn );

			let partialCredentials:Partial<AnotherMockCredentials> = {
				email: null,
				enabled: null,
				myProperty: "My Property",
			};
			persistedCredentials = PersistedCredentials.Factory.decorate<any>( partialCredentials, new Documents );
			expect( persistedCredentials ).toBe( partialCredentials as PersistedCredentials.Class & AnotherMockCredentials );
			expect( persistedCredentials.myProperty ).toBe( "My Property" );
			expect( persistedCredentials.enable ).toBeDefined();
			expect( persistedCredentials.enable ).not.toBe( fn );
			expect( persistedCredentials.disable ).toBeDefined();
			expect( persistedCredentials.disable ).not.toBe( fn );
		} );

		describe( decoratedObject( "Object decorated by the `Carbon.Auth.PersistedCredentials.Factory.decorate()` function.", [
			"Carbon.Auth.PersistedCredentials.Class",
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
				"enable",
				"Activate user's credentials.",
				{ type: "Promise<[ Carbon.Auth.PersistedCredentials.Class, Carbon.HTTP.Response.Response[] ]>" }
			), ( done:DoneFn ):void => {
				const mockedResponse:Response = new Response( {} as any, "response-data" );
				let spy:jasmine.Spy = spyOn( context.documents, "save" ).and.returnValue( Promise.resolve( [ null, mockedResponse ] ) );

				function checkReturnedValues( currentCredentials:PersistedCredentials.Class, expectedResponses:number, [ returnedCredentials, responses ]:[ PersistedCredentials.Class, Response[] ] ):void {
					expect( returnedCredentials ).toBe( currentCredentials );
					expect( returnedCredentials ).toEqual( jasmine.objectContaining( { enabled: true } ) );

					expect( responses ).toEqual( jasmine.any( Array ) );
					expect( responses.length ).toBe( expectedResponses );
					responses.forEach( response => expect( response ).toBe( mockedResponse ) );
				}

				let currentCheck:( returnedData:[ PersistedCredentials.Class, Response[] ] ) => void;

				let credentials:PersistedCredentials.Class;
				let promise:Promise<[ PersistedCredentials.Class, Response[] ]>;
				const promises:Promise<void>[] = [];

				credentials = PersistedCredentials.Factory.decorate( {}, context.documents );
				expect( credentials.enable ).toBeDefined();
				expect( Utils.isFunction( credentials.enable ) ).toBe( true );


				credentials = PersistedCredentials.Factory.decorate( {}, context.documents );
				Object.defineProperty( credentials, "resolve", {
					value: ():Promise<[ PersistedCredentials.Class, Response ]> => {
						credentials._resolved = true;
						return Promise.resolve<[ PersistedCredentials.Class, Response ]>( [ credentials, mockedResponse ] );
					},
				} );
				promise = credentials.enable();

				expect( promise ).toEqual( jasmine.any( Promise ) );
				currentCheck = checkReturnedValues.bind( null, credentials, 2 );
				promises.push( promise.then( currentCheck ) );


				credentials = PersistedCredentials.Factory.decorate<Partial<PersistedCredentials.Class>>( { _resolved: true }, context.documents );
				promise = credentials.enable();

				expect( promise ).toEqual( jasmine.any( Promise ) );
				currentCheck = checkReturnedValues.bind( null, credentials, 1 );
				promises.push( promise.then( currentCheck ) );


				credentials = PersistedCredentials.Factory.decorate<Partial<PersistedCredentials.Class>>( { _resolved: true, enabled: false }, context.documents );
				promise = credentials.enable();
				expect( promise ).toEqual( jasmine.any( Promise ) );

				currentCheck = checkReturnedValues.bind( null, credentials, 1 );
				promises.push( promise.then( currentCheck ) );


				credentials = PersistedCredentials.Factory.decorate<Partial<PersistedCredentials.Class>>( { _resolved: true, enabled: true }, context.documents );
				promise = credentials.enable();

				expect( promise ).toEqual( jasmine.any( Promise ) );
				currentCheck = checkReturnedValues.bind( null, credentials, 1 );
				promises.push( promise.then( currentCheck ) );

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledTimes( 4 );
					done();
				} ).catch( done.fail );
			} );

			it( hasMethod(
				INSTANCE,
				"disable",
				"Deactivate the user's credentials.",
				{ type: "Promise<[ Carbon.Auth.PersistedCredentials.Class, Carbon.HTTP.Response.Response[] ]>" }
			), ( done:DoneFn ):void => {
				const mockedResponse:Response = new Response( {} as any, "response-data" );
				let spy:jasmine.Spy = spyOn( context.documents, "save" ).and.returnValue( Promise.resolve( [ null, mockedResponse ] ) );

				function checkReturnedValues( currentCredentials:PersistedCredentials.Class, expectedResponses:number, [ returnedCredentials, responses ]:[ PersistedCredentials.Class, Response[] ] ):void {
					expect( returnedCredentials ).toBe( currentCredentials );
					expect( returnedCredentials ).toEqual( jasmine.objectContaining( { enabled: false } ) );

					expect( responses ).toEqual( jasmine.any( Array ) );
					expect( responses.length ).toBe( expectedResponses );
					responses.forEach( response => expect( response ).toBe( mockedResponse ) );
				}

				let currentCheck:( returnedData:[ PersistedCredentials.Class, Response[] ] ) => void;

				let credentials:PersistedCredentials.Class;
				let promise:Promise<[ PersistedCredentials.Class, Response[] ]>;
				const promises:Promise<void>[] = [];

				credentials = PersistedCredentials.Factory.decorate( {}, context.documents );
				expect( credentials.disable ).toBeDefined();
				expect( Utils.isFunction( credentials.disable ) ).toBe( true );


				credentials = PersistedCredentials.Factory.decorate( {}, context.documents );
				Object.defineProperty( credentials, "resolve", {
					value: ():Promise<[ PersistedCredentials.Class, Response ]> => {
						credentials._resolved = true;
						return Promise.resolve<[ PersistedCredentials.Class, Response ]>( [ credentials, mockedResponse ] );
					},
				} );
				promise = credentials.disable();

				expect( promise ).toEqual( jasmine.any( Promise ) );
				currentCheck = checkReturnedValues.bind( null, credentials, 2 );
				promises.push( promise.then( currentCheck ) );


				credentials = PersistedCredentials.Factory.decorate<Partial<PersistedCredentials.Class>>( { _resolved: true }, context.documents );
				promise = credentials.disable();

				expect( promise ).toEqual( jasmine.any( Promise ) );
				currentCheck = checkReturnedValues.bind( null, credentials, 1 );
				promises.push( promise.then( currentCheck ) );


				credentials = PersistedCredentials.Factory.decorate<Partial<PersistedCredentials.Class>>( { _resolved: true, enabled: false }, context.documents );
				promise = credentials.disable();
				expect( promise ).toEqual( jasmine.any( Promise ) );

				currentCheck = checkReturnedValues.bind( null, credentials, 1 );
				promises.push( promise.then( currentCheck ) );


				credentials = PersistedCredentials.Factory.decorate<Partial<PersistedCredentials.Class>>( { _resolved: true, enabled: true }, context.documents );
				promise = credentials.disable();

				expect( promise ).toEqual( jasmine.any( Promise ) );
				currentCheck = checkReturnedValues.bind( null, credentials, 1 );
				promises.push( promise.then( currentCheck ) );

				Promise.all( promises ).then( () => {
					expect( spy ).toHaveBeenCalledTimes( 4 );
					done();
				} ).catch( done.fail );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.PersistedCredentials.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedCredentials.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
