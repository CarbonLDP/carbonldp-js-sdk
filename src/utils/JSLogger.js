define(
	[
		'src/utils/window', 'underscore'
	], function( window, _ ){
		'use strict';

		// TODO: Support different profiles

		var JSLogger = {};

		JSLogger.canShowErrors = (typeof window.console !== 'undefined' && typeof window.console.error !== 'undefined');
		JSLogger.canShowWarnings = (typeof window.console !== 'undefined' && typeof window.console.warn !== 'undefined');
		JSLogger.canShowDebug = (typeof window.console !== 'undefined' && typeof window.console.debug !== 'undefined');
		JSLogger.canShowLog = (typeof window.console !== 'undefined' && typeof window.console.log !== 'undefined');

		var _loggingLevel = 0;
		JSLogger.setLevel = function( level ) {
			if ( ! _.isNumber( level ) ) throw 'The logging level needs to be a number!';
			if ( level < 0 || level > 4 ) throw 'The logging level needs to be between 0 and 4';

			_loggingLevel = level;
		};

		var _logCallbacks = [];
		JSLogger.onLog = function ( callback ) {
			_logCallbacks.push( callback );
		};
		JSLogger.log = function () {
			if ( _loggingLevel < 4 ) return;

			for ( var i = 0, length = _logCallbacks.length; i < length; i ++ ) {
				var callback = _logCallbacks[i];
				if ( ! callback( arguments ) ) return;
			}

			if ( ! JSLogger.canShowLog ) return;

			window.console.log.apply( window.console, arguments );
		};

		var _debugCallbacks = [];
		JSLogger.onDebug = function ( callback ) {
			_debugCallbacks.push( callback );
		};
		JSLogger.debug = function () {
			if ( _loggingLevel < 3 ) return;

			for ( var i = 0, length = _debugCallbacks.length; i < length; i ++ ) {
				var callback = _debugCallbacks[i];
				if ( ! callback( arguments ) ) return;
			}

			if ( ! JSLogger.canShowDebug ) {
				if ( JSLogger.canShowLog ) window.console.log.apply( window.console, arguments );
				return;
			}

			window.console.debug.apply( window.console, arguments );
		};

		var _warnCallbacks = [];
		JSLogger.onWarn = function ( callback ) {
			_warnCallbacks.push( callback );
		};
		JSLogger.warn = function () {
			if ( _loggingLevel < 2 ) return;

			for ( var i = 0, length = _warnCallbacks.length; i < length; i ++ ) {
				var callback = _warnCallbacks[i];
				if ( ! callback( arguments ) ) return;
			}

			if ( ! JSLogger.canShowWarnings ) {
				if ( JSLogger.canShowLog ) window.console.log.apply( window.console, arguments );
				return;
			}

			window.console.warn.apply( window.console, arguments );
		};

		var _errorCallbacks = [];
		JSLogger.onError = function ( callback ) {
			_errorCallbacks.push( callback );
		};
		JSLogger.error = function () {
			if ( _loggingLevel < 1 ) return;

			for ( var i = 0, length = _errorCallbacks.length; i < length; i ++ ) {
				var callback = _errorCallbacks[i];
				if ( ! callback( arguments ) ) return;
			}

			if ( ! JSLogger.canShowErrors ) {
				if ( JSLogger.canShowLog ) window.console.log.apply( window.console, arguments );
				return;
			}

			window.console.error.apply( window.console, arguments );
		};

		return JSLogger;
	}
);