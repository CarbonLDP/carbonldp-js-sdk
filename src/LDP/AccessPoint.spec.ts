/// <reference path="../../typings/typings.d.ts" />

import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty,
	hasMethod
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";

import * as AccessPoint from "./AccessPoint";

describe( module( "Carbon/LDP/AccessPoint" ), ():void => {

	it( isDefined(), ():void => {
		expect( AccessPoint ).toBeDefined();
		expect( Utils.isObject( AccessPoint ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_CLASS",
		"string"
	), ():void => {
		expect( AccessPoint.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( AccessPoint.RDF_CLASS ) ).toBe( true );

		expect( AccessPoint.RDF_CLASS ).toBe( NS.C.Class.AccessPoint );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( AccessPoint.SCHEMA ).toBeDefined();
		expect( Utils.isObject( AccessPoint.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( AccessPoint.SCHEMA, "membershipResource" ) ).toBe( true );
		expect( AccessPoint.SCHEMA[ "membershipResource" ] ).toEqual({
			"@id": NS.LDP.Predicate.membershipResource,
			"@type": "@id"
		});
	});

	describe( clazz(
		"Carbon.LDP.AccessPoint.Factory",
		"Factory class for AccessPoint objects"
	), ():void => {

		it( isDefined(), ():void => {
			expect( AccessPoint.Factory ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object has the properties to be defined as a AccessPoint", [
				{ name: "resource", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( AccessPoint.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory.hasClassProperties ) ).toBe( true );

			let object:any;

			object = {
				membershipResource: Pointer.Factory.create( "http://example.com/resource/parentResource/" )
			};
			expect( AccessPoint.Factory.hasClassProperties( object ) ).toBe( true );
			object = {
				membershipResource: Pointer.Factory.create( "http://example.com/resource/parentResource/" ),
				hasMemberRelation: Pointer.Factory.create( "http://example.com/ns#membersRelation/" )
			};
			expect( AccessPoint.Factory.hasClassProperties( object ) ).toBe( true );

			object = {
				hasMemberRelation: Pointer.Factory.create( "http://example.com/ns#membersRelation/" )
			};
			expect( AccessPoint.Factory.hasClassProperties( object ) ).toBe( false );
			expect( AccessPoint.Factory.hasClassProperties( {} ) ).toBe( false );
			expect( AccessPoint.Factory.hasClassProperties( null ) ).toBe( false );
			expect( AccessPoint.Factory.hasClassProperties( undefined ) ).toBe( false );
		});

	});

});