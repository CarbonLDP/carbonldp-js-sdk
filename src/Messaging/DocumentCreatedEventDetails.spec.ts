import { C } from "../Vocabularies/C";

import { DocumentCreatedEventDetails } from "./DocumentCreatedEventDetails";


describe( "DocumentCreatedEventDetails", () => {

	it( "should exists", () => {
		expect( DocumentCreatedEventDetails ).toBeDefined();
		expect( DocumentCreatedEventDetails ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "DocumentCreatedEventDetails.TYPE", () => {

			it( "should exists", () => {
				expect( DocumentCreatedEventDetails.TYPE ).toBeDefined();
				expect( DocumentCreatedEventDetails.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:DocumentCreatedEventDetails`", () => {
				expect( DocumentCreatedEventDetails.TYPE ).toBe( C.DocumentCreatedEventDetails );
			} );

		} );

		describe( "DocumentCreatedEventDetails.SCHEMA", () => {

			it( "should exists", () => {
				expect( DocumentCreatedEventDetails.SCHEMA ).toBeDefined();
				expect( DocumentCreatedEventDetails.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( DocumentCreatedEventDetails.SCHEMA ).toEqual( {
					createdDocuments: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `createdDocuments`", () => {
				expect( DocumentCreatedEventDetails.SCHEMA[ "createdDocuments" ] ).toEqual( {
					"@id": C.createdDocument,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

	} );

} );
