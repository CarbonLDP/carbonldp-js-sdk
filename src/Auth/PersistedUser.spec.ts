import { StrictMinus } from "../../test/helpers/types";
import { AbstractContext } from "../AbstractContext";
import { RequestOptions } from "../HTTP";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { Pointer } from "../Pointer";
import {
	extendsClass,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";

import { PersistedUser } from "./PersistedUser";

import { User } from "./User";


describe( module( "carbonldp/Auth/PersistedUser" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.PersistedUser",
		"Interface that represents the base of a persisted User in any context."
	), ():void => {

		it( extendsClass( "CarbonLDP.Auth.User" ), ():void => {} );
		it( extendsClass( "CarbonLDP.PersistedProtectedDocument" ), ():void => {} );

		let context:AbstractContext;
		let persistedUser:PersistedUser;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};

			const pointerUser:Pointer = context.documents.getPointer( "https://example.com/resource/" );
			persistedUser = PersistedUser.decorate(
				Object.assign( pointerUser, {} ),
				context.documents
			);
		} );

		describe( method( OBLIGATORY, "enable" ), ():void => {

			it( hasSignature(
				"Activate the account of the user.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<CarbonLDP.Auth.PersistedUser>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( persistedUser.enable ).toBeDefined();
				expect( persistedUser.enable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should get and save", ( done:DoneFn ):void => {
				const getSpy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( null ) );

				const saveSpy:jasmine.Spy = spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( null ) );

				persistedUser
					.enable()
					.then( () => {
						expect( getSpy ).toHaveBeenCalledWith( "https://example.com/resource/" );
						expect( saveSpy ).toHaveBeenCalledWith( persistedUser, void 0 );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should send options on save", ( done:DoneFn ):void => {
				const getSpy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( null ) );

				const saveSpy:jasmine.Spy = spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( null ) );

				const options:RequestOptions = { timeout: 5050 };
				persistedUser
					.enable( options )
					.then( () => {
						expect( getSpy ).toHaveBeenCalledWith( "https://example.com/resource/" );
						expect( saveSpy ).toHaveBeenCalledWith( persistedUser, options );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return itself", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( persistedUser ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( persistedUser ) );

				persistedUser
					.enable()
					.then( ( returned ) => {
						expect( returned ).toBe( persistedUser );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should set the `enabled` flag", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( persistedUser ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( persistedUser ) );

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
					.and.returnValue( Promise.resolve( persistedUser ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( persistedUser ) );

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
					{ name: "requestOptions", type: "CarbonLDP.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<CarbonLDP.Auth.PersistedUser>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( persistedUser.disable ).toBeDefined();
				expect( persistedUser.disable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should get and save", ( done:DoneFn ):void => {
				const getSpy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( null ) );

				const saveSpy:jasmine.Spy = spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( null ) );

				persistedUser
					.disable()
					.then( () => {
						expect( getSpy ).toHaveBeenCalledWith( "https://example.com/resource/" );
						expect( saveSpy ).toHaveBeenCalledWith( persistedUser, void 0 );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should send options on save", ( done:DoneFn ):void => {
				const getSpy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( null ) );

				const saveSpy:jasmine.Spy = spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( null ) );

				const options:RequestOptions = { timeout: 5050 };
				persistedUser
					.disable( options )
					.then( () => {
						expect( getSpy ).toHaveBeenCalledWith( "https://example.com/resource/" );
						expect( saveSpy ).toHaveBeenCalledWith( persistedUser, options );

						done();
					} )
					.catch( done.fail );
			} );

			it( "should return itself", ( done:DoneFn ):void => {
				spyOn( context.documents, "get" )
					.and.returnValue( Promise.resolve( persistedUser ) );
				spyOn( context.documents, "save" )
					.and.returnValue( Promise.resolve( persistedUser ) );

				persistedUser
					.disable()
					.then( ( returned ) => {
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

	describe( interfaze(
		"CarbonLDP.Auth.PersistedUserFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Auth.PersistedUser` objects."
	), ():void => {

		describe( method( OBLIGATORY, "isDecorated" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided has the properties of a `CarbonLDP.Auth.PersistedUser` object.", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.Auth.PersistedUser" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided is considered a `CarbonLDP.Auth.PersistedUser` object.", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.Auth.PersistedUser" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "decorate" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Decorates the object provided with the properties and methods of a `CarbonLDP.Auth.PersistedUser` object.", [
					{ name: "object", type: "T", description: "The object to decorate." },
					{ name: "documents", type: "CarbonLDP.Documents", description: "The documents service the persisted belongs to." },
				],
				{ type: "T & CarbonLDP.Auth.PersistedUser" }
			), ():void => {} );

		} );

	} );

	describe( property(
		STATIC,
		"PersistedUser",
		"CarbonLDP.Auth.PersistedUserFactory"
	), ():void => {

		type MockPersistedUser = StrictMinus<PersistedUser, User & PersistedProtectedDocument>;

		it( isDefined(), ():void => {
			expect( PersistedUser ).toBeDefined();
			expect( PersistedUser ).toEqual( jasmine.any( Object ) );
		} );

		describe( method( STATIC, "isDecorated" ), ():void => {

			it( "should exists", ():void => {
				expect( PersistedUser.isDecorated ).toBeDefined();
				expect( PersistedUser.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should reject undefined value", ():void => {
				expect( PersistedUser.isDecorated( void 0 ) ).toBe( false );
			} );

			it( "should only reject in required properties", ():void => {
				const object:MockPersistedUser = {
					enable: ():any => {},
					disable: ():any => {},
				};
				expect( PersistedUser.isDecorated( object ) ).toBe( true );

				delete object.enable;
				expect( PersistedUser.isDecorated( object ) ).toBe( false );
				object.enable = ():any => {};

				delete object.disable;
				expect( PersistedUser.isDecorated( object ) ).toBe( false );
				object.disable = ():any => {};
			} );

		} );

		describe( method( STATIC, "is" ), ():void => {

			it( "should exists", ():void => {
				expect( PersistedUser.is ).toBeDefined();
				expect( PersistedUser.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call to `PersistedUser.isDecorated`", ():void => {
				const spy:jasmine.Spy = spyOn( PersistedUser, "isDecorated" );

				const object:object = { the: "object" };
				PersistedUser.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should call to `User.isDecorated`", ():void => {
				spyOn( PersistedUser, "isDecorated" )
					.and.returnValue( true );
				const spy:jasmine.Spy = spyOn( User, "isDecorated" );

				const object:object = { the: "object" };
				PersistedUser.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should call to `PersistedProtectedDocument.is`", ():void => {
				spyOn( PersistedUser, "isDecorated" )
					.and.returnValue( true );
				spyOn( User, "isDecorated" )
					.and.returnValue( true );
				const spy:jasmine.Spy = spyOn( PersistedProtectedDocument, "is" );

				const object:object = { the: "object" };
				PersistedUser.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should return true when all verifications pass", ():void => {
				spyOn( PersistedUser, "isDecorated" )
					.and.returnValue( true );
				spyOn( User, "isDecorated" )
					.and.returnValue( true );
				spyOn( PersistedProtectedDocument, "is" )
					.and.returnValue( true );

				const object:object = { the: "object" };
				const returned:boolean = PersistedUser.is( object );

				expect( returned ).toBe( true );
			} );

		} );

		describe( method( STATIC, "decorate" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Decorates the object provided with the properties and methods of a `CarbonLDP.Auth.PersistedUser` object.", [
					{ name: "object", type: "T", description: "The object to decorate." },
					{ name: "documents", type: "CarbonLDP.Documents", description: "The documents service the persisted belongs to." },
				],
				{ type: "T & CarbonLDP.Auth.PersistedUser" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( PersistedUser.decorate ).toBeDefined();
				expect( PersistedUser.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the same object", ():void => {
				const object:object = {};
				const returned:object = PersistedUser.decorate( object, null );
				expect( returned ).toBe( object );
			} );

			it( "should return without changes if already with class properties", ():void => {
				const fn:() => any = () => {};
				const object:MockPersistedUser = {
					enable: fn,
					disable: fn,
				};

				PersistedUser.decorate( object, null );
				expect( object ).toEqual( jasmine.objectContaining( {
					enable: fn,
					disable: fn,
				} ) );
			} );

			it( "should add the class properties", ():void => {
				const returned:PersistedUser = PersistedUser.decorate( {}, null );
				expect( returned ).toEqual( jasmine.objectContaining( {
					enable: jasmine.any( Function ),
					disable: jasmine.any( Function ),
				} ) );
			} );

			it( "should call `User.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( User, "decorate" );

				const object:object = { the: "object" };
				PersistedUser.decorate( object, null );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should call `PersistedProtectedDocument.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( PersistedProtectedDocument, "decorate" );

				const object:object = { the: "object" };
				const fakeDocuments:any = { fake: "Documents" };
				PersistedUser.decorate( object, fakeDocuments );

				expect( spy ).toHaveBeenCalledWith( object, fakeDocuments );
			} );

		} );

	} );

} );
