import {
	IRIToken,
	LiteralToken
} from "sparqler/tokens";

import { AbstractContext } from "../../AbstractContext";
import { IllegalArgumentError } from "../../Errors";
import {
	clazz,
	constructor,
	hasSignature,
	INSTANCE,
	method,
	module,
} from "../../test/JasmineExtender";
import { XSD } from "../../Vocabularies/XSD";
import { QueryContext } from "./QueryContext";

import * as Module from "./QueryValue";
import { QueryValue } from "./QueryValue";

describe( module( "carbonldp/SPARQL/QueryDocument/QueryValue" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "CarbonLDP.SPARQL.QueryDocument.QueryValue", "Class that represents a property in the query" ), ():void => {

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

			it( hasSignature(
				"Creates a value wrapper for the specified value.",
				[
					{ name: "context", type: "CarbonLDP.SPARQL.QueryDocument.QueryContext", description: "The context of the query where the value is been used." },
					{ name: "value", type: "string | number | boolean | Date", description: "The value to be converted and wrapped fot the ready to use in the query statements." },
				]
			), ():void => {
			} );

			it( "should exists", ():void => {
				const queryValue:QueryValue = new QueryValue( queryContext, "value" );
				expect( queryValue ).toEqual( jasmine.any( QueryValue ) );
			} );

			it( "should create a literal token when string", ():void => {
				const queryValue:QueryValue = new QueryValue( queryContext, "value" );
				expect( queryValue[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
			} );

			it( "should create a literal token when number", ():void => {
				const queryValue:QueryValue = new QueryValue( queryContext, 1 );
				expect( queryValue[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
			} );

			it( "should create a literal token when boolean", ():void => {
				const queryValue:QueryValue = new QueryValue( queryContext, true );
				expect( queryValue[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
			} );

			it( "should create a literal token using withType when Date", ():void => {
				const spy:jasmine.Spy = spyOn( QueryValue.prototype, "withType" ).and.callThrough();

				new QueryValue( queryContext, new Date() );
				expect( spy ).toHaveBeenCalledWith( XSD.dateTime );
			} );

		} );

		describe( method( INSTANCE, "withType" ), ():void => {

			it( hasSignature(
				"Sets an specific type to the query value.\n" +
				"If the value is not string this will be serialized by the `CarbonLDP.SPARQL.QueryDocument.QueryContext.serializeLiteral()` method.",
				[
					{ name: "type", type: "string", description: "The type to be assigned to the literal value." },
				],
				{ type: "this" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryValue.prototype.withType ).toBeDefined();
				expect( QueryValue.prototype.withType ).toEqual( jasmine.any( Function ) );
			} );

			it( "should accept relative XSD type", ():void => {
				const helper:( type:string, value:any ) => void = ( type, value ) => {
					const queryValue:QueryValue = new QueryValue( queryContext, value );
					const spy:jasmine.Spy = spyOn( queryValue[ "_literal" ], "setType" );

					queryValue.withType( type );
					expect( spy ).toHaveBeenCalledWith( new IRIToken( XSD[ type ] ) );
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

				expect( helper( "no-string" ) ).toThrowError( IllegalArgumentError, "Invalid type provided." );
				expect( helper( "invalid" ) ).toThrowError( IllegalArgumentError, "Invalid type provided." );
			} );

			it( "should create a serialize and add the type", ():void => {
				const serializeSpy:jasmine.Spy = spyOn( queryContext, "serializeLiteral" ).and.callThrough();

				const helper:( value:any, type:string ) => void = ( value, type ) => {
					serializeSpy.calls.reset();

					const queryValue:QueryValue = new QueryValue( queryContext, value );
					const valueSpy:jasmine.Spy = spyOn( queryValue[ "_literal" ], "setValue" ).and.callThrough();
					const typeSpy:jasmine.Spy = spyOn( queryValue[ "_literal" ], "setType" ).and.callThrough();

					queryValue.withType( type );

					expect( valueSpy ).toHaveBeenCalled();
					expect( typeSpy ).toHaveBeenCalled();
					expect( serializeSpy ).toHaveBeenCalledWith( type, value );
				};

				helper( new Date(), XSD.dateTime );
				helper( 10.01, XSD.float );
				helper( "a-value", "http://example.com/types#a-type" );
			} );

			it( "should return the object", ():void => {
				const helper:( value:any, type:string ) => void = ( value, type ) => {
					const queryValue:QueryValue = new QueryValue( queryContext, value );
					const returnedValue:QueryValue = queryValue.withType( type );
					expect( queryValue ).toBe( returnedValue );
				};

				helper( new Date(), "dateTime" );
				helper( 10.01, XSD.float );
				helper( "a-value", "http://example.com/types#a-type" );
			} );

		} );

		describe( method( INSTANCE, "withLanguage" ), ():void => {

			it( hasSignature(
				"Sets an specific language to the query value.",
				[
					{ name: "language", type: "string", description: "The language to be assigned to the string literal value." },
				],
				{ type: "this" }
			), ():void => {
			} );

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

		describe( method( INSTANCE, "getToken" ), ():void => {

			it( hasSignature(
				"Returns the SPARQL token of the value.",
				{ type: "SPARQL/tokens/LiteralToken" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryValue.prototype.getToken ).toBeDefined();
				expect( QueryValue.prototype.getToken ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the token created", ():void => {
				const helper:( value:string | number | boolean | Date ) => void = value => {
					const queryValue:QueryValue = new QueryValue( queryContext, value );
					expect( queryValue.getToken() ).toBe( queryValue[ "_literal" ] );
				};

				helper( "a-value" );
				helper( 10.01 );
				helper( true );
				helper( new Date() );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature(
				"Returns the SPARQL string representation of the value to be used in the query.",
				{ type: "string" }
			), ():void => {
			} );

			it( "should override the default toString", ():void => {
				expect( QueryValue.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the string of the literal", ():void => {
				const helper:( value:any, type?:string, lang?:string ) => void = ( value, type, lang ) => {
					const queryValue:QueryValue = new QueryValue( queryContext, value );
					if( type ) queryValue.withType( type );
					if( lang ) queryValue.withLanguage( lang );

					expect( queryValue.toString() ).toBe( queryValue[ "_literal" ].toString() );
				};

				helper( "value" );
				helper( "value", "string" );
				helper( 1 );
				helper( 10.01, XSD.double );
				helper( new Date() );
				helper( "value", null, "en" );
				helper( "value", null, "en-US" );
			} );

		} );

	} );

} );
