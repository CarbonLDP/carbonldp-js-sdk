import { NotImplementedError } from "../Errors/NotImplementedError";

import { $Repository, Repository } from "./Repository";
import { ResolvablePointer } from "./ResolvablePointer";


describe( "Repository", () => {

	it( "should exist", () => {
		expect( Repository ).toBeDefined();
		expect( Repository ).toEqual( jasmine.any( Object ) );
	} );


	describe( "[[interface impl]]", () => {

		function createMock():Repository {
			return Repository.decorate( {} );
		}

		describe( "Repository.get", () => {

			it( "should exist", () => {
				const repository:Repository = createMock();

				expect( repository.get ).toBeDefined();
				expect( repository.get ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.get( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( "Repository.resolve", () => {

			it( "should exist", () => {
				const repository:Repository = createMock();

				expect( repository.resolve ).toBeDefined();
				expect( repository.resolve ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.resolve( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( "Repository.exists", () => {

			it( "should exist", () => {
				const repository:Repository = createMock();

				expect( repository.exists ).toBeDefined();
				expect( repository.exists ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.exists( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );


		describe( "Repository.save", () => {

			it( "should exist", () => {
				const repository:Repository = createMock();

				expect( repository.save ).toBeDefined();
				expect( repository.save ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.save( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( "Repository.refresh", () => {

			it( "should exist", () => {
				const repository:Repository = createMock();

				expect( repository.refresh ).toBeDefined();
				expect( repository.refresh ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.refresh( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( "Repository.saveAndRefresh", () => {

			it( "should exist", () => {
				const repository:Repository = createMock();

				expect( repository.saveAndRefresh ).toBeDefined();
				expect( repository.saveAndRefresh ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.saveAndRefresh( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );


		describe( "Repository.delete", () => {

			it( "should exist", () => {
				const repository:Repository = createMock();

				expect( repository.delete ).toBeDefined();
				expect( repository.delete ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:Repository = createMock();

				await repository
					.delete( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		// TODO: Test .isDecorated
		// TODO: Test .decorate

	} );

} );


describe( "$Repository", () => {

	describe( "[[interface impl]]", () => {

		function createMock():$Repository {
			return Repository.decorate( { $id: "" } );
		}

		describe( "$Repository.$get", () => {

			it( "should exist", () => {
				const repository:$Repository = createMock();

				expect( repository.$get ).toBeDefined();
				expect( repository.$get ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:$Repository = createMock();

				await repository
					.$get( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( "$Repository.$resolve", () => {

			it( "should exist", () => {
				const repository:$Repository = createMock();

				expect( repository.$resolve ).toBeDefined();
				expect( repository.$resolve ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:$Repository = createMock();

				await repository
					.$resolve( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( "$Repository.$exists", () => {

			it( "should exist", () => {
				const repository:$Repository = createMock();

				expect( repository.$exists ).toBeDefined();
				expect( repository.$exists ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:$Repository = createMock();

				await repository
					.$exists( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );


		describe( "$Repository.$save", () => {

			it( "should exist", () => {
				const repository:$Repository = createMock();

				expect( repository.$save ).toBeDefined();
				expect( repository.$save ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:$Repository = createMock();

				await repository
					.$save( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( "$Repository.$refresh", () => {

			it( "should exist", () => {
				const repository:$Repository = createMock();

				expect( repository.$refresh ).toBeDefined();
				expect( repository.$refresh ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:$Repository = createMock();

				await repository
					.$refresh( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

		describe( "$Repository.$saveAndRefresh", () => {

			it( "should exist", () => {
				const repository:$Repository = createMock();

				expect( repository.$saveAndRefresh ).toBeDefined();
				expect( repository.$saveAndRefresh ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:$Repository = createMock();

				await repository
					.$saveAndRefresh( ResolvablePointer.decorate( { $repository: repository } ) )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );


		describe( "$Repository.$delete", () => {

			it( "should exist", () => {
				const repository:$Repository = createMock();

				expect( repository.$delete ).toBeDefined();
				expect( repository.$delete ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw not implemented error", async () => {
				const repository:$Repository = createMock();

				await repository
					.$delete( "uri" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						expect( () => {throw error; } ).toThrowError( NotImplementedError, "Must be implemented for a specific repository implementation." );
					} );
			} );

		} );

	} );

} );
