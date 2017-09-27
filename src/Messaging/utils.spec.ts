import { createDestination, parseURIPattern, validateEventContext, validateEventType } from "./utils";
import { IllegalStateError, IllegalArgumentError } from "../Errors";
import Carbon from "../Carbon";

describe( "validateEventContext", ():void => {

	it( "should exists", ():void => {
		expect( validateEventContext ).toBeDefined();
		expect( validateEventContext ).toEqual( jasmine.any( Function ) );
	} );

	it( "should throw error when falsy context", ():void => {
		expect( () => validateEventContext( void 0 ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );
		expect( () => validateEventContext( null ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );
	} );

	it( "should accept Carbon contexts", ():void => {
		const carbon:Carbon = new Carbon( "http://example.com" );
		expect( () => validateEventContext( carbon ) ).not.toThrowError();
	} );

	it( "should throw error if messaging service does not exists in the context", ():void => {
		const carbon:Carbon = new Carbon( "http://example.com" );

		delete carbon.messaging;
		expect( () => validateEventContext( carbon ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );

		carbon.messaging = null;
		expect( () => validateEventContext( carbon ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );

		carbon.messaging = void 0;
		expect( () => validateEventContext( carbon ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );
	} );

} );

describe( "validaEventType", ():void => {

	it( "should exists", ():void => {
		expect( validateEventType ).toBeDefined();
		expect( validateEventType ).toEqual( jasmine.any( Function ) );
	} );

	it( "should accept all events `*.*` event", ():void => {
		expect( () => validateEventType( "*.*" ) ).not.toThrowError();
	} );

	it( "should accept `child.created` event variations", ():void => {
		expect( () => validateEventType( "child.created" ) ).not.toThrowError();
		expect( () => validateEventType( "*.created" ) ).not.toThrowError();
		expect( () => validateEventType( "child.*" ) ).not.toThrowError();
	} );

	it( "should accept `access-point.created` event variations", ():void => {
		expect( () => validateEventType( "access-point.created" ) ).not.toThrowError();
		expect( () => validateEventType( "*.created" ) ).not.toThrowError();
		expect( () => validateEventType( "access-point.*" ) ).not.toThrowError();
	} );

	it( "should accept `document.modified` event variations", ():void => {
		expect( () => validateEventType( "document.modified" ) ).not.toThrowError();
		expect( () => validateEventType( "*.modified" ) ).not.toThrowError();
		expect( () => validateEventType( "document.*" ) ).not.toThrowError();
	} );

	it( "should accept `document.deleted` event variations", ():void => {
		expect( () => validateEventType( "document.deleted" ) ).not.toThrowError();
		expect( () => validateEventType( "*.deleted" ) ).not.toThrowError();
		expect( () => validateEventType( "document.*" ) ).not.toThrowError();
	} );

	it( "should accept `member.added` event variations", ():void => {
		expect( () => validateEventType( "member.added" ) ).not.toThrowError();
		expect( () => validateEventType( "*.added" ) ).not.toThrowError();
		expect( () => validateEventType( "member.*" ) ).not.toThrowError();
	} );

	it( "should accept `member.removed` event variations", ():void => {
		expect( () => validateEventType( "member.removed" ) ).not.toThrowError();
		expect( () => validateEventType( "*.removed" ) ).not.toThrowError();
		expect( () => validateEventType( "member.*" ) ).not.toThrowError();
	} );

	it( "should throw error if invalid event is provided", ():void => {
		expect( () => validateEventType( "" ) ).toThrowError( IllegalArgumentError, "Provided event type \"\" is invalid." );
		expect( () => validateEventType( "invalid" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid\" is invalid." );
		expect( () => validateEventType( "invalid.invalid" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid.invalid\" is invalid." );
	} );

} );

describe( "parseURIPattern", ():void => {

	it( "should exists", ():void => {
		expect( parseURIPattern ).toBeDefined();
		expect( parseURIPattern ).toEqual( jasmine.any( Function ) );
	} );

	it( "should throw error when uriPattern does not resolves to the baseURI provided", ():void => {
		expect( () => parseURIPattern( "http://not-example.com/resource/", "http://example.com" ) ).toThrowError( IllegalArgumentError, "Provided uriPattern \"http://not-example.com/resource/\" is an invalid for your Carbon instance." );
		expect( () => parseURIPattern( "http://not-example.com/resource/", "http://example.com" ) ).toThrowError( IllegalArgumentError, "Provided uriPattern \"http://not-example.com/resource/\" is an invalid for your Carbon instance." );
	} );

	it( "should not throw error when parameters are relative", ():void => {
		expect( () => parseURIPattern( "", "http://example.com" ) ).not.toThrowError();
		expect( () => parseURIPattern( "http://example.com/resource", "" ) ).not.toThrowError();
	} );

	it( "should return empty string when root uriParameter is provided", ():void => {
		expect( parseURIPattern( "/", "" ) ).toBe( "" );
	} );

	it( "should remove '/' character at the end and the beginning of the pattern", ():void => {
		expect( parseURIPattern( "/pattern/", "" ) ).toBe( "pattern" );
		expect( parseURIPattern( "pattern/", "" ) ).toBe( "pattern" );
		expect( parseURIPattern( "/pattern", "" ) ).toBe( "pattern" );
	} );

	it( "should remove the baseURI from the URIPattern", ():void => {
		expect( parseURIPattern( "http://example.com/resource/", "http://example.com" ) ).toBe( "resource" );
		expect( parseURIPattern( "http://example.com/another-resource/", "http://example.com" ) ).toBe( "another-resource" );
	} );

	it( "should convert URIs to AMQP paths", ():void => {
		expect( parseURIPattern( "path-1/path-2/", "" ) ).toBe( "path-1.path-2" );
		expect( parseURIPattern( "path-1/path-2/more-path-3/more-path-4/", "" ) ).toBe( "path-1.path-2.more-path-3.more-path-4" );
	} );

	it( "should convert '**' expansion path to AMQP '#'", ():void => {
		expect( parseURIPattern( "/**", "" ) ).toBe( "#" );
		expect( parseURIPattern( "/path/**", "" ) ).toBe( "path.#" );
	} );

	it( "should replace dots characters ('.') into '^'", ():void => {
		expect( parseURIPattern( ".path/", "" ) ).toBe( "^path" );
		expect( parseURIPattern( "path-1/.path-2/", "" ) ).toBe( "path-1.^path-2" );
		expect( parseURIPattern( ".path.1/path..2./", "" ) ).toBe( "^path^1.path^^2^" );
	} );

	it( "should encode the other special characters", ():void => {
		expect( parseURIPattern( "path-;,?:", "" ) ).toBe( "path-%3B%2C%3F%3A" );
		expect( parseURIPattern( "path-@&=+$", "" ) ).toBe( "path-%40%26%3D%2B%24" );
		expect( parseURIPattern( "path-;,?:/path-@&=+$", "" ) ).toBe( "path-%3B%2C%3F%3A.path-%40%26%3D%2B%24" );
	} );

} );

describe( "createDestination", ():void => {

	it( "should exists", ():void => {
		expect( createDestination ).toBeDefined();
		expect( createDestination ).toEqual( jasmine.any( Function ) );
	} );

	it( "should call the validation of event", ():void => {
		expect( () => createDestination( "invalid", "path/", "" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid\" is invalid." );
	} );

	it( "should create a AMQP topic destination", ():void => {
		expect( createDestination( "*.*", "path/", "" ) ).toBe( "/topic/*.*.path" );
		expect( createDestination( "*.*", "path-1/path-2", "" ) ).toBe( "/topic/*.*.path-1.path-2" );

		expect( createDestination( "*.*", "/", "" ) ).toBe( "/topic/*.*" );
		expect( createDestination( "*.*", "", "" ) ).toBe( "/topic/*.*" );
	} );

} );
