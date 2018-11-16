import { AbstractError } from "./AbstractError";
import { IllegalActionError } from "./IllegalActionError";


describe( "IllegalActionError", () => {

	it( "should exists", () => {
		expect( IllegalActionError ).toBeDefined();
		expect( IllegalActionError ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const error:IllegalActionError = new IllegalActionError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( IllegalActionError ) );
	} );

	it( "should extends from AbstractError", () => {
		const error:IllegalActionError = new IllegalActionError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( AbstractError ) );
	} );

	it( "should have IllegalActionError as name", () => {
		const error:IllegalActionError = new IllegalActionError( "This is the message" );
		expect( error.name ).toEqual( "IllegalActionError" );
	} );

} );
