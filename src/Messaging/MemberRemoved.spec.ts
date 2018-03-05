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
import { EventMessage } from "./EventMessage";

import DefaultExport, { MemberRemoved } from "./MemberRemoved";

import { MemberRemovedDetails } from "./MemberRemovedDetails";

describe( module( "Carbon/Messaging/MemberRemoved" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.MemberRemoved.MemberRemoved",
		"Interface with the properties of the data received in a member removed event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberRemoved = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Messaging.EventMessage.EventMessage" ), ():void => {
			const target:EventMessage = {} as MemberRemoved;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"Carbon.Pointer.Pointer"
		), ():void => {
			const target:MemberRemoved[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"Carbon.Messaging.MemberRemovedDetails.MemberRemovedDetails"
		), ():void => {
			const target:MemberRemoved[ "details" ] = {} as MemberRemovedDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.MemberRemoved.MemberRemovedConstant",
		"Interface with the factory, decorate and utils for `Carbon.Messaging.MemberRemoved.MemberRemoved` objects."
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
		"MemberRemoved",
		"Carbon.Messaging.MemberRemoved.MemberRemovedConstant"
	), ():void => {

		it( isDefined(), ():void => {
			expect( MemberRemoved ).toBeDefined();
			expect( MemberRemoved ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "MemberRemoved.TYPE", ():void => {
			expect( MemberRemoved.TYPE ).toBeDefined();
			expect( MemberRemoved.TYPE ).toEqual( jasmine.any( String ) );

			expect( MemberRemoved.TYPE ).toBe( C.MemberRemoved );
		} );

		// TODO: Separate in different tests
		it( "MemberRemoved.SCHEMA", ():void => {
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

	} );

	it( hasDefaultExport( "Carbon.Messaging.MemberRemoved.MemberRemoved" ), ():void => {
		const target:MemberRemoved = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
