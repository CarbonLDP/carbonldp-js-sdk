define([ 'bluebird' ], function( Promise ){
	var global = {};
	global.Promise = Promise;

	var jsonld, jsonldjs;

	(function() {
	var define = null;
