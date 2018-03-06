import {
	extendsClass,
	hasDefaultExport,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import * as Utils from "./../Utils";

import DefaultExport, { CarbonMapEntry } from "./CarbonMapEntry";

describe( module( "carbonldp/LDP/CarbonMapEntry" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.CarbonMapEntry.CarbonMapEntry",
		[ "K", "V" ],
		"Entries of the `CarbonLDP.LDP.CarbonMap.CarbonMap` with the key/value pair."
	), ():void => {

		it( extendsClass( "CarbonLDP.BlankNode.BlankNode" ), ():void => {} );

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
		"CarbonLDP.LDP.CarbonMapEntry.CarbonMapEntryFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.LDP.CarbonMapEntry.CarbonMapEntry` objects"
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"CarbonMapEntry",
		"CarbonLDP.LDP.CarbonMapEntry.CarbonMapEntryFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( CarbonMapEntry ).toBeDefined();
			expect( CarbonMapEntry ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "CarbonMapEntry.SCHEMA", ():void => {
			expect( CarbonMapEntry.SCHEMA ).toBeDefined();
			expect( Utils.isObject( CarbonMapEntry.SCHEMA ) ).toBe( true );

			expect( CarbonMapEntry.SCHEMA as { [key:string]:object } ).toEqual( {
				entryKey: jasmine.any( Object ),
				entryValue: jasmine.any( Object ),
			} );

			expect( CarbonMapEntry.SCHEMA[ "entryKey" ] ).toEqual( {
				"@id": C.entryKey,
			} );

			expect( CarbonMapEntry.SCHEMA[ "entryValue" ] ).toEqual( {
				"@id": C.entryValue,
			} );

		} );

	} );

	it( hasDefaultExport( "CarbonLDP.LDP.CarbonMapEntry.CarbonMapEntry" ), ():void => {
		let defaultExport:DefaultExport<any, any> = <any> {};
		let defaultTarget:CarbonMapEntry<any, any>;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
