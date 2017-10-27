import { IRIToken, LiteralToken } from "sparqler/tokens";
import AbstractContext from "../../AbstractContext";
import * as XSD from "../../NS/XSD";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module } from "../../test/JasmineExtender";
import QueryContext from "./QueryContext";
import * as Module from "./QueryValue";
import { Class as QueryValue } from "./QueryValue";

describe( module( "Carbon/SPARQL/QueryDocument/QueryValue" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryValue.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryValue );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryValue.Class", "Class that represents a property in the query" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryValue ).toBeDefined();
			expect( QueryValue ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		let queryContext:QueryContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};
			queryContext = new QueryContext( context );
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const queryObject:QueryValue = new QueryValue( queryContext, "value" );
				expect( queryObject ).toEqual( jasmine.any( QueryValue ) );
			} );

			it( "should create a literal token when string", ():void => {
				const queryObject:QueryValue = new QueryValue( queryContext, "value" );
				expect( queryObject[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
			} );

			it( "should create a literal token when number", ():void => {
				const queryObject:QueryValue = new QueryValue( queryContext, 1 );
				expect( queryObject[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
			} );

			it( "should create a literal token when boolean", ():void => {
				const queryObject:QueryValue = new QueryValue( queryContext, true );
				expect( queryObject[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
			} );

			it( "should create a literal token using withType when Date", ():void => {
				const spy:jasmine.Spy = spyOn( QueryValue.prototype, "withType" ).and.callThrough();

				new QueryValue( queryContext, new Date() );
				expect( spy ).toHaveBeenCalledWith( XSD.DataType.dateTime );
			} );

		} );

		describe( method( INSTANCE, "withType" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryValue.prototype.withType ).toBeDefined();
				expect( QueryValue.prototype.withType ).toEqual( jasmine.any( Function ) );
			} );

			it( "should accept relative XSD type", ():void => {
				const helper:( type:string, value:any ) => void = ( type, value ) => {
					const queryValue:QueryValue = new QueryValue( queryContext, value );
					const spy:jasmine.Spy = spyOn( queryValue[ "_literal" ], "setType" );

					queryValue.withType( type );
					expect( spy ).toHaveBeenCalledWith( new IRIToken( XSD.DataType[ type ] ) );
				};

				helper( "string", "value" );
				helper( "dateTime", new Date() );
				helper( "int", 1 );
				helper( "integer", 10.01 );
			} );

			it( "should throw error if relative non-XSD type", ():void => {
				const helper:( type:string ) => void = type => () => {
					new QueryValue( queryContext, "" ).withType( type );
				};

				expect( helper( "no-string" ) ).toThrowError( "Invalid type provided." );
				expect( helper( "invalid" ) ).toThrowError( "Invalid type provided." );
			} );

			it( "should create a serialize and add the type", ():void => {
				const serializeSpy:jasmine.Spy = spyOn( queryContext, "serializeLiteral" ).and.callThrough();

				const helper:( value:any, type:string ) => void = ( value, type ) => {
					serializeSpy.calls.reset();

					const queryObject:QueryValue = new QueryValue( queryContext, value );
					const valueSpy:jasmine.Spy = spyOn( queryObject[ "_literal" ], "setValue" ).and.callThrough();
					const typeSpy:jasmine.Spy = spyOn( queryObject[ "_literal" ], "setType" ).and.callThrough();

					queryObject.withType( type );

					expect( valueSpy ).toHaveBeenCalled();
					expect( typeSpy ).toHaveBeenCalled();
					expect( serializeSpy ).toHaveBeenCalledWith( type, value );
				};

				helper( new Date(), XSD.DataType.dateTime );
				helper( 10.01, XSD.DataType.float );
				helper( "a-value", "http://example.com/types#a-type" );
			} );

			it( "should return the object", ():void => {
				const helper:( value:any, type:string ) => void = ( value, type ) => {
					const queryValue:QueryValue = new QueryValue( queryContext, value );
					const returnedValue:QueryValue = queryValue.withType( type );
					expect( queryValue ).toBe( returnedValue );
				};

				helper( new Date(), "dateTime" );
				helper( 10.01, XSD.DataType.float );
				helper( "a-value", "http://example.com/types#a-type" );
			} );

		} );

		describe( method( INSTANCE, "withLanguage" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryValue.prototype.withLanguage ).toBeDefined();
				expect( QueryValue.prototype.withLanguage ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the literal setLanguage", ():void => {
				const helper:( language:string ) => void = language => {
					const queryValue:QueryValue = new QueryValue( queryContext, "value" );
					const spy:jasmine.Spy = spyOn( queryValue[ "_literal" ], "setLanguage" ).and.callThrough();

					queryValue.withLanguage( language );
					expect( spy ).toHaveBeenCalledWith( language );
				};

				helper( "en" );
				helper( "en-US" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( "should override the default toString", ():void => {
				expect( QueryValue.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the string of the literal", ():void => {
				const helper:( value:any, type?:string, lang?:string ) => void = ( value, type, lang ) => {
					const queryObject:QueryValue = new QueryValue( queryContext, value );
					if( type ) queryObject.withType( type );
					if( lang ) queryObject.withLanguage( lang );

					expect( queryObject.toString() ).toBe( queryObject[ "_literal" ].toString() );
				};

				helper( "value" );
				helper( "value", "string" );
				helper( 1 );
				helper( 10.01, XSD.DataType.double );
				helper( new Date() );
				helper( "value", null, "en" );
				helper( "value", null, "en-US" );
			} );

		} );

	} );

} );