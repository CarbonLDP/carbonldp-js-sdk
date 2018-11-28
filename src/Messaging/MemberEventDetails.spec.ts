import { C } from "../Vocabularies/C";

import { MemberEventDetails } from "./MemberEventDetails";


describe( "MemberEventDetails", () => {

	it( "should exist", () => {
		expect( MemberEventDetails ).toBeDefined();
		expect( MemberEventDetails ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "MemberEventDetails.SCHEMA", () => {

			it( "should exist", () => {
				expect( MemberEventDetails.SCHEMA ).toBeDefined();
				expect( MemberEventDetails.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( MemberEventDetails.SCHEMA ).toEqual( {
					members: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `members`", () => {
				expect( MemberEventDetails.SCHEMA[ "members" ] ).toEqual( {
					"@id": C.member,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

	} );

} );
