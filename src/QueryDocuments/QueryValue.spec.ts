import { IRIRefToken, LanguageToken, LiteralToken, RDFLiteralToken } from "sparqler/tokens";

import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { XSD } from "../Vocabularies/XSD";

import { QueryContainer } from "./QueryContainer";
import { QueryValue } from "./QueryValue";


describe( "QueryValue", () => {

	it( "should exist", () => {
		expect( QueryValue ).toBeDefined();
		expect( QueryValue ).toEqual( jasmine.any( Function ) );
	} );

	let context:AbstractContext<any, any>;
	let queryContainer:QueryContainer;
	beforeEach( () => {
		context = createMockContext();
		queryContainer = new QueryContainer( context, { uri: "root" } );
	} );


	describe( "QueryValue.constructor", () => {

		it( "should exist", () => {
			const queryValue:QueryValue = new QueryValue( queryContainer, "value" );
			expect( queryValue ).toEqual( jasmine.any( QueryValue ) );
		} );


		it( "should create a literal token when string", () => {
			const queryValue:QueryValue = new QueryValue( queryContainer, "value" );
			expect( queryValue[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
		} );

		it( "should create a literal token when number", () => {
			const queryValue:QueryValue = new QueryValue( queryContainer, 1 );
			expect( queryValue[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
		} );

		it( "should create a literal token when boolean", () => {
			const queryValue:QueryValue = new QueryValue( queryContainer, true );
			expect( queryValue[ "_literal" ] ).toEqual( jasmine.any( LiteralToken ) );
		} );

		it( "should create a literal token using withType when Date", () => {
			const spy:jasmine.Spy = spyOn( QueryValue.prototype, "withType" ).and.callThrough();

			new QueryValue( queryContainer, new Date() );
			expect( spy ).toHaveBeenCalledWith( XSD.dateTime );
		} );

	} );


	describe( "QueryValue.withType", () => {

		it( "should exist", () => {
			expect( QueryValue.prototype.withType ).toBeDefined();
			expect( QueryValue.prototype.withType ).toEqual( jasmine.any( Function ) );
		} );


		it( "should accept relative XSD type", () => {
			const helper:( type:string, value:any ) => void = ( type, value ) => {
				const queryValue:QueryValue = new QueryValue( queryContainer, value );

				queryValue.withType( type );
				expect( queryValue[ "_literal" ] ).toEqual( jasmine.objectContaining<RDFLiteralToken>( {
					type: new IRIRefToken( XSD[ type ] ),
				} ) );
			};

			helper( "string", "value" );
			helper( "dateTime", new Date() );
			helper( "int", 1 );
			helper( "integer", 10.01 );
		} );

		it( "should create a serialize and add the type", () => {
			const serializeSpy:jasmine.Spy = spyOn( queryContainer, "serializeLiteral" ).and.callThrough();

			const helper:( value:any, type:string ) => void = ( value, type ) => {
				serializeSpy.calls.reset();

				const queryValue:QueryValue = new QueryValue( queryContainer, value );
				queryValue.withType( type );

				expect( serializeSpy ).toHaveBeenCalledWith( type, value );
				expect( queryValue[ "_literal" ] ).toEqual( jasmine.objectContaining<RDFLiteralToken>( {
					value: serializeSpy.calls.mostRecent().returnValue,
					type: new IRIRefToken( type ),
				} ) );
			};

			helper( new Date(), XSD.dateTime );
			helper( 10.01, XSD.float );
		} );

		it( "should return the object", () => {
			const helper:( value:any, type:string ) => void = ( value, type ) => {
				const queryValue:QueryValue = new QueryValue( queryContainer, value );
				const returnedValue:QueryValue = queryValue.withType( type );
				expect( queryValue ).toBe( returnedValue );
			};

			helper( new Date(), "dateTime" );
			helper( 10.01, XSD.float );
		} );


		it( "should throw error when type without serializer", () => {
			const queryValue:QueryValue = new QueryValue( queryContainer, "value" );

			expect( () => {
				queryValue.withType( "http://example.com/types#a-type" );
			} ).toThrowError( IllegalArgumentError, `Type "http://example.com/types#a-type" hasn't a defined serializer.` );
		} );

	} );

	describe( "QueryValue.withLanguage", () => {

		it( "should exist", () => {
			expect( QueryValue.prototype.withLanguage ).toBeDefined();
			expect( QueryValue.prototype.withLanguage ).toEqual( jasmine.any( Function ) );
		} );


		it( "should call the literal setLanguage", () => {
			const helper:( language:string ) => void = language => {
				const queryValue:QueryValue = new QueryValue( queryContainer, "value" );

				queryValue.withLanguage( language );
				expect( queryValue[ "_literal" ] ).toEqual( jasmine.objectContaining<RDFLiteralToken>( {
					language: new LanguageToken( language ),
				} ) );
			};

			helper( "en" );
			helper( "en-US" );
		} );

	} );

	describe( "QueryValue.getToken", () => {

		it( "should exist", () => {
			expect( QueryValue.prototype.getToken ).toBeDefined();
			expect( QueryValue.prototype.getToken ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return the token created", () => {
			const helper:( value:string | number | boolean | Date ) => void = value => {
				const queryValue:QueryValue = new QueryValue( queryContainer, value );
				expect( queryValue.getToken() ).toBe( queryValue[ "_literal" ] );
			};

			helper( "a-value" );
			helper( 10.01 );
			helper( true );
			helper( new Date() );
		} );

	} );

	describe( "QueryValue.toString", () => {

		it( "should override the default toString", () => {
			expect( QueryValue.prototype.toString ).not.toBe( Object.prototype.toString );
		} );


		it( "should return the string of the literal", () => {
			const helper:( value:any, type?:string, lang?:string ) => void = ( value, type, lang ) => {
				const queryValue:QueryValue = new QueryValue( queryContainer, value );
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
