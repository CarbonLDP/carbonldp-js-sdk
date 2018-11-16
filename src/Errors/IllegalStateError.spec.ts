import { AbstractError } from "./AbstractError";
import { IllegalStateError } from "./IllegalStateError";


describe( "IllegalStateError", () => {

	it( "should exists", () => {
		expect( IllegalStateError ).toBeDefined();
		expect( IllegalStateError ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const error:IllegalStateError = new IllegalStateError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( IllegalStateError ) );
	} );

	it( "should extends from AbstractError", () => {
		const error:IllegalStateError = new IllegalStateError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( AbstractError ) );
	} );

	it( "should have IllegalStateError as name", () => {
		const error:IllegalStateError = new IllegalStateError( "This is the message" );
		expect( error.name ).toEqual( "IllegalStateError" );
	} );

	it( "should initialize empty message when no provided", () => {
		const error:IllegalStateError = new IllegalStateError();
		expect( error.message ).toBe( "" );
	} );

} );
