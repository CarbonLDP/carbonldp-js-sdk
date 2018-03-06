import {
	hasDefaultExport,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as SELECTResults from "./SelectResults";
import DefaultExport from "./SelectResults";

describe( module( "CarbonLDP/SPARQL/SelectResults" ), ():void => {

	it( isDefined(), ():void => {
		expect( SELECTResults ).toBeDefined();
		expect( Utils.isObject( SELECTResults ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.SPARQL.SelectResults.SPARQLSelectResults",
		[ "T = CarbonLDP.SPARQL.SelectResults.SPARQLBindingObject" ],
		"Interface that represents a parsed response of a SELECT SPARQL query."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"vars",
			"string[]",
			"Array of strings that contains the names of the elements asked in the query."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"bindings",
			"T[]",
			"Array with the entries of the parsed elements asked in the query."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.SPARQL.SelectResults.SPARQLBindingObject",
		"Interface that represents an entry of a element asked for in the SELECT query."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"[ binding:string ]",
			"string | number | boolean | Date | CarbonLDP.Pointer.Pointer",
			"An entry peer every `vars` selected for, which contains the parsed value requested. This elements can be from every literal type (`String`, `Number`, `Date`, etc.), to a `CarbonLDP.Pointer.Pointer` if it is an URI."
		), ():void => {} );

	} );

	it( hasDefaultExport( "CarbonLDP.SPARQL.SelectResults.SPARQLSelectResults" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:SELECTResults.SPARQLSelectResults;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
