import { Document } from "../Document/Document";

import {
	extendsClass,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";

import { C } from "../Vocabularies/C";

import { ChildCreatedEvent } from "./ChildCreatedEvent";
import { DocumentCreatedEventDetails } from "./DocumentCreatedEventDetails";
import { EventMessage } from "./EventMessage";


describe( module( "carbonldp/Messaging/ChildCreatedEvent" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.ChildCreatedEvent",
		"Interface with the base properties of the data received in any document created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:ChildCreatedEvent = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as ChildCreatedEvent;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:ChildCreatedEvent[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"CarbonLDP.Messaging.DocumentCreatedEventDetails"
		), ():void => {
			const target:ChildCreatedEvent[ "details" ] = {} as DocumentCreatedEventDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.ChildCreatedEventFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.ChildCreatedEvent` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ChildCreatedEvent",
		"CarbonLDP.Messaging.ChildCreatedEventFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( ChildCreatedEvent ).toBeDefined();
			expect( ChildCreatedEvent ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ChildCreatedEvent.SCHEMA", ():void => {
			expect( ChildCreatedEvent.SCHEMA ).toBeDefined();
			expect( ChildCreatedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( ChildCreatedEvent.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
				"details": jasmine.any( Object ),
			} );

			expect( ChildCreatedEvent.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );

			expect( ChildCreatedEvent.SCHEMA[ "details" ] ).toEqual( {
				"@id": C.details,
				"@type": "@id",
			} );
		} );

	} );

} );
