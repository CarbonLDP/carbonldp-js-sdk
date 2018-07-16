import { hasProperty, interfaze, module, OBLIGATORY, property, STATIC } from "../test/JasmineExtender";

import { VCARD } from "./VCARD";


describe( module( "carbonldp/Vocabularies/VCARD" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Vocabularies.VCARD",
		"Interface that defines the used vocabulary in the vCard Ontology Specification."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"namespace",
			"http://www.w3.org/2001/vcard-rdf/3.0#"
		), ():void => {
			const target:VCARD[ "namespace" ] = "http://www.w3.org/2001/vcard-rdf/3.0#";
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"email",
			"http://www.w3.org/2001/vcard-rdf/3.0#email"
		), ():void => {
			const target:VCARD[ "email" ] = "http://www.w3.org/2001/vcard-rdf/3.0#email";
			expect( target ).toBeDefined();
		} );

	} );

	describe( property(
		STATIC,
		"VCARD",
		"CarbonLDP.Vocabularies.VCARD",
		"Constant that implements the used vocabulary in the vCard Ontology Specification."
	), ():void => {

		it( "should exists", ():void => {
			expect( VCARD ).toBeDefined();
			expect( VCARD ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( VCARD ).length ).toBe( 2 );
		} );

		it( "VCARD.namespace", ():void => {
			expect( VCARD.namespace ).toEqual( jasmine.any( String ) );
			expect( VCARD.namespace ).toBe( "http://www.w3.org/2001/vcard-rdf/3.0#" );
		} );

		it( "VCARD.email", ():void => {
			expect( VCARD.email ).toEqual( jasmine.any( String ) );
			expect( VCARD.email ).toBe( "http://www.w3.org/2001/vcard-rdf/3.0#email" );
		} );

	} );

} );
