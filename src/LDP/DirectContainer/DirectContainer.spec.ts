import { Document } from "../../Document/Document";

import { LDP } from "../../Vocabularies/LDP";

import { DirectContainer } from "./DirectContainer";
import { TransientDirectContainer } from "./TransientDirectContainer";


describe( "DirectContainer", () => {

	it( "should exists", () => {
		expect( DirectContainer ).toBeDefined();
		expect( DirectContainer ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "DirectContainer.TYPE", () => {

			it( "should exists", () => {
				expect( DirectContainer.TYPE ).toBeDefined();
				expect( DirectContainer.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be ldp:DirectContainer", () => {
				expect( DirectContainer.TYPE ).toBe( LDP.DirectContainer );
			} );

		} );

		describe( "DirectContainer.is", () => {

			it( "should exists", () => {
				expect( DirectContainer.is ).toBeDefined();
				expect( DirectContainer.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientDirectContainer:jasmine.Spy;
			let isDocument:jasmine.Spy;
			beforeEach( () => {
				isTransientDirectContainer = spyOn( TransientDirectContainer, "is" )
					.and.returnValue( true );
				isDocument = spyOn( Document, "is" )
					.and.returnValue( true );
			} );

			it( "should be a TransientDirectContainer", () => {
				DirectContainer.is( { the: "object" } );
				expect( isTransientDirectContainer ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should be a Document", () => {
				DirectContainer.is( { the: "object" } );
				expect( isDocument ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions true", () => {
				const returned:boolean = DirectContainer.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "DirectContainer.create", () => {

			it( "should exists", () => {
				expect( DirectContainer.create ).toBeDefined();
				expect( DirectContainer.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should be TransientDirectContainer.create", () => {
				expect( DirectContainer.create ).toBe( TransientDirectContainer.create );
			} );

		} );

		describe( "DirectContainer.createFrom", () => {

			it( "should exists", () => {
				expect( DirectContainer.createFrom ).toBeDefined();
				expect( DirectContainer.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should be TransientDirectContainer.createFrom", () => {
				expect( DirectContainer.createFrom ).toBe( TransientDirectContainer.createFrom );
			} );

		} );

	} );

} );
