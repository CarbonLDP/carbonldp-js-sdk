import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";

import { EventMessage } from "./EventMessage";


describe( "EventMessage", () => {

	it( "should exists", () => {
		expect( EventMessage ).toBeDefined();
		expect( EventMessage ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "EventMessage.SCHEMA", () => {

			it( "should exists", () => {
				expect( EventMessage.SCHEMA ).toBeDefined();
				expect( EventMessage.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( EventMessage.SCHEMA ).toEqual( {
					target: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `target`", () => {
				expect( EventMessage.SCHEMA[ "target" ] ).toEqual( {
					"@id": C.target,
					"@type": "@id",
				} );
			} );

		} );


		describe( "EventMessage.is", () => {

			it( "should exists", () => {
				expect( EventMessage.is ).toBeDefined();
				expect( EventMessage.is ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false if falsy is provided", () => {
				expect( EventMessage.is( void 0 ) ).toBe( false );
				expect( EventMessage.is( null ) ).toBe( false );
			} );

			it( "should return false if has a missing model properties", () => {
				const object:EventMessage = Resource.create( {
					target: null,
				} );

				expect( EventMessage.is( object ) ).toBe( true );

				delete object.target;
				expect( EventMessage.is( object ) ).toBe( false );
				object.target = null;
			} );

		} );

	} );

} );
