import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import * as Utils from "./../Utils";

import { MapEntry } from "./MapEntry";

describe( module( "carbonldp/LDP/MapEntry" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.MapEntry",
		[ "K", "V" ],
		"Entries of the `CarbonLDP.LDP.Map` with the key/value pair."
	), ():void => {

		it( extendsClass( "CarbonLDP.BlankNode" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entryKey",
			"K",
			"The key element of the entry's pair."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"entryValue",
			"V",
			"The value element of the entry's pair."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.MapEntryFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.MapEntry.MapEntry` objects"
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"CarbonMapEntry",
		"CarbonLDP.LDP.MapEntryFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( MapEntry ).toBeDefined();
			expect( MapEntry ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "CarbonMapEntry.SCHEMA", ():void => {
			expect( MapEntry.SCHEMA ).toBeDefined();
			expect( Utils.isObject( MapEntry.SCHEMA ) ).toBe( true );

			expect( MapEntry.SCHEMA as { [key:string]:object } ).toEqual( {
				entryKey: jasmine.any( Object ),
				entryValue: jasmine.any( Object ),
			} );

			expect( MapEntry.SCHEMA[ "entryKey" ] ).toEqual( {
				"@id": C.entryKey,
			} );

			expect( MapEntry.SCHEMA[ "entryValue" ] ).toEqual( {
				"@id": C.entryValue,
			} );

		} );

	} );

} );
