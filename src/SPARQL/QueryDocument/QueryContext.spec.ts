import {
	IRIToken,
	PrefixedNameToken,
	PrefixToken
} from "sparqler/tokens";

import { AbstractContext } from "../../AbstractContext";
import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";
import {
	clazz,
	constructor,
	hasDefaultExport,
	hasSignature,
	INSTANCE,
	method,
	module
} from "../../test/JasmineExtender";

import * as Module from "./QueryContext";
import DefaultExport, { QueryContext } from "./QueryContext";

import { QueryVariable } from "./QueryVariable";

describe( module( "Carbon/SPARQL/QueryDocument/QueryContext" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryContext.QueryContext" ), ():void => {
		expect( DefaultExport ).toBeDefined();
		expect( DefaultExport ).toBe( QueryContext );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryContext.QueryContext", "Class with the shared status and data of the query." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryContext ).toBeDefined();
			expect( QueryContext ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				"Class that helps the builders of a query document with the shared data.",
				[
					{ name: "context", type: "Carbon.Context.Context", optional: true, description: "The carbon context from where the query belongs to." },
				]
			), ():void => {} );

			it( "should be instantiable", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				expect( queryContext ).toBeDefined();
				expect( queryContext ).toEqual( jasmine.any( QueryContext ) );
			} );

			it( "should initialize variables map", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				expect( queryContext[ "_variablesMap" ] ).toEqual( new Map() );
			} );

			it( "should initialize variables counter", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				expect( queryContext[ "_variablesCounter" ] ).toEqual( 0 );
			} );

		} );

		describe( method( INSTANCE, "getVariable" ), ():void => {

			it( hasSignature(
				"Returns a variable object with the name specified.\n" +
				"If a variable with the same name has already been created this will be returned.",
				[
					{ name: "name", type: "string" },
				],
				{ type: "Carbon.SPARQL.QueryDocument.QueryVariable.QueryVariable" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContext.prototype.getVariable ).toBeDefined();
				expect( QueryContext.prototype.getVariable ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return a QueryVariable", ():void => {
				const queryContext:QueryContext = new QueryContext( context );

				const variable:QueryVariable = queryContext.getVariable( "name" );
				expect( variable ).toEqual( jasmine.any( QueryVariable ) );
			} );

			it( "should return variable with the existing name", ():void => {
				const queryContext:QueryContext = new QueryContext( context );

				function helper( name:string ):void {
					const variable:QueryVariable = queryContext.getVariable( name );
					expect( variable ).toBe( queryContext.getVariable( name ) );
				}

				helper( "name" );
				helper( "another" );
			} );

		} );

		describe( method( INSTANCE, "serializeLiteral" ), ():void => {

			it( hasSignature(
				"Serialize the value with the literalSerializer specified by the type provided if exists.",
				[
					{ name: "type", type: "string", description: "The type to the literalSerializer to use." },
					{ name: "value", type: "any", description: "The value to be serialized" },
				],
				{ type: "string" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContext.prototype.serializeLiteral ).toBeDefined();
				expect( QueryContext.prototype.serializeLiteral ).toEqual( jasmine.any( Function ) );
			} );

			it( "should use the literal serializers of carbon", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				const spy:jasmine.Spy = spyOnProperty( context.documents.jsonldConverter, "literalSerializers", "get" ).and.callThrough();

				queryContext.serializeLiteral( "http://www.w3.org/2001/XMLSchema#string", "value" );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should get the correct literal serializer", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				const spy:jasmine.Spy = spyOn( context.documents.jsonldConverter.literalSerializers, "get" ).and.callThrough();

				queryContext.serializeLiteral( "http://www.w3.org/2001/XMLSchema#string", "value" );
				expect( spy ).toHaveBeenCalledWith( "http://www.w3.org/2001/XMLSchema#string" );
			} );

		} );

		describe( method( INSTANCE, "compactIRI" ), ():void => {

			it( hasSignature(
				"Returns a IRI token of the string provided," +
				"but if the IRI can be converted in a prefixed name the corresponding token will be returned.",
				[
					{ name: "iri", type: "string", description: "The iri to be compacted and tokenized" },
				],
				{ type: "SPARQLER/tokens/IRIToken | SPARQLER/tokens/PrefixedNameToken" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContext.prototype.compactIRI ).toBeDefined();
				expect( QueryContext.prototype.compactIRI ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if no prefix declared when prefixedName", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				const helper:( prefixed:string ) => void = prefixed => () => queryContext.compactIRI( prefixed );

				expect( helper( "ex:resource" ) ).toThrowError( IllegalArgumentError, `Prefix "ex" has not been declared.` );
				expect( helper( "schema:resource" ) ).toThrowError( IllegalArgumentError, `Prefix "schema" has not been declared.` );
			} );

			it( "should return IRI when absolute and no prefix match", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
				} );
				const queryContext:QueryContext = new QueryContext( context );

				const iri1:IRIToken = <IRIToken> queryContext.compactIRI( "https://schema.org/resource" );
				expect( iri1 ).toEqual( jasmine.any( IRIToken ) );
				expect( iri1 ).toEqual( jasmine.objectContaining( {
					value: "https://schema.org/resource",
				} ) );

				const iri2:IRIToken = <IRIToken> queryContext.compactIRI( "http://example.org/ns#resource" );
				expect( iri2 ).toEqual( jasmine.any( IRIToken ) );
				expect( iri2 ).toEqual( jasmine.objectContaining( {
					value: "http://example.org/ns#resource",
				} ) );
			} );

			it( "should return PrefixedName when absolute and prefix match", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
					"schema": "https://schema.org/",
				} );
				const queryContext:QueryContext = new QueryContext( context );

				const prefixedName1:PrefixedNameToken = <PrefixedNameToken> queryContext.compactIRI( "http://example.com/ns#resource" );
				expect( prefixedName1 ).toEqual( jasmine.any( PrefixedNameToken ) );
				expect( prefixedName1 ).toEqual( jasmine.objectContaining( {
					namespace: "ex",
					localName: "resource",
				} ) );

				const prefixedName2:PrefixedNameToken = <PrefixedNameToken> queryContext.compactIRI( "https://schema.org/resource" );
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
				const queryContext:QueryContext = new QueryContext( context );

				const prefixedName1:PrefixedNameToken = <PrefixedNameToken> queryContext.compactIRI( "ex:resource" );
				expect( prefixedName1 ).toEqual( jasmine.any( PrefixedNameToken ) );
				expect( prefixedName1 ).toEqual( jasmine.objectContaining( {
					namespace: "ex",
					localName: "resource",
				} ) );

				const prefixedName2:PrefixedNameToken = <PrefixedNameToken> queryContext.compactIRI( "schema:resource" );
				expect( prefixedName2 ).toEqual( jasmine.any( PrefixedNameToken ) );
				expect( prefixedName2 ).toEqual( jasmine.objectContaining( {
					namespace: "schema",
					localName: "resource",
				} ) );
			} );

			it( "should store used prefixes in the prefixesMap", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
					"schema": "https://schema.org/",
				} );
				const queryContext:QueryContext = new QueryContext( context );

				queryContext.compactIRI( "ex:resource" );
				expect( queryContext[ "_prefixesMap" ].size ).toBe( 1 );
				expect( queryContext[ "_prefixesMap" ].get( "ex" ) ).toEqual( new PrefixToken(
					"ex",
					new IRIToken( "http://example.com/ns#" )
				) );

				queryContext.compactIRI( "schema:resource" );
				expect( queryContext[ "_prefixesMap" ].size ).toBe( 2 );
				expect( queryContext[ "_prefixesMap" ].get( "schema" ) ).toEqual( new PrefixToken(
					"schema",
					new IRIToken( "https://schema.org/" )
				) );
			} );

			it( "should not repeat the stored prefixes", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
					"schema": "https://schema.org/",
				} );
				const queryContext:QueryContext = new QueryContext( context );

				queryContext.compactIRI( "ex:resource" );
				expect( queryContext[ "_prefixesMap" ].size ).toBe( 1 );
				expect( queryContext[ "_prefixesMap" ].get( "ex" ) ).toEqual( new PrefixToken(
					"ex",
					new IRIToken( "http://example.com/ns#" )
				) );

				queryContext.compactIRI( "ex:another_resource" );
				expect( queryContext[ "_prefixesMap" ].size ).toBe( 1 );
			} );

		} );

		describe( method( INSTANCE, "getGeneralSchema" ), ():void => {

			it( hasSignature(
				"Returns the general schema of the carbon context.\n" +
				"If no carbon context provided at the constructor an empty schema will be returned.",
				{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContext.prototype.getGeneralSchema ).toBeDefined();
				expect( QueryContext.prototype.getGeneralSchema ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call to the documents `getGeneralSchema` method", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				const spy:jasmine.Spy = spyOn( context.documents, "getGeneralSchema" ).and.returnValue( null );

				const returnedValue:any = queryContext.getGeneralSchema();
				expect( spy ).toHaveBeenCalled();
				expect( returnedValue ).toBeNull();
			} );

		} );

		describe( method( INSTANCE, "getSchemaFor" ), ():void => {

			it( hasSignature(
				"Returns the schema specified by the object using the carbon context.\n" +
				"If no carbon context provided at the constructor an empty schema will be returned.",
				[
					{ name: "object", type: "object", description: "The object to look for its corresponding schema." },
					{ name: "path", type: "string", description: "An optional path that describes where the resource appears in the query.\nNOTE: Property is ignored but used in the extensions of this class." },
				],
				{ type: "Carbon.ObjectSchema.DigestedObjectSchema" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryContext.prototype.getSchemaFor ).toBeDefined();
				expect( QueryContext.prototype.getSchemaFor ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call to the documents `getSchemaFor` method", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				const spy:jasmine.Spy = spyOn( context.documents, "getSchemaFor" ).and.returnValue( null );

				const object:object = { id: "http://example.com/", types: [ "http://example.com/Type" ] };

				const returnedValue:any = queryContext.getSchemaFor( object );
				expect( spy ).toHaveBeenCalledWith( object );
				expect( returnedValue ).toBeNull();
			} );

		} );

	} );

} );
