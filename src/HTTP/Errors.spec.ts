import {
	INSTANCE,
	STATIC,

	module,

	reexports,
	isDefined,
	hasProperty,
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import HTTPError from "./Errors/HTTPError";

import BadRequestError from "./Errors/client/BadRequestError";
import ConflictError from "./Errors/client/ConflictError";
import ForbiddenError from "./Errors/client/ForbiddenError";
import MethodNotAllowedError from "./Errors/client/MethodNotAllowedError";
import NotAcceptableError from "./Errors/client/NotAcceptableError";
import NotFoundError from "./Errors/client/NotFoundError";
import PreconditionFailedError from "./Errors/client/PreconditionFailedError";
import PreconditionRequiredError from "./Errors/client/PreconditionRequiredError";
import RequestEntityTooLargeError from "./Errors/client/RequestEntityTooLargeError";
import RequestHeaderFieldsTooLargeError from "./Errors/client/RequestHeaderFieldsTooLargeError";
import RequestURITooLongError from "./Errors/client/RequestURITooLongError";
import TooManyRequestsError from "./Errors/client/TooManyRequestsError";
import UnauthorizedError from "./Errors/client/UnauthorizedError";
import UnsupportedMediaTypeError from "./Errors/client/UnsupportedMediaTypeError";

import BadResponseError from "./Errors/server/BadResponseError";
import BadGatewayError from "./Errors/server/BadGatewayError";
import GatewayTimeoutError from "./Errors/server/GatewayTimeoutError";
import HTTPVersionNotSupportedError from "./Errors/server/HTTPVersionNotSupportedError";
import InternalServerErrorError from "./Errors/server/InternalServerErrorError";
import NotImplementedError from "./Errors/server/NotImplementedError";
import ServiceUnavailableError from "./Errors/server/ServiceUnavailableError";

import UnknownError from "./Errors/UnknownError";

import * as Errors from "./Errors";


describe( module(
	"Carbon/HTTP/Errors"
), ():void => {

	it( isDefined(), ():void => {
		expect( Errors ).toBeDefined();
		expect( Utils.isObject( Errors ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"Error",
		"Carbon/HTTP/Errors/HTTPError"
	), ():void => {
		expect( Errors.Error ).toBeDefined();
		expect( Errors.Error ).toBe( HTTPError );
	} );

	it( reexports(
		STATIC,
		"BadRequestError",
		"Carbon/HTTP/Errors/client/BadRequestError"
	), ():void => {
		expect( Errors.BadRequestError ).toBeDefined();
		expect( Errors.BadRequestError ).toBe( BadRequestError );
	} );

	it( reexports(
		STATIC,
		"ConflictError",
		"Carbon/HTTP/Errors/client/ConflictError"
	), ():void => {
		expect( Errors.ConflictError ).toBeDefined();
		expect( Errors.ConflictError ).toBe( ConflictError );
	} );

	it( reexports(
		STATIC,
		"ForbiddenError",
		"Carbon/HTTP/Errors/client/ForbiddenError"
	), ():void => {
		expect( Errors.ForbiddenError ).toBeDefined();
		expect( Errors.ForbiddenError ).toBe( ForbiddenError );
	} );

	it( reexports(
		STATIC,
		"MethodNotAllowedError",
		"Carbon/HTTP/Errors/client/MethodNotAllowedError"
	), ():void => {
		expect( Errors.MethodNotAllowedError ).toBeDefined();
		expect( Errors.MethodNotAllowedError ).toBe( MethodNotAllowedError );
	} );

	it( reexports(
		STATIC,
		"NotAcceptableError",
		"Carbon/HTTP/Errors/client/NotAcceptableError"
	), ():void => {
		expect( Errors.NotAcceptableError ).toBeDefined();
		expect( Errors.NotAcceptableError ).toBe( NotAcceptableError );
	} );

	it( reexports(
		STATIC,
		"NotFoundError",
		"Carbon/HTTP/Errors/client/NotFoundError"
	), ():void => {
		expect( Errors.NotFoundError ).toBeDefined();
		expect( Errors.NotFoundError ).toBe( NotFoundError );
	} );

	it( reexports(
		STATIC,
		"PreconditionFailedError",
		"Carbon/HTTP/Errors/client/PreconditionFailedError"
	), ():void => {
		expect( Errors.PreconditionFailedError ).toBeDefined();
		expect( Errors.PreconditionFailedError ).toBe( PreconditionFailedError );
	} );

	it( reexports(
		STATIC,
		"PreconditionRequiredError",
		"Carbon/HTTP/Errors/client/PreconditionRequiredError"
	), ():void => {
		expect( Errors.PreconditionRequiredError ).toBeDefined();
		expect( Errors.PreconditionRequiredError ).toBe( PreconditionRequiredError );
	} );

	it( reexports(
		STATIC,
		"RequestEntityTooLargeError",
		"Carbon/HTTP/Errors/client/RequestEntityTooLargeError"
	), ():void => {
		expect( Errors.RequestEntityTooLargeError ).toBeDefined();
		expect( Errors.RequestEntityTooLargeError ).toBe( RequestEntityTooLargeError );
	} );

	it( reexports(
		STATIC,
		"RequestHeaderFieldsTooLargeError",
		"Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError"
	), ():void => {
		expect( Errors.RequestHeaderFieldsTooLargeError ).toBeDefined();
		expect( Errors.RequestHeaderFieldsTooLargeError ).toBe( RequestHeaderFieldsTooLargeError );
	} );

	it( reexports(
		STATIC,
		"RequestURITooLongError",
		"Carbon/HTTP/Errors/client/RequestURITooLongError"
	), ():void => {
		expect( Errors.RequestURITooLongError ).toBeDefined();
		expect( Errors.RequestURITooLongError ).toBe( RequestURITooLongError );
	} );

	it( reexports(
		STATIC,
		"TooManyRequestsError",
		"Carbon/HTTP/Errors/client/TooManyRequestsError"
	), ():void => {
		expect( Errors.TooManyRequestsError ).toBeDefined();
		expect( Errors.TooManyRequestsError ).toBe( TooManyRequestsError );
	} );

	it( reexports(
		STATIC,
		"UnauthorizedError",
		"Carbon/HTTP/Errors/client/UnauthorizedError"
	), ():void => {
		expect( Errors.UnauthorizedError ).toBeDefined();
		expect( Errors.UnauthorizedError ).toBe( UnauthorizedError );
	} );

	it( reexports(
		STATIC,
		"UnsupportedMediaTypeError",
		"Carbon/HTTP/Errors/client/UnsupportedMediaTypeError"
	), ():void => {
		expect( Errors.UnsupportedMediaTypeError ).toBeDefined();
		expect( Errors.UnsupportedMediaTypeError ).toBe( UnsupportedMediaTypeError );
	} );

	it( reexports(
		STATIC,
		"BadResponseError",
		"Carbon/HTTP/Errors/client/BadResponseError"
	), ():void => {
		expect( Errors.BadResponseError ).toBeDefined();
		expect( Errors.BadResponseError ).toBe( BadResponseError );
	} );

	it( reexports(
		STATIC,
		"BadGatewayError",
		"Carbon/HTTP/Errors/client/BadGatewayError"
	), ():void => {
		expect( Errors.BadGatewayError ).toBeDefined();
		expect( Errors.BadGatewayError ).toBe( BadGatewayError );
	} );

	it( reexports(
		STATIC,
		"GatewayTimeoutError",
		"Carbon/HTTP/Errors/client/GatewayTimeoutError"
	), ():void => {
		expect( Errors.GatewayTimeoutError ).toBeDefined();
		expect( Errors.GatewayTimeoutError ).toBe( GatewayTimeoutError );
	} );

	it( reexports(
		STATIC,
		"HTTPVersionNotSupportedError",
		"Carbon/HTTP/Errors/client/HTTPVersionNotSupportedError"
	), ():void => {
		expect( Errors.HTTPVersionNotSupportedError ).toBeDefined();
		expect( Errors.HTTPVersionNotSupportedError ).toBe( HTTPVersionNotSupportedError );
	} );

	it( reexports(
		STATIC,
		"InternalServerErrorError",
		"Carbon/HTTP/Errors/client/InternalServerErrorError"
	), ():void => {
		expect( Errors.InternalServerErrorError ).toBeDefined();
		expect( Errors.InternalServerErrorError ).toBe( InternalServerErrorError );
	} );

	it( reexports(
		STATIC,
		"NotImplementedError",
		"Carbon/HTTP/Errors/client/NotImplementedError"
	), ():void => {
		expect( Errors.NotImplementedError ).toBeDefined();
		expect( Errors.NotImplementedError ).toBe( NotImplementedError );
	} );

	it( reexports(
		STATIC,
		"ServiceUnavailableError",
		"Carbon/HTTP/Errors/client/ServiceUnavailableError"
	), ():void => {
		expect( Errors.ServiceUnavailableError ).toBeDefined();
		expect( Errors.ServiceUnavailableError ).toBe( ServiceUnavailableError );
	} );

	it( reexports(
		STATIC,
		"UnknownError",
		"Carbon/HTTP/Errors/client/UnknownError"
	), ():void => {
		expect( Errors.UnknownError ).toBeDefined();
		expect( Errors.UnknownError ).toBe( UnknownError );
	} );

	it( hasProperty(
		STATIC,
		"client",
		"Array <Carbon.HTTP.Error.HTTPError>",
		"Array that contains all the error classes that represents the errors induced by the client."
	), ():void => {
		expect( Errors.client ).toBeDefined();
		expect( Utils.isArray( Errors.client ) ).toBe( true );

		expect( Errors.client.length ).toBe( 14 );
		expect( Errors.client.indexOf( BadRequestError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( ConflictError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( ForbiddenError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( MethodNotAllowedError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( NotAcceptableError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( NotFoundError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( PreconditionFailedError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( PreconditionRequiredError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( RequestEntityTooLargeError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( RequestHeaderFieldsTooLargeError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( RequestURITooLongError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( TooManyRequestsError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( UnauthorizedError ) ).not.toBe( - 1 );
		expect( Errors.client.indexOf( UnsupportedMediaTypeError ) ).not.toBe( - 1 );
	} );

	it( hasProperty(
		STATIC,
		"server",
		"Array <Carbon.HTTP.Error.HTTPError>",
		"Array that contains all the error classes that represents the errors caused by the server."
	), ():void => {
		expect( Errors.server ).toBeDefined();
		expect( Utils.isArray( Errors.server ) ).toBe( true );

		expect( Errors.server.length ).toBe( 7 );
		expect( Errors.server.indexOf( BadResponseError ) ).not.toBe( - 1 );
		expect( Errors.server.indexOf( BadGatewayError ) ).not.toBe( - 1 );
		expect( Errors.server.indexOf( GatewayTimeoutError ) ).not.toBe( - 1 );
		expect( Errors.server.indexOf( HTTPVersionNotSupportedError ) ).not.toBe( - 1 );
		expect( Errors.server.indexOf( InternalServerErrorError ) ).not.toBe( - 1 );
		expect( Errors.server.indexOf( NotImplementedError ) ).not.toBe( - 1 );
		expect( Errors.server.indexOf( ServiceUnavailableError ) ).not.toBe( - 1 );
	} );

	it( hasProperty(
		STATIC,
		"statusCodeMap",
		"Map <number, Carbon.HTTP.Error.HTTPError>",
		"Map where all the HTTP Status Codes used in the SDK are assigned to their specific error class."
	), ():void => {
		expect( Errors.statusCodeMap ).toBeDefined();
		expect( Utils.isMap( Errors.statusCodeMap ) ).toBe( true );

		expect( Errors.statusCodeMap.size ).toBe( 21 );
		expect( Errors.statusCodeMap.get( BadRequestError.statusCode ) ).toBe( BadRequestError );
		expect( Errors.statusCodeMap.get( ConflictError.statusCode ) ).toBe( ConflictError );
		expect( Errors.statusCodeMap.get( ForbiddenError.statusCode ) ).toBe( ForbiddenError );
		expect( Errors.statusCodeMap.get( MethodNotAllowedError.statusCode ) ).toBe( MethodNotAllowedError );
		expect( Errors.statusCodeMap.get( NotAcceptableError.statusCode ) ).toBe( NotAcceptableError );
		expect( Errors.statusCodeMap.get( NotFoundError.statusCode ) ).toBe( NotFoundError );
		expect( Errors.statusCodeMap.get( PreconditionFailedError.statusCode ) ).toBe( PreconditionFailedError );
		expect( Errors.statusCodeMap.get( PreconditionRequiredError.statusCode ) ).toBe( PreconditionRequiredError );
		expect( Errors.statusCodeMap.get( RequestEntityTooLargeError.statusCode ) ).toBe( RequestEntityTooLargeError );
		expect( Errors.statusCodeMap.get( RequestHeaderFieldsTooLargeError.statusCode ) ).toBe( RequestHeaderFieldsTooLargeError );
		expect( Errors.statusCodeMap.get( RequestURITooLongError.statusCode ) ).toBe( RequestURITooLongError );
		expect( Errors.statusCodeMap.get( TooManyRequestsError.statusCode ) ).toBe( TooManyRequestsError );
		expect( Errors.statusCodeMap.get( UnauthorizedError.statusCode ) ).toBe( UnauthorizedError );
		expect( Errors.statusCodeMap.get( UnsupportedMediaTypeError.statusCode ) ).toBe( UnsupportedMediaTypeError );
		expect( Errors.statusCodeMap.get( BadResponseError.statusCode ) ).toBe( BadResponseError );
		expect( Errors.statusCodeMap.get( BadGatewayError.statusCode ) ).toBe( BadGatewayError );
		expect( Errors.statusCodeMap.get( GatewayTimeoutError.statusCode ) ).toBe( GatewayTimeoutError );
		expect( Errors.statusCodeMap.get( HTTPVersionNotSupportedError.statusCode ) ).toBe( HTTPVersionNotSupportedError );
		expect( Errors.statusCodeMap.get( InternalServerErrorError.statusCode ) ).toBe( InternalServerErrorError );
		expect( Errors.statusCodeMap.get( NotImplementedError.statusCode ) ).toBe( NotImplementedError );
		expect( Errors.statusCodeMap.get( ServiceUnavailableError.statusCode ) ).toBe( ServiceUnavailableError );
	} );

} );
