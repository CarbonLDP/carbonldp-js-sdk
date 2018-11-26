import { C } from "../Vocabularies/C";

import { MemberAddedEventDetails } from "./MemberAddedEventDetails";


describe( "MemberAddedEventDetails", () => {

	it( "should exists", () => {
		expect( MemberAddedEventDetails ).toBeDefined();
		expect( MemberAddedEventDetails ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "MemberAddedEventDetails.TYPE", () => {

			it( "should exists", () => {
				expect( MemberAddedEventDetails.TYPE ).toBeDefined();
				expect( MemberAddedEventDetails.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:MemberAddedEventDetails`", () => {
				expect( MemberAddedEventDetails.TYPE ).toBe( C.MemberAddedEventDetails );
			} );

		} );

		describe( "MemberAddedEventDetails.SCHEMA", () => {

			it( "should exists", () => {
				expect( MemberAddedEventDetails.SCHEMA ).toBeDefined();
				expect( MemberAddedEventDetails.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( MemberAddedEventDetails.SCHEMA ).toEqual( {
					members: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `members`", () => {
				expect( MemberAddedEventDetails.SCHEMA[ "members" ] ).toEqual( {
					"@id": C.member,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

	} );

} );
