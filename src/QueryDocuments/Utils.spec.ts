import { _areDifferentType, _getPathProperty } from "./Utils";


// TODO: Test ._getRootPath

describe( "_getPathProperty", () => {

	it( "should exists", () => {
		expect( _getPathProperty ).toBeDefined();
		expect( _getPathProperty ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return element when empty path", () => {
		const element:{} = { the: "object" };
		const returned:{} = _getPathProperty( element, "" );

		expect( returned ).toBe( element );
	} );

	it( "should return undefined when undefined element", () => {
		const returned:undefined = _getPathProperty( void 0, "path" );
		expect( returned ).toBeUndefined();
	} );


	it( "should return the property specified by one level path", () => {
		const returned:any = _getPathProperty( { path: "value" }, "path" );
		expect( returned ).toBe( "value" );
	} );

	it( "should return undefined when no property by one level path", () => {
		const returned:any = _getPathProperty( {}, "path" );
		expect( returned ).toBeUndefined();
	} );

	it( "should return the property specified by two level path", () => {
		const returned:any = _getPathProperty( { path1: { path2: "value" } }, "path1.path2" );
		expect( returned ).toBe( "value" );
	} );

	it( "should return undefined when no property by two level path", () => {
		const returned:any = _getPathProperty( { path1: {} }, "path1.path2" );
		expect( returned ).toBeUndefined();
	} );

} );

describe( "_areDifferentType", () => {

	it( "should exists", () => {
		expect( _areDifferentType ).toBeDefined();
		expect( _areDifferentType ).toEqual( jasmine.any( Function ) );
	} );


	it( "should return true when number and string", () => {
		expect( _areDifferentType( 1, "" ) ).toBe( true );
		expect( _areDifferentType( "", 2 ) ).toBe( true );
	} );

	it( "should return true when number and boolean", () => {
		expect( _areDifferentType( 1, true ) ).toBe( true );
		expect( _areDifferentType( true, 2.2 ) ).toBe( true );
	} );

	it( "should return true when number and object", () => {
		expect( _areDifferentType( 1, {} ) ).toBe( true );
		expect( _areDifferentType( {}, 2.2 ) ).toBe( true );
	} );

	it( "should return true when string and boolean", () => {
		expect( _areDifferentType( "", true ) ).toBe( true );
		expect( _areDifferentType( false, "" ) ).toBe( true );
	} );

	it( "should return true when string and object", () => {
		expect( _areDifferentType( "", {} ) ).toBe( true );
		expect( _areDifferentType( {}, "" ) ).toBe( true );
	} );

	it( "should return true when boolean and object", () => {
		expect( _areDifferentType( true, {} ) ).toBe( true );
		expect( _areDifferentType( {}, false ) ).toBe( true );
	} );


	it( "should return false when both number", () => {
		expect( _areDifferentType( 1, 2.2 ) ).toBe( false );
	} );

	it( "should return false when both string", () => {
		expect( _areDifferentType( "string1", "string2" ) ).toBe( false );
	} );

	it( "should return false when both boolean", () => {
		expect( _areDifferentType( false, false ) ).toBe( false );
	} );


	it( "should return false when both object", () => {
		expect( _areDifferentType( {}, {} ) ).toBe( false );
	} );

	it( "should return true when object & Date", () => {
		expect( _areDifferentType( {}, new Date() ) ).toBe( true );
		expect( _areDifferentType( new Date(), {} ) ).toBe( true );
	} );

	it( "should return false when both Date", () => {
		expect( _areDifferentType( new Date(), new Date() ) ).toBe( false );
	} );

} );

// TODO: Test ._getBestType
// TODO: Test ._getMatchingDefinition
