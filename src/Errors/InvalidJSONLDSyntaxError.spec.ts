import { AbstractError } from "./AbstractError";
import { InvalidJSONLDSyntaxError } from "./InvalidJSONLDSyntaxError";


describe( "InvalidJSONLDSyntaxError", () => {

	it( "should exist", () => {
		expect( InvalidJSONLDSyntaxError ).toBeDefined();
		expect( InvalidJSONLDSyntaxError ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const error:InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( InvalidJSONLDSyntaxError ) );
	} );

	it( "should extends from AbstractError", () => {
		const error:InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError( "Message of the error" );
		expect( error ).toEqual( jasmine.any( AbstractError ) );
	} );

	it( "should have InvalidJSONLDSyntaxError as name", () => {
		const error:InvalidJSONLDSyntaxError = new InvalidJSONLDSyntaxError( "This is the message" );
		expect( error.name ).toEqual( "InvalidJSONLDSyntaxError" );
	} );

} );
