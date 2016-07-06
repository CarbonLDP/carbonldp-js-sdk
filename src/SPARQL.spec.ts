import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	reexports
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as RawResults from "./SPARQL/RawResults";
import * as RawResultsParser from "./SPARQL/RawResultsParser";
import Service from "./SPARQL/Service";
import * as SELECTResults from "./SPARQL/SELECTResults";

import * as SPARQL from "./SPARQL";

describe( module( "Carbon/SPARQL" ), ():void => {

	it( isDefined(), ():void => {
		expect( SPARQL ).toBeDefined();
		expect( Utils.isObject( SPARQL ) ).toBe( true );
	});

	it( reexports(
		STATIC,
		"RawResultsRawResults",
		"Carbon/SPARQL/RawResults"
	), ():void => {
		expect( SPARQL.RawResults ).toBeDefined();
		expect( SPARQL.RawResults ).toBe( RawResults );
	});

	it( reexports(
		STATIC,
		"RawResultsParserRawResultsParser",
		"Carbon/SPARQL/RawResultsParser"
	), ():void => {
		expect( SPARQL.RawResultsParser ).toBeDefined();
		expect( SPARQL.RawResultsParser ).toBe( RawResultsParser );
	});

	it( reexports(
		STATIC,
		"Service",
		"Carbon/SPARQL/Service"
	), ():void => {
		expect( SPARQL.Service ).toBeDefined();
		expect( SPARQL.Service ).toBe( Service );
	});

	it( reexports(
		STATIC,
		"SELECTResults",
		"Carbon/SPARQL/SELECTResults"
	), ():void => {
		expect( SPARQL.SELECTResults ).toBeDefined();
		expect( SPARQL.SELECTResults ).toBe( SELECTResults );
	});

});