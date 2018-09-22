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

import { MemberEventDetails } from "./MemberEventDetails";
import { MemberRemovedEventDetails } from "./MemberRemovedEventDetails";


describe( module( "carbonldp/Messaging/MemberRemovedEventDetails" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberRemovedEventDetails",
		"Interface with the properties of the details in a member removed event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberRemovedEventDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.MemberEventDetails" ), ():void => {
			const target:MemberEventDetails = {} as MemberRemovedEventDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"CarbonLDP.Document[]"
		), ():void => {
			const target:MemberRemovedEventDetails[ "members" ] = [] as Document[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberRemovedEventDetailsFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.MemberRemovedEventDetails` objects."
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
		"MemberRemovedEventDetails",
		"CarbonLDP.Messaging.MemberRemovedEventDetailsFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberRemovedEventDetails ).toBeDefined();
			expect( MemberRemovedEventDetails ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberRemovedEventDetails.TYPE", ():void => {
			expect( MemberRemovedEventDetails.TYPE ).toBeDefined();
			expect( MemberRemovedEventDetails.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberRemovedEventDetails.TYPE ).toBe( C.MemberRemovedEventDetails );
		} );

		// TODO: Separate in different tests
		it( "MemberRemovedEventDetails.SCHEMA", ():void => {
			expect( MemberRemovedEventDetails.SCHEMA ).toBeDefined();
			expect( MemberRemovedEventDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberRemovedEventDetails.SCHEMA as {} ).toEqual( {
				"members": jasmine.any( Object ),
			} );

			expect( MemberRemovedEventDetails.SCHEMA[ "members" ] ).toEqual( {
				"@id": C.member,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

} );
