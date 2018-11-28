import { C } from "../Vocabularies/C";

import { MemberAddedEvent } from "./MemberAddedEvent";


describe( "MemberAddedEvent", () => {

	it( "should exist", () => {
		expect( MemberAddedEvent ).toBeDefined();
		expect( MemberAddedEvent ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "MemberAddedEvent.TYPE", () => {

			it( "should exist", () => {
				expect( MemberAddedEvent.TYPE ).toBeDefined();
				expect( MemberAddedEvent.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:MemberAddedEvent`", () => {
				expect( MemberAddedEvent.TYPE ).toBe( C.MemberAddedEvent );
			} );

		} );

		describe( "MemberAddedEvent.SCHEMA", () => {

			it( "should exist", () => {
				expect( MemberAddedEvent.SCHEMA ).toBeDefined();
				expect( MemberAddedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( MemberAddedEvent.SCHEMA ).toEqual( {
					target: jasmine.any( Object ),
					details: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `target`", () => {
				expect( MemberAddedEvent.SCHEMA[ "target" ] ).toEqual( {
					"@id": C.target,
					"@type": "@id",
				} );
			} );

			it( "should have specified `details`", () => {
				expect( MemberAddedEvent.SCHEMA[ "details" ] ).toEqual( {
					"@id": C.details,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
