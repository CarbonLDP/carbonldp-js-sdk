import Carbon from "../Carbon";
import { IllegalArgumentError, IllegalStateError } from "../Errors";
import { hasSignature, method, module, STATIC } from "../test/JasmineExtender";
import * as MessagingUtils from "./Utils";

describe( module( "Carbon/Messaging/Utils" ), ():void => {

	it( "should exists", ():void => {
		expect( MessagingUtils ).toBeDefined();
		expect( MessagingUtils ).toEqual( jasmine.any( Object ) );
	} );

	describe( method(
		STATIC,
		"validateEventContext"
	), ():void => {

		it( hasSignature(
			"Test if the provided context has a valid `Carbon.Messaging.Service.MessagingService` instance. If don't an error will be thrown.",
			[
				{ name: "context", type: "Carbon.Context.Context", description: "The context to be evaluated." },
			] ), ():void => {
		} );

		it( "should exists", ():void => {
			expect( MessagingUtils.validateEventContext ).toBeDefined();
			expect( MessagingUtils.validateEventContext ).toEqual( jasmine.any( Function ) );
		} );

		it( "should throw error when falsy context", ():void => {
			expect( () => MessagingUtils.validateEventContext( void 0 ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );
			expect( () => MessagingUtils.validateEventContext( null ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );
		} );

		it( "should accept Carbon contexts", ():void => {
			const carbon:Carbon = new Carbon( "http://example.com" );
			expect( () => MessagingUtils.validateEventContext( carbon ) ).not.toThrowError();
		} );

		it( "should throw error if messaging service does not exists in the context", ():void => {
			const carbon:Carbon = new Carbon( "http://example.com" );

			delete carbon.messaging;
			expect( () => MessagingUtils.validateEventContext( carbon ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );

			carbon.messaging = null;
			expect( () => MessagingUtils.validateEventContext( carbon ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );

			carbon.messaging = void 0;
			expect( () => MessagingUtils.validateEventContext( carbon ) ).toThrowError( IllegalStateError, "This instance does not support messaging subscriptions." );
		} );

	} );

	describe( method(
		STATIC,
		"validaEventType"
	), ():void => {

		it( hasSignature(
			"Test if the provided string is a valid Messaging event. If don't an error will be thrown.",
			[
				{ name: "event", type: "string", description: "The event to be evaluated." },
			] ), ():void => {
		} );

		it( "should exists", ():void => {
			expect( MessagingUtils.validateEventType ).toBeDefined();
			expect( MessagingUtils.validateEventType ).toEqual( jasmine.any( Function ) );
		} );

		it( "should accept all events `*.*` event", ():void => {
			expect( () => MessagingUtils.validateEventType( "*.*" ) ).not.toThrowError();
		} );

		it( "should accept `child.created` event variations", ():void => {
			expect( () => MessagingUtils.validateEventType( "child.created" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "*.created" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "child.*" ) ).not.toThrowError();
		} );

		it( "should accept `access-point.created` event variations", ():void => {
			expect( () => MessagingUtils.validateEventType( "access-point.created" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "*.created" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "access-point.*" ) ).not.toThrowError();
		} );

		it( "should accept `document.modified` event variations", ():void => {
			expect( () => MessagingUtils.validateEventType( "document.modified" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "*.modified" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "document.*" ) ).not.toThrowError();
		} );

		it( "should accept `document.deleted` event variations", ():void => {
			expect( () => MessagingUtils.validateEventType( "document.deleted" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "*.deleted" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "document.*" ) ).not.toThrowError();
		} );

		it( "should accept `member.added` event variations", ():void => {
			expect( () => MessagingUtils.validateEventType( "member.added" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "*.added" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "member.*" ) ).not.toThrowError();
		} );

		it( "should accept `member.removed` event variations", ():void => {
			expect( () => MessagingUtils.validateEventType( "member.removed" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "*.removed" ) ).not.toThrowError();
			expect( () => MessagingUtils.validateEventType( "member.*" ) ).not.toThrowError();
		} );

		it( "should throw error if invalid event is provided", ():void => {
			expect( () => MessagingUtils.validateEventType( "" ) ).toThrowError( IllegalArgumentError, "Provided event type \"\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "invalid" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "invalid.invalid" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid.invalid\" is invalid." );

			expect( () => MessagingUtils.validateEventType( "access-point" ) ).toThrowError( IllegalArgumentError, "Provided event type \"access-point\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "child" ) ).toThrowError( IllegalArgumentError, "Provided event type \"child\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "created" ) ).toThrowError( IllegalArgumentError, "Provided event type \"created\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "document" ) ).toThrowError( IllegalArgumentError, "Provided event type \"document\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "modified" ) ).toThrowError( IllegalArgumentError, "Provided event type \"modified\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "deleted" ) ).toThrowError( IllegalArgumentError, "Provided event type \"deleted\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "member" ) ).toThrowError( IllegalArgumentError, "Provided event type \"member\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "added" ) ).toThrowError( IllegalArgumentError, "Provided event type \"added\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "removed" ) ).toThrowError( IllegalArgumentError, "Provided event type \"removed\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "*" ) ).toThrowError( IllegalArgumentError, "Provided event type \"*\" is invalid." );

			expect( () => MessagingUtils.validateEventType( "child.modified" ) ).toThrowError( IllegalArgumentError, "Provided event type \"child.modified\" is invalid." );
			expect( () => MessagingUtils.validateEventType( "created.document" ) ).toThrowError( IllegalArgumentError, "Provided event type \"created.document\" is invalid." );
		} );

	} );

	describe( method(
		STATIC,
		"parseURIPattern"
	), ():void => {

		it( hasSignature(
			"Parse the provided URI pattern that follows a more glob-like syntax to the AMQP path syntax.",
			[
				{ name: "uriPattern", type: "string", description: "The URI pattern to be transformed." },
				{ name: "baseURI", type: "string", description: "The base URI where the URI of the patten belongs to. This is used to obtain the the relative path that AMQP requires." },
			] ), ():void => {
		} );

		it( "should exists", ():void => {
			expect( MessagingUtils.parseURIPattern ).toBeDefined();
			expect( MessagingUtils.parseURIPattern ).toEqual( jasmine.any( Function ) );
		} );

		it( "should throw error when uriPattern does not resolves to the baseURI provided", ():void => {
			expect( () => MessagingUtils.parseURIPattern( "http://not-example.com/resource/", "http://example.com" ) ).toThrowError( IllegalArgumentError, "Provided uriPattern \"http://not-example.com/resource/\" is an invalid for your Carbon instance." );
			expect( () => MessagingUtils.parseURIPattern( "http://not-example.com/resource/", "http://example.com" ) ).toThrowError( IllegalArgumentError, "Provided uriPattern \"http://not-example.com/resource/\" is an invalid for your Carbon instance." );
		} );

		it( "should not throw error when parameters are relative", ():void => {
			expect( () => MessagingUtils.parseURIPattern( "", "http://example.com" ) ).not.toThrowError();
			expect( () => MessagingUtils.parseURIPattern( "http://example.com/resource", "" ) ).not.toThrowError();
		} );

		it( "should return empty string when root uriParameter is provided", ():void => {
			expect( MessagingUtils.parseURIPattern( "/", "" ) ).toBe( "" );
		} );

		it( "should remove '/' character at the end and the beginning of the pattern", ():void => {
			expect( MessagingUtils.parseURIPattern( "/pattern/", "" ) ).toBe( "pattern" );
			expect( MessagingUtils.parseURIPattern( "pattern/", "" ) ).toBe( "pattern" );
			expect( MessagingUtils.parseURIPattern( "/pattern", "" ) ).toBe( "pattern" );
		} );

		it( "should remove the baseURI from the URIPattern", ():void => {
			expect( MessagingUtils.parseURIPattern( "http://example.com/resource/", "http://example.com" ) ).toBe( "resource" );
			expect( MessagingUtils.parseURIPattern( "http://example.com/another-resource/", "http://example.com" ) ).toBe( "another-resource" );
		} );

		it( "should convert URIs to AMQP paths", ():void => {
			expect( MessagingUtils.parseURIPattern( "path-1/path-2/", "" ) ).toBe( "path-1.path-2" );
			expect( MessagingUtils.parseURIPattern( "path-1/path-2/more-path-3/more-path-4/", "" ) ).toBe( "path-1.path-2.more-path-3.more-path-4" );
		} );

		it( "should convert '**' expansion path to AMQP '#'", ():void => {
			expect( MessagingUtils.parseURIPattern( "/**", "" ) ).toBe( "#" );
			expect( MessagingUtils.parseURIPattern( "/path/**", "" ) ).toBe( "path.#" );
		} );

		it( "should replace dots characters ('.') into '^'", ():void => {
			expect( MessagingUtils.parseURIPattern( ".path/", "" ) ).toBe( "^path" );
			expect( MessagingUtils.parseURIPattern( "path-1/.path-2/", "" ) ).toBe( "path-1.^path-2" );
			expect( MessagingUtils.parseURIPattern( ".path.1/path..2./", "" ) ).toBe( "^path^1.path^^2^" );
		} );

		it( "should encode the other special characters", ():void => {
			expect( MessagingUtils.parseURIPattern( "path-;,?:", "" ) ).toBe( "path-%3B%2C%3F%3A" );
			expect( MessagingUtils.parseURIPattern( "path-@&=+$", "" ) ).toBe( "path-%40%26%3D%2B%24" );
			expect( MessagingUtils.parseURIPattern( "path-;,?:/path-@&=+$", "" ) ).toBe( "path-%3B%2C%3F%3A.path-%40%26%3D%2B%24" );
		} );

	} );

	describe( method(
		STATIC,
		"createDestination"
	), ():void => {

		it( hasSignature(
			"Create a 'topic' destination using the event and the URI pattern provided. This pattern is parsed with the `Carbon/Messaging/Utils#parseURIPattern` method.\nIf invalid event of URI is given an error will be thrown.",
			[
				{ name: "event", type: "string", description: "The event of the destination messaging notification." },
				{ name: "uriPattern", type: "string", description: "The URI pattern of the destination messaging notification." },
				{ name: "baseURI", type: "string", description: "The base URI where the URI of the pattern belongs to." },
			] ), ():void => {
		} );

		it( "should exists", ():void => {
			expect( MessagingUtils.createDestination ).toBeDefined();
			expect( MessagingUtils.createDestination ).toEqual( jasmine.any( Function ) );
		} );

		it( "should call the validation of event", ():void => {
			expect( () => MessagingUtils.createDestination( "invalid", "path/", "" ) ).toThrowError( IllegalArgumentError, "Provided event type \"invalid\" is invalid." );
		} );

		it( "should create a AMQP topic destination", ():void => {
			expect( MessagingUtils.createDestination( "*.*", "path/", "" ) ).toBe( "/topic/*.*.path" );
			expect( MessagingUtils.createDestination( "*.*", "path-1/path-2", "" ) ).toBe( "/topic/*.*.path-1.path-2" );

			expect( MessagingUtils.createDestination( "*.*", "/", "" ) ).toBe( "/topic/*.*" );
			expect( MessagingUtils.createDestination( "*.*", "", "" ) ).toBe( "/topic/*.*" );
		} );

	} );

} );
