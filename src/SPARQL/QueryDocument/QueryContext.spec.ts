import { IRIToken, PrefixedNameToken } from "sparqler/tokens";

import AbstractContext from "../../AbstractContext";
import { DigestedPropertyDefinition } from "../../ObjectSchema";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module } from "../../test/JasmineExtender";
import * as URI from "./../../RDF/URI";
import * as Module from "./QueryContext";
import { Class as QueryContext } from "./QueryContext";
import QueryProperty from "./QueryProperty";
import QueryVariable from "./QueryVariable";

describe( module( "Carbon/SPARQL/QueryDocument/QueryContext" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryContext.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryContext );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryContext.Class", "Class with the shared status and data of the query." ), ():void => {

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

			it( "should call to expandIRI method", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				const spy:jasmine.Spy = spyOn( queryContext, "expandIRI" );

				queryContext.serializeLiteral( "xsd:string", "value" );
				expect( spy ).toHaveBeenCalledWith( "xsd:string" );
			} );

		} );

		describe( method( INSTANCE, "expandIRI" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryContext.prototype.expandIRI ).toBeDefined();
				expect( QueryContext.prototype.expandIRI ).toEqual( jasmine.any( Function ) );
			} );

			it( "should resolve existing prefixes", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
					"schema": "https://schema.org/",
				} );
				const queryContext:QueryContext = new QueryContext( context );
				expect( queryContext.expandIRI( "ex:resource" ) ).toBe( "http://example.com/ns#resource" );
				expect( queryContext.expandIRI( "ex:another_resource" ) ).toBe( "http://example.com/ns#another_resource" );
				expect( queryContext.expandIRI( "schema:resource" ) ).toBe( "https://schema.org/resource" );
			} );

			it( "should resolve relative with vocab", ():void => {
				context.setSetting( "vocabulary", "http://example.com/vocab#" );
				const queryContext:QueryContext = new QueryContext( context );
				expect( queryContext.expandIRI( "resource" ) ).toBe( "http://example.com/vocab#resource" );
				expect( queryContext.expandIRI( "another_resource" ) ).toBe( "http://example.com/vocab#another_resource" );
			} );

			it( "should throw error if no declared prefix", ():void => {
				context.extendObjectSchema( {
					"schema": "https://schema.org/",
				} );
				const queryContext:QueryContext = new QueryContext( context );
				const helper:( iri:string ) => void = ( iri:string ) => () => queryContext.expandIRI( iri );
				expect( helper( "ex:resource" ) ).toThrowError( `Prefix "ex" has not been declared.` );
				expect( helper( "ex:another_resource" ) ).toThrowError( `Prefix "ex" has not been declared.` );
				expect( helper( "schema2:resource" ) ).toThrowError( `Prefix "schema2" has not been declared.` );
			} );

		} );

		describe( method( INSTANCE, "compactIRI" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryContext.prototype.compactIRI ).toBeDefined();
				expect( QueryContext.prototype.compactIRI ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error if no prefix declared when prefixedName", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				const helper:( prefixed:string ) => void = prefixed => () => queryContext.compactIRI( prefixed );

				expect( helper( "ex:resource" ) ).toThrowError( `Prefix "ex" has not been declared.` );
				expect( helper( "schema:resource" ) ).toThrowError( `Prefix "schema" has not been declared.` );
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
				expect( queryContext[ "_prefixesMap" ].get( "ex" ) ).toEqual( jasmine.objectContaining( {
					token: "prefix",
					name: "ex",
					iri: new IRIToken( "http://example.com/ns#" ),
				} ) as any );

				queryContext.compactIRI( "schema:resource" );
				expect( queryContext[ "_prefixesMap" ].size ).toBe( 2 );
				expect( queryContext[ "_prefixesMap" ].get( "schema" ) ).toEqual( jasmine.objectContaining( {
					token: "prefix",
					name: "schema",
					iri: new IRIToken( "https://schema.org/" ),
				} ) as any );
			} );

			it( "should not repeat the stored prefixes", ():void => {
				context.extendObjectSchema( {
					"ex": "http://example.com/ns#",
					"schema": "https://schema.org/",
				} );
				const queryContext:QueryContext = new QueryContext( context );

				queryContext.compactIRI( "ex:resource" );
				expect( queryContext[ "_prefixesMap" ].size ).toBe( 1 );
				expect( queryContext[ "_prefixesMap" ].get( "ex" ) ).toEqual( jasmine.objectContaining( {
					token: "prefix",
					name: "ex",
					iri: new IRIToken( "http://example.com/ns#" ),
				} ) as any );

				queryContext.compactIRI( "ex:another_resource" );
				expect( queryContext[ "_prefixesMap" ].size ).toBe( 1 );
			} );

		} );

		describe( method( INSTANCE, "getGeneralSchema" ), ():void => {

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
