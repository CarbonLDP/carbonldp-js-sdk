import {
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as RawResults from "./RawResults";

describe( module( "carbonldp/SPARQL/RawResults" ), ():void => {

	it( isDefined(), ():void => {
		expect( RawResults ).toBeDefined();
		expect( Utils.isObject( RawResults ) ).toBe( true );
	} );

	describe( interfaze(
		"CarbonLDP.SPARQL.SPARQLRawResults",
		"Interface that represents the raw response of a SPARQL query."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"head",
			`{ "vars"?:string[], "links"?:string[] }`,
			"Contains an array `vars` with the possible elements inside the results bindings properties. Can also contains an array `link`, that contains URI to further information about the results."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"results",
			`{ "bindings":CarbonLDP.SPARQL.SPARQLRawBindingObject[] }`,
			"The results of a `SELECT` query."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"boolean",
			"boolean",
			"The result of an `ASK` query."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.SPARQL.SPARQLRawBindingObject",
		"Interface that represents the raw response of a SPARQL query."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"[ name:string ]",
			"CarbonLDP.SPARQL.SPARQLRawBindingProperty",
			"An entry of every `vars` requested as the `name` variable, containing the binding property with its value."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.SPARQL.SPARQLRawBindingProperty",
		"Interface that represents every entry of a `CarbonLDP.SPARQL.SPARQLRawBindingObject`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"type",
			"string",
			"The type of binding property, it could be `uri`, `literal` or `bnode`."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"value",
			"string",
			"The string value of binding property."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"datatype",
			"string",
			"The URI of the type of the binding property. This is only present when the property is of type `literal`."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"xml:lang",
			"string",
			"If the property is a `literal` and of data type `xsd:string`, this property indicates if it has an specific language."
		), ():void => {} );

	} );

} );
