import { C } from "../Vocabularies/C";

import { MapEntry } from "./MapEntry";


describe( "MapEntry", () => {

	it( "should exist", () => {
		expect( MapEntry ).toBeDefined();
		expect( MapEntry ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface]]", () => {
	} );

	describe( "[[factory]]", () => {

		describe( "MapEntry.SCHEMA", () => {

			it( "should exists", () => {
				expect( MapEntry.SCHEMA ).toBeDefined();
				expect( MapEntry.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( MapEntry.SCHEMA ).toEqual( {
					entryKey: jasmine.any( Object ),
					entryValue: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `entryKey`", () => {
				expect( MapEntry.SCHEMA[ "entryKey" ] ).toEqual( {
					"@id": C.entryKey,
				} );
			} );

			it( "should have specified `entryValue`", () => {
				expect( MapEntry.SCHEMA[ "entryValue" ] ).toEqual( {
					"@id": C.entryValue,
				} );
			} );

		} );

	} );

} );
