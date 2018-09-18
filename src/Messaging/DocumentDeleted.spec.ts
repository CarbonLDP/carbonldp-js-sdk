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

import { DocumentDeleted } from "./DocumentDeleted";
import { EventMessage } from "./EventMessage";


describe( module( "carbonldp/Messaging/DocumentDeleted" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentDeleted",
		"Interface with the properties of the data received in a document deleted event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentDeleted = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Messaging.EventMessage" ), ():void => {
			const target:EventMessage = {} as DocumentDeleted;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"target",
			"CarbonLDP.Document"
		), ():void => {
			const target:DocumentDeleted[ "target" ] = {} as Document;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentDeletedFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.DocumentDeleted` objects."
	), ():void => {

		it( hasProperty(
			STATIC,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasProperty(
			STATIC,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"DocumentDeleted",
		"CarbonLDP.Messaging.DocumentDeletedFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentDeleted ).toBeDefined();
			expect( DocumentDeleted ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentDeleted.TYPE", ():void => {
			expect( DocumentDeleted.TYPE ).toBeDefined();
			expect( DocumentDeleted.TYPE ).toEqual( jasmine.any( String ) );

			expect( DocumentDeleted.TYPE ).toBe( C.DocumentDeletedEvent );
		} );

		// TODO: Separate in different tests
		it( "DocumentDeleted.SCHEMA", ():void => {
			expect( DocumentDeleted.SCHEMA ).toBeDefined();
			expect( DocumentDeleted.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentDeleted.SCHEMA as {} ).toEqual( {
				"target": jasmine.any( Object ),
			} );

			expect( DocumentDeleted.SCHEMA[ "target" ] ).toEqual( {
				"@id": C.target,
				"@type": "@id",
			} );
		} );

	} );

} );
