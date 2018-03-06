import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as SPARQL from "./";

import * as Builder from "./Builder";
import * as QueryDocument from "./QueryDocument";
import * as RawResults from "./RawResults";
import * as RawResultsParser from "./RawResultsParser";
import * as SELECTResults from "./SelectResults";
import * as Service from "./Service";

describe( module( "CarbonLDP/SPARQL" ), ():void => {

	it( isDefined(), ():void => {
		expect( SPARQL ).toBeDefined();
		expect( Utils.isObject( SPARQL ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Builder",
		"CarbonLDP/SPARQL/Builder"
	), ():void => {
		expect( SPARQL.Builder ).toBeDefined();
		expect( SPARQL.Builder ).toBe( Builder );
	} );


	it( reexports(
		STATIC,
		"QueryDocument",
		"CarbonLDP/SPARQL/QueryDocument"
	), ():void => {
		expect( SPARQL.QueryDocument ).toBeDefined();
		expect( SPARQL.QueryDocument ).toBe( QueryDocument );
	} );

	it( reexports(
		STATIC,
		"RawResults",
		"CarbonLDP/SPARQL/RawResults"
	), ():void => {
		expect( SPARQL.RawResults ).toBeDefined();
		expect( SPARQL.RawResults ).toBe( RawResults );
	} );

	it( reexports(
		STATIC,
		"RawResultsParser",
		"CarbonLDP/SPARQL/RawResultsParser"
	), ():void => {
		expect( SPARQL.RawResultsParser ).toBeDefined();
		expect( SPARQL.RawResultsParser ).toBe( RawResultsParser );
	} );

	it( reexports(
		STATIC,
		"SelectResults",
		"CarbonLDP/SPARQL/SelectResults"
	), ():void => {
		expect( SPARQL.SelectResults ).toBeDefined();
		expect( SPARQL.SelectResults ).toBe( SELECTResults );
	} );

	it( reexports(
		STATIC,
		"Service",
		"CarbonLDP/SPARQL/Service"
	), ():void => {
		expect( SPARQL.Service ).toBeDefined();
		expect( SPARQL.Service ).toBe( Service );
	} );

} );
