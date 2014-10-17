_shared = (function ( _shared ) {

	_shared.version = "0.7.0";
	_shared.requestProtocol = "https";
	_shared.uriProtocol = "http";
	_shared.domain = "carbonldp.com";
	_shared.endpoints = {
		apps: 'apps/'
	};

	// 0 - off
	// 1 - errors
	// 2 - errors / warnings
	// 3 - errors / warnings / debug
	// 4 - errors / warnings / debug / trace
	_shared.loggingLevel = 0;
	_shared.canShowErrors = (typeof console !== 'undefined' && typeof console.error !== 'undefined');
	_shared.canShowWarnings = (typeof console !== 'undefined' && typeof console.warn !== 'undefined');
	_shared.canShowDebug = (typeof console !== 'undefined' && typeof console.debug !== 'undefined');
	_shared.canShowLog = (typeof console !== 'undefined' && typeof console.log !== 'undefined');

	_shared.appSlug = null;
	_shared.api = null;

	_shared.hasFunction = function ( object, functionName ) {
		return typeof object[functionName] === 'function';
	};

	_shared.hasProperty = function ( object, property ) {
		if ( ! object ) return false;
		return 'undefined' !== typeof object[property];
	};

	_shared.isNundefined = function ( value ) {
		return value == null;
	};

	_shared.isNull = function ( value ) {
		return value === null;
	};
	_shared.isUndefined = function ( value ) {
		return value === undefined;
	};

	_shared.isArray = function ( object ) {
		return Object.prototype.toString.call( object ) === '[object Array]';
	};

	_shared.isString = function ( string ) {
		return typeof string == 'string' || string instanceof String;
	};

	_shared.isBoolean = function ( boolean ) {
		return typeof boolean == 'boolean';
	};

	_shared.isNumber = function ( number ) {
		return typeof number == 'number' || number instanceof Number;
	};

	_shared.isInteger = function ( number ) {
		if ( ! _shared.isNumber( number ) ) return false;
		return number % 1 == 0;
	};

	_shared.isDouble = function ( number ) {
		if ( ! _shared.isNumber( number ) ) return false;
		return number % 1 != 0;
	};

	_shared.isDate = function ( date ) {
		return typeof date == 'date' || date instanceof Date;
	};

	_shared.stringStartsWith = function ( string, substring ) {
		return string.lastIndexOf( substring, 0 ) === 0;
	};

	_shared.stringEndsWith = function ( string, substring ) {
		return string.indexOf( substring, string.length - substring.length ) !== - 1;
	};

	_shared.stringContains = function ( string, substring ) {
		return ~ string.indexOf( substring );
	};

	_shared.slugify = function ( slug ) {
		slug = slug
			.replace( /^\s\s*/, '' ) // Trim start
			.replace( /\s\s*$/, '' ) // Trim end
			.replace( /[^a-zA-Z0-9- ]/g, '' ) // Remove non alpha numeric symbols
			.replace( / +/g, '-' ) // Change spaces into single hyphens
		;
		return slug;
	};

	_shared.parseBoolean = function ( string ) {
		switch ( string.toLowerCase() ) {
			case "true":
			case "yes":
			case "1":
				return true;
			case "false":
			case "no":
			case "0":
			case null:
				return false;
			default:
				return Boolean( string );
		}
	};

	_shared.parseETag = function ( etag ) {
		// Weak ETag
		if ( _shared.stringStartsWith( etag, 'W' ) ) {
			etag = etag.substring( 3, etag.length - 1 );
		}
		return Date.parse( etag );
	};


	_shared.getURIFromURL = function ( uri ) {
		if ( ! _shared.requestProtocol || ! _shared.uriProtocol ) throw "Carbon hasn't been initialized to support relative uris.";
		if ( ! _shared.stringStartsWith( uri, _shared.requestProtocol ) ) return uri;
		return uri.replace( _shared.requestProtocol, _shared.uriProtocol );
	};
	_shared.getRequestURL = function ( uri ) {
		if ( ! _shared.requestProtocol || ! _shared.uriProtocol ) throw "Carbon hasn't been initialized to support relative uris.";
		if ( _shared.stringStartsWith( uri, _shared.requestProtocol ) ) return uri;
		return uri.replace( _shared.uriProtocol, _shared.requestProtocol );
	};

	// Will be used as a "trace" level of debugging
	_shared.log = function () {
		if ( _shared.loggingLevel < 4 || ! _shared.canShowLog ) {
			return;
		}
		console.log.apply( console, arguments );
	};

	_shared.debug = function () {
		if ( _shared.loggingLevel >= 3 ) {
			if ( ! _shared.canShowDebug ) {
				if ( _shared.canShowLog ) console.log.apply( console, arguments );
				else return;
			}
		}
		console.debug.apply( console, arguments );
	};

	_shared.warn = function () {
		if ( _shared.loggingLevel < 2 || ! _shared.canShowWarnings ) {
			return;
		}
		console.warn.apply( console, arguments );
	};

	_shared.error = function () {
		if ( _shared.loggingLevel < 1 || ! _shared.canShowErrors ) {
			return;
		}
		console.error.apply( console, arguments );
	};

	return _shared;
}( _shared ) );