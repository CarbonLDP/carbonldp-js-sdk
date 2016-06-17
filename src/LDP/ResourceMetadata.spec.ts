import {module, isDefined, hasProperty, STATIC, clazz, hasMethod} from "../test/JasmineExtender";
import * as NS from "./../NS";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

import * as ResourceMetadata from "./ResourceMetadata";

describe( module( "Carbon/LDP/ResourceMetadata" ), ():void => {

	it( isDefined(), ():void => {
		expect( ResourceMetadata ).toBeDefined();
		expect( Utils.isObject( ResourceMetadata ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( ResourceMetadata.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ResourceMetadata.RDF_CLASS ) ).toBe( true );

		expect( ResourceMetadata.RDF_CLASS ).toBe( NS.C.Class.ResourceMetadata );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ResourceMetadata.SCHEMA ).toBeDefined();
		expect( Utils.isObject( ResourceMetadata.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( ResourceMetadata.SCHEMA, "resource" ) ).toBe( true );
		expect( ResourceMetadata.SCHEMA[ "resource" ] ).toEqual({
			"@id": NS.C.Predicate.resource,
			"@type": "@id",
		});

		expect( Utils.hasProperty( ResourceMetadata.SCHEMA, "eTag" ) ).toBe( true );
		expect( ResourceMetadata.SCHEMA[ "eTag" ] ).toEqual({
			"@id": NS.C.Predicate.eTag,
			"@type": NS.XSD.DataType.string,
		});

	});

	describe( clazz(
		"Carbon.LDP.ResourceMetadata.Factory",
		"Factory class for `Carbon.LDP.ResourceMetadata.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ResourceMetadata.Factory ).toBeDefined();
			expect( Utils.isFunction( ResourceMetadata.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Return true if the object provided has the properties of a `Carbon.LDP.ResourceMetadata.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResourceMetadata.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( ResourceMetadata.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( ResourceMetadata.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				resource: null,
				eTag: null,
			};
			expect( ResourceMetadata.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.resource ;
			expect( ResourceMetadata.Factory.hasClassProperties( object ) ).toBe( false );
			object.resource = null;

			delete object.eTag;
			expect( ResourceMetadata.Factory.hasClassProperties( object ) ).toBe( false );
			object.eTag = null;
		});

		it( hasMethod(
			STATIC,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.ResourceMetadata.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResourceMetadata.Factory.is ).toBeDefined();
			expect( Utils.isFunction( ResourceMetadata.Factory.is ) ).toBe( true );

			let object:Object;
			expect( ResourceMetadata.Factory.is( object ) ).toBe( false );
			object = null;
			expect( ResourceMetadata.Factory.is( object ) ).toBe( false );
			object = {};
			expect( ResourceMetadata.Factory.is( object ) ).toBe( false );
			object[ "resource" ] = null;
			expect( ResourceMetadata.Factory.is( object ) ).toBe( false );
			object[ "eTag" ] = null;
			expect( ResourceMetadata.Factory.is( object ) ).toBe( false );

			Resource.Factory.decorate( object );
			expect( ResourceMetadata.Factory.is( object ) ).toBe( false );

			object[ "types" ].push( NS.C.Class.VolatileResource );
			expect( ResourceMetadata.Factory.is( object ) ).toBe( false );

			object[ "types" ].push( NS.C.Class.ResourceMetadata );
			expect( ResourceMetadata.Factory.is( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasRDFClass",
			"Return true if the object provided have the RDF_CLASS of a ResourceMetadata, either if it's a Carbon Resource or an RDF object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( ResourceMetadata.Factory.hasRDFClass ).toBeDefined();
			expect( Utils.isFunction( ResourceMetadata.Factory.hasRDFClass ) ).toBe( true );

			let object:Object;
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( false );
			object = null;
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( false );
			object = {};
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( false );

			object = { types: [ NS.C.Class.VolatileResource ] };
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( false );
			object = { types: [ NS.C.Class.ResourceMetadata ] };
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( true );
			object = { types: [ NS.C.Class.VolatileResource, NS.C.Class.ResourceMetadata ] };
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( true );
			object = { types: [ NS.C.Class.ResourceMetadata, NS.C.Class.VolatileResource ] };
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( true );

			object = { "@type": [ NS.C.Class.VolatileResource ] };
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( false );
			object = { "@type": [ NS.C.Class.ResourceMetadata ] };
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( true );
			object = { "@type": [ NS.C.Class.VolatileResource, NS.C.Class.ResourceMetadata ] };
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( true );
			object = { "@type": [ NS.C.Class.ResourceMetadata, NS.C.Class.VolatileResource ] };
			expect( ResourceMetadata.Factory.hasRDFClass( object ) ).toBe( true );
		});

	});

});
