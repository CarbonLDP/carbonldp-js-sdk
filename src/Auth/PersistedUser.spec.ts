import { StrictMinus } from "../../test/helpers/types";
import { AbstractContext } from "../AbstractContext";
import { ProtectedDocument } from "../ProtectedDocument";
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

import { TransientUser } from "./TransientUser";


describe( module( "carbonldp/Auth/PersistedUser" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.PersistedUser",
		"Interface that represents the base of a persisted User in any context."
	), ():void => {

		it( extendsClass( "CarbonLDP.Auth.TransientUser" ), ():void => {} );
		it( extendsClass( "CarbonLDP.ProtectedDocument" ), ():void => {} );

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

		type MockPersistedUser = StrictMinus<PersistedUser, TransientUser & ProtectedDocument>;

		it( isDefined(), ():void => {
			expect( PersistedUser ).toBeDefined();
			expect( PersistedUser ).toEqual( jasmine.any( Object ) );
		} );

		describe( "PersistedUser.is", ():void => {

			it( "should exists", ():void => {
				expect( PersistedUser.is ).toBeDefined();
				expect( PersistedUser.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call to `User.isDecorated`", ():void => {
				const spy:jasmine.Spy = spyOn( TransientUser, "isDecorated" );

				const object:object = { the: "object" };
				PersistedUser.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should call to `PersistedProtectedDocument.is`", ():void => {
				spyOn( TransientUser, "isDecorated" )
					.and.returnValue( true );
				const spy:jasmine.Spy = spyOn( ProtectedDocument, "is" );

				const object:object = { the: "object" };
				PersistedUser.is( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should return true when all verifications pass", ():void => {
				spyOn( TransientUser, "isDecorated" )
					.and.returnValue( true );
				spyOn( ProtectedDocument, "is" )
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

			it( "should call `User.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( TransientUser, "decorate" );

				const object:object = { the: "object" };
				PersistedUser.decorate( object, null );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should call `PersistedProtectedDocument.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( ProtectedDocument, "decorate" );

				const object:object = { the: "object" };
				const fakeDocuments:any = { fake: "Documents" };
				PersistedUser.decorate( object, fakeDocuments );

				expect( spy ).toHaveBeenCalledWith( object, fakeDocuments );
			} );

		} );

	} );

} );
