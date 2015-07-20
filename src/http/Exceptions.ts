import BadRequestException from './exceptions/client/BadRequestException';
import ConflictException from './exceptions/client/ConflictException';
import ForbiddenException from './exceptions/client/ForbiddenException';
import MethodNotAllowedException from './exceptions/client/MethodNotAllowedException';
import NotAcceptableException from './exceptions/client/NotAcceptableException';
import NotFoundException from './exceptions/client/NotFoundException';
import PreconditionFailedException from './exceptions/client/PreconditionFailedException';
import PreconditionRequiredException from './exceptions/client/PreconditionRequiredException';
import RequestEntityTooLargeException from './exceptions/client/RequestEntityTooLargeException';
import RequestHeaderFieldsTooLargeException from './exceptions/client/RequestHeaderFieldsTooLargeException';
import RequestURITooLongException from './exceptions/client/RequestURITooLongException';
import TooManyRequestsException from './exceptions/client/TooManyRequestsException';
import UnauthorizedException from './exceptions/client/UnauthorizedException';
import UnsupportedMediaTypeException from './exceptions/client/UnsupportedMediaTypeException';

import BadGatewayException from './exceptions/server/BadGatewayException';
import GatewayTimeoutException from './exceptions/server/GatewayTimeoutException';
import HTTPVersionNotSupportedException from './exceptions/server/HTTPVersionNotSupportedException';
import InternalServerErrorException from './exceptions/server/InternalServerErrorException';
import NotImplementedException from './exceptions/server/NotImplementedException';
import ServiceUnavailableException from './exceptions/server/ServiceUnavailableException';

import UnknownException from './exceptions/UnknownException';


var client:Array<any> = [];
client.push( BadRequestException );
client.push( ConflictException );
client.push( ForbiddenException );
client.push( MethodNotAllowedException );
client.push( NotAcceptableException );
client.push( NotFoundException );
client.push( PreconditionFailedException );
client.push( PreconditionRequiredException );
client.push( RequestEntityTooLargeException );
client.push( RequestHeaderFieldsTooLargeException );
client.push( RequestURITooLongException );
client.push( TooManyRequestsException );
client.push( UnauthorizedException );
client.push( UnsupportedMediaTypeException );

var server:Array<any> = [];
server.push( BadGatewayException );
server.push( GatewayTimeoutException );
server.push( HTTPVersionNotSupportedException );
server.push( InternalServerErrorException );
server.push( NotImplementedException );
server.push( ServiceUnavailableException );

var statusCodeMap:Map<number, any> = new Map<number, any>();
for ( let i:number = 0, length:number = client.length; i < length; i ++ ) {
	statusCodeMap.set( client[ i ].statusCode, client[ i ] );
}
for ( let i:number = 0, length:number = server.length; i < length; i ++ ) {
	statusCodeMap.set( server[ i ].statusCode, server[ i ] );
}

//@formatter:off
export {
	BadRequestException,
	ConflictException,
	ForbiddenException,
	MethodNotAllowedException,
	NotAcceptableException,
	NotFoundException,
	PreconditionFailedException,
	PreconditionRequiredException,
	RequestEntityTooLargeException,
	RequestHeaderFieldsTooLargeException,
	RequestURITooLongException,
	TooManyRequestsException,
	UnauthorizedException,
	UnsupportedMediaTypeException,

	BadGatewayException,
	GatewayTimeoutException,
	HTTPVersionNotSupportedException,
	InternalServerErrorException,
	NotImplementedException,
	ServiceUnavailableException,

	UnknownException,

	client,
	server,
	statusCodeMap
};
//@formatter:on