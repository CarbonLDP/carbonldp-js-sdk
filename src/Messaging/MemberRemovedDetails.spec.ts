import * as Messaging from "../Messaging";
import { Pointer } from "../Pointer";
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
import * as MemberRemovedDetails from "./MemberRemovedDetails";
import DefaultExport from "./MemberRemovedDetails";

describe( module( "Carbon/Messaging/MemberRemovedDetails" ), ():void => {

	it( isDefined(), ():void => {
		expect( MemberRemovedDetails ).toBeDefined();
		expect( MemberRemovedDetails ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( MemberRemovedDetails.RDF_CLASS ).toBeDefined();
		expect( MemberRemovedDetails.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( MemberRemovedDetails.RDF_CLASS ).toBe( C.MemberRemovedDetails );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
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

	describe( interfaze(
		"Carbon.Messaging.MemberRemovedDetails.Class",
		"Interface with the properties of the details in a member removed event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberRemovedDetails.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.MemberDetails.Class" ), ():void => {
			const target:Messaging.MemberDetails.Class = {} as MemberRemovedDetails.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"Carbon.Pointer.Pointer[]"
		), ():void => {
			const target:MemberRemovedDetails.Class[ "members" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.MemberRemovedDetails.Class" ), ():void => {
		const target:MemberRemovedDetails.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
