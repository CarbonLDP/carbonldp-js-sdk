import { AbstractError } from "./AbstractError";
import { NotImplementedError } from "./NotImplementedError";


describe( "NotImplementedError", () => {

	it( "should exists", () => {
		expect( NotImplementedError ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const error:NotImplementedError = new NotImplementedError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( NotImplementedError ) );
	} );

	it( "should extends from AbstractError", () => {
		const error:NotImplementedError = new NotImplementedError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( AbstractError ) );
	} );

	it( "should have NotImplementedError as name", () => {
		const error:NotImplementedError = new NotImplementedError( "This is the message" );
		expect( error.name ).toEqual( "NotImplementedError" );
	} );

	it( "should initialize empty message when no provided", () => {
		const error:NotImplementedError = new NotImplementedError();
		expect( error.message ).toBe( "" );
	} );

} );
