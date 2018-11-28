import { StringParser } from "./StringParser";


describe( "StringParser", () => {

	it( "should exist", () => {
		expect( StringParser ).toBeDefined();
		expect( StringParser ).toEqual( jasmine.any( Function ) );
	} );


	it( "should be instantiable", () => {
		const value:StringParser = new StringParser();
		expect( value ).toEqual( jasmine.any( StringParser ) );
	} );


	describe( "StringParser.parse", () => {

		it( "should exist", () => {
			expect( StringParser.prototype.parse ).toBeDefined();
			expect( StringParser.prototype.parse ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return same string", async () => {
			const parser:StringParser = new StringParser();

			const returned:string = await parser.parse( "This is the body" );
			expect( returned ).toEqual( "This is the body" );
		} );

	} );

} );
