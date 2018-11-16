import { AbstractError } from "./AbstractError";
import { IDAlreadyInUseError } from "./IDAlreadyInUseError";


describe( "IDAlreadyInUseError", () => {

	it( "should exists", () => {
		expect( IDAlreadyInUseError ).toBeDefined();
		expect( IDAlreadyInUseError ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const error:IDAlreadyInUseError = new IDAlreadyInUseError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( IDAlreadyInUseError ) );
	} );

	it( "should extends from AbstractError", () => {
		const error:IDAlreadyInUseError = new IDAlreadyInUseError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( AbstractError ) );
	} );

	it( "should have IDAlreadyInUseError as name", () => {
		const error:IDAlreadyInUseError = new IDAlreadyInUseError( "This is the message" );
		expect( error.name ).toEqual( "IDAlreadyInUseError" );
	} );

} );
