import { C } from "../Vocabularies/C";

import { MemberRemovedEvent } from "./MemberRemovedEvent";


describe( "MemberRemovedEvent", () => {

	it( "should exists", () => {
		expect( MemberRemovedEvent ).toBeDefined();
		expect( MemberRemovedEvent ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "MemberRemovedEvent.TYPE", () => {

			it( "should exists", () => {
				expect( MemberRemovedEvent.TYPE ).toBeDefined();
				expect( MemberRemovedEvent.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:MemberRemovedEvent`", () => {
				expect( MemberRemovedEvent.TYPE ).toBe( C.MemberRemovedEvent );
			} );

		} );

		describe( "MemberRemovedEvent.SCHEMA", () => {

			it( "should exists", () => {
				expect( MemberRemovedEvent.SCHEMA ).toBeDefined();
				expect( MemberRemovedEvent.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( MemberRemovedEvent.SCHEMA ).toEqual( {
					target: jasmine.any( Object ),
					details: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `target`", () => {
				expect( MemberRemovedEvent.SCHEMA[ "target" ] ).toEqual( {
					"@id": C.target,
					"@type": "@id",
				} );
			} );

			it( "should have specified `details`", () => {
				expect( MemberRemovedEvent.SCHEMA[ "details" ] ).toEqual( {
					"@id": C.details,
					"@type": "@id",
				} );
			} );

		} );

	} );

} );
