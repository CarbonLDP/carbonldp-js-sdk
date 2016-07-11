import {module, isDefined, clazz, STATIC, hasMethod} from "../test/JasmineExtender";

import * as ACL from "./ACL";
import Documents from "../Documents";
import * as PersistedDocument from "./../PersistedDocument";
import * as Utils from "./../Utils";

import * as PersistedACL from "./PersistedACL";

describe( module( "Carbon/Auth/PersistedACL" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedACL ).toBeDefined();
		expect( Utils.isObject( PersistedACL ) ).toBe( true );
	} );

	describe( clazz( "Carbon.Auth.PersistedACL.Factory", "Factory class for `Carbon.Auth.PersistedACL.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedACL.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Return true if the object provided has the properties and methods of a `Carbon.Auth.PersistedACL.Class` object.", [
				{name: "object", type: "Object", description: "The object to analise."}
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedACL.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				entries: null,
				accessTo: null,
				inheritableEntries: null,
			};
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.accessTo;
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.accessTo = null;

			delete object.entries;
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.entries = null;

			delete object.inheritableEntries;
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.inheritableEntries = null;
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorate the object with the properties and methods of a `Carbon.Auth.PersistedACL.Class` object.", [
				{name: "document", type: "T extends Carbon.PersistedDocument.Class", description: "The persisted document to decorate."}
			],
			{type: "T & Carbon.Auth.PersistedACL.Class"}
		), ():void => {
			expect( PersistedACL.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory.decorate ) ).toBe( true );

			let document:any;

			let spy = spyOn( ACL.Factory, "decorate" );
			let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/some/acl/", new Documents() );
			document[ "accessTo" ] = document.getPointer( "http://example.com/some/" );

			let acl:PersistedACL.Class = PersistedACL.Factory.decorate( document );
			expect( spy ).toHaveBeenCalledTimes( 1 );
		} );

	} );

} );
