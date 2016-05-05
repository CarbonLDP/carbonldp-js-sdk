import {module, isDefined, hasProperty, STATIC, clazz, hasMethod} from "../test/JasmineExtender";
import * as NS from "./../NS";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

import * as ResponseDescription from "./ResponseDescription";

describe( module( "Carbon/LDP/ResponseDescription"), ():void => {

	it( isDefined(), ():void =>{
		expect( ResponseDescription ).toBeDefined();
		expect( Utils.isObject( ResponseDescription ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ResponseDescription.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ResponseDescription.RDF_CLASS ) ).toBe( true );

		expect( ResponseDescription.RDF_CLASS ).toBe( NS.C.Class.ResponseDescription );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ResponseDescription.SCHEMA ).toBeDefined();
		expect( Utils.isObject( ResponseDescription.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( ResponseDescription.SCHEMA, "responseProperties" ) ).toBe( true );
		expect( ResponseDescription.SCHEMA[ "responseProperties" ] ).toEqual({
			"@id": NS.C.Predicate.responseProperty,
			"@type": "@id",
			"@container": "@set"
		});

	});

	describe( clazz(
		"Carbon.LDP.ResponseDescription.Factory",
		"Factory class form `Carbon.LDP.ResponseDescription.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ResponseDescription.Factory ).toBeDefined();
			expect( Utils.isFunction( ResponseDescription.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Return true if the object provided has the properties of a `Carbon.LDP.ResponseDescription.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check." }
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResponseDescription.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( ResponseDescription.Factory.hasClassProperties ) ).toBe( true );

			let object:Object;
			expect( ResponseDescription.Factory.hasClassProperties( object ) ).toBe( false );
			object = null;
			expect( ResponseDescription.Factory.hasClassProperties( object ) ).toBe( false );
			object = {};
			expect( ResponseDescription.Factory.hasClassProperties( object ) ).toBe( false );

			object[ "responseProperties" ] = null;
			expect( ResponseDescription.Factory.hasClassProperties( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"is",
			"Return true if the object provided can be classified as a `Carbon.LDP.ResponseDescription.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResponseDescription.Factory.is ).toBeDefined();
			expect( Utils.isFunction( ResponseDescription.Factory.is ) ).toBe( true );

			let object:Object;
			expect( ResponseDescription.Factory.is( object ) ).toBe( false );
			object = null;
			expect( ResponseDescription.Factory.is( object ) ).toBe( false );
			object = {};
			expect( ResponseDescription.Factory.is( object ) ).toBe( false );

			object[ "responseProperties" ] = null;
			expect( ResponseDescription.Factory.is( object ) ).toBe( false );

			Resource.Factory.decorate( object );
			expect( ResponseDescription.Factory.is( object ) ).toBe( false );

			object[ "types" ].push( NS.C.Class.VolatileResource );
			expect( ResponseDescription.Factory.is( object ) ).toBe( false );

			object[ "types" ].push( NS.C.Class.ResponseDescription );
			expect( ResponseDescription.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasRDFClass",
			"Return true if the object provided have the RDF_CLASS of a ResponseDescription, either if it's a Resource or a RDF object.", [
				{ name: "object", type: "Object", description: "Object to check." }
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResponseDescription.Factory.hasRDFClass ).toBeDefined();
			expect( Utils.isFunction( ResponseDescription.Factory.hasRDFClass ) ).toBe( true );

			let object:Object;
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( false );
			object = null;
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( false );
			object = {};
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( false );

			object = { types: [ NS.C.Class.VolatileResource ] };
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( false );
			object = { types: [ NS.C.Class.ResponseDescription ] };
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( true );
			object = { types: [ NS.C.Class.VolatileResource, NS.C.Class.ResponseDescription ] };
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( true );
			object = { types: [ NS.C.Class.ResponseDescription, NS.C.Class.VolatileResource ] };
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( true );

			object = { "@type": [ NS.C.Class.VolatileResource ] };
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( false );
			object = { "@type": [ NS.C.Class.ResponseDescription ] };
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( true );
			object = { "@type": [ NS.C.Class.VolatileResource, NS.C.Class.ResponseDescription ] };
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( true );
			object = { "@type": [ NS.C.Class.ResponseDescription, NS.C.Class.VolatileResource ] };
			expect( ResponseDescription.Factory.hasRDFClass( object ) ).toBe( true );
		});

	});

});
