import { spyOnDecorated } from "../../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../../Context/DocumentsContext";

import { SPARQLDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";

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

import { TransientDocument } from "../TransientDocument";

import { BaseSPARQLDocumentTrait, SPARQLDocumentTrait, SPARQLDocumentTraitFactory } from "./SPARQLDocumentTrait";


describe( module( "carbonldp/DocumentsRepository/Traits/SPARQLDocumentTrait" ), () => {

	let $context:DocumentsContext;
	let $repository:SPARQLDocumentsRepositoryTrait;
	beforeEach( ():void => {
		$context = new DocumentsContext( "https://example.com/" );
		$repository = SPARQLDocumentsRepositoryTrait.decorate( { $context } );
	} );


	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentTrait",
		"Documents repository with the implementation for event subscriptions."
	), () => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), () => {
			const target:TransientDocument = {} as SPARQLDocumentTrait;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.ResolvablePointer" ), () => {
			const target:ResolvablePointer = {} as SPARQLDocumentTrait;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"$repository",
			"CarbonLDP.DocumentsRepository.Trait.SPARQLDocumentsRepositoryTrait"
		), ():void => {
			const target:SPARQLDocumentTrait[ "$repository" ] = {} as SPARQLDocumentsRepositoryTrait;
			expect( target ).toBeDefined();
		} );


		let resource:SPARQLDocumentTrait;
		beforeEach( ():void => {
			resource = SPARQLDocumentTrait.decorate( {
				$repository,
				$id: "https://example.com/resource/",
			} );
		} );


		describe( method( OBLIGATORY, "$executeASKQuery" ), () => {

			it( hasSignature(
				"Executes an ASK query on a document and returns the response of the query in form of a boolean.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "askQuery", type: "string", description: "ASK query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<boolean>" }
			), () => {} );

			it( hasSignature(
				"Executes an ASK query on the current document and returns the response of the query in form of a boolean.", [
					{ name: "askQuery", type: "string", description: "ASK query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<boolean>" }
			), () => {} );

			it( "should exists", () => {
				expect( resource.$executeASKQuery ).toBeDefined();
				expect( resource.$executeASKQuery ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "executeASKQuery" )
					.and.returnValue( Promise.resolve( true ) );
			} );


			it( "should call repository with $id when no URI and no options", async () => {
				await resource.$executeASKQuery( "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "query", undefined );
			} );

			it( "should call repository with $id when no URI and custom options", async () => {
				await resource.$executeASKQuery( "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "query", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI and no options", async () => {
				await resource.$executeASKQuery( "https://example.com/another-resource/", "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "query", undefined );
			} );

			it( "should call repository with absolute URI and custom options", async () => {
				await resource.$executeASKQuery( "https://example.com/another-resource/", "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "query", { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI and no options", async () => {
				await resource.$executeASKQuery( "relative/", "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "query", undefined );
			} );

			it( "should call repository with resolved relative URI and custom options", async () => {
				await resource.$executeASKQuery( "relative/", "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "query", { timeout: 5050 } );
			} );

		} );

		describe( method( OBLIGATORY, "$executeSELECTQuery" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				"Executes a SELECT query on a document and returns a parsed response object.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "selectQuery", type: "string", description: "SELECT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLSelectResults<T>>" }
			), () => {} );

			it( hasSignature(
				[ "T extends object" ],
				"Executes a SELECT query on the current document and returns a parsed response object.", [
					{ name: "selectQuery", type: "string", description: "SELECT query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<CarbonLDP.SPARQL.SPARQLSelectResults<T>>" }
			), () => {} );

			it( "should exists", () => {
				expect( resource.$executeSELECTQuery ).toBeDefined();
				expect( resource.$executeSELECTQuery ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( true ) );
			} );


			it( "should call repository with $id when no URI and no options", async () => {
				await resource.$executeSELECTQuery( "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "query", undefined );
			} );

			it( "should call repository with $id when no URI and custom options", async () => {
				await resource.$executeSELECTQuery( "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "query", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI and no options", async () => {
				await resource.$executeSELECTQuery( "https://example.com/another-resource/", "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "query", undefined );
			} );

			it( "should call repository with absolute URI and custom options", async () => {
				await resource.$executeSELECTQuery( "https://example.com/another-resource/", "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "query", { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI and no options", async () => {
				await resource.$executeSELECTQuery( "relative/", "query" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "query", undefined );
			} );

			it( "should call repository with resolved relative URI and custom options", async () => {
				await resource.$executeSELECTQuery( "relative/", "query", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "query", { timeout: 5050 } );
			} );

		} );

		describe( method( OBLIGATORY, "$executeUPDATE" ), () => {

			it( hasSignature(
				"Executes a DESCRIBE query on a document and returns a string with the resulting model.", [
					{ name: "uri", type: "string", description: "URI of the document that works as a SPARQL endpoint where to execute the SPARQL query." },
					{ name: "update", type: "string", description: "UPDATE query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<void>" }
			), () => {} );

			it( hasSignature(
				"Executes a DESCRIBE query on the current document and returns a string with the resulting model.", [
					{ name: "update", type: "string", description: "UPDATE query to execute in the selected endpoint." },
					{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: "Customizable options for the request." },
				], { type: "Promise<void>" }
			), () => {} );

			it( "should exists", () => {
				expect( resource.$executeUPDATE ).toBeDefined();
				expect( resource.$executeUPDATE ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "executeUPDATE" )
					.and.returnValue( Promise.resolve( true ) );
			} );


			it( "should call repository with $id when no URI and no options", async () => {
				await resource.$executeUPDATE( "update" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "update", undefined );
			} );

			it( "should call repository with $id when no URI and custom options", async () => {
				await resource.$executeUPDATE( "update", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/", "update", { timeout: 5050 } );
			} );


			it( "should call repository with absolute URI and no options", async () => {
				await resource.$executeUPDATE( "https://example.com/another-resource/", "update" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "update", undefined );
			} );

			it( "should call repository with absolute URI and custom options", async () => {
				await resource.$executeUPDATE( "https://example.com/another-resource/", "update", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/", "update", { timeout: 5050 } );
			} );


			it( "should call repository with resolved relative URI and no options", async () => {
				await resource.$executeUPDATE( "relative/", "update" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "update", undefined );
			} );

			it( "should call repository with resolved relative URI and custom options", async () => {
				await resource.$executeUPDATE( "relative/", "update", { timeout: 5050 } );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/", "update", { timeout: 5050 } );
			} );


		} );


		describe( method( OBLIGATORY, "$sparql" ), () => {

			it( hasSignature(
				"Method that creates an instance of SPARQLER for the specified document, or the current document if no URI is provided.",
				[
					{ name: "uri", type: "string", optional: true, description: "URI of the document where to execute the SPARQL query." },
				],
				{ type: "SPARQLER/Clauses/QueryClause<CarbonLDP.SPARQL.Builder.FinishSPARQLSelect>" }
			), () => {} );

			it( "should exists", ():void => {
				expect( resource.$sparql ).toBeDefined();
				expect( resource.$sparql ).toEqual( jasmine.any( Function ) );
			} );


			let spy:jasmine.Spy;
			beforeEach( ():void => {
				spy = spyOnDecorated( $repository, "sparql" )
					.and.returnValue( Promise.resolve( true ) );
			} );


			it( "should call repository with $id when no URI", async () => {
				await resource.$sparql();
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/" );
			} );


			it( "should call repository with absolute URI", async () => {
				await resource.$sparql( "https://example.com/another-resource/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/another-resource/" );
			} );


			it( "should call repository with resolved relative URI", async () => {
				await resource.$sparql( "relative/" );
				expect( spy ).toHaveBeenCalledWith( "https://example.com/resource/relative/" );
			} );


		} );

	} );

	describe( interfaze(
		"CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentTraitFactory",
		"Interface with the decoration, factory and utils for `CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentTrait` objects."
	), () => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentTrait, CarbonLDP.TransientDocument, CarbonLDP.ResolvablePointer" ), () => {
			const target:ModelPrototype<SPARQLDocumentTrait, TransientDocument & ResolvablePointer> = {} as SPARQLDocumentTraitFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentTrait<any>, CarbonLDP.BaseSPARQLDocumentTrait>" ), () => {
			const target:ModelDecorator<SPARQLDocumentTrait, BaseSPARQLDocumentTrait> = {} as SPARQLDocumentTraitFactory;
			expect( target ).toBeDefined();
		} );


		describe( "SPARQLDocumentTrait.isDecorated", () => {

			it( "should exists", ():void => {
				expect( SPARQLDocumentTrait.isDecorated ).toBeDefined();
				expect( SPARQLDocumentTrait.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.hasPropertiesFrom with the PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" );

				SPARQLDocumentTrait.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( SPARQLDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

		} );

		describe( "SPARQLDocumentTrait.decorate", () => {

			it( "should exists", ():void => {
				expect( SPARQLDocumentTrait.decorate ).toBeDefined();
				expect( SPARQLDocumentTrait.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call ModelDecorator.definePropertiesFrom with PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" )
					.and.callThrough();

				SPARQLDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( SPARQLDocumentTrait.PROTOTYPE, { the: "object" } );
			} );

			it( "should no call ModelDecorator.definePropertiesFrom when already decorated", () => {
				spyOn( SPARQLDocumentTrait, "isDecorated" )
					.and.returnValue( true );

				const spy:jasmine.Spy = spyOn( ModelDecorator, "definePropertiesFrom" );
				SPARQLDocumentTrait.decorate( { $repository } );

				expect( spy ).not.toHaveBeenCalled();
			} );


			it( "should decorate with TransientDocument", () => {
				const spy:jasmine.Spy = spyOn( TransientDocument, "decorate" )
					.and.callThrough();

				SPARQLDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should decorate with ResolvablePointer", () => {
				const spy:jasmine.Spy = spyOn( ResolvablePointer, "decorate" )
					.and.callThrough();

				SPARQLDocumentTrait.decorate( { $repository, the: "object" } );

				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"SPARQLDocumentTrait",
		"CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentTraitFactory"
	), () => {

		it( "should exists", ():void => {
			expect( SPARQLDocumentTrait ).toBeDefined();
			expect( SPARQLDocumentTrait ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
