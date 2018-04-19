import { TransientDocument } from "../TransientDocument";
import * as Errors from "../Errors";
import { Pointer } from "../Pointer";
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
import { LDP } from "../Vocabularies/LDP";

import { TransientDirectContainer } from "./TransientDirectContainer";

describe( module( "carbonldp/LDP/TransientDirectContainer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.TransientDirectContainer",
		"Interface that represents an `ldp:DirectContainer`."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"membershipResource",
			"CarbonLDP.Pointer",
			"Pointer that references the document that the direct container belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMembershipRelation",
			"CarbonLDP.Pointer",
			"Pointer that reference to the property the direct container manages."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.TransientDirectContainerFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.LDP.TransientDirectContainer`"
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.LDP.TransientDirectContainer` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.LDP.TransientDirectContainer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `CarbonLDP.LDP.TransientDirectContainer` object with the parameters specified.", [
				{ name: "membershipResource", type: "CarbonLDP.Pointer" },
				{ name: "hasMemberRelation", type: "string | CarbonLDP.Pointer" },
				{ name: "isMemberOfRelation", type: "string | CarbonLDP.Pointer", optional: true },
			],
			{ type: "CarbonLDP.LDP.TransientDirectContainer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.LDP.TransientDirectContainer` object with the object provided and the parameters specified.", [
				{ name: "object", type: "T" },
				{ name: "membershipResource", type: "CarbonLDP.Pointer" },
				{ name: "hasMemberRelation", type: "string | CarbonLDP.Pointer" },
				{ name: "isMemberOfRelation", type: "string | CarbonLDP.Pointer", optional: true },
			],
			{ type: "T & CarbonLDP.LDP.TransientDirectContainer" }
		), ():void => {} );

	} );

	describe( property( STATIC, "TransientDirectContainer", "CarbonLDP.LDP.TransientDirectContainerFactory", "Constant that implements the `CarbonLDP.LDP.TransientDirectContainerFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( TransientDirectContainer ).toBeDefined();
			expect( TransientDirectContainer ).toEqual( jasmine.any( Object ) );
		} );

		describe( "TransientDirectContainer.TYPE", ():void => {

			it( "should exist", ():void => {
				expect( TransientDirectContainer.TYPE ).toBeDefined();
				expect( TransientDirectContainer.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be `ldp:TransientDirectContainer`", ():void => {
				expect( TransientDirectContainer.TYPE ).toBe( LDP.DirectContainer );
			} );

		} );

		// TODO: Separate in different tests
		it( "TransientDirectContainer.is", ():void => {
			expect( TransientDirectContainer.is ).toBeDefined();
			expect( TransientDirectContainer.is ).toEqual( jasmine.any( Function ) );

			let object:any;

			object = {};
			expect( TransientDirectContainer.is( object ) ).toBe( false );
			object.membershipResource = "http://example.com/myNamespace#some-relation";
			expect( TransientDirectContainer.is( object ) ).toBe( false );
			object.types = [ LDP.DirectContainer ];
			expect( TransientDirectContainer.is( object ) ).toBe( false );

			object = TransientDocument.create();
			expect( TransientDirectContainer.is( object ) ).toBe( false );
			object.membershipResource = "http://example.com/myNamespace#some-relation";
			expect( TransientDirectContainer.is( object ) ).toBe( false );
			object.types.push( LDP.DirectContainer );
			expect( TransientDirectContainer.is( object ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "TransientDirectContainer.create", ():void => {
			expect( TransientDirectContainer.create ).toBeDefined();
			expect( TransientDirectContainer.create ).toEqual( jasmine.any( Function ) );

			let spy:jasmine.Spy = spyOn( TransientDirectContainer, "createFrom" );
			let pointer:Pointer = Pointer.create();

			TransientDirectContainer.create( pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			TransientDirectContainer.create( pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			TransientDirectContainer.create( pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			TransientDirectContainer.create( pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

		// TODO: Separate in different tests
		it( "TransientDirectContainer.createFrom", ():void => {
			expect( TransientDirectContainer.createFrom ).toBeDefined();
			expect( TransientDirectContainer.createFrom ).toEqual( jasmine.any( Function ) );

			interface TheDirectContainer {
				myProperty?:string;
			}

			interface MyDirectContainer extends TransientDirectContainer, TheDirectContainer {}

			let membershipResource:Pointer = Pointer.create( "http://example.com/theResource/" );
			let hasMemberRelation:Pointer = Pointer.create( "http://example.com/myNamespace#some-relation" );
			let isMemberOfRelation:Pointer = Pointer.create( "http://example.com/myNamespace#some-inverted-relation" );

			let directContainer:MyDirectContainer;

			directContainer = TransientDirectContainer.createFrom( {}, membershipResource, "http://example.com/myNamespace#some-relation" );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom( {}, membershipResource, hasMemberRelation );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom( {}, membershipResource, "http://example.com/myNamespace#some-relation", "http://example.com/myNamesape#some-inverted-relation" );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			expect( directContainer.isMemberOfRelation as any as string ).toEqual( "http://example.com/myNamesape#some-inverted-relation" );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom( {}, membershipResource, hasMemberRelation, "http://example.com/myNamesape#some-inverted-relation" );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation as any as string ).toEqual( "http://example.com/myNamesape#some-inverted-relation" );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBe( isMemberOfRelation );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, "http://example.com/myNamespace#some-relation" );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, hasMemberRelation );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, "http://example.com/myNamespace#some-relation", "http://example.com/myNamesape#some-inverted-relation" );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			expect( directContainer.isMemberOfRelation as any as string ).toEqual( "http://example.com/myNamesape#some-inverted-relation" );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, hasMemberRelation, "http://example.com/myNamesape#some-inverted-relation" );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation as any as string ).toEqual( "http://example.com/myNamesape#some-inverted-relation" );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = TransientDirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, hasMemberRelation, isMemberOfRelation );
			expect( TransientDirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBe( isMemberOfRelation );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			expect( () => TransientDirectContainer.createFrom( directContainer, membershipResource, hasMemberRelation ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => TransientDirectContainer.createFrom( {}, null, hasMemberRelation ) ).toThrowError( Errors.IllegalArgumentError );
		} );

	} );

} );
