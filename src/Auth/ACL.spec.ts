import {module, isDefined, clazz, hasProperty, STATIC, hasMethod} from "../test/JasmineExtender";

import * as NS from "./../NS";
import * as Utils from "./../Utils";

import * as ACL from "./ACL";

describe( module( "Carbon/Auth/ACL" ), ():void => {

	it( isDefined(), ():void => {
		expect( ACL ).toBeDefined();
		expect( Utils.isObject( ACL ) ).toBe( true );
	});

	it( hasProperty(
		STATIC,
		"RDF_Class",
		"string"
	), ():void => {
		expect( ACL.RDF_CLASS ).toBeDefined();
		expect( Utils.isString( ACL.RDF_CLASS ) ).toBe( true );

		expect( ACL.RDF_CLASS ).toBe( NS.CS.Class.AccessControlList );
	});

	it( hasProperty(
		STATIC,
		"SCHEMA",
		"Carbon.ObjectSchema.Class"
	), ():void => {
		expect( ACL.SCHEMA ).toBeDefined();
		expect( Utils.isObject( ACL.SCHEMA ) ).toBe( true );

		expect( Utils.hasProperty( ACL.SCHEMA, "entries" ) ).toBe( true );
		expect( ACL.SCHEMA[ "entries" ] ).toEqual({
			"@id": NS.CS.Predicate.accessControlEntry,
			"@type": "@id",
			"@container": "@set",
		});

		expect( Utils.hasProperty( ACL.SCHEMA, "accessTo" ) ).toBe( true );
		expect( ACL.SCHEMA[ "accessTo" ] ).toEqual({
			"@id": NS.CS.Predicate.accessTo,
			"@type": "@id",
		});

		expect( Utils.hasProperty( ACL.SCHEMA, "inheritableEntries" ) ).toBe( true );
		expect( ACL.SCHEMA[ "inheritableEntries" ] ).toEqual({
			"@id": NS.CS.Predicate.inheritableEntry,
			"@type": "@id",
			"@container": "@set",
		});
	});

	describe( clazz( "Carbon.Auth.ACL.Factory", "Factory class for `Carbon.Auth.ACL.Class` objects."), ():void => {

		it( isDefined(), ():void => {
			expect( ACL.Factory ).toBeDefined();
			expect( Utils.isFunction( ACL.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Return true if the object provided has the properties and methods of a `Carbon.Auth.ACL.Class` object.", [
				{ name: "object", type: "Object", description: "The object to analise." }
			],
			{ type: "boolean" }
		), ():void => {
			expect( ACL.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( ACL.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				entries: null,
				accessTo: null,
				inheritableEntries: null,
			};
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.accessTo;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.accessTo = null;

			delete object.entries;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.entries = null;

			delete object.inheritableEntries;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.inheritableEntries = null;
		});

	});

});
