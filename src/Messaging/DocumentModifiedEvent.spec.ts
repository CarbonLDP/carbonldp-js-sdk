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

import { DocumentModifiedEvent } from "./DocumentModifiedEvent";
import { EventMessage } from "./EventMessage";


describe( module( "carbonldp/Messaging/DocumentModifiedEvent" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentModifiedEvent",
		"Interface with the properties of the data received in a document modified event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentModifiedEvent = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as DocumentModifiedEvent;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:DocumentModifiedEvent[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentModifiedEventFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.DocumentModifiedEvent` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DocumentModifiedEvent",
		"CarbonLDP.Messaging.DocumentModifiedEventFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentModifiedEvent ).toBeDefined();
			expect( DocumentModifiedEvent ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentModifiedEvent.TYPE", ():void => {
			expect( DocumentModifiedEvent.TYPE ).toBeDefined();
			expect( DocumentModifiedEvent.TYPE ).toEqual( jasmine.any( String ) );

			expect( DocumentModifiedEvent.TYPE ).toBe( C.DocumentModifiedEvent );
		} );

		// TODO: Separate in different tests
		it( "DocumentModifiedEvent.SCHEMA", ():void => {
			expect( DocumentModifiedEvent.SCHEMA ).toBeDefined();
			expect( DocumentModifiedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentModifiedEvent.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
			} );

			expect( DocumentModifiedEvent.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );
		} );

	} );

} );
