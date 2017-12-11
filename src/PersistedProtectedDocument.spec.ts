import { QueryToken } from "sparqler/tokens";

import AbstractContext from "./AbstractContext";
import * as PersistedACL from "./Auth/PersistedACL";
import * as Documents from "./Documents";
import * as PersistedDocument from "./PersistedDocument";
import * as PersistedProtectedDocument from "./PersistedProtectedDocument";

import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
	STATIC,
} from "./test/JasmineExtender";

import * as Utils from "./Utils";

describe( module( "Carbon/PersistedProtectedDocument" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedProtectedDocument ).toBeDefined();
		expect( Utils.isObject( PersistedProtectedDocument ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.PersistedProtectedDocument.Class",
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

		it( extendsClass( "Carbon.PersistedDocument.Class" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"accessControlList",
			"Carbon.Pointer.Class",
			"A reference to the ACL of the document."
		), ():void => {} );

		describe( method( OBLIGATORY, "getACL" ), ():void => {

			it( hasSignature(
				"Obtains and resolve the ACL of the actual document.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: " Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.Auth.PersistedACL.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const document:PersistedProtectedDocument.Class = PersistedProtectedDocument.Factory.decorate(
					context.documents.getPointer( "http://example.com/resource/" ),
					context.documents
				);

				expect( document.getACL ).toBeDefined();
				expect( document.getACL ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call get when document resolved", ( done:DoneFn ):void => {
				const document:PersistedProtectedDocument.Class = PersistedProtectedDocument.Factory.decorate(
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
				const document:PersistedProtectedDocument.Class = PersistedProtectedDocument.Factory.decorate(
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
				const document:PersistedProtectedDocument.Class = PersistedProtectedDocument.Factory.decorate(
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
				const document:PersistedProtectedDocument.Class = PersistedProtectedDocument.Factory.decorate(
					Object.assign( context.documents.getPointer( "https://example.com/resource/" ), {
						_resolved: false,
					} ),
					context.documents
				);

				const mockACL:PersistedACL.Class = PersistedACL.Factory.decorate(
					PersistedDocument.Factory.createFrom( Object.assign( context.documents.getPointer( "https://example.com/resource/.acl/" ), {
							accessTo: document,
						} ),
						"https://example.com/resource/.acl/",
						context.documents
					)
				);
				spyOn( context.documents, "_getConstructDocuments" )
					.and.returnValue( Promise.resolve( [ [ mockACL ], null ] ) );

				document.getACL()
					.then( ( [ persistedACL, response ] ) => {
						expect( response ).toBeNull();

						expect( persistedACL ).toBe( mockACL );

						done();
					} )
					.catch( done.fail );
			} );

		} );

	} );

	it( hasDefaultExport( "Carbon.PersistedProtectedDocument.Class" ), ():void => {
		let defaultExport:PersistedProtectedDocument.default = <any> {};
		let defaultTarget:PersistedProtectedDocument.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
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
				{ name: "object", type: "Object", description: "The object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedProtectedDocument.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedProtectedDocument.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedProtectedDocument.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( PersistedProtectedDocument.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.accessControlList;
			expect( PersistedProtectedDocument.Factory.hasClassProperties( object ) ).toBe( true );
			object.accessControlList = null;

			delete object.getACL;
			expect( PersistedProtectedDocument.Factory.hasClassProperties( object ) ).toBe( false );
			object.getACL = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `Carbon.PersistedProtectedDocument.Class` object.", [
				{ name: "object", type: "Object", description: "The object to check." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedProtectedDocument.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedProtectedDocument.Factory.is ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedProtectedDocument.Factory.is( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( PersistedProtectedDocument.Factory.is( object ) ).toBe( false );

			let document:PersistedDocument.Class = PersistedDocument.Factory.decorate( object, new Documents.Class() );
			expect( PersistedProtectedDocument.Factory.is( document ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorate the object with the properties and methods of a `Carbon.PersistedProtectedDocument.Class` object.", [
				{ name: "document", type: "T", description: "The persisted document to decorate." },
			],
			{ type: "T & Carbon.PersistedProtectedDocument.Class" }
		), ():void => {
			expect( PersistedACL.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory.decorate ) ).toBe( true );

			const persistedDocumentSpy:jasmine.Spy = spyOn( PersistedDocument.Factory, "decorate" ).and.callThrough();

			let fn:Function = ():void => {};
			let document:object;
			let protectedDocument:PersistedProtectedDocument.Class;

			document = {
				accessControlList: null,
				getACL: fn,
			};
			protectedDocument = PersistedProtectedDocument.Factory.decorate( document, new Documents.Class() );
			expect( PersistedProtectedDocument.Factory.hasClassProperties( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).toBe( fn );

			document = {
				accessControlList: null,
			};
			protectedDocument = PersistedProtectedDocument.Factory.decorate( document, new Documents.Class() );
			expect( PersistedProtectedDocument.Factory.hasClassProperties( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).not.toBe( fn );

			expect( persistedDocumentSpy ).toHaveBeenCalledTimes( 1 );
		} );

	} );

} );
