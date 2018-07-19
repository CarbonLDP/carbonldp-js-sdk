import { anyThatMatches } from "../../test/helpers/jasmine/equalities";
import { createMockContext } from "../../test/helpers/mocks/core";

import { Context } from "../Context/Context";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { Pointer } from "../Pointer/Pointer";

import { Registry } from "../Registry/Registry";

import { Resource } from "../Resource/Resource";

import {
	extendsClass,
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

import { BaseFreeResources } from "./BaseFreeResources";
import { FreeResources, FreeResourcesFactory, FreeResourcesUtils } from "./FreeResources";


describe( module( "carbonldp/FreeResources" ), ():void => {

	beforeEach( ():void => {
		$context = createMockContext();
	} );
	let $context:Context;


	describe( interfaze(
		"CarbonLDP.FreeResources",
		"Interface that represents a set of free resources."
	), ():void => {

		it( extendsClass( "CarbonLDP.Registry<CarbonLDP.TransientResource>" ), ():void => {} );

		let freeResources:FreeResources;
		beforeEach( ():void => {
			freeResources = FreeResources.decorate( { $registry: $context.registry } );
		} );

		it( hasProperty(
			OBLIGATORY,
			"$registry",
			"CarbonLDP.GeneralRegistry<any>",
			"The registry where the FreeResources scope is in."
		), ():void => {
			const target:FreeResources[ "$registry" ] = {} as GeneralRegistry<any>;
			expect( target ).toBeDefined();
		} );


		describe( method( OBLIGATORY, "toJSON" ), () => {

			it( hasSignature(
				"Returns a JSON-LD Node array using the data available from the $registry of the current container.",
				{ type: "CarbonLDP.RDF.RDFNode[]" }
			), ():void => {} );

			it( hasSignature(
				"Returns a JSON-LD Node array using the data of context provided.",
				[
					{ name: "context", type: "CarbonLDP.Context" },
				],
				{ type: "CarbonLDP.RDF.RDFNode[]" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( freeResources.toJSON ).toBeDefined();
				expect( freeResources.toJSON ).toEqual( jasmine.any( Function ) );
			} );


			it( "should expand resource with schema in context", () => {
				$context
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
				$context = createMockContext()
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

				expect( freeResources.toJSON( $context ) ).toEqual( [ {
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


		describe( "FreeResources.hasPointer", ():void => {

			it( "should exists", ():void => {
				expect( freeResources.hasPointer ).toBeDefined();
				expect( freeResources.hasPointer ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return false when no resource local ID", ():void => {
				expect( freeResources.hasPointer( "_:some" ) ).toBe( false );
			} );

			it( "should return true when has resource local ID", ():void => {
				freeResources._addPointer( { $id: "_:some" } );
				expect( freeResources.hasPointer( "_:some" ) ).toBe( true );
			} );

			it( "should return false when no resource in parent registry", ():void => {
				expect( freeResources.hasPointer( "https://example.com/some/" ) ).toBe( false );
			} );

			it( "should return true when resource in parent registry", ():void => {
				$context.registry._addPointer( { $id: "https://example.com/some/" } );
				expect( freeResources.hasPointer( "https://example.com/some/" ) ).toBe( true );
			} );

		} );

		describe( "FreeResources.getPointer", ():void => {

			it( "should exists", ():void => {
				expect( freeResources.getPointer ).toBeDefined();
				expect( freeResources.getPointer ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return existing resource", ():void => {
				const resource:Resource = freeResources._addPointer( { $id: "_:some" } );
				expect( freeResources.getPointer( "_:some" ) ).toBe( resource );
			} );

			it( "should create non-existing resource", ():void => {
				const resource:Pointer = freeResources.getPointer( "_:another" );

				expect( resource.$id ).toBe( "_:another" );
				expect( resource ).toEqual( anyThatMatches( Resource.is, "Resource" ) as any );
			} );

			it( "should return from parent resource", ():void => {
				const parentResource:Pointer = $context.registry.getPointer( "https://example.com/some/" );

				const resource:Pointer = freeResources.getPointer( "https://example.com/some/" );
				expect( resource ).toBe( parentResource );
			} );

		} );

		describe( "FreeResources.inScope", ():void => {

			it( "should exist", ():void => {
				expect( freeResources.inScope ).toBeDefined();
				expect( freeResources.inScope ).toEqual( jasmine.any( Function ) );
			} );

			it( "should accept blank nodes labels", ():void => {
				expect( freeResources.inScope( "_:some" ) ).toBe( true );
			} );

			it( "should reject absolute IRIs when local", ():void => {
				expect( freeResources.inScope( "https://example.com/", true ) ).toBe( false );
			} );

			it( "should accept absolute IRIs when global", ():void => {
				expect( freeResources.inScope( "https://example.com/" ) ).toBe( true );
			} );

			it( "should reject relative IRIs, when local", ():void => {
				expect( freeResources.inScope( "resource/", true ) ).toBe( false );
			} );

			it( "should reject relative IRIs, when global", ():void => {
				expect( freeResources.inScope( "resource/" ) ).toBe( true );
			} );

		} );

	} );


	describe( interfaze(
		"CarbonLDP.FreeResourcesUtils",
		"Utils for `CarbonLDP.FreeResources` objects."
	), () => {

		describe( method( OBLIGATORY, "parseFreeNodes" ), () => {

			it( hasSignature(
				[
					{ name: "registry", type: "CarbonLDP.GeneralRegistry<any>" },
					{ name: "freeNodes", type: "CarbonLDP.RDF.RDFNode[]" },
				],
				{ type: "CarbonLDP.FreeResources" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( FreeResources.parseFreeNodes ).toBeDefined();
				expect( FreeResources.parseFreeNodes ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return FreeResources object", () => {
				const returned:FreeResources = FreeResources.parseFreeNodes( $context.registry, [] );
				expect( returned ).toEqual( anyThatMatches( FreeResources.is, "isFreeResources" ) as any );
			} );

			it( "should compact nodes provided", () => {
				$context
					.extendObjectSchema( { "@vocab": "https://example.com/ns#" } )
					.extendObjectSchema( "Type-1", { "property1": {} } )
					.extendObjectSchema( "Type-2", { "property2": {} } )
				;


				const returned:FreeResources = FreeResources.parseFreeNodes( $context.registry, [
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

	} );

	describe( interfaze(
		"CarbonLDP.FreeResourcesFactory",
		"Interfaces with the factory, decorate and utils methods of a `CarbonLDP.FreeResources` object."
	), ():void => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.FreeResources, Registry, \"$registry\" | \"_getLocalID\" | \"_addPointer\">" ), () => {
			const target:ModelPrototype<FreeResources, Registry, "$registry" | "_getLocalID" | "_addPointer"> = {} as FreeResourcesFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.FreeResources, CarbonLDP.BaseFreeResources>" ), () => {
			const target:ModelDecorator<FreeResources, BaseFreeResources> = {} as FreeResourcesFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelTypeGuard<CarbonLDP.FreeResources>" ), () => {
			const target:ModelTypeGuard<FreeResources> = {} as FreeResourcesFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelFactory<CarbonLDP.FreeResources, CarbonLDP.BaseFreeResources>" ), () => {
			const target:ModelFactory<FreeResources, BaseFreeResources> = {} as FreeResourcesFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.FreeResourcesUtils" ), () => {
			const target:FreeResourcesUtils = {} as FreeResourcesFactory;
			expect( target ).toBeDefined();
		} );


		// TODO: Test .isDecorated

		// TODO: Test .decorate

		describe( "FreeResources.is", () => {

			it( "should exists", ():void => {
				expect( FreeResources.is ).toBeDefined();
				expect( FreeResources.is ).toEqual( jasmine.any( Function ) );
			} );


			let isRegistry:jasmine.Spy;
			let isSelfDecorated:jasmine.Spy;
			beforeEach( ():void => {
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


		// TODO: Separate in different tests
		it( "FreeResources.create", ():void => {
			expect( FreeResources.create ).toBeDefined();
			expect( FreeResources.create ).toEqual( jasmine.any( Function ) );

			let freeResources:FreeResources = FreeResources.create( { $registry: $context.registry } );

			expect( freeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( freeResources ) );
		} );

		// TODO: Separate in different tests
		it( "FreeResources.createFrom", ():void => {
			expect( FreeResources.createFrom ).toBeDefined();
			expect( FreeResources.createFrom ).toEqual( jasmine.any( Function ) );

			let freeResources:FreeResources = FreeResources.create( { $registry: $context.registry } );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( freeResources ) );

			interface My {
				myProperty:string;
			}

			let myFreeResources:FreeResources & My = FreeResources.createFrom( { myProperty: "The property", $registry: $context.registry } );
			expect( myFreeResources ).toBeTruthy();
			expect( FreeResources.isDecorated( myFreeResources ) );
			expect( myFreeResources.myProperty ).toBeDefined();
			expect( myFreeResources.myProperty ).toBe( "The property" );
		} );

	} );

	describe( property(
		STATIC,
		"FreeResources",
		"CarbonLDP.FreeResourcesFactory",
		"Constant that implements the `CarbonLDP.FreeResourcesFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( FreeResources ).toBeDefined();
			expect( FreeResources ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
