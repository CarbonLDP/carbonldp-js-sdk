import { isDefined, module, reexports, STATIC, } from "./test/JasmineExtender";

import * as SPARQL from "./SPARQL";
import * as Builder from "./SPARQL/Builder";
import * as QueryDocument from "./SPARQL/QueryDocument";
import * as RawResults from "./SPARQL/RawResults";
import * as RawResultsParser from "./SPARQL/RawResultsParser";
import * as SELECTResults from "./SPARQL/SELECTResults";
import Service from "./SPARQL/Service";
import * as Utils from "./Utils";

describe( module( "Carbon/SPARQL" ), ():void => {

	it( isDefined(), ():void => {
		expect( SPARQL ).toBeDefined();
		expect( Utils.isObject( SPARQL ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Builder",
		"Carbon/SPARQL/Builder"
	), ():void => {
		expect( SPARQL.Builder ).toBeDefined();
		expect( SPARQL.Builder ).toBe( Builder );
	} );


	it( reexports(
		STATIC,
		"QueryDocument",
		"Carbon/SPARQL/QueryDocument"
	), ():void => {
		expect( SPARQL.QueryDocument ).toBeDefined();
		expect( SPARQL.QueryDocument ).toBe( QueryDocument );
	} );

	it( reexports(
		STATIC,
		"RawResults",
		"Carbon/SPARQL/RawResults"
	), ():void => {
		expect( SPARQL.RawResults ).toBeDefined();
		expect( SPARQL.RawResults ).toBe( RawResults );
	} );

	it( reexports(
		STATIC,
		"RawResultsParser",
		"Carbon/SPARQL/RawResultsParser"
	), ():void => {
		expect( SPARQL.RawResultsParser ).toBeDefined();
		expect( SPARQL.RawResultsParser ).toBe( RawResultsParser );
	} );

	it( reexports(
		STATIC,
		"SELECTResults",
		"Carbon/SPARQL/SELECTResults"
	), ():void => {
		expect( SPARQL.SELECTResults ).toBeDefined();
		expect( SPARQL.SELECTResults ).toBe( SELECTResults );
	} );

	it( reexports(
		STATIC,
		"Service",
		"Carbon/SPARQL/Service"
	), ():void => {
		expect( SPARQL.Service ).toBeDefined();
		expect( SPARQL.Service ).toBe( Service );
	} );

} );
