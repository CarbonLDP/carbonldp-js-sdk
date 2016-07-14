import {hasMethod, INSTANCE, module, isDefined, clazz, decoratedObject, STATIC} from "./../test/JasmineExtender";
import AbstractContext from "./../AbstractContext";
import * as AccessPoint from "./../AccessPoint";
import Documents from "./../Documents";
import * as HTTP from "./../HTTP";
import * as PersistedACL from "./../Auth/PersistedACL";
import * as PersistedDocument from "./../PersistedDocument";
import * as Utils from "./../Utils";

import * as PersistedRDFSource from "./PersistedRDFSource";

describe( module( "Carbon/PersistedRDFSource" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedRDFSource ).toBeDefined();
		expect( Utils.isObject( PersistedRDFSource ) ).toBe( true );
	} );

	describe( clazz(
		"Carbon.PersistedRDFSource.Factory",
		"Factory class for `Carbon.PersistedRDFSource.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedRDFSource.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedRDFSource.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided contains the properties and methods of a `Carbon.PersistedRDFSource.Class` object.", [
				{name: "object", type: "Object", description: "The object to analise."},
			],
			{type: "boolean"}
		), ():void => {
			expect( PersistedRDFSource.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedRDFSource.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( PersistedRDFSource.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,
				accessControlList: null,
				createAccessPoint: ():void => {},
				getACL: ():void => {},
			};
			expect( PersistedRDFSource.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.defaultInteractionModel;
			expect( PersistedRDFSource.Factory.hasClassProperties( object ) ).toBe( false );
			object.defaultInteractionModel = null;

			delete object.accessPoints;
			expect( PersistedRDFSource.Factory.hasClassProperties( object ) ).toBe( true );
			object.accessPoints = null;

			delete object.accessControlList;
			expect( PersistedRDFSource.Factory.hasClassProperties( object ) ).toBe( false );
			object.accessControlList = null;

			delete object.createAccessPoint;
			expect( PersistedRDFSource.Factory.hasClassProperties( object ) ).toBe( false );
			object.createAccessPoint = ():void => {};

			delete object.getACL;
			expect( PersistedRDFSource.Factory.hasClassProperties( object ) ).toBe( false );
			object.getACL = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorate the object with the properties and methods of a `Carbon.LDP.PersistedRDFSource.Class` object.", [
				{name: "document", type: "T extends Carbon.PersistedDocument.Class", description: "The persisted document to decorate."},
			],
			{type: "T & Carbon.LDP.PersistedRDFSource.Class"}
		), ():void => {
			expect( PersistedACL.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory.decorate ) ).toBe( true );

			let fn:Function = ():void => {};
			let document:any;
			let rdfSource:PersistedRDFSource.Class;

			document = {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,
				accessControlList: null,
				createAccessPoint: fn,
				getACL: fn,
			};
			rdfSource = PersistedRDFSource.Factory.decorate( document );
			expect( PersistedRDFSource.Factory.hasClassProperties( rdfSource ) ).toBe( true );
			expect( rdfSource.getACL ).toBe( fn );
			expect( rdfSource.createAccessPoint ).toBe( fn );

			document = {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,
				accessControlList: null,
				createAccessPoint: fn,
			};
			rdfSource = PersistedRDFSource.Factory.decorate( document );
			expect( PersistedRDFSource.Factory.hasClassProperties( rdfSource ) ).toBe( true );
			expect( rdfSource.getACL ).not.toBe( fn );
			expect( rdfSource.createAccessPoint ).not.toBe( fn );
		} );

		describe( decoratedObject(
			"The object decorated by `Carbon.PersistedRDFSource.Factory.decorate()` method.", [
				"Carbon.PersistedRDFSource.Class",
			]
		), ():void => {
			let rdfSource:PersistedRDFSource.Class;
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
				rdfSource = PersistedRDFSource.Factory.decorate( document );
				rdfSource.accessControlList = document.getPointer( "http://example.com/resource/~acl/" );
			} );

			afterAll( ():void => {
				jasmine.Ajax.uninstall();
			} );

			it( hasMethod(
				INSTANCE,
				"createAccessPoint",
				"Creates an AccessPoint for the PersistedDocument.",
				{type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>"}
			), ():void => {
				expect( rdfSource.createAccessPoint ).toBeDefined();
				expect( Utils.isFunction( rdfSource.createAccessPoint ) ).toBe( true );

				let accessPoint:AccessPoint.Class = AccessPoint.Factory.create( rdfSource, "http://example.com/" );

				let spy:jasmine.Spy = spyOn( documents, "createAccessPoint" );
				rdfSource.createAccessPoint( accessPoint, "slug", {} );
				expect( spy ).toHaveBeenCalledWith( accessPoint, "slug", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"getACL",
				"Obtains and resolve the ACL of the actual document.",
				{type: "Promise<[ Carbon.Auth.PersistedACL.Class, Carbon.HTTP.Response.Class ]>"}
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( rdfSource.getACL ).toBeDefined();
				expect( Utils.isFunction( rdfSource.getACL ) ).toBe( true );

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

				rdfSource.getACL().then( ( [ acl, response ]:[ PersistedACL.Class, HTTP.Response.Class ] ) => {
					expect( acl ).toBeDefined();
					expect( response ).toBeDefined();

					expect( PersistedACL.Factory.hasClassProperties( acl ) ).toBe( true );
					expect( acl.entries ).toBeDefined();
					expect( acl.entries.length ).toBe( 1 );
					expect( acl.inheritableEntries ).toBeDefined();
					expect( acl.inheritableEntries.length ).toBe( 1 );
					expect( acl.accessTo.id ).toBe( rdfSource.id );

					done();
				} ).catch( done.fail );
			} );

		} );

	} );

} );
