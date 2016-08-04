import {
	INSTANCE,
	STATIC,

	module,
	clazz,

	isDefined,
	hasMethod,
	decoratedObject,
} from "./test/JasmineExtender";
import AbstractContext from "./AbstractContext";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as PersistedACL from "./Auth/PersistedACL";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";

import * as PersistedProtectedDocument from "./PersistedProtectedDocument";

describe( module( "Carbon/PersistedProtectedDocument" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedProtectedDocument ).toBeDefined();
		expect( Utils.isObject( PersistedProtectedDocument ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.PersistedProtectedDocument.Factory",
		"Factory class for `Carbon.PersistedProtectedDocument.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedProtectedDocument.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedProtectedDocument.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided contains the properties and methods of a `Carbon.PersistedProtectedDocument.Class` object.", [
				{name: "object", type: "Object", description: "The object to check."},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedProtectedDocument.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedProtectedDocument.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( PersistedProtectedDocument.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( PersistedProtectedDocument.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.accessControlList;
			expect( PersistedProtectedDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.accessControlList = null;

			delete object.getACL;
			expect( PersistedProtectedDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.getACL = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Carbon.PersistedDocument.Class" ],
			"Decorate the object with the properties and methods of a `Carbon.PersistedProtectedDocument.Class` object.", [
				{name: "document", type: "T", description: "The persisted document to decorate."},
			],
			{type: "T & Carbon.PersistedProtectedDocument.Class"}
		), ():void => {
			expect( PersistedACL.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory.decorate ) ).toBe( true );

			let fn:Function = ():void => {};
			let document:any;
			let protectedDocument:PersistedProtectedDocument.Class;

			document = {
				accessControlList: null,
				getACL: fn,
			};
			protectedDocument = PersistedProtectedDocument.Factory.decorate( document );
			expect( PersistedProtectedDocument.Factory.hasClassProperties( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).toBe( fn );

			document = {
				accessControlList: null,
			};
			protectedDocument = PersistedProtectedDocument.Factory.decorate( document );
			expect( PersistedProtectedDocument.Factory.hasClassProperties( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).not.toBe( fn );
		} );

		describe( decoratedObject(
			"The object decorated by `Carbon.PersistedProtectedDocument.Factory.decorate()` method.", [
				"Carbon.PersistedProtectedDocument.Class",
			]
		), ():void => {
			let protectedDocument:PersistedProtectedDocument.Class;
			let documents:Documents;

			beforeAll( ():void => {
				jasmine.Ajax.install();
			} );

			beforeEach( ():void => {
				class MockContext extends AbstractContext {
					resolve( uri:string ):string { return uri; }
				}
				let context:AbstractContext = new MockContext();
				documents = context.documents;

				let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/resource/", documents );
				protectedDocument = PersistedProtectedDocument.Factory.decorate( document );
				protectedDocument.accessControlList = document.getPointer( "http://example.com/resource/~acl/" );
			} );

			afterAll( ():void => {
				jasmine.Ajax.uninstall();
			} );

			it( hasMethod(
				INSTANCE,
				"getACL",
				"Obtains and resolve the ACL of the actual document.",
				{type: "Promise<[ Carbon.Auth.PersistedACL.Class, Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( protectedDocument.getACL ).toBeDefined();
				expect( Utils.isFunction( protectedDocument.getACL ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/resource/~acl/" ).andReturn( {
					responseHeaders: {
						"ETag": `"1234567890"`,
					},
					responseText: `[
						{
							"@graph": [
								{
									"@id": "_:1",
									"@type": [
										"https://carbonldp.com/ns/v1/security#AccessControlEntry"
									],
									"https://carbonldp.com/ns/v1/security#granting": [
										{
											"@type": "http://www.w3.org/2001/XMLSchema#boolean",
											"@value": "true"
										}
									],
									"https://carbonldp.com/ns/v1/security#permission": [
										{
											"@id": "http://example.com/ns#READ"
										},
										{
											"@id": "http://example.com/ns#WRITE"
										},
										{
											"@id": "http://example.com/ns#CREATE"
										},
										{
											"@id": "http://example.com/ns#DELETE"
										}
									],
									"https://carbonldp.com/ns/v1/security#subject": [
										{
											"@id": "https://example.com/roles/my-role/"
										}
									],
									"https://carbonldp.com/ns/v1/security#subjectClass": [
										{
											"@id": "https://carbonldp.com/ns/v1/security#AppRole"
										}
									]
								},
								{
									"@id": "_:2",
									"@type": [
										"https://carbonldp.com/ns/v1/security#AccessControlEntry"
									],
									"https://carbonldp.com/ns/v1/security#granting": [
										{
											"@type": "http://www.w3.org/2001/XMLSchema#boolean",
											"@value": "true"
										}
									],
									"https://carbonldp.com/ns/v1/security#permission": [
										{
											"@id": "http://example.com/ns#READ"
										},
										{
											"@id": "http://example.com/ns#WRITE"
										}
									],
									"https://carbonldp.com/ns/v1/security#subject": [
										{
											"@id": "https://example.com/roles/my-role/"
										}
									],
									"https://carbonldp.com/ns/v1/security#subjectClass": [
										{
											"@id": "https://carbonldp.com/ns/v1/security#AppRole"
										}
									]
								},
								{
									"@id": "https://dev.carbonldp.com/apps/test-app/~acl/",
									"@type": [
										"https://carbonldp.com/ns/v1/security#AccessControlList"
									],
									"https://carbonldp.com/ns/v1/security#accessControlEntry": [
										{
											"@id": "_:1"
										}
									],
									"https://carbonldp.com/ns/v1/security#accessTo": [
										{
											"@id": "http://example.com/resource/"
										}
									],
									"https://carbonldp.com/ns/v1/security#inheritableEntry": [
										{
											"@id": "_:2"
										}
									]
								}
							],
							"@id": "http://example.com/resource/~acl/"
						}
					]`,
				} );

				protectedDocument.getACL().then( ( [ acl, response ]:[ PersistedACL.Class, HTTP.Response.Class ] ) => {
					expect( acl ).toBeDefined();
					expect( response ).toBeDefined();

					expect( PersistedACL.Factory.hasClassProperties( acl ) ).toBe( true );
					expect( acl.entries ).toBeDefined();
					expect( acl.entries.length ).toBe( 1 );
					expect( acl.inheritableEntries ).toBeDefined();
					expect( acl.inheritableEntries.length ).toBe( 1 );
					expect( acl.accessTo.id ).toBe( protectedDocument.id );

					done();
				} ).catch( done.fail );
			} );

		} );

	} );

} );
