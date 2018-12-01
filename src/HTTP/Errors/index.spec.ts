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


	describe( "statusCodeMap", () => {

		it( "should exist", () => {
			expect( Errors.statusCodeMap ).toBeDefined();
			expect( Errors.statusCodeMap ).toEqual( jasmine.any( Map ) );
		} );

		it( "should have all the error classes", () => {
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

} );
