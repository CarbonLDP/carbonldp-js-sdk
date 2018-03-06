import { Pointer } from "../Pointer";
import {
	extendsClass,
	hasDefaultExport,
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
import DefaultExport from "./MemberAdded";

import { MemberAddedDetails } from "./MemberAddedDetails";

describe( module( "CarbonLDP/Messaging/MemberAdded" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAdded.MemberAdded",
		"Interface with the properties of the data received in a member added event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberAdded = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage.EventMessage" ), ():void => {
			const target:EventMessage = {} as MemberAdded;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Pointer.Pointer"
		), ():void => {
			const target:MemberAdded[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"CarbonLDP.Messaging.MemberAddedDetails.MemberAddedDetails"
		), ():void => {
			const target:MemberAdded[ "details" ] = {} as MemberAddedDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAdded.MemberAddedFactory",
		"Interface with the factory, decorator and utils for `CarbonLDP.Messaging.MemberAdded.MemberAdded` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberAdded",
		"CarbonLDP.Messaging.MemberAdded.MemberAddedFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberAdded ).toBeDefined();
			expect( MemberAdded ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberAdded.TYPE", ():void => {
			expect( MemberAdded.TYPE ).toBeDefined();
			expect( MemberAdded.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberAdded.TYPE ).toBe( C.MemberAdded );
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

	it( hasDefaultExport( "CarbonLDP.Messaging.MemberAdded.MemberAdded" ), ():void => {
		const target:MemberAdded = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
