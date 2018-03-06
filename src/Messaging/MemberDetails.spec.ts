import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
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

import { MemberDetails } from "./MemberDetails";
import DefaultExport from "./MemberDetails";

describe( module( "Carbon/Messaging/MemberDetails" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.MemberDetails.MemberDetails",
		"Interface with the base properties of the details in a member related event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {
			const target:Resource = {} as MemberDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"Carbon.Pointer.Pointer[]"
		), ():void => {
			const target:MemberDetails[ "members" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.MemberDetails.MemberDetailsFactory",
		"Interface with the factory, decorate and utils for `Carbon.Messaging.MemberDetails.MemberDetails` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberDetails",
		"Carbon.Messaging.MemberDetails.MemberDetailsFactory"
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

	it( hasDefaultExport( "Carbon.Messaging.MemberDetails.MemberDetails" ), ():void => {
		const target:MemberDetails = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
