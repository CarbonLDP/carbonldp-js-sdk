(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _api = {};
	_api.class = Carbon.DefaultPrefixes.api + 'API';

	_api.Property = {
		version: {
			uri     : Carbon.DefaultPrefixes.doap + 'version',
			multi   : false,
			literal : true,
			readOnly: true
		}
	};
	Carbon.API = _api;
}( Carbon, $, jsonld, Map, _shared ));