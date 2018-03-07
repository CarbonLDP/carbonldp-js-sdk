import { NamedFragment } from "./NamedFragment";
import { PersistedFragment } from "./PersistedFragment";

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
		"CarbonLDP.PersistedNamedFragment.PersistedNamedFragment",
		"Interface that represents a persisted named fragment of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.PersistedFragment.PersistedFragment" ), ():void => {} );
		it( extendsClass( "CarbonLDP.NamedFragment.NamedFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"CarbonLDP.PersistedDocument.PersistedDocument",
			"A reference to the persisted document the current named fragment belongs to."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.PersistedNamedFragment.PersistedNamedFragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.PersistedNamedFragment.PersistedNamedFragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			[
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.PersistedNamedFragment.PersistedNamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.PersistedNamedFragment.PersistedNamedFragment` object.",
			[
				{ name: "object", type: "T", description: "The object to convert into a persisted named fragment." },
			]
		), ():void => {} );

	} );

	describe( property( STATIC, "PersistedNamedFragment", "CarbonLDP.PersistedNamedFragment.PersistedNamedFragmentFactory", "Constant that implements the `CarbonLDP.PersistedNamedFragment.PersistedNamedFragmentFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedNamedFragment ).toBeDefined();
			expect( PersistedNamedFragment ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Test `PersistedNamedFragment.isDecorated`

		// TODO: Separate in different tests
		it( "PersistedNamedFragment.decorate", ():void => {
			expect( PersistedNamedFragment.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedNamedFragment.decorate ) ).toBe( true );

			let spyPersistedDecorator:jasmine.Spy = spyOn( PersistedFragment, "decorate" ).and.callThrough();

			let fragment:NamedFragment = NamedFragment.create( <any> { id: "http://example.com/resoruce/" }, "fragment-slug" );
			let persistedFragment:PersistedNamedFragment = PersistedNamedFragment.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment );
		} );

	} );

} );
