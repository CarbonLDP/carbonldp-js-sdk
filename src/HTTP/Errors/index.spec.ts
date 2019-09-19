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

import { BadGatewayError } from "./ServerErrors/BadGatewayError";
import { BadResponseError } from "./ServerErrors/BadResponseError";
import { GatewayTimeoutError } from "./ServerErrors/GatewayTimeoutError";
import { HTTPVersionNotSupportedError } from "./ServerErrors/HTTPVersionNotSupportedError";
import { InternalServerErrorError } from "./ServerErrors/InternalServerErrorError";
import { NotImplementedError } from "./ServerErrors/NotImplementedError";
import { ServiceUnavailableError } from "./ServerErrors/ServiceUnavailableError";


describe( "Errors", () => {

	it( "should exist", () => {
		expect( Errors ).toBeDefined();
		expect( Errors ).toEqual( jasmine.any( Object ) );
	} );


	it( "should reexport all client errors", () => {
		expect( Errors.BadRequestError ).toBe( BadRequestError );
		expect( Errors.ConflictError ).toBe( ConflictError );
		expect( Errors.ForbiddenError ).toBe( ForbiddenError );
		expect( Errors.MethodNotAllowedError ).toBe( MethodNotAllowedError );
		expect( Errors.NotAcceptableError ).toBe( NotAcceptableError );
		expect( Errors.NotFoundError ).toBe( NotFoundError );
		expect( Errors.PreconditionFailedError ).toBe( PreconditionFailedError );
		expect( Errors.PreconditionRequiredError ).toBe( PreconditionRequiredError );
		expect( Errors.RequestEntityTooLargeError ).toBe( RequestEntityTooLargeError );
		expect( Errors.RequestHeaderFieldsTooLargeError ).toBe( RequestHeaderFieldsTooLargeError );
		expect( Errors.RequestURITooLongError ).toBe( RequestURITooLongError );
		expect( Errors.TooManyRequestsError ).toBe( TooManyRequestsError );
		expect( Errors.UnauthorizedError ).toBe( UnauthorizedError );
		expect( Errors.UnsupportedMediaTypeError ).toBe( UnsupportedMediaTypeError );
	} );

	it( "should reexport all server errors", () => {
		expect( Errors.BadGatewayError ).toBe( BadGatewayError );
		expect( Errors.BadResponseError ).toBe( BadResponseError );
		expect( Errors.GatewayTimeoutError ).toBe( GatewayTimeoutError );
		expect( Errors.HTTPVersionNotSupportedError ).toBe( HTTPVersionNotSupportedError );
		expect( Errors.InternalServerErrorError ).toBe( InternalServerErrorError );
		expect( Errors.NotImplementedError ).toBe( NotImplementedError );
		expect( Errors.ServiceUnavailableError ).toBe( ServiceUnavailableError );
	} );

} );
