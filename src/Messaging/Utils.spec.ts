import { IllegalArgumentError } from "../Errors";

import { _createDestination, _parseURIPattern, _validateEventType } from "./Utils";


describe( "_validaEventType", () => {

	it( "should exists", () => {
		expect( _validateEventType ).toBeDefined();
		expect( _validateEventType ).toEqual( jasmine.any( Function ) );
	} );


	it( "should accept all events `*.*` event", () => {
		expect( () => _validateEventType( "*.*" ) ).not.toThrowError();
	} );

	it( "should accept `child.created` event variations", () => {
		expect( () => _validateEventType( "child.created" ) ).not.toThrowError();
		expect( () => _validateEventType( "*.created" ) ).not.toThrowError();
		expect( () => _validateEventType( "child.*" ) ).not.toThrowError();
	} );

	it( "should accept `access-point.created` event variations", () => {
		expect( () => _validateEventType( "access-point.created" ) ).not.toThrowError();
		expect( () => _validateEventType( "*.created" ) ).not.toThrowError();
		expect( () => _validateEventType( "access-point.*" ) ).not.toThrowError();
	} );

	it( "should accept `document.modified` event variations", () => {
		expect( () => _validateEventType( "document.modified" ) ).not.toThrowError();
		expect( () => _validateEventType( "*.modified" ) ).not.toThrowError();
		expect( () => _validateEventType( "document.*" ) ).not.toThrowError();
	} );

	it( "should accept `document.deleted` event variations", () => {
		expect( () => _validateEventType( "document.deleted" ) ).not.toThrowError();
		expect( () => _validateEventType( "*.deleted" ) ).not.toThrowError();
		expect( () => _validateEventType( "document.*" ) ).not.toThrowError();
	} );

	it( "should accept `member.added` event variations", () => {
		expect( () => _validateEventType( "member.added" ) ).not.toThrowError();
		expect( () => _validateEventType( "*.added" ) ).not.toThrowError();
		expect( () => _validateEventType( "member.*" ) ).not.toThrowError();
	} );

	it( "should accept `member.removed` event variations", () => {
		expect( () => _validateEventType( "member.removed" ) ).not.toThrowError();
		expect( () => _validateEventType( "*.removed" ) ).not.toThrowError();
		expect( () => _validateEventType( "member.*" ) ).not.toThrowError();
	} );

	it( "should throw error if invalid event is provided", () => {
		expect( () => _validateEventType( "" ) ).toThrowError( IllegalArgumentError, "Provided event type \"\" is invalid." );
		expect( () => _validateEventType( "invalid" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid\" is invalid." );
		expect( () => _validateEventType( "invalid.invalid" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid.invalid\" is invalid." );

		expect( () => _validateEventType( "access-point" ) ).toThrowError( IllegalArgumentError, "Provided event type \"access-point\" is invalid." );
		expect( () => _validateEventType( "child" ) ).toThrowError( IllegalArgumentError, "Provided event type \"child\" is invalid." );
		expect( () => _validateEventType( "created" ) ).toThrowError( IllegalArgumentError, "Provided event type \"created\" is invalid." );
		expect( () => _validateEventType( "document" ) ).toThrowError( IllegalArgumentError, "Provided event type \"document\" is invalid." );
		expect( () => _validateEventType( "modified" ) ).toThrowError( IllegalArgumentError, "Provided event type \"modified\" is invalid." );
		expect( () => _validateEventType( "deleted" ) ).toThrowError( IllegalArgumentError, "Provided event type \"deleted\" is invalid." );
		expect( () => _validateEventType( "member" ) ).toThrowError( IllegalArgumentError, "Provided event type \"member\" is invalid." );
		expect( () => _validateEventType( "added" ) ).toThrowError( IllegalArgumentError, "Provided event type \"added\" is invalid." );
		expect( () => _validateEventType( "removed" ) ).toThrowError( IllegalArgumentError, "Provided event type \"removed\" is invalid." );
		expect( () => _validateEventType( "*" ) ).toThrowError( IllegalArgumentError, "Provided event type \"*\" is invalid." );

		expect( () => _validateEventType( "child.modified" ) ).toThrowError( IllegalArgumentError, "Provided event type \"child.modified\" is invalid." );
		expect( () => _validateEventType( "created.document" ) ).toThrowError( IllegalArgumentError, "Provided event type \"created.document\" is invalid." );
	} );

} );

describe( "_parseURIPattern", () => {

	it( "should exists", () => {
		expect( _parseURIPattern ).toBeDefined();
		expect( _parseURIPattern ).toEqual( jasmine.any( Function ) );
	} );


	it( "should throw error when uriPattern does not resolves to the baseURI provided", () => {
		expect( () => _parseURIPattern( "http://not-example.com/resource/", "http://example.com" ) ).toThrowError( IllegalArgumentError, "\"http://not-example.com/resource/\" is out of scope." );
		expect( () => _parseURIPattern( "http://not-example.com/resource/", "http://example.com" ) ).toThrowError( IllegalArgumentError, "\"http://not-example.com/resource/\" is out of scope." );
	} );

	it( "should not throw error when parameters are relative", () => {
		expect( () => _parseURIPattern( "", "http://example.com" ) ).not.toThrowError();
		expect( () => _parseURIPattern( "http://example.com/resource", "" ) ).not.toThrowError();
	} );

	it( "should return empty string when root uriParameter is provided", () => {
		expect( _parseURIPattern( "/", "" ) ).toBe( "" );
	} );

	it( "should remove '/' character at the end and the beginning of the pattern", () => {
		expect( _parseURIPattern( "/pattern/", "" ) ).toBe( "pattern" );
		expect( _parseURIPattern( "pattern/", "" ) ).toBe( "pattern" );
		expect( _parseURIPattern( "/pattern", "" ) ).toBe( "pattern" );
	} );

	it( "should remove the baseURI from the URIPattern", () => {
		expect( _parseURIPattern( "http://example.com/resource/", "http://example.com" ) ).toBe( "resource" );
		expect( _parseURIPattern( "http://example.com/another-resource/", "http://example.com" ) ).toBe( "another-resource" );
	} );

	it( "should convert URIs to AMQP paths", () => {
		expect( _parseURIPattern( "path-1/path-2/", "" ) ).toBe( "path-1.path-2" );
		expect( _parseURIPattern( "path-1/path-2/more-path-3/more-path-4/", "" ) ).toBe( "path-1.path-2.more-path-3.more-path-4" );
	} );

	it( "should convert '**' expansion path to AMQP '#'", () => {
		expect( _parseURIPattern( "/**", "" ) ).toBe( "#" );
		expect( _parseURIPattern( "/path/**", "" ) ).toBe( "path.#" );
	} );

	it( "should replace dots characters ('.') into '^'", () => {
		expect( _parseURIPattern( ".path/", "" ) ).toBe( "^path" );
		expect( _parseURIPattern( "path-1/.path-2/", "" ) ).toBe( "path-1.^path-2" );
		expect( _parseURIPattern( ".path.1/path..2./", "" ) ).toBe( "^path^1.path^^2^" );
	} );

	it( "should encode the other special characters", () => {
		expect( _parseURIPattern( "path-;,?:", "" ) ).toBe( "path-%3B%2C%3F%3A" );
		expect( _parseURIPattern( "path-@&=+$", "" ) ).toBe( "path-%40%26%3D%2B%24" );
		expect( _parseURIPattern( "path-;,?:/path-@&=+$", "" ) ).toBe( "path-%3B%2C%3F%3A.path-%40%26%3D%2B%24" );
	} );

} );

describe( "_createDestination", () => {

	it( "should exists", () => {
		expect( _createDestination ).toBeDefined();
		expect( _createDestination ).toEqual( jasmine.any( Function ) );
	} );


	it( "should call the validation of event", () => {
		expect( () => _createDestination( "invalid", "path/", "" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid\" is invalid." );
	} );

	it( "should create a AMQP topic destination", () => {
		expect( _createDestination( "*.*", "path/", "" ) ).toBe( "/topic/*.*.path" );
		expect( _createDestination( "*.*", "path-1/path-2", "" ) ).toBe( "/topic/*.*.path-1.path-2" );

		expect( _createDestination( "*.*", "/", "" ) ).toBe( "/topic/*.*" );
		expect( _createDestination( "*.*", "", "" ) ).toBe( "/topic/*.*" );
	} );

} );
