import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";

import * as Vocabularies from "./";

import { C } from "./C";
import { CS } from "./CS";
import { LDP } from "./LDP";
import { RDF } from "./RDF";
import { SHACL } from "./SHACL";
import { VCARD } from "./VCARD";
import { XSD } from "./XSD";

describe( module( "CarbonLDP/Vocabularies" ), ():void => {

	it( isDefined(), ():void => {
		expect( Vocabularies ).toBeDefined();
		expect( Vocabularies ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		STATIC,
		"C",
		"CarbonLDP.Vocabularies.C"
	), ():void => {
		expect( Vocabularies.C ).toBeDefined();
		expect( Vocabularies.C ).toBe( C );
	} );

	it( reexports(
		STATIC,
		"CS",
		"CarbonLDP.Vocabularies.CS"
	), ():void => {
		expect( Vocabularies.CS ).toBeDefined();
		expect( Vocabularies.CS ).toBe( CS );
	} );

	it( reexports(
		STATIC,
		"LDP",
		"CarbonLDP.Vocabularies.LDP"
	), ():void => {
		expect( Vocabularies.LDP ).toBeDefined();
		expect( Vocabularies.LDP ).toBe( LDP );
	} );

	it( reexports(
		STATIC,
		"RDF",
		"CarbonLDP.Vocabularies.RDF"
	), ():void => {
		expect( Vocabularies.RDF ).toBeDefined();
		expect( Vocabularies.RDF ).toBe( RDF );
	} );

	it( reexports(
		STATIC,
		"SHACL",
		"CarbonLDP.Vocabularies.SHACL"
	), ():void => {
		expect( Vocabularies.SHACL ).toBeDefined();
		expect( Vocabularies.SHACL ).toBe( SHACL );
	} );

	it( reexports(
		STATIC,
		"VCARD",
		"CarbonLDP.Vocabularies.VCARD"
	), ():void => {
		expect( Vocabularies.VCARD ).toBeDefined();
		expect( Vocabularies.VCARD ).toBe( VCARD );
	} );

	it( reexports(
		STATIC,
		"XSD",
		"CarbonLDP.Vocabularies.XSD"
	), ():void => {
		expect( Vocabularies.XSD ).toBeDefined();
		expect( Vocabularies.XSD ).toBe( XSD );
	} );

} );
