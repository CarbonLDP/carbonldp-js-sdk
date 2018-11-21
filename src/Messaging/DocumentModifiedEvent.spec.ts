import { C } from "../Vocabularies/C";

import { DocumentModifiedEvent } from "./DocumentModifiedEvent";


describe( "DocumentModifiedEvent", () => {

	it( "should exists", () => {
		expect( DocumentModifiedEvent ).toBeDefined();
		expect( DocumentModifiedEvent ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "DocumentModifiedEvent.TYPE", () => {

			it( "should exists", () => {
				expect( DocumentModifiedEvent.TYPE ).toBeDefined();
				expect( DocumentModifiedEvent.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:DocumentModifiedEvent`", () => {
				expect( DocumentModifiedEvent.TYPE ).toBe( C.DocumentModifiedEvent );
			} );

		} );

		describe( "DocumentModifiedEvent.SCHEMA", () => {

			it( "should exists", () => {
				expect( DocumentModifiedEvent.SCHEMA ).toBeDefined();
				expect( DocumentModifiedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( DocumentModifiedEvent.SCHEMA ).toEqual( {
					target: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `target`", () => {
				expect( DocumentModifiedEvent.SCHEMA[ "target" ] ).toEqual( {
					"@id": C.target,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
