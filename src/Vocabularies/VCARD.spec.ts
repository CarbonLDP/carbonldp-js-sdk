import {
	hasProperty,
	module,
	namespaze,
	STATIC,
} from "../test/JasmineExtender";

import { VCARD } from "./VCARD";

describe( module( "Carbon/Vocabularies/VCARD" ), ():void => {

	describe( namespaze( "Carbon.Vocabularies.VCARD", "Vocabulary that contains some predicates defined in the vCard Ontology Specification." ), ():void => {

		it( "should exists", ():void => {
			expect( VCARD ).toBeDefined();
			expect( VCARD ).toEqual( jasmine.any( Object ) );
		} );

		it( "should test all exported IRIs", ():void => {
			expect( Object.keys( VCARD ).length ).toBe( 2 );
		} );

		it( hasProperty(
			STATIC,
			"namespace",
			"string"
		), ():void => {
			expect( VCARD.namespace ).toEqual( jasmine.any( String ) );
			expect( VCARD.namespace ).toBe( "http://www.w3.org/2001/vcard-rdf/3.0#" );
		} );

		it( hasProperty(
			STATIC,
			"email",
			"string"
		), ():void => {
			expect( VCARD.email ).toEqual( jasmine.any( String ) );
			expect( VCARD.email ).toBe( "http://www.w3.org/2001/vcard-rdf/3.0#email" );
		} );

	} );

} );
