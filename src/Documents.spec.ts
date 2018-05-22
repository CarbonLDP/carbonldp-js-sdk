import { QueryClause } from "sparqler/clauses";
import * as TokensModule from "sparqler/tokens";
import {
	BindToken,
	ConstructToken,
	FilterToken,
	IRIToken,
	LimitToken,
	LiteralToken,
	OffsetToken,
	OptionalToken,
	OrderToken,
	PredicateToken,
	PrefixedNameToken,
	PrefixToken,
	QueryToken,
	SelectToken,
	SubjectToken,
	ValuesToken,
	VariableToken
} from "sparqler/tokens";

import { BaseAccessPoint } from "./AccessPoint";
import { AccessPoint } from "./AccessPoint";
import { TransientBlankNode } from "./BlankNode";
import { CarbonLDP } from "./CarbonLDP";
import { Document } from "./Document";
import { TransientDocument } from "./Document";

import * as Errors from "./Errors";
import { TransientFragment } from "./Fragment";
import { HTTPError } from "./HTTP/Errors";
import { Header } from "./HTTP/Header";
import { RequestService } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { JSONLDConverter } from "./JSONLD/Converter";
import { Event } from "./Messaging/Event";
import * as MessagingUtils from "./Messaging/Utils";
import { NamedFragment } from "./NamedFragment";
import * as ObjectSchema from "./ObjectSchema";
import { Pointer } from "./Pointer";
import {
	PersistedResource,
	TransientResource
} from "./Resource";
import { ContextSettings } from "./Settings";
import * as SPARQL from "./SPARQL";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
import {
	clazz,
	hasConstructor,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "./test/JasmineExtender";
import {
	TransientAccessPoint,
} from "./AccessPoint";
import * as Utils from "./Utils";
import { C } from "./Vocabularies/C";
import { CS } from "./Vocabularies/CS";
import { LDP } from "./Vocabularies/LDP";
import { XSD } from "./Vocabularies/XSD";

type Documents = {
	[ fn:string ]:(<P = any>( ...params:any[] ) => any) | any;
};
const Documents:{ new( ...params:any[] ):Documents } = class {} as any;

type MockedContext = any;
const MockedContext:{ new( ...params:any[] ):MockedContext } = class {};

function createPartialMetadata( schema:ObjectSchema.ObjectSchema ):PartialMetadata {
	const digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.ObjectSchemaDigester.digestSchema( schema );
	digestedSchema.properties.forEach( definition => ObjectSchema.ObjectSchemaUtils.resolveProperty( digestedSchema, definition, true ) );
	return new PartialMetadata( digestedSchema );
}

function createMockDocument<T extends { id:string }>( data:{ documents:Documents, props:T } ):T & Document {
	const pointer:Pointer = data.documents.getPointer( data.props.id );
	const doc:T & Document = Document.decorate( Object.assign( pointer, data.props ) );

	findNonEnumerableProps( doc );
	doc._normalize();
	return doc;
}

function findNonEnumerableProps( object:object ):void {
	Object
		.keys( object )
		.filter( key => key.startsWith( "_" ) )
		.forEach( key => Object.defineProperty( object, key, { enumerable: false, configurable: true } ) )
	;

	Object
		.keys( object )
		.filter( key => Array.isArray( object[ key ] ) || Utils.isPlainObject( object[ key ] ) )
		.map( key => object[ key ] )
		.forEach( findNonEnumerableProps )
	;
}

xdescribe( module( "carbonldp/Documents" ), ():void => {

	describe( clazz(
		"CarbonLDP.Documents",
		"Class that contains methods for retrieving, saving and updating documents from the Carbon LDP server.", [
			"CarbonLDP.PointerLibrary",
			"CarbonLDP.PointerValidator",
			"CarbonLDP.ObjectSchemaResolver",
		]
	), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Documents ).toBeDefined();
			expect( Utils.isFunction( Documents ) ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"jsonldConverter",
			"CarbonLDP.JSONLD.JSONLDConverter",
			"Instance of `CarbonLDP.JSONLD.JSONLDConverter` that is used to compact retrieved documents and to expand documents to persist. This property is not writable."
		), ():void => {} );

		it( hasProperty(
			INSTANCE,
			"documentDecorators",
			"Map<string, CarbonLDP.DocumentDecorator>",
			"A map that specifies a type and a tuple with a function decorator and its parameters which will be called when a document with the specified type has been resolved or refreshed.\n\nThe decorator function must at least accept the object to decorate and optional parameters declared in the tuple."
		), ():void => {
			let documents:Documents = {};

			expect( documents.documentDecorators ).toBeDefined();
			expect( documents.documentDecorators ).toEqual( jasmine.any( Map ) );

			// Has default decorators
			expect( documents.documentDecorators.size ).toBe( 4 );
			expect( documents.documentDecorators.has( CS.ProtectedDocument ) ).toBe( true );
			expect( documents.documentDecorators.has( CS.AccessControlList ) ).toBe( true );
			expect( documents.documentDecorators.has( CS.User ) ).toBe( true );
			expect( documents.documentDecorators.has( CS.Role ) ).toBe( true );
		} );

		describe( method(
			INSTANCE,
			"inScope"
		), ():void => {

			it( hasSignature(
				"Returns true if the pointer provided is inside the scope of the Documents instance.", [
					{ name: "pointer", type: "CarbonLDP.Pointer", description: "Pointer to evaluate." },
				],
				{ type: "boolean" }
			), ():void => {
				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				let pointer:Pointer;

				pointer = Pointer.create( { id: "https://example.com/document/child/" } );
				expect( documents.inScope( pointer ) ).toBe( true );
				pointer = Pointer.create( { id: "https://example.com/another-document/" } );
				expect( documents.inScope( pointer ) ).toBe( true );
				pointer = Pointer.create( { id: "https://example.com/document/" } );
				expect( documents.inScope( pointer ) ).toBe( true );
				pointer = Pointer.create( { id: "a-relative-document/" } );
				expect( documents.inScope( pointer ) ).toBe( true );

				pointer = Pointer.create( { id: "https://example.com/document/#fragment" } );
				expect( documents.inScope( pointer ) ).toBe( true );
				pointer = Pointer.create( { id: "https://example.com/document/#another-fragment" } );
				expect( documents.inScope( pointer ) ).toBe( true );

				pointer = Pointer.create( { id: "_:BlankNode" } );
				expect( documents.inScope( pointer ) ).toBe( false );

				// Asks to context.parentContext.documents
				pointer = Pointer.create( { id: "http://example.org/document/" } );
				expect( documents.inScope( pointer ) ).toBe( true );
			} );

			it( hasSignature(
				"Returns true if the URI provided is inside the scope of the Documents instance.", [
					{ name: "id", type: "string", description: "URI to evaluate." },
				],
				{ type: "boolean" }
			), ():void => {
				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.inScope( "https://example.com/document/" ) ).toBe( true );
				expect( documents.inScope( "https://example.com/document/child/" ) ).toBe( true );
				expect( documents.inScope( "https://example.com/another-document/" ) ).toBe( true );
				expect( documents.inScope( "a-relative-document/" ) ).toBe( true );

				expect( documents.inScope( "https://example.com/document/#fragment" ) ).toBe( true );
				expect( documents.inScope( "https://example.com/document/#another-fragment" ) ).toBe( true );

				expect( documents.inScope( "_:BlankNode" ) ).toBe( false );

				// Asks to context.parentContext.documents
				expect( documents.inScope( "http://example.org/document/" ) ).toBe( true );
			} );

		} );

		it( hasMethod(
			INSTANCE,
			"hasPointer",
			"Returns true if the Documents instance has a pointer referenced by the URI provided.", [
				{ name: "id", type: "string", description: "URI to look for." },
			],
			{ type: "boolean" }
		), ():void => {
			let context:MockedContext;
			let documents:Documents;


			context = new MockedContext();
			documents = context.documents;

			expect( documents.hasPointer ).toBeDefined();
			expect( Utils.isFunction( documents.hasPointer ) ).toBe( true );

			expect( documents.hasPointer( "https://example.com/document/" ) ).toBe( false );
			expect( documents.hasPointer( "document/" ) ).toBe( false );
			expect( documents.hasPointer( "https://example.com/document/#fragment" ) ).toBe( false );
			expect( documents.hasPointer( "https://example.com/another-document/" ) ).toBe( false );

			expect( () => documents.hasPointer( "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );

			context = new MockedContext();
			documents = context.documents;
			(<any> documents).pointers.set( "document/", Pointer.create( { id: "https://example.com/document/" } ) );
			expect( documents.hasPointer( "https://example.com/document/" ) ).toBe( true );
			expect( documents.hasPointer( "https://example.com/document/#fragment" ) ).toBe( false );
			expect( documents.hasPointer( "document/" ) ).toBe( true );

			expect( documents.hasPointer( "https://example.com/another-document/" ) ).toBe( false );

			(<any> documents).pointers.set( "document/", Pointer.create( { id: "https://example.com/document/" } ) );
			(<any> documents).pointers.set( "another-document/", Pointer.create( { id: "https://example.com/another-document/" } ) );
			expect( documents.hasPointer( "https://example.com/document/" ) ).toBe( true );
			expect( documents.hasPointer( "document/" ) ).toBe( true );
			expect( documents.hasPointer( "https://example.com/another-document/" ) ).toBe( true );
		} );

		it( hasMethod(
			INSTANCE,
			"getPointer",
			"Returns the pointer referenced by the URI provided. If no pointer exists, one is created and then returned.\n" +
			"Returns `null` if the URI is outside the scope of the Documents instance.", [
				{ name: "id", type: "string", description: "URI to look for." },
			],
			{ type: "boolean" }
		), ():void => {
			let context:MockedContext;
			let documents:Documents;


			context = new MockedContext();
			documents = context.documents;

			expect( documents.getPointer ).toBeDefined();
			expect( Utils.isFunction( documents.getPointer ) ).toBe( true );

			let pointer:Pointer;

			pointer = documents.getPointer( "https://example.com/document/" );
			expect( Pointer.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "https://example.com/document/" );

			pointer = documents.getPointer( "document/" );
			expect( Pointer.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "https://example.com/document/" );

			pointer = documents.getPointer( "https://example.com/document/#fragment" );
			expect( Pointer.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "https://example.com/document/#fragment" );

			pointer = documents.getPointer( "https://example.com/another-document/" );
			expect( Pointer.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "https://example.com/another-document/" );

			// Asks to context.parentContext.documents
			pointer = documents.getPointer( "http://example.org/document/" );
			expect( Pointer.is( pointer ) ).toBe( true );
			expect( pointer.id ).toBe( "http://example.org/document/" );

			expect( () => documents.getPointer( "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );

			let anotherPointer:Pointer = Pointer.create( { id: "https://example.com/document/" } );
			context = new MockedContext();
			documents = context.documents;
			(<any> documents).pointers.set( "document/", anotherPointer );
			pointer = documents.getPointer( "https://example.com/document/" );
			expect( pointer ).toBe( anotherPointer );
			pointer = documents.getPointer( "document/" );
			expect( pointer ).toBe( anotherPointer );
		} );

		describe( method(
			INSTANCE,
			"_parseErrorResponse"
		), ():void => {
			let documents:Documents;

			describe( "When Documents has a specified context", ():void => {

				beforeEach( () => {
					const context:MockedContext = {};
					documents = context.documents;
				} );

				it( "should generate an HTTP error when status code is not 2xx", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/", null, "GET" ).andReturn( {
						status: 500,
						responseText: `[ {
							"@id": "_:1",
							"@type": [ "${ C.ErrorResponse }" ],
							"${ C.error }": [ {
								"@id": "_:2"
							}, {
								"@id": "_:3"
							} ],
							"${ C.httpStatusCode }": [ {
								"@type": "${ XSD.int }",
								"@value": "500"
							} ]
						}, {
							"@id": "_:2",
							"@type": [ "${ C.Error }" ],
							"${ C.errorCode }": [ {
								"@language": "en",
								"@value": "code-01"
							} ],
							"${ C.errorMessage }": [ {
								"@language": "en",
								"@value": "Message 01"
							} ],
							"${ C.errorParameters }": [ {
								"@id": "_:4"
							} ]
						}, {
							"@id": "_:3",
							"@type": [ "${ C.Error }" ],
							"${ C.errorCode }": [ {
								"@language": "en",
								"@value": "code-02"
							} ],
							"${ C.errorMessage }": [ {
								"@language": "en",
								"@value": "Message 02"
							} ],
							"${ C.errorParameters }": [ {
								"@id": "_:6"
							} ]
						}, {
							"@id": "_:4",
							"@type": [ "${ C.Map }" ],
							"${ C.entry }": [ {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:5",
							"${ C.entryKey }": [ {
								"@value": "document"
							} ],
							"${ C.entryValue }": [ {
								"@id": "https://example.com/target-document/"
							} ]
						}, {
							"@id": "_:6",
							"@type": [ "${ C.Map }" ],
							"${ C.entry }": [ {
								"@id": "_:7"
							} ]
						}, {
							"@id": "_:7",
							"${ C.entryKey }": [ {
								"@value": "document"
							} ],
							"${ C.entryValue }": [ {
								"@id": "https://example.com/target-document/"
							} ]
						} ]`,
					} );

					documents.get( "https://example.com/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( ( error:HTTPError ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );

						expect( error.message ).toBe( "Message 01, Message 02" );
						expect( error.statusCode ).toBe( 500 );
						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 2 );
						error.errors.forEach( ( platformError, index ) => {
							expect( platformError.errorCode ).toBe( `code-0${ index + 1 }` );
							expect( platformError.errorMessage ).toBe( `Message 0${ index + 1 }` );

							expect( platformError.errorParameters.entries ).toBeDefined();
							platformError.errorParameters.entries.forEach( entry => {
								expect( entry.entryKey ).toBe( "document" );
								expect( entry.entryValue.id ).toEqual( "https://example.com/target-document/" );
							} );
						} );
						done();
					} );
				} );

				it( "should generate an error when multiple c:ErrorResponse in the response", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/", null, "GET" ).andReturn( {
						status: 500,
						responseText: `[ {
							"@id": "_:1",
							"@type": [ "${ C.ErrorResponse }" ],
							"${ C.error }": [],
							"${ C.httpStatusCode }": [ {
								"@type": "http://www.w3.org/2001/XMLSchema#int",
								"@value": "1234567890"
							} ]
						}, {
							"@id": "_:2",
							"@type": [ "${ C.ErrorResponse }" ],
							"${ C.error }": [],
							"${ C.httpStatusCode }": [ {
								"@type": "http://www.w3.org/2001/XMLSchema#int",
								"@value": "0987654321"
							} ]
						} ]`,
					} );

					documents.get( "https://example.com/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( ( error:Error ) => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
						expect( error.message ).toBe( "The response string contains multiple c:ErrorResponse." );
						done();
					} );
				} );

				it( "should generate an error when no c:ErrorResponse in the response", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/", null, "GET" ).andReturn( {
						status: 500,
						responseText: `[ {
							"@id": "_:3",
							"@type": [ "${ C.Error }" ],
							"${ C.errorCode }": [ {
								"@language": "en",
								"@value": "code-02"
							} ],
							"${ C.errorMessage }": [ {
								"@language": "en",
								"@value": "Message 02"
							} ],
							"${ C.errorParameters }": [ {
								"@id": "_:4"
							} ]
						}, {
							"@id": "_:4",
							"@type": [ "${ C.Map }" ],
							"${ C.entry }": [ {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:5",
							"${ C.entryKey }": [ {
								"@value": "document"
							} ],
							"${ C.entryValue }": [ {
								"@id": "https://example.com/target-document/"
							} ]
						} ]`,
					} );

					documents.get( "https://example.com/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( ( error:Error ) => {
						expect( error ).toEqual( jasmine.any( Errors.IllegalArgumentError ) );
						expect( error.message ).toBe( "The response string does not contains a c:ErrorResponse." );
						done();
					} );
				} );

				it( "should generate an HTTP error with the body if no JSON-LD is provided", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/", null, "GET" ).andReturn( {
						status: 500,
						responseText: `An error message.`,
					} );

					documents.get( "https://example.com/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( ( error:Error ) => {
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error.message ).toBe( "An error message." );
						done();
					} );
				} );

			} );

			describe( "When Documents does not have a context", ():void => {

				beforeEach( () => {
					documents = new Documents();
				} );

				it( "should generate an HTTP error with empty ErrorResponse properties", ( done:DoneFn ):void => {
					const responseText:string = `[ {
							"@id": "_:1",
							"@type": [ "${ C.ErrorResponse }" ],
							"${ C.error }": [ {
								"@id": "_:2"
							}, {
								"@id": "_:3"
							} ],
							"${ C.httpStatusCode }": [ {
								"@type": "${ XSD.int }",
								"@value": "500"
							} ]
						}, {
							"@id": "_:2",
							"@type": [ "${ C.Error }" ],
							"${ C.errorCode }": [ {
								"@language": "en",
								"@value": "code-01"
							} ],
							"${ C.errorMessage }": [ {
								"@language": "en",
								"@value": "Message 01"
							} ],
							"${ C.errorParameters }": [ {
								"@id": "_:4"
							} ]
						}, {
							"@id": "_:3",
							"@type": [ "${ C.Error }" ],
							"${ C.errorCode }": [ {
								"@language": "en",
								"@value": "code-02"
							} ],
							"${ C.errorMessage }": [ {
								"@language": "en",
								"@value": "Message 02"
							} ],
							"${ C.errorParameters }": [ {
									"@id": "_:6"
							} ]
						}, {
							"@id": "_:4",
							"@type": [ "${ C.Map }" ],
							"${ C.entry }": [ {
								"@id": "_:5"
							} ]
						}, {
							"@id": "_:5",
							"${ C.entryKey }": [ {
								"@value": "document"
							} ],
							"${ C.entryValue }": [ {
								"@id": "https://example.com/target-document/"
							} ]
						}, {
							"@id": "_:6",
							"@type": [ "${ C.Map }" ],
							"${ C.entry }": [ {
								"@id": "_:7"
							} ]
						}, {
							"@id": "_:7",
							"${ C.entryKey }": [ {
								"@value": "document"
							} ],
							"${ C.entryValue }": [ {
								"@id": "https://example.com/target-document/"
							} ]
						} ]`;
					jasmine.Ajax.stubRequest( "https://example.com/", null, "GET" ).andReturn( {
						status: 500,
						responseText,
					} );

					documents.get( "https://example.com/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( ( error:HTTPError ) => {
						expect( error ).toBeDefined();
						expect( error ).toEqual( jasmine.any( HTTPError ) );
						expect( error.message ).toBe( responseText );

						expect( error.statusCode ).toBe( 500 );
						expect( error.requestID ).toBeNull();
						expect( error.errors ).toBeDefined();
						expect( error.errors.length ).toBe( 0 );
						done();
					} );
				} );

			} );

		} );


		describe( method( INSTANCE, "register" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Register an empty Document with the provided id and decorate it with the types provided.",
				[
					{ name: "id", type: "string" },
					{ name: "types", type: "string[]", optional: true },
				],
				{ type: "T & CarbonLDP.Document" }
			), ():void => {} );

			let context:MockedContext;
			beforeEach( ():void => {
				context = new class extends MockedContext {
					protected _baseURI:string = "https://example.com/";
				};
			} );

			it( "should exist", ():void => {
				expect( Documents.prototype.register ).toBeDefined();
				expect( Documents.prototype.register ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error when id is out scope", ():void => {
				const documents:Documents = new Documents( context );

				expect( () => documents.register( "https://not-example.com/document/" ) ).toThrowError( Errors.IllegalArgumentError, "Cannot register a document outside the scope of this documents instance." );
			} );


			it( "should return empty Document when only id string", ():void => {
				const documents:Documents = new Documents( context );

				const returned:Document = documents.register( "https://example.com/document/" );

				expect( Document.is( returned ) ).toBe( true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/document/",
				} ) );

				expect( returned as Partial<Document> ).toEqual( {} );
			} );

			it( "should return existing Document when id string", ():void => {
				const documents:Documents = new Documents( context );

				interface ExistingDocument {
					alreadyExists:boolean;

					alreadyFunction():void;
				}

				const existingDoc:ExistingDocument = Object.assign(
					documents.getPointer( "https://example.com/document/" ), {
						alreadyExists: true,
						alreadyFunction():void {},
					}
				);

				const returned:ExistingDocument & Document = documents
					.register<ExistingDocument>( "https://example.com/document/" );

				expect( Document.is( returned ) ).toBe( true );
				expect( returned ).toEqual( jasmine.objectContaining( {
					id: "https://example.com/document/",
				} ) );

				expect( returned as ExistingDocument ).toEqual( {
					alreadyExists: true,
					alreadyFunction: jasmine.any( Function ),
				} );

				expect( existingDoc ).toBe( returned );
			} );

		} );


		describe( method( INSTANCE, "listChildren" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty children of a document.", [
					{ name: "parentURI", type: "string", description: "URI of the document from where to look for its children." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), () => {} );

		} );

		describe( method( INSTANCE, "getChildren" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of a document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "parentURI", type: "string", description: "URI of the document from where to look for its children." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), () => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of a document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "parentURI", type: "string", description: "URI of the document from where to look for its children." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), () => {} );

		} );


		describe( method( INSTANCE, "listMembers" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty members of a document.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), () => {} );

		} );

		describe( method( INSTANCE, "getMembers" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of a document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the member retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), () => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of a document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "uri", type: "string", description: "URI of the document from where to look for its members." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder ) => CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the member retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), () => {} );

		} );


		describe( method(
			INSTANCE,
			"addMember"
		), ():void => {


			let context:MockedContext;
			let documents:Documents;

			beforeEach( ():void => {
				context = new MockedContext();
				documents = context.documents;
			} );

			it( hasSignature(
				"Add a member relation to the resource Pointer in the document container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the document container where the member will be added." },
					{ name: "member", type: "CarbonLDP.Pointer", description: "Pointer object that references the resource to add as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {
				expect( documents.addMember ).toBeDefined();
				expect( Utils.isFunction( documents.addMember ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( documents, "addMembers" );

				let pointer:Pointer = documents.getPointer( "new-member/" );
				// noinspection JSIgnoredPromiseFromCall
				documents.addMember( "resource/", pointer );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ pointer ], {} );
			} );

			it( hasSignature(
				"Add a member relation to the resource URI in the document container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the document container where the member will be added." },
					{ name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {
				expect( documents.addMember ).toBeDefined();
				expect( Utils.isFunction( documents.addMember ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( documents, "addMembers" );

				// noinspection JSIgnoredPromiseFromCall
				documents.addMember( "resource/", "new-member/" );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ "new-member/" ], {} );
			} );

			describe( "When Documents has a specified context", ():void => {

				beforeEach( () => {
					context = new class extends MockedContext {
						protected _baseURI:string;

						constructor() {
							super();
							this._baseURI = "https://example.com/";
						}
					};
					documents = context.documents;
				} );

				it( "should reject promise if URI is not in the context base", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMember( "http://not-example.com", "https://example.com/member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `"http://not-example.com" isn't a valid URI for this Carbon instance.` );
						done();
					} );
				} );

				it( "should reject promise if prefixed URI cannot be resolved", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMember( "prefix:the-uri", "https://example.com/member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `The prefixed URI "prefix:the-uri" could not be resolved.` );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.addMember( "https://example.com/", "https://example.com/member/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

			describe( "When Documents does not have a context", ():void => {

				beforeEach( () => {
					documents = new Documents();
				} );

				it( "should reject if URI is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMember( "relative-uri/", "https://example.com/member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if URI is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMember( "prefix:the-uri", "https://example.com/member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should reject if member is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMember( "https://example.com/resource/", "relative-member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if member is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMember( "https://example.com/resource/", "prefix:member" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.addMember( "https://example.com/", "https://example.com/member/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

		} );

		describe( method(
			INSTANCE,
			"addMembers"
		), ():void => {

			it( hasSignature(
				"Add a member relation to every resource URI or Pointer provided in the document container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the document container where the members will be added." },
					{ name: "members", type: "(CarbonLDP.Pointer | string)[]", description: "Array of URIs or Pointers to add as members." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ( done:DoneFn ):void => {
				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.addMembers ).toBeDefined();
				expect( Utils.isFunction( documents.addMembers ) ).toBe( true );

				jasmine.Ajax.stubRequest( "https://example.com/resource/", null, "PUT" ).andReturn( {
					status: 200,
				} );

				let spySuccess:jasmine.Spy = jasmine.createSpy( "success" );
				let spyFail:jasmine.Spy = jasmine.createSpy( "fail" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let members:(Pointer | string)[];

				members = [ documents.getPointer( "new-member-01/" ), "new-member-02/" ];
				promise = documents.addMembers( "resource/", members );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spySuccess, spyFail ) );

				members = [ documents.getPointer( "new-member-01/" ), "new-member-02/", <any> { "something": "nor string or Pointer" } ];
				promise = documents.addMembers( "resource/", members );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spySuccess, spyFail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 1 );
					expect( spySuccess ).toHaveBeenCalledWith( void 0 );

					expect( spyFail ).toHaveBeenCalledTimes( 1 );
					expect( spyFail ).toHaveBeenCalledWith( jasmine.any( Errors.IllegalArgumentError ) );
					done();
				}, done.fail );
			} );

			describe( "When Documents has a specified context", ():void => {
				let documents:Documents;

				beforeEach( () => {
					const context:MockedContext = new class extends MockedContext {
						protected _baseURI:string;

						constructor() {
							super();
							this._baseURI = "https://example.com/";
						}
					}();
					documents = context.documents;
				} );

				it( "should reject promise if URI is not in the context base", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMembers( "http://not-example.com", [ "https://example.com/member/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `"http://not-example.com" isn't a valid URI for this Carbon instance.` );
						done();
					} );
				} );

				it( "should reject promise if prefixed URI cannot be resolved", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMembers( "prefix:the-uri", [ "https://example.com/member/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `The prefixed URI "prefix:the-uri" could not be resolved.` );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.addMembers( "https://example.com/", [ "https://example.com/member/" ] ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

			describe( "When Documents does not have a context", ():void => {
				let documents:Documents;

				beforeEach( () => {
					documents = new Documents();
				} );

				it( "should reject if URI is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMembers( "relative-uri/", [ "https://example.com/member/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if URI is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMembers( "prefix:the-uri", [ "https://example.com/member/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should reject if members is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMembers( "https://example.com/resource/", [ "relative-members/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if member is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.addMembers( "https://example.com/resource/", [ "prefix:member" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.addMembers( "https://example.com/", [ "https://example.com/member/" ] ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

		} );

		describe( method(
			INSTANCE,
			"removeMember"
		), ():void => {


			let context:MockedContext;
			let documents:Documents;

			beforeEach( ():void => {
				context = new MockedContext();
				documents = context.documents;
			} );

			it( hasSignature(
				"Remove the member relation between the Pointer and the resource container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the resource container from where the member will be removed." },
					{ name: "member", type: "CarbonLDP.Pointer", description: "Pointer object that references the resource to remove as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {
				expect( documents.removeMember ).toBeDefined();
				expect( Utils.isFunction( documents.removeMember ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( documents, "removeMembers" );

				let pointer:Pointer = documents.getPointer( "remove-member/" );
				// noinspection JSIgnoredPromiseFromCall
				documents.removeMember( "resource/", pointer );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ pointer ], {} );
			} );

			it( hasSignature(
				"Remove the member relation between the resource URI and the resource container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the resource container from where the member will be removed." },
					{ name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {
				expect( documents.removeMember ).toBeDefined();
				expect( Utils.isFunction( documents.removeMember ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( documents, "removeMembers" );

				// noinspection JSIgnoredPromiseFromCall
				documents.removeMember( "resource/", "remove-member/" );
				expect( spy ).toHaveBeenCalledWith( "resource/", [ "remove-member/" ], {} );
			} );

			describe( "When Documents has a specified context", ():void => {

				beforeEach( () => {
					context = new class extends MockedContext {
						protected _baseURI:string;

						constructor() {
							super();
							this._baseURI = "https://example.com/";
						}
					};
					documents = context.documents;
				} );

				it( "should reject promise if URI is not in the context base", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMember( "http://not-example.com", "https://example.com/member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `"http://not-example.com" isn't a valid URI for this Carbon instance.` );
						done();
					} );
				} );

				it( "should reject promise if prefixed URI cannot be resolved", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMember( "prefix:the-uri", "https://example.com/member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `The prefixed URI "prefix:the-uri" could not be resolved.` );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.removeMember( "https://example.com/", "https://example.com/member/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

			describe( "When Documents does not have a context", ():void => {

				beforeEach( () => {
					documents = new Documents();
				} );

				it( "should reject if URI is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMember( "relative-uri/", "https://example.com/member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if URI is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMember( "prefix:the-uri", "https://example.com/member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should reject if member is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMember( "https://example.com/resource/", "relative-member/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if member is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMember( "https://example.com/resource/", "prefix:member" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.removeMember( "https://example.com/", "https://example.com/member/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

		} );

		describe( method(
			INSTANCE,
			"removeMembers"
		), ():void => {

			it( hasSignature(
				"Remove the member relation to every specified resource URI or Pointer form the document container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the document container where the members will be removed." },
					{ name: "members", type: "(CarbonLDP.Pointer | string)[]", description: "Array of URIs or Pointers to remove as members" },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ( done:DoneFn ):void => {
				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.removeMembers ).toBeDefined();
				expect( Utils.isFunction( documents.removeMembers ) ).toBe( true );

				jasmine.Ajax.stubRequest( "https://example.com/resource/", null, "DELETE" ).andReturn( {
					status: 200,
				} );

				let spySuccess:jasmine.Spy = jasmine.createSpy( "success" );
				let spyFail:jasmine.Spy = jasmine.createSpy( "fail" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;
				let members:(Pointer | string)[];

				members = [ documents.getPointer( "remove-member-01/" ), "remove-member-02/" ];
				promise = documents.removeMembers( "resource/", members );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spySuccess, spyFail ) );

				members = [ documents.getPointer( "remove-member-01/" ), "remove-member-02/", <any> { "something": "nor string or Pointer" } ];
				promise = documents.removeMembers( "resource/", members );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spySuccess, spyFail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 1 );
					expect( spySuccess ).toHaveBeenCalledWith( void 0 );

					expect( spyFail ).toHaveBeenCalledTimes( 1 );
					expect( spyFail ).toHaveBeenCalledWith( jasmine.any( Errors.IllegalArgumentError ) );
					done();
				}, done.fail );
			} );

			describe( "When Documents has a specified context", ():void => {
				let documents:Documents;

				beforeEach( () => {
					const context:MockedContext = new class extends MockedContext {
						protected _baseURI:string;

						constructor() {
							super();
							this._baseURI = "https://example.com/";
						}
					}();
					documents = context.documents;
				} );

				it( "should reject promise if URI is not in the context base", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMembers( "http://not-example.com", [ "https://example.com/member/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `"http://not-example.com" isn't a valid URI for this Carbon instance.` );
						done();
					} );
				} );

				it( "should reject promise if prefixed URI cannot be resolved", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMembers( "prefix:the-uri", [ "https://example.com/member/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `The prefixed URI "prefix:the-uri" could not be resolved.` );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.removeMembers( "https://example.com/", [ "https://example.com/member/" ] ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

			describe( "When Documents does not have a context", ():void => {
				let documents:Documents;

				beforeEach( () => {
					documents = new Documents();
				} );

				it( "should reject if URI is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMembers( "relative-uri/", [ "https://example.com/member/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if URI is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMembers( "prefix:the-uri", [ "https://example.com/member/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should reject if members is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMembers( "https://example.com/resource/", [ "relative-members/" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if members is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeMembers( "https://example.com/resource/", [ "prefix:member" ] );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.removeMembers( "https://example.com/", [ "https://example.com/member/" ] ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

		} );

		describe( method(
			INSTANCE,
			"removeAllMembers"
		), ():void => {

			it( hasSignature(
				"Remove all the member relations from the document container specified.", [
					{ name: "documentURI", type: "string", description: "URI of the document container where the members will be removed." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ( done:DoneFn ):void => {
				let context:MockedContext = new MockedContext();
				let documents:Documents = context.documents;

				expect( documents.removeAllMembers ).toBeDefined();
				expect( Utils.isFunction( documents.removeAllMembers ) ).toBe( true );

				jasmine.Ajax.stubRequest( "https://example.com/resource/", null, "DELETE" ).andReturn( {
					status: 200,
				} );

				let spySuccess:jasmine.Spy = jasmine.createSpy( "success" );
				let spyFail:jasmine.Spy = jasmine.createSpy( "fail" );

				let promises:Promise<any>[] = [];
				let promise:Promise<any>;

				promise = documents.removeAllMembers( "resource/" );
				expect( promise instanceof Promise ).toBe( true );
				promises.push( promise.then( spySuccess, spyFail ) );

				Promise.all( promises ).then( ():void => {
					expect( spySuccess ).toHaveBeenCalledTimes( 1 );
					expect( spySuccess ).toHaveBeenCalledWith( void 0 );

					expect( spyFail ).not.toHaveBeenCalled();
					done();
				} ).catch( done.fail );
			} );

			describe( "When Documents has a specified context", ():void => {
				let documents:Documents;

				beforeEach( () => {
					const context:MockedContext = new class extends MockedContext {
						protected _baseURI:string;

						constructor() {
							super();
							this._baseURI = "https://example.com/";
						}
					}();
					documents = context.documents;
				} );

				it( "should reject promise if URI is not in the context base", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeAllMembers( "http://not-example.com" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `"http://not-example.com" isn't a valid URI for this Carbon instance.` );
						done();
					} );
				} );

				it( "should reject promise if prefixed URI cannot be resolved", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeAllMembers( "prefix:the-uri" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( `The prefixed URI "prefix:the-uri" could not be resolved.` );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.removeAllMembers( "https://example.com/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

			describe( "When Documents does not have a context", ():void => {
				let documents:Documents;

				beforeEach( () => {
					documents = new Documents();
				} );

				it( "should reject if URI is relative", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeAllMembers( "relative-uri/" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support relative URIs." );
						done();
					} );
				} );

				it( "should reject if URI is prefixed", ( done:DoneFn ):void => {
					const promise:Promise<any> = documents.removeAllMembers( "prefix:the-uri" );
					promise.then( () => {
						done.fail( "Should not resolve promise." );
					} ).catch( error => {
						expect( error.message ).toBe( "This Documents instance doesn't support prefixed URIs." );
						done();
					} );
				} );

				it( "should call _parseErrorResponse when request error", ( done:DoneFn ):void => {
					jasmine.Ajax.stubRequest( "https://example.com/" ).andReturn( {
						status: 500,
						responseText: "",
					} );

					const error:Error = new Error( "Error message" );
					const spy:jasmine.Spy = spyOn( documents, "_parseErrorResponse" ).and.callFake( () => Promise.reject( error ) );

					documents.removeAllMembers( "https://example.com/" ).then( () => {
						done.fail( "Should not resolve" );
					} ).catch( _error => {
						expect( spy ).toHaveBeenCalled();

						expect( _error ).toBeDefined();
						expect( _error ).toBe( error );

						done();
					} );
				} );

			} );

		} );


		describe( method( INSTANCE, "refresh" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Update the specified document with the data of the Carbon LDP server, if a newest version exists.", [
					{ name: "persistedDocument", type: "T & CarbonLDP.Document", description: "The persisted document to update." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

		} );

		describe( method( INSTANCE, "saveAndRefresh" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Save and refresh the Document specified.\n" +
				"If the documents is partial the refresh will be executed with another query.", [
					{ name: "persistedDocument", type: "T & CarbonLDP.Document", description: "The persistedDocument to save and refresh." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

		} );


		describe( method(
			INSTANCE,
			"delete"
		), ():void => {

			it( hasSignature(
				"Delete the resource from the Carbon LDP server referred by the URI provided.", [
					{ name: "documentURI", type: "string", description: "The resource to delete from the Carbon LDP server." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

		} );

		describe( method(
			INSTANCE,
			"on",
			"Subscribe to an event notification in any specified URI pattern."
		), ():void => {

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event to subscribe for its notifications." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.on ).toBeDefined();
				expect( documents.on ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return error when does not have context", ( done:DoneFn ):void => {
				const documents:Documents = new Documents();
				documents.on( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
					expect( error.message ).toBe( "This instance does not support messaging subscriptions." );
					done();
				} );
			} );

			it( "should throw error when does not have context and no valid onError is provided", ( done:DoneFn ):void => {
				const documents:Documents = new Documents();
				expect( () => documents.on( "*.*", "resource/", () => done.fail( "Should not enter here" ), null ) )
					.toThrowError( Errors.IllegalStateError, "This instance does not support messaging subscriptions." );
				done();
			} );

			it( "should return error when context is no a Carbon instance", ( done:DoneFn ):void => {
				const documents:Documents = new Documents( new class extends MockedContext {
					_baseURI:string = "https://example.com";
				} );

				documents.on( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
					expect( error.message ).toBe( "This instance does not support messaging subscriptions." );
					done();
				} );
			} );

			it( "should return error when context is no a Carbon instance and no valid onError is provided", ( done:DoneFn ):void => {
				const documents:Documents = new Documents( new class extends MockedContext {
					_baseURI:string = "https://example.com";
				} );

				expect( () => documents.on( "*.*", "resource/", () => done.fail( "Should not enter here" ), null ) )
					.toThrowError( Errors.IllegalStateError, "This instance does not support messaging subscriptions." );
				done();
			} );

			it( "should call the createDestination from the messaging utils", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );
				spyOn( carbon.messaging, "subscribe" );

				const createDestinationSpy:jasmine.Spy = spyOn( MessagingUtils, "createDestination" );

				const event:string = "*.*";
				const uriPattern:string = "resource/*";
				carbon.documents.on( event, uriPattern, () => {
					done.fail( "Should not enter here." );
				}, () => {
					done.fail( "Should not enter here." );
				} );

				expect( createDestinationSpy ).toHaveBeenCalledWith( event, uriPattern, carbon.baseURI );
				done();
			} );

			it( "should subscribe with the Messaging Service", ( done:DoneFn ):void => {
				const destinationString:string = "destination/!*";
				spyOn( MessagingUtils, "createDestination" ).and.returnValue( destinationString );

				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( carbon.messaging, "subscribe" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};
				carbon.documents.on( "*.*", "resource/!*", onEvent, onError );

				expect( subscribeSpy ).toHaveBeenCalledWith( destinationString, onEvent, onError );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"off",
			"Remove the subscription of the URI pattern event specified that have the exact onEvent callback provided."
		), ():void => {

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event of the subscription to remove." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) of the subscription to remove." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "The onEvent callback of the subscription to be removed.\nIt must be the same call back provided in the `on` methods." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the error thrown trying to remove the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.off ).toBeDefined();
				expect( documents.off ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return error when does not have context", ( done:DoneFn ):void => {
				const documents:Documents = new Documents();
				documents.off( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
					expect( error.message ).toBe( "This instance does not support messaging subscriptions." );
					done();
				} );
			} );

			it( "should throw error when does not have context and no valid onError is provided", ( done:DoneFn ):void => {
				const documents:Documents = new Documents();
				expect( () => documents.off( "*.*", "resource/", () => done.fail( "Should not enter here" ), null ) )
					.toThrowError( Errors.IllegalStateError, "This instance does not support messaging subscriptions." );
				done();
			} );

			it( "should return error when context is no a Carbon instance", ( done:DoneFn ):void => {
				const documents:Documents = new Documents( new class extends MockedContext {
					_baseURI:string = "https://example.com";
				} );

				documents.off( "*.*", "resource/", () => {
					done.fail( "Should not enter here" );
				}, ( error:Error ) => {
					expect( error ).toEqual( jasmine.any( Errors.IllegalStateError ) );
					expect( error.message ).toBe( "This instance does not support messaging subscriptions." );
					done();
				} );
			} );

			it( "should return error when context is no a Carbon instance and no valid onError is provided", ( done:DoneFn ):void => {
				const documents:Documents = new Documents( new class extends MockedContext {
					_baseURI:string = "https://example.com";
				} );

				expect( () => documents.off( "*.*", "resource/", () => done.fail( "Should not enter here" ), null ) )
					.toThrowError( Errors.IllegalStateError, "This instance does not support messaging subscriptions." );
				done();
			} );

			it( "should call the createDestination from the messaging utils", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );
				spyOn( carbon.messaging, "subscribe" );

				const createDestinationSpy:jasmine.Spy = spyOn( MessagingUtils, "createDestination" );

				const event:string = "*.*";
				const uriPattern:string = "resource/!*";
				carbon.documents.off( event, uriPattern, () => {
					done.fail( "Should not enter here." );
				}, () => {
					done.fail( "Should not enter here." );
				} );

				expect( createDestinationSpy ).toHaveBeenCalledWith( event, uriPattern, carbon.baseURI );
				done();
			} );

			it( "should unsubscribe with the Messaging Service", ( done:DoneFn ):void => {
				const destinationString:string = "destination/!*";
				spyOn( MessagingUtils, "createDestination" ).and.returnValue( destinationString );

				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const unsubscribeSpy:jasmine.Spy = spyOn( carbon.messaging, "unsubscribe" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};
				carbon.documents.off( "*.*", "resource/!*", onEvent, onError );

				expect( unsubscribeSpy ).toHaveBeenCalledWith( destinationString, onEvent );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"one",
			"Subscribe to only one event notification in any specified URI pattern."
		), ():void => {

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.CHILD_CREATED", description: "The event to subscribe for the notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED", description: "The event to subscribe for the notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_CREATED", description: "The event to subscribe for the notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED", description: "The event to subscribe for the notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.DOCUMENT_DELETED", description: "The event to subscribe for the notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_ADDED", description: "The event to subscribe for the notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event.MEMBER_REMOVED", description: "The event to subscribe for the notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( hasSignature(
				[
					{ name: "event", type: "CarbonLDP.Messaging.Event | string", description: "The event to subscribe for the notification." },
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for the event specified." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.EventMessage ) => void", description: "Callback that receives the data message from the notification event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.one ).toBeDefined();
				expect( documents.one ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `on` method", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const event:string = "*.*";
				const uriPattern:string = "resource/!*";
				carbon.documents.one( event, uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalledWith( event, uriPattern, jasmine.any( Function ), onError );
				done();
			} );

			it( "should call the `off` method when the notification has been resolved", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const offSpy:jasmine.Spy = spyOn( carbon.documents, "off" );
				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" )
					.and.callFake( ( _event:string, _uriPattern:string, _onEvent:( data:any ) => void ):void => _onEvent( "I'm calling you!" ) );

				const onEvent:( data:any ) => void = ( data:any ) => {
					expect( data ).toBe( "I'm calling you!" );
					done();
				};

				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const event:string = "*.*";
				const uriPattern:string = "resource/!*";
				carbon.documents.one( event, uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalled();
				expect( offSpy ).toHaveBeenCalledWith( event, uriPattern, jasmine.any( Function ), onError );
			} );

			it( "should subscribe and unsubscribe with the same destination and function", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const subscribeSpy:jasmine.Spy = spyOn( carbon.messaging, "subscribe" )
					.and.callFake( ( destination:string, onEvent:() => void ) => onEvent() );
				const unsubscribeSpy:jasmine.Spy = spyOn( carbon.messaging, "unsubscribe" );

				carbon.documents.one( "*.*", "resource/!*", () => void 0, done.fail );

				expect( subscribeSpy ).toHaveBeenCalled();
				expect( unsubscribeSpy ).toHaveBeenCalled();

				expect( subscribeSpy.calls.first().args )
					.toEqual( jasmine.arrayContaining( unsubscribeSpy.calls.first().args ) );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"onDocumentCreated"
		), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_CREATED` event notifications for the specified URI pattern.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentCreated ) => void", description: "Callback that receives the data message from the notifications event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.onDocumentCreated ).toBeDefined();
				expect( documents.onDocumentCreated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `on` method", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const uriPattern:string = "resource/!*";
				carbon.documents.onDocumentCreated( uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalledWith( Event.DOCUMENT_CREATED, uriPattern, onEvent, onError );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"onChildCreated"
		), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.CHILD_CREATED` event notifications for the specified URI pattern.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.ChildCreated ) => void", description: "Callback that receives the data message from the notifications event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.onChildCreated ).toBeDefined();
				expect( documents.onChildCreated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `on` method", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const uriPattern:string = "resource/!*";
				carbon.documents.onChildCreated( uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalledWith( Event.CHILD_CREATED, uriPattern, onEvent, onError );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"onAccessPointCreated"
		), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.ACCESS_POINT_CREATED` event notifications for the specified URI pattern.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.AccessPointCreated ) => void", description: "Callback that receives the data message from the notifications event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.onAccessPointCreated ).toBeDefined();
				expect( documents.onAccessPointCreated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `on` method", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const uriPattern:string = "resource/!*";
				carbon.documents.onAccessPointCreated( uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalledWith( Event.ACCESS_POINT_CREATED, uriPattern, onEvent, onError );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"onDocumentModified"
		), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_MODIFIED` event notifications for the specified URI pattern.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentModified ) => void", description: "Callback that receives the data message from the notifications event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.onDocumentModified ).toBeDefined();
				expect( documents.onDocumentModified ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `on` method", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const uriPattern:string = "resource/!*";
				carbon.documents.onDocumentModified( uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalledWith( Event.DOCUMENT_MODIFIED, uriPattern, onEvent, onError );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"onDocumentDeleted"
		), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.DOCUMENT_DELETED` event notifications for the specified URI pattern.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.DocumentDeleted ) => void", description: "Callback that receives the data message from the notifications event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.onDocumentDeleted ).toBeDefined();
				expect( documents.onDocumentDeleted ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `on` method", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const uriPattern:string = "resource/!*";
				carbon.documents.onDocumentDeleted( uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalledWith( Event.DOCUMENT_DELETED, uriPattern, onEvent, onError );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"onMemberAdded"
		), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_ADDED` event notifications for the specified URI pattern.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberAdded ) => void", description: "Callback that receives the data message from the notifications event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.onMemberAdded ).toBeDefined();
				expect( documents.onMemberAdded ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `on` method", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const uriPattern:string = "resource/!*";
				carbon.documents.onMemberAdded( uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalledWith( Event.MEMBER_ADDED, uriPattern, onEvent, onError );
				done();
			} );

		} );

		describe( method(
			INSTANCE,
			"onMemberRemoved"
		), ():void => {

			it( hasSignature(
				"Subscribe to the `CarbonLDP.Messaging.Event.MEMBER_REMOVED` event notifications for the specified URI pattern.",
				[
					{ name: "uriPattern", type: "string", description: "URI and/or pattern of the resource(s) to subscribe for." },
					{ name: "onEvent", type: "( message:CarbonLDP.Messaging.MemberRemoved ) => void", description: "Callback that receives the data message from the notifications event." },
					{ name: "onError", type: "( error:Error ) => void", description: "Callback that receives the errors thrown by the subscription." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				const documents:Documents = new Documents();
				expect( documents.onMemberRemoved ).toBeDefined();
				expect( documents.onMemberRemoved ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `on` method", ( done:DoneFn ):void => {
				const carbon:CarbonLDP = new CarbonLDP( "https://example.com" );

				const onSpy:jasmine.Spy = spyOn( carbon.documents, "on" );

				const onEvent:( data:any ) => void = () => {
					done.fail( "Should not enter here." );
				};
				const onError:( error:Error ) => void = () => {
					done.fail( "Should not enter here." );
				};

				const uriPattern:string = "resource/!*";
				carbon.documents.onMemberRemoved( uriPattern, onEvent, onError );

				expect( onSpy ).toHaveBeenCalledWith( Event.MEMBER_REMOVED, uriPattern, onEvent, onError );
				done();
			} );

		} );

	} );

	describe( "Decorated Pointer", ():void => {

		let pointer:Pointer;
		let documents:Documents;
		let context:MockedContext;
		beforeEach( () => {
			context = new class extends MockedContext {
				_baseURI:string = "https://example.com/";
				_settings:ContextSettings = { vocabulary: "https://example.com/ns#" };
			};
			documents = context.documents;

			pointer = documents.getPointer( "pointer/" );
		} );

		it( "should add types to query", ( done:DoneFn ):void => {
			const resource:TransientResource = TransientResource.decorate( pointer );
			resource.addType( "https://example.com/ns#Type-1" );
			resource.addType( "https://example.com/ns#Type-2" );

			context.extendObjectSchema( "https://example.com/ns#Type-2", {
				"name": { "@id": "name" },
			} );

			const spy:jasmine.Spy = spyOn( documents, "executeRawCONSTRUCTQuery" )
				.and.returnValue( Promise.reject( null ) );

			resource
				.resolve( _ => _
					.withType( "Another" )
					.properties( {
						"name": { "@type": "string" },
					} )
				)
				.then( () => done.fail( "should not resolve" ) )
				.catch( error => {
					if( error ) done.fail( error );

					expect( spy ).toHaveBeenCalledWith(
						"https://example.com/pointer/",

						"CONSTRUCT {" +
						` ?metadata a <${ C.VolatileResource }>, <${ C.QueryMetadata }>;` +
						"" + ` <${ C.target }> ?document.` +

						" ?document a ?document__types;" +
						"" + " <https://example.com/ns#name> ?document__name " +

						"} WHERE {" +
						" BIND(BNODE() AS ?metadata)." +

						" VALUES ?document { <https://example.com/pointer/> }." +
						" OPTIONAL { ?document a ?document__types }." +
						" ?document a <https://example.com/ns#Type-1>, <https://example.com/ns#Type-2>, <https://example.com/ns#Another>." +

						" OPTIONAL {" +
						"" + " ?document <https://example.com/ns#name> ?document__name." +
						"" + " FILTER( datatype( ?document__name ) = <http://www.w3.org/2001/XMLSchema#string> )" +
						" } " +
						"}",

						jasmine.any( Object )
					);

					done();
				} );
		} );

	} );

} );
