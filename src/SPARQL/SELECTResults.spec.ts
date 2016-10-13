import {
	OBLIGATORY,

	module,
	interfaze,

	isDefined,
	hasProperty,
	hasDefaultExport,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as SELECTResults from "./SELECTResults";
import DefaultExport from "./SELECTResults";

describe( module( "Carbon/SPARQL/SELECTResults" ), ():void => {

	it( isDefined(), ():void => {
		expect( SELECTResults ).toBeDefined();
		expect( Utils.isObject( SELECTResults ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.SPARQL.SELECTResults.Class",
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
			"Carbon.SPARQL.SELECTResult.BindingObject[]",
			"Array with the entries of the parsed elements asked in the query."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.SPARQL.SELECTResults.BindingObject",
		"Interface that represents an entry of a element asked for in the SELECT query."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"[ binding:string ]",
			"any",
			"An entry peer every `vars` selected for, which contains the parsed value requested. This elements can be from every literal type (`String`, `Number`, `Date`, etc.), to a `Carbon.Pointer.Class` if it is an URI."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.SPARQL.SELECTResults.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:SELECTResults.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
