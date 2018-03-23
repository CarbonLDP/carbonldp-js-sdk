import { Resource } from "../Resource";
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
		"CarbonLDP.LDP.VolatileResource.VolatileResource",
		"Interface that represents a free resource, i.e. a dynamic generated resource that does not have a persisted form."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource.Resource" ), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.VolatileResource.VolatileResourceFactory",
		"Interface with the factory, decorate an utils methods for `CarbonLDP.LDP.VolatileResource.VolatileResource` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `CarbonLDP.LDP.VolatileResource.VolatileResource` object.", [
				{ name: "object", type: "object", description: "Object to check." },
			],
			{ type: "object is CarbonLDP.LDP.VolatileResource.VolatileResource" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"VolatileResource",
		"CarbonLDP.LDP.VolatileResource.VolatileResourceFactory",
		"Constant that implements the `CarbonLDP.LDP.VolatileResource.VolatileResourceFactory` interface."
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
