import * as App from "./App";

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty,
	reexports,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";
import * as Errors from "./Errors";
import * as Document from "./Document";

import Context from "./App/Context";

describe( module( "Carbon/App" ), ():void => {

	it( isDefined(), ():void => {
		expect( App ).toBeDefined();
		expect( Utils.isObject( App ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( App.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( App.RDF_CLASS ) ).toBe( true );

		expect( App.RDF_CLASS ).toBe( NS.CS.Class.Application );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( App.SCHEMA ).toBeDefined();
		expect( Utils.isObject( App.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( App.SCHEMA, "rootContainer" ) ).toBe( true );
		expect( App.SCHEMA[ "rootContainer" ] ).toEqual({
			"@id": NS.CS.Predicate.rootContainer,
			"@type": "@id"
		});
	});

	describe( clazz(
		"Carbon.App.Factory",
		"Factory class for `Carbon.App.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( App.Factory ).toBeDefined();
			expect( Utils.isFunction( App.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.App.Class` object", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( App.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( App.Factory.hasClassProperties ) ).toBe( true );

			let object:any = {};
			expect( App.Factory.hasClassProperties( object ) ).toBe( false );

			object.name = "A name";
			expect( App.Factory.hasClassProperties( object ) ).toBe( true );
			object.description = "A description";
			expect( App.Factory.hasClassProperties( object ) ).toBe( true );
		});
		
		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered as an `Carbon.App.Class` object", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( App.Factory.is ).toBeDefined();
			expect( Utils.isFunction( App.Factory.is ) ).toBe( true );

			let object:any = {};
			expect( App.Factory.is( object ) ).toBe( false );
			object.name = "A name";
			expect( App.Factory.is( object ) ).toBe( false );
			object.description = "A description";
			expect( App.Factory.is( object ) ).toBe( false );
			object.types = [ NS.CS.Class.Application ];
			expect( App.Factory.is( object ) ).toBe( false );

			object = Document.Factory.create();
			expect( App.Factory.is( object ) ).toBe( false );

			object.types.push( NS.CS.Class.Application );
			expect( App.Factory.is( object ) ).toBe( false );

			object.name = "A name";
			expect( App.Factory.is( object ) ).toBe( true );
			object.description = "A description";
			expect( App.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"create",
			"Create a empty `Carbon.App.Class` object.", [
				{ name: "name", type: "string" },
				{ name: "description", type: "string", optional: true }
			],
			{ type: "Carbon.App.Class" }
		), ():void => {
			expect( App.Factory.create ).toBeDefined();
			expect( Utils.isFunction( App.Factory.create ) ).toBe( true );

			let spy = spyOn( App.Factory, "createFrom");

			App.Factory.create( "The App name", "The App description" );
			expect( spy ).toHaveBeenCalledWith( {}, "The App name", "The App description" );

			App.Factory.create( "Another App name" );
			expect( spy ).toHaveBeenCalledWith( {}, "Another App name", undefined );
		});
		
		it( hasMethod(
			STATIC,
			"createFrom",
			"Create a `Carbon.App.Class` object with the object provided.", [
				{ name: "object", type: "T extends Object" },
				{ name: "name", type: "string" },
				{ name: "description", type: "string", optional: true }
			],
			{ type: "T & Carbon.App.Class" }
		), ():void => {
			expect( App.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( App.Factory.createFrom ) ).toBe( true );

			interface TheApp {
				myProperty?: string;
			}
			interface MyApp extends App.Class, TheApp {}

			let app:MyApp;
			app = App.Factory.createFrom<TheApp>( {}, "App name" );
			expect( App.Factory.is( app ) ).toBe( true );
			expect( app.myProperty ).toBeUndefined();
			expect( app.name ).toBe( "App name" );
			expect( app.description ).toBeUndefined();

			app = App.Factory.createFrom<TheApp>( {}, "App name", "App description" );
			expect( App.Factory.is( app ) ).toBe( true );
			expect( app.myProperty ).toBeUndefined();
			expect( app.name ).toBe( "App name" );
			expect( app.description ).toBe( "App description" );

			app = App.Factory.createFrom<TheApp>( { myProperty: "a property" }, "App name" );
			expect( App.Factory.is( app ) ).toBe( true );
			expect( app.myProperty ).toBeDefined();
			expect( app.myProperty ).toBe( "a property" );
			expect( app.name ).toBe( "App name" );
			expect( app.description ).toBeUndefined();

			app = App.Factory.createFrom<TheApp>( { myProperty: "a property" }, "App name", "App description" );
			expect( App.Factory.is( app ) ).toBe( true );
			expect( app.myProperty ).toBeDefined();
			expect( app.myProperty ).toBe( "a property" );
			expect( app.name ).toBe( "App name" );
			expect( app.description ).toBe( "App description" );

			expect( () => App.Factory.createFrom( {}, "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => App.Factory.createFrom( {}, "", "App description" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => App.Factory.createFrom( { myProperty: "a property" }, "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => App.Factory.createFrom( { myProperty: "a property" }, "", "App description" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => App.Factory.createFrom( {}, <any> {} ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => App.Factory.createFrom( {}, <any> 1 ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => App.Factory.createFrom( {}, <any> null ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => App.Factory.createFrom( {}, <any> undefined ) ).toThrowError( Errors.IllegalArgumentError );
		});

	});

	it( reexports(
		STATIC,
		"App",
		"Carbon/App/Context"
	), ():void => {
		expect( App.Context ).toBeDefined();
		expect( App.Context ).toEqual( Context );
	});

});
