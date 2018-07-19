import { Resource } from "../Resource/Resource";

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

import { Map } from "./Map";


describe( module( "carbonldp/LDP/Map" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.Map",
		[ "K", "V" ],
		"Interface that contains a set entries with a close relation in the form of a key/value pair."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entries",
			"CarbonLDP.LDP.MapEntry<K,V>[]",
			"An array of entries' pair relations."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.MapFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.Map` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `CarbonLDP.LDP.Map` object.", [
				{ name: "object", type: "object", description: "Object to check" },
			],
			{ type: "object is CarbonLDP.LDP.Map<any, any>" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"CarbonMap",
		"CarbonLDP.LDP.MapFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( Map ).toBeDefined();
			expect( Map ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "CarbonMap.TYPE", ():void => {
			expect( Map.TYPE ).toBeDefined();
			expect( Utils.isString( Map.TYPE ) ).toBe( true );

			expect( Map.TYPE ).toBe( C.Map );
		} );

		// TODO: Separate in different tests
		it( "CarbonMap.SCHEMA", ():void => {
			expect( Map.SCHEMA ).toBeDefined();
			expect( Utils.isObject( Map.SCHEMA ) ).toBe( true );

			expect( Map.SCHEMA as { [key:string]:object } ).toEqual( {
				entries: jasmine.any( Object ),
			} );

			expect( Map.SCHEMA[ "entries" ] ).toEqual( {
				"@id": C.entry,
				"@type": "@id",
				"@container": "@set",
			} );

		} );

		// TODO: Separate in different tests
		it( "CarbonMap.is", ():void => {
			expect( Map.is ).toBeDefined();
			expect( Utils.isFunction( Map.is ) ).toBe( true );

			let object:Map<any, any> = void 0;
			expect( Map.is( object ) ).toBe( false );
			object = null;
			expect( Map.is( object ) ).toBe( false );

			object = Resource.decorate( {
				types: [ C.Map ],
				entries: null,
			} );
			expect( Map.is( object ) ).toBe( true );

			object.removeType( C.Map );
			expect( Map.is( object ) ).toBe( false );
			object.addType( C.Map );

			delete object.entries;
			expect( Map.is( object ) ).toBe( false );
			object.entries = null;
		} );

	} );

} );
