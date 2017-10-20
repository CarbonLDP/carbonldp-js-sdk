import { VariableToken } from "sparqler/tokens";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module } from "../../test/JasmineExtender";
import * as Module from "./QueryVariable";
import { Class as QueryVariable } from "./QueryVariable";

describe( module( "Carbon/SPARQL/QueryDocument/QueryVariable" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryVariable.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryVariable );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryVariable.Class", "Class that represents a property in the query" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryVariable ).toBeDefined();
			expect( QueryVariable ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const queryObject:QueryVariable = new QueryVariable( "name", 1 );
				expect( queryObject ).toEqual( jasmine.any( QueryVariable ) );
			} );

			it( "should extends a VariableToken", ():void => {
				const queryObject:QueryVariable = new QueryVariable( "name", 1 );
				expect( queryObject ).toEqual( jasmine.any( VariableToken ) );
			} );

			it( "should normalize name when prefixedName is provided", ():void => {
				const helper:( name:string, expectedName:string ) => void = ( name, expectedName ) => {
					const queryObject:QueryVariable = new QueryVariable( name, 1 );
					expect( queryObject.name ).toBe( expectedName );
				};

				helper( "ex:name", "ex_name" );
				helper( "prefix:another_name", "prefix_another_name" );
			} );

			it( "should normalize name when sub-property name is provided", ():void => {
				const helper:( name:string, expectedName:string ) => void = ( name, expectedName ) => {
					const queryObject:QueryVariable = new QueryVariable( name, 1 );
					expect( queryObject.name ).toBe( expectedName );
				};

				helper( "object.name", "object__name" );
				helper( "ex:object.name", "ex_object__name" );
				helper( "ex:object.ex:name", "ex_object__ex_name" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( "should override the default toString", ():void => {
				expect( QueryVariable.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the string as a VariableToken", ():void => {
				const helper:( name:string ) => void = name => {
					const queryObject:QueryVariable = new QueryVariable( name, 1 );
					const variableToken:VariableToken = new VariableToken( queryObject.name );
					expect( queryObject.toString() ).toBe( variableToken.toString() );
				};

				helper( "name" );
				helper( "another_name" );
				helper( "ex:property" );
				helper( "object.name" );
				helper( "ex:object.name" );
				helper( "ex:object.ex:name" );
			} );

			/*it( "should return from the index is environment is `prod`", ():void => {
				const helper:( name:string, index:number, result:string ) => void = ( name, index, result ) => {
					const queryObject:QueryVariable = new QueryVariable( name, index );
					expect( queryObject.toString() ).toBe( result );
				};

				helper( "name", 1, "?_1" );
				helper( "another_name", 2, "?_2" );
				helper( "ex:property", 3, "?_3" );
				helper( "object.name", 4, "?_4" );
				helper( "ex:object.name", 5, "?_5" );
				helper( "ex:object.ex:name", 6, "?_6" );
			} );*/

		} );

	} );

} );
