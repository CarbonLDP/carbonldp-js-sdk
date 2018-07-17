import { DocumentsContext } from "../Context/DocumentsContext";
import { ModelFactory } from "../Model/ModelFactory";

import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";

import { BaseDocumentsRepository } from "./BaseDocumentsRepository";
import { DocumentsRepository, DocumentsRepositoryFactory } from "./DocumentsRepository";

import { EventEmitterDocumentsRepositoryTrait } from "./Traits/EventEmitterDocumentsRepositoryTrait";
import { QueryableDocumentsRepositoryTrait } from "./Traits/QueryableDocumentsRepositoryTrait";
import { SPARQLDocumentsRepositoryTrait } from "./Traits/SPARQLDocumentsRepositoryTrait";


describe( module( "carbonldp/DocumentsRepository" ), () => {

	let $context:DocumentsContext;
	beforeEach( ():void => {
		$context = new DocumentsContext( "https://example.com/" );
	} );


	describe( interfaze(
		"CarbonLDP.DocumentsRepository",
		"Documents repository."
	), () => {

		it( extendsClass( "CarbonLDP.DocumentsRepository.Trait.QueryableDocumentsRepositoryTrait" ), () => {
			const target:QueryableDocumentsRepositoryTrait = {} as DocumentsRepository;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.DocumentsRepository.Trait.SPARQLDocumentsRepositoryTrait" ), () => {
			const target:SPARQLDocumentsRepositoryTrait = {} as DocumentsRepository;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.DocumentsRepository.Trait.EventEmitterDocumentsRepositoryTrait" ), () => {
			const target:EventEmitterDocumentsRepositoryTrait = {} as DocumentsRepository;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$context",
			"CarbonLDP.DocumentsContext"
		), ():void => {
			const target:DocumentsRepository[ "$context" ] = {} as DocumentsContext;
			expect( target ).toBeDefined();
		} );


		let repository:DocumentsRepository;
		beforeEach( () => {
			repository = DocumentsRepository.create( { $context } );
		} );


		describe( method( OBLIGATORY, "$get" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the entire specified document.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to retrieve." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", description: "Customizable options for the request." },
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
				"Retrieves the selected properties and sub-properties of a query builder function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.$get ).toBeDefined();
				expect( repository.$get ).toEqual( jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "$resolve" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the entire specified document.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to retrieve." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.GETOptions", description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the specified properties and sub-properties of the URI specified by the function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Resolves the selected properties and sub-properties of a query builder function provided.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.$resolve ).toBeDefined();
				expect( repository.$resolve ).toEqual( jasmine.any( Function ) );
			} );

		} );

		describe( method( OBLIGATORY, "$exists" ), () => {

			it( hasSignature(
				[
					{ name: "uri", type: "string", description: "The URI to verify if its existence." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<boolean>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( repository.$exists ).toBeDefined();
				expect( repository.$exists ).toEqual( jasmine.any( Function ) );
			} );

		} );


		describe( method( OBLIGATORY, "$save" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document.",
				[
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be saved." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

		} );

		describe( method( OBLIGATORY, "$saveAndRefresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Send the changes of the document and retrieves the updated data from the server.",
				[
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be saved." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

		} );

		describe( method( OBLIGATORY, "$refresh" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Refresh the full or partial document.",
				[
					{ name: "document", type: "CarbonLDP.Document", description: "The document to be refreshed." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<T & CarbonLDP.Document>" }
			), () => {} );

			it( "should exists", ():void => {
				expect( repository.$refresh ).toBeDefined();
				expect( repository.$refresh ).toEqual( jasmine.any( Function ) );
			} );

		} );


		describe( method( OBLIGATORY, "$delete" ), () => {

			it( hasSignature(
				"Delete the resource referred by the URI provided from the server.", [
					{ name: "uri", type: "string", description: "The resource to be deleted." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<void>" }
			), ():void => {} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepositoryFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.DocumentsRepository` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelFactory<CarbonLDP.DocumentsRepository<any>, CarbonLDP.BaseDocumentsRepository>" ), () => {
			const target:ModelFactory<DocumentsRepository, BaseDocumentsRepository> = {} as DocumentsRepositoryFactory;
			expect( target ).toBeDefined();
		} );


		describe( "DocumentsRepository.create", () => {

			it( "should exists", ():void => {
				expect( DocumentsRepository.create ).toBeDefined();
				expect( DocumentsRepository.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return different object", () => {
				const base:BaseDocumentsRepository = { $context };
				const returned:object = DocumentsRepository.create( base );

				expect( returned ).not.toBe( base );
			} );

			it( "should call with .createFrom", () => {
				const spy:jasmine.Spy = spyOn( DocumentsRepository, "createFrom" )
					.and.callThrough();

				DocumentsRepository.create( { $context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

		describe( "DocumentsRepository.createFrom", () => {

			it( "should exists", ():void => {
				expect( DocumentsRepository.createFrom ).toBeDefined();
				expect( DocumentsRepository.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return same object", () => {
				const base:BaseDocumentsRepository = { $context };
				const returned:object = DocumentsRepository.createFrom( base );

				expect( returned ).toBe( base );
			} );


			it( "should create with QueryableDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( QueryableDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				DocumentsRepository.createFrom( { $context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should create with SPARQLDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( SPARQLDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				DocumentsRepository.createFrom( { $context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should create with EventEmitterDocumentsRepositoryTrait", () => {
				const spy:jasmine.Spy = spyOn( EventEmitterDocumentsRepositoryTrait, "decorate" )
					.and.callThrough();

				DocumentsRepository.createFrom( { $context, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"DocumentsRepository",
		"CarbonLDP.DocumentsRepositoryFactory"
	), () => {

		it( "should exists", ():void => {
			expect( DocumentsRepository ).toBeDefined();
			expect( DocumentsRepository ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );


