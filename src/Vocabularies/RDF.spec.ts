import {
	hasProperty,
	module,
	namespaze,
	STATIC
} from "../test/JasmineExtender";

import { RDF } from "./RDF";

describe( module( "Carbon/Vocabularies/RDF" ), ():void => {

	describe( namespaze( "Carbon.Vocabularies.RDF", "Vocabulary defined in the RDF Syntax Specification." ), ():void => {

		it( "should exists", ():void => {
			expect( RDF ).toBeDefined();
			expect( RDF ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( RDF ).length ).toBe( 2 );
		} );

		it( hasProperty(
			STATIC,
			"namespace",
			"string"
		), ():void => {
			expect( RDF.namespace ).toEqual( jasmine.any( String ) );
			expect( RDF.namespace ).toBe( "http://www.w3.org/1999/02/22-rdf-syntax-ns#" );
		} );

		it( hasProperty(
			STATIC,
			"type",
			"string"
		), ():void => {
			expect( RDF.type ).toEqual( jasmine.any( String ) );
			expect( RDF.type ).toBe( "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" );
		} );

	} );

} );
