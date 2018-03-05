import { Document } from "./Document";
import DefaultExport, { NamedFragment } from "./NamedFragment";

import {
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "./test/JasmineExtender";

describe( module( "Carbon/NamedFragment" ), ():void => {

	describe( interfaze(
		"Carbon.NamedFragment.NamedFragment",
		"Interface that represents an in-memory named fragment from a Carbon LDP document."
	), ():void => {

		it( extendsClass( "Carbon.Fragment.Fragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"slug",
			"string",
			"The slug of the current named fragment."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.NamedFragment.NamedFragmentConstant",
		"Interface with the factory, decorate and utils methods of a `Carbon.NamedFragment.NamedFragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `Carbon.NamedFragment.NamedFragment` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is Carbon.NamedFragment.NamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided is considered a `Carbon.NamedFragment.NamedFragment` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is Carbon.NamedFragment.NamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a NamedFragment with the slug provided", [
				{ name: "document", type: "Carbon.Document.Document", description: "The document that the NamedFragment will be part of." },
				{ name: "slug", type: "string", description: "The slug that will identify the NamedFragment." },
			],
			{ type: "Carbon.NamedFragment.Class" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends object" ],
			"Creates a NamedFragment from an Object with the slug provided.", [
				{ name: "object", type: "T", description: "Object that will be converted to a NamedFragment." },
				{ name: "document", type: "Carbon.Document.Document", description: "The document that the NamedFragment will be part of." },
				{ name: "slug", type: "string", description: "The slug that will identify the NamedFragment." },
			],
			{ type: "T & Carbon.NamedFragment.NamedFragment" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.Named.Fragment.NamedFragment` object.", [
				{ name: "object", type: "T", description: "Object to be decorated." },
			],
			{ type: "T & Carbon.NamedFragment.NamedFragment" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.NamedFragment.NamedFragment" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:NamedFragment;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( property( STATIC, "NamedFragment", "Carbon.NamedFragment.NamedFragmentConstant", "Constant that implements the `Carbon.NamedFragment.NamedFragment`, interface" ), ():void => {

		it( isDefined(), ():void => {
			expect( NamedFragment ).toBeDefined();
			expect( NamedFragment ).toEqual( jasmine.any( Object ) );
		} );

		let document:Document;
		beforeAll( ():void => {
			document = Document.create();
			document.id = "http://example.com/document/";
		} );

		// TODO: Separate in different tests
		it( "NamedFragment.isDecorated", ():void => {
			expect( NamedFragment.isDecorated ).toBeDefined();
			expect( NamedFragment.isDecorated ).toEqual( jasmine.any( Function ) );

			let namedFragment:Partial<NamedFragment> = undefined;
			expect( NamedFragment.isDecorated( namedFragment ) ).toBe( false );

			namedFragment = {
				slug: null,
			};
			expect( NamedFragment.isDecorated( namedFragment ) ).toBe( false );

			Object.defineProperty( namedFragment, "slug", { enumerable: false } );
			expect( NamedFragment.isDecorated( namedFragment ) ).toBe( true );

			delete namedFragment.slug;
			expect( NamedFragment.isDecorated( namedFragment ) ).toBe( false );
			namedFragment.slug = null;
		} );

		// TODO: Create tests for `NamedFragment.is`

		// TODO: Separate in different tests
		it( "NamedFragment.create", ():void => {
			expect( NamedFragment.create ).toBeDefined();
			expect( NamedFragment.create ).toEqual( jasmine.any( Function ) );

			let fragment:NamedFragment;

			fragment = NamedFragment.create( document, "fragment" );
			expect( fragment ).toBeTruthy();
			expect( NamedFragment.isDecorated( fragment ) ).toBe( true );
			expect( fragment._document ).toBe( document );
			expect( fragment.id ).toBe( "http://example.com/document/#fragment" );

			fragment = NamedFragment.create( document, "another-fragment" );
			expect( fragment ).toBeTruthy();
			expect( NamedFragment.isDecorated( fragment ) ).toBe( true );
			expect( fragment._document ).toBe( document );
			expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
		} );

		// TODO: Separate in different tests
		it( "NamedFragment.createFrom", ():void => {
			expect( NamedFragment.createFrom ).toBeDefined();
			expect( NamedFragment.createFrom ).toEqual( jasmine.any( Function ) );

			interface MyFragment {
				property:string;
			}

			let fragment:NamedFragment & MyFragment;

			fragment = NamedFragment.createFrom<MyFragment>( { property: "my property 1" }, document, "fragment" );
			expect( fragment ).toBeTruthy();
			expect( NamedFragment.isDecorated( fragment ) ).toBe( true );
			expect( fragment._document ).toBe( document );
			expect( fragment.id ).toBe( "http://example.com/document/#fragment" );
			expect( fragment.property ).toBe( "my property 1" );

			fragment = NamedFragment.createFrom<MyFragment>( { property: "my property 2" }, document, "another-fragment" );
			expect( fragment ).toBeTruthy();
			expect( NamedFragment.isDecorated( fragment ) ).toBe( true );
			expect( fragment._document ).toBe( document );
			expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
			expect( fragment.property ).toBe( "my property 2" );

			let anotherFragment:NamedFragment = NamedFragment.createFrom<Object>( {}, document, "some-fragment" );
			expect( anotherFragment ).toBeTruthy();
			expect( NamedFragment.isDecorated( anotherFragment ) ).toBe( true );
			expect( anotherFragment._document ).toBe( document );
			expect( anotherFragment.id ).toBe( "http://example.com/document/#some-fragment" );
			expect( anotherFragment[ "property" ] ).toBeUndefined();
		} );

		// TODO: Create tests for `NamedFragment.decorate`

	} );

} );
