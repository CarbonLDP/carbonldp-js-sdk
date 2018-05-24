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

	} );

} );
