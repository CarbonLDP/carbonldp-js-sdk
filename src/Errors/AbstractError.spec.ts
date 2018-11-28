import { AbstractError } from "./AbstractError";


describe( "AbstractError", () => {

	it( "should exist", () => {
		expect( AbstractError ).toBeDefined();
		expect( AbstractError ).toEqual( jasmine.any( Function ) );
	} );

	class DummyError extends AbstractError {}


	it( "should instantiate", () => {
		const error:AbstractError = new DummyError( "This is the message" );
		expect( error ).toEqual( jasmine.any( AbstractError ) );
	} );

	it( "should extend from Error", () => {
		const error:AbstractError = new DummyError( "This is the message" );
		expect( error ).toEqual( jasmine.any( Error ) );
	} );

	it( "should have AbstractError as name", () => {
		const error:AbstractError = new DummyError( "This is the message" );
		expect( error.name ).toEqual( "AbstractError" );
	} );

	it( "should initialize the message", () => {
		const error:AbstractError = new DummyError( "This is the message" );
		expect( error.message ).toEqual( "This is the message" );
	} );

} );
