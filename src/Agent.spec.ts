import * as Agent from "./Agent";

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";
import * as Errors from "./Errors";
import * as Document from "./Document";

describe( module( "Carbon/Agent" ), ():void => {

	it( isDefined(), ():void => {
		expect( Agent ).toBeDefined();
		expect( Utils.isObject( Agent ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( Agent.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( Agent.RDF_CLASS ) ).toBe( true );

		expect( Agent.RDF_CLASS ).toBe( NS.CS.Class.Agent );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( Agent.SCHEMA ).toBeDefined();
		expect( Utils.isObject( Agent.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( Agent.SCHEMA, "name" ) ).toBe( true );
		expect( Agent.SCHEMA[ "name" ] ).toEqual( {
			"@id": NS.CS.Predicate.namae,
			"@type": NS.XSD.DataType.string
		} );

		expect( Utils.hasProperty( Agent.SCHEMA, "email" ) ).toBe( true );
		expect( Agent.SCHEMA[ "email" ] ).toEqual( {
			"@id": NS.VCARD.Predicate.email,
			"@type": NS.XSD.DataType.string
		} );

		expect( Utils.hasProperty( Agent.SCHEMA, "password" ) ).toBe( true );
		expect( Agent.SCHEMA[ "password" ] ).toEqual( {
			"@id": NS.CS.Predicate.password,
			"@type": NS.XSD.DataType.string
		} );
	} );

	describe( clazz(
		"Carbon.Agent.Factory",
		"Factory class for `Carbon.Agent.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Agent.Factory ).toBeDefined();
			expect( Utils.isFunction( Agent.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.Agent.Class` object", [
				{name: "resource", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( Agent.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( Agent.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( Agent.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				name: null,
				email: null,
				password: null,
			};
			expect( Agent.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.name;
			expect( Agent.Factory.hasClassProperties( object ) ).toBe( false );
			object.name = null;

			delete object.email;
			expect( Agent.Factory.hasClassProperties( object ) ).toBe( false );
			object.email = null;

			delete object.password;
			expect( Agent.Factory.hasClassProperties( object ) ).toBe( true );
			object.password = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered as an `Carbon.Agent.Class` object", [
				{name: "object", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( Agent.Factory.is ).toBeDefined();
			expect( Utils.isFunction( Agent.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( Agent.Factory.is( object ) ).toBe( false );
			object.name = "Agent name";
			expect( Agent.Factory.is( object ) ).toBe( false );
			object.email = "email.of.agent@example.com";
			expect( Agent.Factory.is( object ) ).toBe( false );
			object.password = "myAwesomePassword";
			expect( Agent.Factory.is( object ) ).toBe( false );

			object = Document.Factory.create();
			expect( Agent.Factory.is( object ) ).toBe( false );
			object.name = "Agent name";
			expect( Agent.Factory.is( object ) ).toBe( false );
			object.email = "email.of.agent@example.com";
			expect( Agent.Factory.is( object ) ).toBe( false );
			object.password = "myAwesomePassword";
			expect( Agent.Factory.is( object ) ).toBe( false );
			object.types.push( NS.CS.Class.Agent );
			expect( Agent.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a `Carbon.Agent.Class` object with the name and email specified.", [
				{name: "name", type: "string"},
				{name: "email", type: "string"}
			],
			{type: "Carbon.Agent.Class"}
		), ():void => {
			expect( Agent.Factory.create ).toBeDefined();
			expect( Utils.isFunction( Agent.Factory.create ) ).toBe( true );

			let spy = spyOn( Agent.Factory, "createFrom" );

			Agent.Factory.create( "Agent name", "email.of.agent@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "Agent name", "email.of.agent@example.com", "myAwesomePassword" );

			Agent.Factory.create( "Another Agent name", "another.email.of.agent@example.com", "myAwesomePassword" );
			expect( spy ).toHaveBeenCalledWith( {}, "Another Agent name", "another.email.of.agent@example.com", "myAwesomePassword" );

			Agent.Factory.create( "", "", "" );
			expect( spy ).toHaveBeenCalledWith( {}, "", "", "" );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			"Create a `Carbon.Agent.Class` object with the object provided.", [
				{name: "object", type: "T extends Object"}
			],
			{type: "T & Carbon.Agent.Class"}
		), ():void => {
			expect( Agent.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( Agent.Factory.createFrom ) ).toBe( true );

			interface TheAgent {
				myProperty?:string;
			}
			interface MyAgent extends Agent.Class, TheAgent {}

			let agent:MyAgent;
			agent = Agent.Factory.createFrom<TheAgent>( {}, "Agent name", "email.of.agent@example.com", "myAwesomePassword" );
			expect( Agent.Factory.is( agent ) ).toBe( true );
			expect( agent.myProperty ).toBeUndefined();
			expect( agent.name ).toBe( "Agent name" );
			expect( agent.email ).toBe( "email.of.agent@example.com" );
			expect( agent.password ).toBe( "myAwesomePassword" );
			expect( agent.types ).toContain( NS.CS.Class.Agent );

			agent = Agent.Factory.createFrom<TheAgent>( {myProperty: "a property"}, "Agent name", "email.of.agent@example.com", "myAwesomePassword" );
			expect( Agent.Factory.is( agent ) ).toBe( true );
			expect( agent.myProperty ).toBeDefined();
			expect( agent.myProperty ).toBe( "a property" );
			expect( agent.name ).toBe( "Agent name" );
			expect( agent.email ).toBe( "email.of.agent@example.com" );
			expect( agent.password ).toBe( "myAwesomePassword" );
			expect( agent.types ).toContain( NS.CS.Class.Agent );

			expect( () => Agent.Factory.createFrom( {}, "Agent name", "email.of.agent@example.com", "" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Agent.Factory.createFrom( {}, "Agent name", "", "myAwesomePassword" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Agent.Factory.createFrom( {}, "", "email.of.agent@example.com", "myAwesomePassword" ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => Agent.Factory.createFrom( {}, "", "", "" ) ).toThrowError( Errors.IllegalArgumentError );
		} );

	} );

} );