import {
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";

import { Pointer } from "./Pointer";


describe( module( "carbonldp/Pointer" ), ():void => {

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

		// TODO: Mode to CRUDDocument
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

		// TODO: Mode to CRUDDocument
		it( hasMethod(
			OBLIGATORY,
			"isResolved",
			"Returns true if the pointer has been resolved. It checks the `_resolved` property.",
			{ type: "boolean" }
		), ():void => {} );


		// TODO: Mode to CRUDDocument
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
				let pointer:Pointer | undefined = undefined;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );

				pointer = {
					_registry: void 0,
					_id: null,
					id: null,
				};
				expect( Pointer.isDecorated( pointer ) ).toBe( true );

				delete pointer._registry;
				expect( Pointer.isDecorated( pointer ) ).toBe( true );
				pointer._registry = void 0;

				delete pointer._id;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );
				pointer._id = null;

				delete pointer.id;
				expect( Pointer.isDecorated( pointer ) ).toBe( false );
				pointer.id = null;
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
					_registry: void 0,
					_id: null,
					id: null,
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

} );
