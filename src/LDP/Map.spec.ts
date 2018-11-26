import { Resource } from "../Resource/Resource";

import { C } from "../Vocabularies/C";

import { Map } from "./Map";


describe( "Map", () => {

	it( "should exists", () => {
		expect( Map ).toBeDefined();
		expect( Map ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {} );

	describe( "[[factory]]", () => {

		describe( "Map.TYPE", () => {

			it( "should exists", () => {
				expect( Map.TYPE ).toBeDefined();
				expect( Map.TYPE ).toEqual( jasmine.any( String ) );
			} );


			it( "should be `c:Map`", () => {
				expect( Map.TYPE ).toBe( C.Map );
			} );

		} );

		describe( "Map.SCHEMA", () => {

			it( "should exists", () => {
				expect( Map.SCHEMA ).toBeDefined();
				expect( Map.SCHEMA ).toEqual( jasmine.any( Object ) );
			} );


			it( "should have model properties", () => {
				expect<any>( Map.SCHEMA ).toEqual( {
					entries: jasmine.any( Object ),
				} );
			} );

			it( "should have specified `entries`", () => {
				expect( Map.SCHEMA[ "entries" ] ).toEqual( {
					"@id": C.entry,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );


		describe( "Map.is", () => {

			it( "should exists", () => {
				expect( Map.is ).toBeDefined();
				expect( Map.is ).toEqual( jasmine.any( Function ) );
			} );


			let isResource:jasmine.Spy;
			let mockObject:jasmine.SpyObj<Map<any, any>>;
			beforeEach( () => {
				isResource = spyOn( Resource, "is" )
					.and.returnValue( true );

				mockObject = jasmine.createSpyObj( {
					$hasType: true,
				} );

				mockObject.entries = null;
			} );


			it( "should be a Resource", () => {
				Map.is( mockObject );
				expect( isResource ).toHaveBeenCalledWith( mockObject );
			} );

			it( "should have type c:Map", () => {
				Map.is( mockObject );
				expect( mockObject.$hasType ).toHaveBeenCalledWith( C.Map );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = Map.is( mockObject );
				expect( returned ).toBe( true );
			} );

			it( "should return false whe no `entries`", () => {
				delete mockObject.entries;
				expect( Map.is( mockObject ) ).toBe( false );
			} );

		} );

	} );

} );
