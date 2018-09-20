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

import { DocumentDeletedEvent } from "./DocumentDeletedEvent";
import { EventMessage } from "./EventMessage";


describe( module( "carbonldp/Messaging/DocumentDeletedEvent" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentDeletedEvent",
		"Interface with the properties of the data received in a document deleted event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentDeletedEvent = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as DocumentDeletedEvent;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:DocumentDeletedEvent[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentDeletedEventFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.DocumentDeletedEvent` objects."
	), ():void => {

		it( hasProperty(
			STATIC,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DocumentDeletedEvent",
		"CarbonLDP.Messaging.DocumentDeletedEventFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentDeletedEvent ).toBeDefined();
			expect( DocumentDeletedEvent ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentDeletedEvent.TYPE", ():void => {
			expect( DocumentDeletedEvent.TYPE ).toBeDefined();
			expect( DocumentDeletedEvent.TYPE ).toEqual( jasmine.any( String ) );

			expect( DocumentDeletedEvent.TYPE ).toBe( C.DocumentDeletedEvent );
		} );

		// TODO: Separate in different tests
		it( "DocumentDeletedEvent.SCHEMA", ():void => {
			expect( DocumentDeletedEvent.SCHEMA ).toBeDefined();
			expect( DocumentDeletedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentDeletedEvent.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
			} );

			expect( DocumentDeletedEvent.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );
		} );

	} );

} );
