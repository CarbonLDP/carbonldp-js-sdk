import {
	hasMethod,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	STATIC,
} from "../test/JasmineExtender";
import { TransientDocument } from "../Document";
import { BaseFragment } from "./BaseFragment";
import { TransientFragment } from "./TransientFragment";


describe( module( "carbonldp/Fragment" ), ():void => {

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
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.TransientFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a Fragment with the ID if provided.", [
				{ name: "data", type: "T & CarbonLDP.BaseFragment", description: "Data to be used in the creation of the fragment" },
			],
			{ type: "T & CarbonLDP.TransientFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a Fragment from an object with the ID if provided.", [
				{ name: "object", type: "T & CarbonLDP.BaseFragment", description: "Object that will be converted to a fragment." },
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

	describe( hasProperty(
		STATIC,
		"TransientFragment",
		"CarbonLDP.TransientFragmentFactory",
		"Constant that implements the `CarbonLDP.TransientFragmentFactory` interface"
	), ():void => {

		it( "should exist", ():void => {
			expect( TransientFragment ).toBeDefined();
			expect( TransientFragment ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "TransientFragment.isDecorated", ():void => {
			expect( TransientFragment.isDecorated ).toBeDefined();
			expect( TransientFragment.isDecorated ).toEqual( jasmine.any( Function ) );

			let resource:Partial<TransientFragment> = undefined;
			expect( TransientFragment.isDecorated( resource ) ).toBe( false );

			resource = Object.defineProperty( {}, "_document", {
				writable: true,
				configurable: true,
				enumerable: false,
				value: null,
			} );
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

			it( "should exists", ():void => {
				expect( TransientFragment.create ).toBeDefined();
				expect( TransientFragment.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should maintain _document property", ():void => {
				const fragment:TransientFragment = TransientFragment.create( {
					_document: document,
				} );

				expect( fragment._document ).toBe( document );
			} );

			it( "should fill empty id when no provided", ():void => {
				const fragment:TransientFragment = TransientFragment.create( {
					_document: document,
				} );

				expect( fragment.id ).toBe( "" );
			} );

			it( "should maintain id when provided", ():void => {
				const fragment:TransientFragment = TransientFragment.create( {
					id: "#fragment",
					_document: document,
				} );

				expect( fragment.id ).toBe( "#fragment" );
			} );

			it( "should call TransientFragment.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( TransientFragment, "createFrom" );

				TransientFragment.create( { the: "fragment", _document: document } );
				expect( spy ).toHaveBeenCalledWith( { the: "fragment", _document: document } );
			} );

			it( "should return different reference", ():void => {
				const object:BaseFragment = { _document: document };
				const returned:TransientFragment = TransientFragment.create( object );

				expect( object ).not.toBe( returned );
			} );

		} );

		describe( "TransientFragment.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( TransientFragment.createFrom ).toBeDefined();
				expect( TransientFragment.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should maintain _document property", ():void => {
				const fragment:TransientFragment = TransientFragment.createFrom( {
					_document: document,
				} );

				expect( fragment._document ).toBe( document );
			} );

			it( "should fill empty id when no provided", ():void => {
				const fragment:TransientFragment = TransientFragment.createFrom( {
					_document: document,
				} );

				expect( fragment.id ).toBe( "" );
			} );

			it( "should maintain id when provided", ():void => {
				const fragment:TransientFragment = TransientFragment.createFrom( {
					id: "#fragment",
					_document: document,
				} );

				expect( fragment.id ).toBe( "#fragment" );
			} );

			it( "should call TransientFragment.decorate", ():void => {
				const spy:jasmine.Spy = spyOn( TransientFragment, "decorate" );

				TransientFragment.createFrom( { the: "fragment", _document: document } );
				expect( spy ).toHaveBeenCalledWith( { the: "fragment", _document: document } );
			} );

			it( "should return same reference", ():void => {
				const object:BaseFragment = { _document: document };
				const returned:TransientFragment = TransientFragment.createFrom( object );

				expect( object ).toBe( returned );
			} );

		} );

		// TODO: Add tests for `Fragment.decorate`

	} );

} );
