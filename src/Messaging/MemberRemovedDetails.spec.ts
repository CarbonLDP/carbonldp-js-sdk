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
import { MemberDetails } from "./MemberDetails";

import DefaultExport, { MemberRemovedDetails } from "./MemberRemovedDetails";

describe( module( "Carbon/Messaging/MemberRemovedDetails" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.MemberRemovedDetails.MemberRemovedDetails",
		"Interface with the properties of the details in a member removed event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberRemovedDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.MemberDetails.MemberDetails" ), ():void => {
			const target:MemberDetails = {} as MemberRemovedDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"Carbon.Pointer.Pointer[]"
		), ():void => {
			const target:MemberRemovedDetails[ "members" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.MemberRemovedDetails.MemberRemovedDetailsConstant",
		"Interface with the factory, decorate and utils for `Carbon.Messaging.MemberRemovedDetails.MemberRemovedDetails` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"Carbon.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberRemovedDetails",
		"Carbon.Messaging.MemberRemovedDetails.MemberRemovedDetailsConstant"
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

	it( hasDefaultExport( "Carbon.Messaging.MemberRemovedDetails.MemberRemovedDetails" ), ():void => {
		const target:MemberRemovedDetails = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
