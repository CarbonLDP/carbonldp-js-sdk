import { anyThatMatches } from "../../test/helpers/jasmine/equalities";

import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";

import { VolatileResource } from "./VolatileResource";


describe( "VolatileResource", () => {

	it( "should exists", () => {
		expect( VolatileResource ).toBeDefined();
		expect( VolatileResource ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "VolatileResource.TYPE", () => {

			it( "should exists", () => {
				expect( VolatileResource.TYPE ).toBeDefined();
				expect( VolatileResource.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:VolatileResource`", () => {
				expect( VolatileResource.TYPE ).toBe( C.VolatileResource );
			} );

		} );


		describe( "VolatileResource.is", () => {

			it( "should exists", () => {
				expect( VolatileResource.is ).toBeDefined();
				expect( VolatileResource.is ).toEqual( jasmine.any( Function ) );
			} );


			let isResource:jasmine.Spy;
			let mockObject:jasmine.SpyObj<Resource>;
			beforeEach( () => {
				isResource = spyOn( Resource, "is" )
					.and.returnValue( true );
				mockObject = jasmine.createSpyObj( {
					$hasType: true,
				} );
			} );

			it( "should be a Resource", () => {
				VolatileResource.is( mockObject );
				expect( isResource ).toHaveBeenCalledWith( mockObject );
			} );

			it( "should has type c:VolatileResource", () => {
				VolatileResource.is( mockObject );
				expect( mockObject.$hasType ).toHaveBeenCalledWith( C.VolatileResource );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = VolatileResource.is( mockObject );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "VolatileResource.create", () => {

			it( "should exists", () => {
				expect( VolatileResource.create ).toBeDefined();
				expect( VolatileResource.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a VolatileResource when object provided", () => {
				const returned:VolatileResource = VolatileResource.create( {} );
				expect( returned ).toEqual( anyThatMatches( VolatileResource.is, "isVolatileResource" ) as any );
			} );

			it( "should return a VolatileResource when NO object provided", () => {
				const returned:VolatileResource = VolatileResource.create();
				expect( returned ).toEqual( anyThatMatches( VolatileResource.is, "isVolatileResource" ) as any );
			} );

			it( "should return different reference", () => {
				const object:{} = {};
				const returned:{} = VolatileResource.create( object );

				expect( returned ).not.toBe( object );
			} );

		} );

		describe( "VolatileResource.createFrom", () => {

			it( "should exists", () => {
				expect( VolatileResource.createFrom ).toBeDefined();
				expect( VolatileResource.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a VolatileResource", () => {
				const returned:VolatileResource = VolatileResource.createFrom( {} );
				expect( returned ).toEqual( anyThatMatches( VolatileResource.is, "isVolatileResource" ) as any );
			} );

			it( "should return same reference", () => {
				const object:{} = {};
				const returned:{} = VolatileResource.createFrom( object );

				expect( returned ).toBe( object );
			} );

		} );

	} );

} );
