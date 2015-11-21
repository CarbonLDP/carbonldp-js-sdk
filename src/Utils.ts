/// <reference path="../typings/es6/es6.d.ts" />

function hasFunction( object:Object, functionName:string ):boolean {
	return typeof object[ functionName ] === "function";
}

function hasProperty( object:Object, property:string ):boolean {
	if ( ! object ) return false;
	return "undefined" !== typeof object[ property ];
}

function hasPropertyDefined( object:Object, property:string ):boolean {
	return ! ! Object.getOwnPropertyDescriptor( object, property );
}

function isNull( value:any ):boolean {
	return value === null;
}

function isArray( object:any ):boolean {
	return object instanceof Array;
}

function isString( string:any ):boolean {
	return typeof string === "string" || string instanceof String;
}

function isBoolean( boolean:any ):boolean {
	return typeof boolean === "boolean";
}

function isNumber( number:any ):boolean {
	return typeof number === "number" || number instanceof Number;
}

function isInteger( number:any ):boolean {
	if ( ! isNumber( number ) )return false;
	return number % 1 === 0;
}

function isDouble( number:any ):boolean {
	if ( ! isNumber( number ) ) return false;
	return number % 1 !== 0;
}

function isDate( date:any ):boolean {
	return typeof date === "date" || date instanceof Date;
}

function isObject( object:any ):boolean {
	return typeof object === "object" && ( ! ! object );
}

function isFunction( value:any ):boolean {
	return typeof value === "function";
}

function isMap( value:any ):boolean {
	return (
		isObject( value ) &&

		hasFunction( value, "get" ) &&
		hasFunction( value, "has" ) &&
		hasProperty( value, "size" ) &&
		hasFunction( value, "clear" ) &&
		hasFunction( value, "delete" ) &&
		hasFunction( value, "entries" ) &&
		hasFunction( value, "forEach" ) &&
		hasFunction( value, "get" ) &&
		hasFunction( value, "has" ) &&
		hasFunction( value, "keys" ) &&
		hasFunction( value, "set" ) &&
		hasFunction( value, "values" )
	);
}

function parseBoolean( value:string ):boolean {
	if ( ! isString( value ) ) return false;

	/* tslint:disable: no-switch-case-fall-through */
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
	/* tslint:enable: no-switch-case-fall-through */
}

function extend( target:Object, ...objects:Object[] ):Object {
	if ( arguments.length <= 1 ) return target;
	for ( let i:number = 0, length:number = arguments.length; i < length; i ++ ) {
		let toMerge:Object = objects[ i ];
		for ( let name in toMerge ) {
			if ( toMerge.hasOwnProperty( name ) ) {
				target[ name ] = toMerge[ name ];
			}
		}
	}
	return target;
}

function forEachOwnProperty( object:Object, action:( name:string, value:any ) => void ):void {
	if ( ! isObject( object ) ) throw new Error( "IllegalArgument" );
	for ( let name in object ) {
		if ( object.hasOwnProperty( name ) ) {
			action( name, object[ name ] );
		}
	}
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

class A {
	static from<T>( iterator:Iterator<T> ):Array<T> {
		let array:Array<T> = [];
		let next:IteratorValue<T> = iterator.next();
		while ( ! next.done ) {
			array.push( next.value );
			next = iterator.next();
		}
		return array;
	}

	static joinWithoutDuplicates<T>( ...arrays:Array<Array<T>> ):Array<T> {
		let result:Array<T> = arrays[ 0 ].slice();

		for ( let i:number = 1, length:number = arrays.length; i < length; i ++ ) {
			result = result.concat( arrays[ i ].filter( function ( item:T ):boolean {
				return result.indexOf( item ) < 0;
			} ) );
		}

		return result;
	}
}

class M {
	static from<V>( object:Object ):Map<string, V> {
		let map:Map<string, V> = new Map<string, V>();
		forEachOwnProperty( object, ( name:string, value:any ) => {
			map.set( name, value );
		} );
		return map;
	}

	static extend<K, V>( toExtend:Map<K, V>, ...extenders:Map<K, V>[] ):Map<K, V> {
		for ( let i:number = 0, length:number = extenders.length; i < length; i ++ ) {
			let extender:Map<K, V> = extenders[ i ];
			let values:Iterator<Array<(K|V)>> = extender.entries();

			let next:IteratorValue<Array<(K|V)>> = values.next();
			while ( ! next.done ) {
				let entry:Array<(K|V)> = next.value;
				let key:K = <K> entry[ 0 ];
				let value:V = <V> entry[ 1 ];
				if ( ! toExtend.has( key ) ) toExtend.set( key, value );

				next = values.next();
			}
		}
		return toExtend;
	}
}

class UUID {
	private static regExp:RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

	public static is( uuid:string ):boolean {
		return UUID.regExp.test( uuid );
	}

	public static generate():string {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( c:string ):string {
			let r:number = Math.random() * 16 | 0;
			let v:number = c === "x" ? r : (r & 0x3 | 0x8);
			return v.toString( 16 );
		} );
	}
}

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
	isMap,
	parseBoolean,
	extend,
	forEachOwnProperty,
	S,
	A,
	M,
	UUID
};
