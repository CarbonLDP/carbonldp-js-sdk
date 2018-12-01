import { C } from "../Vocabularies/C";

import { ChildCreatedEvent } from "./ChildCreatedEvent";


describe( "ChildCreatedEvent", () => {

	it( "should exist", () => {
		expect( ChildCreatedEvent ).toBeDefined();
		expect( ChildCreatedEvent ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "ChildCreatedEvent.SCHEMA", () => {

			it( "should exist", () => {
				expect( ChildCreatedEvent.SCHEMA ).toBeDefined();
				expect( ChildCreatedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( ChildCreatedEvent.SCHEMA ).toEqual( {
					"target": jasmine.any( Object ),
					"details": jasmine.any( Object ),
				} );
			} );

			it( "should have specified `target`", () => {
				expect( ChildCreatedEvent.SCHEMA[ "target" ] ).toEqual( {
					"@id": C.target,
					"@type": "@id",
				} );
			} );

			it( "should have specified `details`", () => {
				expect( ChildCreatedEvent.SCHEMA[ "details" ] ).toEqual( {
					"@id": C.details,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
