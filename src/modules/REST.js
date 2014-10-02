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