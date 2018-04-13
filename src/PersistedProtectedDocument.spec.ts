import { QueryToken } from "sparqler/tokens";

import { AbstractContext } from "./AbstractContext";
import { PersistedACL } from "./Auth/PersistedACL";
import { Documents } from "./Documents";
import { PersistedDocument } from "./PersistedDocument";

import { PersistedProtectedDocument } from "./PersistedProtectedDocument";

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
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "carbonldp/PersistedProtectedDocument" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PersistedProtectedDocument",
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

		it( extendsClass( "CarbonLDP.PersistedDocument" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"accessControlList",
			"CarbonLDP.Pointer",
			"A reference to the ACL of the document."
		), ():void => {} );

		describe( method( OBLIGATORY, "getACL" ), ():void => {

			it( hasSignature(
				"Obtains and resolve the ACL of the actual document.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<CarbonLDP.Auth.PersistedACL>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const document:PersistedProtectedDocument = PersistedProtectedDocument.decorate(
					context.documents.getPointer( "http://example.com/resource/" ),
					context.documents
				);

				expect( document.getACL ).toBeDefined();
				expect( document.getACL ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call get when document resolved", ( done:DoneFn ):void => {
				const document:PersistedProtectedDocument = PersistedProtectedDocument.decorate(
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

						expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/.acl/", jasmine.any( Object ) );

						done();
					} );
			} );

			it( "should call execute query when not resolved", ( done:DoneFn ):void => {
				const document:PersistedProtectedDocument = PersistedProtectedDocument.decorate(
					Object.assign( context.documents.getPointer( "https://example.com/resource/" ), {
						_resolved: false,
					} ),
					context.documents
				);

				const spy:jasmine.Spy = spyOn( context.documents, "_getConstructDocuments" )
					.and.returnValue( Promise.reject( "spy called" ) );

				document.getACL()
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( returned => {
						expect( returned ).toBe( "spy called" );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", jasmine.any( Object ), jasmine.any( QueryToken ) );

						done();
					} );
			} );

			it( "should construct correct query", ( done:DoneFn ):void => {
				const document:PersistedProtectedDocument = PersistedProtectedDocument.decorate(
					Object.assign( context.documents.getPointer( "https://example.com/resource/" ), {
						_resolved: false,
					} ),
					context.documents
				);

				const spy:jasmine.Spy = spyOn( context.documents, "_getConstructDocuments" )
					.and.returnValue( Promise.reject( "spy called" ) );

				document.getACL()
					.then( () => {
						done.fail( "Should not resolve" );
					} )
					.catch( () => {
						const query:QueryToken = spy
							.calls
							.mostRecent()
							.args
							.find( arg => arg instanceof QueryToken );

						expect( query.toString() ).toBe( "" +
							"CONSTRUCT { " +
							"" + "?s ?p ?o " +
							"} " +
							"WHERE { " +
							"" + `<https://example.com/resource/> <https://carbonldp.com/ns/v1/security#accessControlList> ?g. ` +
							"" + "GRAPH ?g { " +
							"" + "" + "?s ?p ?o " +
							"" + "} " +
							"}"
						);

						done();
					} );
			} );

			it( "should return the queried ACL", ( done:DoneFn ):void => {
				const document:PersistedProtectedDocument = PersistedProtectedDocument.decorate(
					Object.assign( context.documents.getPointer( "https://example.com/resource/" ), {
						_resolved: false,
					} ),
					context.documents
				);

				const mockACL:PersistedACL = PersistedACL.decorate(
					PersistedDocument.createFrom( Object.assign( context.documents.getPointer( "https://example.com/resource/.acl/" ), {
							accessTo: document,
						} ),
						context.documents,
						"https://example.com/resource/.acl/"
					),
					context.documents
				);
				spyOn( context.documents, "_getConstructDocuments" )
					.and.returnValue( Promise.resolve( [ mockACL ] ) );

				document.getACL()
					.then( ( persistedACL ) => {
						expect( persistedACL ).toBe( mockACL );

						done();
					} )
					.catch( done.fail );
			} );

		} );

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

	} );

} );
