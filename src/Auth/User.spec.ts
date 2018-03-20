import { CS } from "../Vocabularies/CS";
import { XSD } from "../Vocabularies/XSD";
import { Document } from "./../Document";
import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	STATIC,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as User from "./User";

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
		"CarbonLDP.ObjectSchema"
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

		it( extendsClass( "CarbonLDP.Document" ), ():void => {
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

		type MockUser = StrictMinus<User.Class, Document.Class>;

		it( isDefined(), ():void => {
			expect( User.Factory ).toBeDefined();
			expect( User.Factory ).toEqual( jasmine.any( Function ) );
		} );

		describe( method( STATIC, "hasClassProperties" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided has the properties that defines a `CarbonLDP.Auth.User.Class` object.", [
					{ name: "object", type: "object" },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( User.Factory.hasClassProperties ).toBeDefined();
				expect( User.Factory.hasClassProperties ).toEqual( jasmine.any( Function ) );
			} );

			it( "should reject undefined value", ():void => {
				expect( User.Factory.hasClassProperties( void 0 ) ).toBe( false );
			} );

			it( "should only reject in required properties", ():void => {
				const object:MockUser = {
					name: null,
					enabled: null,
					disabled: null,
					credentials: null,

					setCredentials: ():any => {},
				};
				expect( User.Factory.hasClassProperties( object ) ).toBe( true );

				delete object.name;
				expect( User.Factory.hasClassProperties( object ) ).toBe( true );
				object.name = null;

				delete object.enabled;
				expect( User.Factory.hasClassProperties( object ) ).toBe( true );
				object.enabled = null;

				delete object.disabled;
				expect( User.Factory.hasClassProperties( object ) ).toBe( true );
				object.disabled = null;

				delete object.credentials;
				expect( User.Factory.hasClassProperties( object ) ).toBe( true );
				object.credentials = null;

				delete object.setCredentials;
				expect( User.Factory.hasClassProperties( object ) ).toBe( false );
				object.setCredentials = ():any => {};
			} );

		} );

		describe( method( STATIC, "create" ), ():void => {

			it( hasSignature(
				"Creates a `Carbon.Auth.User.Class` object.",
				[
					{ name: "disabled", type: "boolean", optional: true },
				],
				{ type: "Carbon.Auth.User.Class" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( User.Factory.create ).toBeDefined();
				expect( User.Factory.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call `User.Factory.createFrom`", ():void => {
				const spy:jasmine.Spy = spyOn( User.Factory, "createFrom" );

				User.Factory.create();
				expect( spy ).toHaveBeenCalledWith( jasmine.any( Object ), void 0 );

				User.Factory.create( true );
				expect( spy ).toHaveBeenCalledWith( jasmine.any( Object ), true );
			} );

		} );

		describe( method( STATIC, "createFrom" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates a `Carbon.Auth.User.Class` object with the one provided.",
				[
					{ name: "object", type: "T" },
					{ name: "disabled", type: "boolean", optional: true },
				],
				{ type: "T & Carbon.Auth.User.Class" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( User.Factory.createFrom ).toBeDefined();
				expect( User.Factory.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `User.Factory.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( User.Factory, "decorate" )
					.and.returnValue( {} );

				const object:object = { the: "object" };
				User.Factory.createFrom( object );

				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should assign the provided `disabled` property", ():void => {
				spyOn( User.Factory, "decorate" )
					.and.returnValue( {} );

				const object:object = { the: "object" };
				const returned:object = User.Factory.createFrom( object, true );

				expect( returned ).toEqual( jasmine.objectContaining( {
					disabled: true,
				} ) );
			} );

		} );

		describe( method( STATIC, "decorate" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Decorates the object provided with the properties and methods of a `Carbon.Auth.User.Class` object.", [
					{ name: "object", type: "T", description: "The object to decorate." },
				],
				{ type: "T & Carbon.Auth.User.Class" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( User.Factory.decorate ).toBeDefined();
				expect( User.Factory.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the same object", ():void => {
				const object:object = {};
				const returned:object = User.Factory.decorate( object );
				expect( returned ).toBe( object );
			} );

			it( "should return without changes if already with class properties", ():void => {
				const fn:() => any = () => {};
				const object:MockUser = {
					name: null,
					enabled: null,
					disabled: null,
					credentials: null,

					setCredentials: fn,
				};

				User.Factory.decorate( object );
				expect( object ).toEqual( jasmine.objectContaining( {
					setCredentials: fn,
				} ) );
			} );

			it( "should add the class properties", ():void => {
				const returned:User.Class = User.Factory.decorate( {} );
				expect( returned ).toEqual( jasmine.objectContaining( {
					setCredentials: jasmine.any( Function ),
				} ) );
			} );

			it( "should call `Document.Factory.decorate`", ():void => {
				const spy:jasmine.Spy = spyOn( Document.Factory, "decorate" );

				const object:object = { the: "object" };
				User.Factory.decorate( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Auth.User.Class" ), ():void => {
		let defaultExport:User.default = <any> {};
		let user:User.Class;

		user = defaultExport;
		expect( user ).toEqual( jasmine.any( Object ) );
	} );

} );
