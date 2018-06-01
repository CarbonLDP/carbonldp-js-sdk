import { ProtectedDocument } from "../../ProtectedDocument";
import { TransientResource } from "../../Resource";
import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../../test/JasmineExtender";
import * as Utils from "../../Utils";
import {
	CS,
	XSD
} from "../../Vocabularies";
import { TransientUser } from "./TransientUser";

import { User } from "./User";


describe( module( "carbonldp/Auth/User" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Auth.User",
		"Interface that represents the base of a persisted User in any context."
	), ():void => {

		it( extendsClass( "CarbonLDP.ProtectedDocument" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"name",
			"string",
			"Optional name of the user."
		), ():void => {
			const target:TransientUser[ "name" ] = "name";
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Auth.UserFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Auth.User` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"CarbonLDP.Vocabularies.CS.User"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided is considered a `CarbonLDP.Auth.User` object.", [
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.Auth.User" }
			), ():void => {} );

		} );

	} );

	describe( property(
		STATIC,
		"User",
		"CarbonLDP.Auth.UserFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( User ).toBeDefined();
			expect( User ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different test
		it( "User.TYPE", ():void => {
			expect( User.TYPE ).toBeDefined();
			expect( Utils.isString( User.TYPE ) ).toBe( true );

			expect( User.TYPE ).toBe( CS.User );
		} );

		// TODO: Separate in different test
		it( "User.SCHEMA", ():void => {
			expect( User.SCHEMA ).toBeDefined();
			expect( Utils.isObject( User.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( User.SCHEMA, "name" ) ).toBe( true );
			expect( User.SCHEMA[ "name" ] ).toEqual( {
				"@id": CS.name,
				"@type": XSD.string,
			} );
		} );

		describe( "User.is", ():void => {

			it( "should exists", ():void => {
				expect( User.is ).toBeDefined();
				expect( User.is ).toEqual( jasmine.any( Function ) );
			} );


			let object:jasmine.SpyObj<TransientResource>;
			let isProtectedDocument:jasmine.Spy;
			beforeEach( ():void => {
				isProtectedDocument = spyOn( ProtectedDocument, "is" )
					.and.returnValue( true );

				object = jasmine.createSpyObj( {
					hasType: true,
				} );
			} );

			it( "should call to `ProtectedDocument.is`", ():void => {
				User.is( object );
				expect( isProtectedDocument ).toHaveBeenCalledWith( object );
			} );

			it( "should has the User.TYPE", ():void => {
				User.is( object );
				expect( object.hasType ).toHaveBeenCalledWith( User.TYPE );
			} );

			it( "should return true with all assertions", () => {
				const returned:boolean = User.is( object );
				expect( returned ).toBe( true );
			} );

		} );

	} );

} );
