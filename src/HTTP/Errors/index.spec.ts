import {
	hasProperty,
	isDefined,
	module,
	reexports,
	STATIC,
} from "../../test/JasmineExtender";
import * as Utils from "../../Utils";

import * as Errors from "./";

import { BadRequestError } from "./ClientErrors/BadRequestError";
import { ConflictError } from "./ClientErrors/ConflictError";
import { ForbiddenError } from "./ClientErrors/ForbiddenError";
import { MethodNotAllowedError } from "./ClientErrors/MethodNotAllowedError";
import { NotAcceptableError } from "./ClientErrors/NotAcceptableError";
import { NotFoundError } from "./ClientErrors/NotFoundError";
import { PreconditionFailedError } from "./ClientErrors/PreconditionFailedError";
import { PreconditionRequiredError } from "./ClientErrors/PreconditionRequiredError";
import { RequestEntityTooLargeError } from "./ClientErrors/RequestEntityTooLargeError";
import { RequestHeaderFieldsTooLargeError } from "./ClientErrors/RequestHeaderFieldsTooLargeError";
import { RequestURITooLongError } from "./ClientErrors/RequestURITooLongError";
import { TooManyRequestsError } from "./ClientErrors/TooManyRequestsError";
import { UnauthorizedError } from "./ClientErrors/UnauthorizedError";
import { UnsupportedMediaTypeError } from "./ClientErrors/UnsupportedMediaTypeError";

import { HTTPError } from "./HTTPError";

import { BadGatewayError } from "./ServerErrors/BadGatewayError";
import { BadResponseError } from "./ServerErrors/BadResponseError";
import { GatewayTimeoutError } from "./ServerErrors/GatewayTimeoutError";
import { HTTPVersionNotSupportedError } from "./ServerErrors/HTTPVersionNotSupportedError";
import { InternalServerErrorError } from "./ServerErrors/InternalServerErrorError";
import { NotImplementedError } from "./ServerErrors/NotImplementedError";
import { ServiceUnavailableError } from "./ServerErrors/ServiceUnavailableError";

import { UnknownError } from "./UnknownError";


describe( module(
	"carbonldp/HTTP/Errors"
), ():void => {

	it( isDefined(), ():void => {
		expect( Errors ).toBeDefined();
		expect( Utils.isObject( Errors ) ).toBe( true );
	} );

	it( reexports(
		STATIC,
		"HTTPError",
		"CarbonLDP.HTTP.Errors.HTTPError"
	), ():void => {
		expect( Errors.HTTPError ).toBeDefined();
		expect( Errors.HTTPError ).toBe( HTTPError );
	} );

	it( reexports(
		STATIC,
		"BadRequestError",
		"CarbonLDP.HTTP.Errors.BadRequestError"
	), ():void => {
		expect( Errors.BadRequestError ).toBeDefined();
		expect( Errors.BadRequestError ).toBe( BadRequestError );
	} );

	it( reexports(
		STATIC,
		"ConflictError",
		"CarbonLDP.HTTP.Errors.ConflictError"
	), ():void => {
		expect( Errors.ConflictError ).toBeDefined();
		expect( Errors.ConflictError ).toBe( ConflictError );
	} );

	it( reexports(
		STATIC,
		"ForbiddenError",
		"CarbonLDP.HTTP.Errors.ForbiddenError"
	), ():void => {
		expect( Errors.ForbiddenError ).toBeDefined();
		expect( Errors.ForbiddenError ).toBe( ForbiddenError );
	} );

	it( reexports(
		STATIC,
		"MethodNotAllowedError",
		"CarbonLDP.HTTP.Errors.MethodNotAllowedError"
	), ():void => {
		expect( Errors.MethodNotAllowedError ).toBeDefined();
		expect( Errors.MethodNotAllowedError ).toBe( MethodNotAllowedError );
	} );

	it( reexports(
		STATIC,
		"NotAcceptableError",
		"CarbonLDP.HTTP.Errors.NotAcceptableError"
	), ():void => {
		expect( Errors.NotAcceptableError ).toBeDefined();
		expect( Errors.NotAcceptableError ).toBe( NotAcceptableError );
	} );

	it( reexports(
		STATIC,
		"NotFoundError",
		"CarbonLDP.HTTP.Errors.NotFoundError"
	), ():void => {
		expect( Errors.NotFoundError ).toBeDefined();
		expect( Errors.NotFoundError ).toBe( NotFoundError );
	} );

	it( reexports(
		STATIC,
		"PreconditionFailedError",
		"CarbonLDP.HTTP.Errors.PreconditionFailedError"
	), ():void => {
		expect( Errors.PreconditionFailedError ).toBeDefined();
		expect( Errors.PreconditionFailedError ).toBe( PreconditionFailedError );
	} );

	it( reexports(
		STATIC,
		"PreconditionRequiredError",
		"CarbonLDP.HTTP.Errors.PreconditionRequiredError"
	), ():void => {
		expect( Errors.PreconditionRequiredError ).toBeDefined();
		expect( Errors.PreconditionRequiredError ).toBe( PreconditionRequiredError );
	} );

	it( reexports(
		STATIC,
		"RequestEntityTooLargeError",
		"CarbonLDP.HTTP.Errors.RequestEntityTooLargeError"
	), ():void => {
		expect( Errors.RequestEntityTooLargeError ).toBeDefined();
		expect( Errors.RequestEntityTooLargeError ).toBe( RequestEntityTooLargeError );
	} );

	it( reexports(
		STATIC,
		"RequestHeaderFieldsTooLargeError",
		"CarbonLDP.HTTP.Errors.RequestHeaderFieldsTooLargeError"
	), ():void => {
		expect( Errors.RequestHeaderFieldsTooLargeError ).toBeDefined();
		expect( Errors.RequestHeaderFieldsTooLargeError ).toBe( RequestHeaderFieldsTooLargeError );
	} );

	it( reexports(
		STATIC,
		"RequestURITooLongError",
		"CarbonLDP.HTTP.Errors.RequestURITooLongError"
	), ():void => {
		expect( Errors.RequestURITooLongError ).toBeDefined();
		expect( Errors.RequestURITooLongError ).toBe( RequestURITooLongError );
	} );

	it( reexports(
		STATIC,
		"TooManyRequestsError",
		"CarbonLDP.HTTP.Errors.TooManyRequestsError"
	), ():void => {
		expect( Errors.TooManyRequestsError ).toBeDefined();
		expect( Errors.TooManyRequestsError ).toBe( TooManyRequestsError );
	} );

	it( reexports(
		STATIC,
		"UnauthorizedError",
		"CarbonLDP.HTTP.Errors.UnauthorizedError"
	), ():void => {
		expect( Errors.UnauthorizedError ).toBeDefined();
		expect( Errors.UnauthorizedError ).toBe( UnauthorizedError );
	} );

	it( reexports(
		STATIC,
		"UnsupportedMediaTypeError",
		"CarbonLDP.HTTP.Errors.UnsupportedMediaTypeError"
	), ():void => {
		expect( Errors.UnsupportedMediaTypeError ).toBeDefined();
		expect( Errors.UnsupportedMediaTypeError ).toBe( UnsupportedMediaTypeError );
	} );

	it( reexports(
		STATIC,
		"BadResponseError",
		"CarbonLDP.HTTP.Errors.BadResponseError"
	), ():void => {
		expect( Errors.BadResponseError ).toBeDefined();
		expect( Errors.BadResponseError ).toBe( BadResponseError );
	} );

	it( reexports(
		STATIC,
		"BadGatewayError",
		"CarbonLDP.HTTP.Errors.BadGatewayError"
	), ():void => {
		expect( Errors.BadGatewayError ).toBeDefined();
		expect( Errors.BadGatewayError ).toBe( BadGatewayError );
	} );

	it( reexports(
		STATIC,
		"GatewayTimeoutError",
		"CarbonLDP.HTTP.Errors.GatewayTimeoutError"
	), ():void => {
		expect( Errors.GatewayTimeoutError ).toBeDefined();
		expect( Errors.GatewayTimeoutError ).toBe( GatewayTimeoutError );
	} );

	it( reexports(
		STATIC,
		"HTTPVersionNotSupportedError",
		"CarbonLDP.HTTP.Errors.HTTPVersionNotSupportedError"
	), ():void => {
		expect( Errors.HTTPVersionNotSupportedError ).toBeDefined();
		expect( Errors.HTTPVersionNotSupportedError ).toBe( HTTPVersionNotSupportedError );
	} );

	it( reexports(
		STATIC,
		"InternalServerErrorError",
		"CarbonLDP.HTTP.Errors.InternalServerErrorError"
	), ():void => {
		expect( Errors.InternalServerErrorError ).toBeDefined();
		expect( Errors.InternalServerErrorError ).toBe( InternalServerErrorError );
	} );

	it( reexports(
		STATIC,
		"NotImplementedError",
		"CarbonLDP.HTTP.Errors.NotImplementedError"
	), ():void => {
		expect( Errors.NotImplementedError ).toBeDefined();
		expect( Errors.NotImplementedError ).toBe( NotImplementedError );
	} );

	it( reexports(
		STATIC,
		"ServiceUnavailableError",
		"CarbonLDP.HTTP.Errors.ServiceUnavailableError"
	), ():void => {
		expect( Errors.ServiceUnavailableError ).toBeDefined();
		expect( Errors.ServiceUnavailableError ).toBe( ServiceUnavailableError );
	} );

	it( reexports(
		STATIC,
		"UnknownError",
		"CarbonLDP.HTTP.Errors.UnknownError"
	), ():void => {
		expect( Errors.UnknownError ).toBeDefined();
		expect( Errors.UnknownError ).toBe( UnknownError );
	} );

	it( hasProperty(
		STATIC,
		"statusCodeMap",
		"Map<number, typeof CarbonLDP.HTTP.Errors.HTTPError>",
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
