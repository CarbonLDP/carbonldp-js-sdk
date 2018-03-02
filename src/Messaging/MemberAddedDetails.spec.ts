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

import DefaultExport, { MemberAddedDetails } from "./MemberAddedDetails";

import { MemberDetails } from "./MemberDetails";

describe( module( "Carbon/Messaging/MemberAddedDetails" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.MemberAddedDetails.MemberAddedDetails",
		"Interface with the properties of the details in a member added event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberAddedDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.MemberDetails.MemberDetails" ), ():void => {
			const target:MemberDetails = {} as MemberAddedDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"Carbon.Pointer.Pointer[]"
		), ():void => {
			const target:MemberAddedDetails[ "members" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.MemberAddedDetails.MemberAddedDetailsFactory",
		"Interface with the factory, decorator and utils for `Carbon.Messaging.MemberAddedDetails.MemberAddedDetails` objects."
	), ():void => {

		it( hasProperty(
			STATIC,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberAddedDetails",
		"Carbon.Messaging.MemberAddedDetails.MemberAddedDetailsFactory"
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

	it( hasDefaultExport( "Carbon.Messaging.MemberAddedDetails.MemberAddedDetails" ), ():void => {
		const target:MemberAddedDetails = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
