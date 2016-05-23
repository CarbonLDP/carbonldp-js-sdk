import {hasMethod, INSTANCE, module, isDefined, clazz, decoratedObject} from "./test/JasmineExtender";
import AbstractContext from "./AbstractContext";
import * as AccessPoint from "./AccessPoint";
import * as ACL from "./Auth/ACL";
import Documents from "./Documents";
import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";

import * as PersistedRDFSource from "./PersistedRDFSource";

describe( module( "Carbon/PersistedRDFSource" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedRDFSource ).toBeDefined();
		expect( Utils.isObject( PersistedRDFSource ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.PersistedRDFSource.Factory",
		"Factory class for `Carbon.PersistedRDFSource.Class` objects."
	), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedRDFSource.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedRDFSource.Factory ) ).toBe( true );
		});

		describe( decoratedObject(
			"The object decorated by `Carbon.PersistedRDFSource.Factory.decorate()` method.", [
				"Carbon.PersistedRDFSource.Class"
			]
		), ():void => {
			let rdfSource:PersistedRDFSource.Class;
			let documents:Documents;

			beforeAll( ():void => {
				jasmine.Ajax.install();
			});

			beforeEach( ():void => {
				class MockContext extends AbstractContext {
					resolve( uri:string ) { return uri; }
				}
				let context:AbstractContext = new MockContext();
				documents = context.documents;

				let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/resource/", documents );
				rdfSource = PersistedRDFSource.Factory.decorate( document );
				rdfSource.accessControlList = document.getPointer( "http://example.com/resource/~acl/" );
			});

			afterAll( ():void => {
				jasmine.Ajax.uninstall();
			});

			it( hasMethod(
				INSTANCE,
				"createAccessPoint",
				"Creates an AccessPoint for the PersistedDocument.",
				{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( rdfSource.createAccessPoint ).toBeDefined();
				expect( Utils.isFunction( rdfSource.createAccessPoint ) ).toBe( true );

				let accessPoint:AccessPoint.Class = AccessPoint.Factory.create( rdfSource, "http://example.com/" );

				let spy = spyOn( documents, "createAccessPoint" );
				rdfSource.createAccessPoint( accessPoint, "slug", {} );
				expect( spy ).toHaveBeenCalledWith( accessPoint, "slug", {} );
			});

			it( hasMethod(
				INSTANCE,
				"getACL",
				"Obtains and resolve the ACL of the actual document.",
				{ type: "Promise<[ Carbon.Auth.ACL.Class, Carbon.HTTP.Response.Class ]>" }
			), ( done:{ ():void, fail:() => void } ):void => {
				expect( rdfSource.getACL ).toBeDefined();
				expect( Utils.isFunction( rdfSource.getACL ) ).toBe( true );

				jasmine.Ajax.stubRequest( "http://example.com/resource/~acl/" ).andReturn( {
					responseHeaders: {
						"ETag": `"1234567890"`
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
					]`
				});

				rdfSource.getACL().then( ( [ acl, response ]:[ ACL.Class, HTTP.Response.Class ] ) => {
					expect( acl ).toBeDefined();
					expect( response ).toBeDefined();

					expect( ACL.Factory.hasClassProperties( acl ) ).toBe( true );
					expect( acl.accessControlEntries ).toBeDefined();
					expect( acl.accessControlEntries.length ).toBe( 1 );
					expect( acl.inheritableEntries ).toBeDefined();
					expect( acl.inheritableEntries.length ).toBe( 1 );
					expect( acl.accessTo.id ).toBe( rdfSource.id );

					done();
				}).catch( done.fail );
			});

		});

	});

});
