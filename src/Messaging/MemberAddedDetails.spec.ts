import * as Messaging from "../Messaging";
import * as NS from "../Vocabularies/index";
import * as Pointer from "../Pointer";
import { extendsClass, hasDefaultExport, hasProperty, interfaze, isDefined, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";

import * as MemberAddedDetails from "./MemberAddedDetails";
import DefaultExport from "./MemberAddedDetails";

describe( module( "Carbon/Messaging/MemberAddedDetails" ), ():void => {

	it( isDefined(), ():void => {
		expect( MemberAddedDetails ).toBeDefined();
		expect( MemberAddedDetails ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( MemberAddedDetails.RDF_CLASS ).toBeDefined();
		expect( MemberAddedDetails.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( MemberAddedDetails.RDF_CLASS ).toBe( NS.C.MemberAddedDetails );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( MemberAddedDetails.SCHEMA ).toBeDefined();
		expect( MemberAddedDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( MemberAddedDetails.SCHEMA as {} ).toEqual( {
			"members": jasmine.any( Object ),
		} );

		expect( MemberAddedDetails.SCHEMA[ "members" ] ).toEqual( {
			"@id": NS.C.member,
			"@type": "@id",
			"@container": "@set",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.MemberAddedDetails.Class",
		"Interface with the properties of the details in a member added event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberAddedDetails.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.MemberDetails.Class" ), ():void => {
			const target:Messaging.MemberDetails.Class = {} as MemberAddedDetails.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"members",
			"Carbon.Pointer.Class[]"
		), ():void => {
			const target:MemberAddedDetails.Class[ "members" ] = [] as Pointer.Class[];
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.MemberAddedDetails.Class" ), ():void => {
		const target:MemberAddedDetails.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
