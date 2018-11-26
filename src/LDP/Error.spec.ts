import { C } from "../Vocabularies/C";
import { XSD } from "../Vocabularies/XSD";

import { Error } from "./Error";


describe( "Error", () => {

	it( "should exists", () => {
		expect( Error ).toBeDefined();
		expect( Error ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {
	} );

	describe( "[[factory]]", () => {

		describe( "Error.TYPE", () => {

			it( "should exists", () => {
				expect( Error.TYPE ).toBeDefined();
				expect( Error.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:Error`", () => {
				expect( Error.TYPE ).toBe( C.Error );
			} );

		} );

		describe( "Error.SCHEMA", () => {

			it( "should exists", () => {
				expect( Error.SCHEMA ).toBeDefined();
				expect( Error.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( Error.SCHEMA ).toEqual( {
					errorCode: jasmine.any( Object ),
					errorMessage: jasmine.any( Object ),
					errorParameters: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `errorCode`", () => {
				expect( Error.SCHEMA[ "errorCode" ] ).toEqual( {
					"@id": C.errorCode,
					"@type": XSD.string,
				} );
			} );

			it( "should have specified `errorMessage`", () => {
				expect( Error.SCHEMA[ "errorMessage" ] ).toEqual( {
					"@id": C.errorMessage,
					"@language": "en",
				} );
			} );

			it( "should have specified `errorParameters`", () => {
				expect( Error.SCHEMA[ "errorParameters" ] ).toEqual( {
					"@id": C.errorParameters,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
