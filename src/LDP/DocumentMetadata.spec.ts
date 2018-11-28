import { C } from "../Vocabularies/C";

import { DocumentMetadata } from "./DocumentMetadata";


describe( "DocumentMetadata", () => {

	it( "should exist", () => {
		expect( DocumentMetadata ).toBeDefined();
		expect( DocumentMetadata ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {
	} );

	describe( "[[factory]]", () => {

		describe( "DocumentMetadata.TYPE", () => {

			it( "should exist", () => {
				expect( DocumentMetadata.TYPE ).toBeDefined();
				expect( DocumentMetadata.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:DocumentMetadata`", () => {
				expect( DocumentMetadata.TYPE ).toBe( C.DocumentMetadata );
			} );

		} );

		describe( "DocumentMetadata.SCHEMA", () => {

			it( "should exist", () => {
				expect( DocumentMetadata.SCHEMA ).toBeDefined();
				expect( DocumentMetadata.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( DocumentMetadata.SCHEMA ).toEqual( {
					relatedDocument: jasmine.any( Object ),
					bNodesMap: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `relatedDocument`", () => {
				expect( DocumentMetadata.SCHEMA[ "relatedDocument" ] ).toEqual( {
					"@id": C.relatedDocument,
					"@type": "@id",
				} );
			} );

			it( "should have specified `bNodesMap`", () => {
				expect( DocumentMetadata.SCHEMA[ "bNodesMap" ] ).toEqual( {
					"@id": C.bNodesMap,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
