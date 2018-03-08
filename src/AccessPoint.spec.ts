import { AccessPoint } from "./AccessPoint";

import { DirectContainer } from "./LDP/DirectContainer";
import { Pointer } from "./Pointer";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "./test/JasmineExtender";
import { C } from "./Vocabularies/C";

describe( module( "carbonldp/AccessPoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.AccessPoint.AccessPointBase",
		"Interface that represents the basic properties to construct a `CarbonLDP.AccessPoint.AccessPoint`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"string | CarbonLDP.Pointer.Pointer",
			"The string URI or pointer URI that represents the member relation that the access point will manage."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"string | CarbonLDP.Pointer.Pointer",
			"The string URI or pointer URI that represents the inverted relation that the access point will create."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"string | CarbonLDP.Pointer.Pointer",
			"The string URI or pointer URI that represents the inserted content relation of the access point."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.AccessPoint.AccessPoint",
		"Interface that represents the document of an in-memory access point."
	), ():void => {

		it( extendsClass( "CarbonLDP.LDP.DirectContainer" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"CarbonLDP.Pointer.Pointer",
			"Pointer that represents the member relation that the access point will manage."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer.Pointer",
			"Pointer that represents the inverted relation that the access point will create."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"CarbonLDP.Pointer.Pointer",
			"Pointer that represents the inserted content relation of the access point."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.AccessPoint.AccessPointFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.AccessPoint.AccessPoint` object."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.AccessPoint.AccessPoint` object", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.AccessPoint.AccessPoint" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `CarbonLDP.AccessPoint.AccessPoint` object with the parameters specified.", [
				{ name: "membershipResource", type: "CarbonLDP.Pointer.Pointer", description: "A Pointer to the parent of the AccessPoint." },
				{ name: "hasMemberRelation", type: "string | CarbonLDP.Pointer.Pointer", description: "A URI or Pointer to the property in the parent resource managed by the AccessPoint." },
				{ name: "isMemberOfRelation", type: "string | CarbonLDP.Pointer.Pointer", optional: true, description: "A URI or Pointer to the property managed in the members added by the AccessPoint." },
			],
			{ type: "CarbonLDP.AccessPoint.AccessPoint" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.AccessPoint.AccessPoint` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object that will be converted into an AccessPoint." },
				{ name: "membershipResource", type: "CarbonLDP.Pointer.Pointer", description: "A Pointer to the parent of the AccessPoint." },
				{ name: "hasMemberRelation", type: "string | CarbonLDP.Pointer.Pointer", description: "A URI or Pointer to the property in the parent resource managed by the AccessPoint." },
				{ name: "isMemberOfRelation", type: "string | CarbonLDP.Pointer.Pointer", optional: true, description: "A URI or Pointer to the property managed in the members added by the AccessPoint." },
			],
			{ type: "T & CarbonLDP.AccessPoint.AccessPoint" }
		), ():void => {} );

	} );

	describe( property( STATIC, "AccessPoint", "CarbonLDP.AccessPoint.AccessPointFactory", "Constant that implements the `CarbonLDP.AccessPoint.AccessPoint` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( AccessPoint ).toBeDefined();
			expect( AccessPoint ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "AccessPoint.TYPE", ():void => {
			expect( AccessPoint.TYPE ).toBeDefined();
			expect( AccessPoint.TYPE ).toEqual( jasmine.any( String ) );

			expect( AccessPoint.TYPE ).toBe( C.AccessPoint );
		} );

		// TODO: Test `AccessPoint.is`

		// TODO: Separate in different tests
		it( "AccessPoint.create", ():void => {
			expect( AccessPoint.create ).toBeDefined();
			expect( AccessPoint.create ).toEqual( jasmine.any( Function ) );

			let spy:jasmine.Spy = spyOn( AccessPoint, "createFrom" );
			let pointer:Pointer = Pointer.create();

			AccessPoint.create( pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			AccessPoint.create( pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			AccessPoint.create( pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			AccessPoint.create( pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

		// TODO: Separate in different tests
		it( "AccessPoint.createFrom", ():void => {
			expect( AccessPoint.createFrom ).toBeDefined();
			expect( AccessPoint.createFrom ).toEqual( jasmine.any( Function ) );

			let spy:jasmine.Spy = spyOn( DirectContainer, "createFrom" );
			let pointer:Pointer = Pointer.create();

			AccessPoint.createFrom( {}, pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			AccessPoint.createFrom( {}, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			AccessPoint.createFrom( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			AccessPoint.createFrom( {}, pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

	} );

} );
