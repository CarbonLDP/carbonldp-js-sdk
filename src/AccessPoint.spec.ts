import * as AccessPoint from "./AccessPoint";

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	hasProperty
} from "./test/JasmineExtender";
import * as Utils from "./Utils";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as DirectContainer from "./LDP/DirectContainer";

describe( module( "Carbon/AccessPoints" ), ():void => {

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

		expect( AccessPoint.RDF_CLASS ).toBe( NS.C.Class.AccessPoint );
	} );

	describe( clazz(
		"Carbon.AccessPoint.Factory",
		"Factory class for `Carbon.AccessPoint.Class` objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( AccessPoint.Factory ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a `Carbon.AccessPoint.Class` object with the parameters specified.", [
				{name: "membershipResource", type: "Carbon.Pointer.Class"},
				{name: "hasMemberRelation", type: "string | Carbon.Pointer.Class"},
				{name: "isMemberOfRelation", type: "string | Carbon.Pointer.Class", optional: true}
			],
			{type: "Carbon.AccessPoint.Class"}
		), ():void => {
			expect( AccessPoint.Factory.create ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory.create ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( AccessPoint.Factory, "createFrom" );
			let pointer:Pointer.Class = Pointer.Factory.create();

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
			"Create a `Carbon.AccessPoint.Class` object with the object provided.", [
				{name: "object", type: "T"},
				{name: "membershipResource", type: "Carbon.Pointer.Class"},
				{name: "hasMemberRelation", type: "string | Carbon.Pointer.Class"},
				{name: "isMemberOfRelation", type: "string | Carbon.Pointer.Class", optional: true}
			],
			{type: "T & Carbon.AccessPoint.Class"}
		), ():void => {
			expect( AccessPoint.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory.createFrom ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( DirectContainer.Factory, "createFrom" );
			let pointer:Pointer.Class = Pointer.Factory.create();

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