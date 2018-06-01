import { Fragment } from "../Fragment";
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

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			[
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.NamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.NamedFragment` object.",
			[
				{ name: "object", type: "T", description: "The object to convert into a persisted named fragment." },
			]
		), ():void => {} );

	} );

	describe( property( STATIC, "NamedFragment", "CarbonLDP.NamedFragmentFactory", "Constant that implements the `CarbonLDP.NamedFragmentFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( NamedFragment ).toBeDefined();
			expect( NamedFragment ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Test `NamedFragment.isDecorated`

		// TODO: Separate in different tests
		it( "NamedFragment.decorate", ():void => {
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

	} );

} );
