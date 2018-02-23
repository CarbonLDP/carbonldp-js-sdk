import * as AccessPoint from "./AccessPoint";
import DefaultExport from "./AccessPoint";
import * as DirectContainer from "./LDP/DirectContainer";
import { Pointer } from "./Pointer";
import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import { C } from "./Vocabularies/C";

describe( module( "Carbon/AccessPoint" ), ():void => {

	it( isDefined(), ():void => {
		expect( AccessPoint ).toBeDefined();
		expect( Utils.isObject( AccessPoint ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( AccessPoint.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( AccessPoint.RDF_CLASS ) ).toBe( true );

		expect( AccessPoint.RDF_CLASS ).toBe( C.AccessPoint );
	} );

	describe( interfaze(
		"Carbon.AccessPoint.Class",
		"Interface that represents the basic properties to construct a `Carbon.AccessPoint.DocumentClass`."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"string | Carbon.Pointer.Pointer",
			"The string URI or pointer URI that represents the member relation that the access point will manage."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"string | Carbon.Pointer.Pointer",
			"The string URI or pointer URI that represents the inverted relation that the access point will create."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"string | Carbon.Pointer.Pointer",
			"The string URI or pointer URI that represents the inserted content relation of the access point."
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.AccessPoint.DocumentClass",
		"Interface that represents the document of an in-memory access point."
	), ():void => {

		it( extendsClass( "Carbon.LDP.DirectContainer.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"hasMemberRelation",
			"Carbon.Pointer.Pointer",
			"Pointer that represents the member relation that the access point will manage."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"Carbon.Pointer.Pointer",
			"Pointer that represents the inverted relation that the access point will create."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"Carbon.Pointer.Pointer",
			"Pointer that represents the inserted content relation of the access point."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.AccessPoint.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:AccessPoint.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.AccessPoint.Factory",
		"Factory class for `Carbon.AccessPoint.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( AccessPoint.Factory ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates a `Carbon.AccessPoint.Class` object with the parameters specified.", [
				{ name: "membershipResource", type: "Carbon.Pointer.Pointer", description: "A Pointer to the parent of the AccessPoint." },
				{ name: "hasMemberRelation", type: "string | Carbon.Pointer.Pointer", description: "A URI or Pointer to the property in the parent resource managed by the AccessPoint." },
				{ name: "isMemberOfRelation", type: "string | Carbon.Pointer.Pointer", optional: true, description: "A URI or Pointer to the property managed in the members added by the AccessPoint." },
			],
			{ type: "Carbon.AccessPoint.Class" }
		), ():void => {
			expect( AccessPoint.Factory.create ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory.create ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( AccessPoint.Factory, "createFrom" );
			let pointer:Pointer = Pointer.create();

			AccessPoint.Factory.create( pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			AccessPoint.Factory.create( pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			AccessPoint.Factory.create( pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			AccessPoint.Factory.create( pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a `Carbon.AccessPoint.Class` object from the object and parameters specified.", [
				{ name: "object", type: "T", description: "Object that will be converted into an AccessPoint." },
				{ name: "membershipResource", type: "Carbon.Pointer.Pointer", description: "A Pointer to the parent of the AccessPoint." },
				{ name: "hasMemberRelation", type: "string | Carbon.Pointer.Pointer", description: "A URI or Pointer to the property in the parent resource managed by the AccessPoint." },
				{ name: "isMemberOfRelation", type: "string | Carbon.Pointer.Pointer", optional: true, description: "A URI or Pointer to the property managed in the members added by the AccessPoint." },
			],
			{ type: "T & Carbon.AccessPoint.Class" }
		), ():void => {
			expect( AccessPoint.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory.createFrom ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( DirectContainer.Factory, "createFrom" );
			let pointer:Pointer = Pointer.create();

			AccessPoint.Factory.createFrom( {}, pointer, "http://example.com/myNamespace#some-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", undefined );
			spy.calls.reset();

			AccessPoint.Factory.createFrom( {}, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, undefined );
			spy.calls.reset();

			AccessPoint.Factory.createFrom( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation" );
			spy.calls.reset();

			AccessPoint.Factory.createFrom( {}, pointer, pointer, pointer );
			expect( spy ).toHaveBeenCalledWith( {}, pointer, pointer, pointer );
		} );

	} );

} );
