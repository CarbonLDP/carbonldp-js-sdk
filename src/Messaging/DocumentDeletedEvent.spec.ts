import { C } from "../Vocabularies/C";

import { DocumentDeletedEvent } from "./DocumentDeletedEvent";


describe( "DocumentDeletedEvent", () => {

	it( "should exists", () => {
		expect( DocumentDeletedEvent ).toBeDefined();
		expect( DocumentDeletedEvent ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "DocumentDeletedEvent.TYPE", () => {

			it( "should exists", () => {
				expect( DocumentDeletedEvent.TYPE ).toBeDefined();
				expect( DocumentDeletedEvent.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:DocumentDeletedEvent`", () => {
				expect( DocumentDeletedEvent.TYPE ).toBe( C.DocumentDeletedEvent );
			} );

		} );

		describe( "DocumentDeletedEvent.SCHEMA", () => {

			it( "should exists", () => {
				expect( DocumentDeletedEvent.SCHEMA ).toBeDefined();
				expect( DocumentDeletedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( DocumentDeletedEvent.SCHEMA ).toEqual( {
					target: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `target`", () => {
				expect( DocumentDeletedEvent.SCHEMA[ "target" ] ).toEqual( {
					"@id": C.target,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
