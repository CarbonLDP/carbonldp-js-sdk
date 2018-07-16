import { isDefined, module, reexports, STATIC } from "../test/JasmineExtender";

import * as Utils from "../Utils";

import * as JSONLD from "./";
import { JSONLDCompacter } from "./JSONLDCompacter";
import { JSONLDConverter } from "./JSONLDConverter";
import { JSONLDParser } from "./JSONLDParser";
import { JSONLDProcessor } from "./JSONLDProcessor";

describe( module( "carbonldp/JSONLD" ), ():void => {

	it( isDefined(), ():void => {
		expect( JSONLD ).toBeDefined();
		expect( Utils.isObject( JSONLD ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"JSONLDCompacter",
		"CarbonLDP.JSONLD.JSONLDCompacter"
	), ():void => {
		expect( JSONLD.JSONLDCompacter ).toBeDefined();
		expect( JSONLD.JSONLDCompacter ).toBe( JSONLDCompacter );
	} );

	it( reexports(
		STATIC,
		"JSONLDConverter",
		"CarbonLDP.JSONLD.JSONLDConverter"
	), ():void => {
		expect( JSONLD.JSONLDConverter ).toBeDefined();
		expect( JSONLD.JSONLDConverter ).toBe( JSONLDConverter );
	} );

	it( reexports(
		STATIC,
		"JSONLDParser",
		"CarbonLDP.JSONLD.JSONLDParser"
	), ():void => {
		expect( JSONLD.JSONLDParser ).toBeDefined();
		expect( JSONLD.JSONLDParser ).toBe( JSONLDParser );
	} );

	it( reexports(
		STATIC,
		"JSONLDProcessor",
		"CarbonLDP.JSONLD.JSONLDProcessor"
	), ():void => {
		expect( JSONLD.JSONLDProcessor ).toBeDefined();
		expect( JSONLD.JSONLDProcessor ).toBe( JSONLDProcessor );
	} );

} );
