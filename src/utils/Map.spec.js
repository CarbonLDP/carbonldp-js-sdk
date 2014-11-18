define(
	[
		'Carbon/utils/Map', 'underscore'
	], function( Map, _ ) {
		describe(
			'Map', function() {
				it(
					'is defined', function() {
						expect( Map ).not.toBeNull();
						expect( _.isFunction( Map ) ).toBe( true );
					}
				);

				it(
					'can be initialized by sending an object', function() {
						var map = new Map(
							{
								'key1': 1,
								'key2': 2,
								'key3': 3
							}
						);

						expect( map.size() ).toBe( 3 );
						expect( map.containsKey('key1') ).toBe( true );
						expect( map.containsKey('key2') ).toBe( true );
						expect( map.containsKey('key3') ).toBe( true );
					}
				);

				it(
					'has method, isEmpty(), which returns true if the map is empty', function() {
						var map = new Map();

						expect( map.isEmpty ).toBeDefined();
						expect( _.isFunction( map.isEmpty ) ).toBe( true );

						expect( map.isEmpty() ).toBe( true );

						map.put( 'key1', 'something' );

						expect( map.isEmpty() ).toBe( false );
					}
				);

				it(
					'has method, size(), which returns the size of the map', function() {
						var map = new Map();

						expect( map.size ).toBeDefined();
						expect( _.isFunction( map.size ) ).toBe( true );

						expect( map.size() ).toBe( 0 );

						map.put( 'key1', 'something' );
						map.put( 'key2', 'something else' );

						expect( map.size() ).toBe( 2 );
					}
				);

				it(
					'has method, containsKey(), which returns true if the map contains a value related to the key',
					function() {
						var map = new Map();

						expect( map.containsKey ).toBeDefined();
						expect( _.isFunction( map.containsKey ) ).toBe( true );

						map.put( 'key1', 'hello' );
						expect( map.containsKey( 'key1' ) ).toBe( true );
						expect( map.containsKey( 'dummy' ) ).toBe( false );
					}
				);

				it(
					'has method, get(), which gets object from the map by the given key', function() {
						var map = new Map();

						expect( map.get ).toBeDefined();
						expect( _.isFunction( map.get ) ).toBe( true );

						map.put( 'key1', false );

						expect( map.get( 'key1' ) ).toBe( false );
					}
				);

				it(
					'has method, getKeys(), which returns an array with all the keys stored', function() {
						var map = new Map();

						expect( map.getKeys ).toBeDefined();
						expect( _.isFunction( map.getKeys ) ).toBe( true );

						map.put( 'key1', false );
						map.put( 'key2', 'a string' );

						var keys = map.getKeys();
						expect( _.isArray( keys ) ).toBe( true );
						expect( keys.length ).toBe( 2 );
						expect( _.indexOf( keys, 'key1' ) ).not.toBe( -1 );
						expect( _.indexOf( keys, 'key2' ) ).not.toBe( -1 );
					}
				);

				it(
					'has method, getValues(), which returns an array with all the values stored', function() {
						var map = new Map();

						expect( map.getValues ).toBeDefined();
						expect( _.isFunction( map.getValues ) ).toBe( true );

						map.put( 'key1', false );
						map.put( 'key2', 'a string' );

						var values = map.getValues();
						expect( _.isArray( values ) ).toBe( true );
						expect( values.length ).toBe( 2 );
						expect( _.indexOf( values, false ) ).not.toBe( -1 );
						expect( _.indexOf( values, 'a string' ) ).not.toBe( -1 );
					}
				);

				it(
					'has method, put(), which stores a value related to a key', function() {
						var map = new Map();

						expect( map.put ).toBeDefined();
						expect( _.isFunction( map.put ) ).toBe( true );

						map.put( 'key1', false );
						map.put( 'key2', { prop1: "Hello", prop2: " World!" } );

						expect( map.get( 'key1' ) ).toBe( false );

						var ref = map.get( 'key2' );
						expect( ref.prop1 ).toBe( 'Hello' );
						expect( ref.prop2 ).toBe( ' World!' );
					}
				);

				it(
					'has method, remove(), which removes the value related to the given key', function() {
						var map = new Map();

						expect( map.remove ).toBeDefined();
						expect( _.isFunction( map.remove ) ).toBe( true );

						map.put( 'key1', 'hello1' );
						map.put( 'key2', 'hello2' );
						map.put( 'key3', 'hello3' );
						map.remove( 'key2' );
						expect( map.containsKey( 'key2' ) ).toBe( false );
					}
				);

				it(
					'has method, clear(), which removes all values from the map', function() {
						var map = new Map();

						expect( map.clear ).toBeDefined();
						expect( _.isFunction( map.clear ) ).toBe( true );

						map.put( 'key1', 'hello1' );
						map.put( 'key2', 'hello2' );
						map.put( 'key3', 'hello3' );
						map.clear();
						expect( map.containsKey( 'key2' ) ).toBe( false );
						expect( map.size() ).toBe( 0 );
						expect( map.isEmpty() ).toBe( true );
					}
				);
			}
		);
	}
);