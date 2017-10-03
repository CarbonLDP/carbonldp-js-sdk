import * as Messaging from "../Messaging";
import * as NS from "../NS";
import * as Pointer from "../Pointer";
import * as Resource from "../Resource";
import { extendsClass, hasDefaultExport, hasProperty, interfaze, isDefined, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";

import * as MemberAdded from "./MemberAdded";
import DefaultExport from "./MemberAdded";

describe( module( "Carbon/Messaging/MemberAdded" ), ():void => {

	it( isDefined(), ():void => {
		expect( MemberAdded ).toBeDefined();
		expect( MemberAdded ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( MemberAdded.RDF_CLASS ).toBeDefined();
		expect( MemberAdded.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( MemberAdded.RDF_CLASS ).toBe( NS.C.Class.MemberAdded );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( MemberAdded.SCHEMA ).toBeDefined();
		expect( MemberAdded.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( MemberAdded.SCHEMA as {} ).toEqual( {
			"target": jasmine.any( Object ),
			"details": jasmine.any( Object ),
		} );

		expect( MemberAdded.SCHEMA[ "target" ] ).toEqual( {
			"@id": NS.C.Predicate.target,
			"@type": "@id",
		} );

		expect( MemberAdded.SCHEMA[ "details" ] ).toEqual( {
			"@id": NS.C.Predicate.details,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.MemberAdded.Class",
		"Interface with the base properties of the data received in a subscription event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberAdded.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.Message.Class" ), ():void => {
			const target:Messaging.Message.Class = {} as MemberAdded.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Class"
		), ():void => {
			const target:MemberAdded.Class[ "target" ] = {} as Pointer.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"Carbon.Messaging.MemberAddedDetails.Class"
		), ():void => {
			const target:MemberAdded.Class[ "details" ] = {} as Messaging.MemberAddedDetails.Class;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.MemberAdded.Class" ), ():void => {
		const target:MemberAdded.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
