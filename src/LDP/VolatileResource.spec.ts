import { anyThatMatches } from "../../test/helpers/jasmine/equalities";

import { Resource } from "../Resource/Resource";

import {
	extendsClass,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";

import { C } from "../Vocabularies/C";

import * as Utils from "./../Utils";

import { VolatileResource } from "./VolatileResource";


describe( module( "carbonldp/LDP/VolatileResource" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.VolatileResource",
		"Interface that represents a free resource, i.e. a dynamic generated resource that does not have a persisted form."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource" ), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.VolatileResourceFactory",
		"Interface with the factory, decorate an utils methods for `CarbonLDP.LDP.VolatileResource` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		describe( hasMethod( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Return true if the object provided is considered a `CarbonLDP.LDP.VolatileResource` object.", [
					{ name: "value", type: "any", description: "Object to check." },
				],
				{ type: "value is CarbonLDP.LDP.VolatileResource" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( VolatileResource.is ).toBeDefined();
				expect( VolatileResource.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientResource:jasmine.Spy;
			let mockObject:jasmine.SpyObj<Resource>;
			beforeEach( ():void => {
				isTransientResource = spyOn( Resource, "is" )
					.and.returnValue( true );
				mockObject = jasmine.createSpyObj( {
					$hasType: true,
				} );
			} );

			it( "should be a TransientResource", () => {
				VolatileResource.is( mockObject );
				expect( isTransientResource ).toHaveBeenCalledWith( mockObject );
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

		describe( hasMethod( OBLIGATORY, "create" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates empty `CarbonLDP.LDP.VolatileResource` object.", [
					{ name: "data", type: "T", optional: true },
				],
				{ type: "T & CarbonLDP.LDP.VolatileResource" }
			), ():void => {} );

			it( "should exists", ():void => {
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

		describe( hasMethod( OBLIGATORY, "createFrom" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates a `CarbonLDP.LDP.VolatileResource` object from the object specified.", [
					{ name: "object", type: "T" },
				],
				{ type: "T & CarbonLDP.LDP.VolatileResource" }
			), ():void => {} );

			it( "should exists", ():void => {
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

	describe( property(
		STATIC,
		"VolatileResource",
		"CarbonLDP.LDP.VolatileResourceFactory",
		"Constant that implements the `CarbonLDP.LDP.VolatileResourceFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( VolatileResource ).toBeDefined();
			expect( VolatileResource ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "VolatileResource.TYPE", ():void => {
			expect( VolatileResource.TYPE ).toBeDefined();
			expect( Utils.isString( VolatileResource.TYPE ) ).toBe( true );

			expect( VolatileResource.TYPE ).toBe( C.VolatileResource );
		} );

		// TODO: Separate in different tests
		it( "VolatileResource.SCHEMA", ():void => {
			expect( VolatileResource.is ).toBeDefined();
			expect( Utils.isFunction( VolatileResource.is ) ).toBe( true );

			let object:Object = void 0;
			expect( VolatileResource.is( object ) ).toBe( false );
			object = null;
			expect( VolatileResource.is( object ) ).toBe( false );
			object = {};
			expect( VolatileResource.is( object ) ).toBe( false );

			Resource.decorate( object );
			expect( VolatileResource.is( object ) ).toBe( false );

			object[ "types" ].push( C.VolatileResource );
			expect( VolatileResource.is( object ) ).toBe( true );
		} );

	} );

} );
