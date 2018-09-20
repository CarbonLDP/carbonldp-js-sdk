import { Document } from "../Document/Document";

import { Resource } from "../Resource/Resource";

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

import { MemberEventDetails } from "./MemberEventDetails";

describe( module( "carbonldp/Messaging/MemberEventDetails" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberEventDetails",
		"Interface with the base properties of the details in a member related event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberEventDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {
			const target:Resource = {} as MemberEventDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"CarbonLDP.Document[]"
		), ():void => {
			const target:MemberEventDetails[ "members" ] = [] as Document[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberEventDetailsFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.MemberEventDetails` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberEventDetails",
		"CarbonLDP.Messaging.MemberEventDetailsFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberEventDetails ).toBeDefined();
			expect( MemberEventDetails ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberEventDetails.SCHEMA", ():void => {
			expect( MemberEventDetails.SCHEMA ).toBeDefined();
			expect( MemberEventDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberEventDetails.SCHEMA as {} ).toEqual( {
				"members": jasmine.any( Object ),
			} );

			expect( MemberEventDetails.SCHEMA[ "members" ] ).toEqual( {
				"@id": C.member,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

} );
