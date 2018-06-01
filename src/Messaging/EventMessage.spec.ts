import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies";

import { EventMessage } from "./EventMessage";

describe( module( "carbonldp/Messaging/Message" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.EventMessage",
		"Interface with the base properties of the data received in a subscription event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:EventMessage = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {
			const target:TransientResource = {} as EventMessage;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Pointer"
		), ():void => {
			const target:EventMessage[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.EventMessageFactory",
		"Interface with the factory, decorate and utils elements for `CarbonLDP.Messaging.EventMessage` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );


		describe( method(
			OBLIGATORY,
			"is"
		), ():void => {

			it( hasSignature(
				"Returns true if the object is considered a `CarbonLDP.Messaging.EventMessage` interface.",
				[
					{ name: "value", type: "any", description: "The value to be tested." },
				],
				{ type: "value is CarbonLDP.Messaging.EventMessage" }
			), ():void => {} );

		} );

	} );

	describe( property(
		STATIC,
		"EventMessage",
		"CarbonLDP.Messaging.EventMessageFactory"
	), ():void => {

		it( "should exist", ():void => {
			expect( EventMessage ).toBeDefined();
			expect( EventMessage ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "EventMessage.SCHEMA", ():void => {
			expect( EventMessage.SCHEMA ).toBeDefined();
			expect( EventMessage.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( EventMessage.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
			} );

			expect( EventMessage.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );
		} );

		describe( "EventMessage.is", ():void => {

			it( "should exists", ():void => {
				expect( EventMessage.is ).toBeDefined();
				expect( EventMessage.is ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false if falsy is provided", ():void => {
				expect( EventMessage.is( void 0 ) ).toBe( false );
				expect( EventMessage.is( null ) ).toBe( false );
			} );

			it( "should return false if has a missing model properties", ():void => {
				const object:EventMessage = TransientResource.create( {
					target: null,
				} );

				expect( EventMessage.is( object ) ).toBe( true );

				delete object.target;
				expect( EventMessage.is( object ) ).toBe( false );
				object.target = null;
			} );

		} );

	} );

} );
