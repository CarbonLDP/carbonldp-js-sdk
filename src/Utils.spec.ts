/// <reference path="../typings/jasmine/jasmine.d.ts" />
/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as Utils from './Utils';

interface dummy {
	doSomething?();
	something?:any;
}

describe( 'Utils', function () {
	it( 'is defined', function () {
		expect( Utils ).toBeDefined();
		expect( Utils ).not.toBeNull();
	} );
	it( 'has method, hasFunction( object, functionName ), which returns true if the object has a function with that name', function () {
		expect( Utils.hasFunction ).toBeDefined();

		var myObject:dummy = {};
		expect( Utils.hasFunction( myObject, 'hasOwnProperty' ) ).toBe( true );
		expect( Utils.hasFunction( myObject, 'doSomething' ) ).toBe( false );

		myObject.doSomething = function () {};
		expect( Utils.hasFunction( myObject, 'doSomething' ) ).toBe( true );

		myObject.something = 'something';
		expect( Utils.hasFunction( myObject, 'something' ) ).toBe( false );
	} );
	it( 'has method, hasProperty( object, propertyName ), which returns true if the object has a property with that name', function () {
		expect( Utils.hasProperty ).toBeDefined();

		var postPrototype:any = {};
		var post:any = Object.create( postPrototype );
		expect( Utils.hasProperty( post, 'ownProperty' ) ).toBe( false );
		expect( Utils.hasProperty( post, 'prototypeProperty' ) ).toBe( false );

		post.ownProperty = 'something';
		postPrototype.prototypeProperty = 'something-else';

		expect( Utils.hasProperty( post, 'ownProperty' ) ).toBe( true );
		expect( Utils.hasProperty( post, 'prototypeProperty' ) ).toBe( true );
	} );
	it( 'has method, hasPropertyDefined( object, propertyName ), which returns true if the object has a property with that name defined (even if the property value is undefined). ', function () {
		expect( Utils.hasPropertyDefined ).toBeDefined();

		var postPrototype:any = {};
		var post:any = Object.create( postPrototype );

		expect( Utils.hasPropertyDefined( post, 'protoOnlyDefined' ) ).toBe( false );
		expect( Utils.hasPropertyDefined( post, 'protoWithValue' ) ).toBe( false );
		expect( Utils.hasPropertyDefined( post, 'onlyDefined' ) ).toBe( false );
		expect( Utils.hasPropertyDefined( post, 'withValue' ) ).toBe( false );

		Object.defineProperty( postPrototype, 'protoOnlyDefined', {
			enumerable: false,
			writable: true
		} );
		postPrototype.protoWithValue = 'something';
		Object.defineProperty( post, 'onlyDefined', {
			enumerable: false,
			writable: true
		} );
		post.withValue = 'something';

		expect( Utils.hasPropertyDefined( post, 'protoOnlyDefined' ) ).toBe( false );
		expect( Utils.hasPropertyDefined( post, 'protoWithValue' ) ).toBe( false );
		expect( Utils.hasPropertyDefined( post, 'onlyDefined' ) ).toBe( true );
		expect( Utils.hasPropertyDefined( post, 'withValue' ) ).toBe( true );

	} );

	it( 'has method, isNull( value ), which returns true if the value is null', function () {
		expect( Utils.isNull ).toBeDefined();

		expect( Utils.isNull( null ) ).toBe( true );
		expect( Utils.isNull( 'something' ) ).toBe( false );
		expect( Utils.isNull( true ) ).toBe( false );
		expect( Utils.isNull( false ) ).toBe( false );
		expect( Utils.isNull( 9 ) ).toBe( false );
		expect( Utils.isNull( {} ) ).toBe( false );
		expect( Utils.isNull( [] ) ).toBe( false );
	} );

	it( 'has method, isArray( value ), which returns true if the value is an array', function () {
		expect( Utils.isArray ).toBeDefined();

		expect( Utils.isArray( null ) ).toBe( false );
		expect( Utils.isArray( 'something' ) ).toBe( false );
		expect( Utils.isArray( true ) ).toBe( false );
		expect( Utils.isArray( false ) ).toBe( false );
		expect( Utils.isArray( 9 ) ).toBe( false );
		expect( Utils.isArray( {} ) ).toBe( false );
		expect( Utils.isArray( [] ) ).toBe( true );
	} );

	it( 'has method, isString( value ), which returns true if the value is a string', function () {
		expect( Utils.isString ).toBeDefined();

		expect( Utils.isString( null ) ).toBe( false );
		expect( Utils.isString( 'something' ) ).toBe( true );
		expect( Utils.isString( true ) ).toBe( false );
		expect( Utils.isString( false ) ).toBe( false );
		expect( Utils.isString( 9 ) ).toBe( false );
		expect( Utils.isString( {} ) ).toBe( false );
		expect( Utils.isString( [] ) ).toBe( false );
	} );

	it( 'has method, isBoolean( value ), which returns true if the value is a boolean', function () {
		expect( Utils.isBoolean ).toBeDefined();

		expect( Utils.isBoolean( null ) ).toBe( false );
		expect( Utils.isBoolean( 'something' ) ).toBe( false );
		expect( Utils.isBoolean( true ) ).toBe( true );
		expect( Utils.isBoolean( false ) ).toBe( true );
		expect( Utils.isBoolean( 9 ) ).toBe( false );
		expect( Utils.isBoolean( {} ) ).toBe( false );
		expect( Utils.isBoolean( [] ) ).toBe( false );
	} );

	it( 'has method, isNumber( value ), which returns true if the value is a number', function () {
		expect( Utils.isNumber ).toBeDefined();

		expect( Utils.isNumber( null ) ).toBe( false );
		expect( Utils.isNumber( 'something' ) ).toBe( false );
		expect( Utils.isNumber( true ) ).toBe( false );
		expect( Utils.isNumber( false ) ).toBe( false );
		expect( Utils.isNumber( 9 ) ).toBe( true );
		expect( Utils.isNumber( 9.9 ) ).toBe( true );
		expect( Utils.isNumber( 0.1 ) ).toBe( true );
		expect( Utils.isNumber( - 1 ) ).toBe( true );
		expect( Utils.isNumber( {} ) ).toBe( false );
		expect( Utils.isNumber( [] ) ).toBe( false );
	} );

	it( 'has method, isInteger( value ), which returns true if the map is an integer', function () {
		expect( Utils.isInteger ).toBeDefined();

		expect( Utils.isInteger( null ) ).toBe( false );
		expect( Utils.isInteger( 'something' ) ).toBe( false );
		expect( Utils.isInteger( true ) ).toBe( false );
		expect( Utils.isInteger( false ) ).toBe( false );
		expect( Utils.isInteger( 9 ) ).toBe( true );
		expect( Utils.isInteger( 9.9 ) ).toBe( false );
		expect( Utils.isInteger( 0.1 ) ).toBe( false );
		expect( Utils.isInteger( - 1 ) ).toBe( true );
		expect( Utils.isInteger( {} ) ).toBe( false );
		expect( Utils.isInteger( [] ) ).toBe( false );
	} );

	it( 'has method, isDouble( value ), which returns true if the value is a double', function () {
		expect( Utils.isNumber ).toBeDefined();

		expect( Utils.isNumber( null ) ).toBe( false );
		expect( Utils.isNumber( 'something' ) ).toBe( false );
		expect( Utils.isNumber( true ) ).toBe( false );
		expect( Utils.isNumber( false ) ).toBe( false );
		expect( Utils.isNumber( 9 ) ).toBe( true );
		expect( Utils.isNumber( 9.9 ) ).toBe( true );
		expect( Utils.isNumber( 0.1 ) ).toBe( true );
		expect( Utils.isNumber( - 1 ) ).toBe( true );
		expect( Utils.isNumber( {} ) ).toBe( false );
		expect( Utils.isNumber( [] ) ).toBe( false );
	} );

	it( 'has method, isDate( value ), which returns true if the value is a date object', function () {
		expect( Utils.isDate ).toBeDefined();

		expect( Utils.isDate( null ) ).toBe( false );
		expect( Utils.isDate( 'something' ) ).toBe( false );
		expect( Utils.isDate( true ) ).toBe( false );
		expect( Utils.isDate( false ) ).toBe( false );
		expect( Utils.isDate( 9 ) ).toBe( false );
		expect( Utils.isDate( {} ) ).toBe( false );
		expect( Utils.isDate( [] ) ).toBe( false );
		expect( Utils.isDate( new Date() ) ).toBe( true );
	} );

	it( 'has method, isObject( value ), which returns true if the value is an object', function () {
		expect( Utils.isObject ).toBeDefined();

		expect( Utils.isObject( null ) ).toBe( false );
		expect( Utils.isObject( 'something' ) ).toBe( false );
		expect( Utils.isObject( true ) ).toBe( false );
		expect( Utils.isObject( false ) ).toBe( false );
		expect( Utils.isObject( 9 ) ).toBe( false );
		expect( Utils.isObject( {} ) ).toBe( true );
		expect( Utils.isObject( [] ) ).toBe( true );
		expect( Utils.isObject( new Date() ) ).toBe( true );
	} );

	it( 'has method, isFunction( value ), which returns true if the value is an object', function () {
		expect( Utils.isFunction ).toBeDefined();

		expect( Utils.isFunction( null ) ).toBe( false );
		expect( Utils.isFunction( 'something' ) ).toBe( false );
		expect( Utils.isFunction( true ) ).toBe( false );
		expect( Utils.isFunction( false ) ).toBe( false );
		expect( Utils.isFunction( 9 ) ).toBe( false );
		expect( Utils.isFunction( {} ) ).toBe( false );
		expect( Utils.isFunction( [] ) ).toBe( false );
		expect( Utils.isFunction( new Date() ) ).toBe( false );
		expect( Utils.isFunction( function () {} ) ).toBe( true );
	} );

	it( 'has method, isMap( value ), which returns true if the value is an ES6 Map', function () {
		expect( Utils.isMap ).toBeDefined();

		expect( Utils.isMap( null ) ).toBe( false );
		expect( Utils.isMap( 'something' ) ).toBe( false );
		expect( Utils.isMap( true ) ).toBe( false );
		expect( Utils.isMap( false ) ).toBe( false );
		expect( Utils.isMap( 9 ) ).toBe( false );
		expect( Utils.isMap( {} ) ).toBe( false );
		expect( Utils.isMap( [] ) ).toBe( false );
		expect( Utils.isMap( new Date() ) ).toBe( false );
		expect( Utils.isMap( function () {} ) ).toBe( false );
		expect( Utils.isMap( new Map<any, any>() ) ).toBe( true );
	} );

	it( 'has method, parseBoolean( value ), which parses a string and returns a boolean representation.', function () {
		expect( Utils.parseBoolean ).toBeDefined();

		expect( Utils.parseBoolean( "true" ) ).toBe( true );
		expect( Utils.parseBoolean( "yes" ) ).toBe( true );
		expect( Utils.parseBoolean( "y" ) ).toBe( true );
		expect( Utils.parseBoolean( "1" ) ).toBe( true );

		expect( Utils.parseBoolean( "false" ) ).toBe( false );
		expect( Utils.parseBoolean( "no" ) ).toBe( false );
		expect( Utils.parseBoolean( "n" ) ).toBe( false );
		expect( Utils.parseBoolean( "0" ) ).toBe( false );

		expect( Utils.parseBoolean( "an invalid string" ) ).toBe( false );
	} );

	it( 'has method, extend( objects... )', function () {
		// TODO: Test
	} );

	it( 'has method, forEachOwnProperty( object, action ), which executes an action( name, value ) for each own property of the object.', function () {
		expect( Utils.forEachOwnProperty ).toBeDefined();

		var postPrototype:any = {};
		var post:any = Object.create( postPrototype );

		postPrototype.prototypeProperty = 'something';
		post.one = 1;
		post.two = 2;
		post.three = 3;

		var anotherPost:any = {};
		Utils.forEachOwnProperty( post, function ( name, value ) {
			anotherPost[ name ] = value;
		} );

		expect( anotherPost.prototypeProperty ).not.toBeDefined();
		expect( anotherPost.one ).toBe( 1 );
		expect( anotherPost.two ).toBe( 2 );
		expect( anotherPost.three ).toBe( 3 );
	} );

	describe( 'S (String utilities )', function () {
		it( 'is defined', function () {
			expect( Utils.S ).toBeDefined();
		} );
		it( 'has method, startsWith( string, substring ), that returns true if the string starts with the substring.', function () {
			expect( Utils.S.startsWith ).toBeDefined();

			expect( Utils.S.startsWith( 'hello', 'he' ) ).toBe( true );
			expect( Utils.S.startsWith( 'hello', 'h' ) ).toBe( true );
			expect( Utils.S.startsWith( 'hello', 'hello' ) ).toBe( true );
			expect( Utils.S.startsWith( '536345', '53' ) ).toBe( true );
			expect( Utils.S.startsWith( 'eeeee', 'e' ) ).toBe( true );

			expect( Utils.S.startsWith( 'hello', 'lo' ) ).toBe( false );
			expect( Utils.S.startsWith( 'hello', 'llo' ) ).toBe( false );
			expect( Utils.S.startsWith( 'hello', 'el' ) ).toBe( false );
			expect( Utils.S.startsWith( '536345', '3' ) ).toBe( false );
			expect( Utils.S.startsWith( 'eeeee', 'f' ) ).toBe( false );
		} );
		it( 'has method, endsWith( string, substring ), that returns true if the string ends with the substring.', function () {
			expect( Utils.S.endsWith ).toBeDefined();

			expect( Utils.S.endsWith( 'hello', 'he' ) ).toBe( false );
			expect( Utils.S.endsWith( 'hello', 'h' ) ).toBe( false );
			expect( Utils.S.endsWith( '536345', '53' ) ).toBe( false );
			expect( Utils.S.endsWith( 'eeeee', 'f' ) ).toBe( false );

			expect( Utils.S.endsWith( 'hello', '' ) ).toBe( true );
			expect( Utils.S.endsWith( 'hello', 'hello' ) ).toBe( true );
			expect( Utils.S.endsWith( 'hello', 'lo' ) ).toBe( true );
			expect( Utils.S.endsWith( 'hello', 'o' ) ).toBe( true );
			expect( Utils.S.endsWith( '536345', '5' ) ).toBe( true );
			expect( Utils.S.endsWith( 'eeeee', 'e' ) ).toBe( true );
		} );
		it( 'has method, contains( string, substring ), that returns true if the string contains the substring.', function () {
			expect( Utils.S.contains ).toBeDefined();

			expect( Utils.S.contains( 'hello', 'he' ) ).toBe( true );
			expect( Utils.S.contains( 'hello', 'll' ) ).toBe( true );
			expect( Utils.S.contains( 'hello', 'lo' ) ).toBe( true );
			expect( Utils.S.contains( '536345', '53' ) ).toBe( true );
			expect( Utils.S.contains( 'eeeee', 'e' ) ).toBe( true );
			expect( Utils.S.contains( 'hello', 'hello' ) ).toBe( true );
			expect( Utils.S.contains( 'hello', '' ) ).toBe( true );

			expect( Utils.S.contains( 'hello', 'er' ) ).toBe( false );
			expect( Utils.S.contains( 'hello', 't' ) ).toBe( false );
			expect( Utils.S.contains( 'hello', ' ' ) ).toBe( false );
		} );
	} );
	describe( 'A (Array utilities )', function () {
		it( 'is defined', function () {
			expect( Utils.A ).toBeDefined();
		} );

		it( "has method, from( iterator ), that returns an array with the iterator's values", function () {
			expect( Utils.A.from ).toBeDefined();

			var iterator:Iterator<string> = {
				current: 0,
				values: [
					"one", "two", "three", "four", "five"
				],
				next: function ():IteratorValue<string> {
					var value:IteratorValue<string>;
					if ( this.current < this.values.length ) {
						value = {
							done: false,
							value: this.values[ this.current ]
						};
						this.current ++;
					} else {
						value = {
							done: true,
							value: null
						}
					}
					return value;
				}
			};

			var array:Array<string> = Utils.A.from<string>( iterator );
			expect( Utils.isArray( array ) ).toBe( true );
			expect( array.length ).toBe( 5 );
		} );

		it( 'has method, joinWithoutDuplicates( arrays... ), that takes two or more arrays and joins them while removing duplicates.', function () {
			expect( Utils.A.joinWithoutDuplicates ).toBeDefined();

			var array1:Array<number> = [ 5, 3, 1 ];
			var array2:Array<number> = [ 45, 3, 9 ];
			var array3:Array<number> = [ 6, 4, 9 ];

			var result:Array<number> = Utils.A.joinWithoutDuplicates( array1, array2, array3 );
			expect( Utils.isArray( result ) ).toBe( true );
			expect( result.length ).toBe( 7 );
			expect( result.indexOf( 5 ) ).not.toBe( - 1 );
			expect( result.indexOf( 3 ) ).not.toBe( - 1 );
			expect( result.indexOf( 1 ) ).not.toBe( - 1 );
			expect( result.indexOf( 45 ) ).not.toBe( - 1 );
			expect( result.indexOf( 9 ) ).not.toBe( - 1 );
			expect( result.indexOf( 6 ) ).not.toBe( - 1 );
			expect( result.indexOf( 4 ) ).not.toBe( - 1 );
		} );
	} );
	describe( 'M (Map utilities )', function () {
		it( 'is defined', function () {
			expect( Utils.M ).toBeDefined();
		} );

		it( 'has method, from( object ), that takes an object and creates a map from its properties.', function () {
			expect( Utils.M.from ).toBeDefined();

			var post:Object = {
				one: 1,
				two: 2,
				three: 3
			};

			var result:Map<string, any> = Utils.M.from( post );
			expect( Utils.isMap( result ) ).toBe( true );
			expect( result.size ).toBe( 3 );
			expect( result.get( 'one' ) ).toBe( 1 );
			expect( result.get( 'two' ) ).toBe( 2 );
			expect( result.get( 'three' ) ).toBe( 3 );
		} );
	} );
} );