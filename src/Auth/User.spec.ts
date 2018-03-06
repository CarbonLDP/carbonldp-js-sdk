import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { Document } from "./../Document";
import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as User from "./User";
import DefaultExport from "./User";

interface MockedUser {
	name:string;
}

describe( module( "carbonldp/Auth/User" ), ():void => {

	it( isDefined(), ():void => {
		expect( User ).toBeDefined();
		expect( Utils.isObject( User ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( User.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( User.RDF_CLASS ) ).toBe( true );

		expect( User.RDF_CLASS ).toBe( CS.User );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"CarbonLDP.ObjectSchema.ObjectSchema"
	), ():void => {
		expect( User.SCHEMA ).toBeDefined();
		expect( Utils.isObject( User.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( User.SCHEMA, "name" ) ).toBe( true );
		expect( User.SCHEMA[ "name" ] ).toEqual( {
			"@id": CS.name,
			"@type": XSD.string,
		} );
	} );

	describe( interfaze(
		"CarbonLDP.Auth.User.Class",
		"Interface that represents an in-memory User of any Context."
	), ():void => {

		it( extendsClass( "CarbonLDP.Document.Document" ), ():void => {
			let user:User.Class = <any> {};
			let document:Document;

			document = user;
			expect( document ).toEqual( jasmine.any( Object ) );
		} );

		it( hasProperty(
			OBLIGATORY,
			"name",
			"string",
			"The name of the user."
		), ():void => {
			let name:string = "A name";
			let user:User.Class = <any> {};

			user.name = name;
			expect( user.name ).toEqual( jasmine.any( String ) );
		} );

	} );

	describe( clazz(
		"CarbonLDP.Auth.User.Factory",
		"Factory class for `CarbonLDP.Auth.User.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( User.Factory ).toBeDefined();
			expect( Utils.isFunction( User.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `CarbonLDP.Auth.User.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( User.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( User.Factory.hasClassProperties ) ).toBe( true );

			let object:MockedUser = void 0;
			expect( User.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
			};
			expect( User.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( User.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.User.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let user:User.Class;

		user = defaultExport;
		expect( user ).toEqual( jasmine.any( Object ) );
	} );

} );
