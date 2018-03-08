import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
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
import { C } from "../Vocabularies/C";

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

		it( extendsClass( "CarbonLDP.Resource.Resource" ), ():void => {
			const target:Resource = {} as EventMessage;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Pointer.Pointer"
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
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );


		describe( method(
			OBLIGATORY,
			"isDecorated"
		), ():void => {

			it( hasSignature(
				"Returns true if the object provided has the specific properties of the `CarbonLDP.Messaging.EventMessage` interface.",
				[
					{ name: "object", type: "object", description: "The object to be tested." },
				],
				{ type: "object is CarbonLDP.Messaging.EventMessage" }
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

		describe( "EventMessage.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( EventMessage.isDecorated ).toBeDefined();
				expect( EventMessage.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false if falsy is provided", ():void => {
				expect( EventMessage.isDecorated( void 0 ) ).toBe( false );
				expect( EventMessage.isDecorated( null ) ).toBe( false );
			} );

			it( "should return false if has a missing class property", ():void => {
				const object:Partial<EventMessage> = {
					target: null,
				};

				expect( EventMessage.isDecorated( object ) ).toBe( true );

				delete object.target;
				expect( EventMessage.isDecorated( object ) ).toBe( false );
				object.target = null;
			} );

		} );

	} );

} );
