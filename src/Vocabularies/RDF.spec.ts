import { RDF } from "./RDF";


describe( "RDF", ():void => {

	it( "should exist", ():void => {
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
