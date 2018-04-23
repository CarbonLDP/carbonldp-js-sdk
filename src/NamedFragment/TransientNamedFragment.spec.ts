import { TransientDocument } from "../Document";
import { BaseNamedFragment } from "./BaseNamedFragment";

import { TransientNamedFragment } from "./TransientNamedFragment";

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
} from "../test/JasmineExtender";

describe( module( "carbonldp/NamedFragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientNamedFragment",
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
		"CarbonLDP.TransientNamedFragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.TransientNamedFragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `CarbonLDP.TransientNamedFragment` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.TransientNamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a NamedFragment with the slug provided", [
				{ name: "data", type: "T & CarbonLDP.BaseNamedFragment", description: "Data to be used in the creation of the named fragment." },
			],
			{ type: "T & CarbonLDP.TransientNamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a NamedFragment from an object with the slug provided.", [
				{ name: "object", type: "T & CarbonLDP.BaseNamedFragment", description: "Object that will be converted to a named fragment." },
			],
			{ type: "T & CarbonLDP.TransientNamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Named.Fragment.NamedFragment` object.", [
				{ name: "object", type: "T", description: "Object to be decorated." },
			],
			{ type: "T & CarbonLDP.TransientNamedFragment" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"TransientNamedFragment",
		"CarbonLDP.TransientNamedFragmentFactory",
		"Constant that implements the `CarbonLDP.TransientNamedFragment`, interface"
	), ():void => {

		it( isDefined(), ():void => {
			expect( TransientNamedFragment ).toBeDefined();
			expect( TransientNamedFragment ).toEqual( jasmine.any( Object ) );
		} );

		let document:TransientDocument;
		beforeAll( ():void => {
			document = TransientDocument.create();
			document.id = "https://example.com/document/";
		} );

		// TODO: Separate in different tests
		it( "TransientNamedFragment.isDecorated", ():void => {
			expect( TransientNamedFragment.isDecorated ).toBeDefined();
			expect( TransientNamedFragment.isDecorated ).toEqual( jasmine.any( Function ) );

			let namedFragment:Partial<TransientNamedFragment> = undefined;
			expect( TransientNamedFragment.isDecorated( namedFragment ) ).toBe( false );

			namedFragment = {
				slug: null,
			};
			expect( TransientNamedFragment.isDecorated( namedFragment ) ).toBe( false );

			Object.defineProperty( namedFragment, "slug", { enumerable: false } );
			expect( TransientNamedFragment.isDecorated( namedFragment ) ).toBe( true );

			delete namedFragment.slug;
			expect( TransientNamedFragment.isDecorated( namedFragment ) ).toBe( false );
			namedFragment.slug = null;
		} );

		// TODO: Create tests for `NamedFragment.is`

		describe( "TransientNamedFragment.create", ():void => {

			it( "should exists", ():void => {
				expect( TransientNamedFragment.create ).toBeDefined();
				expect( TransientNamedFragment.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should maintain the _document reference", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.create( {
					_document: document,
					slug: null,
				} );

				expect( fragment._document ).toBe( document );
			} );

			it( "should convert slug in the fragment id", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.create( {
					_document: document,
					slug: "fragment",
				} );

				expect( fragment.id ).toBe( "https://example.com/document/#fragment" );
			} );

			it( "should call TransientNamedFragment.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( TransientNamedFragment, "createFrom" );

				TransientNamedFragment.create( { the: "named fragment", _document: document, slug: "fragment" } );
				expect( spy ).toHaveBeenCalledWith( { the: "named fragment", _document: document, slug: "fragment" } );
			} );

			it( "should return different reference", ():void => {
				const object:BaseNamedFragment = { _document: document, slug: "" };
				const returned:TransientNamedFragment = TransientNamedFragment.create( object );

				expect( object ).not.toBe( returned );
			} );

		} );

		describe( "TransientNamedFragment.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( TransientNamedFragment.createFrom ).toBeDefined();
				expect( TransientNamedFragment.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should maintain the _document reference", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.createFrom( {
					_document: document,
					slug: null,
				} );

				expect( fragment._document ).toBe( document );
			} );

			it( "should convert slug in the fragment id", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.createFrom( {
					_document: document,
					slug: "fragment",
				} );

				expect( fragment.id ).toBe( "https://example.com/document/#fragment" );
			} );

			it( "should call TransientNamedFragment.decorate", ():void => {
				const spy:jasmine.Spy = spyOn( TransientNamedFragment, "decorate" );

				const object:{ the:string } & BaseNamedFragment = { the: "named fragment", _document: document, slug: "fragment" };
				TransientNamedFragment.createFrom( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should return same reference", ():void => {
				const object:BaseNamedFragment = { _document: document, slug: "" };
				const returned:TransientNamedFragment = TransientNamedFragment.createFrom( object );

				expect( object ).toBe( returned );
			} );

		} );


		// TODO: Create tests for `NamedFragment.decorate`

	} );

} );
