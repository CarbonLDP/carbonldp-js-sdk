import SPARQLER from "sparqler";
import { FinishClause } from "sparqler/clauses";
import { spyOnDecorated } from "../../test/helpers/jasmine/spies";
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
import * as Builder from "./Builder";
import {
	FinishSPARQLSelect,
	SPARQLBuilder
} from "./Builder";
import { SPARQLRawResults } from "./RawResults";
import { SPARQLSelectResults } from "./SelectResults";
import { SPARQLDocument } from "./SPARQLDocument";

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

		describe( method( OBLIGATORY, "executeRaw" ), () => {

			it( hasSignature(
				{ type: "Promise<CarbonLDP.SPARQL.SPARQLRawResults>" }
			), ():void => {} );

			it( "should exists", ():void => {
				const target:FinishSPARQLSelect[ "executeRaw" ] = ():any => {};
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
					{ name: "resource", type: "CarbonLDP.SPARQL.SPARQLDocument", description: "The resource where the builder is been constructed from." },
					{ name: "entryPoint", type: "string", description: "The entry point URI where the query can be executed from." },
				]
			), ():void => {} );

			it( "should be instantiable", () => {
				const resource:SPARQLDocument = SPARQLDocument.decorate( { id: "https://example.com/" } );
				const entryPoint:string = "https://example.com/";

				const builder:SPARQLBuilder = new SPARQLBuilder( resource, entryPoint );
				expect( builder ).toEqual( jasmine.any( SPARQLBuilder ) );
			} );


			it( "should extend FinishClause with the FinishSPARQLSelect", () => {
				const resource:SPARQLDocument = SPARQLDocument.decorate( { id: "https://example.com/" } );
				const entryPoint:string = "https://example.com/";

				const builder:SPARQLBuilder = new SPARQLBuilder( resource, entryPoint );

				const finishClause:FinishSPARQLSelect = builder
					.selectAll()
					.where( () => [] );

				expect( finishClause ).toEqual( jasmine.objectContaining( {
					execute: jasmine.any( Function ),
					executeRaw: jasmine.any( Function ),
				} ) );
			} );

			it( "should call executeSELECTQuery when execute", async () => {
				const resource:SPARQLDocument = SPARQLDocument.decorate( { id: "https://example.com/" } );
				const entryPoint:string = "https://example.com/entry-point/";

				const builder:SPARQLBuilder = new SPARQLBuilder( resource, entryPoint );

				const finishClause:FinishSPARQLSelect = builder
					.selectAll()
					.where( () => [] );

				const spy:jasmine.Spy = spyOnDecorated( resource, "executeSELECTQuery" )
					.and.returnValue( Promise.resolve( null ) );

				const returned:SPARQLSelectResults | null = await finishClause.execute<{}>();

				expect( spy ).toHaveBeenCalledWith( entryPoint, finishClause.toCompactString() );
				expect( returned ).toBeNull();
			} );

			it( "should call executeRawSELECTQuery when execute", async () => {
				const resource:SPARQLDocument = SPARQLDocument.decorate( { id: "https://example.com/" } );
				const entryPoint:string = "https://example.com/entry-point/";

				const builder:SPARQLBuilder = new SPARQLBuilder( resource, entryPoint );

				const finishClause:FinishSPARQLSelect = builder
					.selectAll()
					.where( () => [] );

				const spy:jasmine.Spy = spyOnDecorated( resource, "executeRawSELECTQuery" )
					.and.returnValue( Promise.resolve( null ) );

				const returned:SPARQLRawResults | null = await finishClause.executeRaw();

				expect( spy ).toHaveBeenCalledWith( entryPoint, finishClause.toCompactString() );
				expect( returned ).toBeNull();
			} );

		} );

		it( extendsClass( "SPARQLER/SPARQLER" ), () => {
			const target:SPARQLBuilder = new SPARQLBuilder( SPARQLDocument.decorate( {} ), "" );
			expect( target ).toEqual( jasmine.any( SPARQLER ) );
		} );

	} );

} );
