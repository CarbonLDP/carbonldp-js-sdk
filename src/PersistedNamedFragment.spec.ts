import { NamedFragment } from "./NamedFragment";
import { PersistedFragment } from "./PersistedFragment";

import DefaultExport, { PersistedNamedFragment } from "./PersistedNamedFragment";

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
import * as Utils from "./Utils";

describe( module( "Carbon/PersistedNamedFragment" ), ():void => {

	describe( interfaze(
		"Carbon.PersistedNamedFragment.PersistedNamedFragment",
		"Interface that represents a persisted named fragment of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.PersistedFragment.PersistedFragment" ), ():void => {} );
		it( extendsClass( "Carbon.NamedFragment.NamedFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"Carbon.PersistedDocument.PersistedDocument",
			"A reference to the persisted document the current named fragment belongs to."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.PersistedNamedFragment.PersistedNamedFragmentConstant",
		"Interface with the factory, decorate and utils methods of a `Carbon.PersistedNamedFragment.PersistedNamedFragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			[
				{ name: "object", type: "object" },
			],
			{ type: "object is Carbon.PersistedNamedFragment.PersistedNamedFragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.PersistedNamedFragment.PersistedNamedFragment` object.",
			[
				{ name: "object", type: "T", description: "The object to convert into a persisted named fragment." },
			]
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.PersistedNamedFragment.PersistedNamedFragment" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedNamedFragment;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );


	describe( property( STATIC, "PersistedNamedFragment", "Carbon.PersistedNamedFragment.PersistedNamedFragmentConstant", "Constant that implements the `Carbon.PersistedNamedFragment.PersistedNamedFragmentConstant` interface." ), ():void => {

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
