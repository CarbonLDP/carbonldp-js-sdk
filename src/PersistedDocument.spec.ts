import { AbstractContext } from "./AbstractContext";
import { AccessPointBase } from "./AccessPoint";
import { Document } from "./Document";
import { Documents } from "./Documents";
import * as Errors from "./Errors";
import { Fragment } from "./Fragment";
import { RequestOptions } from "./HTTP/Request";
import { NamedFragment } from "./NamedFragment";

import DefaultExport, { PersistedDocument } from "./PersistedDocument";

import { PersistedFragment } from "./PersistedFragment";
import { PersistedNamedFragment } from "./PersistedNamedFragment";
import { Pointer } from "./Pointer";
import { URI } from "./RDF/URI";
import {
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
	property,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "Carbon/PersistedDocument" ), ():void => {

	describe( interfaze(
		"Carbon.PersistedDocument.PersistedDocument",
		"Interface that represents a persisted blank node of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.Document.Document" ), ():void => {} );
		it( extendsClass( "Carbon.PersistedResource.PersistedResource" ), ():void => {} );
		it( extendsClass( "Carbon.ServiceAwareDocument.ServiceAwareDocument" ), ():void => {} );
		it( extendsClass( "Carbon.Messaging.Document.MessagingDocument" ), ():void => {} );

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
			"Carbon.Pointer.Pointer",
			"A Pointer representing the default interaction model of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"Carbon.Pointer.Pointer",
			"A Pointer with the member of relation of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"Carbon.Pointer.Pointer",
			"A Pointer with the inverted relation the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"accessPoints",
			"Carbon.Pointer.Pointer[]",
			"Array with the access points of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"contains",
			"Carbon.Pointer.Pointer",
			"Array with the children of the document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_eTag",
			"string",
			"The ETag (entity tag) of the persisted document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_fragmentsIndex",
			"Map<string, Carbon.PersistedFragment.PersistedFragment>",
			"Map that stores the persisted fragments (named fragments and blank nodes) of the document."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_savedFragments",
			"Carbon.PersistedFragment.PersistedFragment[]",
			"Array with a copy of every fragment that that is currently persisted in the server."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"_syncSavedFragments",
			"Set all the current fragments in the document as fragments that are saved in the server."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"isLocallyOutDated",
			"Returns true when the document contains data of multiple requests with different versions of the resource."
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"createFragment"
		), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Creates a PersistedFragment from the object provided and the slug specified.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & Carbon.PersistedFragment.PersistedFragment" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Creates a PersistedBlankNode from the object provided, sing no slug was specified.", [
					{ name: "object", type: "T" },
				],
				{ type: "T & Carbon.PersistedFragment.PersistedFragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates a PersistedFragment with the slug provided.", [
					{ name: "slug", type: "string" },
				],
				{ type: "Carbon.PersistedFragment.PersistedFragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates a PersistedBlankNode, since no slug is provided",
				{ type: "Carbon.PersistedFragment.PersistedFragment" }
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
				{ type: "Carbon.PersistedNamedFragment.PersistedNamedFragment" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Creates a PersistedNamedFragment from the object provided and the slug specified.", [
					{ name: "object", type: "T" },
					{ name: "slug", type: "string" },
				],
				{ type: "T & Carbon.PersistedNamedFragment.PersistedNamedFragment" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"refresh",
			[ "T extends object" ],
			"Sync the persisted document with the data in the server.",
			{ type: "Promise<[ T & Carbon.PersistedDocument.PersistedDocument, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"save",
			[ "T extends object" ],
			"Save the persisted document to the server.", [
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ T & Carbon.PersistedDocument.PersistedDocument, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"saveAndRefresh",
			[ "T extends object" ],
			"Save and refresh the persisted document.",
			{ type: "Promise<[ T & Carbon.PersistedDocument.PersistedDocument, Carbon.HTTP.Response.Response[] ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"delete",
			"Remove the data in the server referred by the id of the persisted document.",
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getDownloadURL",
			"Returns the URI of the current document with the properties necessarily for a single download request.",
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"addMember"
		), ():void => {

			it( hasSignature(
				"Adds the specified resource Pointer as a member of the document.", [
					{ name: "member", type: "Carbon.Pointer.Pointer", description: "Pointer object that references the resource to add as a member." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Response>" }
			), ():void => {} );

			it( hasSignature(
				"Adds the specified resource URI as a member of the document.", [
					{ name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Response>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"addMembers",
			"Adds the specified resources as members of the document.", [
				{ name: "members", type: "(Carbon.Pointer.Pointer | string)[]", description: "Array of URIs or Pointers to add as members." },
			],
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"createChild"
		), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists a document with the slug specified as a child of the current document.", [
					{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Document` object, it's transformed into one." },
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.PersistedProtectedDocument, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists a document as a child of the current document.", [
					{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Document` object, it's transformed into one." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.PersistedProtectedDocument, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				"Creates an persists an empty child for the current document with the slug provided.", [
					{ name: "slug", type: "string", description: "The slug that will be used in the child URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedProtectedDocument.PersistedProtectedDocument, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				"Creates and persists an empty child fot he current document.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedProtectedDocument.PersistedProtectedDocument, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createChildren"
		), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple JavaScript objects as children of the current document.", [
					{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.PersistedProtectedDocument)[], Carbon.HTTP.Response.Response[] ]>", description: "Promise that contains a tuple with an array of the new UNRESOLVED persisted children, and another array with the response class of every request." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple JavaScript objects as children of the current document.", [
					{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.PersistedProtectedDocument)[], Carbon.HTTP.Response.Response[] ]>", description: "Promise that contains a tuple with an array of the new UNRESOLVED persisted children, and another array with the response class of every request." }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createChildAndRetrieve",
			"Create a child for the document and retrieves the updated data from the server."
		), ():void => {

			it( hasSignature(
				[ "T extends object" ], [
					{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Document` object, it is transformed into one." },
					{ name: "slug", type: "string", description: "The slug name for the children URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.PersistedProtectedDocument, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ], [
					{ name: "object", type: "T", description: "The object from where create the child. If it's a non `Carbon.Document.Document` object, it is transformed into one." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedProtectedDocument.PersistedProtectedDocument, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

			it( hasSignature( [
					{ name: "slug", type: "string", description: "The slug name for the children URI." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedProtectedDocument.PersistedProtectedDocument, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

			it( hasSignature( [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedProtectedDocument.PersistedProtectedDocument, Carbon.HTTP.Response.Response ]>" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createChildrenAndRetrieve"
		), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.", [
					{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.PersistedProtectedDocument)[], Carbon.HTTP.Response.Response[] ]>", description: "Promise that contains a tuple with an array of the new resolved persisted children, and another array with the response class of every request." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.", [
					{ name: "objects", type: "T[]", description: "An array with the objects to be persisted as the new children." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for every the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedProtectedDocument.PersistedProtectedDocument)[], Carbon.HTTP.Response.Response[] ]>", description: "Promise that contains a tuple with an array of the new resolved persisted children, and another array with the response class of every request." }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createAccessPoint"
		), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Create an AccessPoint for the document with the slug specified.", [
					{ name: "accessPoint", type: "T & Carbon.AccessPoint.AccessPointBase", description: "AccessPoint Document to persist." },
					{ name: "slug", type: "string", optional: true, description: "Slug that will be used for the URI of the new access point." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customisable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedAccessPoint.PersistedAccessPoint, Carbon.HTTP.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Create an AccessPoint for the document.", [
					{ name: "accessPoint", type: "T & Carbon.AccessPoint.AccessPointBase", description: "AccessPoint Document to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ T & Carbon.PersistedAccessPoint.PersistedAccessPoint, Carbon.HTTP.Response ]>" }
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"createAccessPoints"
		), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Create multiple access points for the current document with the slug specified.", [
					{ name: "accessPoints", type: "(T & Carbon.AccessPoint.AccessPointBase)[]", description: "The access points to persist." },
					{ name: "slugs", type: "string[]", description: "Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customisable options for the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedAccessPoint.PersistedAccessPoint)[], Carbon.HTTP.Response.Response[] ]>", description: "Promise that contains a tuple with an array of the new and UNRESOLVED persisted access points, and the array containing the response classes of every request." }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Create multiple access points for the current document.", [
					{ name: "accessPoints", type: "(T & Carbon.AccessPoint.AccessPointBase)[]", description: "The access points to persist." },
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedAccessPoint.PersistedAccessPoint)[], Carbon.HTTP.Response.Response[] ]>", description: "Promise that contains a tuple with an array of the new and UNRESOLVED persisted access points, and the array containing the response classes of every request." }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "listChildren" ), ():void => {

			it( hasSignature(
				"Retrieves the empty children of the document.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedDocument.PersistedDocument[], Carbon.HTTP.Response ]>" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "getChildren" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.QueryDocumentsBuilder ) => Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedDocument.PersistedDocument)[], Carbon.HTTP.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.QueryDocumentsBuilder ) => Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedDocument.PersistedDocument)[], Carbon.HTTP.Response ]>" }
			), ():void => {} );

		} );


		describe( method( OBLIGATORY, "listMembers" ), ():void => {

			it( hasSignature(
				"Retrieves the empty members of the document.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<[ Carbon.PersistedDocument.PersistedDocument[], Carbon.HTTP.Response ]>" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "getMembers" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.QueryDocumentsBuilder ) => Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedDocument.PersistedDocument)[], Carbon.HTTP.Response ]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "queryBuilderFn", type: "( queryBuilder:Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.QueryDocumentsBuilder ) => Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<[ (T & Carbon.PersistedDocument.PersistedDocument)[], Carbon.HTTP.Response ]>" }
			), ():void => {} );

		} );


		describe( method(
			OBLIGATORY,
			"removeMember"
		), ():void => {

			it( hasSignature(
				"Remove the specified resource Pointer as a member of the current document.", [
					{ name: "member", type: "Carbon.Pointer.Pointer", description: "Pointer object that references the resource to remove as a member." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Response>" }
			), ():void => {} );

			it( hasSignature(
				"Remove the specified resource URI as a member of the current document.", [
					{ name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
				],
				{ type: "Promise<Carbon.HTTP.Response.Response>" }
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"removeMembers",
			"Remove the specified resources URI or Pointers as members of the current document.", [
				{ name: "members", type: "(Carbon.Pointer.Pointer | string)[]", description: "Array of URIs or Pointers to remove as members" },
			],
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"removeAllMembers",
			"Remove the specified resources URI or Pointers as members of the current document.",
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawASKQuery",
			"Executes an ASK query in the document and returns a raw application/sparql-results+json object.", [
				{ name: "askQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ Carbon.SPARQL.RawResults.SPARQLRawResults, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeASKQuery",
			"Executes an ASK query in the document and returns a boolean of the result.", [
				{ name: "askQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ boolean, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawSELECTQuery",
			"Executes a SELECT query in the document and returns a raw application/sparql-results+json object.", [
				{ name: "selectQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ Carbon.SPARQL.RawResults.SPARQLRawResults, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeSELECTQuery",
			[ "T extends object" ],
			"Executes a SELECT query in the document and returns the results as a `Carbon.SPARQL.SelectResults.SPARQLSelectResults` object.", [
				{ name: "selectQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ Carbon.SPARQL.SelectResults.SPARQLSelectResults<T>, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawCONSTRUCTQuery",
			"Executes a CONSTRUCT query in the document and returns a string with the resulting model.", [
				{ name: "constructQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ string, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeRawDESCRIBEQuery",
			"Executes a DESCRIBE query in the document and returns a string with the resulting model.", [
				{ name: "constructQuery", type: "string" },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<[ string, Carbon.HTTP.Response.Response ]>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"executeUPDATE",
			"Executes an UPDATE query.", [
				{ name: "updateQuery", type: "string", description: "UPDATE query to execute in the selected endpoint." },
				{ name: "requestOptions", type: "Carbon.HTTP.Request.RequestOptions", optional: true, description: "Customizable options for the request." },
			],
			{ type: "Promise<Carbon.HTTP.Response.Response>" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"sparql",
			"Method that creates an instance of SPARQLER for the document end-point.",
			{ type: "SPARQLER/Clauses/QueryClause" }
		), ():void => {} );

	} );

	describe( interfaze(
		"Carbon.PersistedDocument.PersistedDocumentConstant",
		"Interface with factory, decorate and utils methods for `Carbon.PersistedDocument.PersistedDocument` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the Document provided has the properties and methods of a `Carbon.PersistedDocument.PersistedDocument` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is Carbon.PersistedDocument.PersistedDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the element provided is considered a `Carbon.PersistedDocument.PersistedDocument` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is Carbon.PersistedDocument.PersistedDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			"Creates an empty `Carbon.PersistedDocument.PersistedDocument` object with the URI provided.", [
				{ name: "documents", type: "Carbon.Documents.Documents", description: "The Documents instance to which the persisted document belongs." },
				{ name: "uri", type: "string" },
			],
			{ type: "Carbon.PersistedDocument.PersistedDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a PersistedDocument object from the object and URI provided.", [
				{ name: "object", type: "T" },
				{ name: "documents", type: "Carbon.Documents.Documents", description: "The Documents instance to which the persisted document belongs." },
				{ name: "uri", type: "string" },
			],
			{ type: "T & Carbon.PersistedDocument.PersistedDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `Carbon.PersistedDocument.PersistedDocument` object.", [
				{ name: "object", type: "T" },
				{ name: "documents", type: "Carbon.Documents.Documents", description: "The Documents instance to which the persisted document belongs." },
			],
			{ type: "T & Carbon.PersistedDocument.PersistedDocument" }
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.PersistedDocument.PersistedDocument" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedDocument;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( property(
		STATIC,
		"PersistedDocument",
		"Carbon.PersistedDocument.PersistedDocumentConstant",
		"Constant that implements the `Carbon.PersistedDocument.PersistedDocumentConstant` interface."
	), ():void => {

		let context:AbstractContext;
		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				protected _baseURI:string;

				constructor() {
					super();
					this._baseURI = "http://example.com/";
					this.settings = {
						vocabulary: "vocab#",
						paths: { system: ".system/" },
					};
				}
			}

			context = new MockedContext();
		} );

		it( isDefined(), ():void => {
			expect( PersistedDocument ).toBeDefined();
			expect( PersistedDocument ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "PersistedDocument.isDecorated", ():void => {
			expect( PersistedDocument.isDecorated ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.isDecorated ) ).toBe( true );

			let document:any = undefined;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );

			document = {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,

				_eTag: null,
				isLocallyOutDated: ():void => {},

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

				executeRawASKQuery: ():void => {},
				executeASKQuery: ():void => {},
				executeRawSELECTQuery: ():void => {},
				executeSELECTQuery: ():void => {},
				executeRawDESCRIBEQuery: ():void => {},
				executeRawCONSTRUCTQuery: ():void => {},
				executeUPDATE: ():void => {},

				sparql: ():void => {},
			};
			expect( PersistedDocument.isDecorated( document ) ).toBe( true );

			delete document.isLocallyOutDated;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.isLocallyOutDated = ():void => {};

			delete document.accessPoints;
			expect( PersistedDocument.isDecorated( document ) ).toBe( true );
			document.accessPoints = null;

			delete document.created;
			expect( PersistedDocument.isDecorated( document ) ).toBe( true );
			document.created = null;

			delete document.modified;
			expect( PersistedDocument.isDecorated( document ) ).toBe( true );
			document.modified = null;

			delete document.defaultInteractionModel;
			expect( PersistedDocument.isDecorated( document ) ).toBe( true );
			document.defaultInteractionModel = null;

			delete document._eTag;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document._eTag = null;

			delete document.refresh;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.refresh = ():void => {};

			delete document.save;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.save = ():void => {};

			delete document.saveAndRefresh;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.saveAndRefresh = ():void => {};

			delete document.delete;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.delete = ():void => {};

			delete document.getDownloadURL;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.getDownloadURL = ():void => {};

			delete document.addMember;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.addMember = ():void => {};

			delete document.addMembers;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.addMembers = ():void => {};

			delete document.createAccessPoint;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.createAccessPoint = ():void => {};

			delete document.createAccessPoints;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.createAccessPoints = ():void => {};

			delete document.createChild;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.createChild = ():void => {};

			delete document.createChildren;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.createChildren = ():void => {};

			delete document.createChildAndRetrieve;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.createChildAndRetrieve = ():void => {};

			delete document.createChildrenAndRetrieve;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.createChildrenAndRetrieve = ():void => {};

			delete document.listChildren;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.listChildren = ():void => {};

			delete document.getChildren;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.getChildren = ():void => {};

			delete document.listMembers;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.listMembers = ():void => {};

			delete document.getMembers;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.getMembers = ():void => {};

			delete document.removeMember;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.removeMember = ():void => {};

			delete document.removeMembers;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.removeMembers = ():void => {};

			delete document.removeAllMembers;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.removeAllMembers = ():void => {};

			delete document.executeRawASKQuery;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.executeRawASKQuery = ():void => {};

			delete document.executeASKQuery;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.executeASKQuery = ():void => {};

			delete document.executeRawSELECTQuery;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.executeRawSELECTQuery = ():void => {};

			delete document.executeSELECTQuery;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.executeSELECTQuery = ():void => {};

			delete document.executeRawDESCRIBEQuery;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.executeRawDESCRIBEQuery = ():void => {};

			delete document.executeRawCONSTRUCTQuery;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.executeRawCONSTRUCTQuery = ():void => {};

			delete document.executeUPDATE;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.executeUPDATE = ():void => {};

			delete document.sparql;
			expect( PersistedDocument.isDecorated( document ) ).toBe( false );
			document.sparql = ():void => {};
		} );

		// TODO: Separate in different tests
		it( "PersistedDocument.is", ():void => {
			expect( PersistedDocument.is ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.is ) ).toBe( true );

			expect( PersistedDocument.is( undefined ) ).toBe( false );
			expect( PersistedDocument.is( null ) ).toBe( false );
			expect( PersistedDocument.is( <any> "a string" ) ).toBe( false );
			expect( PersistedDocument.is( <any> 100 ) ).toBe( false );
			expect( PersistedDocument.is( {} ) ).toBe( false );

			let object:any = Document.createFrom( {
				created: null,
				modified: null,
				defaultInteractionModel: null,
				accessPoints: null,

				_documents: null,
				_eTag: void 0,
				isLocallyOutDated: ():void => {},

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
			expect( PersistedDocument.is( object ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "PersistedDocument.create", ():void => {
			expect( PersistedDocument.create ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.create ) ).toBe( true );

			let document:PersistedDocument;
			document = PersistedDocument.create( context.documents, "http://example.com/document/" );
			expect( PersistedDocument.is( document ) ).toBe( true );

			expect( document.id ).toBe( "http://example.com/document/" );
			expect( document._documents ).toBe( context.documents );
		} );

		// TODO: Separate in different tests
		it( "PersistedDocument.createFrom", ():void => {
			expect( PersistedDocument.createFrom ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.createFrom ) ).toBe( true );

			interface MyObject {
				myProperty?:string;
			}

			interface MyPersistedDocument extends MyObject, PersistedDocument {}

			let persistedDocument:MyPersistedDocument;

			persistedDocument = PersistedDocument.createFrom<MyObject>( {}, context.documents, "http://example.com/document/" );
			expect( PersistedDocument.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.id ).toBe( "http://example.com/document/" );

			persistedDocument = PersistedDocument.createFrom<MyObject>( { myProperty: "a property" }, context.documents, "http://example.com/document/" );
			expect( PersistedDocument.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.id ).toBe( "http://example.com/document/" );
			expect( persistedDocument.myProperty ).toBe( "a property" );
		} );

		// TODO: Separate in different tests
		it( "PersistedDocument.decorate", ():void => {
			expect( PersistedDocument.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedDocument.decorate ) ).toBe( true );

			interface MyObject {
				myProperty?:string;
			}

			interface MyDocument extends MyObject, Document {}

			let document:MyDocument;

			interface MyPersistedDocument extends MyObject, PersistedDocument {
			}

			let persistedDocument:MyPersistedDocument;

			document = Document.createFrom<MyObject>( {} );
			persistedDocument = PersistedDocument.decorate<MyDocument>( document, context.documents );
			expect( PersistedDocument.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.myProperty ).toBeUndefined();
			expect( persistedDocument._documents ).toBe( context.documents );

			document = Document.createFrom<MyObject>( { myProperty: "a property" } );
			persistedDocument = PersistedDocument.decorate<MyDocument>( document, context.documents );
			expect( PersistedDocument.is( persistedDocument ) ).toBe( true );
			expect( persistedDocument.myProperty ).toBeDefined();
			expect( persistedDocument.myProperty ).toBe( "a property" );
			expect( persistedDocument._documents ).toBe( context.documents );
		} );

		describe( "PersistedDocument instance", ():void => {

			let document:PersistedDocument;
			beforeEach( ():void => {
				context.extendObjectSchema( {
					"exTypes": "http://example.com/types#",
					"another": "http://example.com/another-url/ns#",
				} );

				context.documents.getPointer( "http://example.com/in/documents/" );

				document = PersistedDocument.create( context.documents, "http://example.com/document/" );
				document.createNamedFragment( "fragment" );
				document.createFragment( "_:BlankNode" );
			} );

			// TODO: Test in `PersistedDocument.decorate`
			it( "PersistedDocument._eTag", ():void => {
				// By default, the ETag is undefined.
				expect( document._eTag ).toBeUndefined();
				// But property is declared
				expect( document.hasOwnProperty( "_eTag" ) ).toBe( true );
			} );

			// TODO: Test in `PersistedDocument.decorate`
			it( "PersistedDocument._documents", ():void => {
				expect( document._documents ).toBeDefined();
				expect( Utils.isObject( document._documents ) ).toBe( true );
				expect( document._documents instanceof Documents ).toBe( true );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.addType", ():void => {
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

			// TODO: Separate in different tests
			it( "PersistedDocument.hasType", ():void => {
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

			// TODO: Separate in different tests
			it( "PersistedDocument.removeType", ():void => {
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

			// TODO: Separate in different tests
			it( "PersistedDocument.hasPointer", ():void => {

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

			// TODO: Separate in different tests
			it( "PersistedDocument.getPointer", ():void => {
				expect( document.getPointer ).toBeDefined();
				expect( Utils.isFunction( document.getPointer ) ).toBe( true );

				let pointer:Pointer;

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

			describe( "PersistedDocument.inScope", ():void => {

				// TODO: Separate in different tests
				it( "should test when pointer", ():void => {
					expect( document.inScope ).toBeDefined();
					expect( Utils.isFunction( document.inScope ) ).toBe( true );

					let pointer:Pointer;

					expect( document.inScope.bind( document, undefined ) ).toThrowError();
					expect( document.inScope.bind( document, null ) ).toThrowError();

					expect( document.inScope( document ) ).toBe( true );
					pointer = Pointer.create( "http://example.com/document/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.create( "http://example.com/document/#fragment" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.create( "http://example.com/document/#another-fragment" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.create( "_:BlankNode" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.create( "#fragment" );
					expect( document.inScope( pointer ) ).toBe( true );

					// In Documents
					pointer = Pointer.create( "this-uri-is-resolved-relative/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.create( "http://example.com/in/documents/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.create( "http://example.com/document/child/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.create( "http://example.com/another-document/" );
					expect( document.inScope( pointer ) ).toBe( true );
					pointer = Pointer.create( "http://example.org/document/" );
					expect( document.inScope( pointer ) ).toBe( true );
				} );

				// TODO: Separate in different tests
				it( "should test when id", ():void => {
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

			describe( "PersistedDocument.createFragment", ():void => {

				// TODO: Separate in different tests
				it( "should test when object and slug", ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:PersistedFragment & MyInterface;

					object = {};
					fragment = document.createFragment<MyInterface>( object, "my-fragment" );
					expect( object ).toBe( fragment );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#my-fragment" );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createFragment<MyInterface>( object, "http://example.com/document/#another-fragment" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "The BlankNode property" };
					fragment = document.createFragment<MyInterface>( object, "_:My-BlankNode" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:My-BlankNode" );
					expect( fragment.myProperty ).toBe( "The BlankNode property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object, "#another-another-fragment" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-another-fragment" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.isDecorated( fragment.myPointer ) ).toBe( true );
					expect( URI.isBNodeID( (<Fragment> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object, "_:AnotherBlankNode" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:AnotherBlankNode" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.isDecorated( fragment.myPointer ) ).toBe( true );
					expect( URI.isBNodeID( (<Fragment> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );

					expect( () => document.createFragment( {}, "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createFragment( {}, "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
					expect( () => document.createFragment( {}, "_:BlankNode" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				// TODO: Separate in different tests
				it( "should test when object", ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:PersistedFragment & MyInterface;

					object = {};
					fragment = document.createFragment<MyInterface>( object );
					expect( object ).toBe( fragment );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( URI.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createFragment<MyInterface>( object );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( URI.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createFragment<MyInterface>( object );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( URI.isBNodeID( fragment.id ) ).toBe( true );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.isDecorated( fragment.myPointer ) ).toBe( true );
					expect( URI.isBNodeID( (<Fragment> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );
				} );

				// TODO: Separate in different tests
				it( "should test when slug", ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					let fragment:PersistedFragment;

					fragment = document.createFragment( "my-fragment" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#my-fragment" );

					fragment = document.createFragment( "http://example.com/document/#another-fragment" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );

					fragment = document.createFragment( "_:My-BlankNode" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "_:My-BlankNode" );

					expect( () => document.createFragment( "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createFragment( "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
					expect( () => document.createFragment( "_:BlankNode" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				// TODO: Separate in different tests
				it( "should test when empty", ():void => {
					expect( document.createFragment ).toBeDefined();
					expect( Utils.isFunction( document.createFragment ) ).toBe( true );

					let fragment1:PersistedFragment;
					let fragment2:PersistedFragment;

					fragment1 = document.createFragment();
					expect( Fragment.isDecorated( fragment1 ) ).toBe( true );
					expect( Utils.isString( fragment1.id ) ).toBe( true );
					expect( URI.isBNodeID( fragment1.id ) ).toBe( true );

					fragment2 = document.createFragment();
					expect( Fragment.isDecorated( fragment2 ) ).toBe( true );
					expect( Utils.isString( fragment2.id ) ).toBe( true );
					expect( URI.isBNodeID( fragment2.id ) ).toBe( true );

					expect( fragment1.id ).not.toBe( fragment2.id );
				} );

			} );

			describe( "PersistedDocument.createNamedFragment", ():void => {

				// TODO: Separate in different tests
				it( "should test when slug", ():void => {
					expect( document.createNamedFragment ).toBeDefined();
					expect( Utils.isFunction( document.createNamedFragment ) ).toBe( true );

					let fragment:PersistedNamedFragment;

					fragment = document.createNamedFragment( "my-fragment" );
					expect( NamedFragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.slug ).toBe( "my-fragment" );
					expect( fragment.id ).toBe( "http://example.com/document/#my-fragment" );

					fragment = document.createNamedFragment( "http://example.com/document/#another-fragment" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.slug ).toBe( "another-fragment" );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );

					expect( () => document.createNamedFragment( "_:BlankNode" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createNamedFragment( "http://example.com/another-document/#fragment" ) ).toThrowError( Errors.IllegalArgumentError );
					expect( () => document.createNamedFragment( "fragment" ) ).toThrowError( Errors.IDAlreadyInUseError );
				} );

				// TODO: Separate in different tests
				it( "should test when object and slug", ():void => {

					expect( document.createNamedFragment ).toBeDefined();
					expect( Utils.isFunction( document.createNamedFragment ) ).toBe( true );

					interface MyInterface {
						myProperty?:string;
						myPointer?:MyInterface;
					}

					let object:MyInterface;
					let fragment:PersistedFragment & MyInterface;

					object = {};
					fragment = document.createNamedFragment<MyInterface>( object, "my-fragment" );
					expect( object ).toBe( fragment );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#my-fragment" );
					expect( fragment.myProperty ).toBeUndefined();

					object = { myProperty: "The property" };
					fragment = document.createNamedFragment<MyInterface>( object, "http://example.com/document/#another-fragment" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-fragment" );
					expect( fragment.myProperty ).toBe( "The property" );

					object = { myProperty: "Fragment with nested object", myPointer: { myProperty: "The Nested object" } };
					fragment = document.createNamedFragment<MyInterface>( object, "#another-another-fragment" );
					expect( Fragment.isDecorated( fragment ) ).toBe( true );
					expect( fragment.id ).toBe( "http://example.com/document/#another-another-fragment" );
					expect( fragment.myProperty ).toBe( "Fragment with nested object" );
					expect( fragment.myPointer ).toBeDefined();
					expect( Fragment.isDecorated( fragment.myPointer ) ).toBe( true );
					expect( URI.isBNodeID( (<Fragment> fragment.myPointer).id ) ).toBe( true );
					expect( fragment.myPointer.myProperty ).toBeDefined();
					expect( fragment.myPointer.myProperty ).toBe( "The Nested object" );
				} );

			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.refresh", ():void => {
				expect( document.refresh ).toBeDefined();
				expect( Utils.isFunction( document.refresh ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "refresh" );
				document.refresh();
				expect( spy ).toHaveBeenCalledWith( document );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.save", ():void => {
				expect( document.save ).toBeDefined();
				expect( Utils.isFunction( document.save ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "save" );
				document.save();
				expect( spy ).toHaveBeenCalledWith( document, void 0 );

				const requestOptions:RequestOptions = { timeout: 5555 };
				document.save( requestOptions );
				expect( spy ).toHaveBeenCalledWith( document, requestOptions );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.saveAndRefresh", ():void => {
				expect( document.saveAndRefresh ).toBeDefined();
				expect( Utils.isFunction( document.saveAndRefresh ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "saveAndRefresh" );
				document.saveAndRefresh();
				expect( spy ).toHaveBeenCalledWith( document );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.delete", ():void => {
				expect( document.delete ).toBeDefined();
				expect( Utils.isFunction( document.delete ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "delete" );
				document.delete();
				expect( spy ).toHaveBeenCalledWith( document.id );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.getDownloadURL", ():void => {
				expect( document.getDownloadURL ).toBeDefined();
				expect( Utils.isFunction( document.getDownloadURL ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "getDownloadURL" );
				document.getDownloadURL();
				expect( spy ).toHaveBeenCalledWith( document.id );
			} );

			describe( "PersistedDocument.addMember", ():void => {

				// TODO: Separate in different tests
				it( "should test when pointer", ():void => {
					expect( document.addMember ).toBeDefined();
					expect( Utils.isFunction( document.addMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "addMember" );

					let pointer:Pointer = context.documents.getPointer( "new-member/" );
					document.addMember( pointer );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointer );
				} );

				// TODO: Separate in different tests
				it( "should test when uri", ():void => {
					expect( document.addMember ).toBeDefined();
					expect( Utils.isFunction( document.addMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "addMember" );

					document.addMember( "new-member/" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "new-member/" );
				} );

			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.addMembers", ():void => {
				expect( document.addMembers ).toBeDefined();
				expect( Utils.isFunction( document.addMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "addMembers" );

				let pointers:Pointer[] = [];
				pointers.push( context.documents.getPointer( "new-member/" ) );
				document.addMembers( pointers );

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointers );
			} );

			describe( "PersistedDocument.createChild", ():void => {

				// TODO: Separate in different tests
				it( "should test when object, slug and options", ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					let childDocument:Document = Document.create();
					document.createChild( childDocument, "child" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument, "child", {} );
					spy.calls.reset();

					let object:Object;
					let options:RequestOptions;

					object = { my: "object" };
					options = { timeout: 5050 };
					document.createChild( object, "child", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, "child", options );
					spy.calls.reset();

					object = { my: "object" };
					document.createChild( object, "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, "child", {} );
				} );

				// TODO: Separate in different tests
				it( "should test when object and options", ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					let childDocument:Document = Document.create();
					document.createChild( childDocument );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument, null, {} );
					spy.calls.reset();

					let object:Object = { my: "object" };
					document.createChild( object );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, null, {} );
					spy.calls.reset();

					object = { my: "object" };
					let options:RequestOptions = { timeout: 5050 };
					document.createChild( object, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, null, options );
				} );

				// TODO: Separate in different tests
				it( "should test when slug and options", ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					document.createChild( "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, "child", {} );
					spy.calls.reset();

					let options:RequestOptions = { timeout: 5050 };
					document.createChild( "child", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, "child", options );
				} );

				// TODO: Separate in different tests
				it( "should test when options", ():void => {
					expect( document.createChild ).toBeDefined();
					expect( Utils.isFunction( document.createChild ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createChild" );

					document.createChild();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, null, {} );
					spy.calls.reset();

					let options:RequestOptions = { timeout: 5050 };
					document.createChild( options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, null, options );
				} );

			} );

			describe( "PersistedDocument.createChildren", ():void => {

				it( isDefined(), ():void => {
					expect( document.createChildren ).toBeDefined();
					expect( Utils.isFunction( document.createChildren ) ).toBeDefined();
				} );

				// TODO: Separate in different tests
				it( "should test when objects slug and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildren" );

					let objects:Object[];
					let slugs:string[];
					let options:RequestOptions;

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

				// TODO: Separate in different tests
				it( "should test when object and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildren" );

					let objects:Object[];
					let options:RequestOptions;

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

			describe( "PersistedDocument.createChildAndRetrieve", ():void => {

				it( isDefined(), ():void => {
					expect( document.createChildAndRetrieve ).toBeDefined();
					expect( Utils.isFunction( document.createChildAndRetrieve ) ).toBeDefined();
				} );

				// TODO: Separate in different tests
				it( "should test when object, slug and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildAndRetrieve" );

					let childDocument:Document = Document.create();
					document.createChildAndRetrieve( childDocument, "child" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument, "child", {} );
					spy.calls.reset();

					let object:Object;
					let options:RequestOptions;

					object = { my: "object" };
					options = { timeout: 5050 };
					document.createChildAndRetrieve( object, "child", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, "child", options );
					spy.calls.reset();

					object = { my: "object" };
					document.createChildAndRetrieve( object, "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, "child", {} );
				} );

				// TODO: Separate in different tests
				it( "should test when object and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildAndRetrieve" );

					let childDocument:Document = Document.create();
					document.createChildAndRetrieve( childDocument );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", childDocument, null, {} );
					spy.calls.reset();

					let object:Object = { my: "object" };
					document.createChildAndRetrieve( object );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, null, {} );
					spy.calls.reset();

					object = { my: "object" };
					let options:RequestOptions = { timeout: 5050 };
					document.createChildAndRetrieve( object, options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", object, null, options );
				} );

				// TODO: Separate in different tests
				it( "should test when slug and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildAndRetrieve" );

					document.createChildAndRetrieve( "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, "child", {} );
					spy.calls.reset();

					let options:RequestOptions = { timeout: 5050 };
					document.createChildAndRetrieve( "child", options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, "child", options );
				} );

				// TODO: Separate in different tests
				it( "should test when options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildAndRetrieve" );

					document.createChildAndRetrieve();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, null, {} );
					spy.calls.reset();

					let options:RequestOptions = { timeout: 5050 };
					document.createChildAndRetrieve( options );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", {}, null, options );
				} );

			} );

			describe( "PersistedDocument.createChildrenAndRetrieve", ():void => {

				it( isDefined(), ():void => {
					expect( document.createChildrenAndRetrieve ).toBeDefined();
					expect( Utils.isFunction( document.createChildrenAndRetrieve ) ).toBeDefined();
				} );

				// TODO: Separate in different tests
				it( "test when objects, slugs and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildrenAndRetrieve" );

					let objects:Object[];
					let slugs:string[];
					let options:RequestOptions;

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

				// TODO: Separate in different tests
				it( "test when objects and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createChildrenAndRetrieve" );

					let objects:Object[];
					let options:RequestOptions;

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

			describe( "PersistedDocument.createAccessPoint", ():void => {

				// TODO: Separate in different tests
				it( "should test when objects, slug and options", ():void => {
					expect( document.createAccessPoint ).toBeDefined();
					expect( Utils.isFunction( document.createAccessPoint ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createAccessPoint" );

					document.createAccessPoint( { hasMemberRelation: "http://example.com/ns#member-relation" }, "my-new-access-point" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", { hasMemberRelation: "http://example.com/ns#member-relation" }, "my-new-access-point", undefined );
				} );

				// TODO: Separate in different tests
				it( "should test when object and options", ():void => {
					expect( document.createAccessPoint ).toBeDefined();
					expect( Utils.isFunction( document.createAccessPoint ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "createAccessPoint" );

					document.createAccessPoint( { hasMemberRelation: "http://example.com/ns#member-relation" } );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", { hasMemberRelation: "http://example.com/ns#member-relation" }, undefined, undefined );
				} );

			} );

			describe( "PersistedDocument.createAccessPoints", ():void => {

				it( isDefined(), ():void => {
					expect( document.createAccessPoints ).toBeDefined();
					expect( Utils.isFunction( document.createAccessPoints ) ).toBeDefined();
				} );

				// TODO: Separate in different tests
				it( "should test when objects, slugs and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createAccessPoints" );

					let accessPoints:AccessPointBase[] = [
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

				// TODO: Separate in different tests
				it( "should test when objects and options", ():void => {
					let spy:jasmine.Spy = spyOn( document._documents, "createAccessPoints" );

					let accessPoints:AccessPointBase[] = [
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

			describe( "PersistedDocument.getChildren", ():void => {

				// TODO: Separate in different tests
				it( "Should pass parameters to documents instance", ():void => {
					expect( document.getChildren ).toBeDefined();
					expect( Utils.isFunction( document.getChildren ) ).toBeDefined();

					const spy:jasmine.Spy = spyOn( document._documents, "getChildren" );

					// noinspection JSIgnoredPromiseFromCall
					document.getChildren();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", void 0, void 0 );
					spy.calls.reset();

					// noinspection JSIgnoredPromiseFromCall
					document.getChildren( { timeout: 5000 } );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", { timeout: 5000 }, void 0 );
					spy.calls.reset();

					let query:( queryBuilder:any ) => any;

					query = _ => _;
					// noinspection JSIgnoredPromiseFromCall
					document.getChildren( { timeout: 5000 }, query );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", { timeout: 5000 }, query );
					spy.calls.reset();

					query = _ => _;
					// noinspection JSIgnoredPromiseFromCall
					document.getChildren( query );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", query, void 0 );
				} );

			} );

			describe( "PersistedDocument.getMembers", ():void => {

				// TODO: Separate in different tests
				it( "Should pass parameters to documents instance", ():void => {
					expect( document.getMembers ).toBeDefined();
					expect( Utils.isFunction( document.getMembers ) ).toBeDefined();

					const spy:jasmine.Spy = spyOn( document._documents, "getMembers" );

					// noinspection JSIgnoredPromiseFromCall
					document.getMembers();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", void 0, void 0 );
					spy.calls.reset();

					// noinspection JSIgnoredPromiseFromCall
					document.getMembers( { timeout: 5000 } );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", { timeout: 5000 }, void 0 );
					spy.calls.reset();

					let query:( queryBuilder:any ) => any;

					query = _ => _;
					// noinspection JSIgnoredPromiseFromCall
					document.getMembers( { timeout: 5000 }, query );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", { timeout: 5000 }, query );
					spy.calls.reset();

					query = _ => _;
					// noinspection JSIgnoredPromiseFromCall
					document.getMembers( query );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", query, void 0 );
				} );

			} );

			describe( "PersistedDocument.removeMember", ():void => {

				// TODO: Separate in different tests
				it( "should test when pointer", ():void => {
					expect( document.removeMember ).toBeDefined();
					expect( Utils.isFunction( document.removeMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "removeMember" );

					let pointer:Pointer = context.documents.getPointer( "remove-member/" );
					document.removeMember( pointer );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointer );
				} );

				// TODO: Separate in different tests
				it( "should test when uri", ():void => {
					expect( document.removeMember ).toBeDefined();
					expect( Utils.isFunction( document.removeMember ) ).toBeDefined();

					let spy:jasmine.Spy = spyOn( document._documents, "removeMember" );

					document.removeMember( "remove-member/" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", "remove-member/" );
				} );

			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.removeMembers", ():void => {
				expect( document.removeMembers ).toBeDefined();
				expect( Utils.isFunction( document.removeMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "removeMembers" );

				let pointers:Pointer[] = [];
				pointers.push( context.documents.getPointer( "remove-member/" ) );
				document.removeMembers( pointers );

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/", pointers );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.removeAllMembers", ():void => {
				expect( document.removeAllMembers ).toBeDefined();
				expect( Utils.isFunction( document.removeAllMembers ) ).toBeDefined();

				let spy:jasmine.Spy = spyOn( document._documents, "removeAllMembers" );

				document.removeAllMembers();

				expect( spy ).toHaveBeenCalledWith( "http://example.com/document/" );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.executeRawASKQuery", ():void => {
				expect( document.executeRawASKQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawASKQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawASKQuery" );
				document.executeRawASKQuery( "ASK { ?subject, ?predicate, ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "ASK { ?subject, ?predicate, ?object }", {} );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.executeASKQuery", ():void => {
				expect( document.executeASKQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeASKQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeASKQuery" );
				document.executeASKQuery( "ASK { ?subject, ?predicate, ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "ASK { ?subject, ?predicate, ?object }", {} );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.executeRawSELECTQuery", ():void => {
				expect( document.executeRawSELECTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawSELECTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawSELECTQuery" );
				document.executeRawSELECTQuery( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {} );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.executeSELECTQuery", ():void => {
				expect( document.executeSELECTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeSELECTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeSELECTQuery" );
				document.executeSELECTQuery( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {} );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.executeRawCONSTRUCTQuery", ():void => {
				expect( document.executeRawCONSTRUCTQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawCONSTRUCTQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawCONSTRUCTQuery" );
				document.executeRawCONSTRUCTQuery( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {} );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.executeRawDESCRIBEQuery", ():void => {
				expect( document.executeRawDESCRIBEQuery ).toBeDefined();
				expect( Utils.isFunction( document.executeRawDESCRIBEQuery ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeRawDESCRIBEQuery" );
				document.executeRawDESCRIBEQuery( "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
				expect( spy ).toHaveBeenCalledWith( document.id, "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {} );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.executeUPDATE", ():void => {
				expect( document.executeUPDATE ).toBeDefined();
				expect( Utils.isFunction( document.executeUPDATE ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "executeUPDATE" );
				document.executeUPDATE( `INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }` );
				expect( spy ).toHaveBeenCalledWith( document.id, `INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }`, {} );
			} );

			// TODO: Separate in different tests
			it( "PersistedDocument.sparql", ():void => {
				expect( document.sparql ).toBeDefined();
				expect( Utils.isFunction( document.sparql ) ).toBe( true );

				let spy:jasmine.Spy = spyOn( context.documents, "sparql" );

				document.sparql();
				expect( spy ).toHaveBeenCalledWith( document.id );
			} );

		} );

	} );

} );
