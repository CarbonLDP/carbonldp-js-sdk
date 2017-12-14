import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	STATIC,
} from "../test/JasmineExtender";

import { StrictMinus } from "../Utils";
import AbstractContext from "./../AbstractContext";
import * as User from "./../Auth/User";
import * as PersistedProtectedDocument from "./../PersistedProtectedDocument";

import * as PersistedUser from "./PersistedUser";


describe( module( "Carbon/Auth/PersistedUser" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedUser ).toBeDefined();
		expect( PersistedUser ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"Carbon.Auth.PersistedUser.Class",
		"Interface that represents the base of a persisted User in any context."
	), ():void => {

		it( extendsClass( "Carbon.Auth.User.Class" ), ():void => {} );
		it( extendsClass( "Carbon.PersistedProtectedDocument.Class" ), ():void => {} );

		let context:AbstractContext;
		let persistedUser:PersistedUser.Class;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};

			persistedUser = PersistedUser.Factory.decorate(
				Object.assign( context.documents.getPointer( "https://example.com/resource/" ), {} ),
				context.documents
			);
		} );

		describe( method( OBLIGATORY, "enable" ), ():void => {

			it( hasSignature(
				"Activate the account of the user.",
				[
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( persistedUser.enable ).toBeDefined();
				expect( persistedUser.enable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should get and save", ( done:DoneFn ):void => {
				const fakeGetResponse:any = { fake: "GET Response" };
				const getSpy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, fakeGetResponse ] ) );

				const fakeSaveResponse:any = { fake: "SAVE Response" };
				const saveSpy:jasmine.Spy = spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, fakeSaveResponse ] ) );

				persistedUser
					.enable()
					.then( () => {
						expect( getSpy ).toHaveBeenCalledWith( "https://example.com/resource/" );
						expect( saveSpy ).toHaveBeenCalledWith( persistedUser, void 0 );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return the get and save responses", ( done:DoneFn ):void => {
				const fakeGetResponse:any = { fake: "GET Response" };
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, fakeGetResponse ] ) );

				const fakeSaveResponse:any = { fake: "SAVE Response" };
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, fakeSaveResponse ] ) );

				persistedUser
					.enable()
					.then( ( [ , responses ] ) => {
						expect( responses ).toEqual( [
							fakeGetResponse,
							fakeSaveResponse,
						] );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should not return get response when resolved", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );

				const fakeSaveResponse:any = { fake: "SAVE Response" };
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, fakeSaveResponse ] ) );

				persistedUser._resolved = false;
				persistedUser
					.enable()
					.then( ( [ , responses ] ) => {
						expect( responses ).toEqual( [
							fakeSaveResponse,
						] );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return itself", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );

				persistedUser
					.enable()
					.then( ( [ returned ] ) => {
						expect( returned ).toBe( persistedUser );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should set the `enabled` flag", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );

				persistedUser
					.enable()
					.then( () => {
						expect( persistedUser ).toEqual( jasmine.objectContaining( {
							enabled: true,
						} ) );

						expect( persistedUser ).not.toEqual( jasmine.objectContaining( {
							disabled: jasmine.anything() as any,
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should delete the `disabled` flag", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );

				persistedUser.disabled = true;
				persistedUser
					.enable()
					.then( () => {
						expect( persistedUser ).not.toEqual( jasmine.objectContaining( {
							disabled: jasmine.anything() as any,
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

		} );

		describe( method( OBLIGATORY, "disable" ), ():void => {

			it( hasSignature(
				"Deactivate the account of the user.",
				[
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedUser.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( persistedUser.disable ).toBeDefined();
				expect( persistedUser.disable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should get and save", ( done:DoneFn ):void => {
				const fakeGetResponse:any = { fake: "GET Response" };
				const getSpy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, fakeGetResponse ] ) );

				const fakeSaveResponse:any = { fake: "SAVE Response" };
				const saveSpy:jasmine.Spy = spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, fakeSaveResponse ] ) );

				persistedUser
					.disable()
					.then( () => {
						expect( getSpy ).toHaveBeenCalledWith( "https://example.com/resource/" );
						expect( saveSpy ).toHaveBeenCalledWith( persistedUser, void 0 );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return the get and save responses", ( done:DoneFn ):void => {
				const fakeGetResponse:any = { fake: "GET Response" };
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, fakeGetResponse ] ) );

				const fakeSaveResponse:any = { fake: "SAVE Response" };
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, fakeSaveResponse ] ) );

				persistedUser
					.disable()
					.then( ( [ , responses ] ) => {
						expect( responses ).toEqual( [
							fakeGetResponse,
							fakeSaveResponse,
						] );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should not return get response when resolved", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );

				const fakeSaveResponse:any = { fake: "SAVE Response" };
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, fakeSaveResponse ] ) );

				persistedUser._resolved = false;
				persistedUser
					.disable()
					.then( ( [ , responses ] ) => {
						expect( responses ).toEqual( [
							fakeSaveResponse,
						] );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return itself", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );

				persistedUser
					.disable()
					.then( ( [ returned ] ) => {
						expect( returned ).toBe( persistedUser );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should set the `disabled` flag", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );

				persistedUser
					.disable()
					.then( () => {
						expect( persistedUser ).toEqual( jasmine.objectContaining( {
							disabled: true,
						} ) );

						expect( persistedUser ).not.toEqual( jasmine.objectContaining( {
							enabled: jasmine.anything() as any,
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should delete the `enabled` flag", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( [ null, null ] ) );

				persistedUser.enabled = true;
				persistedUser
					.disable()
					.then( () => {
						expect( persistedUser ).not.toEqual( jasmine.objectContaining( {
							enabled: jasmine.anything() as any,
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

		} );

	} );

	describe( clazz(
		"Carbon.Auth.PersistedUser.Factory",
		"Factory class for `Carbon.Auth.PersistedUser.Class` objects."
	), ():void => {

		type MockPersistedUser = StrictMinus<PersistedUser.Class, User.Class & PersistedProtectedDocument.Class>;

		it( isDefined(), ():void => {
			expect( PersistedUser.Factory ).toBeDefined();
			expect( PersistedUser.Factory ).toEqual( jasmine.any( Function ) );
		} );

		describe( method( STATIC, "hasClassProperties" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided has the properties of a `Carbon.Auth.PersistedUser.Class` object.", [
					{ name: "object", type: "object" },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( PersistedUser.Factory.hasClassProperties ).toBeDefined();
				expect( PersistedUser.Factory.hasClassProperties ).toEqual( jasmine.any( Function ) );
			} );

			it( "should reject undefined value", ():void => {
				expect( PersistedUser.Factory.hasClassProperties( void 0 ) ).toBe( false );
			} );

			it( "should only reject in required properties", ():void => {
				const object:MockPersistedUser = {
					enable: ():any => {},
					disable: ():any => {},
				};
				expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( true );

				delete object.enable;
				expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
				object.enable = ():any => {};

				delete object.disable;
				expect( PersistedUser.Factory.hasClassProperties( object ) ).toBe( false );
				object.disable = ():any => {};
			} );

		} );

		describe( method( STATIC, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided is considered a `Carbon.Auth.PersistedUser.Class` object.", [
					{ name: "object", type: "object" },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( PersistedUser.Factory.is ).toBeDefined();
				expect( PersistedUser.Factory.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call to `PersistedUser.Factory.hasClassProperties`", ():void => {
				const spy:jasmine.Spy = spyOn( PersistedUser.Factory, "hasClassProperties" );

				const object:object = { the: "object" };
				PersistedUser.Factory.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should call to `User.Factory.hasClassProperties`", ():void => {
				spyOn( PersistedUser.Factory, "hasClassProperties" )
					.and.returnValue( true );
				const spy:jasmine.Spy = spyOn( User.Factory, "hasClassProperties" );

				const object:object = { the: "object" };
				PersistedUser.Factory.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should call to `PersistedProtectedDocument.Factory.is`", ():void => {
				spyOn( PersistedUser.Factory, "hasClassProperties" )
					.and.returnValue( true );
				spyOn( User.Factory, "hasClassProperties" )
					.and.returnValue( true );
				const spy:jasmine.Spy = spyOn( PersistedProtectedDocument.Factory, "is" );

				const object:object = { the: "object" };
				PersistedUser.Factory.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should return true when all verifications pass", ():void => {
				spyOn( PersistedUser.Factory, "hasClassProperties" )
					.and.returnValue( true );
				spyOn( User.Factory, "hasClassProperties" )
					.and.returnValue( true );
				spyOn( PersistedProtectedDocument.Factory, "is" )
					.and.returnValue( true );

				const object:object = { the: "object" };
				const returned:boolean = PersistedUser.Factory.is( object );

				expect( returned ).toBe( true );
			} );

		} );

		describe( method( STATIC, "decorate" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Decorates the object provided with the properties and methods of a `Carbon.Auth.PersistedUser.Class` object.", [
					{ name: "object", type: "T", description: "The object to decorate." },
					{ name: "documents", type: "Carbon.Documents.Class", description: "The documents service the persisted belongs to." },
				],
				{ type: "T & Carbon.Auth.PersistedUser.Class" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( PersistedUser.Factory.decorate ).toBeDefined();
				expect( PersistedUser.Factory.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the same object", ():void => {
				const object:object = {};
				const returned:object = PersistedUser.Factory.decorate( object, null );
				expect( returned ).toBe( object );
			} );

			it( "should return without changes if already with class properties", ():void => {
				const fn:() => any = () => {};
				const object:MockPersistedUser = {
					enable: fn,
					disable: fn,
				};

				PersistedUser.Factory.decorate( object, null );
				expect( object ).toEqual( jasmine.objectContaining( {
					enable: fn,
					disable: fn,
				} ) );
			} );

			it( "should add the class properties", ():void => {
				const returned:PersistedUser.Class = PersistedUser.Factory.decorate( {}, null );
				expect( returned ).toEqual( jasmine.objectContaining( {
					enable: jasmine.any( Function ),
					disable: jasmine.any( Function ),
				} ) );
			} );

			it( "should call `User.Factory.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( User.Factory, "decorate" );

				const object:object = { the: "object" };
				PersistedUser.Factory.decorate( object, null );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should call `PersistedProtectedDocument.Factory.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( PersistedProtectedDocument.Factory, "decorate" );

				const object:object = { the: "object" };
				const fakeDocuments:any = { fake: "Documents" };
				PersistedUser.Factory.decorate( object, fakeDocuments );

				expect( spy ).toHaveBeenCalledWith( object, fakeDocuments );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.PersistedUser.Class" ), ():void => {
		let defaultExport:PersistedUser.default = <any> {};
		let defaultTarget:PersistedUser.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
