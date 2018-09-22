import { hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import * as Utils from "./Utils";


describe( module( "carbonldp/QueryDocuments/Utils" ), ():void => {

	it( "should exists", ():void => {
		expect( Utils ).toBeDefined();
		expect( Utils ).toEqual( jasmine.any( Object ) );
	} );

	// TODO: Test ._getRootPath


	describe( method( INSTANCE, "_getPathProperty" ), () => {

		it( hasSignature(
			"Search and returns the property value indicated by the specified path inside the element provided.",
			[
				{ name: "element", type: "any", description: "The element where to find the desired property." },
				{ name: "path", type: "string", description: "The path in the element to the desired property." },
			],
			{ type: "any" }
		), ():void => {} );

		it( "should exists", ():void => {
			expect( Utils._getPathProperty ).toBeDefined();
			expect( Utils._getPathProperty ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return element when empty path", () => {
			const element:{} = { the: "object" };
			const returned:{} = Utils._getPathProperty( element, "" );

			expect( returned ).toBe( element );
		} );

		it( "should return undefined when undefined element", () => {
			const returned:undefined = Utils._getPathProperty( void 0, "path" );
			expect( returned ).toBeUndefined();
		} );


		it( "should return the property specified by one level path", () => {
			const returned:any = Utils._getPathProperty( { path: "value" }, "path" );
			expect( returned ).toBe( "value" );
		} );

		it( "should return undefined when no property by one level path", () => {
			const returned:any = Utils._getPathProperty( {}, "path" );
			expect( returned ).toBeUndefined();
		} );

		it( "should return the property specified by two level path", () => {
			const returned:any = Utils._getPathProperty( { path1: { path2: "value" } }, "path1.path2" );
			expect( returned ).toBe( "value" );
		} );

		it( "should return undefined when no property by two level path", () => {
			const returned:any = Utils._getPathProperty( { path1: {} }, "path1.path2" );
			expect( returned ).toBeUndefined();
		} );

	} );

	describe( method( INSTANCE, "_areDifferentType" ), () => {

		it( hasSignature(
			"Returns true if the two elements provided can be classified as different type, simulating basic comparision in the SPARQL language",
			[
				{ name: "a", type: "any", description: "The first element to check against." },
				{ name: "b", type: "any", description: "The second element to check against." },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( "should exists", ():void => {
			expect( Utils._areDifferentType ).toBeDefined();
			expect( Utils._areDifferentType ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true when number and string", () => {
			expect( Utils._areDifferentType( 1, "" ) ).toBe( true );
			expect( Utils._areDifferentType( "", 2 ) ).toBe( true );
		} );

		it( "should return true when number and boolean", () => {
			expect( Utils._areDifferentType( 1, true ) ).toBe( true );
			expect( Utils._areDifferentType( true, 2.2 ) ).toBe( true );
		} );

		it( "should return true when number and object", () => {
			expect( Utils._areDifferentType( 1, {} ) ).toBe( true );
			expect( Utils._areDifferentType( {}, 2.2 ) ).toBe( true );
		} );

		it( "should return true when string and boolean", () => {
			expect( Utils._areDifferentType( "", true ) ).toBe( true );
			expect( Utils._areDifferentType( false, "" ) ).toBe( true );
		} );

		it( "should return true when string and object", () => {
			expect( Utils._areDifferentType( "", {} ) ).toBe( true );
			expect( Utils._areDifferentType( {}, "" ) ).toBe( true );
		} );

		it( "should return true when boolean and object", () => {
			expect( Utils._areDifferentType( true, {} ) ).toBe( true );
			expect( Utils._areDifferentType( {}, false ) ).toBe( true );
		} );


		it( "should return false when both number", () => {
			expect( Utils._areDifferentType( 1, 2.2 ) ).toBe( false );
		} );

		it( "should return false when both string", () => {
			expect( Utils._areDifferentType( "string1", "string2" ) ).toBe( false );
		} );

		it( "should return false when both boolean", () => {
			expect( Utils._areDifferentType( false, false ) ).toBe( false );
		} );


		it( "should return false when both object", () => {
			expect( Utils._areDifferentType( {}, {} ) ).toBe( false );
		} );

		it( "should return true when object & Date", () => {
			expect( Utils._areDifferentType( {}, new Date() ) ).toBe( true );
			expect( Utils._areDifferentType( new Date(), {} ) ).toBe( true );
		} );

		it( "should return false when both Date", () => {
			expect( Utils._areDifferentType( new Date(), new Date() ) ).toBe( false );
		} );

	} );


	// TODO: Test ._getBestType
	// TODO: Test ._getMatchingDefinition

} );
