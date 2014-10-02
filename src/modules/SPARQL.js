(function ( Carbon, $, Map ) {
	'use strict';

	var _sparql = {};

	_sparql.ask = function ( url, query ) {
		if ( ! isString( url ) ) throw "The URL must be a String!";
		if ( ! isString( query ) ) throw "The query must be a String!";

		var headers = {};
		headers["Content-Type"] = "application/sparql-query";
		headers["Accept"] = "application/json; q=0.8, application/ld+json; q=0.2";

		var deferred = $.Deferred();

		Carbon.REST.post( url, query, {
			headers: headers
		} ).then(
			function ( jsonResponse, jqXHR ) {
				if ( typeof jsonResponse !== 'boolean' ) {
					// TODO: FT
					deferred.reject();
					return;
				}

				deferred.resolve( jsonResponse );
			}, function ( errorResponse ) {
				// TODO: FT
				deferred.reject( errorResponse );
			}
		);

		return deferred;
	};
	_sparql.select = function ( url, query ) {
		if ( ! isString( url ) ) throw "The URL must be a String!";
		if ( ! isString( query ) ) throw "The query must be a String!";

		var headers = {};
		headers["Content-Type"] = "application/sparql-query";
		headers["Accept"] = "application/sparql-results+json; q=0.8, application/ld+json; q=0.2";

		var deferred = $.Deferred();

		Carbon.REST.post( url, query, {
			headers: headers
		} ).then(
			function ( jsonResponse, jqXHR ) {
				if ( ! Carbon.SPARQL.ResultSet.isResultSet( jsonResponse ) ) {
					// TODO: FT
					deferred.reject();
					return;
				}
				Carbon.SPARQL.ResultSet.injectMethods( jsonResponse );

				deferred.resolve( jsonResponse );
			}, function ( errorResponse ) {
				// TODO: FT
				deferred.reject( errorResponse );
			}
		);

		return deferred;
	};
	_sparql.describe = function () {
		// TODO
	};
	_sparql.construct = function () {
		// TODO
	};
	_sparql.update = function () {
		// TODO
	};

	Carbon.SPARQL = _sparql;
}( Carbon, $, Map ));