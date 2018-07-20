import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { QueryableDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/QueryableDocumentsRepositoryTrait";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { QueryablePointer } from "../../QueryDocuments/QueryablePointer";
import { QueryDocumentsBuilder } from "../../QueryDocuments/QueryDocumentsBuilder";

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
} from "../../test/JasmineExtender";

import { LDPDocumentTrait } from "./LDPDocumentTrait";

import { BaseQueryableDocumentTrait, QueryableDocumentTrait, QueryableDocumentTraitFactory } from "./QueryableDocumentTrait";


describe( module( "carbonldp/DocumentsRepository/Traits/QueryableDocumentTrait" ), () => {

	let context:DocumentsContext;
	let $repository:QueryableDocumentsRepositoryTrait;
	beforeEach( ():void => {
		context = new DocumentsContext( "https://example.com/" );
		$repository = QueryableDocumentsRepositoryTrait.decorate( { context } );
	} );


	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.QueryableDocumentTrait",
		"Documents repository with the implementation for event subscriptions."
	), () => {

		it( extendsClass( "CarbonLDP.LDPDocumentTrait" ), () => {
			const target:LDPDocumentTrait = {} as QueryableDocumentTrait;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.QueryablePointer" ), () => {
			const target:QueryablePointer = {} as QueryableDocumentTrait;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$repository",
			"CarbonLDP.DocumentsRepository.Trait.QueryableDocumentsRepositoryTrait"
		), ():void => {
			const target:QueryableDocumentTrait[ "$repository" ] = {} as QueryableDocumentsRepositoryTrait;
			expect( target ).toBeDefined();
		} );


		const queryBuilderFn:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder = _ => _;
		let resource:QueryableDocumentTrait;
		beforeEach( ():void => {
			resource = QueryableDocumentTrait.decorate( {
				$repository,
				$id: "https://example.com/resource/",
			} );
		} );


		describe( method( OBLIGATORY, "getChildren" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the current document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the current document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the children of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.", [
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the children retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( resource.getChildren ).toBeDefined();
				expect( resource.getChildren ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "getChildren" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when empty", async () => {
				await resource.getChildren();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.getChildren( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );

			it( "should call repository with $id when query", async () => {
				await resource.getChildren( queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", queryBuilderFn );
			} );

			it( "should call repository with $id when options and query", async () => {
				await resource.getChildren( { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.getChildren( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.getChildren( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when query", async () => {
				await resource.getChildren( "https://example.com/another-resource/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", queryBuilderFn );
			} );

			it( "should call repository with absolute URI when options and query", async () => {
				await resource.getChildren( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.getChildren( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.getChildren( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

			it( "should call repository with resoled relative URI when query", async () => {
				await resource.getChildren( "relative/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", queryBuilderFn );
			} );

			it( "should call repository with resoled relative URI when options and query", async () => {
				await resource.getChildren( "relative/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 }, queryBuilderFn );
			} );

		} );

		describe( method( OBLIGATORY, "getMembers" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the current document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the current document, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the members of the specified URI, building a query on which one is able to specify the properties to be retrieve and sub-documents' properties and on and on.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "queryBuilderFn", type: "( queryBuilder:CarbonLDP.QueryDocuments.QueryDocumentsBuilder ) => CarbonLDP.QueryDocuments.QueryDocumentsBuilder", optional: true, description: "Function that receives a the builder that helps you to construct the members retrieval query.\nThe same builder must be returned." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( resource.getMembers ).toBeDefined();
				expect( resource.getMembers ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "getMembers" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when empty", async () => {
				await resource.getMembers();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.getMembers( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );

			it( "should call repository with $id when query", async () => {
				await resource.getMembers( queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", queryBuilderFn );
			} );

			it( "should call repository with $id when options and query", async () => {
				await resource.getMembers( { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.getMembers( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.getMembers( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );

			it( "should call repository with absolute URI when query", async () => {
				await resource.getMembers( "https://example.com/another-resource/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", queryBuilderFn );
			} );

			it( "should call repository with absolute URI when options and query", async () => {
				await resource.getMembers( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 }, queryBuilderFn );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.getMembers( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.getMembers( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

			it( "should call repository with resoled relative URI when query", async () => {
				await resource.getMembers( "relative/", queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", queryBuilderFn );
			} );

			it( "should call repository with resoled relative URI when options and query", async () => {
				await resource.getMembers( "relative/", { timeout: 5050 }, queryBuilderFn );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 }, queryBuilderFn );
			} );

		} );


		describe( method( OBLIGATORY, "listChildren" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty children of the current document",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty children of the specified URI.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( resource.listChildren ).toBeDefined();
				expect( resource.listChildren ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "listChildren" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when empty", async () => {
				await resource.listChildren();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.listChildren( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.listChildren( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.listChildren( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.listChildren( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.listChildren( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

		} );

		describe( method( OBLIGATORY, "listMembers" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty members of the current document",
				[
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Retrieves the empty members of the specified URI.",
				[
					{ name: "uri", type: "string", description: "The URI of the document to query." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", description: "Customizable options for the request." },
				],
				{ type: "Promise<(T & CarbonLDP.Document)[]>" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( resource.listMembers ).toBeDefined();
				expect( resource.listMembers ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "listMembers" )
					.and.returnValue( Promise.resolve( null ) );
			} );


			it( "should call repository with $id when empty", async () => {
				await resource.listMembers();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );

			it( "should call repository with $id when options", async () => {
				await resource.listMembers( { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI when empty", async () => {
				await resource.listMembers( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );

			it( "should call repository with absolute URI when options", async () => {
				await resource.listMembers( "https://example.com/another-resource/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", { timeout: 5050 } );
			} );


			it( "should call repository with resoled relative URI when empty", async () => {
				await resource.listMembers( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );

			it( "should call repository with resoled relative URI when options", async () => {
				await resource.listMembers( "relative/", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", { timeout: 5050 } );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.QueryableDocumentTraitFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.DocumentsRepository.Traits.QueryableDocumentTrait` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.DocumentsRepository.Traits.QueryableDocumentTrait, CarbonLDP.LDPDocumentTrait, CarbonLDP.QueryablePointer" ), () => {
			const target:ModelPrototype<QueryableDocumentTrait, LDPDocumentTrait & QueryablePointer> = {} as QueryableDocumentTraitFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.DocumentsRepository.Traits.QueryableDocumentTrait<any>, CarbonLDP.BaseQueryableDocumentTrait>" ), () => {
			const target:ModelDecorator<QueryableDocumentTrait, BaseQueryableDocumentTrait> = {} as QueryableDocumentTraitFactory;
			expect( target ).toBeDefined();
		} );


		describe( "QueryableDocumentTrait.isDecorated", () => {

			it( "should exists", ():void => {
				expect( QueryableDocumentTrait.isDecorated ).toBeDefined();
				expect( QueryableDocumentTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				QueryableDocumentTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( QueryableDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "QueryableDocumentTrait.decorate", () => {

			it( "should exists", ():void => {
				expect( QueryableDocumentTrait.decorate ).toBeDefined();
				expect( QueryableDocumentTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				QueryableDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( QueryableDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( QueryableDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				QueryableDocumentTrait.decorate( { $repository } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with LDPDocumentTrait", () => {
				const spy:jasmine.Spy = spyOn( LDPDocumentTrait, "decorate" )
					.and.callThrough();

				QueryableDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with QueryablePointer", () => {
				const spy:jasmine.Spy = spyOn( QueryablePointer, "decorate" )
					.and.callThrough();

				QueryableDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"QueryableDocumentTrait",
		"CarbonLDP.DocumentsRepository.Traits.QueryableDocumentTraitFactory"
	), () => {

		it( "should exists", ():void => {
			expect( QueryableDocumentTrait ).toBeDefined();
			expect( QueryableDocumentTrait ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );

