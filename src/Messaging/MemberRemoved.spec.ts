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

import { EventMessage } from "./EventMessage";
import { MemberRemoved } from "./MemberRemoved";
import { MemberRemovedDetails } from "./MemberRemovedDetails";


describe( module( "carbonldp/Messaging/MemberRemoved" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.MemberRemoved",
		"Interface with the properties of the data received in a member removed event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:MemberRemoved = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as MemberRemoved;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:MemberRemoved[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"details",
			"CarbonLDP.Messaging.MemberRemovedDetails"
		), ():void => {
			const target:MemberRemoved[ "details" ] = {} as MemberRemovedDetails;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.MemberRemovedFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.MemberRemoved` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"MemberRemoved",
		"CarbonLDP.Messaging.MemberRemovedFactory"
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

} );
