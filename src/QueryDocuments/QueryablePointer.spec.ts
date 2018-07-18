import { createMockQueryableMetadata } from "../../test/helpers/mocks/core";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { BaseResolvablePointer } from "../Repository/BaseResolvablePointer";
import { Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";

import { QueryablePointer, QueryablePointerFactory } from "./QueryablePointer";


describe( module( "carbonldp/QueryDocuments" ), () => {

	describe( interfaze(
		"CarbonLDP.QueryDocuments.QueryablePointer",
		"Interface that describes extra properties for a pointer that can be queried."
	), () => {

		it( extendsClass( "CarbonLDP.QueryDocuments.QueryablePointer" ), () => {
			const target:QueryablePointer = {} as QueryablePointer;
			expect( target ).toBeDefined();
		} );


		let $repository:Repository;
		beforeEach( ():void => {
			$repository = Repository.decorate( {} );
		} );

		function createMock( data?:Partial<QueryablePointer> ):QueryablePointer {
			return QueryablePointer.decorate( Object.assign( { $repository }, data ) );
		}


		it( hasProperty(
			OBLIGATORY,
			"_queryableMetadata",
			"CarbonLDP.QueryDocuments.QueryableMetadata",
			"Metadata for documents that are partial documents."
		), ():void => {} );


		describe( method( OBLIGATORY, "isQueried" ), () => {

			it( hasSignature(
				"Returns true if the resource is a partial representation of the one stored in Carbon LDP.",
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:QueryablePointer = createMock();

				expect( resource.isQueried ).toBeDefined();
				expect( resource.isQueried ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when no _queryableMetadata", () => {
				const resource:QueryablePointer = createMock( { _queryableMetadata: undefined } );
				expect( resource.isQueried() ).toBe( false );
			} );

			it( "should return true when _queryableMetadata set", () => {
				const resource:QueryablePointer = createMock( { _queryableMetadata: createMockQueryableMetadata() } );
				expect( resource.isQueried() ).toBe( true );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.QueryDocuments.QueryablePointerFactory",
		"Interface with the factory, decorate and utils of a `CarbonLDP.QueryDocuments.QueryablePointer` object."
	), ():void => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.QueryDocuments.QueryablePointer, CarbonLDP.BaseResolvablePointer>" ), () => {
			const target:ModelPrototype<QueryablePointer, BaseResolvablePointer> = {} as QueryablePointerFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.QueryDocuments.QueryablePointer, CarbonLDP.BaseResolvablePointer>" ), () => {
			const target:ModelDecorator<QueryablePointer, BaseResolvablePointer> = {} as QueryablePointerFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelTypeGuard<CarbonLDP.QueryDocuments.QueryablePointer>" ), () => {
			const target:ModelTypeGuard<QueryablePointer> = {} as QueryablePointerFactory;
			expect( target ).toBeDefined();
		} );


		describe( "QueryablePointer.isDecorated", ():void => {

			it( "should exists", ():void => {
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

		describe( "QueryablePointer.decorate", ():void => {

			it( "should exists", ():void => {
				expect( QueryablePointer.decorate ).toBeDefined();
				expect( QueryablePointer.decorate ).toEqual( jasmine.any( Function ) );
			} );

			let $repository:Repository;
			beforeEach( ():void => {
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
				expect( pointer._queryableMetadata ).toBe( void 0 );
			} );

		} );


		describe( "QueryablePointer.is", ():void => {

			it( "should exists", ():void => {
				expect( QueryablePointer.is ).toBeDefined();
				expect( QueryablePointer.is ).toEqual( jasmine.any( Function ) );
			} );


			let isResolvablePointer:jasmine.Spy;
			let isSelfDecorated:jasmine.Spy;
			beforeEach( ():void => {
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


	describe( property(
		STATIC,
		"QueryablePointer",
		"CarbonLDP.QueryDocuments.QueryablePointerFactory"
	), () => {

		it( "should exists", ():void => {
			expect( QueryablePointer ).toBeDefined();
			expect( QueryablePointer ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
