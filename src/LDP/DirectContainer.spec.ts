import * as Errors from "../Errors";
import { Pointer } from "../Pointer";
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

import { LDP } from "../Vocabularies/LDP";
import { Document } from "./../Document";

import DefaultExport, { DirectContainer } from "./DirectContainer";

describe( module( "carbonldp/LDP/DirectContainer" ), ():void => {

	describe( interfaze(
		"CarbonLDP.LDP.DirectContainer.DirectContainer",
		"Interface that represents an `ldp:DirectContainer`."
	), ():void => {

		it( extendsClass( "CarbonLDP.Document.Document" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"membershipResource",
			"CarbonLDP.Pointer.Pointer",
			"Pointer that references the document that the direct container belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMembershipRelation",
			"CarbonLDP.Pointer.Pointer",
			"Pointer that reference to the property the direct container manages."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.LDP.DirectContainer.DirectContainerFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.LDP.DirectContainer.DirectContainer`"
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"TYPE",
			"string"
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.LDP.DirectContainer.DirectContainer` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.LDP.DirectContainer.DirectContainer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates a `CarbonLDP.LDP.DirectContainer.DirectContainer` object with the parameters specified.", [
				{ name: "membershipResource", type: "CarbonLDP.Pointer.Pointer" },
				{ name: "hasMemberRelation", type: "string | CarbonLDP.Pointer.Pointer" },
				{ name: "isMemberOfRelation", type: "string | CarbonLDP.Pointer.Pointer", optional: true },
			],
			{ type: "CarbonLDP.LDP.DirectContainer.DirectContainer" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a `CarbonLDP.LDP.DirectContainer.DirectContainer` object with the object provided and the parameters specified.", [
				{ name: "object", type: "T" },
				{ name: "membershipResource", type: "CarbonLDP.Pointer.Pointer" },
				{ name: "hasMemberRelation", type: "string | CarbonLDP.Pointer.Pointer" },
				{ name: "isMemberOfRelation", type: "string | CarbonLDP.Pointer.Pointer", optional: true },
			],
			{ type: "T & CarbonLDP.LDP.DirectContainer.DirectContainer" }
		), ():void => {} );

	} );

	describe( property( STATIC, "DirectContainer", "CarbonLDP.LDP.DirectContainer.DirectContainerFactory", "Constant that implements the `CarbonLDP.LDP.DirectContainer.DirectContainerFactory` interface." ), ():void => {

		it( isDefined(), ():void => {
			expect( DirectContainer ).toBeDefined();
			expect( DirectContainer ).toEqual( jasmine.any( Object ) );
		} );

		describe( "DirectContainer.TYPE", ():void => {

			it( "should exist", ():void => {
				expect( DirectContainer.TYPE ).toBeDefined();
				expect( DirectContainer.TYPE ).toEqual( jasmine.any( String ) );
			} );

			it( "should be `ldp:DirectContainer`", ():void => {
				expect( DirectContainer.TYPE ).toBe( LDP.DirectContainer );
			} );

		} );

		// TODO: Separate in different tests
		it( "DirectContainer.is", ():void => {
			expect( DirectContainer.is ).toBeDefined();
			expect( DirectContainer.is ).toEqual( jasmine.any( Function ) );

			let object:any;

			object = {};
			expect( DirectContainer.is( object ) ).toBe( false );
			object.membershipResource = "http://example.com/myNamespace#some-relation";
			expect( DirectContainer.is( object ) ).toBe( false );
			object.types = [ LDP.DirectContainer ];
			expect( DirectContainer.is( object ) ).toBe( false );

			object = Document.create();
			expect( DirectContainer.is( object ) ).toBe( false );
			object.membershipResource = "http://example.com/myNamespace#some-relation";
			expect( DirectContainer.is( object ) ).toBe( false );
			object.types.push( LDP.DirectContainer );
			expect( DirectContainer.is( object ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "DirectContainer.create", ():void => {
			expect( DirectContainer.create ).toBeDefined();
			expect( DirectContainer.create ).toEqual( jasmine.any( Function ) );

			let spy:jasmine.Spy = spyOn( DirectContainer, "createFrom" );
			let pointer:Pointer = Pointer.create();

			DirectContainer.create( pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			DirectContainer.create( pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			DirectContainer.create( pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			DirectContainer.create( pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

		// TODO: Separate in different tests
		it( "DirectContainer.createFrom", ():void => {
			expect( DirectContainer.createFrom ).toBeDefined();
			expect( DirectContainer.createFrom ).toEqual( jasmine.any( Function ) );

			interface TheDirectContainer {
				myProperty?:string;
			}

			interface MyDirectContainer extends DirectContainer, TheDirectContainer {}

			let membershipResource:Pointer = Pointer.create( "http://example.com/theResource/" );
			let hasMemberRelation:Pointer = Pointer.create( "http://example.com/myNamespace#some-relation" );
			let isMemberOfRelation:Pointer = Pointer.create( "http://example.com/myNamespace#some-inverted-relation" );

			let directContainer:MyDirectContainer;

			directContainer = DirectContainer.createFrom( {}, membershipResource, "http://example.com/myNamespace#some-relation" );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom( {}, membershipResource, hasMemberRelation );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom( {}, membershipResource, "http://example.com/myNamespace#some-relation", "http://example.com/myNamesape#some-inverted-relation" );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			expect( directContainer.isMemberOfRelation as any as string ).toEqual( "http://example.com/myNamesape#some-inverted-relation" );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom( {}, membershipResource, hasMemberRelation, "http://example.com/myNamesape#some-inverted-relation" );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation as any as string ).toEqual( "http://example.com/myNamesape#some-inverted-relation" );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBe( isMemberOfRelation );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, "http://example.com/myNamespace#some-relation" );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, hasMemberRelation );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, "http://example.com/myNamespace#some-relation", "http://example.com/myNamesape#some-inverted-relation" );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation as any as string ).toEqual( "http://example.com/myNamespace#some-relation" );
			expect( directContainer.isMemberOfRelation as any as string ).toEqual( "http://example.com/myNamesape#some-inverted-relation" );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, hasMemberRelation, "http://example.com/myNamesape#some-inverted-relation" );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation as any as string ).toEqual( "http://example.com/myNamesape#some-inverted-relation" );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			directContainer = DirectContainer.createFrom<TheDirectContainer>( { myProperty: "The property" }, membershipResource, hasMemberRelation, isMemberOfRelation );
			expect( DirectContainer.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBe( isMemberOfRelation );
			expect( directContainer.types ).toContain( LDP.DirectContainer );

			expect( () => DirectContainer.createFrom( directContainer, membershipResource, hasMemberRelation ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => DirectContainer.createFrom( {}, null, hasMemberRelation ) ).toThrowError( Errors.IllegalArgumentError );
		} );

	} );

	it( hasDefaultExport( "CarbonLDP.LDP.DirectContainer.DirectContainer" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:DirectContainer;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
