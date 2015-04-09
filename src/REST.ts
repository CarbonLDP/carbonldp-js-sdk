/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
module REST {
	enum Method {
		OPTIONS,
		HEAD,
		GET,
		POST,
		PUT,
		PATCH,
		DELETE
	}

	export enum StatusCode {
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

	export class HTTPResponse {
		constructor( public statusCode:number, public request:XMLHttpRequest ) {}
	}

	function onLoad( resolve:( value:HTTPResponse | Thenable<HTTPResponse> ) => void, reject:( value:HTTPResponse ) => void, request:XMLHttpRequest ):()=>void {
		return () => {
			var response:HTTPResponse = new HTTPResponse( request.status, request );
			if ( request.status >= 200 && request.status <= 299 ) resolve( response );
			else reject( response );
		};
	}

	function onError( reject:( value:HTTPResponse ) => void, request:XMLHttpRequest ):()=>void {
		return () => {
			var response:HTTPResponse = new HTTPResponse( request.status, request );
			reject( response );
		};
	}

	export function get( url:string ) {
		return new Promise<HTTPResponse>(
			function ( resolve, reject ) {
				var request:XMLHttpRequest = new XMLHttpRequest();
				request.open( Method[ Method.GET ], url, true );

				// setHeaders( request, headers );

				request.onload = onLoad( resolve, reject, request );
				request.onerror = onError( reject, request );
				request.send();
			}
		);
	}

	export function post() {

	}
}

export = REST;