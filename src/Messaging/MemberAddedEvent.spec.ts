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

import { EventMessage } from "./EventMessage";
import { MemberAddedEvent } from "./MemberAddedEvent";
import { MemberAddedEventDetails } from "./MemberAddedEventDetails";


describe( module( "carbonldp/Messaging/MemberAddedEvent" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAddedEvent",
		"Interface with the properties of the data received in a member added event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberAddedEvent = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as MemberAddedEvent;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:MemberAddedEvent[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"CarbonLDP.Messaging.MemberAddedEventDetails"
		), ():void => {
			const target:MemberAddedEvent[ "details" ] = {} as MemberAddedEventDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAddedEventFactory",
		"Interface with the factory, decorator and utils for `CarbonLDP.Messaging.MemberAddedEvent` objects."
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
		"MemberAddedEvent",
		"CarbonLDP.Messaging.MemberAddedEventFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberAddedEvent ).toBeDefined();
			expect( MemberAddedEvent ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberAddedEvent.TYPE", ():void => {
			expect( MemberAddedEvent.TYPE ).toBeDefined();
			expect( MemberAddedEvent.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberAddedEvent.TYPE ).toBe( C.MemberAddedEvent );
		} );

		// TODO: Separate in different tests
		it( "MemberAddedEvent.SCHEMA", ():void => {
			expect( MemberAddedEvent.SCHEMA ).toBeDefined();
			expect( MemberAddedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberAddedEvent.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
				"details": jasmine.any( Object ),
			} );

			expect( MemberAddedEvent.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );

			expect( MemberAddedEvent.SCHEMA[ "details" ] ).toEqual( {
				"@id": C.details,
				"@type": "@id",
			} );
		} );

	} );

} );
