import {
	createMockContext,
	createMockPartialMetadata,
	defineNonEnumerableProps
} from "../../test/helpers/mocks";
import { AbstractContext } from "../Context/AbstractContext";
import { MembersDocument } from "../Members";
import { MessagingDocument } from "../Messaging";
import { DocumentsRegistry } from "../Registry";
import { SPARQLDocument } from "../SPARQL";
import { QueryDocumentDocument } from "../SPARQL/QueryDocument";
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
import { CRUDDocument } from "./CRUDDocument";
import { Document } from "./Document";


function createMock<T extends object>( data?:T & Partial<Document> ):T & Document {
	const mock:T & Document = Document.decorate( Object.assign( {
		id: "https://example.com/",
	}, data ) );

	defineNonEnumerableProps( mock );
	mock._normalize();

	return mock;
}

describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Document",
		"Interface that represents a c:Document of a Carbon LDP instance."
	), ():void => {

		it( extendsClass( "CarbonLDP.CRUDDocument" ), ():void => {} );
		it( extendsClass( "CarbonLDP.Members.MembersDocument" ), ():void => {} );
		it( extendsClass( "CarbonLDP.SPARQL.SPARQLDocument" ), ():void => {} );
		it( extendsClass( "CarbonLDP.Messaging.MessagingDocument" ), ():void => {} );
		it( extendsClass( "CarbonLDP.QueryDocument.QueryDocumentDocument" ), ():void => {} );

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
			"CarbonLDP.Pointer[]",
			"Array with the access points of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"contains",
			"CarbonLDP.Pointer",
			"Array with the children of the document."
		), ():void => {} );


		describe( method( OBLIGATORY, "get" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the document specified by the function provided.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the entire current document or just the selected properties and sub-properties of a query builder function provided.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.QueryDocument.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the specified properties and sub-properties of the URI specified by the function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the entire specified document or just the selected properties and sub-properties of a query builder function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.QueryDocument.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should call QueryDocumentDocument when builder function", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.get( _ => _ )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/", {}, jasmine.any( Function ) );
					} )
				;
			} );

			it( "should call QueryDocumentDocument when options and builder function", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.get( { timeout: 5050 }, _ => _ )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/", { timeout: 5050 }, jasmine.any( Function ) );
					} )
				;
			} );

			it( "should call QueryDocumentDocument when URI and builder function", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.get( "resource/", _ => _ )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "resource/", {}, jasmine.any( Function ) );
					} )
				;
			} );

			it( "should call QueryDocumentDocument when URI, options and builder function", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.get( "resource/", { timeout: 5050 }, _ => _ )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "resource/", { timeout: 5050 }, jasmine.any( Function ) );
					} )
				;
			} );


			it( "should call CRUDDocument nothing", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.get()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/", {} );
					} )
				;
			} );

			it( "should call CRUDDocument when options", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.get( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "https://example.com/", { timeout: 5050 } );
					} )
				;
			} );

			it( "should call CRUDDocument when URI", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.get( "resource/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "resource/", {} );
					} )
				;
			} );

			it( "should call CRUDDocument when URI and options", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.get( "resource/", { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( "resource/", { timeout: 5050 } );
					} )
				;
			} );


			it( "should ensure latest when current is partial and no builder function", async () => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();

				const resource:Document = createMock( {
					__partialMetadata: createMockPartialMetadata( {} ),
					$registry: _registry,
				} );

				_registry.__resourcesMap.set( _registry.__getLocalID( resource.$id ), resource );


				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await resource.get()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( "https://example.com/", { ensureLatest: true } );
					} );
			} );

			it( "should ensure latest when current is partial and no builder function, with options", async () => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();

				const resource:Document = createMock( {
					__partialMetadata: createMockPartialMetadata( {} ),
					$registry: _registry,
				} );

				_registry.__resourcesMap.set( _registry.__getLocalID( resource.$id ), resource );


				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await resource.get( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( "https://example.com/", { timeout: 5050, ensureLatest: true } );
					} );
			} );

			it( "should ensure latest when URI is partial and no builder function", async () => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();

				const resource:Document = createMock( { $registry: _registry } );

				_registry.__resourcesMap.set( "resource/", createMock( {
					$registry: _registry,
					__partialMetadata: createMockPartialMetadata( {} ),
				} ) );


				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await resource.get( "resource/" )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( "resource/", { ensureLatest: true } );
					} );
			} );

			it( "should ensure latest when URI is partial and no builder function, with options", async () => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();

				const resource:Document = createMock( { $registry: _registry } );

				_registry.__resourcesMap.set( "resource/", createMock( {
					$registry: _registry,
					__partialMetadata: createMockPartialMetadata( {} ),
				} ) );


				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "get" )
					.and.returnValue( Promise.reject( null ) );

				await resource.get( "resource/", { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( "resource/", { timeout: 5050, ensureLatest: true } );
					} );
			} );

		} );

		describe( method( OBLIGATORY, "resolve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the specified properties and sub-properties of the current document.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.QueryDocument.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the specified properties and sub-properties of the current document.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocument.QueryDocumentBuilder ) => CarbonLDP.QueryDocument.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );


			it( "should call QueryDocumentDocument when builder function", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "resolve" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.resolve( _ => _ )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( {}, jasmine.any( Function ) );
					} )
				;
			} );

			it( "should call QueryDocumentDocument when options and builder function", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "resolve" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.resolve( { timeout: 5050 }, _ => _ )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( { timeout: 5050 }, jasmine.any( Function ) );
					} )
				;
			} );


			it( "should call CRUDDocument nothing", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "resolve" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.resolve()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( {} );
					} )
				;
			} );

			it( "should call CRUDDocument when options", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "resolve" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.resolve( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( { timeout: 5050 } );
					} )
				;
			} );


			it( "should ensure latest when current is partial and no builder function", async () => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();

				const resource:Document = createMock( {
					__partialMetadata: createMockPartialMetadata( {} ),
					$registry: _registry,
				} );

				_registry.__resourcesMap.set( _registry.__getLocalID( resource.$id ), resource );


				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "resolve" )
					.and.returnValue( Promise.reject( null ) );

				await resource.resolve()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( { ensureLatest: true } );
					} );
			} );

			it( "should ensure latest when current is partial and no builder function, with options", async () => {
				const _registry:DocumentsRegistry = new DocumentsRegistry();

				const resource:Document = createMock( {
					__partialMetadata: createMockPartialMetadata( {} ),
					$registry: _registry,
				} );

				_registry.__resourcesMap.set( _registry.__getLocalID( resource.$id ), resource );


				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "resolve" )
					.and.returnValue( Promise.reject( null ) );

				await resource.resolve( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );


						expect( spy ).toHaveBeenCalledWith( { timeout: 5050, ensureLatest: true } );
					} );
			} );

		} );


		describe( method( OBLIGATORY, "refresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Refresh the full or partial document.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & this>" }
			), ():void => {} );


			it( "should call QueryDocumentDocument when partial", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "refresh" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock( { __partialMetadata: createMockPartialMetadata( {} ) } );
				await resource.refresh()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( void 0 );
					} )
				;
			} );

			it( "should call QueryDocumentDocument when partial and options", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "refresh" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock( { __partialMetadata: createMockPartialMetadata( {} ) } );
				await resource.refresh( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( { timeout: 5050 } );
					} )
				;
			} );


			it( "should call CRUDDocument when full", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "refresh" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.refresh()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( void 0 );
					} )
				;
			} );

			it( "should call CRUDDocument when full and options", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "refresh" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.refresh( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( { timeout: 5050 } );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "save" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Save the full or partial changes of the document.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & this>" }
			), ():void => {} );


			it( "should call QueryDocumentDocument when partial", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "save" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock( { __partialMetadata: createMockPartialMetadata( {} ) } );
				await resource.save()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( void 0 );
					} )
				;
			} );

			it( "should call QueryDocumentDocument when partial and options", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "save" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock( { __partialMetadata: createMockPartialMetadata( {} ) } );
				await resource.save( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( { timeout: 5050 } );
					} )
				;
			} );


			it( "should call CRUDDocument when full", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "save" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.save()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( void 0 );
					} )
				;
			} );

			it( "should call CRUDDocument when full and options", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "save" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.save( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( { timeout: 5050 } );
					} )
				;
			} );

		} );

		describe( method( OBLIGATORY, "saveAndRefresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Save the full or partial changes of the document and refreshes with the latest changes from the server of the full of partial data of the document.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & this>" }
			), ():void => {} );


			it( "should call QueryDocumentDocument when partial", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "saveAndRefresh" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock( { __partialMetadata: createMockPartialMetadata( {} ) } );
				await resource.saveAndRefresh()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( void 0 );
					} )
				;
			} );

			it( "should call QueryDocumentDocument when partial and options", async () => {
				const spy:jasmine.Spy = spyOn( QueryDocumentDocument.PROTOTYPE, "saveAndRefresh" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock( { __partialMetadata: createMockPartialMetadata( {} ) } );
				await resource.saveAndRefresh( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( { timeout: 5050 } );
					} )
				;
			} );


			it( "should call CRUDDocument when full", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "saveAndRefresh" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.saveAndRefresh()
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( void 0 );
					} )
				;
			} );

			it( "should call CRUDDocument when full and options", async () => {
				const spy:jasmine.Spy = spyOn( CRUDDocument.PROTOTYPE, "saveAndRefresh" )
					.and.returnValue( Promise.reject( null ) );

				const resource:Document = createMock();
				await resource.saveAndRefresh( { timeout: 5050 } )
					.then( () => fail( "Should not resolve" ) )
					.catch( error => {
						if( error ) fail( error );

						expect( spy ).toHaveBeenCalledWith( { timeout: 5050 } );
					} )
				;
			} );

		} );


		describe( "Document.isDirty", () => {

			it( "should exists", ():void => {
				const resource:Document = createMock();

				expect( resource.isDirty ).toBeDefined();
				expect( resource.isDirty ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return true if self is dirty", () => {
				const resource:Document = createMock( { newData: true } );

				const returned:boolean = resource.isDirty();
				expect( returned ).toBe( true );
			} );


			it( "should return true when removed fragments", () => {
				const resource:Document = createMock();
				resource.createFragment( "_:1" );
				resource._syncSavedFragments();

				expect( resource.isDirty() ).toBe( false );

				resource._removeFragment( "_:1" );
				expect( resource.isDirty() ).toBe( true );
			} );

			it( "should return true when new fragments", () => {
				const resource:Document = createMock();
				resource.createFragment( "_:1" );

				expect( resource.isDirty() ).toBe( true );
			} );

			it( "should return true when removed and new fragments", () => {
				const resource:Document = createMock();
				resource.createFragment( "_:1" );
				resource._syncSavedFragments();

				expect( resource.isDirty() ).toBe( false );

				resource._removeFragment( "_:1" );
				resource.createFragment( "_:2" );
				expect( resource.isDirty() ).toBe( true );
			} );


			it( "should return true when any saved fragment is dirty", () => {
				const resource:Document = createMock();

				resource.createFragment( "_:1" );
				resource.createFragment( "#fragment" );
				const target:{ newData?:boolean } = resource.createFragment<{ newData?:boolean }>( {}, "_:2" );
				resource._syncSavedFragments();

				expect( resource.isDirty() ).toBe( false );

				target.newData = true;
				expect( resource.isDirty() ).toBe( true );
			} );

		} );

		describe( "Document.revert", () => {

			it( "should exists", ():void => {
				const resource:Document = createMock( {} );

				expect( resource.revert ).toBeDefined();
				expect( resource.revert ).toEqual( jasmine.any( Function ) );
			} );


			it( "should revert self changes", () => {
				const resource:Document = createMock( { newData: true } );

				resource.revert();
				expect( resource as {} ).toEqual( {} );
			} );


			it( "should add deleted fragment", () => {
				const resource:Document = createMock();
				resource.createFragment( { the: "fragment" }, "_:1" );
				resource._syncSavedFragments();

				resource._removeFragment( "_:1" );
				resource.revert();

				expect( resource.getFragment( "_:1" ) ).toEqual( { the: "fragment" } );
			} );

			it( "should remove new fragments", () => {
				const resource:Document = createMock();

				resource.createFragment( { the: "fragment" }, "_:1" );
				resource.revert();

				expect( resource.hasFragment( "_:1" ) ).toEqual( false );
			} );

			it( "should add deleted fragments and remove new ones", () => {
				const resource:Document = createMock();
				resource.createFragment( { the: "fragment" }, "_:1" );
				resource._syncSavedFragments();

				resource._removeFragment( "_:1" );
				resource.createFragment( { the: "another-fragment" }, "_:2" );
				resource.revert();

				expect( resource.getFragment( "_:1" ) ).toEqual( { the: "fragment" } );
				expect( resource.hasFragment( "_:2" ) ).toEqual( false );
			} );


			it( "should revert changes in fragments", () => {
				const resource:Document = createMock();

				resource.createFragment( "_:1" );
				resource.createFragment( "#fragment" );
				const target:{ newData?:boolean } = resource.createFragment<{ newData?:boolean }>( {}, "_:2" );
				resource._syncSavedFragments();

				target.newData = true;
				resource.revert();

				expect( target ).toEqual( {} );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.DocumentFactory",
		"Interface with factory, decorate and utils methods for `CarbonLDP.Document` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Returns true if the Document provided has the properties and methods of a `CarbonLDP.Document` object.", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.Document" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is",
			"Returns true if the element provided is considered a `CarbonLDP.Document` object.", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Document" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"create",
			[ "T extends object" ],
			"Creates a `CarbonLDP.TransientDocument` object with the data provided.", [
				{ name: "data", type: "T & CarbonLDP.BaseDocument", description: "Data to be used in the creation of the document." },
			],
			{ type: "T & CarbonLDP.TransientDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"createFrom",
			[ "T extends object" ],
			"Creates a Document object from the object provided.", [
				{ name: "object", type: "T & CarbonLDP.BaseDocument", description: "The object to be transformed in a document." },
			],
			{ type: "T & CarbonLDP.TransientDocument" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Document` object.", [
				{ name: "object", type: "T" },
			],
			{ type: "T & CarbonLDP.Document" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"Document",
		"CarbonLDP.DocumentFactory",
		"Constant that implements the `CarbonLDP.DocumentFactory` interface."
	), ():void => {

		let context:AbstractContext<any, any>;
		beforeEach( ():void => {
			context = createMockContext( { uri: "http://example.com/" } );
		} );

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
				object = {
					created: null,
					modified: null,
					accessPoints: null,

					isDirty: ():any => {},
					revert: ():any => {},

					get: ():any => {},
					resolve: ():any => {},

					refresh: ():any => {},
					save: ():any => {},
					saveAndRefresh: ():any => {},
				};
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

			it( "should return true when no created", ():void => {
				delete object.created;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );

			it( "should return true when no modified", ():void => {
				delete object.modified;
				expect( Document.isDecorated( object ) ).toBe( true );
			} );


			it( "should return false when no isDirty", ():void => {
				delete object.isDirty;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no revert", ():void => {
				delete object.revert;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );


			it( "should return false when no refresh", ():void => {
				delete object.refresh;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no save", ():void => {
				delete object.save;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no saveAndRefresh", ():void => {
				delete object.saveAndRefresh;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

		} );

		describe( "Document.is", ():void => {

			it( "should exists", ():void => {
				expect( Document.is ).toBeDefined();
				expect( Document.is ).toEqual( jasmine.any( Function ) );
			} );


			let isCRUDDocument:jasmine.Spy;
			let isMembersDocument:jasmine.Spy;
			let isSPARQLDocument:jasmine.Spy;
			let isMessagingDocument:jasmine.Spy;
			let isQueryDocumentDocument:jasmine.Spy;
			beforeEach( ():void => {
				isCRUDDocument = spyOn( CRUDDocument, "is" )
					.and.returnValue( true );
				isMembersDocument = spyOn( MembersDocument, "isDecorated" )
					.and.returnValue( true );
				isSPARQLDocument = spyOn( SPARQLDocument, "isDecorated" )
					.and.returnValue( true );
				isMessagingDocument = spyOn( MessagingDocument, "isDecorated" )
					.and.returnValue( true );
				isQueryDocumentDocument = spyOn( QueryDocumentDocument, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert that is a CURDDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isCRUDDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is a MembersDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isMembersDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is SPARQLDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isSPARQLDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is MessagingDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isMessagingDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert that is QueryDocumentDocument", ():void => {
				Document.is( { the: "document" } );
				expect( isQueryDocumentDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert is been decorated", ():void => {
				const spy:jasmine.Spy = spyOn( Document, "isDecorated" );

				Document.is( { the: "document" } );
				expect( spy ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should return true when all assertions passed", ():void => {
				spyOn( Document, "isDecorated" )
					.and.returnValue( true );

				const returned:boolean = Document.is( { the: "document" } );
				expect( returned ).toBe( true );
			} );

		} );

		describe( "Document.decorate", ():void => {

			it( "should exists", ():void => {
				expect( Document.decorate ).toBeDefined();
				expect( Document.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should decorate self properties", ():void => {
				const resource:Document = Document.decorate( {} );
				expect( Document.isDecorated( resource ) ).toBe( true );
			} );

			it( "should decorate fully properties", ():void => {
				const resource:Document = Document.decorate( {} );
				expect( Document.is( resource ) ).toBe( true );
			} );

			it( "should return same object reference", ():void => {
				const object:object = { the: "object" };
				const resource:Document = Document.decorate( object );
				expect( object ).toBe( resource );
			} );

		} );

	} );

} );
