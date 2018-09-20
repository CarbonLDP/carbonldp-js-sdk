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

import { DocumentCreatedEvent } from "./DocumentCreatedEvent";
import { DocumentCreatedEventDetails } from "./DocumentCreatedEventDetails";
import { EventMessage } from "./EventMessage";


describe( module( "carbonldp/Messaging/DocumentCreatedEvent" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentCreatedEvent",
		"Interface with the base properties of the data received in any document created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentCreatedEvent = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as DocumentCreatedEvent;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:DocumentCreatedEvent[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"CarbonLDP.Messaging.DocumentCreatedEventDetails"
		), ():void => {
			const target:DocumentCreatedEvent[ "details" ] = {} as DocumentCreatedEventDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentCreatedEventFactory",
		"Interface with the factory, decorate and utils elements for `CarbonLDP.Messaging.DocumentCreatedEvent` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DocumentCreatedEvent",
		"CarbonLDP.Messaging.DocumentCreatedEventFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentCreatedEvent ).toBeDefined();
			expect( DocumentCreatedEvent ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentCreatedEvent.SCHEMA", ():void => {
			expect( DocumentCreatedEvent.SCHEMA ).toBeDefined();
			expect( DocumentCreatedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentCreatedEvent.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
				"details": jasmine.any( Object ),
			} );

			expect( DocumentCreatedEvent.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );

			expect( DocumentCreatedEvent.SCHEMA[ "details" ] ).toEqual( {
				"@id": C.details,
				"@type": "@id",
			} );
		} );

	} );

} );
