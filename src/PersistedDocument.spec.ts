import {
	INSTANCE,
	STATIC,

	OPTIONAL,
	OBLIGATORY,

	module,
	clazz,
	method,
	interfaze,

	isDefined,
	hasMethod,
	hasSignature,
	hasProperty,
	extendsClass,
	decoratedObject,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as AccessPoint from "./AccessPoint";
import AbstractContext from "./AbstractContext";
import * as Document from "./Document";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as Fragment from "./Fragment";
import * as HTTP from "./HTTP";
import * as NamedFragment from "./NamedFragment";
import * as PersistedFragment from "./PersistedFragment";
import * as PersistedNamedFragment from "./PersistedNamedFragment";
import * as Pointer from "./Pointer";
import * as RetrievalPreferences from "./RetrievalPreferences";
import * as URI from "./RDF/URI";
import * as Utils from "./Utils";

import { QueryClause } from "sparqler/Clauses";

import * as PersistedDocument from "./PersistedDocument";
import DefaultExport from "./PersistedDocument";

describe( module( "Carbon/PersistedDocument" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedDocument ).toBeDefined();
		expect( Utils.isObject( PersistedDocument ) ).toEqual( true );
	} );

	describe( interfaze(
		"Carbon.PersistedDocument.Class",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.Document.Class" ), ():void => {} );
		it( extendsClass( "Carbon.PersistedResource.Class" ), ():void => {} );
		it( extendsClass( "Carbon.DocumentedDocument.Class" ), ():void => {} );
		it( extendsClass( "Carbon.Messaging.Document.Class" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"created",
			"Date",
			"The time when the document was persisted."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"modified",
			"Date",
			"The last time the document was saved."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"defaultInteractionModel",
			"Carbon.Pointer.Class",
			"A Pointer representing the default interaction model of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"Carbon.Pointer.Class",
			"A Pointer with the member of relation of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"Carbon.Pointer.Class",
			"A Pointer with the inverted relation the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"accessPoints",
			"Carbon.Pointer.Class[]",
			"Array with the access points of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"contains",
			"Carbon.Pointer.Class",
			"Array with the children of the document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_etag",
			"string",
			"The ETag (entity tag) of the persisted document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_fragmentsIndex",
			"Map<string, Carbon.PersistedFragment.Class>",
			"Map that stores the persisted fragments (named fragments and blank nodes) of the document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_savedFragments",
			"Carbon.PersistedFragment.Class[]",
			"Array with a copy of every fragment that that is currently persisted in the server."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"_syncSavedFragments",
			"Set all the current fragments in the document as fragments that are saved in the server."
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"createFragment"
		), ():void => {

			it( hasSignature(
				[ "T extends Object" ],
				"Creates a PersistedFragment from the object provided and the slug specified.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & Carbon.PersistedFragment.Class" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends Object" ],
				"Creates a PersistedBlankNode from the object provided, sing no slug was specified.", [
					{ name: "object", type: "T" },
				],
				{ type: "T & Carbon.PersistedFragment.Class" }
			), ():void => {} );

			it( hasSignature(
				"Creates a PersistedFragment with the slug provided.", [
					{ name: "slug", type: "string" },
				],
				{ type: "Carbon.PersistedFragment.Class" }
			), ():void => {} );

			it( hasSignature(
				"Creates a PersistedBlankNode, since no slug is provided",
				{ type: "Carbon.PersistedFragment.Class" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createNamedFragment"
		), ():void => {

			it( hasSignature(
				"Creates a PersistedNamedFragment with the slug provided", [
					{ name: "slug", type: "string" },
				],
				{ type: "Carbon.PersistedNamedFragment.Class" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Creates a PersistedNamedFragment from the object provided and the slug specified.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & Carbon.PersistedNamedFragment.Class" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"refresh",
			[ "T" ],
			"Sync the persisted document with the data in the server.",
			{ type: "Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"save",
			[ "T" ],
			"Save the persisted document to the server.", [
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"saveAndRefresh",
			[ "T" ],
			"Save and refresh the persisted document.",
			{ type: "Promise<[ T & Carbon.PersistedDocument.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"delete",
			"Remove the data in the server referred by the id of the persisted document.",
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getDownloadURL",
			"Returns the URI of the current document with the properties necessarily for a single download request.",
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"addMember"
		), ():void => {

			it( hasSignature(
				"Adds the specified resource Pointer as a member of the document.", [
					{ name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to add as a member." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {} );

			it( hasSignature(
				"Adds the specified resource URI as a member of the document.", [
					{ name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"addMembers",
			"Adds the specified resources as members of the document.", [
				{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of URIs or Pointers to add as members." },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"createChild"
		), ():void => {

			it( hasSignature(
				[ "T" ],
				"Persists a document with the slug specified as a child of the current document.", [
					{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it's transformed into one." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Persists a document as a child of the current document.", [
					{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it's transformed into one." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				"Creates an persists an empty child for the current document with the slug provided.", [
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				"Creates and persists an empty child fot he current document.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createChildren"
		), ():void => {

			it( hasSignature(
				[ "T" ],
				"Persists multiple JavaScript objects as children of the current document.", [
					{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new UNRESOLVED persisted children, and another array with the response class of every request." }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Persists multiple JavaScript objects as children of the current document.", [
					{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new UNRESOLVED persisted children, and another array with the response class of every request." }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createChildAndRetrieve",
			"Create a child for the document and retrieves the updated data from the server."
		), ():void => {

			it( hasSignature(
				[ "T" ], [
					{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one." },
					{ name: "slug", type: "string", description: "The slug name for the children URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ], [
					{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
			), ():void => {} );

			it( hasSignature( [
					{ name: "slug", type: "string", description: "The slug name for the children URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
			), ():void => {} );

			it( hasSignature( [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createChildrenAndRetrieve"
		), ():void => {

			it( hasSignature(
				[ "T" ],
				"Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.", [
					{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new resolved persisted children, and another array with the response class of every request." }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.", [
					{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new resolved persisted children, and another array with the response class of every request." }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createAccessPoint"
		), ():void => {

			it( hasSignature(
				[ "T" ],
				"Create an AccessPoint for the document with the slug specified.", [
					{ name: "accessPoint", type: "T & Carbon.AccessPoint.Class", description: "AccessPoint Document to persist." },
					{ name: "slug", type: "string", optional: true, description: "Slug that will be used for the URI of the new access point." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customisable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Create an AccessPoint for the document.", [
					{ name: "accessPoint", type: "T & Carbon.AccessPoint.Class", description: "AccessPoint Document to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response ]>" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createAccessPoints"
		), ():void => {

			it( hasSignature(
				[ "T" ],
				"Create multiple access points for the current document with the slug specified.", [
					{ name: "accessPoints", type: "(T & Carbon.AccessPoint.Class)[]", description: "The access points to persist." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customisable options for the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new and UNRESOLVED persisted access points, and the array containing the response classes of every request." }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Create multiple access points for the current document.", [
					{ name: "accessPoints", type: "(T & Carbon.AccessPoint.Class)[]", description: "The access points to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new and UNRESOLVED persisted access points, and the array containing the response classes of every request." }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"listChildren",
			"Retrieves an array of unresolved persisted documents that refers to the children of the current document.",
			{ type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getChildren",
			[ "T" ],
			"Retrieves an array of resolved persisted documents that refers to the children of the current document, in accordance to the retrieval preferences specified.", [
				{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true },
			],
			{ type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"listMembers",
			"Retrieves an array of unresolved persisted documents that refers to the members of the current document.", [
				{ name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`." },
			],
			{ type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"getMembers"
		), ():void => {

			it( hasSignature(
				[ "T" ],
				"Retrieves an array of resolved persisted documents that refers to the members of the current document, in accordance to the retrieval preferences specified.", [
					{ name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`." },
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true },
				],
				{ type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T" ],
				"Retrieves an array of resolved persisted documents that refers to the members of the current document, including the non readable elements, in accordance to the retrieval preferences specified.", [
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true },
				],
				{ type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"removeMember"
		), ():void => {

			it( hasSignature(
				"Remove the specified resource Pointer as a member of the current document.", [
					{ name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to remove as a member." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {} );

			it( hasSignature(
				"Remove the specified resource URI as a member of the current document.", [
					{ name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"removeMembers",
			"Remove the specified resources URI or Pointers as members of the current document.", [
				{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of URIs or Pointers to remove as members" },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeAllMembers",
			"Remove the specified resources URI or Pointers as members of the current document.",
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"upload"
		), ():void => {

			it( hasSignature(
				"Upload a File to the server as a child of the current document with the slug specified. This signature only works in a web browser.", [
					{ name: "data", type: "Blob", description: "Binary data to store in the server." },
					{ name: "slug", type: "string", description: "The slug that will be used in the URI of the data." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				"Upload a File to the server as a child of the current document. This signature only works in a web browser.", [
					{ name: "data", type: "Blob", description: "Binary data to store in the server." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				"Upload a File to the server as a child of the current document with the slug specified. This signature only works with Node.js.", [
					{ name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js." },
					{ name: "slug", type: "string", description: "The slug that will be used in the URI of the data." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

			it( hasSignature(
				"Upload a File to the server as a child of the current document. This signature only works with Node.js.", [
					{ name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawASKQuery",
			"Executes an ASK query in the document and returns a raw application/sparql-results+json object.", [
				{ name: "askQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeASKQuery",
			"Executes an ASK query in the document and returns a boolean of the result.", [
				{ name: "askQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawSELECTQuery",
			"Executes a SELECT query in the document and returns a raw application/sparql-results+json object.", [
				{ name: "selectQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeSELECTQuery",
			[ "T" ],
			"Executes a SELECT query in the document and returns the results as a `Carbon.SPARQL.SELECTResults.Class` object.", [
				{ name: "selectQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ Carbon.SPARQL.SELECTResults.Class<T>, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawCONSTRUCTQuery",
			"Executes a CONSTRUCT query in the document and returns a string with the resulting model.", [
				{ name: "constructQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawDESCRIBEQuery",
			"Executes a DESCRIBE query in the document and returns a string with the resulting model.", [
				{ name: "constructQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeUPDATE",
			"Executes an UPDATE query.", [
				{ name: "updateQuery", type: "string", description: "UPDATE query to execute in the selected endpoint." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<Carbon.HTTP.Response.Class>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"sparql",
			"Method that creates an instance of SPARQLER for the document end-point.",
			{ type: "SPARQLER/Clauses/QueryClause" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.PersistedDocument.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedDocument.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz(
		"Carbon.PersistedDocument.Factory",
		"Factory class for `Carbon.PersistedDocument.Class` objects."
	), ():void => {
		let context:AbstractContext;

		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.setSetting( "system.container", ".system/" );
				}
			}

			context = new MockedContext();
		} );

		it( isDefined(), ():void => {
			expect( PersistedDocument.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the Document provided has the properties and methods of a `Carbon.PersistedDocument.Class` object.", [
				{ name: "document", type: "Carbon.Document.Class" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedDocument.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.hasClassProperties ) ).toBe( true );

			let document:any = undefined;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );

			document = {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,

				_etag: null,

				refresh: ():void => {},
				save: ():void => {},
				saveAndRefresh: ():void => {},
				delete: ():void => {},

				getDownloadURL: ():void => {},

				addMember: ():void => {},
				addMembers: ():void => {},
				createAccessPoint: ():void => {},
				createAccessPoints: ():void => {},
				createChild: ():void => {},
				createChildren: ():void => {},
				createChildAndRetrieve: ():void => {},
				createChildrenAndRetrieve: ():void => {},
				listChildren: ():void => {},
				getChildren: ():void => {},
				listMembers: ():void => {},
				getMembers: ():void => {},
				removeMember: ():void => {},
				removeMembers: ():void => {},
				removeAllMembers: ():void => {},
				upload: ():void => {},

				executeRawASKQuery: ():void => {},
				executeASKQuery: ():void => {},
				executeRawSELECTQuery: ():void => {},
				executeSELECTQuery: ():void => {},
				executeRawDESCRIBEQuery: ():void => {},
				executeRawCONSTRUCTQuery: ():void => {},
				executeUPDATE: ():void => {},

				sparql: ():void => {},
			};
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );

			delete document.accessPoints;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			document.accessPoints = null;

			delete document.created;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			document.created = null;

			delete document.modified;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			document.modified = null;

			delete document.defaultInteractionModel;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( true );
			document.defaultInteractionModel = null;

			delete document._etag;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document._etag = null;

			delete document.refresh;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.refresh = ():void => {};

			delete document.save;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.save = ():void => {};

			delete document.saveAndRefresh;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.saveAndRefresh = ():void => {};

			delete document.delete;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.delete = ():void => {};

			delete document.getDownloadURL;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.getDownloadURL = ():void => {};

			delete document.addMember;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.addMember = ():void => {};

			delete document.addMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.addMembers = ():void => {};

			delete document.createAccessPoint;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createAccessPoint = ():void => {};

			delete document.createAccessPoints;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createAccessPoints = ():void => {};

			delete document.createChild;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createChild = ():void => {};

			delete document.createChildren;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createChildren = ():void => {};

			delete document.createChildAndRetrieve;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createChildAndRetrieve = ():void => {};

			delete document.createChildrenAndRetrieve;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.createChildrenAndRetrieve = ():void => {};

			delete document.listChildren;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.listChildren = ():void => {};

			delete document.getChildren;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.getChildren = ():void => {};

			delete document.listMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.listMembers = ():void => {};

			delete document.getMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.getMembers = ():void => {};

			delete document.removeMember;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeMember = ():void => {};

			delete document.removeMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeMembers = ():void => {};

			delete document.removeAllMembers;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeAllMembers = ():void => {};

			delete document.upload;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.upload = ():void => {};

			delete document.executeRawASKQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeRawASKQuery = ():void => {};

			delete document.executeASKQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeASKQuery = ():void => {};

			delete document.executeRawSELECTQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeRawSELECTQuery = ():void => {};

			delete document.executeSELECTQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeSELECTQuery = ():void => {};

			delete document.executeRawDESCRIBEQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeRawDESCRIBEQuery = ():void => {};

			delete document.executeRawCONSTRUCTQuery;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeRawCONSTRUCTQuery = ():void => {};

			delete document.executeUPDATE;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.executeUPDATE = ():void => {};

			delete document.sparql;
			expect( PersistedDocument.Factory.hasClassProperties( document ) ).toBe( false );
			document.sparql = ():void => {};
		} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the element provided is considered a `Carbon.PersistedDocument.Class` object.", [
				{ name: "object", type: "Object" },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedDocument.Factory.is ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.is ) ).toBe( true );

			expect( PersistedDocument.Factory.is( undefined ) ).toBe( false );
			expect( PersistedDocument.Factory.is( null ) ).toBe( false );
			expect( PersistedDocument.Factory.is( "a string" ) ).toBe( false );
			expect( PersistedDocument.Factory.is( 100 ) ).toBe( false );
			expect( PersistedDocument.Factory.is( {} ) ).toBe( false );

			let object:any = Document.Factory.createFrom( {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,

				_documents: null,
				_etag: null,

				refresh: ():void => {},
				save: ():void => {},
				saveAndRefresh: ():void => {},
				delete: ():void => {},

				getDownloadURL: ():void => {},

				addMember: ():void => {},
				addMembers: ():void => {},
				createAccessPoint: ():void => {},
				createAccessPoints: ():void => {},
				createChild: ():void => {},
				createChildren: ():void => {},
				createChildAndRetrieve: ():void => {},
				createChildrenAndRetrieve: ():void => {},
				listChildren: ():void => {},
				getChildren: ():void => {},
				listMembers: ():void => {},
				getMembers: ():void => {},
				removeMember: ():void => {},
				removeMembers: ():void => {},
				removeAllMembers: ():void => {},
				upload: ():void => {},

				executeRawASKQuery: ():void => {},
				executeASKQuery: ():void => {},
				executeRawSELECTQuery: ():void => {},
				executeSELECTQuery: ():void => {},
				executeRawDESCRIBEQuery: ():void => {},
				executeRawCONSTRUCTQuery: ():void => {},
				executeUPDATE: ():void => {},

				sparql: ():void => {},

				// Messaging methods
				on: ():void => {},
				off: ():void => {},
				one: ():void => {},
				onDocumentCreated: ():void => {},
				onChildCreated: ():void => {},
				onAccessPointCreated: ():void => {},
				onDocumentModified: ():void => {},
				onDocumentDeleted: ():void => {},
				onMemberAdded: ():void => {},
				onMemberRemoved: ():void => {},
			} );
			expect( PersistedDocument.Factory.is( object ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"create",
			"Creates an empty `Carbon.PersistedDocument.Class` object with the URI provided.", [
				{ name: "uri", type: "string" },
				{ name: "documents", type: "Carbon.Documents.Class", description: "The Documents instance to which the persisted document belongs." },
			],
			{ type: "Carbon.PersistedDocument.Class" }
		), ():void => {
			expect( PersistedDocument.Factory.create ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.create ) ).toBe( true );

			let document:PersistedDocument.Class;
			document = PersistedDocument.Factory.create( "http://example.com/document/", context.documents );
			expect( PersistedDocument.Factory.is( document ) ).toBe( true );

			expect( document.id ).toBe( "http://example.com/document/" );
			expect( document._documents ).toBe( context.documents );
		} );

		it( hasMethod(
			STATIC,
			"createFrom",
			[ "T extends Object" ],
			"Creates a PersistedDocument object from the object and URI provided.", [
				{ name: "object", type: "T" },
				{ name: "uri", type: "string" },
				{ name: "documents", type: "Carbon.Documents.Class", description: "The Documents instance to which the persisted document belongs." },
			],
			{ type: "T & Carbon.PersistedDocument.Class" }
		), ():void => {
			expect( PersistedDocument.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.createFrom ) ).toBe( true );

			interface MyObject {
				myProperty?:string;
			}

			interface MyPersistedDocument extends MyObject, PersistedDocument.Class {}

			let persistedDocument:MyPersistedDocument;

			persistedDocument = PersistedDocument.Factory.createFrom<MyObject>( {}, "http://example.com/document/", context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.id ).toBe( "http://example.com/document/" );

			persistedDocument = PersistedDocument.Factory.createFrom<MyObject>( { myProperty: "a property" }, "http://example.com/document/", context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.id ).toBe( "http://example.com/document/" );
			expect( persistedDocument.myProperty ).toBe( "a property" );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.PersistedDocument.Class` object.", [
				{ name: "object", type: "T" },
				{ name: "documents", type: "Carbon.Documents.Class", description: "The Documents instance to which the persisted document belongs." },
			],
			{ type: "T & Carbon.PersistedDocument.Class" }
		), ():void => {
			expect( PersistedDocument.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.Factory.decorate ) ).toBe( true );

			interface MyObject {
				myProperty?:string;
			}

			interface MyDocument extends MyObject, Document.Class {}

			let document:MyDocument;

			interface MyPersistedDocument extends MyObject, PersistedDocument.Class {
			}

			let persistedDocument:MyPersistedDocument;

			document = Document.Factory.createFrom<MyObject>( {} );
			persistedDocument = PersistedDocument.Factory.decorate<MyDocument>( document, context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.myProperty ).toBeUndefined();
			expect( persistedDocument._documents ).toBe( context.documents );

			document = Document.Factory.createFrom<MyObject>( { myProperty: "a property" } );
			persistedDocument = PersistedDocument.Factory.decorate<MyDocument>( document, context.documents );
			expect( PersistedDocument.Factory.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.myProperty ).toBeDefined();
			expect( persistedDocument.myProperty ).toBe( "a property" );
			expect( persistedDocument._documents ).toBe( context.documents );
		} );

		describe( decoratedObject(
			"Object decorated by the `Carbon.PersistedDocument.Factory.decorate()` function.", [
				"Carbon.PersistedDocument.Class",
			]
		), ():void => {
			let document:PersistedDocument.Class;

			beforeEach( ():void => {
				context.setSetting( "vocabulary", "vocab#" );
				context.extendObjectSchema( {
					"exTypes": "http://example.com/types#",
					"another": "http://example.com/another-url/ns#",
				} );

				context.documents.getPointer( "http://example.com/in/documents/" );

				document = PersistedDocument.Factory.create( "http://example.com/document/", context.documents );
				document.createNamedFragment( "fragment" );
				document.createFragment( "_:BlankNode" );
			} );

			it( hasProperty(
				INSTANCE,
				"_documents",
				"Carbon.Documents.Class",
				"The Documents instance to which the document belongs."
			), ():void => {
				expect( document._documents ).toBeDefined();
				expect( Utils.isObject( document._documents ) ).toBe( true );
				expect( document._documents instanceof Documents ).toBe( true );
			} );

			it( hasProperty(
				INSTANCE,
				"_etag",
				"string",
				"The ETag (entity tag) of the persisted document."
			), ():void => {
				expect( document._etag ).toBeDefined();
				// By default, the ETag is null.
				expect( document._etag ).toBeNull();
			} );

			it( hasMethod(
				INSTANCE,
				"addType",
				"Adds a type to the Document. Relative and prefixed types are resolved before the operation.", [
					{ name: "type", type: "string", description: "The type to be added." },
				]
			), ():void => {
				expect( document.addType ).toBeDefined();
				expect( Utils.isFunction( document.addType ) ).toBe( true );

				expect( document.types.length ).toBe( 0 );

				document.addType( "http://example.com/types#Type-1" );
				expect( document.types.length ).toBe( 1 );
				expect( document.types ).toContain( "http://example.com/types#Type-1" );

				document.addType( "http://example.com/types#Type-2" );
				expect( document.types.length ).toBe( 2 );
				expect( document.types ).toContain( "http://example.com/types#Type-1" );
				expect( document.types ).toContain( "http://example.com/types#Type-2" );

				document.addType( "exTypes:Type-3" );
				expect( document.types.length ).toBe( 3 );
				expect( document.types ).toContain( "http://example.com/types#Type-1" );
				expect( document.types ).toContain( "http://example.com/types#Type-2" );
				expect( document.types ).toContain( "http://example.com/types#Type-3" );

				document.addType( "another:Type-0" );
				expect( document.types.length ).toBe( 4 );
				expect( document.types ).toContain( "http://example.com/types#Type-1" );
				expect( document.types ).toContain( "http://example.com/types#Type-2" );
				expect( document.types ).toContain( "http://example.com/types#Type-3" );
				expect( document.types ).toContain( "http://example.com/another-url/ns#Type-0" );

				document.addType( "Current-Type" );
				expect( document.types.length ).toBe( 5 );
				expect( document.types ).toContain( "http://example.com/types#Type-1" );
				expect( document.types ).toContain( "http://example.com/types#Type-2" );
				expect( document.types ).toContain( "http://example.com/types#Type-3" );
				expect( document.types ).toContain( "http://example.com/another-url/ns#Type-0" );
				expect( document.types ).toContain( "http://example.com/vocab#Current-Type" );
			} );

			it( hasMethod(
				INSTANCE,
				"hasType",
				"Returns true if the Document contains the type specified. Relative and prefixed types are resolved before the operation.", [
					{ name: "type", type: "string", description: "The type to look for." },
				]
			), ():void => {
				expect( document.hasType ).toBeDefined();
				expect( Utils.isFunction( document.hasType ) ).toBe( true );

				document.types = [ "http://example.com/types#Type-1" ];
				expect( document.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( document.hasType( "exTypes:Type-1" ) ).toBe( true );
				expect( document.hasType( "http://example.com/types#Type-2" ) ).toBe( false );


				document.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2" ];
				expect( document.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( document.hasType( "exTypes:Type-1" ) ).toBe( true );
				expect( document.hasType( "http://example.com/types#Type-2" ) ).toBe( true );
				expect( document.hasType( "exTypes:Type-2" ) ).toBe( true );
				expect( document.hasType( "http://example.com/types#Type-3" ) ).toBe( false );
				expect( document.hasType( "exTypes:#Type-3" ) ).toBe( false );

				document.types = [ "http://example.com/types#Type-1", "http://example.com/another-url/ns#Type-2" ];
				expect( document.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( document.hasType( "exTypes:Type-1" ) ).toBe( true );
				expect( document.hasType( "another:Type-1" ) ).toBe( false );
				expect( document.hasType( "http://example.com/another-url/ns#Type-2" ) ).toBe( true );
				expect( document.hasType( "exTypes:Type-2" ) ).toBe( false );
				expect( document.hasType( "another:Type-2" ) ).toBe( true );

				document.types = [ "http://example.com/types#Type-1", "http://example.com/another-url/ns#Type-2", "http://example.com/vocab#Current-Type" ];
				expect( document.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( document.hasType( "exTypes:Type-1" ) ).toBe( true );
				expect( document.hasType( "another:Type-1" ) ).toBe( false );
				expect( document.hasType( "Type-1" ) ).toBe( false );
				expect( document.hasType( "http://example.com/another-url/ns#Type-2" ) ).toBe( true );
				expect( document.hasType( "exTypes:Type-2" ) ).toBe( false );
				expect( document.hasType( "another:Type-2" ) ).toBe( true );
				expect( document.hasType( "Type-2" ) ).toBe( false );
				expect( document.hasType( "http://example.com/vocab#Current-Type" ) ).toBe( true );
				expect( document.hasType( "exTypes:Current-Type" ) ).toBe( false );
				expect( document.hasType( "another:Current-Type" ) ).toBe( false );
				expect( document.hasType( "Current-Type" ) ).toBe( true );
			} );

			it( hasMethod(
				INSTANCE,
				"removeType",
				"Remove the type specified from the Document. Relative and prefixed types are resolved before the operation.", [
					{ name: "type", type: "string", description: "The type to be removed." },
				]
			), ():void => {
				expect( document.removeType ).toBeDefined();
				expect( Utils.isFunction( document.removeType ) ).toBe( true );

				document.types = [ "http://example.com/types#Type-1" ];
				document.removeType( "http://example.com/types#Type-2" );
				expect( document.types.length ).toBe( 1 );
				expect( document.types ).toContain( "http://example.com/types#Type-1" );
				document.removeType( "another:Type-1" );
				expect( document.types.length ).toBe( 1 );
				expect( document.types ).toContain( "http://example.com/types#Type-1" );
				document.removeType( "Type-1" );
				expect( document.types.length ).toBe( 1 );
				expect( document.types ).toContain( "http://example.com/types#Type-1" );

				document.types = [ "http://example.com/types#Type-1" ];
				document.removeType( "http://example.com/types#Type-1" );
				expect( document.types.length ).toBe( 0 );
				document.types = [ "http://example.com/types#Type-1" ];
				document.removeType( "exTypes:Type-1" );
				expect( document.types.length ).toBe( 0 );

				document.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2" ];
				document.removeType( "http://example.com/types#Type-1" );
				expect( document.types.length ).toBe( 1 );
				expect( document.types ).toContain( "http://example.com/types#Type-2" );
				document.removeType( "exTypes:Type-2" );
				expect( document.types.length ).toBe( 0 );

				document.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2", "http://example.com/another-url/ns#Type-3" ];
				document.removeType( "http://example.com/types#Type-1" );
				expect( document.types.length ).toBe( 2 );
				expect( document.types ).toContain( "http://example.com/types#Type-2" );
				expect( document.types ).toContain( "http://example.com/another-url/ns#Type-3" );
				document.removeType( "exTypes:Type-2" );
				expect( document.types.length ).toBe( 1 );
				expect( document.types ).toContain( "http://example.com/another-url/ns#Type-3" );
				document.removeType( "another:Type-3" );
				expect( document.types.length ).toBe( 0 );

				document.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2", "http://example.com/another-url/ns#Type-3", "http://example.com/vocab#Type-4" ];
				document.removeType( "http://example.com/types#Type-1" );
				expect( document.types.length ).toBe( 3 );
				expect( document.types ).toContain( "http://example.com/types#Type-2" );
				expect( document.types ).toContain( "http://example.com/another-url/ns#Type-3" );
				expect( document.types ).toContain( "http://example.com/vocab#Type-4" );
				document.removeType( "exTypes:Type-2" );
				expect( document.types.length ).toBe( 2 );
				expect( document.types ).toContain( "http://example.com/another-url/ns#Type-3" );
				expect( document.types ).toContain( "http://example.com/vocab#Type-4" );
				document.removeType( "another:Type-3" );
				expect( document.types.length ).toBe( 1 );
				expect( document.types ).toContain( "http://example.com/vocab#Type-4" );
				document.removeType( "Type-4" );
				expect( document.types.length ).toBe( 0 );
			} );

			it( hasMethod(
				INSTANCE,
				"hasPointer",
				"Returns true if the persisted document object has a pointer referenced by the URI provided.", [
					{ name: "id", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {

				expect( document.hasPointer ).toBeDefined();
				expect( Utils.isFunction( document.hasPointer ) ).toBe( true );

				expect( document.hasPointer( "http://example.com/document/" ) ).toBe( true );
				expect( document.hasPointer( "http://example.com/document/#fragment" ) ).toBe( true );
				expect( document.hasPointer( "_:BlankNode" ) ).toBe( true );
				expect( document.hasPointer( "http://example.com/in/documents/" ) ).toBe( true );

				expect( document.hasPointer( "this-uri-is-resolved-relative/" ) ).toBe( false );
				expect( document.hasPointer( "http://example.com/document/#another-fragment" ) ).toBe( false );
				expect( document.hasPointer( "_:AnotherBlankNode" ) ).toBe( false );
				expect( document.hasPointer( "http://example.com/another-document/" ) ).toBe( false );
			} );

			it( hasMethod(
				INSTANCE,
				"getPointer",
				"Returns the pointer referenced by the URI provided. If none exists, an empty pointer is created.\n" +
				"Returns null if the URI is not inside the scope of the persisted document.", [
					{ name: "id", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {
				expect( document.getPointer ).toBeDefined();
				expect( Utils.isFunction( document.getPointer ) ).toBe( true );

				let pointer:Pointer.Class;

				pointer = document.getPointer( "http://example.com/document/" );
				expect( pointer ).toBe( document );
				pointer = document.getPointer( "http://example.com/document/#fragment" );
				expect( pointer.id ).toBe( "http://example.com/document/#fragment" );
				pointer = document.getPointer( "_:BlankNode" );
				expect( pointer.id ).toBe( "_:BlankNode" );
				pointer = document.getPointer( "#fragment" );
				expect( pointer.id ).toBe( "http://example.com/document/#fragment" );

				pointer = document.getPointer( "http://example.com/document/#another-fragment" );
				expect( pointer.id ).toBe( "http://example.com/document/#another-fragment" );
				pointer = document.getPointer( "_:AnotherBlankNode" );
				expect( pointer.id ).toBe( "_:AnotherBlankNode" );

				// Ask to the Documents document.
				pointer = document.getPointer( "this-uri-is-resolved-relative/" );
				expect( pointer.id ).toBe( "http://example.com/this-uri-is-resolved-relative/" );
				pointer = document.getPointer( "http://example.com/in/documents/" );
				expect( pointer.id ).toBe( "http://example.com/in/documents/" );
				pointer = document.getPointer( "http://example.com/another-document/" );
				expect( pointer.id ).toBe( "http://example.com/another-document/" );
			} );

			describe( method(
				INSTANCE,
				"inScope"
			), ():void => {

				it( hasSignature(
					"Returns true if the pointer provided is in the scope of the persisted document.", [
						{ name: "pointer", type: "Carbon.Pointer.Class" },
					],
					{ type: "boolean" }
				), ():void => {
					expect( document.inScope ).toBeDefined();
					expect( Utils.isFunction( document.inScope ) ).toBe( true );

					let pointer:Pointer.Class;

					expect( document.inScope.bind( document, undefined ) ).toThrowError();
					expect( document.inScope.bind( document, null ) ).toThrowError();

					expect( document.inScope( document ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/#fragment" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/#another-fragment" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "_:BlankNode" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "#fragment" );
					expect( document.inScope( pointer ) ).toBe( true );

					// In Documents
					pointer = Pointer.Factory.create( "this-uri-is-resolved-relative/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/in/documents/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/document/child/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.com/another-document/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.Factory.create( "http://example.org/document/" );
					expect( document.inScope( pointer ) ).toBe( true );
				} );

				it( hasSignature(
					"Returns true if the URI provided is in the scope of the persisted document.", [
						{ name: "id", type: "string" },
					],
					{ type: "boolean" }
				), ():void => {
					expect( document.inScope ).toBeDefined();
					expect( Utils.isFunction( document.inScope ) ).toBe( true );

					expect( document.inScope( document.id ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/#fragment" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/#another-fragment" ) ).toBe( true );
					expect( document.inScope( "_:BlankNode" ) ).toBe( true );
					expect( document.inScope( "#fragment" ) ).toBe( true );

					// In Documents
					expect( document.inScope( "this-uri-is-resolved-relative/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/in/documents/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/document/child/" ) ).toBe( true );
					expect( document.inScope( "http://example.com/another-document/" ) ).toBe( true );
					expect( document.inScope( "http://example.org/document/" ) ).toBe( true );
				} );

			} );

			describe( method(
				INSTANCE,
				"createFragment"
			), ():void => {

				it( hasSignature(
					[ "T" ],
					"Creates a PersistedFragment from the object provided and the slug specified.", [
						{ name: "object", type: "T" },
						{ name: "slug", type: "string" },
					],
					{ type: "T & Carbon.PersistedFragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:PersistedFragment.Class & MyInterface;

					object = {};
					fragment = document.createFragment<MyInterface>( object, "my-fragment" );
					expect( object ).toBe( fragment );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#my-fragment" );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createFragment<MyInterface>( object, "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "The BlankNode property" };
					fragment = document.createFragment<MyInterface>( object, "_:My-BlankNode" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:My-BlankNode" );
					expect( fragment.myProperty ).toBe( "The BlankNode property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object, "#another-another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-another-fragment" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties( fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object, "_:AnotherBlankNode" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:AnotherBlankNode" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties( fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );

					expect( () => document.createFragment( {}, "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createFragment( {}, "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
					expect( () => document.createFragment( {}, "_:BlankNode" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				it( hasSignature(
					[ "T" ],
					"Creates a PersistedBlankNode from the object provided, sing no slug was specified.", [
						{ name: "object", type: "T" },
					],
					{ type: "T & Carbon.PersistedFragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:PersistedFragment.Class & MyInterface;

					object = {};
					fragment = document.createFragment<MyInterface>( object );
					expect( object ).toBe( fragment );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createFragment<MyInterface>( object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties( fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );
				} );

				it( hasSignature(
					"Creates a PersistedFragment with the slug provided.", [
						{ name: "slug", type: "string" },
					],
					{ type: "Carbon.PersistedFragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					let fragment:PersistedFragment.Class;

					fragment = document.createFragment( "my-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#my-fragment" );

					fragment = document.createFragment( "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );

					fragment = document.createFragment( "_:My-BlankNode" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:My-BlankNode" );

					expect( () => document.createFragment( "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createFragment( "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
					expect( () => document.createFragment( "_:BlankNode" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				it( hasSignature(
					"Creates a PersistedBlankNode, since no slug is provided",
					{ type: "Carbon.PersistedFragment.Class" }
				), ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					let fragment1:PersistedFragment.Class;
					let fragment2:PersistedFragment.Class;

					fragment1 = document.createFragment();
					expect( Fragment.Factory.hasClassProperties( fragment1 ) ).toBe( true );
					expect( Utils.isString( fragment1.id ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment1.id ) ).toBe( true );

					fragment2 = document.createFragment();
					expect( Fragment.Factory.hasClassProperties( fragment2 ) ).toBe( true );
					expect( Utils.isString( fragment2.id ) ).toBe( true );
					expect( URI.Util.isBNodeID( fragment2.id ) ).toBe( true );

					expect( fragment1.id ).not.toBe( fragment2.id );
				} );

			} );

			describe( method(
				INSTANCE,
				"createNamedFragment"
			), ():void => {

				it( hasSignature(
					"Creates a PersistedNamedFragment with the slug provided", [
						{ name: "slug", type: "string" },
					],
					{ type: "Carbon.PersistedNamedFragment.Class" }
				), ():void => {
					expect( document.createNamedFragment ).toBeDefined();
					expect( Utils.isFunction( document.createNamedFragment ) ).toBe( true );

					let fragment:PersistedNamedFragment.Class;

					fragment = document.createNamedFragment( "my-fragment" );
					expect( NamedFragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.slug ).toBe( "my-fragment" );
					expect( fragment.id ).toBe( "http://example.com/document/#my-fragment" );

					fragment = document.createNamedFragment( "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.slug ).toBe( "another-fragment" );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );

					expect( () => document.createNamedFragment( "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createNamedFragment( "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createNamedFragment( "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				it( hasSignature(
					[ "T" ],
					"Creates a PersistedNamedFragment from the object provided and the slug specified.", [
						{ name: "object", type: "T" },
						{ name: "slug", type: "string" },
					],
					{ type: "T & Carbon.PersistedNamedFragment.Class" }
				), ():void => {

					expect( document.createNamedFragment ).toBeDefined();
					expect( Utils.isFunction( document.createNamedFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:PersistedFragment.Class & MyInterface;

					object = {};
					fragment = document.createNamedFragment<MyInterface>( object, "my-fragment" );
					expect( object ).toBe( fragment );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#my-fragment" );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createNamedFragment<MyInterface>( object, "http://example.com/document/#another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createNamedFragment<MyInterface>( object, "#another-another-fragment" );
					expect( Fragment.Factory.hasClassProperties( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-another-fragment" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.Factory.hasClassProperties( fragment.myPointer ) ).toBe( true );
					expect( URI.Util.isBNodeID( (<Fragment.Class> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"refresh",
				[ "T" ],
				"Sync the persisted document with the data in the server.",
				{ type: "Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class]>" }
			), ():void => {
				expect( document.refresh ).toBeDefined();
				expect( Utils.isFunction( document.refresh ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "refresh" );
				document.refresh();
				expect( spy ).toHaveBeenCalledWith( document );
			} );

			it( hasMethod(
				INSTANCE,
				"save",
				[ "T" ],
				"Save the persisted document to the server.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.save ).toBeDefined();
				expect( Utils.isFunction( document.save ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "save" );
				document.save();
				expect( spy ).toHaveBeenCalledWith( document, void 0 );

				const requestOptions:HTTP.Request.Options = { timeout: 5555 };
				document.save( requestOptions );
				expect( spy ).toHaveBeenCalledWith( document, requestOptions );
			} );

			it( hasMethod(
				INSTANCE,
				"saveAndRefresh",
				[ "T" ],
				"Save and refresh the persisted document.",
				{ type: "Promise<[ T & Carbon.PersistedDocument.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>" }
			), ():void => {
				expect( document.saveAndRefresh ).toBeDefined();
				expect( Utils.isFunction( document.saveAndRefresh ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "saveAndRefresh" );
				document.saveAndRefresh();
				expect( spy ).toHaveBeenCalledWith( document );
			} );

			it( hasMethod(
				INSTANCE,
				"delete",
				"Remove the data in the server referred by the id of the persisted document.",
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( document.delete ).toBeDefined();
				expect( Utils.isFunction( document.delete ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "delete" );
				document.delete();
				expect( spy ).toHaveBeenCalledWith( document.id );
			} );

			it( hasMethod(
				INSTANCE,
				"getDownloadURL",
				"Returns the URI of the current document with the properties necessarily for a single download request.",
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( document.getDownloadURL ).toBeDefined();
				expect( Utils.isFunction( document.getDownloadURL ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "getDownloadURL" );
				document.getDownloadURL();
				expect( spy ).toHaveBeenCalledWith( document.id );
			} );

			describe( method(
				INSTANCE,
				"addMember"
			), ():void => {

				it( hasSignature(
					"Adds the specified resource Pointer as a member of the document.", [
						{ name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to add as a member." },
					],
					{ type: "Promise<Carbon.HTTP.Response.Class>" }
				), ():void => {
					expect( document.addMember ).toBeDefined();
					expect( Utils.isFunction( document.addMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "addMember" );

					let pointer:Pointer.Class = context.documents.getPointer( "new-member/" );
					document.addMember( pointer );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointer );
				} );

				it( hasSignature(
					"Adds the specified resource URI as a member of the document.", [
						{ name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
					],
					{ type: "Promise<Carbon.HTTP.Response.Class>" }
				), ():void => {
					expect( document.addMember ).toBeDefined();
					expect( Utils.isFunction( document.addMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "addMember" );

					document.addMember( "new-member/" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "new-member/" );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"addMembers",
				"Adds the specified resources as members of the document.", [
					{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of URIs or Pointers to add as members." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( document.addMembers ).toBeDefined();
				expect( Utils.isFunction( document.addMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "addMembers" );

				let pointers:Pointer.Class[] = [];
				pointers.push( context.documents.getPointer( "new-member/" ) );
				document.addMembers( pointers );

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointers );
			} );

			describe( method(
				INSTANCE,
				"createChild"
			), ():void => {

				it( hasSignature(
					[ "T" ],
					"Persists a document with the slug specified as a child of the current document.", [
						{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it's transformed into one." },
						{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					let childDocument:Document.Class = Document.Factory.create();
					document.createChild( childDocument, "child" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument, "child", {} );
					spy.calls.reset();

					let object:Object;
					let options:HTTP.Request.Options;

					object = { my: "object" };
					options = { timeout: 5050 };
					document.createChild( object, "child", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, "child", options );
					spy.calls.reset();

					object = { my: "object" };
					document.createChild( object, "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, "child", {} );
				} );

				it( hasSignature(
					[ "T" ],
					"Persists a document as a child of the current document.", [
						{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it's transformed into one." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					let childDocument:Document.Class = Document.Factory.create();
					document.createChild( childDocument );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument, null, {} );
					spy.calls.reset();

					let object:Object = { my: "object" };
					document.createChild( object );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, null, {} );
					spy.calls.reset();

					object = { my: "object" };
					let options:HTTP.Request.Options = { timeout: 5050 };
					document.createChild( object, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, null, options );
				} );

				it( hasSignature(
					"Creates an persists an empty child for the current document with the slug provided.", [
						{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					document.createChild( "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, "child", {} );
					spy.calls.reset();

					let options:HTTP.Request.Options = { timeout: 5050 };
					document.createChild( "child", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, "child", options );
				} );

				it( hasSignature(
					"Creates and persists an empty child fot he current document.", [
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					document.createChild();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, null, {} );
					spy.calls.reset();

					let options:HTTP.Request.Options = { timeout: 5050 };
					document.createChild( options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, null, options );
				} );

			} );

			describe( method(
				INSTANCE,
				"createChildren"
			), ():void => {

				it( isDefined(), ():void => {
					expect( document.createChildren ).toBeDefined();
					expect( Utils.isFunction( document.createChildren ) ).toBeDefined();
				} );

				it( hasSignature(
					[ "T" ],
					"Persists multiple JavaScript objects as children of the current document.", [
						{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
						{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every the request." },
					],
					{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new UNRESOLVED persisted children, and another array with the response class of every request." }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildren" );

					let objects:Object[];
					let slugs:string[];
					let options:HTTP.Request.Options;

					objects = [ { my: "first object" }, { my: "second object" }, { my: "third object" } ];
					slugs = [ "first", "second", "third" ];
					options = { timeout: 5050 };
					document.createChildren( objects, slugs, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", objects, slugs, options );
					spy.calls.reset();

					objects = [ { my: "first object" }, { my: "second object" }, { my: "third object" } ];
					slugs = [ "first", "second", "third" ];
					document.createChildren( objects, slugs );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", objects, slugs, undefined );
				} );

				it( hasSignature(
					[ "T" ],
					"Persists multiple JavaScript objects as children of the current document.", [
						{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every the request." },
					],
					{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new UNRESOLVED persisted children, and another array with the response class of every request." }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildren" );

					let objects:Object[];
					let options:HTTP.Request.Options;

					objects = [ { my: "first object" }, { my: "second object" }, { my: "third object" } ];
					options = { timeout: 5050 };
					document.createChildren( objects, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", objects, options, undefined );
					spy.calls.reset();

					objects = [ { my: "first object" }, { my: "second object" }, { my: "third object" } ];
					document.createChildren( objects );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", objects, undefined, undefined );
				} );

			} );

			describe( method(
				INSTANCE,
				"createChildAndRetrieve",
				"Create a child for the document and retrieves the updated data from the server."
			), ():void => {

				it( isDefined(), ():void => {
					expect( document.createChildAndRetrieve ).toBeDefined();
					expect( Utils.isFunction( document.createChildAndRetrieve ) ).toBeDefined();
				} );

				it( hasSignature(
					[ "T" ], [
						{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one." },
						{ name: "slug", type: "string", description: "The slug name for the children URI." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildAndRetrieve" );

					let childDocument:Document.Class = Document.Factory.create();
					document.createChildAndRetrieve( childDocument, "child" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument, "child", {} );
					spy.calls.reset();

					let object:Object;
					let options:HTTP.Request.Options;

					object = { my: "object" };
					options = { timeout: 5050 };
					document.createChildAndRetrieve( object, "child", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, "child", options );
					spy.calls.reset();

					object = { my: "object" };
					document.createChildAndRetrieve( object, "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, "child", {} );
				} );

				it( hasSignature(
					[ "T" ], [
						{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildAndRetrieve" );

					let childDocument:Document.Class = Document.Factory.create();
					document.createChildAndRetrieve( childDocument );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument, null, {} );
					spy.calls.reset();

					let object:Object = { my: "object" };
					document.createChildAndRetrieve( object );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, null, {} );
					spy.calls.reset();

					object = { my: "object" };
					let options:HTTP.Request.Options = { timeout: 5050 };
					document.createChildAndRetrieve( object, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, null, options );
				} );

				it( hasSignature( [
						{ name: "slug", type: "string", description: "The slug name for the children URI." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildAndRetrieve" );

					document.createChildAndRetrieve( "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, "child", {} );
					spy.calls.reset();

					let options:HTTP.Request.Options = { timeout: 5050 };
					document.createChildAndRetrieve( "child", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, "child", options );
				} );

				it( hasSignature( [
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>" }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildAndRetrieve" );

					document.createChildAndRetrieve();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, null, {} );
					spy.calls.reset();

					let options:HTTP.Request.Options = { timeout: 5050 };
					document.createChildAndRetrieve( options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, null, options );
				} );

			} );

			describe( method(
				INSTANCE,
				"createChildrenAndRetrieve"
			), ():void => {

				it( isDefined(), ():void => {
					expect( document.createChildrenAndRetrieve ).toBeDefined();
					expect( Utils.isFunction( document.createChildrenAndRetrieve ) ).toBeDefined();
				} );

				it( hasSignature(
					[ "T" ],
					"Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.", [
						{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
						{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every the request." },
					],
					{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new resolved persisted children, and another array with the response class of every request." }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildrenAndRetrieve" );

					let objects:Object[];
					let slugs:string[];
					let options:HTTP.Request.Options;

					objects = [ { my: "first object" }, { my: "second object" }, { my: "third object" } ];
					slugs = [ "first", "second", "third" ];
					options = { timeout: 5050 };
					document.createChildrenAndRetrieve( objects, slugs, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", objects, slugs, options );
					spy.calls.reset();

					objects = [ { my: "first object" }, { my: "second object" }, { my: "third object" } ];
					slugs = [ "first", "second", "third" ];
					document.createChildrenAndRetrieve( objects, slugs );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", objects, slugs, undefined );
				} );

				it( hasSignature(
					[ "T" ],
					"Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.", [
						{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for every the request." },
					],
					{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new resolved persisted children, and another array with the response class of every request." }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildrenAndRetrieve" );

					let objects:Object[];
					let options:HTTP.Request.Options;

					objects = [ { my: "first object" }, { my: "second object" }, { my: "third object" } ];
					options = { timeout: 5050 };
					document.createChildrenAndRetrieve( objects, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", objects, options, undefined );
					spy.calls.reset();

					objects = [ { my: "first object" }, { my: "second object" }, { my: "third object" } ];
					document.createChildrenAndRetrieve( objects );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", objects, undefined, undefined );
				} );

			} );

			describe( method(
				INSTANCE,
				"createAccessPoint"
			), ():void => {

				it( hasSignature(
					[ "T" ],
					"Create an AccessPoint for the document with the slug specified.", [
						{ name: "accessPoint", type: "T & Carbon.AccessPoint.Class", description: "AccessPoint Document to persist." },
						{ name: "slug", type: "string", optional: true, description: "Slug that will be used for the URI of the new access point." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customisable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response ]>" }
				), ():void => {
					expect( document.createAccessPoint ).toBeDefined();
					expect( Utils.isFunction( document.createAccessPoint ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createAccessPoint" );

					document.createAccessPoint( { hasMemberRelation: "http://example.com/ns#member-relation" }, "my-new-access-point" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", { hasMemberRelation: "http://example.com/ns#member-relation" }, "my-new-access-point", undefined );
				} );

				it( hasSignature(
					[ "T" ],
					"Create an AccessPoint for the document.", [
						{ name: "accessPoint", type: "T & Carbon.AccessPoint.Class", description: "AccessPoint Document to persist." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response ]>" }
				), ():void => {
					expect( document.createAccessPoint ).toBeDefined();
					expect( Utils.isFunction( document.createAccessPoint ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createAccessPoint" );

					document.createAccessPoint( { hasMemberRelation: "http://example.com/ns#member-relation" } );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", { hasMemberRelation: "http://example.com/ns#member-relation" }, undefined, undefined );
				} );

			} );

			describe( method(
				INSTANCE,
				"createAccessPoints"
			), ():void => {

				it( isDefined(), ():void => {
					expect( document.createAccessPoints ).toBeDefined();
					expect( Utils.isFunction( document.createAccessPoints ) ).toBeDefined();
				} );

				it( hasSignature(
					[ "T" ],
					"Create multiple access points for the current document with the slug specified.", [
						{ name: "accessPoints", type: "(T & Carbon.AccessPoint.Class)[]", description: "The access points to persist." },
						{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customisable options for the request." },
					],
					{ type: "Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new and UNRESOLVED persisted access points, and the array containing the response classes of every request." }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createAccessPoints" );

					let accessPoints:AccessPoint.Class[] = [
						{
							hasMemberRelation: "http://example.com/ns#member-relation",
						},
						{
							hasMemberRelation: "http://example.com/ns#some-relation",
							isMemberOfRelation: "http://example.com/ns#some-inverted-relation",
						},
					];
					let slugs:string[] = [ null, "second" ];

					document.createAccessPoints( accessPoints, slugs );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", accessPoints, slugs, undefined );
				} );

				it( hasSignature(
					[ "T" ],
					"Create multiple access points for the current document.", [
						{ name: "accessPoints", type: "(T & Carbon.AccessPoint.Class)[]", description: "The access points to persist." },
						{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
					],
					{ type: "Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>", description: "Promise that contains a tuple with an array of the new and UNRESOLVED persisted access points, and the array containing the response classes of every request." }
				), ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createAccessPoints" );

					let accessPoints:AccessPoint.Class[] = [
						{
							hasMemberRelation: "http://example.com/ns#member-relation",
						},
						{
							hasMemberRelation: "http://example.com/ns#some-relation",
							isMemberOfRelation: "http://example.com/ns#some-inverted-relation",
						},
					];

					document.createAccessPoints( accessPoints );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", accessPoints, undefined, undefined );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"listChildren",
				"Retrieves an array of unresolved persisted documents that refers to the children of the current document.",
				{ type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response ]>" }
			), ():void => {
				expect( document.listChildren ).toBeDefined();
				expect( Utils.isFunction( document.listChildren ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "listChildren" );

				document.listChildren();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/" );
			} );

			it( hasMethod(
				INSTANCE,
				"getChildren",
				[ "T" ],
				"Retrieves an array of resolved persisted documents that refers to the children of the current document, in accordance to the retrieval preferences specified.", [
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true },
				],
				{ type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response ]>" }
			), ():void => {
				expect( document.getChildren ).toBeDefined();
				expect( Utils.isFunction( document.getChildren ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "getChildren" );

				document.getChildren();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", undefined );
				spy.calls.reset();


				let retrievalPreferences:RetrievalPreferences.Class = {
					limit: 10,
					offset: 0,
					orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ],
				};
				document.getChildren( retrievalPreferences );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", retrievalPreferences );
			} );

			it( hasMethod(
				INSTANCE,
				"listMembers",
				"Retrieves an array of unresolved persisted documents that refers to the members of the current document.", [
					{ name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`." },
				],
				{ type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.listMembers ).toBeDefined();
				expect( Utils.isFunction( document.listMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "listMembers" );

				document.listMembers();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true );
				spy.calls.reset();

				document.listMembers( false );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", false );
			} );

			describe( method(
				INSTANCE,
				"getMembers"
			), ():void => {

				it( hasSignature(
					[ "T" ],
					"Retrieves an array of resolved persisted documents that refers to the members of the current document, in accordance to the retrieval preferences specified.", [
						{ name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`." },
						{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true },
					],
					{ type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.getMembers ).toBeDefined();
					expect( Utils.isFunction( document.getMembers ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "getMembers" );

					document.getMembers();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true, undefined );
					spy.calls.reset();

					document.getMembers( false );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", false, undefined );
					spy.calls.reset();

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ],
					};

					document.getMembers( false, retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", false, retrievalPreferences );
					spy.calls.reset();

					document.getMembers( true, retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true, retrievalPreferences );
					spy.calls.reset();

					document.getMembers( retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true, retrievalPreferences );
					spy.calls.reset();
				} );

				it( hasSignature(
					[ "T" ],
					"Retrieves an array of resolved persisted documents that refers to the members of the current document, including the non readable elements, in accordance to the retrieval preferences specified.", [
						{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true },
					],
					{ type: "Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.getMembers ).toBeDefined();
					expect( Utils.isFunction( document.getMembers ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "getMembers" );

					document.getMembers();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true, undefined );
					spy.calls.reset();

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ],
					};

					document.getMembers( retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", true, retrievalPreferences );
					spy.calls.reset();
				} );

			} );

			describe( method(
				INSTANCE,
				"removeMember"
			), ():void => {

				it( hasSignature(
					"Remove the specified resource Pointer as a member of the current document.", [
						{ name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to remove as a member." },
					],
					{ type: "Promise<Carbon.HTTP.Response.Class>" }
				), ():void => {
					expect( document.removeMember ).toBeDefined();
					expect( Utils.isFunction( document.removeMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "removeMember" );

					let pointer:Pointer.Class = context.documents.getPointer( "remove-member/" );
					document.removeMember( pointer );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointer );
				} );

				it( hasSignature(
					"Remove the specified resource URI as a member of the current document.", [
						{ name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
					],
					{ type: "Promise<Carbon.HTTP.Response.Class>" }
				), ():void => {
					expect( document.removeMember ).toBeDefined();
					expect( Utils.isFunction( document.removeMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "removeMember" );

					document.removeMember( "remove-member/" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "remove-member/" );
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"removeMembers",
				"Remove the specified resources URI or Pointers as members of the current document.", [
					{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of URIs or Pointers to remove as members" },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( document.removeMembers ).toBeDefined();
				expect( Utils.isFunction( document.removeMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "removeMembers" );

				let pointers:Pointer.Class[] = [];
				pointers.push( context.documents.getPointer( "remove-member/" ) );
				document.removeMembers( pointers );

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointers );
			} );

			it( hasMethod(
				INSTANCE,
				"removeAllMembers",
				"Remove the specified resources URI or Pointers as members of the current document.",
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( document.removeAllMembers ).toBeDefined();
				expect( Utils.isFunction( document.removeAllMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "removeAllMembers" );

				document.removeAllMembers();

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/" );
			} );

			describe( method(
				INSTANCE,
				"upload"
			), ():void => {

				it( hasSignature(
					"Upload a File to the server as a child of the current document with the slug specified. This signature only works in a web browser.", [
						{ name: "data", type: "Blob", description: "Binary data to store in the server." },
						{ name: "slug", type: "string", description: "The slug that will be used in the URI of the data." },
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.upload ).toBeDefined();
					expect( Utils.isFunction( document.upload ) ).toBeDefined();

					if( typeof Blob !== "undefined" ) {
						let spy:jasmine.Spy = spyOn( document._documents, "upload" );

						let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type: "application/json" } );
						document.upload( blob, "child" );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", blob, "child" );
					}
				} );

				it( hasSignature(
					"Upload a File to the server as a child of the current document. This signature only works in a web browser.", [
						{ name: "data", type: "Blob", description: "Binary data to store in the server." },
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.upload ).toBeDefined();
					expect( Utils.isFunction( document.upload ) ).toBeDefined();

					if( typeof Blob !== "undefined" ) {
						let spy:jasmine.Spy = spyOn( document._documents, "upload" );

						let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type: "application/json" } );
						document.upload( blob );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", blob, undefined );
					}
				} );

				it( hasSignature(
					"Upload a File to the server as a child of the current document with the slug specified. This signature only works with Node.js.", [
						{ name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js." },
						{ name: "slug", type: "string", description: "The slug that will be used in the URI of the data." },
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.upload ).toBeDefined();
					expect( Utils.isFunction( document.upload ) ).toBeDefined();

					if( typeof Buffer !== "undefined" ) {
						let spy:jasmine.Spy = spyOn( document._documents, "upload" );

						let buffer:Buffer = new Buffer( JSON.stringify( { "some content": "for the buffer." } ) );
						document.upload( buffer, "child" );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", buffer, "child" );
					}
				} );

				it( hasSignature(
					"Upload a File to the server as a child of the current document. This signature only works with Node.js.", [
						{ name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js." },
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( document.upload ).toBeDefined();
					expect( Utils.isFunction( document.upload ) ).toBeDefined();

					if( typeof Buffer !== "undefined" ) {
						let spy:jasmine.Spy = spyOn( document._documents, "upload" );

						let buffer:Buffer = new Buffer( JSON.stringify( { "some content": "for the buffer." } ) );
						document.upload( buffer );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", buffer, undefined );
					}
				} );

			} );

			it( hasMethod(
				INSTANCE,
				"executeRawASKQuery",
				"Executes an ASK query in the document and returns a raw application/sparql-results+json object.", [
					{ name: "askQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeRawASKQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawASKQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawASKQuery" );
				document.executeRawASKQuery( "ASK { ?subject, ?predicate, ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "ASK { ?subject, ?predicate, ?object }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeASKQuery",
				"Executes an ASK query in the document and returns a boolean of the result.", [
					{ name: "askQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeASKQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeASKQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeASKQuery" );
				document.executeASKQuery( "ASK { ?subject, ?predicate, ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "ASK { ?subject, ?predicate, ?object }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeRawSELECTQuery",
				"Executes a SELECT query in the document and returns a raw application/sparql-results+json object.", [
					{ name: "selectQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeRawSELECTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawSELECTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawSELECTQuery" );
				document.executeRawSELECTQuery( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeSELECTQuery",
				"Executes a SELECT query in the document and returns the results as a `Carbon.SPARQL.SELECTResults.Class` object.", [
					{ name: "selectQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeSELECTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeSELECTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" );
				document.executeSELECTQuery( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeRawCONSTRUCTQuery",
				"Executes a CONSTRUCT query in the document and returns a string with the resulting model.", [
					{ name: "constructQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeRawCONSTRUCTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawCONSTRUCTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawCONSTRUCTQuery" );
				document.executeRawCONSTRUCTQuery( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeRawDESCRIBEQuery",
				"Executes a DESCRIBE query in the document and returns a string with the resulting model.", [
					{ name: "constructQuery", type: "string" },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( document.executeRawDESCRIBEQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawDESCRIBEQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawDESCRIBEQuery" );
				document.executeRawDESCRIBEQuery( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {} );
			} );

			it( hasMethod(
				INSTANCE,
				"executeUPDATE",
				"Executes an UPDATE query.", [
					{ name: "updateQuery", type: "string", description: "UPDATE query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( document.executeUPDATE ).toBeDefined();
				expect( Utils.isFunction( document.executeUPDATE ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeUPDATE" );
				document.executeUPDATE( `INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }` );
				expect( spy ).toHaveBeenCalledWith( document.id, `INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }`, {} );
			} );

			it( hasMethod(
				INSTANCE,
				"sparql",
				"Method that creates an instance of SPARQLER for the document end-point.",
				{ type: "SPARQLER/Clauses/QueryClause" }
			), ():void => {
				expect( document.sparql ).toBeDefined();
				expect( Utils.isFunction( document.sparql ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "sparql" );

				document.sparql();
				expect( spy ).toHaveBeenCalledWith( document.id );
			} );

		} );

	} );

} );
