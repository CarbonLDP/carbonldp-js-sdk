define(
	[
		'Carbon/utils'
	], function( utils ) {
		describe(
			'utils', function() {
				it(
					'is defined',
					function() {
						expect( utils ).toBeDefined();
						expect( utils ).not.toBeNull();
					}
				);
				it(
					'has method, hasFunction( object, functionName ), which returns true if the object has a function with that name', function() {
						expect( utils.hasFunction ).toBeDefined();

						var myObject = {};
						expect( utils.hasFunction( myObject, 'hasOwnProperty' ) ).toBe( true );
						expect( utils.hasFunction( myObject, 'doSomething' ) ).toBe( false );

						myObject.doSomething = function() {};
						expect( utils.hasFunction( myObject, 'doSomething' ) ).toBe( true );

						myObject.something = 'something';
						expect( utils.hasFunction( myObject, 'something' ) ).toBe( false );
					}
				);

				it(
					'has method, isNundefined( value ), which returns true if the value is null or undefined', function() {
						expect( utils.isNundefined ).toBeDefined();

						expect( utils.isNundefined( null ) ).toBe( true );
						expect( utils.isNundefined() ).toBe( true );
						expect( utils.isNundefined( 'something' ) ).toBe( false );
						expect( utils.isNundefined( true ) ).toBe( false );
						expect( utils.isNundefined( false ) ).toBe( false );
						expect( utils.isNundefined( 9 ) ).toBe( false );
						expect( utils.isNundefined( {} ) ).toBe( false );
						expect( utils.isNundefined( [] ) ).toBe( false );
					}
				);

				it(
					'has method, isNull( value ), which returns true if the value is null', function() {
						expect( utils.isNull ).toBeDefined();

						expect( utils.isNull( null ) ).toBe( true );
						expect( utils.isNull() ).toBe( false );
						expect( utils.isNull( 'something' ) ).toBe( false );
						expect( utils.isNull( true ) ).toBe( false );
						expect( utils.isNull( false ) ).toBe( false );
						expect( utils.isNull( 9 ) ).toBe( false );
						expect( utils.isNull( {} ) ).toBe( false );
						expect( utils.isNull( [] ) ).toBe( false );
					}
				);

				it(
					'has method, isUndefined( value ), which returns true if the value is undefined', function() {
						expect( utils.isUndefined ).toBeDefined();

						expect( utils.isUndefined( null ) ).toBe( false );
						expect( utils.isUndefined() ).toBe( true );
						expect( utils.isUndefined( 'something' ) ).toBe( false );
						expect( utils.isUndefined( true ) ).toBe( false );
						expect( utils.isUndefined( false ) ).toBe( false );
						expect( utils.isUndefined( 9 ) ).toBe( false );
						expect( utils.isUndefined( {} ) ).toBe( false );
						expect( utils.isUndefined( [] ) ).toBe( false );
					}
				);

				it(
					'has method, isArray( value ), which returns true if the value is an array', function() {
						expect( utils.isArray ).toBeDefined();

						expect( utils.isArray( null ) ).toBe( false );
						expect( utils.isArray() ).toBe( false );
						expect( utils.isArray( 'something' ) ).toBe( false );
						expect( utils.isArray( true ) ).toBe( false );
						expect( utils.isArray( false ) ).toBe( false );
						expect( utils.isArray( 9 ) ).toBe( false );
						expect( utils.isArray( {} ) ).toBe( false );
						expect( utils.isArray( [] ) ).toBe( true );
					}
				);

				it(
					'has method, isString( value ), which returns true if the value is a string', function() {
						expect( utils.isString ).toBeDefined();

						expect( utils.isString( null ) ).toBe( false );
						expect( utils.isString() ).toBe( false );
						expect( utils.isString( 'something' ) ).toBe( true );
						expect( utils.isString( true ) ).toBe( false );
						expect( utils.isString( false ) ).toBe( false );
						expect( utils.isString( 9 ) ).toBe( false );
						expect( utils.isString( {} ) ).toBe( false );
						expect( utils.isString( [] ) ).toBe( false );
					}
				);

				it(
					'has method, isBoolean( value ), which returns true if the value is a boolean', function() {
						expect( utils.isBoolean ).toBeDefined();

						expect( utils.isBoolean( null ) ).toBe( false );
						expect( utils.isBoolean() ).toBe( false );
						expect( utils.isBoolean( 'something' ) ).toBe( false );
						expect( utils.isBoolean( true ) ).toBe( true );
						expect( utils.isBoolean( false ) ).toBe( true );
						expect( utils.isBoolean( 9 ) ).toBe( false );
						expect( utils.isBoolean( {} ) ).toBe( false );
						expect( utils.isBoolean( [] ) ).toBe( false );
					}
				);

				it(
					'has method, isNumber( value ), which returns true if the value is a number', function() {
						expect( utils.isNumber ).toBeDefined();

						expect( utils.isNumber( null ) ).toBe( false );
						expect( utils.isNumber() ).toBe( false );
						expect( utils.isNumber( 'something' ) ).toBe( false );
						expect( utils.isNumber( true ) ).toBe( false );
						expect( utils.isNumber( false ) ).toBe( false );
						expect( utils.isNumber( 9 ) ).toBe( true );
						expect( utils.isNumber( 9.9 ) ).toBe( true );
						expect( utils.isNumber( 0.1 ) ).toBe( true );
						expect( utils.isNumber( -1 ) ).toBe( true );
						expect( utils.isNumber( {} ) ).toBe( false );
						expect( utils.isNumber( [] ) ).toBe( false );
					}
				);

				it(
					'has method, isInteger( value ), which returns true if the map is an integer', function() {
						expect( utils.isInteger ).toBeDefined();

						expect( utils.isInteger( null ) ).toBe( false );
						expect( utils.isInteger() ).toBe( false );
						expect( utils.isInteger( 'something' ) ).toBe( false );
						expect( utils.isInteger( true ) ).toBe( false );
						expect( utils.isInteger( false ) ).toBe( false );
						expect( utils.isInteger( 9 ) ).toBe( true );
						expect( utils.isInteger( 9.9 ) ).toBe( false );
						expect( utils.isInteger( 0.1 ) ).toBe( false );
						expect( utils.isInteger( -1 ) ).toBe( true );
						expect( utils.isInteger( {} ) ).toBe( false );
						expect( utils.isInteger( [] ) ).toBe( false );
					}
				);

				it(
					'has method, isDouble( value ), which returns true if the value is a double', function() {
						expect( utils.isNumber ).toBeDefined();

						expect( utils.isNumber( null ) ).toBe( false );
						expect( utils.isNumber() ).toBe( false );
						expect( utils.isNumber( 'something' ) ).toBe( false );
						expect( utils.isNumber( true ) ).toBe( false );
						expect( utils.isNumber( false ) ).toBe( false );
						expect( utils.isNumber( 9 ) ).toBe( true );
						expect( utils.isNumber( 9.9 ) ).toBe( true );
						expect( utils.isNumber( 0.1 ) ).toBe( true );
						expect( utils.isNumber( -1 ) ).toBe( true );
						expect( utils.isNumber( {} ) ).toBe( false );
						expect( utils.isNumber( [] ) ).toBe( false );
					}
				);

				it(
					'has method, isDate( value ), which returns true if the value is a date object', function() {
						expect( utils.isDate ).toBeDefined();

						expect( utils.isDate( null ) ).toBe( false );
						expect( utils.isDate() ).toBe( false );
						expect( utils.isDate( 'something' ) ).toBe( false );
						expect( utils.isDate( true ) ).toBe( false );
						expect( utils.isDate( false ) ).toBe( false );
						expect( utils.isDate( 9 ) ).toBe( false );
						expect( utils.isDate( {} ) ).toBe( false );
						expect( utils.isDate( [] ) ).toBe( false );
						expect( utils.isDate( new Date() ) ).toBe( true );
					}
				);

				it(
					'has method, isObject( value ), which returns true if the value is an object', function() {
						expect( utils.isObject ).toBeDefined();

						expect( utils.isObject( null ) ).toBe( true );
						expect( utils.isObject() ).toBe( false );
						expect( utils.isObject( 'something' ) ).toBe( false );
						expect( utils.isObject( true ) ).toBe( false );
						expect( utils.isObject( false ) ).toBe( false );
						expect( utils.isObject( 9 ) ).toBe( false );
						expect( utils.isObject( {} ) ).toBe( true );
						expect( utils.isObject( [] ) ).toBe( true );
						expect( utils.isObject( new Date() ) ).toBe( true );
					}

				);

				it(
					'has method, isFunction( value ), which returns true if the value is an object', function() {
						expect( utils.isFunction ).toBeDefined();

						expect( utils.isFunction( null ) ).toBe( false );
						expect( utils.isFunction() ).toBe( false );
						expect( utils.isFunction( 'something' ) ).toBe( false );
						expect( utils.isFunction( true ) ).toBe( false );
						expect( utils.isFunction( false ) ).toBe( false );
						expect( utils.isFunction( 9 ) ).toBe( false );
						expect( utils.isFunction( {} ) ).toBe( false );
						expect( utils.isFunction( [] ) ).toBe( false );
						expect( utils.isFunction( new Date() ) ).toBe( false );
						expect( utils.isFunction( function(){} ) ).toBe( true );
					}
				);

				it(
					'has method, stringStartsWith( string, substring ), which returns true if the string starts with the substring', function() {
						expect( utils.stringStartsWith ).toBeDefined();

						expect( utils.stringStartsWith( 'something', 'some' ) ).toBe( true );
						expect( utils.stringStartsWith( 'another thing', 'thing' ) ).toBe( false );
						expect( utils.stringStartsWith( 'another thing', 'nother' ) ).toBe( false );
						expect( utils.stringStartsWith( 'another thing', 'whatever' ) ).toBe( false );
					}
				);

				it(
					'has method, stringEndsWith( string, substring ), which returns true if the string ends with the substring', function() {
						expect( utils.stringEndsWith ).toBeDefined();

						expect( utils.stringEndsWith( 'something', 'some' ) ).toBe( false );
						expect( utils.stringEndsWith( 'another thing', 'thing' ) ).toBe( true );
						expect( utils.stringEndsWith( 'another thing', 'nother' ) ).toBe( false );
						expect( utils.stringEndsWith( 'another thing', 'whatever' ) ).toBe( false );
					}
				);

				it(
					'has method, stringContains( string, substring ), which returns true if the string contains the substring', function() {
						expect( utils.stringContains ).toBeDefined();

						expect( utils.stringContains( 'something', 'some' ) ).toBe( true );
						expect( utils.stringContains( 'another thing', 'thing' ) ).toBe( true );
						expect( utils.stringContains( 'another thing', 'nother' ) ).toBe( true );
						expect( utils.stringContains( 'another thing', 'whatever' ) ).toBe( false );
					}
				);

				it(
					'has method, slugify(), which returns true if the ', function() {
						// TODO
					}
				);

				it(
					'has method, parseBoolean( string ), which casts a string into a boolean representation', function() {
						expect( utils.parseBoolean ).toBeDefined();

						expect( utils.parseBoolean( 'true' ) ).toBe( true );
						expect( utils.parseBoolean( 'TRUE' ) ).toBe( true );
						expect( utils.parseBoolean( 'yes' ) ).toBe( true );
						expect( utils.parseBoolean( 'y' ) ).toBe( true );
						expect( utils.parseBoolean( '1' ) ).toBe( true );

						expect( utils.parseBoolean( 'false' ) ).toBe( false );
						expect( utils.parseBoolean( 'FaLse' ) ).toBe( false );
						expect( utils.parseBoolean( 'No' ) ).toBe( false );
						expect( utils.parseBoolean( 'no' ) ).toBe( false );
						expect( utils.parseBoolean( 'n' ) ).toBe( false );
						expect( utils.parseBoolean( '0' ) ).toBe( false );

						expect( utils.parseBoolean( null ) ).toBe( false );
						expect( utils.parseBoolean() ).toBe( false );
						expect( utils.parseBoolean( 'something' ) ).toBe( false );
						expect( utils.parseBoolean( true ) ).toBe( false );
						expect( utils.parseBoolean( false ) ).toBe( false );
						expect( utils.parseBoolean( 9 ) ).toBe( false );
						expect( utils.parseBoolean( {} ) ).toBe( false );
						expect( utils.parseBoolean( [] ) ).toBe( false );
					}
				);

				it(
					'has method, extend( target [toMerge1, toMerge2, ...]), which shallow merges all the objects to merge to the target', function() {
						expect( utils.extend ).toBeDefined();

						var object1 = {
							a: 1,
							b: 2,
							c: 3
						};
						var object2 = {
							c: 4,
							d: 5,
							e: 6
						};

						var merged = utils.extend( {}, object1, object2 );
						expect( merged.a ).toBeDefined();
						expect( merged.b ).toBeDefined();
						expect( merged.c ).toBeDefined();
						expect( merged.d ).toBeDefined();
						expect( merged.e ).toBeDefined();

						expect( merged.a ).toBe( 1 );
						expect( merged.b ).toBeDefined( 2 );
						expect( merged.c ).toBeDefined( 4 );
						expect( merged.d ).toBeDefined( 5 );
						expect( merged.e ).toBeDefined( 6 );
					}
				);
			}
		);
	}
);
