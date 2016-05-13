import {module, isDefined, hasProperty, STATIC, clazz, hasMethod} from "../test/JasmineExtender";
import * as NS from "./../NS";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

import * as ResponseMetadata from "./ResponseMetadata";

describe( module( "Carbon/LDP/ResponseMetadata"), ():void => {

	it( isDefined(), ():void => {
		expect( ResponseMetadata ).toBeDefined();
		expect( Utils.isObject( ResponseMetadata ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ResponseMetadata.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ResponseMetadata.RDF_CLASS ) ).toBe( true );

		expect( ResponseMetadata.RDF_CLASS ).toBe( NS.C.Class.ResponseMetadata );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ResponseMetadata.SCHEMA ).toBeDefined();
		expect( Utils.isObject( ResponseMetadata.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( ResponseMetadata.SCHEMA, "resourcesMetadata" ) ).toBe( true );
		expect( ResponseMetadata.SCHEMA[ "resourcesMetadata" ] ).toEqual({
			"@id": NS.C.Predicate.resourceMetadata,
			"@type": "@id",
			"@container": "@set",
		});

	});

	describe( clazz(
		"Carbon.LDP.ResponseMetadata.Factory",
		"Factory class form `Carbon.LDP.ResponseMetadata.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ResponseMetadata.Factory ).toBeDefined();
			expect( Utils.isFunction( ResponseMetadata.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Return true if the object provided has the properties of a `Carbon.LDP.ResponseMetadata.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResponseMetadata.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( ResponseMetadata.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( ResponseMetadata.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				resourcesMetadata: null,
			};
			expect( ResponseMetadata.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.resourcesMetadata;
			expect( ResponseMetadata.Factory.hasClassProperties( object ) ).toBe( false );
			object.resourcesMetadata = null;
		});

		it( hasMethod(
			STATIC,
			"is",
			"Return true if the object provided can be classified as a `Carbon.LDP.ResponseMetadata.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResponseMetadata.Factory.is ).toBeDefined();
			expect( Utils.isFunction( ResponseMetadata.Factory.is ) ).toBe( true );

			let object:Object;
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );
			object = null;
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );
			object = {};
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );

			object[ "resourcesMetadata" ] = null;
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );

			Resource.Factory.decorate( object );
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );

			object[ "types" ].push( NS.C.Class.VolatileResource );
			expect( ResponseMetadata.Factory.is( object ) ).toBe( false );

			object[ "types" ].push( NS.C.Class.ResponseMetadata );
			expect( ResponseMetadata.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasRDFClass",
			"Return true if the object provided have the RDF_CLASS of a ResponseMetadata, either if it's a Resource or a RDF object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResponseMetadata.Factory.hasRDFClass ).toBeDefined();
			expect( Utils.isFunction( ResponseMetadata.Factory.hasRDFClass ) ).toBe( true );

			let object:Object;
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( false );
			object = null;
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( false );
			object = {};
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( false );

			object = { types: [ NS.C.Class.VolatileResource ] };
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( false );
			object = { types: [ NS.C.Class.ResponseMetadata ] };
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( true );
			object = { types: [ NS.C.Class.VolatileResource, NS.C.Class.ResponseMetadata ] };
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( true );
			object = { types: [ NS.C.Class.ResponseMetadata, NS.C.Class.VolatileResource ] };
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( true );

			object = { "@type": [ NS.C.Class.VolatileResource ] };
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( false );
			object = { "@type": [ NS.C.Class.ResponseMetadata ] };
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( true );
			object = { "@type": [ NS.C.Class.VolatileResource, NS.C.Class.ResponseMetadata ] };
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( true );
			object = { "@type": [ NS.C.Class.ResponseMetadata, NS.C.Class.VolatileResource ] };
			expect( ResponseMetadata.Factory.hasRDFClass( object ) ).toBe( true );
		});

	});

});
