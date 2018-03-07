import { Pointer } from "../Pointer";
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

import { MemberAddedDetails } from "./MemberAddedDetails";

import { MemberDetails } from "./MemberDetails";

describe( module( "carbonldp/Messaging/MemberAddedDetails" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAddedDetails.MemberAddedDetails",
		"Interface with the properties of the details in a member added event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberAddedDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.MemberDetails.MemberDetails" ), ():void => {
			const target:MemberDetails = {} as MemberAddedDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"CarbonLDP.Pointer.Pointer[]"
		), ():void => {
			const target:MemberAddedDetails[ "members" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAddedDetails.MemberAddedDetailsFactory",
		"Interface with the factory, decorator and utils for `CarbonLDP.Messaging.MemberAddedDetails.MemberAddedDetails` objects."
	), ():void => {

		it( hasProperty(
			STATIC,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberAddedDetails",
		"CarbonLDP.Messaging.MemberAddedDetails.MemberAddedDetailsFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberAddedDetails ).toBeDefined();
			expect( MemberAddedDetails ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberAddedDetails", ():void => {
			expect( MemberAddedDetails.TYPE ).toBeDefined();
			expect( MemberAddedDetails.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberAddedDetails.TYPE ).toBe( C.MemberAddedDetails );
		} );

		// TODO: Separate in different tests
		it( "MemberAddedDetails.SCHEMA", ():void => {
			expect( MemberAddedDetails.SCHEMA ).toBeDefined();
			expect( MemberAddedDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberAddedDetails.SCHEMA as {} ).toEqual( {
				"members": jasmine.any( Object ),
			} );

			expect( MemberAddedDetails.SCHEMA[ "members" ] ).toEqual( {
				"@id": C.member,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

} );
