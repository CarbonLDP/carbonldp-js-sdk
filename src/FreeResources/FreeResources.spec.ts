import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import { createMockContext } from "../../test/helpers/mocks/core";

import { Context } from "../Context/Context";

import { Pointer } from "../Pointer/Pointer";

import { Registry } from "../Registry/Registry";

import { Resource } from "../Resource/Resource";

import { BaseFreeResources } from "./BaseFreeResources";
import { FreeResources } from "./FreeResources";


describe( "FreeResources", () => {

	it( "should exists", () => {
		expect( FreeResources ).toBeDefined();
		expect( FreeResources ).toEqual( jasmine.any( Object ) );
	} );

	let context:Context;
	beforeEach( () => {
		context = createMockContext();
	} );


	describe( "[[interface]]", () => {

		let freeResources:FreeResources;
		beforeEach( () => {
			freeResources = FreeResources.decorate( { registry: context.registry } );
		} );


		describe( "FreeResources.toJSON", () => {

			it( "should exists", () => {
				expect( freeResources.toJSON ).toBeDefined();
				expect( freeResources.toJSON ).toEqual( jasmine.any( Function ) );
			} );


			it( "should expand resource with schema in context", () => {
				context
					.extendObjectSchema( "http://example.com/ns#MyType", {
						"anotherProperty": {
							"@id": "http://example.com/ns#another-property",
							"@type": "http://www.w3.org/2001/XMLSchema#string",
						},
					} );

				freeResources._addPointer( {
					$id: "_:some",
					types: [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": "A Property",
					"anotherProperty": "Another Property",
				} );

				expect( freeResources.toJSON() ).toEqual( [ {
					"@id": "_:some",
					"@type": [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": [ {
						"@value": "A Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
					"http://example.com/ns#another-property": [ {
						"@value": "Another Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
				} ] );
			} );

			it( "should expand resource with provided context", () => {
				context = createMockContext()
					.extendObjectSchema( "http://example.com/ns#MyType", {
						"anotherProperty": {
							"@id": "http://example.com/ns#another-property",
							"@type": "http://www.w3.org/2001/XMLSchema#string",
						},
					} );


				freeResources._addPointer( {
					$id: "_:some",
					types: [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": "A Property",
					"anotherProperty": "Another Property",
				} );

				expect( freeResources.toJSON( context ) ).toEqual( [ {
					"@id": "_:some",
					"@type": [ "http://example.com/ns#MyType" ],
					"http://example.com/ns#property": [ {
						"@value": "A Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
					"http://example.com/ns#another-property": [ {
						"@value": "Another Property",
						"@type": "http://www.w3.org/2001/XMLSchema#string",
					} ],
				} ] );
			} );

		} );


		describe( "FreeResources.hasPointer", () => {

			it( "should exists", () => {
				expect( freeResources.hasPointer ).toBeDefined();
				expect( freeResources.hasPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when no resource local ID", () => {
				expect( freeResources.hasPointer( "_:some" ) ).toBe( false );
			} );

			it( "should return true when has resource local ID", () => {
				freeResources._addPointer( { $id: "_:some" } );
				expect( freeResources.hasPointer( "_:some" ) ).toBe( true );
			} );

			it( "should return false when no resource in parent registry", () => {
				expect( freeResources.hasPointer( "https://example.com/some/" ) ).toBe( false );
			} );

			it( "should return true when resource in parent registry", () => {
				context.registry._addPointer( { $id: "https://example.com/some/" } );
				expect( freeResources.hasPointer( "https://example.com/some/" ) ).toBe( true );
			} );

		} );

		describe( "FreeResources.getPointer", () => {

			it( "should exists", () => {
				expect( freeResources.getPointer ).toBeDefined();
				expect( freeResources.getPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return existing resource", () => {
				const resource:Resource = freeResources._addPointer( { $id: "_:some" } );
				expect( freeResources.getPointer( "_:some" ) ).toBe( resource );
			} );

			it( "should create non-existing resource", () => {
				const resource:Pointer = freeResources.getPointer( "_:another" );

				expect( resource.$id ).toBe( "_:another" );
				expect( resource ).toEqual( anyThatMatches( Resource.is, "Resource" ) as any );
			} );

			it( "should return from parent resource", () => {
				const parentResource:Pointer = context.registry.getPointer( "https://example.com/some/" );

				const resource:Pointer = freeResources.getPointer( "https://example.com/some/" );
				expect( resource ).toBe( parentResource );
			} );

		} );

		describe( "FreeResources.inScope", () => {

			it( "should exist", () => {
				expect( freeResources.inScope ).toBeDefined();
				expect( freeResources.inScope ).toEqual( jasmine.any( Function ) );
			} );


			it( "should accept blank nodes labels", () => {
				expect( freeResources.inScope( "_:some" ) ).toBe( true );
			} );

			it( "should reject absolute IRIs when local", () => {
				expect( freeResources.inScope( "https://example.com/", true ) ).toBe( false );
			} );

			it( "should accept absolute IRIs when global", () => {
				expect( freeResources.inScope( "https://example.com/" ) ).toBe( true );
			} );

			it( "should reject relative IRIs, when local", () => {
				expect( freeResources.inScope( "resource/", true ) ).toBe( false );
			} );

			it( "should reject relative IRIs, when global", () => {
				expect( freeResources.inScope( "resource/" ) ).toBe( true );
			} );

		} );

	} );

	describe( "[[factory]]", () => {

		describe( "FreeResources.parseFreeNodes", () => {

			it( "should exists", () => {
				expect( FreeResources.parseFreeNodes ).toBeDefined();
				expect( FreeResources.parseFreeNodes ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return FreeResources object", () => {
				const returned:FreeResources = FreeResources.parseFreeNodes( context.registry, [] );
				expect( returned ).toEqual( anyThatMatches( FreeResources.is, "isFreeResources" ) as any );
			} );

			it( "should compact nodes provided", () => {
				context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } )
					.extendObjectSchema( "Type-1", { "property1": {} } )
					.extendObjectSchema( "Type-2", { "property2": {} } )
				;


				const returned:FreeResources = FreeResources.parseFreeNodes( context.registry, [
					{
						"@id": "_:1",
						"@type": [ "Type-1" ],
						"https://example.com/ns#property1": [ { "@value": "value 1" } ],
					},
					{
						"@id": "_:2",
						"@type": [ "Type-2" ],
						"https://example.com/ns#property2": [ { "@value": "value 2" } ],
					},
				] );

				expect<{ property1?:string }>( returned.getPointer( "_:1" ) as {} ).toEqual( {
					property1: "value 1",
				} );

				expect<{ property2?:string }>( returned.getPointer( "_:2" ) as {} ).toEqual( {
					property2: "value 2",
				} );

			} );

		} );


		// TODO: Test .isDecorated

		// TODO: Test .decorate

		describe( "FreeResources.is", () => {

			it( "should exists", () => {
				expect( FreeResources.is ).toBeDefined();
				expect( FreeResources.is ).toEqual( jasmine.any( Function ) );
			} );


			let isRegistry:jasmine.Spy;
			let isSelfDecorated:jasmine.Spy;
			beforeEach( () => {
				isRegistry = spyOn( Registry, "isDecorated" )
					.and.returnValue( true );
				isSelfDecorated = spyOn( FreeResources, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert that is a Registry", () => {
				FreeResources.is( { the: "object" } );
				expect( isRegistry ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should assert that is self decorated", () => {
				FreeResources.is( { the: "object" } );
				expect( isSelfDecorated ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should return true when all assertions", () => {
				const returned:boolean = FreeResources.is( {} );
				expect( returned ).toBe( true );
			} );

		} );


		describe( "FreeResources.create", () => {

			it( "should exists", () => {
				expect( FreeResources.create ).toBeDefined();
				expect( FreeResources.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call FreeResources.createFrom", () => {
				const spy:jasmine.Spy = spyOn( FreeResources, "createFrom" );

				FreeResources.create( { registry: context.registry } );
				expect( spy ).toHaveBeenCalledWith( { registry: context.registry } );
			} );

			it( "should return different reference", () => {
				const object:BaseFreeResources = { registry: context.registry };
				const returned:FreeResources = FreeResources.create( object );

				expect( object ).not.toBe( returned );
			} );

		} );

		describe( "FreeResources.createFrom", () => {

			it( "should exists", () => {
				expect( FreeResources.createFrom ).toBeDefined();
				expect( FreeResources.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call FreeResources.decorate", () => {
				const spy:jasmine.Spy = spyOn( FreeResources, "decorate" );

				FreeResources.createFrom( { registry: context.registry } );
				expect( spy ).toHaveBeenCalledWith( { registry: context.registry } );
			} );

			it( "should return same reference", () => {
				const object:BaseFreeResources = { registry: context.registry };
				const returned:FreeResources = FreeResources.createFrom( object );

				expect( object ).toBe( returned );
			} );

		} );

	} );

} );
