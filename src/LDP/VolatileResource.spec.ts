import {
	STATIC,

	module,
	clazz,
	interfaze,

	isDefined,
	hasMethod,
	hasProperty,
	extendsClass,
	hasDefaultExport,
} from "../test/JasmineExtender";
import * as NS from "./../NS";
import * as Resource from "./../Resource";
import * as Utils from "./../Utils";

import * as VolatileResource from "./VolatileResource";
import DefaultExport from "./VolatileResource";

describe( module( "Carbon/LDP/VolatileResource" ), ():void => {

	it( isDefined(), ():void => {
		expect( VolatileResource ).toBeDefined();
		expect( Utils.isObject( VolatileResource ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( VolatileResource.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( VolatileResource.RDF_CLASS ) ).toBe( true );

		expect( VolatileResource.RDF_CLASS ).toBe( NS.C.Class.VolatileResource );
	} );

	describe( interfaze(
		"Carbon.LDP.VolatileResource.Class",
		"Interface that represents a free resource, i.e. a dynamic generated resource that does not have a persisted form."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {} );

	} );

	describe( clazz(
		"Carbon.LDP.VolatileResource.Factory",
		"Factory class for `Carbon.LDP.VolatileResource.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( VolatileResource.Factory ).toBeDefined();
			expect( Utils.isFunction( VolatileResource.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.VolatileResource.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( VolatileResource.Factory.is ).toBeDefined();
			expect( Utils.isFunction( VolatileResource.Factory.is ) ).toBe( true );

			let object:Object = void 0;
			expect( VolatileResource.Factory.is( object ) ).toBe( false );
			object = null;
			expect( VolatileResource.Factory.is( object ) ).toBe( false );
			object = {};
			expect( VolatileResource.Factory.is( object ) ).toBe( false );

			Resource.Factory.decorate( object );
			expect( VolatileResource.Factory.is( object ) ).toBe( false );

			object[ "types" ].push( NS.C.Class.VolatileResource );
			expect( VolatileResource.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasRDFClass",
			"Return true if the object provided have the RDF_CLASS of a VolatileResource, either if it's a Carbon Resource or an RDF object.", [
				{ name: "object", type: "Object", description: "Object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( VolatileResource.Factory.hasRDFClass ).toBeDefined();
			expect( Utils.isFunction( VolatileResource.Factory.hasRDFClass ) ).toBe( true );

			let object:Object = void 0;
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( false );
			object = null;
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( false );
			object = {};
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( false );

			object = { types: [] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( false );
			object = { types: [ NS.C.Class.ResourceMetadata ] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( false );
			object = { types: [ NS.C.Class.VolatileResource ] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( true );
			object = { types: [ NS.C.Class.VolatileResource, NS.C.Class.ResponseMetadata ] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( true );
			object = { types: [ NS.CS.Class.Token, NS.C.Class.VolatileResource ] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( true );

			object = { "@type": [] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( false );
			object = { "@type": [ NS.CS.Class.Token ] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( false );
			object = { "@type": [ NS.C.Class.VolatileResource ] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( true );
			object = { "@type": [ NS.CS.Class.Token, NS.C.Class.VolatileResource ] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( true );
			object = { "@type": [ NS.C.Class.VolatileResource, NS.C.Class.ResourceMetadata ] };
			expect( VolatileResource.Factory.hasRDFClass( object ) ).toBe( true );
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.VolatileResource.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:VolatileResource.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
