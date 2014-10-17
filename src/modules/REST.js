(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _rest = {};

	_rest.get = function ( uri, options ) {
		_shared.log( ">> REST.get()" );

		var defaultOptions = {
			authenticate: true
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		_shared.debug( "-- REST.get() > GET resource: %s, options: %o", uri, options );

		var headers = {
			"Accept": "application/ld+json"
		};

		if ( options.authenticate ) {
			headers = Carbon.Auth.setCredentialHeaders( headers );
		}

		var deferred = $.Deferred();
		$.ajax( {
			type   : 'GET',
			url    : uri,
			headers: headers
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				_shared.debug( "-- REST.get() > The request was successfull." );
				_shared.log( "-- REST.get() > Digesting response..." );
				Carbon.digestRDFResources( jsonResponse ).then(
					function ( rdfResources ) {
						_shared.debug( "<< REST.get() > The response was successfully digested." );
						deferred.resolve( rdfResources, jqXHR );
					}, function ( errorObject ) {
						_shared.error( "<< REST.get() > The response couldn't be digested." );
						deferred.reject( errorObject );
					}
				);
			}, function ( jqXHR, textStatus, errorThrown ) {
				_shared.error( "<< REST.get() > The request failed. Response: %o", jqXHR );
				deferred.reject();
			}
		);

		return deferred.promise();
	};

	_rest.post = function ( uri, body, options ) {
		_shared.log( ">> REST.post()" );

		var defaultOptions = {
			authenticate: true,
			headers     : null
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		_shared.debug( "-- REST.post() > POST uri: %s, body: %o, options: %o", uri, body, options );

		var headers = {
			"Accept"      : "application/ld+json",
			"Content-Type": "application/ld+json"
		};

		if ( options.authenticate ) {
			headers = Carbon.Auth.setCredentialHeaders( headers );
		}

		if ( options.headers ) {
			headers = $.extend( headers, options.headers );
		}

		var deferred = $.Deferred();
		$.ajax( {
			type       : 'POST',
			url        : uri,
			headers    : headers,
			crossDomain: true,
			data       : body
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				_shared.debug( "-- REST.post() > The request was successfull." );
				deferred.resolve( jsonResponse, jqXHR );
			}, function ( jqXHR, textStatus, errorThrown ) {
				_shared.error( "<< REST.post() > The request failed. Response: %o", jqXHR );
				deferred.reject();
			}
		);

		return deferred.promise();
	};

	_rest.head = function ( uri, options ) {
		_shared.log( ">> REST.head()" );

		var defaultOptions = {
			authenticate: true,
			headers     : null
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		_shared.debug( "-- REST.head() > URI: %s, options %o", uri, options );

		var headers = {
			"Accept"      : "application/ld+json",
			"Content-Type": "application/ld+json"
		};

		if ( options.authenticate ) {
			headers = Carbon.Auth.setCredentialHeaders( headers );
		}

		if ( options.headers ) {
			headers = $.extend( headers, options.headers );
		}

		var deferred = $.Deferred();
		$.ajax( {
			type       : 'HEAD',
			url        : uri,
			headers    : headers,
			crossDomain: true
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				var info = {};
				info.etag = jqXHR.getResponseHeader("etag");

				_shared.debug( "-- REST.head() > The request was successfull. Info: %o" );
				deferred.resolve( jqXHR, info );
			}, function ( jqXHR, textStatus, errorThrown ) {
				_shared.error( "<< REST.head() > The request failed. Response: %o", jqXHR );
				deferred.reject();
			}
		);

		return deferred.promise();
	};

	_rest.options = function ( uri, options ) {
		_shared.log( ">> REST.options()" );

		var defaultOptions = {
			authenticate: true,
			headers     : null
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		_shared.debug( "-- REST.options() > URI: %s, options %o", uri, options );

		var headers = {
			"Accept"      : "application/ld+json",
			"Content-Type": "application/ld+json"
		};

		if ( options.authenticate ) {
			headers = Carbon.Auth.setCredentialHeaders( headers );
		}

		if ( options.headers ) {
			headers = $.extend( headers, options.headers );
		}

		var deferred = $.Deferred();
		$.ajax( {
			type       : 'OPTIONS',
			url        : uri,
			headers    : headers,
			crossDomain: true
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				_shared.debug( "-- REST.options() > The request was successful." );

				var info = {};
				info.allows = getMethodsAllowed( jqXHR.getResponseHeader( "Allow" ) );

				deferred.resolve( jqXHR, info );
			}, function ( jqXHR, textStatus, errorThrown ) {
				_shared.error( "<< REST.options() > The request failed. Response: %o", jqXHR );
				deferred.reject();
			}
		);

		return deferred.promise();
	};

	function getMethodsAllowed( allowHeader ) {
		var allows = {
			GET    : false,
			HEAD   : false,
			OPTIONS: false,
			POST   : false,
			PUT    : false,
			PATCH  : false,
			DELETE : false
		};

		if ( ! _shared.isString( allowHeader ) ) return allows;

		var parts = allowHeader.split( "," );
		for ( var i = 0, length = parts.length; i < length; i ++ ) {
			var part = parts[i].trim().toUpperCase();
			if ( allows.hasOwnProperty( part ) ) {
				allows[part] = true;
			}
		}
		return allows;
	}

	_rest.patch = function ( uri, patchRequest, options ) {
		_shared.log( ">> REST.patch()" );

		var defaultOptions = {
			authenticate: true,
			headers     : null
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		_shared.debug( "-- REST.patch() > PATCH resource: %s, patchRequest: %o, options: %o", uri, patchRequest, options );

		var headers = {
			"Accept"      : "application/ld+json",
			"Content-Type": "application/ld+json"
		};

		if ( options.authenticate ) {
			headers = Carbon.Auth.setCredentialHeaders( headers );
		}

		if ( options.headers ) {
			headers = $.extend( headers, options.headers );
		}

		var deferred = $.Deferred();
		$.ajax( {
			type       : 'PATCH',
			url        : uri,
			headers    : headers,
			crossDomain: true,
			data       : patchRequest.toJsonLD()
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				_shared.debug( "-- REST.patch() > The request was successfull." );
				deferred.resolve( jqXHR );
			}, function ( jqXHR, textStatus, errorThrown ) {
				_shared.error( "<< REST.patch() > The request failed. Response: %o", jqXHR );
				deferred.reject();
			}
		);

		return deferred.promise();
	};

	Carbon.REST = _rest;
}( Carbon, $, jsonld, Map, _shared ));