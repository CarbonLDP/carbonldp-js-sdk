import {
	isDefined,
	module,
	reexports,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import * as SPARQL from "./";

import {
	FinishSPARQLSelect,
	SPARQLBuilder,
} from "./Builder";
import {
	SPARQLRawBindingObject,
	SPARQLRawBindingProperty,
	SPARQLRawResults,
} from "./RawResults";
import { SPARQLRawResultsParser } from "./RawResultsParser";
import {
	SPARQLBindingObject,
	SPARQLSelectResults,
} from "./SelectResults";
import { SPARQLService } from "./SPARQLService";


describe( module( "carbonldp/SPARQL" ), ():void => {

	it( isDefined(), ():void => {
		expect( SPARQL ).toBeDefined();
		expect( Utils.isObject( SPARQL ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"SPARQLBuilder",
		"CarbonLDP.SPARQL.SPARQLBuilder"
	), ():void => {
		expect( SPARQL.SPARQLBuilder ).toBeDefined();
		expect( SPARQL.SPARQLBuilder ).toBe( SPARQLBuilder );
	} );

	it( reexports(
		STATIC,
		"FinishSPARQLSelect",
		"CarbonLDP.SPARQL.FinishSPARQLSelect"
	), ():void => {
		const target:SPARQL.FinishSPARQLSelect = {} as FinishSPARQLSelect;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"SPARQLRawResults",
		"CarbonLDP.SPARQL.SPARQLRawResults"
	), ():void => {
		const target:SPARQL.SPARQLRawResults = {} as SPARQLRawResults;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"SPARQLRawBindingObject",
		"CarbonLDP.SPARQL.SPARQLRawBindingObject"
	), ():void => {
		const target:SPARQL.SPARQLRawBindingObject = {} as SPARQLRawBindingObject;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"SPARQLRawBindingProperty",
		"CarbonLDP.SPARQL.SPARQLRawBindingProperty"
	), ():void => {
		const target:SPARQL.SPARQLRawBindingProperty = {} as SPARQLRawBindingProperty;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"SPARQLRawResultsParser",
		"CarbonLDP.SPARQL.SPARQLRawResultsParser"
	), ():void => {
		expect( SPARQL.SPARQLRawResultsParser ).toBeDefined();
		expect( SPARQL.SPARQLRawResultsParser ).toBe( SPARQLRawResultsParser );
	} );

	it( reexports(
		STATIC,
		"SPARQLBindingObject",
		"CarbonLDP.SPARQL.SPARQLBindingObject"
	), ():void => {
		const target:SPARQL.SPARQLBindingObject = {} as SPARQLBindingObject;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"SPARQLSelectResults",
		"CarbonLDP.SPARQL.SPARQLSelectResults"
	), ():void => {
		const target:SPARQL.SPARQLSelectResults = {} as SPARQLSelectResults;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		STATIC,
		"SPARQLService",
		"CarbonLDP.SPARQL.SPARQLService"
	), ():void => {
		expect( SPARQL.SPARQLService ).toBeDefined();
		expect( SPARQL.SPARQLService ).toBe( SPARQLService );
	} );

} );
