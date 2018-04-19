import { TransientDocument } from "./TransientDocument";
import { TransientFragment } from "./TransientFragment";

import {
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	STATIC,
} from "./test/JasmineExtender";


describe( module( "carbonldp/TransientFragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientFragment",
		"Interface of an in-memory fragment of a document."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"CarbonLDP.TransientDocument",
			"The document the fragment belongs to."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientFragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.TransientFragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `CarbonLDP.TransientFragment` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.TransientFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.TransientFragment` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.TransientFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a Fragment with the ID if provided.", [
				{ name: "document", type: "CarbonLDP.TransientDocument", description: "The document that the fragment will be part of." },
				{ name: "id", type: "string", optional: true, description: "The ID of the fragment to create." },
			],
			{ type: "CarbonLDP.TransientFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a Fragment from an object with the ID if provided.", [
				{ name: "object", type: "T", description: "Object that will be converted to a fragment." },
				{ name: "document", type: "CarbonLDP.TransientDocument", description: "The document that the fragment will be part of." },
				{ name: "id", type: "string", optional: true, description: "The ID that will be assigned to the fragment." },
			],
			{ type: "T & CarbonLDP.TransientFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object with the required `CarbonLDP.TransientFragment` properties and methods.", [
				{ name: "object", type: "T", description: "Object that will be converted to a fragment." },
			],
			{ type: "T & CarbonLDP.TransientFragment" }
		), ():void => {} );

	} );

	describe( hasProperty( STATIC, "TransientFragment", "CarbonLDP.TransientFragmentFactory", "Constant that implements the `CarbonLDP.TransientFragmentFactory` interface" ), ():void => {

		it( "should exist", ():void => {
			expect( TransientFragment ).toBeDefined();
			expect( TransientFragment ).toEqual( jasmine.any( Object ) );
		} );

		describe( "TransientFragment.TYPE", ():void => {

			it( "shuold not exist", ():void => {
				expect( TransientFragment.TYPE ).not.toBeDefined();
			} );

		} );

		describe( "TransientFragment.SCHEMA", ():void => {

			it( "should not exist", ():void => {
				expect( TransientFragment.SCHEMA ).not.toBeDefined();
			} );

		} );

		// TODO: Separate in different tests
		it( "TransientFragment.isDecorated", ():void => {
			expect( TransientFragment.isDecorated ).toBeDefined();
			expect( TransientFragment.isDecorated ).toEqual( jasmine.any( Function ) );

			let resource:Partial<TransientFragment> = undefined;
			expect( TransientFragment.isDecorated( resource ) ).toBe( false );

			resource = {
				_document: null,
			};
			expect( TransientFragment.isDecorated( resource ) ).toBe( true );

			delete resource._document;
			expect( TransientFragment.isDecorated( resource ) ).toBe( false );
			resource._document = null;
		} );

		// TODO: Add tests for `Fragment.is`

		let document:TransientDocument;
		beforeAll( ():void => {
			document = TransientDocument.create();
			document.id = "http://example.com/document/";
		} );

		describe( "TransientFragment.create", ():void => {

			// TODO: Separate in different methods
			it( "should test method with id", ():void => {
				expect( TransientFragment.create ).toBeDefined();
				expect( TransientFragment.create ).toEqual( jasmine.any( Function ) );

				let fragment:TransientFragment;

				fragment = TransientFragment.create( document, "#fragment" );
				expect( fragment ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "#fragment" );

				fragment = TransientFragment.create( document, "http://example.com/document/#fragment" );
				expect( fragment ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );

				fragment = TransientFragment.create( document, "_:BlankNode" );
				expect( fragment ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "_:BlankNode" );
			} );

			// TODO: Separate in different methods
			it( "should test method without id", ():void => {
				let fragment1:TransientFragment;
				let fragment2:TransientFragment;

				fragment1 = TransientFragment.create( document );
				expect( fragment1 ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment1 ) ).toBe( true );
				expect( fragment1._document ).toBe( document );
				expect( fragment1.id ).toBe( "" );


				fragment2 = TransientFragment.create( document );
				expect( fragment2 ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment2 ) ).toBe( true );
				expect( fragment2._document ).toBe( document );
				expect( fragment2.id ).toBe( "" );
			} );

		} );

		describe( "TransientFragment.createFrom", ():void => {

			interface MyFragment {
				property:string;
			}

			// TODO: Separate in different tests
			it( "should test method with id", ():void => {
				expect( TransientFragment.createFrom ).toBeDefined();
				expect( TransientFragment.createFrom ).toEqual( jasmine.any( Function ) );

				let fragment:TransientFragment & MyFragment;

				fragment = TransientFragment.createFrom<MyFragment>( { property: "my property 1" }, document, "#fragment" );
				expect( fragment ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "#fragment" );
				expect( fragment.property ).toBe( "my property 1" );

				fragment = TransientFragment.createFrom<MyFragment>( { property: "my property 2" }, document, "http://example.com/document/#fragment" );
				expect( fragment ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
				expect( fragment.property ).toBe( "my property 2" );

				fragment = TransientFragment.createFrom<MyFragment>( { property: "my property 3" }, document, "_:BlankNode" );
				expect( fragment ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "_:BlankNode" );
				expect( fragment.property ).toBe( "my property 3" );

				let anotherFragment:TransientFragment = TransientFragment.createFrom<Object>( {}, document, "_:AnotherBlankNode" );
				expect( anotherFragment ).toBeTruthy();
				expect( TransientFragment.isDecorated( anotherFragment ) ).toBe( true );
				expect( anotherFragment._document ).toBe( document );
				expect( anotherFragment.id ).toBe( "_:AnotherBlankNode" );
				expect( anotherFragment[ "property" ] ).toBeUndefined();
			} );

			// TODO: Separate in different tests
			it( "should test method without id", ():void => {
				let fragment1:TransientFragment & MyFragment;
				let fragment2:TransientFragment & MyFragment;

				fragment1 = TransientFragment.createFrom<MyFragment>( { property: "my property 1" }, document );
				expect( fragment1 ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment1 ) ).toBe( true );
				expect( fragment1._document ).toBe( document );
				expect( fragment1.id ).toBe( "" );
				expect( fragment1.property ).toBe( "my property 1" );


				fragment2 = TransientFragment.createFrom<MyFragment>( { property: "my property 2" }, document );
				expect( fragment2 ).toBeTruthy();
				expect( TransientFragment.isDecorated( fragment2 ) ).toBe( true );
				expect( fragment2._document ).toBe( document );
				expect( fragment2.id ).toBe( "" );
				expect( fragment2.property ).toBe( "my property 2" );

				let anotherFragment:TransientFragment = TransientFragment.createFrom<Object>( {}, document );
				expect( anotherFragment ).toBeTruthy();
				expect( TransientFragment.isDecorated( anotherFragment ) ).toBe( true );
				expect( anotherFragment._document ).toBe( document );
				expect( anotherFragment.id ).toBe( "" );
				expect( anotherFragment[ "property" ] ).toBeUndefined();
			} );

		} );

		// TODO: Add tests for `Fragment.decorate`

	} );

} );
