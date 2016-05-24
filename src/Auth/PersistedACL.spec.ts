import {module, isDefined, clazz, hasProperty, STATIC, hasMethod} from "../test/JasmineExtender";

import Documents from "../Documents";
import * as NS from "./../NS";
import * as PersistedDocument from "./../PersistedDocument";
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

		expect( Utils.hasProperty( ACL.SCHEMA, "accessControlEntries" ) ).toBe( true );
		expect( ACL.SCHEMA[ "accessControlEntries" ] ).toEqual({
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
				accessControlEntries: null,
				accessTo: null,
				inheritableEntries: null,
			};
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.accessTo;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.accessTo = null;

			delete object.accessControlEntries;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.accessControlEntries = null;

			delete object.inheritableEntries;
			expect( ACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.inheritableEntries = null;
		});

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorate the object with the properties and methods o a `Carbon.Auth.ACL.Class` object.", [
				{ name: "document", type: "T extends Carbon.PersistedDocument.Class", description: "The persisted document to decorate." }
			],
			{ type: "T & Carbon.Auth.ACl.Class" }
		), ():void => {
			expect( ACL.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( ACL.Factory.decorate ) ).toBe( true );
			
			let document:PersistedDocument.Class = PersistedDocument.Factory.create( "", new Documents() );
			let acl:ACL.Class = ACL.Factory.decorate( document );


		});

	});

});
