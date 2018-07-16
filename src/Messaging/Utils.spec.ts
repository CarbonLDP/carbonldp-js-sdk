import { IllegalArgumentError } from "../Errors";
import { hasSignature, method, module, STATIC } from "../test/JasmineExtender";
import * as MessagingUtils from "./Utils";

describe( module( "carbonldp/Messaging/Utils" ), ():void => {

	it( "should exists", ():void => {
		expect( MessagingUtils ).toBeDefined();
		expect( MessagingUtils ).toEqual( jasmine.any( Object ) );
	} );

	describe( method(
		STATIC,
		"_validaEventType"
	), ():void => {

		it( hasSignature(
			"Test if the provided string is a valid Messaging event. If don't an error will be thrown.",
			[
				{ name: "event", type: "string", description: "The event to be evaluated." },
			] ), ():void => {
		} );

		it( "should exists", ():void => {
			expect( MessagingUtils._validateEventType ).toBeDefined();
			expect( MessagingUtils._validateEventType ).toEqual( jasmine.any( Function ) );
		} );

		it( "should accept all events `*.*` event", ():void => {
			expect( () => MessagingUtils._validateEventType( "*.*" ) ).not.toThrowError();
		} );

		it( "should accept `child.created` event variations", ():void => {
			expect( () => MessagingUtils._validateEventType( "child.created" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "*.created" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "child.*" ) ).not.toThrowError();
		} );

		it( "should accept `access-point.created` event variations", ():void => {
			expect( () => MessagingUtils._validateEventType( "access-point.created" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "*.created" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "access-point.*" ) ).not.toThrowError();
		} );

		it( "should accept `document.modified` event variations", ():void => {
			expect( () => MessagingUtils._validateEventType( "document.modified" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "*.modified" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "document.*" ) ).not.toThrowError();
		} );

		it( "should accept `document.deleted` event variations", ():void => {
			expect( () => MessagingUtils._validateEventType( "document.deleted" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "*.deleted" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "document.*" ) ).not.toThrowError();
		} );

		it( "should accept `member.added` event variations", ():void => {
			expect( () => MessagingUtils._validateEventType( "member.added" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "*.added" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "member.*" ) ).not.toThrowError();
		} );

		it( "should accept `member.removed` event variations", ():void => {
			expect( () => MessagingUtils._validateEventType( "member.removed" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "*.removed" ) ).not.toThrowError();
			expect( () => MessagingUtils._validateEventType( "member.*" ) ).not.toThrowError();
		} );

		it( "should throw error if invalid event is provided", ():void => {
			expect( () => MessagingUtils._validateEventType( "" ) ).toThrowError( IllegalArgumentError, "Provided event type \"\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "invalid" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "invalid.invalid" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid.invalid\" is invalid." );

			expect( () => MessagingUtils._validateEventType( "access-point" ) ).toThrowError( IllegalArgumentError, "Provided event type \"access-point\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "child" ) ).toThrowError( IllegalArgumentError, "Provided event type \"child\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "created" ) ).toThrowError( IllegalArgumentError, "Provided event type \"created\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "document" ) ).toThrowError( IllegalArgumentError, "Provided event type \"document\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "modified" ) ).toThrowError( IllegalArgumentError, "Provided event type \"modified\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "deleted" ) ).toThrowError( IllegalArgumentError, "Provided event type \"deleted\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "member" ) ).toThrowError( IllegalArgumentError, "Provided event type \"member\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "added" ) ).toThrowError( IllegalArgumentError, "Provided event type \"added\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "removed" ) ).toThrowError( IllegalArgumentError, "Provided event type \"removed\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "*" ) ).toThrowError( IllegalArgumentError, "Provided event type \"*\" is invalid." );

			expect( () => MessagingUtils._validateEventType( "child.modified" ) ).toThrowError( IllegalArgumentError, "Provided event type \"child.modified\" is invalid." );
			expect( () => MessagingUtils._validateEventType( "created.document" ) ).toThrowError( IllegalArgumentError, "Provided event type \"created.document\" is invalid." );
		} );

	} );

	describe( method(
		STATIC,
		"_parseURIPattern"
	), ():void => {

		it( hasSignature(
			"Parse the provided URI pattern that follows a more glob-like syntax to the AMQP path syntax.",
			[
				{ name: "uriPattern", type: "string", description: "The URI pattern to be transformed." },
				{ name: "baseURI", type: "string", description: "The base URI where the URI of the patten belongs to. This is used to obtain the the relative path that AMQP requires." },
			] ), ():void => {
		} );

		it( "should exists", ():void => {
			expect( MessagingUtils._parseURIPattern ).toBeDefined();
			expect( MessagingUtils._parseURIPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "should throw error when uriPattern does not resolves to the baseURI provided", ():void => {
			expect( () => MessagingUtils._parseURIPattern( "http://not-example.com/resource/", "http://example.com" ) ).toThrowError( IllegalArgumentError, "\"http://not-example.com/resource/\" is out of scope." );
			expect( () => MessagingUtils._parseURIPattern( "http://not-example.com/resource/", "http://example.com" ) ).toThrowError( IllegalArgumentError, "\"http://not-example.com/resource/\" is out of scope." );
		} );

		it( "should not throw error when parameters are relative", ():void => {
			expect( () => MessagingUtils._parseURIPattern( "", "http://example.com" ) ).not.toThrowError();
			expect( () => MessagingUtils._parseURIPattern( "http://example.com/resource", "" ) ).not.toThrowError();
		} );

		it( "should return empty string when root uriParameter is provided", ():void => {
			expect( MessagingUtils._parseURIPattern( "/", "" ) ).toBe( "" );
		} );

		it( "should remove '/' character at the end and the beginning of the pattern", ():void => {
			expect( MessagingUtils._parseURIPattern( "/pattern/", "" ) ).toBe( "pattern" );
			expect( MessagingUtils._parseURIPattern( "pattern/", "" ) ).toBe( "pattern" );
			expect( MessagingUtils._parseURIPattern( "/pattern", "" ) ).toBe( "pattern" );
		} );

		it( "should remove the baseURI from the URIPattern", ():void => {
			expect( MessagingUtils._parseURIPattern( "http://example.com/resource/", "http://example.com" ) ).toBe( "resource" );
			expect( MessagingUtils._parseURIPattern( "http://example.com/another-resource/", "http://example.com" ) ).toBe( "another-resource" );
		} );

		it( "should convert URIs to AMQP paths", ():void => {
			expect( MessagingUtils._parseURIPattern( "path-1/path-2/", "" ) ).toBe( "path-1.path-2" );
			expect( MessagingUtils._parseURIPattern( "path-1/path-2/more-path-3/more-path-4/", "" ) ).toBe( "path-1.path-2.more-path-3.more-path-4" );
		} );

		it( "should convert '**' expansion path to AMQP '#'", ():void => {
			expect( MessagingUtils._parseURIPattern( "/**", "" ) ).toBe( "#" );
			expect( MessagingUtils._parseURIPattern( "/path/**", "" ) ).toBe( "path.#" );
		} );

		it( "should replace dots characters ('.') into '^'", ():void => {
			expect( MessagingUtils._parseURIPattern( ".path/", "" ) ).toBe( "^path" );
			expect( MessagingUtils._parseURIPattern( "path-1/.path-2/", "" ) ).toBe( "path-1.^path-2" );
			expect( MessagingUtils._parseURIPattern( ".path.1/path..2./", "" ) ).toBe( "^path^1.path^^2^" );
		} );

		it( "should encode the other special characters", ():void => {
			expect( MessagingUtils._parseURIPattern( "path-;,?:", "" ) ).toBe( "path-%3B%2C%3F%3A" );
			expect( MessagingUtils._parseURIPattern( "path-@&=+$", "" ) ).toBe( "path-%40%26%3D%2B%24" );
			expect( MessagingUtils._parseURIPattern( "path-;,?:/path-@&=+$", "" ) ).toBe( "path-%3B%2C%3F%3A.path-%40%26%3D%2B%24" );
		} );

	} );

	describe( method(
		STATIC,
		"_createDestination"
	), ():void => {

		it( hasSignature(
			"Create a 'topic' destination using the event and the URI pattern provided. This pattern is parsed with the `carbonldp/Messaging/Utils#parseURIPattern` method.\nIf invalid event of URI is given an error will be thrown.",
			[
				{ name: "event", type: "string", description: "The event of the destination messaging notification." },
				{ name: "uriPattern", type: "string", description: "The URI pattern of the destination messaging notification." },
				{ name: "baseURI", type: "string", description: "The base URI where the URI of the pattern belongs to." },
			] ), ():void => {
		} );

		it( "should exists", ():void => {
			expect( MessagingUtils._createDestination ).toBeDefined();
			expect( MessagingUtils._createDestination ).toEqual( jasmine.any( Function ) );
		} );

		it( "should call the validation of event", ():void => {
			expect( () => MessagingUtils._createDestination( "invalid", "path/", "" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid\" is invalid." );
		} );

		it( "should create a AMQP topic destination", ():void => {
			expect( MessagingUtils._createDestination( "*.*", "path/", "" ) ).toBe( "/topic/*.*.path" );
			expect( MessagingUtils._createDestination( "*.*", "path-1/path-2", "" ) ).toBe( "/topic/*.*.path-1.path-2" );

			expect( MessagingUtils._createDestination( "*.*", "/", "" ) ).toBe( "/topic/*.*" );
			expect( MessagingUtils._createDestination( "*.*", "", "" ) ).toBe( "/topic/*.*" );
		} );

	} );

} );
