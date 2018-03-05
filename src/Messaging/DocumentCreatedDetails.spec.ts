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
	property,
	STATIC
} from "../test/JasmineExtender";
import { C } from "../Vocabularies/C";

import { DocumentCreatedDetails } from "./DocumentCreatedDetails";
import DefaultExport from "./DocumentCreatedDetails";

describe( module( "Carbon/Messaging/DocumentCreatedDetails" ), ():void => {

	describe( interfaze(
		"Carbon.Messaging.DocumentCreatedDetails.DocumentCreatedDetails",
		"Interface with the properties of the details in a document created event."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentCreatedDetails = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {
			const target:Resource = {} as DocumentCreatedDetails;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"createdDocuments",
			"Carbon.Pointer.Pointer[]"
		), ():void => {
			const target:DocumentCreatedDetails[ "createdDocuments" ] = [] as Pointer[];
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"Carbon.Messaging.DocumentCreatedDetails.DocumentCreatedDetailsConstant",
		"Interface with the factory, decorate and utils for `Carbon.Messaging.DocumentCreatedDetails.DocumentCreatedDetails` objects."
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
		"DocumentCreatedDetails",
		"Carbon.Messaging.DocumentCreatedDetails.DocumentCreatedDetailsConstant"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DocumentCreatedDetails ).toBeDefined();
			expect( DocumentCreatedDetails ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "DocumentCreatedDetails.TYPE", ():void => {
			expect( DocumentCreatedDetails.TYPE ).toBeDefined();
			expect( DocumentCreatedDetails.TYPE ).toEqual( jasmine.any( String ) );

			expect( DocumentCreatedDetails.TYPE ).toBe( C.DocumentCreatedDetails );
		} );

		// TODO: Separate in different tests
		it( "DocumentCreatedDetails.SCHEMA", ():void => {
			expect( DocumentCreatedDetails.SCHEMA ).toBeDefined();
			expect( DocumentCreatedDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

			expect( DocumentCreatedDetails.SCHEMA as {} ).toEqual( {
				"createdDocuments": jasmine.any( Object ),
			} );

			expect( DocumentCreatedDetails.SCHEMA[ "createdDocuments" ] ).toEqual( {
				"@id": C.createdDocument,
				"@type": "@id",
				"@container": "@set",
			} );
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.DocumentCreatedDetails.DocumentCreatedDetails" ), ():void => {
		const target:DocumentCreatedDetails = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
