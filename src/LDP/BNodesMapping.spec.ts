import {
	STATIC,

	OBLIGATORY,

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

import * as BNodesMapping from "./BNodesMapping";
import DefaultExport from "./BNodesMapping";

describe( module( "Carbon/LDP/BNodesMapping" ), ():void => {

	it( isDefined(), ():void => {
		expect( BNodesMapping ).toBeDefined();
		expect( Utils.isObject( BNodesMapping ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( BNodesMapping.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( BNodesMapping.RDF_CLASS ) ).toBe( true );

		expect( BNodesMapping.RDF_CLASS ).toBe( NS.C.Class.BNodesMapping );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( BNodesMapping.SCHEMA ).toBeDefined();
		expect( Utils.isObject( BNodesMapping.SCHEMA ) ).toBe( true );

		expect( BNodesMapping.SCHEMA as { [key:string]:object } ).toEqual( {
			resource: jasmine.any( Object ),
			entries: jasmine.any( Object ),
		} );

		expect( BNodesMapping.SCHEMA[ "resource" ] ).toEqual( {
			"@id": NS.C.Predicate.resource,
			"@type": "@id",
		} );

		expect( BNodesMapping.SCHEMA[ "entries" ] ).toEqual( {
			"@id": NS.C.Predicate.entry,
			"@type": "@id",
			"@container": "@set",
		} );

	} );

	describe( interfaze(
		"Carbon.LDP.BNodesMapping.Class",
		"Interface that contains a list of entries that indicates the BNodes the platform has changed it ID."
	), ():void => {

		it( extendsClass( "Carbon.LDP.VolatileResource.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"resource",
			"Carbon.Pointer.Class",
			"The resource which BNodes where changed"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entries",
			"Carbon.LDP.Entry.Class[]",
			"An array of entries of the BNodes mapped."
		), ():void => {} );

	} );

	describe( clazz(
		"Carbon.LDP.BNodesMapping.Factory",
		"Factory class for `Carbon.LDP.BNodesMapping.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( BNodesMapping.Factory ).toBeDefined();
			expect( Utils.isFunction( BNodesMapping.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.BNodesMapping.Class` object.", [
				{ name: "object", type: "Object", description: "Object to check" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( BNodesMapping.Factory.is ).toBeDefined();
			expect( Utils.isFunction( BNodesMapping.Factory.is ) ).toBe( true );

			let object:Partial<BNodesMapping.Class> = void 0;
			expect( BNodesMapping.Factory.is( object ) ).toBe( false );
			object = null;
			expect( BNodesMapping.Factory.is( object ) ).toBe( false );
			object = {};
			expect( BNodesMapping.Factory.is( object ) ).toBe( false );

			object.resource = null;
			expect( BNodesMapping.Factory.is( object ) ).toBe( false );

			object.entries = null;
			expect( BNodesMapping.Factory.is( object ) ).toBe( false );

			Resource.Factory.decorate( object );
			object.types.push( NS.C.Class.VolatileResource );
			expect( BNodesMapping.Factory.is( object ) ).toBe( false );

			object.types.push( NS.C.Class.BNodesMapping );
			expect( BNodesMapping.Factory.is( object ) ).toBe( true );
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.BNodesMapping.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:BNodesMapping.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
