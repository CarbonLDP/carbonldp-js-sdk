(function ( Carbon, $, jsonld, Map, _shared ) {
	var _uri = {};

	var _uriPattern = new RegExp(
			'^(https?:\\/\\/)?' + // Protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain Name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and Path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
			'(\\#[-a-z\\d_]*)?$' // Fragment Locator
		, 'i' );

	_uri.isURI = function ( uri ) {
		if ( ! isString( uri ) ) return false;

		return _uriPattern.test( uri );
	};

	_uri.isIndependentlyResolvable = function ( uri ) {
		if ( ! isString( uri ) ) throw 'Not a String!';

		return ! _shared.stringContains( uri, Carbon.INLINE_RESOURCE_SIGN );
	};

	_uri.getGlobalBase = function ( uri ) {
		if ( ! isString( uri ) ) throw 'Not a String!';
		var index = uri.indexOf( Carbon.INLINE_RESOURCE_SIGN );
		if ( index == - 1 ) return uri;

		return uri.substring( 0, index - 1 );
	};
	_uri.getSlug = function ( uri ) {
		if ( ! isString( uri ) ) throw 'Not a String!';
		var tempURI = _shared.stringEndsWith( uri, "/" ) ? uri.substring( 0, uri.length - 1 ) : uri;
		var index = tempURI.lastIndexOf( "/" );
		if ( index == - 1 ) return uri;

		return uri.substring( 0, index - 1 );
	};
	_uri.getLocalSlug = function ( uri ) {
		if ( ! isString( uri ) ) throw 'Not a String!';
		var index = uri.indexOf( Carbon.INLINE_RESOURCE_SIGN );
		if ( index == - 1 ) return null;

		return uri.substring( index + 1, uri.length - 1 );
	};

	return _uri;
}( Carbon, $, jsonld, Map, _shared ));