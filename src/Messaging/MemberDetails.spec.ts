import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
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

import { MemberDetails } from "./MemberDetails";

describe( module( "carbonldp/Messaging/MemberDetails" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberDetails",
		"Interface with the base properties of the details in a member related event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {
			const target:TransientResource = {} as MemberDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"CarbonLDP.Pointer[]"
		), ():void => {
			const target:MemberDetails[ "members" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberDetailsFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.MemberDetails` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberDetails",
		"CarbonLDP.Messaging.MemberDetailsFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberDetails ).toBeDefined();
			expect( MemberDetails ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberDetails.SCHEMA", ():void => {
			expect( MemberDetails.SCHEMA ).toBeDefined();
			expect( MemberDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberDetails.SCHEMA as {} ).toEqual( {
				"members": jasmine.any( Object ),
			} );

			expect( MemberDetails.SCHEMA[ "members" ] ).toEqual( {
				"@id": C.member,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

} );
