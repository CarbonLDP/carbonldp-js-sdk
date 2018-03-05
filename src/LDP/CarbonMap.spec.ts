import { Resource } from "../Resource";
import {
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import * as Utils from "./../Utils";

import DefaultExport, { CarbonMap } from "./CarbonMap";

describe( module( "Carbon/LDP/CarbonMap" ), ():void => {

	describe( interfaze(
		"Carbon.LDP.CarbonMap.CarbonMap",
		[ "K", "V" ],
		"Interface that contains a set entries with a close relation in the form of a key/value pair."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entries",
			"Carbon.LDP.CarbonMapEntry.CarbonMapEntry<K,V>[]",
			"An array of entries' pair relations."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.LDP.CarbonMap.CarbonMapConstant",
		"Interface with the factory, decorate and utils methods for `Carbon.LDP.CarbonMap.CarbonMap` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.CarbonMap.CarbonMap` object.", [
				{ name: "object", type: "object", description: "Object to check" },
			],
			{ type: "object is Carbon.LDP.CarbonMap.CarbonMap<any, any>" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"CarbonMap",
		"Carbon.LDP.CarbonMap.CarbonMapConstant"
	), ():void => {

		it( isDefined(), ():void => {
			expect( CarbonMap ).toBeDefined();
			expect( CarbonMap ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "CarbonMap.TYPE", ():void => {
			expect( CarbonMap.TYPE ).toBeDefined();
			expect( Utils.isString( CarbonMap.TYPE ) ).toBe( true );

			expect( CarbonMap.TYPE ).toBe( C.Map );
		} );

		// TODO: Separate in different tests
		it( "CarbonMap.SCHEMA", ():void => {
			expect( CarbonMap.SCHEMA ).toBeDefined();
			expect( Utils.isObject( CarbonMap.SCHEMA ) ).toBe( true );

			expect( CarbonMap.SCHEMA as { [key:string]:object } ).toEqual( {
				entries: jasmine.any( Object ),
			} );

			expect( CarbonMap.SCHEMA[ "entries" ] ).toEqual( {
				"@id": C.entry,
				"@type": "@id",
				"@container": "@set",
			} );

		} );

		// TODO: Separate in different tests
		it( "CarbonMap.is", ():void => {
			expect( CarbonMap.is ).toBeDefined();
			expect( Utils.isFunction( CarbonMap.is ) ).toBe( true );

			let object:CarbonMap<any, any> = void 0;
			expect( CarbonMap.is( object ) ).toBe( false );
			object = null;
			expect( CarbonMap.is( object ) ).toBe( false );

			object = Resource.decorate( {
				types: [ C.Map ],
				entries: null,
			} );
			expect( CarbonMap.is( object ) ).toBe( true );

			object.removeType( C.Map );
			expect( CarbonMap.is( object ) ).toBe( false );
			object.addType( C.Map );

			delete object.entries;
			expect( CarbonMap.is( object ) ).toBe( false );
			object.entries = null;
		} );

	} );

	it( hasDefaultExport( "Carbon.LDP.CarbonMap.CarbonMap" ), ():void => {
		let defaultExport:DefaultExport<any, any> = <any> {};
		let defaultTarget:CarbonMap<any, any>;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
