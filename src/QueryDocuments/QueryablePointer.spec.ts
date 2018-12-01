import { createMockQueryableMetadata } from "../../test/helpers/mocks";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";

import { Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { QueryablePointer } from "./QueryablePointer";


describe( "QueryablePointer", () => {

	it( "should exist", () => {
		expect( QueryablePointer ).toBeDefined();
		expect( QueryablePointer ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {

		let $repository:Repository;
		beforeEach( () => {
			$repository = Repository.decorate( {} );
		} );

		function createMock( data?:Partial<QueryablePointer> ):QueryablePointer {
			return QueryablePointer.decorate( Object.assign( { $repository }, data ) );
		}


		describe( "QueryablePointer.isQueried", () => {

			it( "should exist", () => {
				const resource:QueryablePointer = createMock();

				expect( resource.$isQueried ).toBeDefined();
				expect( resource.$isQueried ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when no _queryableMetadata", () => {
				const resource:QueryablePointer = createMock( { $_queryableMetadata: undefined } );
				expect( resource.$isQueried() ).toBe( false );
			} );

			it( "should return true when _queryableMetadata set", () => {
				const resource:QueryablePointer = createMock( { $_queryableMetadata: createMockQueryableMetadata() } );
				expect( resource.$isQueried() ).toBe( true );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "QueryablePointer.isDecorated", () => {

			it( "should exist", () => {
				expect( QueryablePointer.isDecorated ).toBeDefined();
				expect( QueryablePointer.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should verify members from PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" )
					.and.returnValue( true );

				const returned:boolean = QueryablePointer.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( QueryablePointer.PROTOTYPE, { the: "object" } );
				expect( returned ).toBe( true, "Not returning value from ModelDecorator.hasPropertiesFrom" );
			} );

		} );

		describe( "QueryablePointer.decorate", () => {

			it( "should exist", () => {
				expect( QueryablePointer.decorate ).toBeDefined();
				expect( QueryablePointer.decorate ).toEqual( jasmine.any( Function ) );
			} );


			let $repository:Repository;
			beforeEach( () => {
				$repository = Repository.decorate( {} );
			} );


			it( "should decorate with ResolvablePointer", () => {
				const spy:jasmine.Spy = spyOn( ResolvablePointer, "decorate" );

				QueryablePointer.decorate( { $repository } );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add PROTOTYPE", () => {
				const pointer:QueryablePointer = QueryablePointer.decorate( { $repository } );
				expect( QueryablePointer.isDecorated( pointer ) ).toBe( true, "Not adding PROTOTYPE members" );
			} );


			it( "should maintain $repository value", () => {
				const pointer:QueryablePointer = QueryablePointer.decorate( { $repository } );
				expect( pointer.$repository ).toBe( $repository );
			} );

			it( "should throw error when no $repository", () => {
				expect( () => {
					QueryablePointer.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, `Property "$repository" is required.` );
			} );


			it( "should set _queryableMetadata to undefined by default", () => {
				const pointer:QueryablePointer = QueryablePointer.decorate( { $repository } );
				expect( pointer.$_queryableMetadata ).toBe( void 0 );
			} );

		} );


		describe( "QueryablePointer.is", () => {

			it( "should exist", () => {
				expect( QueryablePointer.is ).toBeDefined();
				expect( QueryablePointer.is ).toEqual( jasmine.any( Function ) );
			} );


			let isResolvablePointer:jasmine.Spy;
			let isSelfDecorated:jasmine.Spy;
			beforeEach( () => {
				isResolvablePointer = spyOn( ResolvablePointer, "is" )
					.and.returnValue( true );
				isSelfDecorated = spyOn( QueryablePointer, "isDecorated" )
					.and.returnValue( true );
			} );


			it( "should verify is ResolvablePointer", () => {
				QueryablePointer.is( { the: "object" } );
				expect( isResolvablePointer ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should verify is decorated", () => {
				QueryablePointer.is( { the: "object" } );
				expect( isSelfDecorated ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should return true when all assertions", () => {
				const returned:boolean = QueryablePointer.is( {} );
				expect( returned ).toBe( true, "Not returning value from all assertions" );
			} );

			it( "should return false when is not ResolvablePointer", () => {
				isResolvablePointer.and.returnValue( false );

				const returned:boolean = QueryablePointer.is( {} );
				expect( returned ).toBe( false );
			} );

			it( "should return false when no decorated", () => {
				isSelfDecorated.and.returnValue( false );

				const returned:boolean = QueryablePointer.is( {} );
				expect( returned ).toBe( false );
			} );

		} );

	} );

} );
