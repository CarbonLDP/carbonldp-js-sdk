import { Resource } from "../Resource";
import {
	extendsClass,
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

import { CarbonMap } from "./CarbonMap";

describe( module( "carbonldp/LDP/CarbonMap" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.CarbonMap.CarbonMap",
		[ "K", "V" ],
		"Interface that contains a set entries with a close relation in the form of a key/value pair."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource.Resource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entries",
			"CarbonLDP.LDP.CarbonMapEntry.CarbonMapEntry<K,V>[]",
			"An array of entries' pair relations."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.CarbonMap.CarbonMapFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.CarbonMap.CarbonMap` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `CarbonLDP.LDP.CarbonMap.CarbonMap` object.", [
				{ name: "object", type: "object", description: "Object to check" },
			],
			{ type: "object is CarbonLDP.LDP.CarbonMap.CarbonMap<any, any>" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"CarbonMap",
		"CarbonLDP.LDP.CarbonMap.CarbonMapFactory"
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

} );
