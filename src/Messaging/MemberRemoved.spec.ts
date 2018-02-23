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
import * as MemberRemoved from "./MemberRemoved";
import DefaultExport from "./MemberRemoved";

describe( module( "Carbon/Messaging/MemberRemoved" ), ():void => {

	it( isDefined(), ():void => {
		expect( MemberRemoved ).toBeDefined();
		expect( MemberRemoved ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( MemberRemoved.RDF_CLASS ).toBeDefined();
		expect( MemberRemoved.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( MemberRemoved.RDF_CLASS ).toBe( C.MemberRemoved );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( MemberRemoved.SCHEMA ).toBeDefined();
		expect( MemberRemoved.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( MemberRemoved.SCHEMA as {} ).toEqual( {
			"target": jasmine.any( Object ),
			"details": jasmine.any( Object ),
		} );

		expect( MemberRemoved.SCHEMA[ "target" ] ).toEqual( {
			"@id": C.target,
			"@type": "@id",
		} );

		expect( MemberRemoved.SCHEMA[ "details" ] ).toEqual( {
			"@id": C.details,
			"@type": "@id",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.MemberRemoved.Class",
		"Interface with the properties of the data received in a member removed event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberRemoved.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.Message.Class" ), ():void => {
			const target:Messaging.Message.Class = {} as MemberRemoved.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer"
		), ():void => {
			const target:MemberRemoved.Class[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"Carbon.Messaging.MemberRemovedDetails.Class"
		), ():void => {
			const target:MemberRemoved.Class[ "details" ] = {} as Messaging.MemberRemovedDetails.Class;
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.MemberRemoved.Class" ), ():void => {
		const target:MemberRemoved.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
