import { FluentPathContainer } from "sparqler/patterns";
import { IRIRefToken, PrefixedNameToken } from "sparqler/tokens";

import { spyOnDecorated } from "../../test/helpers/jasmine/spies";
import { createMockContext } from "../../test/helpers/mocks/core";
import { MockQueryContainer } from "../../test/helpers/mocks/querying/MockQueryContainer";

import { AbstractContext } from "../Context/AbstractContext";

import { DigestedObjectSchemaProperty } from "../ObjectSchema/DigestedObjectSchemaProperty";

import { clazz, constructor, extendsClass, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import { QueryContainer } from "./QueryContainer";
import { QueryProperty2 } from "./QueryProperty2";
import { QueryVariable } from "./QueryVariable";


describe( module( "carbonldp/QueryDocuments/QueryContainer" ), ():void => {

	describe( clazz(
		"CarbonLDP.QueryDocuments.QueryContainer",
		"Container for prefix iri."
	), ():void => {

		let context:AbstractContext<any, any, any>;
		beforeEach( () => {
			context = createMockContext();
		} );


		it( "should exists", ():void => {
			expect( QueryContainer ).toBeDefined();
			expect( QueryContainer ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				"Class that helps the builders of a query document with the shared data.",
				[
					{ name: "schema", type: "CarbonLDP.DigestedObjectSchema" },
				]
			), ():void => {} );

			it( "should be instantiable", ():void => {
				const queryContainer:QueryContainer = new MockQueryContainer( context );

				expect( queryContainer ).toBeDefined();
				expect( queryContainer ).toEqual( jasmine.any( QueryContainer ) );
			} );

		} );

		it( extendsClass( "sparqler/patterns/FluentPathContainer" ), () => {
			const queryContainer:QueryContainer = new MockQueryContainer( context );

			expect( queryContainer ).toEqual( jasmine.any( FluentPathContainer ) );
		} );


		describe( method( INSTANCE, "getVariable" ), ():void => {

			it( hasSignature(
				"Returns a variable object with the name specified.\n" +
				"If a variable with the same name has already been created this will be returned.",
				[
					{ name: "name", type: "string" },
				],
				{ type: "CarbonLDP.QueryDocuments.QueryVariable" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContainer.prototype.getVariable ).toBeDefined();
				expect( QueryContainer.prototype.getVariable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a QueryVariable", ():void => {
				const queryContainer:QueryContainer = new MockQueryContainer( context );

				const variable:QueryVariable = queryContainer.getVariable( "name" );
				expect( variable ).toEqual( jasmine.any( QueryVariable ) );
			} );

			it( "should return variable with the existing name", ():void => {
				const queryContainer:QueryContainer = new MockQueryContainer( context );

				function helper( name:string ):void {
					const variable:QueryVariable = queryContainer.getVariable( name );
					expect( variable ).toBe( queryContainer.getVariable( name ) );
				}

				helper( "name" );
				helper( "another" );
			} );


			it( "should init with zero index", ():void => {
				const queryContainer:QueryContainer = new MockQueryContainer( context );

				const variable:QueryVariable = queryContainer.getVariable( "name" );
				expect( variable.index ).toBe( 0 );
			} );

			it( "should increase index", ():void => {
				const queryContainer:QueryContainer = new MockQueryContainer( context );

				expect( queryContainer.getVariable( "name0" ).index ).toBe( 0 );
				expect( queryContainer.getVariable( "name1" ).index ).toBe( 1 );
				expect( queryContainer.getVariable( "name2" ).index ).toBe( 2 );
			} );

		} );


		describe( method( INSTANCE, "compactIRI" ), ():void => {

			it( hasSignature(
				"Returns a IRI token of the string provided," +
				"but if the IRI can be converted in a prefixed name the corresponding token will be returned.",
				[
					{ name: "iri", type: "string", description: "The iri to be compacted and tokenized" },
				],
				{ type: "sparqler/tokens/IRIToken" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContainer.prototype.compactIRI ).toBeDefined();
				expect( QueryContainer.prototype.compactIRI ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if no prefix declared when prefixedName", ():void => {
				const queryContainer:QueryContainer = new MockQueryContainer( context );
				const helper:( prefixed:string ) => void = prefixed => () => queryContainer.compactIRI( prefixed );

				expect( helper( "ex:resource" ) ).toThrowError( `The prefix "ex" has not been declared.` );
				expect( helper( "schema:resource" ) ).toThrowError( `The prefix "schema" has not been declared.` );
			} );

			it( "should return IRI when absolute and no prefix match", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
				} );
				const queryContainer:QueryContainer = new MockQueryContainer( context );

				const iri:IRIRefToken = <IRIRefToken> queryContainer.compactIRI( "https://schema.org/resource" );
				expect( iri ).toEqual( jasmine.any( IRIRefToken ) );
				expect( iri ).toEqual( jasmine.objectContaining( {
					value: "https://schema.org/resource",
				} ) );
			} );

			it( "should return PrefixedName when absolute and prefix match", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
					"schema": "https://schema.org/",
				} );
				const queryContainer:QueryContainer = new MockQueryContainer( context );

				const prefixedName1:PrefixedNameToken = <PrefixedNameToken> queryContainer.compactIRI( "http://example.com/ns#resource" );
				expect( prefixedName1 ).toEqual( jasmine.any( PrefixedNameToken ) );
				expect( prefixedName1 ).toEqual( jasmine.objectContaining( {
					namespace: "ex",
					localName: "resource",
				} ) );

				const prefixedName2:PrefixedNameToken = <PrefixedNameToken> queryContainer.compactIRI( "https://schema.org/resource" );
				expect( prefixedName2 ).toEqual( jasmine.any( PrefixedNameToken ) );
				expect( prefixedName2 ).toEqual( jasmine.objectContaining( {
					namespace: "schema",
					localName: "resource",
				} ) );
			} );

			it( "should return PrefixedName when prefixed", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
					"schema": "https://schema.org/",
				} );
				const queryContainer:QueryContainer = new MockQueryContainer( context );

				const prefixedName1:PrefixedNameToken = <PrefixedNameToken> queryContainer.compactIRI( "ex:resource" );
				expect( prefixedName1 ).toEqual( jasmine.any( PrefixedNameToken ) );
				expect( prefixedName1 ).toEqual( jasmine.objectContaining( {
					namespace: "ex",
					localName: "resource",
				} ) );

				const prefixedName2:PrefixedNameToken = <PrefixedNameToken> queryContainer.compactIRI( "schema:resource" );
				expect( prefixedName2 ).toEqual( jasmine.any( PrefixedNameToken ) );
				expect( prefixedName2 ).toEqual( jasmine.objectContaining( {
					namespace: "schema",
					localName: "resource",
				} ) );
			} );

		} );


		// TODO: Test .getPrologues


		// TODO: Test ._getInheritDefinition

	} );

} );
