import { createNonEnumerable } from "../../test/helpers/miscellaneous";

import { DocumentsContext } from "../Context/DocumentsContext";

import { Fragment } from "../Fragment/Fragment";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelSchema } from "../Model/ModelSchema";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import {
	extendsClass,
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

import { C } from "../Vocabularies/C";

import { BaseDocument } from "./BaseDocument";
import { BaseResolvableDocument, Document, DocumentFactory } from "./Document";

import { EventEmitterDocumentTrait } from "./Traits/EventEmitterDocumentTrait";
import { QueryableDocumentTrait } from "./Traits/QueryableDocumentTrait";
import { SPARQLDocumentTrait } from "./Traits/SPARQLDocumentTrait";
import { TransientDocument } from "./TransientDocument";


describe( module( "carbonldp/Document" ), ():void => {

	let $context:DocumentsContext;
	beforeEach( ():void => {
		$context = new DocumentsContext( "https://example.com/" );
	} );


	describe( interfaze(
		"CarbonLDP.Document",
		"Interface that represents a c:Document of a Carbon LDP instance."
	), ():void => {

		function createMock<T extends object>( data?:T & Partial<Document> ):T & Document {
			const mock:T & Document = Document.decorate( Object.assign<BaseResolvableDocument, typeof data>( {
				$registry: $context.registry,
				$repository: $context.repository,
				$id: "https://example.com/",
			}, data ) );

			mock.$_normalize();

			return mock;
		}


		it( extendsClass( "CarbonLDP.Document.Traits.QueryableDocumentTrait" ), ():void => {
			const target:QueryableDocumentTrait = {} as Document;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Document.Traits.SPARQLDocumentTrait" ), ():void => {
			const target:SPARQLDocumentTrait = {} as Document;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Document.Traits.EventEmitterDocumentTrait" ), ():void => {
			const target:EventEmitterDocumentTrait = {} as Document;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$__modelDecorator",
			"CarbonLDP.Model.ModelDecorator<CarbonLDP.Fragment>"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"$__resourcesMap",
			"Map<string, CarbonLDP.Fragment>"
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"$__savedFragments",
			"CarbonLDP.Fragment[]",
			"Array with a copy of every fragment that that is currently persisted in the server."
		), ():void => {} );


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
			"CarbonLDP.Pointer",
			"A Pointer representing the default interaction model of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"A Pointer with the member of relation of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"A Pointer with the inverted relation the document."
		), ():void => {} );


		it( hasProperty(
			OPTIONAL,
			"accessPoints",
			"CarbonLDP.Document[]",
			"Array with the access points of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"contains",
			"CarbonLDP.Document",
			"Array with the children of the document."
		), ():void => {} );


		describe( method( OBLIGATORY, "$getPointer" ), () => {

			it( hasSignature(
				[
					{ name: "id", type: "string", description: "ID to return its pointer representation." },
				],
				{ type: "CarbonLDP.RegisteredPointer" }
			), () => {} );

			it( hasSignature(
				[
					{ name: "id", type: "string", description: "ID to check its existence." },
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only return pointers from the current registry." },
				],
				{ type: "CarbonLDP.Fragment" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Document = createMock();

				expect( registry.$getPointer ).toBeDefined();
				expect( registry.$getPointer ).toEqual( jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "$getPointers" ), () => {

			it( hasSignature(
				"Returns all the pointers stored the registry hierarchy.",
				{ type: "CarbonLDP.RegisteredPointer[]" }
			), () => {} );

			it( hasSignature(
				"Returns all the pointers stored in the current registry.",
				[
					{ name: "local", type: "true", description: "Flag to ignore hierarchy and only return pointers from the current registry." },
				],
				{ type: "CarbonLDP.Fragment[]" }
			), () => {} );

			it( "should exists", ():void => {
				const registry:Document = createMock();

				expect( registry.$getPointers ).toBeDefined();
				expect( registry.$getPointers ).toEqual( jasmine.any( Function ) );
			} );

		} );


		describe( method( OBLIGATORY, "$getFragment" ), () => {

			it( hasSignature(
				[ "T" ],
				{ type: "T & CarbonLDP.Fragment" }
			), () => {} );

			it( "should exists", ():void => {
				const document:Document = createMock();

				expect( document.$getFragment ).toBeDefined();
				expect( document.$getFragment ).toEqual( jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "$getFragments" ), () => {

			it( hasSignature(
				"Returns an array with all the fragments in the Document.",
				{ type: "CarbonLDP.Fragment[]" }
			), () => {} );

			it( "should exists", ():void => {
				const document:Document = createMock();

				expect( document.$getFragments ).toBeDefined();
				expect( document.$getFragments ).toEqual( jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "$createFragment" ), () => {

			it( hasSignature(
				[ "T" ],
				"Creates a `CarbonLDP.Fragment` from the object provided and the id if specified.", [
					{ name: "object", type: "T" },
					{ name: "id", type: "string", optional: true },
				],
				{ type: "T & CarbonLDP.Fragment" }
			), ():void => {} );

			it( hasSignature(
				"Creates an empty `CarbonLDP.Fragment` with the id specified.", [
					{ name: "id", type: "string" },
				],
				{ type: "CarbonLDP.Fragment" }
			), ():void => {} );

			it( "should exists", ():void => {
				const document:Document = createMock();

				expect( document.$createFragment ).toBeDefined();
				expect( document.$createFragment ).toEqual( jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "$removeFragment" ), ():void => {

			it( hasSignature(
				"Remove the fragment referenced by the `CarbonLDP.Fragment` provided from the Document.", [
					{ name: "fragment", type: "CarbonLDP.Fragment" },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( hasSignature(
				"Remove the fragment referenced by the Slug provided from the Document.", [
					{ name: "slug", type: "string" },
				],
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const document:Document = createMock();

				expect( document.$removeFragment ).toBeDefined();
				expect( document.$removeFragment ).toEqual( jasmine.any( Function ) );
			} );

		} );


		describe( method( OBLIGATORY, "$get" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the document specified by the function provided.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the entire current document or just the selected properties and sub-properties of a query builder function provided.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the URI specified by the function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the entire specified document or just the selected properties and sub-properties of a query builder function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "$resolve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the specified properties and sub-properties of the current document.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the specified properties and sub-properties of the current document.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

		} );


		describe( method( OBLIGATORY, "$refresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Refresh the full or partial document.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & this>" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "$save" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Save the full or partial changes of the document.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & this>" }
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "$saveAndRefresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Save the full or partial changes of the document and refreshes with the latest changes from the server of the full of partial data of the document.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & this>" }
			), ():void => {} );

		} );


		describe( method( OBLIGATORY, "delete" ), () => {

			it( hasSignature(
				"Deletes the resource referred by the URI provided from the server.", [
					{ name: "uri", type: "string", description: "The resource to be deleted." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

			it( hasSignature(
				"Deletes the current document.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

		} );


		describe( method( OBLIGATORY, "$_syncSavedFragments" ), () => {

			it( hasSignature(
				"Set all the current fragments in the document as fragments that has been saved in the server."
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:Document = createMock();

				expect( resource.$_syncSavedFragments ).toBeDefined();
				expect( resource.$_syncSavedFragments ).toEqual( jasmine.any( Function ) );
			} );


			// TODO: Test

		} );


		// TODO: Test .$_syncSnapshot

		describe( "Document.$isDirty", () => {

			it( "should exists", ():void => {
				const resource:Document = createMock();

				expect( resource.$isDirty ).toBeDefined();
				expect( resource.$isDirty ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true if self is dirty", () => {
				const resource:Document = createMock( { newData: true } );

				const returned:boolean = resource.$isDirty();
				expect( returned ).toBe( true );
			} );


			it( "should return true when removed fragments", () => {
				const resource:Document = createMock();
				resource.$createFragment( "_:1" );
				resource.$_syncSavedFragments();

				expect( resource.$isDirty() ).toBe( false );

				resource.$removeFragment( "_:1" );
				expect( resource.$isDirty() ).toBe( true );
			} );

			it( "should return true when new fragments", () => {
				const resource:Document = createMock();
				resource.$createFragment( "_:1" );

				expect( resource.$isDirty() ).toBe( true );
			} );

			it( "should return true when removed and new fragments", () => {
				const resource:Document = createMock();
				resource.$createFragment( "_:1" );
				resource.$_syncSavedFragments();

				expect( resource.$isDirty() ).toBe( false );

				resource.$removeFragment( "_:1" );
				resource.$createFragment( "_:2" );
				expect( resource.$isDirty() ).toBe( true );
			} );


			it( "should return true when any saved fragment is dirty", () => {
				const resource:Document = createMock();

				resource.$createFragment( "_:1" );
				resource.$createFragment( "#fragment" );
				const target:{ newData?:boolean } = resource.$createFragment<{ newData?:boolean }>( {}, "_:2" );
				resource.$_syncSavedFragments();

				expect( resource.$isDirty() ).toBe( false );

				target.newData = true;
				expect( resource.$isDirty() ).toBe( true );
			} );

		} );

		describe( "Document.$revert", () => {

			it( "should exists", ():void => {
				const resource:Document = createMock( {} );

				expect( resource.$revert ).toBeDefined();
				expect( resource.$revert ).toEqual( jasmine.any( Function ) );
			} );


			it( "should revert self changes", () => {
				const resource:Document = createMock( { newData: true } );

				resource.$revert();
				expect( resource as {} ).toEqual( {} );
			} );


			it( "should add deleted fragment", () => {
				const resource:Document = createMock();
				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$_syncSavedFragments();

				resource.$removeFragment( "_:1" );
				resource.$revert();

				expect( resource.$getFragment( "_:1" ) ).toEqual( { the: "fragment" } );
			} );

			it( "should remove new fragments", () => {
				const resource:Document = createMock();

				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$revert();

				expect( resource.$hasFragment( "_:1" ) ).toEqual( false );
			} );

			it( "should add deleted fragments and remove new ones", () => {
				const resource:Document = createMock();
				resource.$createFragment( { the: "fragment" }, "_:1" );
				resource.$_syncSavedFragments();

				resource.$removeFragment( "_:1" );
				resource.$createFragment( { the: "another-fragment" }, "_:2" );
				resource.$revert();

				expect( resource.$getFragment( "_:1" ) ).toEqual( { the: "fragment" } );
				expect( resource.$hasFragment( "_:2" ) ).toEqual( false );
			} );


			it( "should revert changes in fragments", () => {
				const resource:Document = createMock();

				resource.$createFragment( "_:1" );
				resource.$createFragment( "#fragment" );
				const target:{ newData?:boolean } = resource.$createFragment<{ newData?:boolean }>( {}, "_:2" );
				resource.$_syncSavedFragments();

				target.newData = true;
				resource.$revert();

				expect( target ).toEqual( {} );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.DocumentFactory",
		"Interface with factory, decorate and utils methods for `CarbonLDP.Document` objects."
	), ():void => {


		it( extendsClass( "CarbonLDP.Model.ModelSchema<CarbonLDP.Vocabularies.C.Document>" ), () => {
			const target:ModelSchema<C[ "Document" ]> = {} as DocumentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.Document, CarbonLDP.Document.Traits.SPARQLDocumentTrait & CarbonLDP.Document.Traits.EventEmitterDocumentTrait & CarbonLDP.Document.Traits.QueryableDocumentTrait, \"_syncSnapshot\" | \"isDirty\" | \"revert\">" ), () => {
			const target:ModelPrototype<Document, SPARQLDocumentTrait & EventEmitterDocumentTrait & QueryableDocumentTrait, "$_syncSnapshot" | "$isDirty" | "$revert"> = {} as DocumentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.Document, CarbonLDP.BaseResolvableDocument>" ), () => {
			const target:ModelDecorator<Document, BaseResolvableDocument> = {} as DocumentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelTypeGuard<CarbonLDP.Document>" ), () => {
			const target:ModelTypeGuard<Document> = {} as DocumentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelFactory<CarbonLDP.TransientDocument, CarbonLDP.BaseDocument>" ), () => {
			const target:ModelFactory<TransientDocument, BaseDocument> = {} as DocumentFactory;
			expect( target ).toBeDefined();
		} );

	} );

	describe( property(
		STATIC,
		"Document",
		"CarbonLDP.DocumentFactory",
		"Constant that implements the `CarbonLDP.DocumentFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Document ).toBeDefined();
			expect( Document ).toEqual( jasmine.any( Object ) );
		} );

		describe( "Document.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( Document.isDecorated ).toBeDefined();
				expect( Document.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			let object:typeof Document.PROTOTYPE;
			beforeEach( ():void => {
				object = createNonEnumerable<DocumentFactory["PROTOTYPE"]>( {
					created: null,
					modified: null,
					accessPoints: null,
					contains: null,

					$__savedFragments: [],
					$_syncSavedFragments: ():any => {},

					$_syncSnapshot: ():any => {},
					$isDirty: ():any => {},
					$revert: ():any => {},
				} );
			} );


			it( "should return false when `undefined`", ():void => {
				expect( Document.isDecorated( void 0 ) ).toBe( false );
			} );

			it( "should return false when `null`", ():void => {
				expect( Document.isDecorated( null ) ).toBe( false );
			} );

			it( "should return true when prototype properties", ():void => {
				expect( Document.isDecorated( object ) ).toBe( true );
			} );


			it( "should return true when no accessPoints", ():void => {
				delete object.accessPoints;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no contains", ():void => {
				delete object.contains;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no created", ():void => {
				delete object.created;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no modified", ():void => {
				delete object.modified;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );


			it( "should return false when no __savedFragments", ():void => {
				delete object.$__savedFragments;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no _syncSavedFragments", ():void => {
				delete object.$_syncSavedFragments;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );


			it( "should return false when no _syncSnapshot", ():void => {
				delete object.$_syncSnapshot;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no isDirty", ():void => {
				delete object.$isDirty;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no revert", ():void => {
				delete object.$revert;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

		} );

		describe( "Document.is", ():void => {

			it( "should exists", ():void => {
				expect( Document.is ).toBeDefined();
				expect( Document.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientDocument:jasmine.Spy;
			let isQueryableDocumentTrait:jasmine.Spy;
			let isSPARQLDocumentTrait:jasmine.Spy;
			let isEventEmitterDocumentTrait:jasmine.Spy;
			let isSelfDecorated:jasmine.Spy;
			beforeEach( ():void => {
				isTransientDocument = spyOn( TransientDocument, "is" )
					.and.returnValue( true );
				isQueryableDocumentTrait = spyOn( QueryableDocumentTrait, "isDecorated" )
					.and.returnValue( true );
				isSPARQLDocumentTrait = spyOn( SPARQLDocumentTrait, "isDecorated" )
					.and.returnValue( true );
				isEventEmitterDocumentTrait = spyOn( EventEmitterDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				isSelfDecorated = spyOn( Document, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert that is a TransientDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isTransientDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a QueryableDocumentTrait", ():void => {
				Document.is( { the: "document" } );
				expect( isQueryableDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a SPARQLDocumentTrait", ():void => {
				Document.is( { the: "document" } );
				expect( isSPARQLDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a EventEmitterDocumentTrait", ():void => {
				Document.is( { the: "document" } );
				expect( isEventEmitterDocumentTrait ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert is decorated", ():void => {
				Document.is( { the: "document" } );
				expect( isSelfDecorated ).toHaveBeenCalledWith( { the: "document" } );
			} );


			it( "should return true when all assertions", ():void => {
				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( true );
			} );

			it( "should return false if not a TransientDocument", ():void => {
				isTransientDocument.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a QueryableDocumentTrait", ():void => {
				isQueryableDocumentTrait.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a SPARQLDocumentTrait", ():void => {
				isSPARQLDocumentTrait.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not a EventEmitterDocumentTrait", ():void => {
				isEventEmitterDocumentTrait.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

			it( "should return false if not decorated", ():void => {
				isSelfDecorated.and.returnValue( false );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( false );
			} );

		} );

		describe( "Document.decorate", ():void => {

			it( "should exists", ():void => {
				expect( Document.decorate ).toBeDefined();
				expect( Document.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				Document.decorate( {
					$repository: $context.repository,
					$registry: $context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( Document.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( Document, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );

				Document.decorate( {
					$repository: $context.repository,
					$registry: $context.registry,
				} );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with QueryableDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( QueryableDocumentTrait, "decorate" )
					.and.callThrough();

				Document.decorate( {
					$repository: $context.repository,
					$registry: $context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with SPARQLDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( SPARQLDocumentTrait, "decorate" )
					.and.callThrough();

				Document.decorate( {
					$repository: $context.repository,
					$registry: $context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with EventEmitterDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( EventEmitterDocumentTrait, "decorate" )
					.and.callThrough();

				Document.decorate( {
					$repository: $context.repository,
					$registry: $context.registry,
					the: "object",
				} );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );


			it( "should add $__modelDecorator as FragmentFactory", () => {
				const document:Document = Document.decorate( {
					$repository: $context.repository,
					$registry: $context.registry,
					the: "object",
				} );

				expect( document.$__modelDecorator ).toBe( Fragment );
			} );

		} );

	} );

} );
