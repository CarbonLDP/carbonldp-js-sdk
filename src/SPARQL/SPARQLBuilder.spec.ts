import SPARQLER from "sparqler";
import { FinishClause } from "sparqler/clauses";

import { spyOnDecorated } from "../../test/helpers/jasmine/spies";

import { DocumentsContext } from "../Context/DocumentsContext";

import { SPARQLDocumentsRepositoryTrait } from "../DocumentsRepository/Traits/SPARQLDocumentsRepositoryTrait";

import {
	clazz,
	constructor,
	extendsClass,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
} from "../test/JasmineExtender";

import * as Builder from "./SPARQLBuilder";
import { FinishSPARQLSelect, SPARQLBuilder } from "./SPARQLBuilder";
import { SPARQLSelectResults } from "./SelectResults";


describe( module( "carbonldp/SPARQL/Builder", "Module that reexports the customized SPARQLER class." ), ():void => {

	it( isDefined(), ():void => {
		expect( Builder ).toBeDefined();
		expect( Builder ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"CarbonLDP.SPARQL.FinishSPARQLSelect",
		"Clause that extends the query builder allowing to execute the request for the built query."
	), () => {

		it( extendsClass( "SPARQL/clauses/FinishClause" ), () => {
			const target:FinishClause = {} as FinishSPARQLSelect;
			expect( target ).toBeDefined();
		} );


		describe( method( OBLIGATORY, "execute" ), () => {

			it( hasSignature(
				[ "T extends object" ],
				{ type: "Promise<CarbonLDP.SPARAL.SPARQLSelectResults>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const target:FinishSPARQLSelect[ "execute" ] = ():any => {};
				expect( target ).toBeDefined();
			} );

		} );

	} );

	describe( clazz(
		"CarbonLDP.SPARQL.SPARQLBuilder",
		"Customized SPARQLER class to be used by the SDK"
	), ():void => {

		describe( constructor(), () => {

			it( hasSignature(
				[
					{ name: "repository", type: "CarbonLDP.DocumentsRepository.Traits.SPARQLDocumentsRepositoryTrait", description: "The repository where the builder is been constructed from." },
					{ name: "entryPoint", type: "string", description: "The entry point URI where the query can be executed from." },
				]
			), ():void => {} );

			it( "should be instantiable", () => {
				const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { $context: new DocumentsContext( "https://example.com/" ) } );
				const entryPoint:string = "https://example.com/";

				const builder:SPARQLBuilder = new SPARQLBuilder( repository, entryPoint );
				expect( builder ).toEqual( jasmine.any( SPARQLBuilder ) );
			} );


			it( "should extend FinishClause with the FinishSPARQLSelect", () => {
				const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { $context: new DocumentsContext( "https://example.com/" ) } );
				const entryPoint:string = "https://example.com/";

				const builder:SPARQLBuilder = new SPARQLBuilder( repository, entryPoint );

				const finishClause:FinishSPARQLSelect = builder
					.selectAll()
					.where( () => [] );

				expect( finishClause ).toEqual( jasmine.objectContaining( {
					execute: jasmine.any( Function ),
				} ) );
			} );

			it( "should call executeSELECTQuery when execute", async () => {
				const repository:SPARQLDocumentsRepositoryTrait = SPARQLDocumentsRepositoryTrait.decorate( { $context: new DocumentsContext( "https://example.com/" ) } );
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

		} );

		it( extendsClass( "SPARQLER/SPARQLER" ), () => {
			const target:SPARQLBuilder = new SPARQLBuilder( null, "" );
			expect( target ).toEqual( jasmine.any( SPARQLER ) );
		} );

	} );

} );