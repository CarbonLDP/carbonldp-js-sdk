import { Document } from "../Document/Document";

import { Resource } from "../Resource/Resource";

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

import { DocumentCreatedEventDetails } from "./DocumentCreatedEventDetails";


describe( module( "carbonldp/Messaging/DocumentCreatedEventDetails" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentCreatedEventDetails",
		"Interface with the properties of the details in a document created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentCreatedEventDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {
			const target:Resource = {} as DocumentCreatedEventDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"createdDocuments",
			"CarbonLDP.Document[]"
		), ():void => {
			const target:DocumentCreatedEventDetails[ "createdDocuments" ] = [] as Document[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.Messaging.DocumentCreatedEventDetailsFactory",
		"Interface with the factory, decorate and utils for `CarbonLDP.Messaging.DocumentCreatedEventDetails` objects."
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
		"DocumentCreatedEventDetails",
		"CarbonLDP.Messaging.DocumentCreatedEventDetailsFactory"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentCreatedEventDetails ).toBeDefined();
			expect( DocumentCreatedEventDetails ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentCreatedEventDetails.TYPE", ():void => {
			expect( DocumentCreatedEventDetails.TYPE ).toBeDefined();
			expect( DocumentCreatedEventDetails.TYPE ).toEqual( jasmine.any( String ) );

			expect( DocumentCreatedEventDetails.TYPE ).toBe( C.DocumentCreatedEventDetails );
		} );

		// TODO: Separate in different tests
		it( "DocumentCreatedEventDetails.SCHEMA", ():void => {
			expect( DocumentCreatedEventDetails.SCHEMA ).toBeDefined();
			expect( DocumentCreatedEventDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentCreatedEventDetails.SCHEMA as {} ).toEqual( {
				"createdDocuments": jasmine.any( Object ),
			} );

			expect( DocumentCreatedEventDetails.SCHEMA[ "createdDocuments" ] ).toEqual( {
				"@id": C.createdDocument,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

} );
