function hasFunction( object:Object, functionName:string ):boolean {
	return typeof object[ functionName ] === 'function';
}

function hasProperty( object:Object, property:string ):boolean {
	if ( ! object ) return false;
	return 'undefined' !== typeof object[ property ];
}

function hasPropertyDefined( object:Object, property:string ):boolean {
	return ! ! Object.getOwnPropertyDescriptor( object, property );
}

function isNull( value:any ) {
	return value === null;
}

function isArray( object:any ) {
	return Object.prototype.toString.call( object ) === '[object Array]';
}

function isString( string:any ) {
	return typeof string == 'string' || string instanceof String;
}

function isBoolean( boolean:any ) {
	return typeof boolean == 'boolean';
}

function isNumber( number:any ) {
	return typeof number == 'number' || number instanceof Number;
}

function isInteger( number:any ) {
	if ( ! isNumber( number ) )return false;
	return number % 1 == 0;
}

function isDouble( number:any ) {
	if ( ! isNumber( number ) ) return false;
	return number % 1 != 0;
}

function isDate( date:any ) {
	return typeof date == 'date' || date instanceof Date;
}

function isObject( object:any ) {
	return typeof object === 'object';
}

function isFunction( value:any ) {
	return typeof value === 'function';
}

function parseBoolean( value:string ):boolean {
	if ( ! isString( value ) ) return false;

	switch ( value.toLowerCase() ) {
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
}

function extend( ...target:Object[] ):Object {
	if ( arguments.length <= 1 ) return;
	for ( var i = 1, length = arguments.length; i < length; i ++ ) {
		var toMerge = arguments[ i ];
		if ( isObject( toMerge ) ) {
			for ( var name in toMerge ) {
				if ( toMerge.hasOwnProperty( name ) ) {
					target[ name ] = toMerge[ name ];
				}
			}
		}
	}
	return target;
}

class S {
	static startsWith( string:string, substring:string ):boolean {
		return string.lastIndexOf( substring, 0 ) === 0;
	}

	static endsWith( string:string, substring:string ):boolean {
		return string.indexOf( substring, string.length - substring.length ) !== - 1;
	}

	static contains( string:string, substring:string ):boolean {
		return string.indexOf( substring ) !== - 1;
	}
}

//@formatter:off
export {
	hasFunction,
	hasProperty,
	hasPropertyDefined,
	isNull,
	isArray,
	isString,
	isBoolean,
	isNumber,
	isInteger,
	isDouble,
	isDate,
	isObject,
	isFunction,
	parseBoolean,
	extend,
	S
};
//@foramtter:on