import { VariableToken } from "sparqler/tokens";
import AbstractContext from "../../AbstractContext";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module } from "../../test/JasmineExtender";
import QueryContext from "./QueryContext";
import * as Module from "./QueryProperty";
import { Class as QueryProperty } from "./QueryProperty";

describe( module( "Carbon/SPARQL/QueryDocument/QueryProperty" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryProperty.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryProperty );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryProperty.Class", "Class that represents a property in the query" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryProperty ).toBeDefined();
			expect( QueryProperty ).toEqual( jasmine.any( Function ) );
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
				const queryObject:QueryProperty = new QueryProperty( queryContext, "name", null );
				expect( queryObject ).toEqual( jasmine.any( QueryProperty ) );
			} );

			it( "should create an variable token", ():void => {
				const queryObject:QueryProperty = new QueryProperty( queryContext, "name", null );
				expect( queryObject[ "variable" ] ).toEqual( jasmine.any( VariableToken ) );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( "should override the default toString", ():void => {
				expect( QueryProperty.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the string of the variable", ():void => {
				const helper:( name:string ) => void = name => {
					const queryObject:QueryProperty = new QueryProperty( queryContext, name, null );
					expect( queryObject.toString() ).toBe( queryObject[ "variable" ].toString() );
				};

				helper( "name" );
				helper( "another_name" );
				helper( "ex:property" );
				helper( "property.subProperty" );
				helper( "ex:property.ex:subProperty" );
			} );

		} );

	} );

} );
