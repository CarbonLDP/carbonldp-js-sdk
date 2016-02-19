/// <reference path="../../typings/typings.d.ts" />

import {
	INSTANCE,
	STATIC,

	module,

	isDefined,
	hasEnum
} from "./../test/JasmineExtender";
import * as Utils from "../Utils";

import StatusCode from "./StatusCode";

describe( module(
	"Carbon/HTTP/StatusCode"
), ():void => {

	it( isDefined(), ():void => {
		expect( StatusCode ).toBeDefined();
		expect( Utils.isObject( StatusCode ) ).toBe( true );
		expect( Object.keys( StatusCode ).length ).toBe( 40 * 2 );
	});

	it( hasEnum(
		"CONTINUE",
		"Enum that identifies the HTTP/1.1 100 status code"
	), ():void => {
		expect( StatusCode.CONTINUE ).toBeDefined();
		expect( StatusCode.CONTINUE ).toBe( 100 );
		expect( StatusCode[ 100 ] ).toBe( "CONTINUE" );
	});


	it( hasEnum(
		"OK",
		"Enum that identifies the HTTP/1.1 200 status code"
	), ():void => {
		expect( StatusCode.OK ).toBeDefined();
		expect( StatusCode.OK ).toBe( 200 );
		expect( StatusCode[ 200 ] ).toBe( "OK" );
	});
	it( hasEnum(
		"CREATED",
		"Enum that identifies the HTTP/1.1 201 status code"
	), ():void => {
		expect( StatusCode.CREATED ).toBeDefined();
		expect( StatusCode.CREATED ).toBe( 201 );
		expect( StatusCode[ 201 ] ).toBe( "CREATED" );
	});
	it( hasEnum(
		"ACCEPTED",
		"Enum that identifies the HTTP/1.1 202 status code"
	), ():void => {
		expect( StatusCode.ACCEPTED ).toBeDefined();
		expect( StatusCode.ACCEPTED ).toBe( 202 );
		expect( StatusCode[ 202 ] ).toBe( "ACCEPTED" );
	});
	it( hasEnum(
		"NON_AUTHORITATIVE_INFORMATION",
		"Enum that identifies the HTTP/1.1 203 status code"
	), ():void => {
		expect( StatusCode.NON_AUTHORITATIVE_INFORMATION ).toBeDefined();
		expect( StatusCode.NON_AUTHORITATIVE_INFORMATION ).toBe( 203 );
		expect( StatusCode[ 203 ] ).toBe( "NON_AUTHORITATIVE_INFORMATION" );
	});
	it( hasEnum(
		"NO_CONTENT",
		"Enum that identifies the HTTP/1.1 204 status code"
	), ():void => {
		expect( StatusCode.NO_CONTENT ).toBeDefined();
		expect( StatusCode.NO_CONTENT ).toBe( 204 );
		expect( StatusCode[ 204 ] ).toBe( "NO_CONTENT" );
	});
	it( hasEnum(
		"RESET_CONTENT",
		"Enum that identifies the HTTP/1.1 205 status code"
	), ():void => {
		expect( StatusCode.RESET_CONTENT ).toBeDefined();
		expect( StatusCode.RESET_CONTENT ).toBe( 205 );
		expect( StatusCode[ 205 ] ).toBe( "RESET_CONTENT" );
	});
	it( hasEnum(
		"PARTIAL_CONTENT",
		"Enum that identifies the HTTP/1.1 206 status code"
	), ():void => {
		expect( StatusCode.PARTIAL_CONTENT ).toBeDefined();
		expect( StatusCode.PARTIAL_CONTENT ).toBe( 206 );
		expect( StatusCode[ 206 ] ).toBe( "PARTIAL_CONTENT" );
	});
	it( hasEnum(
		"MULTIPLE_CHOICES",
		"Enum that identifies the HTTP/1.1 300 status code"
	), ():void => {
		expect( StatusCode.MULTIPLE_CHOICES ).toBeDefined();
		expect( StatusCode.MULTIPLE_CHOICES ).toBe( 300 );
		expect( StatusCode[ 300 ] ).toBe( "MULTIPLE_CHOICES" );
	});
	it( hasEnum(
		"MOVED_PERMANENTLY",
		"Enum that identifies the HTTP/1.1 301 status code"
	), ():void => {
		expect( StatusCode.MOVED_PERMANENTLY ).toBeDefined();
		expect( StatusCode.MOVED_PERMANENTLY ).toBe( 301 );
		expect( StatusCode[ 301 ] ).toBe( "MOVED_PERMANENTLY" );
	});
	it( hasEnum(
		"FOUND",
		"Enum that identifies the HTTP/1.1 302 status code"
	), ():void => {
		expect( StatusCode.FOUND ).toBeDefined();
		expect( StatusCode.FOUND ).toBe( 302 );
		expect( StatusCode[ 302 ] ).toBe( "FOUND" );
	});
	it( hasEnum(
		"SEE_OTHER",
		"Enum that identifies the HTTP/1.1 303 status code"
	), ():void => {
		expect( StatusCode.SEE_OTHER ).toBeDefined();
		expect( StatusCode.SEE_OTHER ).toBe( 303 );
		expect( StatusCode[ 303 ] ).toBe( "SEE_OTHER" );
	});
	it( hasEnum(
		"NOT_MODIFIED",
		"Enum that identifies the HTTP/1.1 304 status code"
	), ():void => {
		expect( StatusCode.NOT_MODIFIED ).toBeDefined();
		expect( StatusCode.NOT_MODIFIED ).toBe( 304 );
		expect( StatusCode[ 304 ] ).toBe( "NOT_MODIFIED" );
	});
	it( hasEnum(
		"USE_PROXY",
		"Enum that identifies the HTTP/1.1 305 status code"
	), ():void => {
		expect( StatusCode.USE_PROXY ).toBeDefined();
		expect( StatusCode.USE_PROXY ).toBe( 305 );
		expect( StatusCode[ 305 ] ).toBe( "USE_PROXY" );
	});
	it( hasEnum(
		"TEMPORARY_REDIRECT",
		"Enum that identifies the HTTP/1.1 307 status code"
	), ():void => {
		expect( StatusCode.TEMPORARY_REDIRECT ).toBeDefined();
		expect( StatusCode.TEMPORARY_REDIRECT ).toBe( 307 );
		expect( StatusCode[ 307 ] ).toBe( "TEMPORARY_REDIRECT" );
	});
	it( hasEnum(
		"BAD_REQUEST",
		"Enum that identifies the HTTP/1.1 400 status code"
	), ():void => {
		expect( StatusCode.BAD_REQUEST ).toBeDefined();
		expect( StatusCode.BAD_REQUEST ).toBe( 400 );
		expect( StatusCode[ 400 ] ).toBe( "BAD_REQUEST" );
	});
	it( hasEnum(
		"UNAUTHORIZED",
		"Enum that identifies the HTTP/1.1 401 status code"
	), ():void => {
		expect( StatusCode.UNAUTHORIZED ).toBeDefined();
		expect( StatusCode.UNAUTHORIZED ).toBe( 401 );
		expect( StatusCode[ 401 ] ).toBe( "UNAUTHORIZED" );
	});
	it( hasEnum(
		"PAYMENT_REQUIRED",
		"Enum that identifies the HTTP/1.1 402 status code"
	), ():void => {
		expect( StatusCode.PAYMENT_REQUIRED ).toBeDefined();
		expect( StatusCode.PAYMENT_REQUIRED ).toBe( 402 );
		expect( StatusCode[ 402 ] ).toBe( "PAYMENT_REQUIRED" );
	});
	it( hasEnum(
		"FORBIDDEN",
		"Enum that identifies the HTTP/1.1 403 status code"
	), ():void => {
		expect( StatusCode.FORBIDDEN ).toBeDefined();
		expect( StatusCode.FORBIDDEN ).toBe( 403 );
		expect( StatusCode[ 403 ] ).toBe( "FORBIDDEN" );
	});
	it( hasEnum(
		"NOT_FOUND",
		"Enum that identifies the HTTP/1.1 404 status code"
	), ():void => {
		expect( StatusCode.NOT_FOUND ).toBeDefined();
		expect( StatusCode.NOT_FOUND ).toBe( 404 );
		expect( StatusCode[ 404 ] ).toBe( "NOT_FOUND" );
	});
	it( hasEnum(
		"METHOD_NOT_ALLOWED",
		"Enum that identifies the HTTP/1.1 405 status code"
	), ():void => {
		expect( StatusCode.METHOD_NOT_ALLOWED ).toBeDefined();
		expect( StatusCode.METHOD_NOT_ALLOWED ).toBe( 405 );
		expect( StatusCode[ 405 ] ).toBe( "METHOD_NOT_ALLOWED" );
	});
	it( hasEnum(
		"NOT_ACCEPTABLE",
		"Enum that identifies the HTTP/1.1 406 status code"
	), ():void => {
		expect( StatusCode.NOT_ACCEPTABLE ).toBeDefined();
		expect( StatusCode.NOT_ACCEPTABLE ).toBe( 406 );
		expect( StatusCode[ 406 ] ).toBe( "NOT_ACCEPTABLE" );
	});
	it( hasEnum(
		"PROXY_AUTHENTICATION_REQUIRED",
		"Enum that identifies the HTTP/1.1 407 status code"
	), ():void => {
		expect( StatusCode.PROXY_AUTHENTICATION_REQUIRED ).toBeDefined();
		expect( StatusCode.PROXY_AUTHENTICATION_REQUIRED ).toBe( 407 );
		expect( StatusCode[ 407 ] ).toBe( "PROXY_AUTHENTICATION_REQUIRED" );
	});
	it( hasEnum(
		"REQUEST_TIME_OUT",
		"Enum that identifies the HTTP/1.1 408 status code"
	), ():void => {
		expect( StatusCode.REQUEST_TIME_OUT ).toBeDefined();
		expect( StatusCode.REQUEST_TIME_OUT ).toBe( 408 );
		expect( StatusCode[ 408 ] ).toBe( "REQUEST_TIME_OUT" );
	});
	it( hasEnum(
		"CONFLICT",
		"Enum that identifies the HTTP/1.1 409 status code"
	), ():void => {
		expect( StatusCode.CONFLICT ).toBeDefined();
		expect( StatusCode.CONFLICT ).toBe( 409 );
		expect( StatusCode[ 409 ] ).toBe( "CONFLICT" );
	});
	it( hasEnum(
		"GONE",
		"Enum that identifies the HTTP/1.1 410 status code"
	), ():void => {
		expect( StatusCode.GONE ).toBeDefined();
		expect( StatusCode.GONE ).toBe( 410 );
		expect( StatusCode[ 410 ] ).toBe( "GONE" );
	});
	it( hasEnum(
		"LENGTH_REQUIRED",
		"Enum that identifies the HTTP/1.1 411 status code"
	), ():void => {
		expect( StatusCode.LENGTH_REQUIRED ).toBeDefined();
		expect( StatusCode.LENGTH_REQUIRED ).toBe( 411 );
		expect( StatusCode[ 411 ] ).toBe( "LENGTH_REQUIRED" );
	});
	it( hasEnum(
		"PRECONDITION_FAILED",
		"Enum that identifies the HTTP/1.1 412 status code"
	), ():void => {
		expect( StatusCode.PRECONDITION_FAILED ).toBeDefined();
		expect( StatusCode.PRECONDITION_FAILED ).toBe( 412 );
		expect( StatusCode[ 412 ] ).toBe( "PRECONDITION_FAILED" );
	});
	it( hasEnum(
		"REQUEST_ENTITY_TOO_LARGE",
		"Enum that identifies the HTTP/1.1 413 status code"
	), ():void => {
		expect( StatusCode.REQUEST_ENTITY_TOO_LARGE ).toBeDefined();
		expect( StatusCode.REQUEST_ENTITY_TOO_LARGE ).toBe( 413 );
		expect( StatusCode[ 413 ] ).toBe( "REQUEST_ENTITY_TOO_LARGE" );
	});
	it( hasEnum(
		"REQUEST_URI_TOO_LARGE",
		"Enum that identifies the HTTP/1.1 414 status code"
	), ():void => {
		expect( StatusCode.REQUEST_URI_TOO_LARGE ).toBeDefined();
		expect( StatusCode.REQUEST_URI_TOO_LARGE ).toBe( 414 );
		expect( StatusCode[ 414 ] ).toBe( "REQUEST_URI_TOO_LARGE" );
	});
	it( hasEnum(
		"UNSUPPORTED_MEDIA_TYPE",
		"Enum that identifies the HTTP/1.1 415 status code"
	), ():void => {
		expect( StatusCode.UNSUPPORTED_MEDIA_TYPE ).toBeDefined();
		expect( StatusCode.UNSUPPORTED_MEDIA_TYPE ).toBe( 415 );
		expect( StatusCode[ 415 ] ).toBe( "UNSUPPORTED_MEDIA_TYPE" );
	});
	it( hasEnum(
		"REQUESTED_RANGE_NOT_SATISFIABLE",
		"Enum that identifies the HTTP/1.1 416 status code"
	), ():void => {
		expect( StatusCode.REQUESTED_RANGE_NOT_SATISFIABLE ).toBeDefined();
		expect( StatusCode.REQUESTED_RANGE_NOT_SATISFIABLE ).toBe( 416 );
		expect( StatusCode[ 416 ] ).toBe( "REQUESTED_RANGE_NOT_SATISFIABLE" );
	});
	it( hasEnum(
		"EXPECTATION_FAILED",
		"Enum that identifies the HTTP/1.1 417 status code"
	), ():void => {
		expect( StatusCode.EXPECTATION_FAILED ).toBeDefined();
		expect( StatusCode.EXPECTATION_FAILED ).toBe( 417 );
		expect( StatusCode[ 417 ] ).toBe( "EXPECTATION_FAILED" );
	});
	it( hasEnum(
		"INTERNAL_SERVER_ERROR",
		"Enum that identifies the HTTP/1.1 500 status code"
	), ():void => {
		expect( StatusCode.INTERNAL_SERVER_ERROR ).toBeDefined();
		expect( StatusCode.INTERNAL_SERVER_ERROR ).toBe( 500 );
		expect( StatusCode[ 500 ] ).toBe( "INTERNAL_SERVER_ERROR" );
	});
	it( hasEnum(
		"NOT_IMPLEMENTED",
		"Enum that identifies the HTTP/1.1 501 status code"
	), ():void => {
		expect( StatusCode.NOT_IMPLEMENTED ).toBeDefined();
		expect( StatusCode.NOT_IMPLEMENTED ).toBe( 501 );
		expect( StatusCode[ 501 ] ).toBe( "NOT_IMPLEMENTED" );
	});
	it( hasEnum(
		"BAD_GATEWAY",
		"Enum that identifies the HTTP/1.1 502 status code"
	), ():void => {
		expect( StatusCode.BAD_GATEWAY ).toBeDefined();
		expect( StatusCode.BAD_GATEWAY ).toBe( 502 );
		expect( StatusCode[ 502 ] ).toBe( "BAD_GATEWAY" );
	});
	it( hasEnum(
		"SERVICE_UNAVAILABLE",
		"Enum that identifies the HTTP/1.1 503 status code"
	), ():void => {
		expect( StatusCode.SERVICE_UNAVAILABLE ).toBeDefined();
		expect( StatusCode.SERVICE_UNAVAILABLE ).toBe( 503 );
		expect( StatusCode[ 503 ] ).toBe( "SERVICE_UNAVAILABLE" );
	});
	it( hasEnum(
		"GATEWAY_TIME_OUT",
		"Enum that identifies the HTTP/1.1 504 status code"
	), ():void => {
		expect( StatusCode.GATEWAY_TIME_OUT ).toBeDefined();
		expect( StatusCode.GATEWAY_TIME_OUT ).toBe( 504 );
		expect( StatusCode[ 504 ] ).toBe( "GATEWAY_TIME_OUT" );
	});
	it( hasEnum(
		"HTTP_VERSION_NOT_SUPPORTED",
		"Enum that identifies the HTTP/1.1 505 status code"
	), ():void => {
		expect( StatusCode.HTTP_VERSION_NOT_SUPPORTED ).toBeDefined();
		expect( StatusCode.HTTP_VERSION_NOT_SUPPORTED ).toBe( 505 );
		expect( StatusCode[ 505 ] ).toBe( "HTTP_VERSION_NOT_SUPPORTED" );
	});

});