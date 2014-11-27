define(
	[
		'bluebird', 'jsonld', 'Carbon/utils'
	], function( Promise, jsonld, utils ) {
		'use strict';
		var REST = {};

		function setHeaders( request, headers ) {
			for( var name in headers ) {
				if( headers.hasOwnProperty( name ) ) {
					request.setRequestHeader( name, headers[ name ] );
				}
			}
		}

		function createBasicAuthHeader( username, password ) {
			return 'Basic ' + atob( username + ':' + password );
		}

		function requestWasSuccessful( request ) {
			return request.status >= 200 && request.status < 400;
		}

		function getHTTPError( statusCode ) {
			switch( statusCode ) {
				case 400:
					return new REST.BadRequestError();
				case 401:
					return new REST.UnauthorizedError();
				case 403:
					return new REST.ForbiddenError();
				case 404:
					return new REST.NotFoundError();
				case 406:
					return new REST.NotAcceptableError();
				case 409:
					return new REST.ConflictError();
				case 412:
					return new REST.PreconditionFailedError();
				case 415:
					return new REST.UnsupportedMediaType();
				case 428:
					return new REST.PreconditionRequiredError();
				case 429:
					return new REST.TooManyRequests();
				case 500:
					return new REST.InternalServerError();
				case 501:
					return new REST.NotImplemented();
				case 502:
					return new REST.BadGatewayError();
				case 503:
					return new REST.ServiceUnavailable();
				case 504:
					return new REST.GatewayTimeoutError();
				default:
					return new REST.UnknownError();
			}
		}

		REST.get = function( url, options ) {
			options = utils.isObject( options ) ? options : {};
			var defaultOptions = {
				headers: {}
			};
			var settings = utils.extend( {}, defaultOptions, options );

			var defaultHeaders = {
				'Accept': 'application/ld+json; charset=UTF-8'
			};
			var headers = utils.extend( {}, defaultHeaders, settings.headers );

			return new Promise(
				function( resolve ) {
					var request = new XMLHttpRequest();
					request.open( 'GET', url, true );

					setHeaders( request, headers );

					request.onload = function() {
						// Connection successful
						if( requestWasSuccessful( request ) ) {
							var jsonLDDocument = JSON.parse( request.responseText );
							var processor = new jsonld.JsonLdProcessor();
							processor.expand( jsonLDDocument ).then(
								function( jsonLDObjects ) {
									resolve( jsonLDObjects, request );
								}, function() {
									throw new REST.ParserError();
								}
							);
						} throw getHTTPError(request.status);
					};

					request.onerror = function() {
						// TODO: Get information of the error
						throw new REST.UnknownError();
					};

					request.send();
				}
			);
		};

		REST.post = function( url, body, options ) {
			options = utils.isObject( options ) ? options : {};
			var defaultOptions = {
				headers: {}
			};
			var settings = utils.extend( {}, defaultOptions, options );

			var defaultHeaders = {

			};
			var headers = utils.extend( {}, defaultHeaders, settings.headers );

			return new Promise(
				function( resolve ) {
					var request = new XMLHttpRequest();
					request.open( 'POST', url, true );

					setHeaders( request, headers );

					request.onload = function() {
						// Connection was successful
						if( requestWasSuccessful( request ) ) {
							// TODO: FT
							resolve( request );
						} throw getHTTPError(request.status);
					};
				}
			);
		};

		// --- 4xx
		// 400 - Bad Request
		REST.BadRequestError = function() {
			this.name = 'BadRequestError';
			Error.captureStackTrace( this, REST.BadRequestError );
		};
		REST.BadRequestError.prototype = Object.create( Error.prototype );
		REST.BadRequestError.prototype.constructor = REST.BadRequestError;

		// 401 - Unauthorized
		REST.UnauthorizedError = function() {
			this.name = 'UnauthorizedError';
			Error.captureStackTrace( this, REST.UnauthorizedError );
		};
		REST.UnauthorizedError.prototype = Object.create( Error.prototype );
		REST.UnauthorizedError.prototype.constructor = REST.UnauthorizedError;

		// 403 - Forbidden
		REST.ForbiddenError = function() {
			this.name = 'ForbiddenError';
			Error.captureStackTrace( this, REST.ForbiddenError );
		};
		REST.ForbiddenError.prototype = Object.create( Error.prototype );
		REST.ForbiddenError.prototype.constructor = REST.ForbiddenError;

		// 404 - Not Found
		REST.NotFoundError = function() {
			this.name = 'NotFoundError';
			Error.captureStackTrace( this, REST.NotFoundError );
		};
		REST.NotFoundError.prototype = Object.create( Error.prototype );
		REST.NotFoundError.prototype.constructor = REST.NotFoundError;

		// 406 - Not Acceptable
		REST.NotAcceptableError = function() {
			this.name = 'NotAcceptableError';
			Error.captureStackTrace( this, REST.NotAcceptableError );
		};
		REST.NotAcceptableError.prototype = Object.create( Error.prototype );
		REST.NotAcceptableError.prototype.constructor = REST.NotAcceptableError;

		// 409 - Conflict
		REST.ConflictError = function() {
			this.name = 'ConflictError';
			Error.captureStackTrace( this, REST.ConflictError );
		};
		REST.ConflictError.prototype = Object.create( Error.prototype );
		REST.ConflictError.prototype.constructor = REST.ConflictError;

		// 412 - Precondition Failed
		REST.PreconditionFailedError = function() {
			this.name = 'PreconditionFailedError';
			Error.captureStackTrace( this, REST.PreconditionFailedError );
		};
		REST.PreconditionFailedError.prototype = Object.create( Error.prototype );
		REST.PreconditionFailedError.prototype.constructor = REST.PreconditionFailedError;

		// 415 - Unsupported Media Type
		REST.UnsupportedMediaType = function() {
			this.name = 'UnsupportedMediaType';
			Error.captureStackTrace( this, REST.UnsupportedMediaType );
		};
		REST.UnsupportedMediaType.prototype = Object.create( Error.prototype );
		REST.UnsupportedMediaType.prototype.constructor = REST.UnsupportedMediaType;

		// 428 - Precondition Required
		REST.PreconditionRequiredError = function() {
			this.name = 'PreconditionRequiredError';
			Error.captureStackTrace( this, REST.PreconditionRequiredError );
		};
		REST.PreconditionRequiredError.prototype = Object.create( Error.prototype );
		REST.PreconditionRequiredError.prototype.constructor = REST.PreconditionRequiredError;

		// 429 - Too Many Requests
		REST.TooManyRequests = function() {
			this.name = 'TooManyRequests';
			Error.captureStackTrace( this, REST.TooManyRequests );
		};
		REST.TooManyRequests.prototype = Object.create( Error.prototype );
		REST.TooManyRequests.prototype.constructor = REST.TooManyRequests;

		// --- End: 4xx
		// --- 5xx

		// 500 - Internal Server Error
		REST.InternalServerError = function() {
			this.name = 'InternalServerError';
			Error.captureStackTrace( this, REST.InternalServerError );
		};
		REST.InternalServerError.prototype = Object.create( Error.prototype );
		REST.InternalServerError.prototype.constructor = REST.InternalServerError;

		// 501 - Not Implemented
		REST.NotImplemented = function() {
			this.name = 'NotImplemented';
			Error.captureStackTrace( this, REST.NotImplemented );
		};
		REST.NotImplemented.prototype = Object.create( Error.prototype );
		REST.NotImplemented.prototype.constructor = REST.NotImplemented;

		// 502 - Bad Gateway
		REST.BadGatewayError = function() {
			this.name = 'BadGatewayError';
			Error.captureStackTrace( this, REST.BadGatewayError );
		};
		REST.BadGatewayError.prototype = Object.create( Error.prototype );
		REST.BadGatewayError.prototype.constructor = REST.BadGatewayError;

		// 503 - Service Unavailable
		REST.ServiceUnavailable = function() {
			this.name = 'ServiceUnavailable';
			Error.captureStackTrace( this, REST.ServiceUnavailable );
		};
		REST.ServiceUnavailable.prototype = Object.create( Error.prototype );
		REST.ServiceUnavailable.prototype.constructor = REST.ServiceUnavailable;

		// 504 - Gateway Timeout
		REST.GatewayTimeoutError = function() {
			this.name = 'GatewayTimeoutError';
			Error.captureStackTrace( this, REST.GatewayTimeoutError );
		};
		REST.GatewayTimeoutError.prototype = Object.create( Error.prototype );
		REST.GatewayTimeoutError.prototype.constructor = REST.GatewayTimeoutError;

		// --- End: 5xx

		REST.ParserError = function() {
			this.name = 'ParserError';
			Error.captureStackTrace( this, REST.ParserError );
		};
		REST.ParserError.prototype = Object.create( Error.prototype );
		REST.ParserError.prototype.constructor = REST.ParserError;

		REST.UnknownError = function() {
			this.name = 'UnknownError';
			Error.captureStackTrace( this, REST.UnknownError );
		};
		REST.UnknownError.prototype = Object.create( Error.prototype );
		REST.UnknownError.prototype.constructor = REST.UnknownError;

		return REST;
	}
);