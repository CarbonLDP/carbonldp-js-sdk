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

import { MemberDetails } from "./MemberDetails";
import { MemberRemovedDetails } from "./MemberRemovedDetails";


describe( module( "carbonldp/Messaging/MemberRemovedDetails" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberRemovedDetails",
		"Interface with the properties of the details in a member removed event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberRemovedDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.MemberDetails" ), ():void => {
			const target:MemberDetails = {} as MemberRemovedDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"CarbonLDP.Document[]"
		), ():void => {
			const target:MemberRemovedDetails[ "members" ] = [] as Document[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberRemovedDetailsFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.MemberRemovedDetails` objects."
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
		"MemberRemovedDetails",
		"CarbonLDP.Messaging.MemberRemovedDetailsFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberRemovedDetails ).toBeDefined();
			expect( MemberRemovedDetails ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberRemovedDetails.TYPE", ():void => {
			expect( MemberRemovedDetails.TYPE ).toBeDefined();
			expect( MemberRemovedDetails.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberRemovedDetails.TYPE ).toBe( C.MemberRemovedDetails );
		} );

		// TODO: Separate in different tests
		it( "MemberRemovedDetails.SCHEMA", ():void => {
			expect( MemberRemovedDetails.SCHEMA ).toBeDefined();
			expect( MemberRemovedDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberRemovedDetails.SCHEMA as {} ).toEqual( {
				"members": jasmine.any( Object ),
			} );

			expect( MemberRemovedDetails.SCHEMA[ "members" ] ).toEqual( {
				"@id": C.member,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

} );
