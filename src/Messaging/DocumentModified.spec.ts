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

import { DocumentModified } from "./DocumentModified";
import DefaultExport from "./DocumentModified";

import { EventMessage } from "./EventMessage";

describe( module( "carbonldp/Messaging/DocumentModified" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentModified.DocumentModified",
		"Interface with the properties of the data received in a document modified event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentModified = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage.EventMessage" ), ():void => {
			const target:EventMessage = {} as DocumentModified;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Pointer.Pointer"
		), ():void => {
			const target:DocumentModified[ "target" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentModified.DocumentModifiedFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.DocumentModified.DocumentModified` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DocumentModified",
		"CarbonLDP.Messaging.DocumentModified.DocumentModifiedFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentModified ).toBeDefined();
			expect( DocumentModified ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentModified.TYPE", ():void => {
			expect( DocumentModified.TYPE ).toBeDefined();
			expect( DocumentModified.TYPE ).toEqual( jasmine.any( String ) );

			expect( DocumentModified.TYPE ).toBe( C.DocumentModified );
		} );

		// TODO: Separate in different tests
		it( "DocumentModified.SCHEMA", ():void => {
			expect( DocumentModified.SCHEMA ).toBeDefined();
			expect( DocumentModified.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentModified.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
			} );

			expect( DocumentModified.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.Messaging.DocumentModified.DocumentModified" ), ():void => {
		const target:DocumentModified = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
