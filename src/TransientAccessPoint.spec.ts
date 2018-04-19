import { TransientAccessPoint } from "./TransientAccessPoint";

import { TransientDirectContainer } from "./LDP/TransientDirectContainer";
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

describe( module( "carbonldp/TransientAccessPoint" ), ():void => {

	describe( interfaze(
		"CarbonLDP.AccessPointBase",
		"Interface that represents the basic properties to construct a `CarbonLDP.TransientAccessPoint`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"string | CarbonLDP.Pointer",
			"The string URI or pointer URI that represents the member relation that the access point will manage."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"string | CarbonLDP.Pointer",
			"The string URI or pointer URI that represents the inverted relation that the access point will create."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"string | CarbonLDP.Pointer",
			"The string URI or pointer URI that represents the inserted content relation of the access point."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientAccessPoint",
		"Interface that represents the document of an in-memory access point."
	), ():void => {

		it( extendsClass( "CarbonLDP.LDP.TransientDirectContainer" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"Pointer that represents the member relation that the access point will manage."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"Pointer that represents the inverted relation that the access point will create."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"CarbonLDP.Pointer",
			"Pointer that represents the inserted content relation of the access point."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientAccessPointFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.TransientAccessPointFactory` object."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.TransientAccessPoint` object", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.TransientAccessPoint" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `CarbonLDP.TransientAccessPoint` object with the parameters specified.", [
				{ name: "membershipResource", type: "CarbonLDP.Pointer", description: "A Pointer to the parent of the AccessPoint." },
				{ name: "hasMemberRelation", type: "string | CarbonLDP.Pointer", description: "A URI or Pointer to the property in the parent resource managed by the AccessPoint." },
				{ name: "isMemberOfRelation", type: "string | CarbonLDP.Pointer", optional: true, description: "A URI or Pointer to the property managed in the members added by the AccessPoint." },
			],
			{ type: "CarbonLDP.TransientAccessPoint" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.TransientAccessPoint` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object that will be converted into an AccessPoint." },
				{ name: "membershipResource", type: "CarbonLDP.Pointer", description: "A Pointer to the parent of the AccessPoint." },
				{ name: "hasMemberRelation", type: "string | CarbonLDP.Pointer", description: "A URI or Pointer to the property in the parent resource managed by the AccessPoint." },
				{ name: "isMemberOfRelation", type: "string | CarbonLDP.Pointer", optional: true, description: "A URI or Pointer to the property managed in the members added by the AccessPoint." },
			],
			{ type: "T & CarbonLDP.TransientAccessPoint" }
		), ():void => {} );

	} );

	describe( property( STATIC, "TransientAccessPoint", "CarbonLDP.TransientAccessPointFactory", "Constant that implements the `CarbonLDP.TransientAccessPoint` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( TransientAccessPoint ).toBeDefined();
			expect( TransientAccessPoint ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "TransientAccessPoint.TYPE", ():void => {
			expect( TransientAccessPoint.TYPE ).toBeDefined();
			expect( TransientAccessPoint.TYPE ).toEqual( jasmine.any( String ) );

			expect( TransientAccessPoint.TYPE ).toBe( C.AccessPoint );
		} );

		// TODO: Test `AccessPoint.is`

		// TODO: Separate in different tests
		it( "TransientAccessPoint.create", ():void => {
			expect( TransientAccessPoint.create ).toBeDefined();
			expect( TransientAccessPoint.create ).toEqual( jasmine.any( Function ) );

			let spy:jasmine.Spy = spyOn( TransientAccessPoint, "createFrom" );
			let pointer:Pointer = Pointer.create();

			TransientAccessPoint.create( pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			TransientAccessPoint.create( pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			TransientAccessPoint.create( pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			TransientAccessPoint.create( pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

		// TODO: Separate in different tests
		it( "TransientAccessPoint.createFrom", ():void => {
			expect( TransientAccessPoint.createFrom ).toBeDefined();
			expect( TransientAccessPoint.createFrom ).toEqual( jasmine.any( Function ) );

			let spy:jasmine.Spy = spyOn( TransientDirectContainer, "createFrom" );
			let pointer:Pointer = Pointer.create();

			TransientAccessPoint.createFrom( {}, pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			TransientAccessPoint.createFrom( {}, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			TransientAccessPoint.createFrom( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			TransientAccessPoint.createFrom( {}, pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

	} );

} );
