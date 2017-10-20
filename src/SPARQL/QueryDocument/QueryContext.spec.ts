import AbstractContext from "../../AbstractContext";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module } from "../../test/JasmineExtender";
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

			it( "should initialize properties map", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				expect( queryContext[ "_propertiesMap" ] ).toEqual( new Map() );
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

		describe( method( INSTANCE, "getProperty" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryContext.prototype.getProperty ).toBeDefined();
				expect( QueryContext.prototype.getProperty ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error when the property does not exists", ():void => {
				const queryContext:QueryContext = new QueryContext( context );
				const helper:( name:string ) => void = ( name:string ) => () => queryContext.getProperty( name );

				expect( helper( "name" ) ).toThrowError( `The "name" property was not declared.` );
				expect( helper( "document.property" ) ).toThrowError( `The "document.property" property was not declared.` );
			} );

			it( "should return the stored property", ():void => {
				const queryContext:QueryContext = new QueryContext( context );

				const nameProperty:QueryProperty = new QueryProperty( queryContext, "name" );
				queryContext[ "_propertiesMap" ].set( "name", nameProperty );

				const subDocumentProperty:QueryProperty = new QueryProperty( queryContext, "document.property" );
				queryContext[ "_propertiesMap" ].set( "document.property", subDocumentProperty );

				const helper:( name:string ) => QueryProperty = ( name:string ) => queryContext.getProperty( name );

				expect( helper( "name" ) ).toBe( nameProperty );
				expect( helper( "document.property" ) ).toBe( subDocumentProperty );
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
				const spy:jasmine.Spy = spyOn( queryContext, "expandIRI" ).and.callThrough();

				queryContext.serializeLiteral( "xsd:string", "value" );
				expect( spy ).toHaveBeenCalledWith( "xsd:string" );
			} );

		} );

	} );

} );
