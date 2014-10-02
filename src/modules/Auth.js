(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _authHeaders = {
		authMethod: "X-Carbon-Auth-Method",
		username  : "X-Carbon-Agent-Username",
		password  : "X-Carbon-Agent-Password",
		key       : "X-Carbon-Agent-Key",
		token     : "X-Carbon-Agent-Token"
	};

	var _auth = {};

	var _authMethods = ['token', 'basic', 'username', 'key'];
	var _method = null;
	_auth.getMethod = function () {
		return _method;
	};
	_auth.setMethod = function ( method ) {
		if ( method === null ) {
			_method = null;
			return;
		}
		if ( $.inArray( method, _authMethods ) == - 1 ) {
			console.error( '<< Carbon.Auth.setMethod() > The method: "' + method + '" is not supported.' );
			throw 'Method not supported';
		}
		_method = method;
	};

	var _credentials = {
		token   : null,
		username: {
			username: null,
			password: null
		},
		key     : null
	};

	_auth.login = function ( username, password, remember ) {
		remember = typeof remember !== 'undefined' ? remember : false;

		var headers = {
			"Authorization": "Basic " + btoa( username + ":" + password ),
			"Accept"       : "application/ld+json"
		};

		if ( remember ) {
			headers["Prefer"] = "return=\"cs:Cookie\"";
		}

		var deferred = $.Deferred();

		$.ajax( {
			type   : 'GET',
			url    : Carbon.getAPIRequestURL() + 'auth/token',
			headers: headers
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				Carbon.digestRDFResources( jsonResponse ).then(
					function ( rdfResources ) {
						var tokenResource = Carbon.Document.getResourceOfType( _auth.Token.class, rdfResources );
						if ( ! tokenResource ) {
							// TODO: Fail
							deferred.reject();
						} else {
							Carbon.Auth.Token.injectMethods( tokenResource );

							_auth.setToken( tokenResource );
							deferred.resolve();
						}
					}, function ( errorObject ) {
						// TODO: FT
						deferred.reject( errorObject );
					}
				);
			}, function ( jqXHR, textStatus, errorThrown ) {
				// TODO: FT
				deferred.reject();
			}
		);

		return deferred;
	};

	_auth.hasCredentials = function () {
		var method = _auth.getMethod();
		if ( method === null ) return false;

		switch ( method ) {
			case "basic":
			case "username":
				var username = _credentials.username.username;
				var password = _credentials.username.password;

				if ( username === null ) return false;
				if ( password === null ) return false;

				break;
			case "token":
				var token = _credentials.token;

				if ( token === null ) return false;
				break;
			case "key":
				var key = _credentials.key;

				if ( key === null ) return false;
				break;
			default:
				return false;
		}
		return true;
	};

	_auth.eraseCredentials = function () {
		Carbon.Auth.setMethod( null );
		_credentials = {
			token   : null,
			username: {
				username: null,
				password: null
			},
			key     : null
		};
	};

	_auth.setToken = function ( tokenResource ) {
		var tokenKey = tokenResource.getKey();
		if ( tokenKey === null ) {
			// The token resource didn't have a key
			throw 'The token doesn\'t contain a key';
		}

		_auth.setMethod( 'token' );
		_credentials.token = tokenKey;
	};

	_auth.setBasicCredentials = function ( username, password ) {
		if ( ! username || ! password ) return;
		_auth.setMethod( 'basic' );
		_credentials.username.username = username;
		_credentials.username.password = password;
	};

	_auth.setCredentialHeaders = function ( headers ) {
		var method = _auth.getMethod();
		if ( method === null ) return headers;

		var authHeaders = {};
		switch ( method ) {
			case "token":
				var token = _credentials.token;

				if ( token === null ) break;

				authHeaders[_authHeaders.authMethod] = method;
				authHeaders[_authHeaders.token] = token;
				break;
			default:
				break;
		}

		$.extend( headers, authHeaders );
		return headers;
	};

	_auth.registerAgent = function ( agent ) {
		var headers = {
			"Content-Type": "application/ld+json",
			"Accept"      : "application/ld+json"
		};

		headers = Carbon.Auth.setCredentialHeaders( headers );

		return $.ajax( {
			type   : 'POST',
			url    : Carbon.getAPIRequestURL() + 'agents',
			headers: headers,
			data   : JSON.stringify( agent )
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				return Carbon.digestRDFResources( jsonResponse );
			}, function ( jqXHR, textStatus, errorThrown ) {
				// TODO: FT
			}
		).then(
			function ( ldpResources ) {
				var deferred = $.Deferred();

				Carbon.Auth.Agent.injectMethods( ldpResources );

				deferred.resolve( ldpResources );
				return deferred.promise();
			}, function ( errorObject ) {
				// TODO: FT
			}
		);
	};

	Carbon.Auth = _auth;
}( Carbon, $, jsonld, Map, _shared ));