import { AnyJasmineValue } from "../../test/helpers/types";
import { AbstractContext } from "../AbstractContext";
import { ACL } from "../Auth/ACL";
import { Document, } from "../Document";
import { Documents } from "../Documents";
import { Pointer } from "../Pointer";

import {
	extendsClass,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import {
	C,
	CS,
} from "../Vocabularies";
import { ProtectedDocument } from "./ProtectedDocument";


describe( module( "carbonldp/ProtectedDocument" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ProtectedDocument",
		"Interface that represents a persisted protected document."
	), ():void => {

		let context:AbstractContext;
		beforeEach( ():void => {
			jasmine.Ajax.install();

			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( extendsClass( "CarbonLDP.Document" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"accessControlList",
			"CarbonLDP.Pointer",
			"A reference to the ACL of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"creator",
			"CarbonLDP.Pointer"
		), ():void => {
			const target:ProtectedDocument[ "creator" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"owners",
			"CarbonLDP.Pointer"
		), ():void => {
			const target:ProtectedDocument[ "owners" ] = {} as Pointer;
			expect( target ).toBeDefined();
		} );


		describe( method( OBLIGATORY, "getACL" ), ():void => {

			it( hasSignature(
				"Obtains and resolve the ACL of the actual document.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<CarbonLDP.Auth.ACL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const document:ProtectedDocument = ProtectedDocument.decorate(
					context.documents.getPointer( "http://example.com/resource/" ),
					context.documents
				);

				expect( document.getACL ).toBeDefined();
				expect( document.getACL ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call get when document resolved", ( done:DoneFn ):void => {
				const document:ProtectedDocument = ProtectedDocument.decorate(
					Object.assign( context.documents.getPointer( "https://example.com/resource/" ), {
						_resolved: true,
						accessControlList: context.documents.getPointer( "https://example.com/resource/.acl/" ),
					} ),
					context.documents
				);

				const spy:jasmine.Spy = spyOn( context.documents, "get" )
					.and.returnValue( Promise.reject( "spy called" ) );

				document.getACL()
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( returned => {
						expect( returned ).toBe( "spy called" );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/.acl/", void 0 );

						done();
					} );
			} );

			it( "should construct correct query", ( done:DoneFn ):void => {
				const document:ProtectedDocument = ProtectedDocument.decorate(
					Object.assign( context.documents.getPointer( "https://example.com/resource/" ), {
						_resolved: false,
					} ),
					context.documents
				);

				const spy:jasmine.Spy = spyOn( context.documents, "executeRawCONSTRUCTQuery" )
					.and.returnValue( Promise.reject( null ) );

				document.getACL()
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( ( error ) => {
						if( error ) done.fail( error );

						const [ uri, query ] = spy
							.calls
							.mostRecent()
							.args;

						expect( uri ).toBe( "https://example.com/resource/" );

						expect( query ).toBe( "" +
							"CONSTRUCT {" +
							` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
							"" + ` <${ C.target }> ?document.` +

							" ?document a ?document__types;" +
							"" + ` <${ CS.accessControlList }> ?document__accessControlList.` +

							" ?document__accessControlList___subject ?document__accessControlList___predicate ?document__accessControlList___object " +

							"} WHERE {" +
							" BIND(BNODE() AS ?metadata)." +

							" VALUES ?document { <https://example.com/resource/> }." +
							" OPTIONAL { ?document a ?document__types }." +
							` ?document a <${ CS.ProtectedDocument }>.` +

							" OPTIONAL {" +
							"" + ` ?document <${ CS.accessControlList }> ?document__accessControlList.` +
							"" + " FILTER( ! isLiteral( ?document__accessControlList ) )." +
							"" + " GRAPH ?document__accessControlList {" +
							"" + "" + " ?document__accessControlList___subject ?document__accessControlList___predicate ?document__accessControlList___object" +
							"" + " }" +
							" } " +
							"}"
						);

						done();
					} );
			} );

			it( "should return the queried ACL", ( done:DoneFn ):void => {
				jasmine.Ajax.stubRequest( "https://example.com/resource/" ).andReturn( {
					status: 200,
					responseText: `[ {
							"@id":"_:1",
							"@type": [
								"${ C.VolatileResource }",
								"${ C.QueryMetadata }"
							],
							"${ C.target }": [ {
								"@id":"https://example.com/resource/"
							} ]
						}, {
							"@id": "_:2",
							"@type": [
								"${ C.ResponseMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.documentMetadata }": [ {
								"@id": "_:3"
							}, {
								"@id": "_:4"
							} ]
						}, {
							"@id": "_:3",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"1-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/"
							} ]
						}, {
							"@id": "_:4",
							"@type": [
								"${ C.DocumentMetadata }",
								"${ C.VolatileResource }"
							],
							"${ C.eTag }": [ {
								"@value": "\\"2-12345\\""
							} ],
							"${ C.relatedDocument }": [ {
								"@id": "https://example.com/resource/.acl/"
							} ]
						}, {
							"@id": "https://example.com/resource/",
							"@graph": [ {
								"@id": "https://example.com/resource/",
								"@type": [
									"${ C.Document }",
									"${ CS.ProtectedDocument }"
								],
								"${ CS.accessControlList }": [ {
									"@id": "https://example.com/resource/.acl/"
								} ]
							} ]
						}, {
							"@id": "https://example.com/resource/.acl/",
							"@graph": [ {
								"@id": "https://example.com/resource/.acl/",
								"@type": [
									"${ C.Document }",
									"${ CS.AccessControlList }"
								],
								"${ CS.accessTo }": [ {
									"@id": "https://example.com/resource/"
								} ]
							} ]
						} ]`,
				} );

				const document:ProtectedDocument = ProtectedDocument.decorate(
					Object.assign( context.documents.getPointer( "https://example.com/resource/" ), {
						_resolved: false,
					} ),
					context.documents
				);

				document.getACL()
					.then( ( acl ) => {
						expect( acl ).toEqual( jasmine.objectContaining( {
							_eTag: "\"2-12345\"",
							types: jasmine.arrayContaining( [ CS.AccessControlList ] ) as any as string[],
							accessTo: jasmine.objectContaining( {
								"id": "https://example.com/resource/",
							} ) as any,
						} ) );

						done();
					} )
					.catch( done.fail );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.ProtectedDocumentFactory",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.ProtectedDocument` objects."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientProtectedDocument" ), () => {} );

		describe( property(
			OBLIGATORY,
			"SCHEMA",
			"CarbonLDP.ObjectSchema"
		), ():void => {

			it( "should exists", ():void => {
				expect( ProtectedDocument.SCHEMA ).toBeDefined();
			} );

			it( "should have model properties", () => {
				type Target = AnyJasmineValue<Required<Pick<ProtectedDocument,
					"accessControlList" | "creator" | "owners">>>;

				expect( ProtectedDocument.SCHEMA as Target ).toEqual( {
					accessControlList: jasmine.any( Object ),
					creator: jasmine.any( Object ),
					owners: jasmine.any( Object ),
				} );
			} );

			it( "should have cs:accessControlList", () => {
				expect( ProtectedDocument.SCHEMA[ "accessControlList" ] ).toEqual( {
					"@id": CS.accessControlList,
					"@type": "@id",
				} );
			} );

			it( "should have cs:creator", () => {
				expect( ProtectedDocument.SCHEMA[ "creator" ] ).toEqual( {
					"@id": CS.creator,
					"@type": "@id",
				} );
			} );

			it( "should have cs:owner", () => {
				expect( ProtectedDocument.SCHEMA[ "owners" ] ).toEqual( {
					"@id": CS.owner,
					"@type": "@id",
					"@container": "@set",
				} );
			} );

		} );

		it( hasMethod(
			STATIC,
			"isDecorated",
			"Returns true if the object provided contains the properties and methods of a `CarbonLDP.ProtectedDocument` object.", [
				{ name: "object", type: "object", description: "The object to check." },
			],
			{ type: "object is CarbonLDP.ProtectedDocument" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.ProtectedDocument` object.", [
				{ name: "object", type: "object", description: "The object to check." },
			],
			{ type: "object is CarbonLDP.ProtectedDocument" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorate the object with the properties and methods of a `CarbonLDP.ProtectedDocument` object.", [
				{ name: "object", type: "T", description: "The object to decorate." },
			],
			{ type: "T & CarbonLDP.ProtectedDocument" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ProtectedDocument",
		"CarbonLDP.ProtectedDocumentFactory",
		"Constant that implements the `CarbonLDP.ProtectedDocumentFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ProtectedDocument ).toBeDefined();
			expect( ProtectedDocument ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "ProtectedDocument.isDecorated", ():void => {
			expect( ProtectedDocument.isDecorated ).toBeDefined();
			expect( Utils.isFunction( ProtectedDocument.isDecorated ) ).toBe( true );

			let object:any = void 0;
			expect( ProtectedDocument.isDecorated( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( ProtectedDocument.isDecorated( object ) ).toBe( true );

			delete object.accessControlList;
			expect( ProtectedDocument.isDecorated( object ) ).toBe( true );
			object.accessControlList = null;

			delete object.getACL;
			expect( ProtectedDocument.isDecorated( object ) ).toBe( false );
			object.getACL = ():void => {};
		} );

		// TODO: Separate in different tests
		it( "ProtectedDocument.is", ():void => {
			expect( ProtectedDocument.is ).toBeDefined();
			expect( Utils.isFunction( ProtectedDocument.is ) ).toBe( true );

			let object:any = void 0;
			expect( ProtectedDocument.is( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( ProtectedDocument.is( object ) ).toBe( false );

			let document:Document = Document.decorate( object, new Documents() );
			expect( ProtectedDocument.is( document ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "ProtectedDocument.decorate", ():void => {
			expect( ACL.decorate ).toBeDefined();
			expect( Utils.isFunction( ACL.decorate ) ).toBe( true );

			const persistedDocumentSpy:jasmine.Spy = spyOn( Document, "decorate" ).and.callThrough();

			let fn:Function = ():void => {};
			let document:object;
			let protectedDocument:ProtectedDocument;

			document = {
				accessControlList: null,
				getACL: fn,
			};
			protectedDocument = ProtectedDocument.decorate( document, new Documents() );
			expect( ProtectedDocument.isDecorated( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).toBe( fn );

			document = {
				accessControlList: null,
			};
			protectedDocument = ProtectedDocument.decorate( document, new Documents() );
			expect( ProtectedDocument.isDecorated( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).not.toBe( fn );

			expect( persistedDocumentSpy ).toHaveBeenCalledTimes( 1 );
		} );

	} );

} );
