function Map() {
	'use strict';

	var _dict = {};
	var _keys = [];

	/**
	 * Returns the number of key-value mappings in this map.
	 * @method
	 */
	this.size = function () {
		return _keys.length;
	};

	/**
	 * Returns true if this map contains no key-value mappings.
	 * @method
	 */
	this.isEmpty = function () {
		return _keys.length == 0;
	};

	/**
	 * Returns all the keys
	 * @method
	 */
	this.getKeys = function () {
		return _keys;
	};

	/**
	 * Returns all the values
	 * @method
	 */
	this.getValues = function () {
		var values = [];

		var length = _keys.length;
		for ( var i = 0; i < length; i ++ ) {
			values.push( this.get( _keys[i] ) );
		}

		return values;
	};

	/**
	 * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
	 * @method
	 * @param {String} key
	 *    the key whose associated value is to be returned
	 */
	this.get = function ( key ) {
		return _dict[key];
	};

	/**
	 * Returns true if this map contains a mapping for the specified key.
	 * @method
	 * @param {String} key
	 *    - key whose presence in this map is to be tested
	 */
	this.containsKey = function ( key ) {
		var length = _keys.length;
		for ( var i = 0; i < length; i ++ ) {
			if ( _keys[i] == key ) return true;
		}
		return false;
	};

	/**
	 * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
	 * @method
	 * @param {String} key
	 *    - key with which the specified value is to be associated
	 * @param {Object} value
	 *    - value to be associated with the specified key
	 */
	this.put = function ( key, value ) {
		this.remove( key );

		_dict[key] = value;
		_keys.push( key );

	};

	/**
	 * Removes the mapping for the specified key from this map if present.
	 * @method
	 * @param {String} key
	 *    - key whose mapping is to be removed from the map
	 */
	this.remove = function ( key ) {
		delete _dict[key];

		var length = _keys.length;
		for ( var i = length - 1; i >= 0; i -- ) {
			if ( _keys[i] == key ) {
				_keys.splice( i, 1 );
			}
		}
	};

	/**
	 * Removes all of the mappings from this map. The map will be empty after this call returns.
	 * @method
	 */
	this.clear = function () {
		_dict = {};
		_keys = [];
	};
}