import { NamedFragment } from "./NamedFragment";
import { Fragment } from "./Fragment";

import { PersistedNamedFragment } from "./PersistedNamedFragment";

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
import * as Utils from "./Utils";

describe( module( "carbonldp/PersistedNamedFragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PersistedNamedFragment",
		"Interface that represents a persisted named fragment of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Fragment" ), ():void => {} );
		it( extendsClass( "CarbonLDP.NamedFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"CarbonLDP.Document",
			"A reference to the persisted document the current named fragment belongs to."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.PersistedNamedFragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.PersistedNamedFragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			[
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.PersistedNamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.PersistedNamedFragment` object.",
			[
				{ name: "object", type: "T", description: "The object to convert into a persisted named fragment." },
			]
		), ():void => {} );

	} );

	describe( property( STATIC, "PersistedNamedFragment", "CarbonLDP.PersistedNamedFragmentFactory", "Constant that implements the `CarbonLDP.PersistedNamedFragmentFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedNamedFragment ).toBeDefined();
			expect( PersistedNamedFragment ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Test `PersistedNamedFragment.isDecorated`

		// TODO: Separate in different tests
		it( "PersistedNamedFragment.decorate", ():void => {
			expect( PersistedNamedFragment.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedNamedFragment.decorate ) ).toBe( true );

			let spyPersistedDecorator:jasmine.Spy = spyOn( Fragment, "decorate" ).and.callThrough();

			let fragment:NamedFragment = NamedFragment.create( <any> { id: "http://example.com/resoruce/" }, "fragment-slug" );
			let persistedFragment:PersistedNamedFragment = PersistedNamedFragment.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment );
		} );

	} );

} );
