import { C } from "../Vocabularies/C";

import { MemberRemovedEventDetails } from "./MemberRemovedEventDetails";


describe( "MemberRemovedEventDetails", () => {

	it( "should exist", () => {
		expect( MemberRemovedEventDetails ).toBeDefined();
		expect( MemberRemovedEventDetails ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "MemberRemovedEventDetails.TYPE", () => {

			it( "should exist", () => {
				expect( MemberRemovedEventDetails.TYPE ).toBeDefined();
				expect( MemberRemovedEventDetails.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:MemberRemovedEventDetails`", () => {
				expect( MemberRemovedEventDetails.TYPE ).toBe( C.MemberRemovedEventDetails );
			} );

		} );

		describe( "MemberRemovedEventDetails.SCHEMA", () => {

			it( "should exist", () => {
				expect( MemberRemovedEventDetails.SCHEMA ).toBeDefined();
				expect( MemberRemovedEventDetails.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( MemberRemovedEventDetails.SCHEMA ).toEqual( {
					members: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `members`", () => {
				expect( MemberRemovedEventDetails.SCHEMA[ "members" ] ).toEqual( {
					"@id": C.member,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

	} );

} );
