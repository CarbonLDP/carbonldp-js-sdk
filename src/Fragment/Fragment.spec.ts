import { createMockContext } from "../../test/helpers/mocks";
import { AbstractContext } from "../AbstractContext";
import { PersistedResource } from "../Resource";
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

import { Fragment } from "./Fragment";
import { TransientFragment } from "./TransientFragment";

describe( module( "carbonldp/Fragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Fragment",
		"Interface that represents a persisted fragment of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource" ), ():void => {} );
		it( extendsClass( "CarbonLDP.TransientFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"CarbonLDP.Document",
			"A reference to the persisted document the current fragment belongs to."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.FragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.Fragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Fragment` object.",
			[
				{ name: "object", type: "object", description: "The object to convert into a persisted fragment." },
			]
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"Fragment",
		"CarbonLDP.FragmentFactory",
		"Constant that implements the `CarbonLDP.FragmentFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Fragment ).toBeDefined();
			expect( Fragment ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Test `Fragment.isDecorated`

		// TODO: Test `Fragment.is`

		// TODO: Separate in different tests
		it( "Fragment.decorate", ():void => {
			expect( Fragment.decorate ).toBeDefined();
			expect( Utils.isFunction( Fragment.decorate ) ).toBe( true );

			let spyPersistedDecorator:jasmine.Spy = spyOn( PersistedResource, "decorate" );

			let fragment:TransientFragment = TransientFragment.create( {
				_document: null,
				id: "_:01",
			} );
			let persistedFragment:Fragment = Fragment.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment );
		} );

		// TODO: Test `Fragment.create`

		// TODO: Test `Fragment.createFrom`

	} );

} );
