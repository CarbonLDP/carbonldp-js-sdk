import {
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";

import { RDF } from "./RDF";

describe( module( "carbonldp/Vocabularies/RDF" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Vocabularies.RDFVocab",
		"Interface that defines the used vocabulary defined in the RDF Syntax Specification."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"namespace",
			"http://www.w3.org/1999/02/22-rdf-syntax-ns#"
		), ():void => {
			const target:RDF[ "namespace" ] = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"type",
			"http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
		), ():void => {
			const target:RDF[ "type" ] = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type";
			expect( target ).toBeDefined();
		} );

	} );

	describe( property(
		STATIC,
		"RDF",
		"CarbonLDP.Vocabularies.RDFVocab",
		"Constant that implements the used vocabulary defined in the RDF Syntax Specification."
	), ():void => {

		it( "should exists", ():void => {
			expect( RDF ).toBeDefined();
			expect( RDF ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( RDF ).length ).toBe( 2 );
		} );

		it( "LDP.namespace", ():void => {
			expect( RDF.namespace ).toEqual( jasmine.any( String ) );
			expect( RDF.namespace ).toBe( "http://www.w3.org/1999/02/22-rdf-syntax-ns#" );
		} );

		it( "LDP.type", ():void => {
			expect( RDF.type ).toEqual( jasmine.any( String ) );
			expect( RDF.type ).toBe( "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" );
		} );

	} );

} );
