/**
 * Checks if the object has a property with that name and if it that property is a function.
 * @param object
 * @param functionName
 */
export function hasFunction( object:Object, functionName:string ):boolean {
	return typeof object[ functionName ] === "function";
}

/**
 * Checks if the object has a property with that name.
 * @param object
 * @param property
 */
export function hasProperty( object:Object, property:string ):boolean {
	if( !object ) return false;
	return isDefined( object[ property ] );
}

/**
 * Checks if an object has a property defined under that name (even if its value is undefined).
 * @param object
 * @param property
 */
export function hasPropertyDefined( object:Object, property:string ):boolean {
	if( !object ) return false;
	return !!Object.getOwnPropertyDescriptor( object, property );
}

/**
 * Checks if the value passed is defined.
 * @param value
 */
export function isDefined( value:any ):boolean {
	return void 0 !== value;
}

/**
 * Checks if the value passed is null.
 * @param value
 */
export function isNull( value:any ):value is null {
	return value === null;
}

/**
 * Checks if the value passed is an array.
 * @param object
 */
export function isArray( object:any ):object is Array<any> {
	return Array.isArray( object );
}

/**
 * Checks if the value passed is a string.
 * @param value
 */
export function isString( value:any ):value is string {
	return typeof value === "string" || value instanceof String;
}

/**
 * Checks if the value passed is a boolean.
 * @param value
 */
export function isBoolean( value:any ):value is boolean {
	return typeof value === "boolean";
}

/**
 * Checks if the value passed is a number.
 * @param value
 */
export function isNumber( value:any ):value is number {
	return typeof value === "number" || value instanceof Number;
}

/**
 * Checks if the value passed is an integer.
 * @param value
 */
export function isInteger( value:any ):boolean {
	if( !isNumber( value ) ) return false;
	return value % 1 === 0;
}

/**
 * Checks if the value passed is a double.
 * @param value
 */
export function isDouble( value:any ):boolean {
	if( !isNumber( value ) ) return false;
	return value % 1 !== 0;
}

/**
 * Checks if the value passed is a Date object.
 * @param date
 */
export function isDate( date:any ):date is Date {
	return date instanceof Date || (typeof date === "object" && Object.prototype.toString.call( date ) === "[object Date]");
}

/**
 * Checks if the value passed is a existing object.
 * @param object
 */
export function isObject( object:any ):object is object {
	return typeof object === "object" && (!!object);
}

export function isPlainObject( object:Object ):boolean {
	return isObject( object )
		&& !isArray( object )
		&& !isDate( object )
		&& !isMap( object )
		&& !(typeof Blob !== "undefined" && object instanceof Blob)
		&& !(Object.prototype.toString.call( object ) === "[object Set]");
}

/**
 * Checks if the value passed is a function.
 * @param value
 */
export function isFunction( value:any ):value is Function {
	return typeof value === "function";
}

/**
 * Checks if the value passed is an ES6 Map.
 * @param value
 */
export function isMap( value:any ):boolean {
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

/**
 * Parses a string into a boolean.
 * @param value
 */
export function parseBoolean( value:string ):boolean {
	if( !isString( value ) ) return false;

	/* tslint:disable: no-switch-case-fall-through */
	switch( value.toLowerCase() ) {
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

export function promiseMethod<T>( fn?:() => T | Promise<T> ):Promise<T> {
	return new Promise<T>( resolve => resolve( fn ? fn() : void 0 ) );
}

/**
 * Utility functions related to Arrays.
 */
export class ArrayUtils {
	/**
	 * Collects the values of an ES6 iterator and returns an array.
	 * @param iterator
	 */
	static from<T>( iterator:Iterator<T> ):Array<T> {
		let array:Array<T> = [];
		let next:IteratorResult<T> = iterator.next();
		while( !next.done ) {
			array.push( next.value );
			next = iterator.next();
		}
		return array;
	}

	/**
	 * Takes two or more arrays and joins them while removing duplicates.
	 * @param arrays Every array to merge.
	 */
	static joinWithoutDuplicates<T>( ...arrays:Array<Array<T>> ):Array<T> {
		let result:Array<T> = arrays[ 0 ].slice();

		for( let i:number = 1, length:number = arrays.length; i < length; i ++ ) {
			result = result.concat( arrays[ i ].filter( function( item:T ):boolean {
				return result.indexOf( item ) < 0;
			} ) );
		}

		return result;
	}
}

/**
 * Utility functions related to objects.
 */
export class ObjectUtils {

	/**
	 * Extends the target element making a shallow or deep copy of the properties in the source object, depending of the configuration specified.
	 * @param target The object to extend.
	 * @param source The object to copy.
	 * @param config Object that indicates if the arrays or objects must be copied or not. By default, arrays and objects will not be deep copied.
	 * @returns The extended object provided.
	 */
	static extend<T extends object, W extends object>( target:T, source:W, config:{ arrays?:boolean, objects?:boolean } = { arrays: false, objects: false } ):T & W | undefined {
		if( !isArray( source ) && !isPlainObject( source ) || !isArray( target ) && !isPlainObject( target ) ) return;

		(<any> source).__CarbonSDK_circularReferenceFlag = target;

		for( const key of Object.keys( source ) ) {
			if( isFunction( source[ key ] ) || key === "__CarbonSDK_circularReferenceFlag" ) continue;

			let property:any = source[ key ];
			if( isArray( property ) && config.arrays || isPlainObject( property ) && config.objects ) {
				if( "__CarbonSDK_circularReferenceFlag" in property ) {
					property = property.__CarbonSDK_circularReferenceFlag;
				} else {
					property = !(key in target) || target[ key ].constructor !== property.constructor ?
						ObjectUtils.clone( property, config ) :
						ObjectUtils.extend( target[ key ], property, config );
				}
			}

			if( property === null ) {
				if( target[ key ] ) delete target[ key ];
				continue;
			}

			target[ key ] = property;
		}

		delete (<any> source).__CarbonSDK_circularReferenceFlag;
		return target as T & W;
	}

	/**
	 * Makes a shallow or deep clone of the object provided depending of the configuration specified.
	 * @param object The object to copy.
	 * @param config Object that indicates if the arrays or objects must be copied or not. By default, arrays and objects will not be deep copied.
	 * @returns The copy of the object provided.
	 */
	static clone<T extends object>( object:T, config:{ arrays?:boolean, objects?:boolean } = { arrays: false, objects: false } ):T | undefined {
		let isAnArray:boolean = isArray( object );
		if( !isAnArray && !isPlainObject( object ) ) return;

		let clone:T = <T> (isAnArray ? [] : Object.create( Object.getPrototypeOf( object ) ));
		return ObjectUtils.extend<T, T>( clone, object, config );
	}

	/**
	 * Makes a shallow or deep comparison, between all the enumerable properties of the provided objects, depending of the configuration specified.
	 * @param object1 First object to compare.
	 * @param object2 Second object to compare.
	 * @param config Object that indicates if the arrays or the objects must have a deep comparison or not. By default the comparison is shallow.
	 * @param ignore Object that indicates there is any property to ignore.
	 */
	static areEqual( object1:Object, object2:Object, config:{ arrays?:boolean, objects?:boolean, equalities?:{ nullable?:boolean, wrapped?:boolean } } = { arrays: false, objects: false }, ignore:{ [ key:string ]:boolean } = {} ):boolean {
		return internalAreEqual( object1, object2, config, [ object1 ], [ object2 ], ignore );
	}

	/**
	 * Checks if an object has the same enumerable properties with the same values as another object.
	 * @param object1 First object to compare.
	 * @param object2 Second object to compare.
	 */
	static areShallowlyEqual( object1:Object, object2:Object ):boolean {
		if( object1 === object2 ) return true;
		if( !isObject( object1 ) || !isObject( object2 ) ) return false;

		let properties:string[] = [];
		for( let propertyName in object1 ) {
			if( !object1.hasOwnProperty( propertyName ) ) continue;
			if( isFunction( object1[ propertyName ] ) ) continue;
			if( !(propertyName in object2) ) return false;
			if( object1[ propertyName ] !== object2[ propertyName ] ) return false;
			properties.push( propertyName );
		}

		for( let propertyName in object2 ) {
			if( !object2.hasOwnProperty( propertyName ) ) continue;
			if( isFunction( object2[ propertyName ] ) ) continue;
			if( !(propertyName in object1) ) return false;
			if( properties.indexOf( propertyName ) === - 1 ) return false;
		}

		return true;
	}
}

function internalAreEqual( object1:Object, object2:Object, config:{ arrays?:boolean, objects?:boolean, equalities?:{ nullable?:boolean, wrapped?:boolean } }, stack1:any[], stack2:any[], ignore:{ [ key:string ]:boolean } = {} ):boolean {
	if( object1 === object2 ) return true;
	if( !isObject( object1 ) || !isObject( object2 ) ) return false;

	if( isDate( object1 ) ) return (<Date> object1).getTime() === (<Date> object2).getTime();

	let keys:string[] = ArrayUtils.joinWithoutDuplicates( Object.keys( object1 ), Object.keys( object2 ) );
	for( let key of keys ) {
		if( key in ignore ) continue;

		if( config.equalities && config.equalities.nullable ) {
			if( _isNothing( object1[ key ] ) && _isNothing( object2[ key ] ) ) continue;
		}

		if( !(key in object1) || !(key in object2) ) return false;

		if( config.equalities && config.equalities.wrapped ) {
			const unwrapped1:unknown = _unwrapSingle( object1[ key ] );
			const unwrapped2:unknown = _unwrapSingle( object2[ key ] );
			if( unwrapped1 === unwrapped2 ) continue;
		}
		if( typeof object1[ key ] !== typeof object2[ key ] ) return false;

		if( isFunction( object1[ key ] ) ) continue;

		let firstIsPlainObject:boolean = isPlainObject( object1[ key ] );
		if( isArray( object1[ key ] ) && config.arrays ||
			firstIsPlainObject && config.objects ||
			isDate( object1[ key ] ) ) {

			if( firstIsPlainObject ) {
				let lengthStack:number = stack1.length;
				while( lengthStack -- ) {
					if( stack1[ lengthStack ] === object1[ key ] ) return stack2[ lengthStack ] === object2[ key ];
				}

				stack1.push( object1[ key ] );
				stack2.push( object2[ key ] );
			}

			if( !internalAreEqual( object1[ key ], object2[ key ], config, stack1, stack2 ) ) return false;

			if( firstIsPlainObject ) {
				stack1.pop();
				stack2.pop();
			}
		} else {
			if( object1[ key ] !== object2[ key ] ) return false;
		}
	}

	return true;
}

function _isNothing( value:unknown ):boolean {
	return !_isExistingValue( value )
		|| (Array.isArray( value ) && value.length === 0)
		;
}

function _unwrapSingle( value:unknown ):unknown {
	if( Array.isArray( value ) && value.length === 1 )
		return value[ 0 ];

	return value;
}

/**
 * Utility functions related to strings.
 */
export class StringUtils {
	/**
	 * Checks if a string starts with a substring.
	 * @param str
	 * @param substring
	 */
	static startsWith( str:string, substring:string ):boolean {
		return str.lastIndexOf( substring, 0 ) === 0;
	}

	/**
	 * Checks if a string ends with a substring.
	 * @param str
	 * @param substring
	 */
	static endsWith( str:string, substring:string ):boolean {
		return str.indexOf( substring, str.length - substring.length ) !== - 1;
	}

	/**
	 * Checks if a string contains a substring in any part of it.
	 * @param str
	 * @param substring
	 */
	static contains( str:string, substring:string ):boolean {
		return str.indexOf( substring ) !== - 1;
	}
}

/**
 * Utility functions related to ES6 Maps.
 */
export class MapUtils {
	/**
	 * Takes an object and creates a map from its properties.
	 * @param object
	 */
	static from<V>( object:Object ):Map<string, V> {
		let map:Map<string, V> = new Map<string, V>();
		for( const name of Object.keys( object ) ) {
			map.set( name, object[ name ] );
		}
		return map;
	}

	/**
	 * Adds to a target Map all the entries of the subsequents Maps provided.
	 * If entries with the same key exists between Maps, the entry's value of the last Map is set to the target Map.
	 * @param toExtend Target Map to extend.
	 * @param extenders Every other Map parameter, from which the entries to be added to the target Map will be taken.
	 */
	static extend<K, V>( toExtend:Map<K, V>, ...extenders:Map<K, V>[] ):Map<K, V> {
		for( const extender of extenders ) {
			if( !extender ) continue;
			extender.forEach( ( value, key ) => toExtend.set( key, value ) );
		}
		return toExtend;
	}
}

/**
 * Utility functions related to UUIDs.
 */
export class UUIDUtils {
	private static regExp:RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

	/**
	 * Returns true if the string provided is an UUID (version 1 to 5).
	 * @param uuid
	 */
	public static is( uuid:string ):boolean {
		return UUIDUtils.regExp.test( uuid );
	}

	/**
	 * Generates a new, version 4, UUID.
	 */
	public static generate():string {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( c:string ):string {
			let r:number = Math.random() * 16 | 0;
			let v:number = c === "x" ? r : (r & 0x3 | 0x8);
			return v.toString( 16 );
		} );
	}
}

export function _isExistingValue<T>( value:T ):value is NonNullable<T> {
	return value !== null && value !== void 0;
}
