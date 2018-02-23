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
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";
import * as MemberDetails from "./MemberDetails";
import DefaultExport from "./MemberDetails";

describe( module( "Carbon/Messaging/MemberDetails" ), ():void => {

	it( isDefined(), ():void => {
		expect( MemberDetails ).toBeDefined();
		expect( MemberDetails ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
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

	describe( interfaze(
		"Carbon.Messaging.MemberDetails.Class",
		"Interface with the base properties of the details in a member related event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberDetails.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {
			const target:Resource = {} as MemberDetails.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"Carbon.Pointer.Pointer[]"
		), ():void => {
			const target:MemberDetails.Class[ "members" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.MemberDetails.Class" ), ():void => {
		const target:MemberDetails.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
