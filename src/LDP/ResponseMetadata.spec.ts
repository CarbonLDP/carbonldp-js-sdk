import { C } from "../Vocabularies/C";

import { ResponseMetadata } from "./ResponseMetadata";
import { VolatileResource } from "./VolatileResource";


describe( "ResponseMetadata", () => {

	it( "should exists", () => {
		expect( ResponseMetadata ).toBeDefined();
		expect( ResponseMetadata ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface]]", () => {
	} );

	describe( "[[factory]]", () => {

		describe( "ResponseMetadata.TYPE", () => {

			it( "should exists", () => {
				expect( ResponseMetadata.TYPE ).toBeDefined();
				expect( ResponseMetadata.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:ResponseMetadata`", () => {
				expect( ResponseMetadata.TYPE ).toBe( C.ResponseMetadata );
			} );

		} );

		describe( "ResponseMetadata.SCHEMA", () => {

			it( "should exists", () => {
				expect( ResponseMetadata.SCHEMA ).toBeDefined();
				expect( ResponseMetadata.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( ResponseMetadata.SCHEMA ).toEqual( {
					documentsMetadata: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `documentsMetadata`", () => {
				expect( ResponseMetadata.SCHEMA[ "documentsMetadata" ] ).toEqual( {
					"@id": C.documentMetadata,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );


		describe( "ResponseMetadata.is", () => {

			it( "should exists", () => {
				expect( ResponseMetadata.is ).toBeDefined();
				expect( ResponseMetadata.is ).toEqual( jasmine.any( Function ) );
			} );


			let isVolatileResource:jasmine.Spy;
			let mockObject:jasmine.SpyObj<VolatileResource>;
			beforeEach( () => {
				isVolatileResource = spyOn( VolatileResource, "is" )
					.and.returnValue( true );

				mockObject = jasmine.createSpyObj( {
					$hasType: true,
				} );
			} );


			it( "should be a VolatileResource", () => {
				ResponseMetadata.is( mockObject );
				expect( isVolatileResource ).toHaveBeenCalledWith( mockObject );
			} );

			it( "should have type c:ResponseMetadata", () => {
				ResponseMetadata.is( mockObject );
				expect( mockObject.$hasType ).toHaveBeenCalledWith( C.ResponseMetadata );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = ResponseMetadata.is( mockObject );
				expect( returned ).toBe( true );
			} );

		} );

	} );

} );
