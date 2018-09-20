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
import { MemberRemovedEvent } from "./MemberRemovedEvent";
import { MemberRemovedEventDetails } from "./MemberRemovedEventDetails";


describe( module( "carbonldp/Messaging/MemberRemovedEvent" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberRemovedEvent",
		"Interface with the properties of the data received in a member removed event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberRemovedEvent = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as MemberRemovedEvent;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:MemberRemovedEvent[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"CarbonLDP.Messaging.MemberRemovedEventDetails"
		), ():void => {
			const target:MemberRemovedEvent[ "details" ] = {} as MemberRemovedEventDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberRemovedEventFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.MemberRemovedEvent` objects."
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
		"MemberRemovedEvent",
		"CarbonLDP.Messaging.MemberRemovedEventFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberRemovedEvent ).toBeDefined();
			expect( MemberRemovedEvent ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberRemovedEvent.TYPE", ():void => {
			expect( MemberRemovedEvent.TYPE ).toBeDefined();
			expect( MemberRemovedEvent.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberRemovedEvent.TYPE ).toBe( C.MemberRemovedEvent );
		} );

		// TODO: Separate in different tests
		it( "MemberRemovedEvent.SCHEMA", ():void => {
			expect( MemberRemovedEvent.SCHEMA ).toBeDefined();
			expect( MemberRemovedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberRemovedEvent.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
				"details": jasmine.any( Object ),
			} );

			expect( MemberRemovedEvent.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );

			expect( MemberRemovedEvent.SCHEMA[ "details" ] ).toEqual( {
				"@id": C.details,
				"@type": "@id",
			} );
		} );

	} );

} );
