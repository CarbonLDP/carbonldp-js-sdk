import { SPARQLER } from "sparqler";

import { spyOnDecorated } from "../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../Context/DocumentsContext";

import { SPARQLDocumentsRepositoryTrait } from "../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";

import { SPARQLSelectResults } from "./SelectResults";
import { FinishSPARQLAsk, FinishSPARQLSelect, SPARQLBuilder } from "./SPARQLBuilder";


describe( "SPARQLBuilder", () => {

	describe( "SPARQLBuilder.constructor", () => {

		it( "should be instantiable", () => {
			const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { context: new DocumentsContext( "https://example.com/" ) } );
			const entryPoint:string = "https://example.com/";

			const builder:SPARQLBuilder = new SPARQLBuilder( repository, entryPoint );
			expect( builder ).toEqual( jasmine.any( SPARQLBuilder ) );
		} );

		it( "should extend from SPARQLER", () => {
			const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { context: new DocumentsContext( "https://example.com/" ) } );
			const target:SPARQLBuilder = new SPARQLBuilder( repository, "" );
			expect( target ).toEqual( jasmine.any( SPARQLER ) );
		} );


		it( "should extend FinishClause with the FinishSPARQLSelect", () => {
			const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { context: new DocumentsContext( "https://example.com/" ) } );
			const entryPoint:string = "https://example.com/";

			const builder:SPARQLBuilder = new SPARQLBuilder( repository, entryPoint );

			const finishClause:FinishSPARQLSelect = builder
				.selectAll()
				.where( () => [] );

			expect( finishClause ).toEqual( jasmine.objectContaining<FinishSPARQLSelect>( {
				execute: jasmine.any( Function ),
			} ) );
		} );

		it( "should call executeSELECTQuery when execute", async () => {
			const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { context: new DocumentsContext( "https://example.com/" ) } );
			const entryPoint:string = "https://example.com/entry-point/";

			const builder:SPARQLBuilder = new SPARQLBuilder( repository, entryPoint );

			const finishClause:FinishSPARQLSelect = builder
				.selectAll()
				.where( () => [] );

			const spy:jasmine.Spy = spyOnDecorated( repository, "executeSELECTQuery" )
				.and.returnValue( Promise.resolve( null ) );

			const returned:SPARQLSelectResults | null = await finishClause.execute<{}>();

			expect( spy ).toHaveBeenCalledWith( entryPoint, finishClause.toCompactString() );
			expect( returned ).toBeNull();
		} );


		it( "should extend FinishClause with the FinishSPARQLAsk", () => {
			const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { context: new DocumentsContext( "https://example.com/" ) } );
			const entryPoint:string = "https://example.com/";

			const builder:SPARQLBuilder = new SPARQLBuilder( repository, entryPoint );

			const finishClause:FinishSPARQLAsk = builder
				.ask()
				.where( () => [] );

			expect( finishClause ).toEqual( jasmine.objectContaining<FinishSPARQLAsk>( {
				execute: jasmine.any( Function ),
			} ) );
		} );

		it( "should call executeASKQuery when execute", async () => {
			const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { context: new DocumentsContext( "https://example.com/" ) } );
			const entryPoint:string = "https://example.com/entry-point/";

			const builder:SPARQLBuilder = new SPARQLBuilder( repository, entryPoint );

			const finishClause:FinishSPARQLAsk = builder
				.ask()
				.where( () => [] );

			const spy:jasmine.Spy = spyOnDecorated( repository, "executeASKQuery" )
				.and.returnValue( Promise.resolve( true ) );

			const returned:boolean = await finishClause.execute();

			expect( spy ).toHaveBeenCalledWith( entryPoint, finishClause.toCompactString() );
			expect( returned ).toBe( true );
		} );

	} );

} );
