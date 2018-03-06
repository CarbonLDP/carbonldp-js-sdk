import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as JSONLD from "./";

import * as Converter from "./Converter";
import * as Parser from "./Parser";
import * as Processor from "./Processor";

describe( module( "CarbonLDP/JSONLD" ), ():void => {

	it( isDefined(), ():void => {
		expect( JSONLD ).toBeDefined();
		expect( Utils.isObject( JSONLD ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Converter",
		"CarbonLDP/JSONLD/Converter"
	), ():void => {
		expect( JSONLD.Converter ).toBeDefined();
		expect( JSONLD.Converter ).toBe( Converter );
	} );

	it( reexports(
		STATIC,
		"Parser",
		"CarbonLDP/JSONLD/Parser"
	), ():void => {
		expect( JSONLD.Parser ).toBeDefined();
		expect( JSONLD.Parser ).toBe( Parser );
	} );

	it( reexports(
		STATIC,
		"Processor",
		"CarbonLDP/JSONLD/Processor"
	), ():void => {
		expect( JSONLD.Processor ).toBeDefined();
		expect( JSONLD.Processor ).toBe( Processor );
	} );

} );
