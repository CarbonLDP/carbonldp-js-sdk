import * as DirectContainer from "./DirectContainer";

import {
	STATIC,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasProperty,
	hasSignature
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as NS from "./../NS";
import * as Errors from "./../Errors";
import * as Pointer from "./../Pointer";
import * as Document from "./../Document";

describe( module( "Carbon/LDP/DirectContainer" ), ():void => {

	it( isDefined(), ():void => {
		expect( DirectContainer ).toBeDefined();
		expect( Utils.isObject( DirectContainer ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( DirectContainer.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( DirectContainer.RDF_CLASS ) ).toBe( true );

		expect( DirectContainer.RDF_CLASS ).toBe( NS.LDP.Class.DirectContainer );
	} );

	describe( clazz(
		"Carbon.DirectContainer.Factory",
		"Factory class for `Carbon.LDP.DirectContainer.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( DirectContainer.Factory ).toBeDefined();
			expect( Utils.isFunction( DirectContainer.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.LDP.DirectContainer.Class` object", [
				{name: "resource", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( DirectContainer.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( DirectContainer.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( DirectContainer.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				membershipResource: null,
			};
			expect( DirectContainer.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.membershipResource;
			expect( DirectContainer.Factory.hasClassProperties( object ) ).toBe( false );
			object.membershipResource = null;
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered as an `Carbon.LDP.DirectContainer.Class` object", [
				{name: "object", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( DirectContainer.Factory.is ).toBeDefined();
			expect( Utils.isFunction( DirectContainer.Factory.is ) ).toBe( true );

			let object:any;

			object = {};
			expect( DirectContainer.Factory.is( object ) ).toBe( false );
			object.membershipResource = "http://example.com/myNamespace#some-relation";
			expect( DirectContainer.Factory.is( object ) ).toBe( false );
			object.types = [ NS.LDP.Class.DirectContainer ];
			expect( DirectContainer.Factory.is( object ) ).toBe( false );

			object = Document.Factory.create();
			expect( DirectContainer.Factory.is( object ) ).toBe( false );
			object.membershipResource = "http://example.com/myNamespace#some-relation";
			expect( DirectContainer.Factory.is( object ) ).toBe( false );
			object.types.push( NS.LDP.Class.DirectContainer );
			expect( DirectContainer.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a `Carbon.LDP.DirectContainer.Class` object with the parameters specified.", [
				{name: "membershipResource", type: "Carbon.Pointer.Class"},
				{name: "hasMemberRelation", type: "string | Carbon.Pointer.Class"},
				{name: "isMemberOfRelation", type: "string | Carbon.Pointer.Class", optional: true}
			],
			{type: "Carbon.LDP.DirectContainer.Class"}
		), ():void => {
			expect( DirectContainer.Factory.create ).toBeDefined();
			expect( Utils.isFunction( DirectContainer.Factory.create ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( DirectContainer.Factory, "createFrom" );
			let pointer:Pointer.Class = Pointer.Factory.create();

			DirectContainer.Factory.create( pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			DirectContainer.Factory.create( pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			DirectContainer.Factory.create( pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			DirectContainer.Factory.create( pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Create a `Carbon.LDP.DirectContainer.Class` object with the object provided and the parameters specified.", [
				{name: "object", type: "T"},
				{name: "membershipResource", type: "Carbon.Pointer.Class"},
				{name: "hasMemberRelation", type: "string | Carbon.Pointer.Class"},
				{name: "isMemberOfRelation", type: "string | Carbon.Pointer.Class", optional: true}
			],
			{type: "T & Carbon.LDP.DirectContainer.Class"}
		), ():void => {
			expect( DirectContainer.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( DirectContainer.Factory.createFrom ) ).toBe( true );

			interface TheDirectContainer {
				myProperty?:string;
			}
			interface MyDirectContainer extends DirectContainer.Class, TheDirectContainer {}

			let membershipResource:Pointer.Class = Pointer.Factory.create( "http://example.com/theResource/" );
			let hasMemberRelation:Pointer.Class = Pointer.Factory.create( "http://example.com/myNamespace#some-relation" );
			let isMemberOfRelation:Pointer.Class = Pointer.Factory.create( "http://example.com/myNamespace#some-inverted-relation" );

			let directContainer:MyDirectContainer;

			directContainer = DirectContainer.Factory.createFrom( {}, membershipResource, "http://example.com/myNamespace#some-relation" );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toEqual( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom( {}, membershipResource, hasMemberRelation );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom( {}, membershipResource, "http://example.com/myNamespace#some-relation", "http://example.com/myNamesape#some-inverted-relation" );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toEqual( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toEqual( isMemberOfRelation );
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom( {}, membershipResource, hasMemberRelation, "http://example.com/myNamesape#some-inverted-relation" );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toEqual( isMemberOfRelation );
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBeUndefined();
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBe( isMemberOfRelation );
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom<TheDirectContainer>( {myProperty: "The property"}, membershipResource, "http://example.com/myNamespace#some-relation" );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toEqual( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom<TheDirectContainer>( {myProperty: "The property"}, membershipResource, hasMemberRelation );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBeUndefined();
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom<TheDirectContainer>( {myProperty: "The property"}, membershipResource, "http://example.com/myNamespace#some-relation", "http://example.com/myNamesape#some-inverted-relation" );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toEqual( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toEqual( isMemberOfRelation );
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom<TheDirectContainer>( {myProperty: "The property"}, membershipResource, hasMemberRelation, "http://example.com/myNamesape#some-inverted-relation" );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toEqual( isMemberOfRelation );
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			directContainer = DirectContainer.Factory.createFrom<TheDirectContainer>( {myProperty: "The property"}, membershipResource, hasMemberRelation, isMemberOfRelation );
			expect( DirectContainer.Factory.is( directContainer ) ).toBe( true );
			expect( directContainer.myProperty ).toBe( "The property" );
			expect( directContainer.membershipResource ).toBe( membershipResource );
			expect( directContainer.hasMemberRelation ).toBe( hasMemberRelation );
			expect( directContainer.isMemberOfRelation ).toBe( isMemberOfRelation );
			expect( directContainer.types ).toContain( NS.LDP.Class.DirectContainer );

			expect( () => DirectContainer.Factory.createFrom( directContainer, membershipResource, hasMemberRelation ) ).toThrowError( Errors.IllegalArgumentError );
			expect( () => DirectContainer.Factory.createFrom( {}, null, hasMemberRelation ) ).toThrowError( Errors.IllegalArgumentError );
		} );

	} );

} );