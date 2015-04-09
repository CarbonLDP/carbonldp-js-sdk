define(
	[], function() {
		'use strict';
		var utils = {};

		utils.hasFunction = function( object, functionName ) {
			return typeof object[ functionName ] === 'function';
		};

		utils.hasProperty = function( object, property ) {
			if( ! object ) return false;
			return 'undefined' !== typeof object[ property ];
		};

		utils.isNundefined = function( value ) {
			return value == null;
		};

		utils.isNull = function( value ) {
			return value === null;
		};
		utils.isUndefined = function( value ) {
			return value === undefined;
		};

		utils.isArray = function( object ) {
			return Object.prototype.toString.call( object ) === '[object Array]';
		};

		utils.isString = function( string ) {
			return typeof string == 'string' || string instanceof String;
		};

		utils.isBoolean = function( boolean ) {
			return typeof boolean == 'boolean';
		};

		utils.isNumber = function( number ) {
			return typeof number == 'number' || number instanceof Number;
		};

		utils.isInteger = function( number ) {
			if( ! utils.isNumber( number ) ) return false;
			return number % 1 == 0;
		};

		utils.isDouble = function( number ) {
			if( ! utils.isNumber( number ) ) return false;
			return number % 1 != 0;
		};

		utils.isDate = function( date ) {
			return typeof date == 'date' || date instanceof Date;
		};

		utils.isObject = function( object ) {
			return typeof object === 'object';
		};

		utils.isFunction = function( value ) {
			return typeof value === 'function';
		};

		utils.stringStartsWith = function( string, substring ) {
			return string.lastIndexOf( substring, 0 ) === 0;
		};

		utils.stringEndsWith = function( string, substring ) {
			return string.indexOf( substring, string.length - substring.length ) !== - 1;
		};

		utils.stringContains = function( string, substring ) {
			var index = string.indexOf( substring );
			return index != -1;
		};

		utils.slugify = function( slug ) {
			slug = slug
				.replace( /^\s\s*/, '' ) // Trim start
				.replace( /\s\s*$/, '' ) // Trim end
				.replace( /[^a-zA-Z0-9- ]/g, '' ) // Remove non alpha numeric symbols
				.replace( / +/g, '-' ) // Change spaces into single hyphens
			;
			return slug;
		};

		utils.parseBoolean = function( string ) {
			if( ! utils.isString( string ) ) return false;

			switch( string.toLowerCase() ) {
				case "true":
				case "yes":
				case "y":
				case "1":
					return true;
				case "false":
				case "no":
				case "n":
				case "0":
				default:
					return false;
			}
		};

		utils.extend = function( target ) {
			if( arguments.length <= 1 ) return;
			for( var i = 1, length = arguments.length; i < length; i ++ ) {
				var toMerge = arguments[ i ];
				if( utils.isObject( toMerge ) ) {
					for( var name in toMerge ) {
						if( toMerge.hasOwnProperty( name ) ) {
							target[ name ] = toMerge[ name ];
						}
					}
				}
			}
			return target;
		};

		return utils;
	}
);