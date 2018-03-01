import { Resource } from "../Resource";
import {
	extendsClass,
	hasDefaultExport,
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

import DefaultExport, { VolatileResource } from "./VolatileResource";

describe( module( "Carbon/LDP/VolatileResource" ), ():void => {

	describe( interfaze(
		"Carbon.LDP.VolatileResource.VolatileResource",
		"Interface that represents a free resource, i.e. a dynamic generated resource that does not have a persisted form."
	), ():void => {

		it( extendsClass( "Carbon.Resource.Resource" ), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.LDP.VolatileResource.VolatileResourceFactory",
		"Interface with the factory, decorate an utils methods for `Carbon.LDP.VolatileResource.VolatileResource` objects."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Return true if the object provided is considered a `Carbon.LDP.VolatileResource.VolatileResource` object.", [
				{ name: "object", type: "object", description: "Object to check." },
			],
			{ type: "object is Carbon.LDP.VolatileResource.VolatileResource" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"VolatileResource",
		"Carbon.LDP.VolatileResourceFactory",
		"Constant that implements the `Carbon.LDP.VolatileResource.VolatileResourceFactory` interface."
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

	it( hasDefaultExport( "Carbon.LDP.VolatileResource.VolatileResource" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:VolatileResource;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
