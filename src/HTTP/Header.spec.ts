import { Header } from "./Header";

describe( "Header", () => {

	it( "should exist", () => {
		expect( Header ).toBeDefined();
		expect( Header ).toEqual( jasmine.any( Function ) );
	} );


	describe( "Header.construct", () => {

		it( "should accept empty params", () => {
			const instance:Header = new Header();
			expect( instance ).toEqual( jasmine.any( Header ) );
		} );

		it( "should initialize empty values", () => {
			const instance:Header = new Header();
			expect( instance.values ).toEqual( [] );
		} );


		it( "should accept values string", () => {
			const instance:Header = new Header( "a_value, another_value, last_value" );
			expect( instance ).toEqual( jasmine.any( Header ) );
		} );

		it( "should initialize values from string", () => {
			const instance:Header = new Header( "a_value, another_value, last_value" );
			expect( instance.values ).toEqual( [
				"a_value",
				"another_value",
				"last_value",
			] );
		} );


		it( "should accept values array", () => {
			const instance:Header = new Header( [ "a_value", "another_value" ] );
			expect( instance ).toEqual( jasmine.any( Header ) );
		} );

		it( "should initialize values from array", () => {
			const instance:Header = new Header( [ "a_value", "another_value" ] );
			expect( instance.values ).toEqual( [ "a_value", "another_value" ] );
		} );

	} );

	describe( "Header.hasValue", () => {

		it( "should exist", () => {
			expect( Header.prototype.hasValue ).toBeDefined();
			expect( Header.prototype.hasValue ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return true if has the value", () => {
			const header:Header = new Header( [ "a_value", "another_value", "last_value" ] );

			const returned:boolean = header.hasValue( "another_value" );
			expect( returned ).toBe( true );
		} );

		it( "should return false if has NOT the value", () => {
			const header:Header = new Header( [ "a_value", "another_value", "last_value" ] );

			const returned:boolean = header.hasValue( "no_has_value" );
			expect( returned ).toBe( false );
		} );

	} );

	describe( "Header.toString", () => {

		it( "should exist", () => {
			expect( Header.prototype.toString ).toBeDefined();
			expect( Header.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should return joined values", () => {
			const header:Header = new Header( [ "a_value", "another_value", "last_value" ] );
			expect( header.toString() ).toBe( "a_value, another_value, last_value" );
		} );

		it( "should return same values string", () => {
			const header:Header = new Header( "a_value, another_value, last_value" );
			expect( header.toString() ).toBe( "a_value, another_value, last_value" );
		} );

		it( "should return same empty string", () => {
			const header:Header = new Header( "" );
			expect( header.toString() ).toBe( "" );
		} );

		it( "should return empty string from empty array", () => {
			const header:Header = new Header( [] );
			expect( header.toString() ).toBe( "" );
		} );

	} );


	describe( "Header.parseHeaders", () => {

		it( "should exist", () => {
			expect( Header.parseHeaders ).toBeDefined();
			expect( Header.parseHeaders ).toEqual( jasmine.any( Function ) );
		} );


		it( "should parse multiple string headers", () => {
			const headersString:string = `
				Host: http://example.com
				User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)
				Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
				Cache-Control: no-cache
			`;
			const headersMap:Map<string, Header> = Header.parseHeaders( headersString );

			expect( headersMap ).toEqual( jasmine.any( Map ) );
			expect( headersMap.size ).toBe( 4 );
			expect( headersMap.get( "host" ).toString() ).toEqual( "http://example.com" );
			expect( headersMap.get( "user-agent" ).toString() ).toBe( "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)" );
			expect( headersMap.get( "cache-control" ).toString() ).toBe( "no-cache" );
			expect( headersMap.get( "accept" ) ).toEqual( new Header( "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" ) );
		} );

	} );

} );
