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

import { MemberAddedEventDetails } from "./MemberAddedEventDetails";
import { MemberEventDetails } from "./MemberEventDetails";


describe( module( "carbonldp/Messaging/MemberAddedEventDetails" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAddedEventDetails",
		"Interface with the properties of the details in a member added event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberAddedEventDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.MemberEventDetails" ), ():void => {
			const target:MemberEventDetails = {} as MemberAddedEventDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"CarbonLDP.Document[]"
		), ():void => {
			const target:MemberAddedEventDetails[ "members" ] = [] as Document[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberAddedEventDetailsFactory",
		"Interface with the factory, decorator and utils for `CarbonLDP.Messaging.MemberAddedEventDetails` objects."
	), ():void => {

		it( hasProperty(
			STATIC,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberAddedEventDetails",
		"CarbonLDP.Messaging.MemberAddedEventDetailsFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberAddedEventDetails ).toBeDefined();
			expect( MemberAddedEventDetails ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberAddedEventDetails", ():void => {
			expect( MemberAddedEventDetails.TYPE ).toBeDefined();
			expect( MemberAddedEventDetails.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberAddedEventDetails.TYPE ).toBe( C.MemberAddedEventDetails );
		} );

		// TODO: Separate in different tests
		it( "MemberAddedEventDetails.SCHEMA", ():void => {
			expect( MemberAddedEventDetails.SCHEMA ).toBeDefined();
			expect( MemberAddedEventDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( MemberAddedEventDetails.SCHEMA as {} ).toEqual( {
				"members": jasmine.any( Object ),
			} );

			expect( MemberAddedEventDetails.SCHEMA[ "members" ] ).toEqual( {
				"@id": C.member,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

} );
