import * as Resource from "../Resource";
import * as NS from "../NS";
import * as Pointer from "../Pointer";
import { extendsClass, hasDefaultExport, hasProperty, interfaze, isDefined, module, OBLIGATORY, STATIC } from "../test/JasmineExtender";

import * as DocumentCreatedDetails from "./DocumentCreatedDetails";
import DefaultExport from "./DocumentCreatedDetails";

describe( module( "Carbon/Messaging/DocumentCreatedDetails" ), ():void => {

	it( isDefined(), ():void => {
		expect( DocumentCreatedDetails ).toBeDefined();
		expect( DocumentCreatedDetails ).toEqual( jasmine.any( Object ) );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( DocumentCreatedDetails.RDF_CLASS ).toBeDefined();
		expect( DocumentCreatedDetails.RDF_CLASS ).toEqual( jasmine.any( String ) );

		expect( DocumentCreatedDetails.RDF_CLASS ).toBe( NS.C.Class.DocumentCreatedDetails );
	} );

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( DocumentCreatedDetails.SCHEMA ).toBeDefined();
		expect( DocumentCreatedDetails.SCHEMA ).toEqual( jasmine.any( Object ) );

		expect( DocumentCreatedDetails.SCHEMA as {} ).toEqual( {
			"createdDocuments": jasmine.any( Object ),
		} );

		expect( DocumentCreatedDetails.SCHEMA[ "createdDocuments" ] ).toEqual( {
			"@id": NS.C.Predicate.createdDocument,
			"@type": "@id",
			"@container": "@set",
		} );
	} );

	describe( interfaze(
		"Carbon.Messaging.DocumentCreatedDetails.Class",
		"Interface with the properties of the details in a document creation event message."
	), ():void => {

		it( isDefined(), ():void => {
			const target:DocumentCreatedDetails.Class = {} as any;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "Carbon.Resource.Class" ), ():void => {
			const target:Resource.Class = {} as DocumentCreatedDetails.Class;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"createdDocuments",
			"Carbon.Pointer.Class[]"
		), ():void => {
			const target:DocumentCreatedDetails.Class[ "createdDocuments" ] = [] as Pointer.Class[];
			expect( target ).toBeDefined();
		} );

	} );

	it( hasDefaultExport( "Carbon.Messaging.DocumentCreatedDetails.Class" ), ():void => {
		const target:DocumentCreatedDetails.Class = {} as DefaultExport;
		expect( target ).toBeDefined();
	} );

} );
