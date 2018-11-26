import { VariableToken } from "sparqler/tokens";

import { QueryVariable } from "./QueryVariable";


describe( "QueryVariable", ():void => {

	it( "should exists", ():void => {
		expect( QueryVariable ).toBeDefined();
		expect( QueryVariable ).toEqual( jasmine.any( Function ) );
	} );


	describe( "QueryVariable.constructor", ():void => {

		it( "should be instantiable", ():void => {
			const queryVariable:QueryVariable = new QueryVariable( "name", 1 );
			expect( queryVariable ).toEqual( jasmine.any( QueryVariable ) );
		} );


		it( "should extends from VariableToken", ():void => {
			const queryVariable:QueryVariable = new QueryVariable( "name", 1 );
			expect( queryVariable ).toEqual( jasmine.any( VariableToken ) );
		} );

		it( "should normalize name when prefixedName is provided", ():void => {
			const helper:( name:string, expectedName:string ) => void = ( name, expectedName ) => {
				const queryVariable:QueryVariable = new QueryVariable( name, 1 );
				expect( queryVariable.name ).toBe( expectedName );
			};

			helper( "ex:name", "ex_name" );
			helper( "prefix:another_name", "prefix_another_name" );
		} );

		it( "should normalize name when sub-property name is provided", ():void => {
			const helper:( name:string, expectedName:string ) => void = ( name, expectedName ) => {
				const queryVariable:QueryVariable = new QueryVariable( name, 1 );
				expect( queryVariable.name ).toBe( expectedName );
			};

			helper( "object.name", "object__name" );
			helper( "ex:object.name", "ex_object__name" );
			helper( "ex:object.ex:name", "ex_object__ex_name" );
		} );

	} );


	describe( "QueryVariable.toString", ():void => {

		it( "should override the default toString", ():void => {
			expect( QueryVariable.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the string as a VariableToken", ():void => {
			const helper:( name:string ) => void = name => {
				const queryVariable:QueryVariable = new QueryVariable( name, 1 );
				const variableToken:VariableToken = new VariableToken( queryVariable.name );
				expect( queryVariable.toString() ).toBe( variableToken.toString() );
			};

			helper( "name" );
			helper( "another_name" );
			helper( "ex:property" );
			helper( "object.name" );
			helper( "ex:object.name" );
			helper( "ex:object.ex:name" );
		} );

	} );

} );
