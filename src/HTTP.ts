/// <reference path="../typings/es6/es6.d.ts" />

import * as Utils from './Utils';

enum StatusCode {
	CONTINUE = 100,
	SWITCHING_PROTOCOLS = 101,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE_INFORMATION = 203,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	USE_PROXY = 305,
	TEMPORARY_REDIRECT = 307,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATION_REQUIRED = 407,
	REQUEST_TIME_OUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	REQUEST_ENTITY_TOO_LARGE = 413,
	REQUEST_URI_TOO_LARGE = 414,
	UNSUPPORTED_MEDIA_TYPE = 415,
	REQUESTED_RANGE_NOT_SATISFIABLE = 416,
	EXPECTATION_FAILED = 417,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIME_OUT = 504,
	HTTP_VERSION_NOT_SUPPORTED = 505
}

class HeaderUtil {
	static parseHeaders( headersString:string ):Map<string, Header> {
		var headers:Map<string, Header> = new Map<string, Header>();

		var headerStrings:string[] = headersString.split( '\r\n' );
		for ( var i:number = 0, length:number = headerStrings.length; i < length; i ++ ) {
			var headerString:string = headerStrings[ i ];
			if ( ! headerString.trim() ) continue;

			var parts:string[] = headerString.split( ':' );
			if ( parts.length != 2 ) throw new Error( "ParseException: The header couldn't be parsed." );

			var name = parts[ 0 ].trim();
			var header = new Header( parts[ 1 ].trim() );
			if ( headers.has( name ) ) {
				var existingHeader:Header = headers.get( name );
				existingHeader.values.concat( header.values );
			} else headers.set( name, header );
		}

		return headers;
	}
}

class Header {
	constructor();
	constructor( values:HeaderValue[] );
	constructor( value:string );
	constructor( valueOrValues?:(string | HeaderValue[]) ) {
		if ( ! valueOrValues ) return;
		else if ( Array.isArray( valueOrValues ) ) this.values = <HeaderValue[]> valueOrValues;
		else this.setValues( <string> valueOrValues );
	}

	values:HeaderValue[] = [];

	private setValues( valuesString:string ):void {
		this.values = [];

		var valueStrings:string[] = valuesString.split( "," );
		for ( var i = 0, length = valueStrings.length; i < length; i ++ ) {
			var valueString:string = valueStrings[ i ];
			var value:HeaderValue = new HeaderValue( valueString );
			this.values.push( value );
		}
	}


	toString():string {
		return this.values.join( ', ' );
	}
}
class HeaderValue {
	constructor( value:string );
	constructor( mainKey:string, mainValue:string, secondaryKey:string, secondaryValue:string );
	constructor( value:string, mainValue?:string, secondaryKey?:string, secondaryValue?:string ) {
		if ( mainValue ) {
			this.mainKey = value;
			this.mainValue = mainValue;
			this.secondaryKey = secondaryKey;
			this.secondaryValue = secondaryValue;
		} else this.setValue( value );
	}

	mainKey:string = null;
	mainValue:string = null;
	secondaryKey:string = null;
	secondaryValue:string = null;

	private setValue( value:string ):void {
		var parts:string[] = value.split( ";" );
		this.setMain( parts[ 0 ] );
		if ( parts.length > 1 ) this.setSecondary( parts[ 1 ] );
	}

	private setMain( main:string ):void {
		var parts:string[] = main.split( "=" );
		if ( parts.length === 1 ) this.mainValue = HeaderValue.cleanString( parts[ 0 ] );
		else if ( parts.length === 2 ) {
			this.mainKey = HeaderValue.cleanString( parts[ 0 ] );
			this.mainValue = HeaderValue.cleanString( parts[ 1 ] );
		} else throw new Error( "ParseError: The header value contains multiple ';'" );
	}

	private setSecondary( secondary:string ):void {
		var parts:string[] = secondary.split( "=" );
		if ( parts.length === 1 ) this.secondaryValue = HeaderValue.cleanString( parts[ 0 ] );
		else if ( parts.length === 2 ) {
			this.secondaryKey = HeaderValue.cleanString( parts[ 0 ] );
			this.secondaryValue = HeaderValue.cleanString( parts[ 1 ] );
		} else throw new Error( "ParseError: The header value contains multiple ';'" );
	}

	private static cleanString( toClean:string ):string {
		toClean = toClean.trim();
		toClean = (Utils.S.startsWith( toClean, "\"" ) || Utils.S.startsWith( toClean, "'" )) ? toClean.substr( 1, toClean.length ) : toClean;
		toClean = (Utils.S.endsWith( toClean, "\"" ) || Utils.S.endsWith( toClean, "'" )) ? toClean.substr( 0, toClean.length - 1 ) : toClean;
		return toClean;
	}

	toString():string {
		var result:string = '';
		if ( this.mainKey ) result += this.mainKey + '=';
		result += this.mainValue;
		if ( this.secondaryKey || this.secondaryValue ) result += '; ';
		if ( this.secondaryKey ) result += this.secondaryKey + '=';
		if ( this.secondaryValue ) result += this.secondaryValue;
		return result;
	}
}

class Response {
	constructor( request:XMLHttpRequest ) {
		this.status = request.status;
		this.data = request.responseText;
		this.setHeaders( request );

		this.request = request;
	}

	status:number;
	data:string;
	headers:Map<string, Header>;
	request:XMLHttpRequest;


	private setHeaders( request:XMLHttpRequest ):void {
		var headersString = request.getAllResponseHeaders();
		if ( headersString ) this.headers = HeaderUtil.parseHeaders( headersString );
		else this.headers = new Map<string, Header>();
	}
}

interface ProcessedResponse<T> {
	result:T;
	response:Response;
}

//@formatter:off
export {
	StatusCode,
	HeaderUtil,
	Header,
	HeaderValue,
	ProcessedResponse,
	Response
};
//@formatter:on