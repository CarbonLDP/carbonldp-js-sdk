import { IllegalStateError } from "../Errors";

import {
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Module from "./Pointer";
import {
	isPointerResolved,
	Pointer,
	resolveStandalonePointer
} from "./Pointer";

describe( module( "carbonldp/Pointer" ), ():void => {

	it( isDefined(), ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"CarbonLDP.Pointer",
		"Interface that represents any element that can be referenced by an URI."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"_id",
			"string",
			"Private variable for the URI that identifies the pointer."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_resolved",
			"boolean",
			"Private variable that indicates if the pointer has been resolved."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"id",
			"string",
			"Accessor for the _id variable."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isResolved",
			"Returns true if the pointer has been resolved. It checks the `_resolved` property.",
			{ type: "boolean" }
		), ():void => {} );


		describe( method( OBLIGATORY, "resolve" ), ():void => {

			it( hasSignature(
				[ "T extends objects" ],
				"Resolves the pointer. This function throw an Error if it has no been configured by a context.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & this & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends objects" ],
				"Resolves the pointer. This function throw an Error if it has no been configured by a context.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & this & CarbonLDP.Document>" }
			), ():void => {} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.PointerFactory",
		"Interface with the factory, decorate, and utils methods of a `CarbonLDP.Pointer` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the object provided has the properties and methods of a `CarbonLDP.Pointer` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.Pointer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the value provided is considered a `CarbonLDP.Pointer` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a Pointer object with the ID provided.", [
				{ name: "id", type: "string", optional: true },
			],
			{ type: "CarbonLDP.Pointer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Create a Pointer from the object provided with id if provided.", [
				{ name: "object", type: "T" },
				{ name: "id", type: "string", optional: true },
			],
			{ type: "T & CarbonLDP.Pointer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Pointer` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.Pointer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"areEqual",
			"Check of the objects refer to the same resource by its ID.", [
				{ name: "pointer1", type: "CarbonLDP.Pointer" },
				{ name: "pointer2", type: "CarbonLDP.Pointer" },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getIDs",
			"Extracts the IDs of all the pointers provided.", [
				{ name: "pointers", type: "CarbonLDP.Pointer[]", description: "The array of Pointers to obtain their IDs." },
			],
			{ type: "string[]" }
		), ():void => {} );

	} );

	describe( property( STATIC, "Pointer", "CarbonLDP.PointerFactory", "Constant that implements the `CarbonLDP.PointerFactory` interface." ), ():void => {

		it( "should exist", ():void => {
			expect( Pointer ).toBeDefined();
			expect( Pointer ).toEqual( jasmine.any( Object ) );
		} );


		describe( "Pointer.isDecorated", ():void => {

			it( "should exist", ():void => {
				expect( Pointer.isDecorated ).toBeDefined();
				expect( Pointer.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			// TODO: Separate in different tests
			it( "should test method", ():void => {
				let pointer:any = undefined;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );

				pointer = {
					_id: null,
					_resolved: null,
					id: null,
					isResolved: ():void => {},
					resolve: ():void => {},
				};
				expect( Pointer.isDecorated( pointer ) ).toBe( true );

				delete pointer._id;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );
				pointer._id = null;

				delete pointer._resolved;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );
				pointer._resolved = null;

				delete pointer.id;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );
				pointer.id = null;

				delete pointer.isResolved;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );
				pointer.isResolved = ():void => {};

				delete pointer.resolve;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );
				pointer.resolve = ():void => {};
			} );

		} );

		describe( "Pointer.is", ():void => {

			it( "should exist", ():void => {
				expect( Pointer.is ).toBeDefined();
				expect( Pointer.is ).toEqual( jasmine.any( Function ) );
			} );

			// TODO: Separate in different tests
			it( "should test method", ():void => {
				expect( Pointer.is( undefined ) ).toBe( false );
				expect( Pointer.is( null ) ).toBe( false );
				expect( Pointer.is( {} ) ).toBe( false );

				const target:Pointer = {
					_id: null,
					_resolved: null,
					id: null,
					isResolved():any {},
					resolve():any {},
				};
				expect( Pointer.is( target ) ).toBe( true );
			} );

		} );

		describe( "Pointer.create", ():void => {

			it( "should exist", ():void => {
				expect( Pointer.create ).toBeDefined();
				expect( Pointer.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should assign the `id` in `Pointer._id`", ():void => {
				const pointer:Pointer = Pointer.create( { id: "https://example.com/pointer/" } );
				expect( pointer._id ).toBe( "https://example.com/pointer/" );
			} );

			it( "should set empty string in `Pointer._id` if no id`` provided", ():void => {
				const pointer:Pointer = Pointer.create( {} );
				expect( pointer.id ).toBe( "" );
			} );

			it( "should set empty string in `Pointer._id` none provided", ():void => {
				const pointer:Pointer = Pointer.create();
				expect( pointer.id ).toBe( "" );
			} );


			it( "should return different reference", ():void => {
				const object:{} = {};
				const returned:Pointer = Pointer.create( {} );

				expect( object ).not.toBe( returned );
			} );

			it( "should call Pointer.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( Pointer, "createFrom" );

				Pointer.create( { the: "data", id: "" } );
				expect( spy ).toHaveBeenCalledWith( { the: "data", id: "" } );
			} );

		} );

		describe( "Pointer.createFrom", ():void => {

			it( "should exist", ():void => {
				expect( Pointer.createFrom ).toBeDefined();
				expect( Pointer.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should assign the `id` in `Pointer._id`", ():void => {
				const pointer:Pointer = Pointer.createFrom( { id: "https://example.com/pointer/" } );
				expect( pointer._id ).toBe( "https://example.com/pointer/" );
			} );

			it( "should set empty string in `Pointer._id` if no id`` provided", ():void => {
				const pointer:Pointer = Pointer.createFrom( {} );
				expect( pointer.id ).toBe( "" );
			} );


			it( "should return same reference", ():void => {
				const object:{} = {};
				const returned:Pointer = Pointer.createFrom( object );

				expect( object ).toBe( returned );
			} );

			it( "should call Pointer.decorate", ():void => {
				const spy:jasmine.Spy = spyOn( Pointer, "decorate" );

				Pointer.create( { the: "data", id: "" } );
				expect( spy ).toHaveBeenCalledWith( { the: "data", id: "" } );
			} );

		} );

		describe( "Pointer.decorate", ():void => {

			it( "should exist", ():void => {
				expect( Pointer.decorate ).toBeDefined();
				expect( Pointer.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should work with Pointer.isDecorated", ():void => {
				const pointer:Pointer = Pointer.decorate( {} );
				expect( Pointer.isDecorated( pointer ) ).toBe( true );
			} );


			it( "should assign empty string to `Pointer._id` when not exists", ():void => {
				const pointer:Pointer = Pointer.decorate( {} );
				expect( pointer._id ).toBe( "" );
			} );

			it( "should keep ID in `Pointer._id` when `Pointer.id` already exists", ():void => {
				const pointer:Pointer = Pointer.decorate( { id: "https://example.com/pointer/" } );
				expect( pointer._id ).toBe( "https://example.com/pointer/" );
			} );


			it( "should assign false to `Pointer._resolved` when not exists", ():void => {
				const pointer:Pointer = Pointer.decorate( {} );
				expect( pointer._resolved ).toBe( false );
			} );

			it( "should keep resolved in `Pointer._resolved` when already set", ():void => {
				const pointer:Pointer = Pointer.decorate( { _resolved: true } );
				expect( pointer._resolved ).toBe( true );
			} );


			it( "should set getter as `Pointer.id` of `Pointer._id` ", ():void => {
				const pointer:Pointer = Pointer.decorate( {} );

				pointer._id = "https://example.com/pointer/";
				expect( pointer.id ).toBe( "https://example.com/pointer/" );
			} );

			it( "should set setter as `Pointer.id` of `Pointer._id`", ():void => {
				const pointer:Pointer = Pointer.decorate( {} );

				pointer.id = "https://example.com/pointer/";
				expect( pointer._id ).toBe( "https://example.com/pointer/" );
			} );


			it( "should assign `isPointerResolved` as `Pointer.resolved`", ():void => {
				const pointer:Pointer = Pointer.decorate( {} );
				expect( pointer.isResolved ).toBe( isPointerResolved );
			} );

			it( "should assign `resolveStandalonePointer` as `Pointer.resolve`", ():void => {
				const pointer:Pointer = Pointer.decorate( {} );
				expect( pointer.resolve ).toBe( resolveStandalonePointer );
			} );

		} );

		describe( "Pointer.areEqual", ():void => {

			it( "should exist", ():void => {
				expect( Pointer.areEqual ).toBeDefined();
				expect( Pointer.areEqual ).toEqual( jasmine.any( Function ) );
			} );

			// TODO: Create tests

		} );

		describe( "Pointer.getIDs", ():void => {

			it( "should exist", ():void => {
				expect( Pointer.getIDs ).toBeDefined();
				expect( Pointer.getIDs ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the IDs", ():void => {
				const pointers:Pointer[] = [
					Pointer.create( { id: "http://example.com/resource-1/" } ),
					Pointer.create( { id: "http://example.com/resource-2/" } ),
					Pointer.create( { id: "http://example.com/resource-3/" } ),
				];

				const ids:string[] = Pointer.getIDs( pointers );
				expect( ids.length ).toBe( 3 );
				expect( ids ).toContain( "http://example.com/resource-1/" );
				expect( ids ).toContain( "http://example.com/resource-2/" );
				expect( ids ).toContain( "http://example.com/resource-3/" );
			} );

		} );

	} );


	function createMockPointer<T extends {}>( base:T = {} as T ):T & Pointer {
		base = Object.assign( base, { id: "https://example.com/pointer/" } );
		return Pointer.decorate( base );
	}

	describe( "isPointerResolved", ():void => {

		it( "should exist", ():void => {
			expect( isPointerResolved ).toBeDefined();
			expect( isPointerResolved ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return false when `_resolved` is set to false", ():void => {
			const pointer:Pointer = createMockPointer( { _resolved: false } );
			expect( isPointerResolved.call( pointer ) ).toBe( false );
		} );

		it( "should return true when `_resolved` is set to true", ():void => {
			const pointer:Pointer = createMockPointer( { _resolved: true } );
			expect( isPointerResolved.call( pointer ) ).toBe( true );
		} );

	} );

	describe( "resolveStandalonePointer", ():void => {

		it( "should exist", ():void => {
			expect( resolveStandalonePointer ).toBeDefined();
			expect( resolveStandalonePointer ).toEqual( jasmine.any( Function ) );
		} );

		it( "should always return rejected promise", ( done:DoneFn ) => {
			const pointer:Pointer = createMockPointer();

			const promise:Promise<any> = resolveStandalonePointer.call( pointer );
			expect( promise ).toEqual( jasmine.any( Promise ) );

			promise
				.then( () => done.fail( "Should not resolve." ) )
				.catch( error => {
					expect( () => { throw error; } ).toThrowError( IllegalStateError, "The pointer has not been assigned to a context." );
					done();
				} )
			;
		} );

	} );

} );