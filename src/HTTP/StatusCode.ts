/**
 * Enum with the HTTP/1.1 status codes.
 */
export enum StatusCode {
	/**
	 * Identifies the HTTP/1.1 100 status code.
	 */
	CONTINUE = 100,
	/**
	 * Identifies the HTTP/1.1 101 status code.
	 */
	SWITCHING_PROTOCOLS = 101,
	/**
	 * Identifies the HTTP/1.1 200 status code.
	 */
	OK = 200,
	/**
	 * Identifies the HTTP/1.1 201 status code.
	 */
	CREATED = 201,
	/**
	 * Identifies the HTTP/1.1 202 status code.
	 */
	ACCEPTED = 202,
	/**
	 * Identifies the HTTP/1.1 203 status code.
	 */
	NON_AUTHORITATIVE_INFORMATION = 203,
	/**
	 * Identifies the HTTP/1.1 204 status code.
	 */
	NO_CONTENT = 204,
	/**
	 * Identifies the HTTP/1.1 205 status code.
	 */
	RESET_CONTENT = 205,
	/**
	 * Identifies the HTTP/1.1 206 status code.
	 */
	PARTIAL_CONTENT = 206,
	/**
	 * Identifies the HTTP/1.1 300 status code.
	 */
	MULTIPLE_CHOICES = 300,
	/**
	 * Identifies the HTTP/1.1 301 status code.
	 */
	MOVED_PERMANENTLY = 301,
	/**
	 * Identifies the HTTP/1.1 302 status code.
	 */
	FOUND = 302,
	/**
	 * Identifies the HTTP/1.1 303 status code.
	 */
	SEE_OTHER = 303,
	/**
	 * Identifies the HTTP/1.1 304 status code.
	 */
	NOT_MODIFIED = 304,
	/**
	 * Identifies the HTTP/1.1 305 status code.
	 */
	USE_PROXY = 305,
	/**
	 * Identifies the HTTP/1.1 307 status code.
	 */
	TEMPORARY_REDIRECT = 307,
	/**
	 * Identifies the HTTP/1.1 400 status code.
	 */
	BAD_REQUEST = 400,
	/**
	 * Identifies the HTTP/1.1 401 status code.
	 */
	UNAUTHORIZED = 401,
	/**
	 * Identifies the HTTP/1.1 402 status code.
	 */
	PAYMENT_REQUIRED = 402,
	/**
	 * Identifies the HTTP/1.1 403 status code.
	 */
	FORBIDDEN = 403,
	/**
	 * Identifies the HTTP/1.1 404 status code.
	 */
	NOT_FOUND = 404,
	/**
	 * Identifies the HTTP/1.1 405 status code.
	 */
	METHOD_NOT_ALLOWED = 405,
	/**
	 * Identifies the HTTP/1.1 406 status code.
	 */
	NOT_ACCEPTABLE = 406,
	/**
	 * Identifies the HTTP/1.1 407 status code.
	 */
	PROXY_AUTHENTICATION_REQUIRED = 407,
	/**
	 * Identifies the HTTP/1.1 408 status code.
	 */
	REQUEST_TIME_OUT = 408,
	/**
	 * Identifies the HTTP/1.1 409 status code.
	 */
	CONFLICT = 409,
	/**
	 * Identifies the HTTP/1.1 410 status code.
	 */
	GONE = 410,
	/**
	 * Identifies the HTTP/1.1 411 status code.
	 */
	LENGTH_REQUIRED = 411,
	/**
	 * Identifies the HTTP/1.1 412 status code.
	 */
	PRECONDITION_FAILED = 412,
	/**
	 * Identifies the HTTP/1.1 413 status code.
	 */
	REQUEST_ENTITY_TOO_LARGE = 413,
	/**
	 * Identifies the HTTP/1.1 414 status code.
	 */
	REQUEST_URI_TOO_LARGE = 414,
	/**
	 * Identifies the HTTP/1.1 415 status code.
	 */
	UNSUPPORTED_MEDIA_TYPE = 415,
	/**
	 * Identifies the HTTP/1.1 416 status code.
	 */
	REQUESTED_RANGE_NOT_SATISFIABLE = 416,
	/**
	 * Identifies the HTTP/1.1 417 status code.
	 */
	EXPECTATION_FAILED = 417,
	/**
	 * Identifies the HTTP/1.1 500 status code.
	 */
	INTERNAL_SERVER_ERROR = 500,
	/**
	 * Identifies the HTTP/1.1 501 status code.
	 */
	NOT_IMPLEMENTED = 501,
	/**
	 * Identifies the HTTP/1.1 502 status code.
	 */
	BAD_GATEWAY = 502,
	/**
	 * Identifies the HTTP/1.1 503 status code.
	 */
	SERVICE_UNAVAILABLE = 503,
	/**
	 * Identifies the HTTP/1.1 504 status code.
	 */
	GATEWAY_TIME_OUT = 504,
	/**
	 * Identifies the HTTP/1.1 505 status code.
	 */
	HTTP_VERSION_NOT_SUPPORTED = 505,
}
