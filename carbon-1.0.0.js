/**
* @overview Carbon LDP JavaScript Library v1.0.0
* @copyright Base22, LLC. 2014
*/

/** Directives for use when pasting code for evaluation at: http://www.jslint.com/ */
/*jslint browser: false, devel: true, debug: false, sloppy: false, white: true */


// Document me using Node.js 
// Install: sudo npm install jsdoc 
// cd to /usr/local/bin
// sudo ./node_modules/.bin/jsdoc /Users/Shared/git-repo/CarbonJS/carbon-1.0.0.js
// Find documentation in: /usr/local/bin/out/index.html

/**
* An object that maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value.
* For those familiar with the Java programming language, this is similar to a HashMap; it implements most of the methods defined by Java's java.util.Map interface.
*   
* @constructor
* @version 1.0.0
* @author cody@base22.com Burleson, Cody
*/
function Map() {

	this.dict = {};

	/**
	* Returns the number of key-value mappings in this map.
	* @method
	*/
	this.size = function() {
		return Object.keys(this.dict).length;
	};

	/**
	* Returns true if this map contains no key-value mappings.
	* @method
	*/
	this.isEmpty = function() {
		return Object.keys(this.dict).length == 0;
	};

	/**
	* Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key. 
	* @method
	* @param {String} key
	* 	the key whose associated value is to be returned
	*/
	this.get = function(key){
		return this.dict[key];
	};

	/**
	* Returns true if this map contains a mapping for the specified key.
	* @method
	* @param {String} key
	* 	- key whose presence in this map is to be tested
	*/
	this.containsKey = function(key){

		if( this.get(key) !== undefined) {
			return true;
		} else {
			return false;
		}

	};

	/**
	* Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
	* @method
	* @param {String} key
	*	- key with which the specified value is to be associated
	* @param {Object} value
	* 	- value to be associated with the specified key
	*/
	this.put = function(key,value) {
		this.dict[key] = value;
	};

	/**
	* Removes the mapping for the specified key from this map if present.
	* @method
	* @param {String} key
	*	- key whose mapping is to be removed from the map
	*/
	this.remove = function(key) {
		'use strict';
		delete this.dict[key];
	};

	/**
	* Removes all of the mappings from this map. The map will be empty after this call returns.
	* @method
	*/
	this.clear = function(){
		this.dict = {};
	};

}


/** 
* =============================
* Map Test Cases
* =============================
*/

/**
* Useful for unit testing JavaScript, this method asserts that the given condition is true. 
* If the given condition is not true, an optionally provided message is logged or 'Assertion failed.'
* @method
*/
function assert(condition, message) {
    if (!condition) {
        console.error(message) || console.error('Assertion failed');
    } else {
    	console.log("-- PASS");
    }
}

var myMap = new Map();

assert( myMap.isEmpty() );

assert( myMap.size() == 0 , "size should be zero before any entries have been put into the lookup table.");

myMap.put('key1','http://value1?dt=2014_06_01&dummy=true');

var testObj = {prop1:"Hello", prop2:" World!"};

myMap.put('key2',testObj);

assert( myMap.size() == 2, "size should be 2 after adding 2 entries.");

var ref = myMap.get('key2');

assert( ref !== undefined , "ref should not be undefined; it should be a reference to testObj");

assert( ref.prop1 == 'Hello' , "ref.prop1 should equal 'hello' ");

assert( myMap.containsKey('notReal') == false, "containsKey('notReal') should return false; no such object is in the lookup table.");

assert( myMap.containsKey('key2') == true, "containsKey('key2') should return true; that object is in the lookup table.");

myMap.remove('key1');

assert( myMap.size() == 1 , "size should be 1 after removing item under 'key1'.");

myMap.clear();

assert( myMap.size() == 0 , "size should be 0 after clearing lookup table.");






/** Immediately Invoked Function Expression (IIFE) */
(function ( root, factory ) {

	'use strict';

	root.carbon = factory(/* root */);

/** 
* IIFE, defined above by with (function ( root, factory ) { 
* is actually invoked next. The IIFE is defined above with (function () {, and then, when we reach
* }()); here, we're invoking the IIFE. We defined the IIFE with two parameters: root and factory.
* The root is typically the window object, but can be different on systems such as Node.js; we pass
* in this for the root parameter.
* For the factory, we're defining an inline function that returns an object. 
* If needed, we can later add parameters to the factory function as long as we pass values in 
* above where we set the Carbon object by calling the factory.
*/
}(this, function(/* root */) {

	'use strict';

	var	carbon = function(){};
	
	carbon.VERSION = '1.0.0';
    carbon.registries = {};
    
	carbon.getRegistry = function(id) {

		var requestedRegistry = carbon.registries[id];
        
        console.log(requestedRegistry);
        
        
		var registry = {
			id : id,
			resources : []
		};
		
		return registry;

	};

	return carbon;

}));







var myMap = new Map();
myMap.put('key1',"Hello");
myMap.put('key2',' World!');

