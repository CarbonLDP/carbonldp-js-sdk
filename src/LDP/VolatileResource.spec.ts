import { TransientResource } from "../TransientResource";
import {
	extendsClass,
	hasMethod,
	hasProperty,
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

		it( extendsClass( "CarbonLDP.TransientResource" ), ():void => {} );

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

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `CarbonLDP.LDP.VolatileResource` object.", [
				{ name: "object", type: "object", description: "Object to check." },
			],
			{ type: "object is CarbonLDP.LDP.VolatileResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates empty `CarbonLDP.LDP.VolatileResource` object.",
			{ type: "CarbonLDP.LDP.VolatileResource" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.LDP.VolatileResource` object from the object specified.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.LDP.VolatileResource" }
		), ():void => {} );

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

			TransientResource.decorate( object );
			expect( VolatileResource.is( object ) ).toBe( false );

			object[ "types" ].push( C.VolatileResource );
			expect( VolatileResource.is( object ) ).toBe( true );
		} );

		// TODO: Test VolatileResource.is
		// TODO: Test VolatileResource.create
		// TODO: Test VolatileResource.createFrom

	} );

} );
