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
import { MemberAdded } from "./MemberAdded";
import { MemberAddedDetails } from "./MemberAddedDetails";


describe( module( "carbonldp/Messaging/MemberAdded" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAdded",
		"Interface with the properties of the data received in a member added event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberAdded = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as MemberAdded;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:MemberAdded[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"CarbonLDP.Messaging.MemberAddedDetails"
		), ():void => {
			const target:MemberAdded[ "details" ] = {} as MemberAddedDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAddedFactory",
		"Interface with the factory, decorator and utils for `CarbonLDP.Messaging.MemberAdded` objects."
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
		"MemberAdded",
		"CarbonLDP.Messaging.MemberAddedFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberAdded ).toBeDefined();
			expect( MemberAdded ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberAdded.TYPE", ():void => {
			expect( MemberAdded.TYPE ).toBeDefined();
			expect( MemberAdded.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberAdded.TYPE ).toBe( C.MemberAddedEvent );
		} );

		// TODO: Separate in different tests
		it( "MemberAdded.SCHEMA", ():void => {
			expect( MemberAdded.SCHEMA ).toBeDefined();
			expect( MemberAdded.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberAdded.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
				"details": jasmine.any( Object ),
			} );

			expect( MemberAdded.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );

			expect( MemberAdded.SCHEMA[ "details" ] ).toEqual( {
				"@id": C.details,
				"@type": "@id",
			} );
		} );

	} );

} );
