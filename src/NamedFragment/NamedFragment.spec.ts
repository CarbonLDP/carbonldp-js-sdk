import { Fragment } from "../Fragment";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import { NamedFragment } from "./NamedFragment";

import { TransientNamedFragment } from "./TransientNamedFragment";


describe( module( "carbonldp/NamedFragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.NamedFragment",
		"Interface that represents a persisted named fragment of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Fragment" ), ():void => {} );
		it( extendsClass( "CarbonLDP.TransientNamedFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"CarbonLDP.Document",
			"A reference to the persisted document the current named fragment belongs to."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.NamedFragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.NamedFragment` object."
	), ():void => {

		describe( method( OBLIGATORY, "isDecorated" ), () => {

			it( hasSignature(
				[
					{ name: "object", type: "object" },
				],
				{ type: "object is CarbonLDP.NamedFragment" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( NamedFragment.isDecorated ).toBeDefined();
				expect( NamedFragment.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call Fragment & TransientNamedFragment .isDecorated", () => {
				const isFragment:jasmine.Spy = spyOn( Fragment, "isDecorated" )
					.and.returnValue( true );
				const isTransientNamedFragment:jasmine.Spy = spyOn( TransientNamedFragment, "isDecorated" )
					.and.returnValue( true );


				const returned:boolean = NamedFragment.isDecorated( { the: "object" } );
				expect( isFragment ).toHaveBeenCalledWith( { the: "object" } );
				expect( isTransientNamedFragment ).toHaveBeenCalledWith( { the: "object" } );
				expect( returned ).toBe( true );
			} );

		} );

		// TODO: Separate in different tests
		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.NamedFragment` object.",
			[
				{ name: "object", type: "T", description: "The object to convert into a persisted named fragment." },
			]
		), ():void => {
			expect( NamedFragment.decorate ).toBeDefined();
			expect( Utils.isFunction( NamedFragment.decorate ) ).toBe( true );

			let spyPersistedDecorator:jasmine.Spy = spyOn( Fragment, "decorate" ).and.callThrough();

			let fragment:TransientNamedFragment = TransientNamedFragment.create( {
				_document: <any> { id: "http://example.com/resoruce/" },
				slug: "fragment-slug",
			} );
			let persistedFragment:NamedFragment = NamedFragment.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment );
		} );


		describe( method( OBLIGATORY, "is" ), () => {

			it( hasSignature(
				[
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.NamedFragment" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( NamedFragment.is ).toBeDefined();
				expect( NamedFragment.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientNamedFragment:jasmine.Spy;
			let isFragment:jasmine.Spy;
			beforeEach( ():void => {
				isTransientNamedFragment = spyOn( TransientNamedFragment, "is" )
					.and.returnValue( true );
				isFragment = spyOn( Fragment, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should be a TransientNamedFragment", () => {
				NamedFragment.is( { the: "object" } );
				expect( isTransientNamedFragment ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should be a Fragment", () => {
				NamedFragment.is( { the: "object" } );
				expect( isFragment ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = NamedFragment.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

	} );

	describe( property( STATIC, "NamedFragment", "CarbonLDP.NamedFragmentFactory", "Constant that implements the `CarbonLDP.NamedFragmentFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( NamedFragment ).toBeDefined();
			expect( NamedFragment ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
