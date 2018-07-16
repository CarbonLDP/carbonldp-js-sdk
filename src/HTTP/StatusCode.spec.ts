import { enumeration, hasEnumeral, isDefined, module } from "../test/JasmineExtender";

import * as Utils from "./../Utils";

import * as StatusCodeModule from "./StatusCode";


describe( module(
	"carbonldp/HTTP/StatusCode"
), ():void => {

	it( isDefined(), ():void => {
		expect( StatusCodeModule.StatusCode ).toBeDefined();
		expect( StatusCodeModule.StatusCode ).toEqual( jasmine.any( Object ) );
	} );

	describe( enumeration(
		"CarbonLDP.HTTP.StatusCode",
		"Enum with the HTTP/1.1 status codes."
	), ():void => {

		it( isDefined(), ():void => {
			expect( StatusCodeModule.StatusCode ).toBeDefined();
			expect( Utils.isObject( StatusCodeModule.StatusCode ) ).toBe( true );
			expect( Object.keys( StatusCodeModule.StatusCode ).length ).toBe( 40 * 2 );
		} );

		it( hasEnumeral(
			"CONTINUE",
			"Enum that identifies the HTTP/1.1 100 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.CONTINUE ).toBeDefined();
			expect( StatusCodeModule.StatusCode.CONTINUE ).toBe( 100 );
			expect( StatusCodeModule.StatusCode[ 100 ] ).toBe( "CONTINUE" );
		} );

		it( hasEnumeral(
			"SWITCHING_PROTOCOLS",
			"Enum that identifies the HTTP/1.1 101 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.SWITCHING_PROTOCOLS ).toBeDefined();
			expect( StatusCodeModule.StatusCode.SWITCHING_PROTOCOLS ).toBe( 101 );
			expect( StatusCodeModule.StatusCode[ 101 ] ).toBe( "SWITCHING_PROTOCOLS" );
		} );


		it( hasEnumeral(
			"OK",
			"Enum that identifies the HTTP/1.1 200 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.OK ).toBeDefined();
			expect( StatusCodeModule.StatusCode.OK ).toBe( 200 );
			expect( StatusCodeModule.StatusCode[ 200 ] ).toBe( "OK" );
		} );
		it( hasEnumeral(
			"CREATED",
			"Enum that identifies the HTTP/1.1 201 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.CREATED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.CREATED ).toBe( 201 );
			expect( StatusCodeModule.StatusCode[ 201 ] ).toBe( "CREATED" );
		} );
		it( hasEnumeral(
			"ACCEPTED",
			"Enum that identifies the HTTP/1.1 202 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.ACCEPTED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.ACCEPTED ).toBe( 202 );
			expect( StatusCodeModule.StatusCode[ 202 ] ).toBe( "ACCEPTED" );
		} );
		it( hasEnumeral(
			"NON_AUTHORITATIVE_INFORMATION",
			"Enum that identifies the HTTP/1.1 203 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.NON_AUTHORITATIVE_INFORMATION ).toBeDefined();
			expect( StatusCodeModule.StatusCode.NON_AUTHORITATIVE_INFORMATION ).toBe( 203 );
			expect( StatusCodeModule.StatusCode[ 203 ] ).toBe( "NON_AUTHORITATIVE_INFORMATION" );
		} );
		it( hasEnumeral(
			"NO_CONTENT",
			"Enum that identifies the HTTP/1.1 204 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.NO_CONTENT ).toBeDefined();
			expect( StatusCodeModule.StatusCode.NO_CONTENT ).toBe( 204 );
			expect( StatusCodeModule.StatusCode[ 204 ] ).toBe( "NO_CONTENT" );
		} );
		it( hasEnumeral(
			"RESET_CONTENT",
			"Enum that identifies the HTTP/1.1 205 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.RESET_CONTENT ).toBeDefined();
			expect( StatusCodeModule.StatusCode.RESET_CONTENT ).toBe( 205 );
			expect( StatusCodeModule.StatusCode[ 205 ] ).toBe( "RESET_CONTENT" );
		} );
		it( hasEnumeral(
			"PARTIAL_CONTENT",
			"Enum that identifies the HTTP/1.1 206 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.PARTIAL_CONTENT ).toBeDefined();
			expect( StatusCodeModule.StatusCode.PARTIAL_CONTENT ).toBe( 206 );
			expect( StatusCodeModule.StatusCode[ 206 ] ).toBe( "PARTIAL_CONTENT" );
		} );
		it( hasEnumeral(
			"MULTIPLE_CHOICES",
			"Enum that identifies the HTTP/1.1 300 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.MULTIPLE_CHOICES ).toBeDefined();
			expect( StatusCodeModule.StatusCode.MULTIPLE_CHOICES ).toBe( 300 );
			expect( StatusCodeModule.StatusCode[ 300 ] ).toBe( "MULTIPLE_CHOICES" );
		} );
		it( hasEnumeral(
			"MOVED_PERMANENTLY",
			"Enum that identifies the HTTP/1.1 301 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.MOVED_PERMANENTLY ).toBeDefined();
			expect( StatusCodeModule.StatusCode.MOVED_PERMANENTLY ).toBe( 301 );
			expect( StatusCodeModule.StatusCode[ 301 ] ).toBe( "MOVED_PERMANENTLY" );
		} );
		it( hasEnumeral(
			"FOUND",
			"Enum that identifies the HTTP/1.1 302 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.FOUND ).toBeDefined();
			expect( StatusCodeModule.StatusCode.FOUND ).toBe( 302 );
			expect( StatusCodeModule.StatusCode[ 302 ] ).toBe( "FOUND" );
		} );
		it( hasEnumeral(
			"SEE_OTHER",
			"Enum that identifies the HTTP/1.1 303 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.SEE_OTHER ).toBeDefined();
			expect( StatusCodeModule.StatusCode.SEE_OTHER ).toBe( 303 );
			expect( StatusCodeModule.StatusCode[ 303 ] ).toBe( "SEE_OTHER" );
		} );
		it( hasEnumeral(
			"NOT_MODIFIED",
			"Enum that identifies the HTTP/1.1 304 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.NOT_MODIFIED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.NOT_MODIFIED ).toBe( 304 );
			expect( StatusCodeModule.StatusCode[ 304 ] ).toBe( "NOT_MODIFIED" );
		} );
		it( hasEnumeral(
			"USE_PROXY",
			"Enum that identifies the HTTP/1.1 305 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.USE_PROXY ).toBeDefined();
			expect( StatusCodeModule.StatusCode.USE_PROXY ).toBe( 305 );
			expect( StatusCodeModule.StatusCode[ 305 ] ).toBe( "USE_PROXY" );
		} );
		it( hasEnumeral(
			"TEMPORARY_REDIRECT",
			"Enum that identifies the HTTP/1.1 307 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.TEMPORARY_REDIRECT ).toBeDefined();
			expect( StatusCodeModule.StatusCode.TEMPORARY_REDIRECT ).toBe( 307 );
			expect( StatusCodeModule.StatusCode[ 307 ] ).toBe( "TEMPORARY_REDIRECT" );
		} );
		it( hasEnumeral(
			"BAD_REQUEST",
			"Enum that identifies the HTTP/1.1 400 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.BAD_REQUEST ).toBeDefined();
			expect( StatusCodeModule.StatusCode.BAD_REQUEST ).toBe( 400 );
			expect( StatusCodeModule.StatusCode[ 400 ] ).toBe( "BAD_REQUEST" );
		} );
		it( hasEnumeral(
			"UNAUTHORIZED",
			"Enum that identifies the HTTP/1.1 401 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.UNAUTHORIZED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.UNAUTHORIZED ).toBe( 401 );
			expect( StatusCodeModule.StatusCode[ 401 ] ).toBe( "UNAUTHORIZED" );
		} );
		it( hasEnumeral(
			"PAYMENT_REQUIRED",
			"Enum that identifies the HTTP/1.1 402 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.PAYMENT_REQUIRED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.PAYMENT_REQUIRED ).toBe( 402 );
			expect( StatusCodeModule.StatusCode[ 402 ] ).toBe( "PAYMENT_REQUIRED" );
		} );
		it( hasEnumeral(
			"FORBIDDEN",
			"Enum that identifies the HTTP/1.1 403 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.FORBIDDEN ).toBeDefined();
			expect( StatusCodeModule.StatusCode.FORBIDDEN ).toBe( 403 );
			expect( StatusCodeModule.StatusCode[ 403 ] ).toBe( "FORBIDDEN" );
		} );
		it( hasEnumeral(
			"NOT_FOUND",
			"Enum that identifies the HTTP/1.1 404 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.NOT_FOUND ).toBeDefined();
			expect( StatusCodeModule.StatusCode.NOT_FOUND ).toBe( 404 );
			expect( StatusCodeModule.StatusCode[ 404 ] ).toBe( "NOT_FOUND" );
		} );
		it( hasEnumeral(
			"METHOD_NOT_ALLOWED",
			"Enum that identifies the HTTP/1.1 405 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.METHOD_NOT_ALLOWED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.METHOD_NOT_ALLOWED ).toBe( 405 );
			expect( StatusCodeModule.StatusCode[ 405 ] ).toBe( "METHOD_NOT_ALLOWED" );
		} );
		it( hasEnumeral(
			"NOT_ACCEPTABLE",
			"Enum that identifies the HTTP/1.1 406 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.NOT_ACCEPTABLE ).toBeDefined();
			expect( StatusCodeModule.StatusCode.NOT_ACCEPTABLE ).toBe( 406 );
			expect( StatusCodeModule.StatusCode[ 406 ] ).toBe( "NOT_ACCEPTABLE" );
		} );
		it( hasEnumeral(
			"PROXY_AUTHENTICATION_REQUIRED",
			"Enum that identifies the HTTP/1.1 407 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.PROXY_AUTHENTICATION_REQUIRED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.PROXY_AUTHENTICATION_REQUIRED ).toBe( 407 );
			expect( StatusCodeModule.StatusCode[ 407 ] ).toBe( "PROXY_AUTHENTICATION_REQUIRED" );
		} );
		it( hasEnumeral(
			"REQUEST_TIME_OUT",
			"Enum that identifies the HTTP/1.1 408 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.REQUEST_TIME_OUT ).toBeDefined();
			expect( StatusCodeModule.StatusCode.REQUEST_TIME_OUT ).toBe( 408 );
			expect( StatusCodeModule.StatusCode[ 408 ] ).toBe( "REQUEST_TIME_OUT" );
		} );
		it( hasEnumeral(
			"CONFLICT",
			"Enum that identifies the HTTP/1.1 409 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.CONFLICT ).toBeDefined();
			expect( StatusCodeModule.StatusCode.CONFLICT ).toBe( 409 );
			expect( StatusCodeModule.StatusCode[ 409 ] ).toBe( "CONFLICT" );
		} );
		it( hasEnumeral(
			"GONE",
			"Enum that identifies the HTTP/1.1 410 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.GONE ).toBeDefined();
			expect( StatusCodeModule.StatusCode.GONE ).toBe( 410 );
			expect( StatusCodeModule.StatusCode[ 410 ] ).toBe( "GONE" );
		} );
		it( hasEnumeral(
			"LENGTH_REQUIRED",
			"Enum that identifies the HTTP/1.1 411 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.LENGTH_REQUIRED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.LENGTH_REQUIRED ).toBe( 411 );
			expect( StatusCodeModule.StatusCode[ 411 ] ).toBe( "LENGTH_REQUIRED" );
		} );
		it( hasEnumeral(
			"PRECONDITION_FAILED",
			"Enum that identifies the HTTP/1.1 412 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.PRECONDITION_FAILED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.PRECONDITION_FAILED ).toBe( 412 );
			expect( StatusCodeModule.StatusCode[ 412 ] ).toBe( "PRECONDITION_FAILED" );
		} );
		it( hasEnumeral(
			"REQUEST_ENTITY_TOO_LARGE",
			"Enum that identifies the HTTP/1.1 413 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.REQUEST_ENTITY_TOO_LARGE ).toBeDefined();
			expect( StatusCodeModule.StatusCode.REQUEST_ENTITY_TOO_LARGE ).toBe( 413 );
			expect( StatusCodeModule.StatusCode[ 413 ] ).toBe( "REQUEST_ENTITY_TOO_LARGE" );
		} );
		it( hasEnumeral(
			"REQUEST_URI_TOO_LARGE",
			"Enum that identifies the HTTP/1.1 414 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.REQUEST_URI_TOO_LARGE ).toBeDefined();
			expect( StatusCodeModule.StatusCode.REQUEST_URI_TOO_LARGE ).toBe( 414 );
			expect( StatusCodeModule.StatusCode[ 414 ] ).toBe( "REQUEST_URI_TOO_LARGE" );
		} );
		it( hasEnumeral(
			"UNSUPPORTED_MEDIA_TYPE",
			"Enum that identifies the HTTP/1.1 415 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.UNSUPPORTED_MEDIA_TYPE ).toBeDefined();
			expect( StatusCodeModule.StatusCode.UNSUPPORTED_MEDIA_TYPE ).toBe( 415 );
			expect( StatusCodeModule.StatusCode[ 415 ] ).toBe( "UNSUPPORTED_MEDIA_TYPE" );
		} );
		it( hasEnumeral(
			"REQUESTED_RANGE_NOT_SATISFIABLE",
			"Enum that identifies the HTTP/1.1 416 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.REQUESTED_RANGE_NOT_SATISFIABLE ).toBeDefined();
			expect( StatusCodeModule.StatusCode.REQUESTED_RANGE_NOT_SATISFIABLE ).toBe( 416 );
			expect( StatusCodeModule.StatusCode[ 416 ] ).toBe( "REQUESTED_RANGE_NOT_SATISFIABLE" );
		} );
		it( hasEnumeral(
			"EXPECTATION_FAILED",
			"Enum that identifies the HTTP/1.1 417 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.EXPECTATION_FAILED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.EXPECTATION_FAILED ).toBe( 417 );
			expect( StatusCodeModule.StatusCode[ 417 ] ).toBe( "EXPECTATION_FAILED" );
		} );
		it( hasEnumeral(
			"INTERNAL_SERVER_ERROR",
			"Enum that identifies the HTTP/1.1 500 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.INTERNAL_SERVER_ERROR ).toBeDefined();
			expect( StatusCodeModule.StatusCode.INTERNAL_SERVER_ERROR ).toBe( 500 );
			expect( StatusCodeModule.StatusCode[ 500 ] ).toBe( "INTERNAL_SERVER_ERROR" );
		} );
		it( hasEnumeral(
			"NOT_IMPLEMENTED",
			"Enum that identifies the HTTP/1.1 501 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.NOT_IMPLEMENTED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.NOT_IMPLEMENTED ).toBe( 501 );
			expect( StatusCodeModule.StatusCode[ 501 ] ).toBe( "NOT_IMPLEMENTED" );
		} );
		it( hasEnumeral(
			"BAD_GATEWAY",
			"Enum that identifies the HTTP/1.1 502 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.BAD_GATEWAY ).toBeDefined();
			expect( StatusCodeModule.StatusCode.BAD_GATEWAY ).toBe( 502 );
			expect( StatusCodeModule.StatusCode[ 502 ] ).toBe( "BAD_GATEWAY" );
		} );
		it( hasEnumeral(
			"SERVICE_UNAVAILABLE",
			"Enum that identifies the HTTP/1.1 503 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.SERVICE_UNAVAILABLE ).toBeDefined();
			expect( StatusCodeModule.StatusCode.SERVICE_UNAVAILABLE ).toBe( 503 );
			expect( StatusCodeModule.StatusCode[ 503 ] ).toBe( "SERVICE_UNAVAILABLE" );
		} );
		it( hasEnumeral(
			"GATEWAY_TIME_OUT",
			"Enum that identifies the HTTP/1.1 504 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.GATEWAY_TIME_OUT ).toBeDefined();
			expect( StatusCodeModule.StatusCode.GATEWAY_TIME_OUT ).toBe( 504 );
			expect( StatusCodeModule.StatusCode[ 504 ] ).toBe( "GATEWAY_TIME_OUT" );
		} );
		it( hasEnumeral(
			"HTTP_VERSION_NOT_SUPPORTED",
			"Enum that identifies the HTTP/1.1 505 status code."
		), ():void => {
			expect( StatusCodeModule.StatusCode.HTTP_VERSION_NOT_SUPPORTED ).toBeDefined();
			expect( StatusCodeModule.StatusCode.HTTP_VERSION_NOT_SUPPORTED ).toBe( 505 );
			expect( StatusCodeModule.StatusCode[ 505 ] ).toBe( "HTTP_VERSION_NOT_SUPPORTED" );
		} );

	} );

} );
