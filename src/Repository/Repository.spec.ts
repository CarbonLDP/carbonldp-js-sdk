import { NotImplementedError } from "../Errors/NotImplementedError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";

import {
	extendsClass,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";

import { BaseRepository } from "./BaseRepository";
import { Repository, RepositoryFactory } from "./Repository";
import { ResolvablePointer } from "./ResolvablePointer";


describe( module( "carbonldp/Repository" ), () => {

	describe( interfaze(
		"CarbonLDP.Repository",
		[ "MODEL extends ResolvablePointer = ResolvablePointer" ],
		"Interface that describes a generic repository."
	), () => {


		function createMock():Repository {
			return Repository.decorate( {} );
		}

		describe( method( OBLIGATORY, "get" ), ():void => {

			it( hasSignature(
				[
					{ name: "uri", type: "string" },
					{ name: "...params", type: "any[]" },
				],
				{ type: "Promise<MODEL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const repository:Repository = createMock();

				expect( repository.$get ).toBeDefined();
				expect( repository.$get ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.$get( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( method( OBLIGATORY, "resolve" ), ():void => {

			it( hasSignature(
				[
					{ name: "resource", type: "MODEL" },
					{ name: "...params", type: "any[]" },
				],
				{ type: "Promise<MODEL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const repository:Repository = createMock();

				expect( repository.$resolve ).toBeDefined();
				expect( repository.$resolve ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.$resolve( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( method( OBLIGATORY, "exists" ), ():void => {

			it( hasSignature(
				[
					{ name: "uri", type: "string" },
					{ name: "...params", type: "any[]" },
				],
				{ type: "Promise<MODEL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const repository:Repository = createMock();

				expect( repository.$exists ).toBeDefined();
				expect( repository.$exists ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.$exists( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );


		describe( method( OBLIGATORY, "save" ), ():void => {

			it( hasSignature(
				[
					{ name: "resource", type: "MODEL" },
					{ name: "...params", type: "any[]" },
				],
				{ type: "Promise<MODEL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const repository:Repository = createMock();

				expect( repository.$save ).toBeDefined();
				expect( repository.$save ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.$save( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( method( OBLIGATORY, "refresh" ), ():void => {

			it( hasSignature(
				[
					{ name: "resource", type: "MODEL" },
					{ name: "...params", type: "any[]" },
				],
				{ type: "Promise<MODEL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const repository:Repository = createMock();

				expect( repository.$refresh ).toBeDefined();
				expect( repository.$refresh ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.$refresh( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( method( OBLIGATORY, "saveAndRefresh" ), ():void => {

			it( hasSignature(
				[
					{ name: "resource", type: "MODEL" },
					{ name: "...params", type: "any[]" },
				],
				{ type: "Promise<MODEL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const repository:Repository = createMock();

				expect( repository.$saveAndRefresh ).toBeDefined();
				expect( repository.$saveAndRefresh ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.$saveAndRefresh( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );


		describe( method( OBLIGATORY, "delete" ), ():void => {

			it( hasSignature(
				[
					{ name: "uri", type: "string" },
					{ name: "...params", type: "any[]" },
				],
				{ type: "Promise<MODEL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const repository:Repository = createMock();

				expect( repository.$delete ).toBeDefined();
				expect( repository.$delete ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.$exists( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

	} );


	describe( interfaze(
		"CarbonLDP.RepositoryFactory",
		"Interface with the factory and utils for `CarbonLDP.Repository` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.Repository>" ), () => {
			const target:ModelPrototype<Repository> = {} as RepositoryFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.Repository, CarbonLDP.BaseRepository>" ), () => {
			const target:ModelDecorator<Repository, BaseRepository> = {} as RepositoryFactory;
			expect( target ).toBeDefined();
		} );


		// TODO: Test .isDecorated
		// TODO: Test .decorate

	} );


	describe( property(
		STATIC,
		"Repository",
		"CarbonLDP.RepositoryFactory"
	), () => {

		it( "should exists", ():void => {
			expect( Repository ).toBeDefined();
			expect( Repository ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
