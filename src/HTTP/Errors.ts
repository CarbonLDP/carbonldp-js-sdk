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
import InternalServerError from "./Errors/server/InternalServerError";
import NotImplementedError from "./Errors/server/NotImplementedError";
import ServiceUnavailableError from "./Errors/server/ServiceUnavailableError";

import UnknownError from "./Errors/UnknownError";


let client:Array<typeof HTTPError> = [];
client.push( BadRequestError );
client.push( ConflictError );
client.push( ForbiddenError );
client.push( MethodNotAllowedError );
client.push( NotAcceptableError );
client.push( NotFoundError );
client.push( PreconditionFailedError );
client.push( PreconditionRequiredError );
client.push( RequestEntityTooLargeError );
client.push( RequestHeaderFieldsTooLargeError );
client.push( RequestURITooLongError );
client.push( TooManyRequestsError );
client.push( UnauthorizedError );
client.push( UnsupportedMediaTypeError );

let server:Array<typeof HTTPError> = [];
server.push( BadResponseError );
server.push( BadGatewayError );
server.push( GatewayTimeoutError );
server.push( HTTPVersionNotSupportedError );
server.push( InternalServerError );
server.push( NotImplementedError );
server.push( ServiceUnavailableError );

let statusCodeMap:Map<number, typeof HTTPError> = new Map<number, typeof HTTPError>();
for ( let i:number = 0, length:number = client.length; i < length; i ++ ) {
	statusCodeMap.set( client[ i ].statusCode, client[ i ] );
}
for ( let i:number = 0, length:number = server.length; i < length; i ++ ) {
	statusCodeMap.set( server[ i ].statusCode, server[ i ] );
}

export {
	HTTPError as Error,

	BadRequestError,
	ConflictError,
	ForbiddenError,
	MethodNotAllowedError,
	NotAcceptableError,
	NotFoundError,
	PreconditionFailedError,
	PreconditionRequiredError,
	RequestEntityTooLargeError,
	RequestHeaderFieldsTooLargeError,
	RequestURITooLongError,
	TooManyRequestsError,
	UnauthorizedError,
	UnsupportedMediaTypeError,

	BadResponseError,
	BadGatewayError,
	GatewayTimeoutError,
	HTTPVersionNotSupportedError,
	InternalServerError,
	NotImplementedError,
	ServiceUnavailableError,

	UnknownError,

	client,
	server,
	statusCodeMap
};
