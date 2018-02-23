import { Document } from "./Document";
import DefaultExport, { Fragment } from "./Fragment";

import {
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	STATIC,
} from "./test/JasmineExtender";


describe( module( "Carbon/Fragment" ), ():void => {

	describe( interfaze(
		"Carbon.Fragment.Fragment",
		"Interface of an in-memory fragment of a document."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"Carbon.Document.Document",
			"The document the fragment belongs to."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.Fragment.FragmentFactory",
		"Interface with the factory, decorate and utils methods of a `Carbon.FragmentFragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `Carbon.Fragment.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is Carbon.Fragment.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `Carbon.Fragment.Class` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is Carbon.Fragment.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a Fragment with the ID if provided.", [
				{ name: "document", type: "Carbon.Document.Document", description: "The document that the fragment will be part of." },
				{ name: "id", type: "string", optional: true, description: "The ID of the fragment to create." },
			],
			{ type: "Carbon.Fragment.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a Fragment from an object with the ID if provided.", [
				{ name: "object", type: "T", description: "Object that will be converted to a fragment." },
				{ name: "document", type: "Carbon.Document.Document", description: "The document that the fragment will be part of." },
				{ name: "id", type: "string", optional: true, description: "The ID that will be assigned to the fragment." },
			],
			{ type: "T & Carbon.Fragment.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object with the required `Carbon.Fragment.Fragment` properties and methods.", [
				{ name: "object", type: "T", description: "Object that will be converted to a fragment." },
			],
			{ type: "T & Carbon.Fragment.Fragment" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.Fragment.Fragment" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Fragment;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( hasProperty( STATIC, "Fragment", "Carbon.Fragment.FragmentFactory", "Constant that implements the `Carbon.Fragment.FragmentFactory` interface" ), ():void => {

		it( "should exist", ():void => {
			expect( Fragment ).toBeDefined();
			expect( Fragment ).toEqual( jasmine.any( Object ) );
		} );

		describe( "Fragment.TYPE", ():void => {

			it( "shuold not exist", ():void => {
				expect( Fragment.TYPE ).not.toBeDefined();
			} );

		} );

		describe( "Fragment.SCHEMA", ():void => {

			it( "should not exist", ():void => {
				expect( Fragment.SCHEMA ).not.toBeDefined();
			} );

		} );

		// TODO: Separate in different tests
		it( "Fragment.isDecorated", ():void => {
			expect( Fragment.isDecorated ).toBeDefined();
			expect( Fragment.isDecorated ).toEqual( jasmine.any( Function ) );

			let resource:Partial<Fragment> = undefined;
			expect( Fragment.isDecorated( resource ) ).toBe( false );

			resource = {
				_document: null,
			};
			expect( Fragment.isDecorated( resource ) ).toBe( true );

			delete resource._document;
			expect( Fragment.isDecorated( resource ) ).toBe( false );
			resource._document = null;
		} );

		// TODO: Add tests for `Fragment.is`

		let document:Document;
		beforeAll( ():void => {
			document = Document.create();
			document.id = "http://example.com/document/";
		} );

		describe( "Fragment.create", ():void => {

			// TODO: Separate in different methods
			it( "should test method with id", ():void => {
				expect( Fragment.create ).toBeDefined();
				expect( Fragment.create ).toEqual( jasmine.any( Function ) );

				let fragment:Fragment;

				fragment = Fragment.create( document, "#fragment" );
				expect( fragment ).toBeTruthy();
				expect( Fragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "#fragment" );

				fragment = Fragment.create( document, "http://example.com/document/#fragment" );
				expect( fragment ).toBeTruthy();
				expect( Fragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );

				fragment = Fragment.create( document, "_:BlankNode" );
				expect( fragment ).toBeTruthy();
				expect( Fragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "_:BlankNode" );
			} );

			// TODO: Separate in different methods
			it( "should test method without id", ():void => {
				let fragment1:Fragment;
				let fragment2:Fragment;

				fragment1 = Fragment.create( document );
				expect( fragment1 ).toBeTruthy();
				expect( Fragment.isDecorated( fragment1 ) ).toBe( true );
				expect( fragment1._document ).toBe( document );
				expect( fragment1.id ).toBe( "" );


				fragment2 = Fragment.create( document );
				expect( fragment2 ).toBeTruthy();
				expect( Fragment.isDecorated( fragment2 ) ).toBe( true );
				expect( fragment2._document ).toBe( document );
				expect( fragment2.id ).toBe( "" );
			} );

		} );

		describe( "Fragment.createFrom", ():void => {

			interface MyFragment {
				property:string;
			}

			// TODO: Separate in different tests
			it( "should test method with id", ():void => {
				expect( Fragment.createFrom ).toBeDefined();
				expect( Fragment.createFrom ).toEqual( jasmine.any( Function ) );

				let fragment:Fragment & MyFragment;

				fragment = Fragment.createFrom<MyFragment>( { property: "my property 1" }, document, "#fragment" );
				expect( fragment ).toBeTruthy();
				expect( Fragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "#fragment" );
				expect( fragment.property ).toBe( "my property 1" );

				fragment = Fragment.createFrom<MyFragment>( { property: "my property 2" }, document, "http://example.com/document/#fragment" );
				expect( fragment ).toBeTruthy();
				expect( Fragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
				expect( fragment.property ).toBe( "my property 2" );

				fragment = Fragment.createFrom<MyFragment>( { property: "my property 3" }, document, "_:BlankNode" );
				expect( fragment ).toBeTruthy();
				expect( Fragment.isDecorated( fragment ) ).toBe( true );
				expect( fragment._document ).toBe( document );
				expect( fragment.id ).toBe( "_:BlankNode" );
				expect( fragment.property ).toBe( "my property 3" );

				let anotherFragment:Fragment = Fragment.createFrom<Object>( {}, document, "_:AnotherBlankNode" );
				expect( anotherFragment ).toBeTruthy();
				expect( Fragment.isDecorated( anotherFragment ) ).toBe( true );
				expect( anotherFragment._document ).toBe( document );
				expect( anotherFragment.id ).toBe( "_:AnotherBlankNode" );
				expect( anotherFragment[ "property" ] ).toBeUndefined();
			} );

			// TODO: Separate in different tests
			it( "should test method without id", ():void => {
				let fragment1:Fragment & MyFragment;
				let fragment2:Fragment & MyFragment;

				fragment1 = Fragment.createFrom<MyFragment>( { property: "my property 1" }, document );
				expect( fragment1 ).toBeTruthy();
				expect( Fragment.isDecorated( fragment1 ) ).toBe( true );
				expect( fragment1._document ).toBe( document );
				expect( fragment1.id ).toBe( "" );
				expect( fragment1.property ).toBe( "my property 1" );


				fragment2 = Fragment.createFrom<MyFragment>( { property: "my property 2" }, document );
				expect( fragment2 ).toBeTruthy();
				expect( Fragment.isDecorated( fragment2 ) ).toBe( true );
				expect( fragment2._document ).toBe( document );
				expect( fragment2.id ).toBe( "" );
				expect( fragment2.property ).toBe( "my property 2" );

				let anotherFragment:Fragment = Fragment.createFrom<Object>( {}, document );
				expect( anotherFragment ).toBeTruthy();
				expect( Fragment.isDecorated( anotherFragment ) ).toBe( true );
				expect( anotherFragment._document ).toBe( document );
				expect( anotherFragment.id ).toBe( "" );
				expect( anotherFragment[ "property" ] ).toBeUndefined();
			} );

		} );

		// TODO: Add tests for `Fragment.decorate`

	} );

} );
