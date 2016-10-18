import {
	STATIC,

	module,

	isDefined,
	reexports,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as Converter from "./JSONLD/Converter";
import * as Parser from "./JSONLD/Parser";
import * as Processor from "./JSONLD/Processor";

import * as JSONLD from "./JSONLD";

describe( module( "Carbon/JSONLD" ), ():void => {

	it( isDefined(), ():void => {
		expect( JSONLD ).toBeDefined();
		expect( Utils.isObject( JSONLD ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Converter",
		"Carbon/JSONLD/Converter"
	), ():void => {
		expect( JSONLD.Converter ).toBeDefined();
		expect( JSONLD.Converter ).toBe( Converter );
	} );

	it( reexports(
		STATIC,
		"Parser",
		"Carbon/JSONLD/Parser"
	), ():void => {
		expect( JSONLD.Parser ).toBeDefined();
		expect( JSONLD.Parser ).toBe( Parser );
	} );

	it( reexports(
		STATIC,
		"Processor",
		"Carbon/JSONLD/Processor"
	), ():void => {
		expect( JSONLD.Processor ).toBeDefined();
		expect( JSONLD.Processor ).toBe( Processor );
	} );

} );
