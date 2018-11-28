import { AbstractError } from "./AbstractError";
import { IllegalArgumentError } from "./IllegalArgumentError";


describe( "IllegalArgumentError", () => {

	it( "should exist", () => {
		expect( IllegalArgumentError ).toBeDefined();
		expect( IllegalArgumentError ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const error:IllegalArgumentError = new IllegalArgumentError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( IllegalArgumentError ) );
	} );

	it( "should extends from AbstractError", () => {
		const error:IllegalArgumentError = new IllegalArgumentError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( AbstractError ) );
	} );

	it( "should have IllegalArgumentError as name", () => {
		const error:IllegalArgumentError = new IllegalArgumentError( "This is the message" );
		expect( error.name ).toEqual( "IllegalArgumentError" );
	} );

} );
