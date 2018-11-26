import { C } from "../Vocabularies/C";

import { ValidationError } from "./ValidationError";


describe( "ValidationError", () => {

	it( "should exists", () => {
		expect( ValidationError ).toBeDefined();
		expect( ValidationError ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "ValidationError.TYPE", () => {

			it( "should exists", () => {
				expect( ValidationError.TYPE ).toBeDefined();
				expect( ValidationError.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:ValidationError`", () => {
				expect( ValidationError.TYPE ).toBe( C.ValidationError );
			} );

		} );

		describe( "ValidationError.SCHEMA", () => {

			it( "should exists", () => {
				expect( ValidationError.SCHEMA ).toBeDefined();
				expect( ValidationError.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( ValidationError.SCHEMA ).toEqual( {
					errorDetails: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `errorDetails`", () => {
				expect( ValidationError.SCHEMA[ "errorDetails" ] ).toEqual( {
					"@id": C.errorDetails,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
