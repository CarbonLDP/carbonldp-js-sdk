import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as VCARD from "./VCARD";

describe( module(
	"Carbon/NS/VCARD"
), ():void => {

	it( isDefined(), ():void => {
		expect( VCARD ).toBeDefined();
		expect( Utils.isObject( VCARD ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( VCARD.namespace ).toBeDefined();
		expect( Utils.isString( VCARD.namespace ) ).toBe( true );

		expect( VCARD.namespace ).toBe( "http://www.w3.org/2001/vcard-rdf/3.0#" )
	} );

	describe( clazz(
		"Carbon.NS.VCARD.Predicate",
		"Class that contains some predicates defined in the vCard Ontology Specification."
	), ():void => {

		it( isDefined(), ():void => {
			expect( VCARD.Predicate ).toBeDefined();
			expect( Utils.isFunction( VCARD.Predicate ) ).toBe( true );
			expect( Object.keys( VCARD.Predicate ).length ).toBe( 1 );
		} );

		it( hasProperty(
			STATIC,
			"email",
			"string"
		), ():void => {
			expect( VCARD.Predicate.email ).toBeDefined();
			expect( Utils.isString( VCARD.Predicate.email ) ).toBe( true );

			expect( VCARD.Predicate.email ).toBe( "http://www.w3.org/2001/vcard-rdf/3.0#email" );
		} );

	} );

} );