import { AbstractContext } from "./AbstractContext";
import { PersistedACL } from "./Auth/PersistedACL";
import { TransientDocument } from "./TransientDocument";
import { Documents } from "./Documents";
import { PersistedDocument } from "./PersistedDocument";

import { PersistedProtectedDocument } from "./PersistedProtectedDocument";

import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "carbonldp/PersistedProtectedDocument" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PersistedProtectedDocument",
		"Interface that represents a persisted protected document."
	), ():void => {

		it( extendsClass( "CarbonLDP.PersistedDocument" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"accessControlList",
			"CarbonLDP.Pointer",
			"A reference to the ACL of the document."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getACL",
			"Obtains and resolve the ACL of the actual document.", [
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: " Customizable options for the request." },
			],
			{ type: "Promise<CarbonLDP.Auth.PersistedACL>" }
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.PersistedProtectedDocumentFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.PersistedProtectedDocument` objects."
	), ():void => {

		it( hasMethod(
			STATIC,
			"isDecorated",
			"Returns true if the object provided contains the properties and methods of a `CarbonLDP.PersistedProtectedDocument` object.", [
				{ name: "object", type: "object", description: "The object to check." },
			],
			{ type: "object is CarbonLDP.PersistedProtectedDocument" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.PersistedProtectedDocument` object.", [
				{ name: "object", type: "object", description: "The object to check." },
			],
			{ type: "object is CarbonLDP.PersistedProtectedDocument" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorate the object with the properties and methods of a `CarbonLDP.PersistedProtectedDocument` object.", [
				{ name: "object", type: "T", description: "The object to decorate." },
			],
			{ type: "T & CarbonLDP.PersistedProtectedDocument" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"PersistedProtectedDocument",
		"CarbonLDP.PersistedProtectedDocumentFactory",
		"Constant that implements the `CarbonLDP.PersistedProtectedDocumentFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedProtectedDocument ).toBeDefined();
			expect( PersistedProtectedDocument ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "PersistedProtectedDocument.isDecorated", ():void => {
			expect( PersistedProtectedDocument.isDecorated ).toBeDefined();
			expect( Utils.isFunction( PersistedProtectedDocument.isDecorated ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedProtectedDocument.isDecorated( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( PersistedProtectedDocument.isDecorated( object ) ).toBe( true );

			delete object.accessControlList;
			expect( PersistedProtectedDocument.isDecorated( object ) ).toBe( true );
			object.accessControlList = null;

			delete object.getACL;
			expect( PersistedProtectedDocument.isDecorated( object ) ).toBe( false );
			object.getACL = ():void => {};
		} );

		// TODO: Separate in different tests
		it( "PersistedProtectedDocument.is", ():void => {
			expect( PersistedProtectedDocument.is ).toBeDefined();
			expect( Utils.isFunction( PersistedProtectedDocument.is ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedProtectedDocument.is( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( PersistedProtectedDocument.is( object ) ).toBe( false );

			let document:PersistedDocument = PersistedDocument.decorate( object, new Documents() );
			expect( PersistedProtectedDocument.is( document ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "PersistedProtectedDocument.decorate", ():void => {
			expect( PersistedACL.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.decorate ) ).toBe( true );

			const persistedDocumentSpy:jasmine.Spy = spyOn( PersistedDocument, "decorate" ).and.callThrough();

			let fn:Function = ():void => {};
			let document:object;
			let protectedDocument:PersistedProtectedDocument;

			document = {
				accessControlList: null,
				getACL: fn,
			};
			protectedDocument = PersistedProtectedDocument.decorate( document, new Documents() );
			expect( PersistedProtectedDocument.isDecorated( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).toBe( fn );

			document = {
				accessControlList: null,
			};
			protectedDocument = PersistedProtectedDocument.decorate( document, new Documents() );
			expect( PersistedProtectedDocument.isDecorated( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).not.toBe( fn );

			expect( persistedDocumentSpy ).toHaveBeenCalledTimes( 1 );
		} );

		describe( "PersistedProtectedDocument instance", ():void => {
			let protectedDocument:PersistedProtectedDocument;
			let documents:Documents;

			beforeAll( ():void => {
				jasmine.Ajax.install();
			} );

			beforeEach( ():void => {
				class MockContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = { vocabulary: "http://example.com/vocab#" };
					}
				}

				let context:AbstractContext = new MockContext();
				documents = context.documents;

				let document:TransientDocument = TransientDocument.createFrom( {
					id: "http://example.com/resource/",
					accessControlList: documents.getPointer( "http://example.com/resource/~acl/" ),
					_resolved: true,
				} );
				protectedDocument = PersistedProtectedDocument.decorate( document, documents );
			} );

			afterAll( ():void => {
				jasmine.Ajax.uninstall();
			} );

			// TODO: Separate in different tests
			it( "PersistedProtectedDocument.getACL", ( done:{ ():void, fail:() => void } ):void => {
				expect( protectedDocument.getACL ).toBeDefined();
				expect( Utils.isFunction( protectedDocument.getACL ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/resource/", null, "POST" ).andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"acl"
							]
						},
						"results": {
							"bindings": [
								{
									"acl": {
										"type": "uri",
										"value": "http://example.com/resource/~acl/"
									}
								}
							]
						}
					}`,
				} );
				jasmine.Ajax.stubRequest( "http://example.com/resource/~acl/" ).andReturn( {
					responseHeaders: {
						"ETag": `"1234567890"`,
						"Content-Location": "http://example.com/resource/~acl/",
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
											"@id": "https://example.com/.system/roles/my-role/"
										}
									],
									"https://carbonldp.com/ns/v1/security#subjectClass": [
										{
											"@id": "https://carbonldp.com/ns/v1/security#Role"
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
											"@id": "https://example.com/.system/roles/my-role/"
										}
									],
									"https://carbonldp.com/ns/v1/security#subjectClass": [
										{
											"@id": "https://carbonldp.com/ns/v1/security#Role"
										}
									]
								},
								{
									"@id": "http://example.com/resource/~acl/",
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

				let promises:Promise<any>[] = [];

				promises.push( protectedDocument.getACL().then( ( acl:PersistedACL ) => {
					expect( acl ).toBeDefined();

					expect( PersistedACL.isDecorated( acl ) ).toBe( true );
					expect( acl.entries ).toBeDefined();
					expect( acl.entries.length ).toBe( 1 );
					expect( acl.inheritableEntries ).toBeDefined();
					expect( acl.inheritableEntries.length ).toBe( 1 );
					expect( acl.accessTo.id ).toBe( protectedDocument.id );
				} ) );

				const unresolvedProtectedDocument:PersistedProtectedDocument = PersistedProtectedDocument.decorate( { id: "http://example.com/resource/" }, documents );
				promises.push( unresolvedProtectedDocument.getACL().then( ( acl:PersistedACL ) => {
					expect( acl ).toBeDefined();

					expect( PersistedACL.isDecorated( acl ) ).toBe( true );
					expect( acl.entries ).toBeDefined();
					expect( acl.entries.length ).toBe( 1 );
					expect( acl.inheritableEntries ).toBeDefined();
					expect( acl.inheritableEntries.length ).toBe( 1 );
					expect( acl.accessTo.id ).toBe( protectedDocument.id );
				} ) );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

	} );

} );
