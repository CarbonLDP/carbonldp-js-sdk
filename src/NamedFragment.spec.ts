import { TransientDocument } from "./TransientDocument";

import { NamedFragment } from "./NamedFragment";

import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "./test/JasmineExtender";

describe( module( "carbonldp/NamedFragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.NamedFragment",
		"Interface that represents an in-memory named fragment from a Carbon LDP document."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"slug",
			"string",
			"The slug of the current named fragment."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.NamedFragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.NamedFragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `CarbonLDP.NamedFragment` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.NamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a NamedFragment with the slug provided", [
				{ name: "document", type: "CarbonLDP.TransientDocument", description: "The document that the NamedFragment will be part of." },
				{ name: "slug", type: "string", description: "The slug that will identify the NamedFragment." },
			],
			{ type: "CarbonLDP.Class" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a NamedFragment from an Object with the slug provided.", [
				{ name: "object", type: "T", description: "Object that will be converted to a NamedFragment." },
				{ name: "document", type: "CarbonLDP.TransientDocument", description: "The document that the NamedFragment will be part of." },
				{ name: "slug", type: "string", description: "The slug that will identify the NamedFragment." },
			],
			{ type: "T & CarbonLDP.NamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Named.Fragment.NamedFragment` object.", [
				{ name: "object", type: "T", description: "Object to be decorated." },
			],
			{ type: "T & CarbonLDP.NamedFragment" }
		), ():void => {} );

	} );

	describe( property( STATIC, "NamedFragment", "CarbonLDP.NamedFragmentFactory", "Constant that implements the `CarbonLDP.NamedFragment`, interface" ), ():void => {

		it( isDefined(), ():void => {
			expect( NamedFragment ).toBeDefined();
			expect( NamedFragment ).toEqual( jasmine.any( Object ) );
		} );

		let document:TransientDocument;
		beforeAll( ():void => {
			document = TransientDocument.create();
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
