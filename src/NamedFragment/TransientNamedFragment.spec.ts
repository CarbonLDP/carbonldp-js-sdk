import { TransientDocument } from "../Document";
import { TransientFragment } from "../Fragment";

import {
	extendsClass,
	hasMethod,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { PickSelfProps } from "../Utils";
import { BaseNamedFragment } from "./BaseNamedFragment";

import { TransientNamedFragment } from "./TransientNamedFragment";

describe( module( "carbonldp/NamedFragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientNamedFragment",
		"Interface that represents an in-memory named fragment from a Carbon LDP document."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientFragment" ), ():void => {} );

		describe( property(
			OBLIGATORY,
			"slug",
			"string",
			"The slug of the current named fragment."
		), ():void => {

			it( "should return null when empty object", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.decorate( {} );
				expect( fragment.slug ).toBeNull();
			} );

			it( "should return null when registry referenced", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.decorate( {
					_registry: TransientDocument.create( { id: "https://example.com/document/" } ),
				} );

				expect( fragment.slug ).toBeNull();
			} );

			it( "should return null even slug in object", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.decorate( { slug: "fragment-name" } );
				expect( fragment.slug ).toBeNull();
			} );

			it( "should return fragment from ID", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.decorate( {
					id: "https://example.com/document/#fragment-name",
				} );

				expect( fragment.slug ).toBe( "fragment-name" );
			} );

			it( "should return null when ID has no fragment", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.decorate( {
					id: "https://example.com/document/",
				} );

				expect( fragment.slug ).toBeNull();
			} );

			it( "should set ID when set slug and has registry", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.decorate( {
					_registry: TransientDocument.create( { id: "https://example.com/document/" } ),
				} );

				fragment.slug = "fragment-name";
				expect( fragment.id ).toBe( "https://example.com/document/#fragment-name" );
			} );

			it( "should set relative ID when set slug and NO registry", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.decorate( {} );

				fragment.slug = "fragment-name";
				expect( fragment.id ).toBe( "#fragment-name" );
			} );

		} );

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

		describe( "TransientNamedFragment.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( TransientNamedFragment.isDecorated ).toBeDefined();
				expect( TransientNamedFragment.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			type Expected = PickSelfProps<TransientNamedFragment, TransientFragment>;

			function createExpected():Expected {
				const expected:Expected = {
					slug: null,
				};

				const descriptor:PropertyDescriptor = { enumerable: false, configurable: true };
				Object.defineProperty( expected, "slug", descriptor );

				return expected;
			}

			it( "should return true when required properties defined", ():void => {
				const fragment:Expected = createExpected();
				expect( TransientNamedFragment.isDecorated( fragment ) ).toBe( true );
			} );

			it( "should return false when slug is enumerable", ():void => {
				const fragment:Expected = createExpected();
				Object.defineProperty( fragment, "slug", { enumerable: true } );

				expect( TransientNamedFragment.isDecorated( fragment ) ).toBe( false );
			} );

			it( "should return false when missing slug", ():void => {
				const fragment:Expected = createExpected();
				delete fragment.slug;

				expect( TransientNamedFragment.isDecorated( fragment ) ).toBe( false );
			} );

		} );

		// TODO: Create tests for `NamedFragment.is`

		describe( "TransientNamedFragment.create", ():void => {

			it( "should exists", ():void => {
				expect( TransientNamedFragment.create ).toBeDefined();
				expect( TransientNamedFragment.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call TransientNamedFragment.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( TransientNamedFragment, "createFrom" );

				TransientNamedFragment.create( { the: "named fragment", slug: "fragment" } );
				expect( spy ).toHaveBeenCalledWith( { the: "named fragment", slug: "fragment" } );
			} );

			it( "should return different reference", ():void => {
				const object:BaseNamedFragment = { slug: "" };
				const returned:TransientNamedFragment = TransientNamedFragment.create( object );

				expect( object ).not.toBe( returned );
			} );

		} );

		describe( "TransientNamedFragment.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( TransientNamedFragment.createFrom ).toBeDefined();
				expect( TransientNamedFragment.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should maintain slug", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.createFrom( {
					slug: "fragment-name",
				} );

				expect( fragment.slug ).toBe( "fragment-name" );
			} );

			it( "should call TransientNamedFragment.decorate", ():void => {
				const spy:jasmine.Spy = spyOn( TransientNamedFragment, "decorate" )
					.and.callThrough();

				const object:{ the:string } & BaseNamedFragment = { the: "named fragment", slug: "fragment" };
				TransientNamedFragment.createFrom( object );
				expect( spy ).toHaveBeenCalledWith( object );
			} );

			it( "should return same reference", ():void => {
				const object:BaseNamedFragment = { slug: "" };
				const returned:TransientNamedFragment = TransientNamedFragment.createFrom( object );

				expect( object ).toBe( returned );
			} );

		} );

		describe( "TransientNamedFragment.decorate", ():void => {

			it( "should exists", ():void => {
				expect( TransientNamedFragment.decorate ).toBeDefined();
				expect( TransientNamedFragment.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should work with isDecorated", ():void => {
				const fragment:TransientNamedFragment = TransientNamedFragment.decorate( {} );
				expect( TransientNamedFragment.isDecorated( fragment ) ).toBe( true );
			} );

		} );

	} );

} );
