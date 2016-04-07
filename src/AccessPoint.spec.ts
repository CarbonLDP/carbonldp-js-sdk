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
			"hasClassProperties",
			"Returns true if the object provided has the properties that defines a `Carbon.AccessPoint.Class` object", [
				{name: "resource", type: "Object"}
			],
			{type: "boolean"}
		), ():void => {
			expect( AccessPoint.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory.hasClassProperties ) ).toBe( true );

			let object:any = {};
			expect( AccessPoint.Factory.hasClassProperties( object ) ).toBe( false );
			object.membershipResource = "http://some-membership-resource.com";
			expect( AccessPoint.Factory.hasClassProperties( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Create a `Carbon.AccessPoint.Class` object with the name and email specified.", [
				{name: "name", type: "string"},
				{name: "email", type: "string"}
			],
			{type: "Carbon.AccessPoint.Class"}
		), ():void => {
			expect( AccessPoint.Factory.create ).toBeDefined();
			expect( Utils.isFunction( AccessPoint.Factory.create ) ).toBe( true );

			let spy = spyOn( AccessPoint.Factory, "createFrom" );

			// TODO
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			"Create a `Carbon.AccessPoint.Class` object with the object provided.", [
				{name: "object", type: "T extends Object"}
			],
			{type: "T & Carbon.AccessPoint.Class"}
		), ():void => {
			// TODO
		} );

	} );

} );