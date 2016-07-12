import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as RDF from "./RDF";

describe( module(
	"Carbon/NS/RDF"
), ():void => {

	it( isDefined(), ():void => {
		expect( RDF ).toBeDefined();
		expect( Utils.isObject( RDF ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( RDF.namespace ).toBeDefined();
		expect( Utils.isString( RDF.namespace ) ).toBe( true );

		expect( RDF.namespace ).toBe( "http://www.w3.org/1999/02/22-rdf-syntax-ns#" )
	} );

	describe( clazz(
		"Carbon.NS.RDF.Predicate",
		"Class that contains predicates defined in the RDF Syntax Specification"
	), ():void => {

		it( isDefined(), ():void => {
			expect( RDF.Predicate ).toBeDefined();
			expect( Utils.isFunction( RDF.Predicate ) ).toBe( true );

			expect( Object.keys( RDF.Predicate ).length ).toBe( 1 );
		} );

		it( hasProperty(
			STATIC,
			"type",
			"string"
		), ():void => {
			expect( RDF.Predicate.type ).toBeDefined();
			expect( Utils.isString( RDF.Predicate.type ) ).toBe( true );

			expect( RDF.Predicate.type ).toBe( "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" );
		} );

	} );

} );