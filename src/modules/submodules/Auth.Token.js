(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _token = {};

	_token.class = Carbon.DefaultPrefixes.cs + 'Token';

	_token.Property = {
		key: {
			uri     : Carbon.DefaultPrefixes.cs + 'key',
			multi   : false,
			literal : true,
			readOnly: true
		}
	};

	_token.injectMethods = function ( resources ) {
		if ( ! ( resources instanceof Array ) ) {
			resources = [ resources ];
		}

		resources.forEach( function ( resource ) {
			Carbon.Resource.injectPropertyMethods( resource, _token.Property );
		} );
	};

	_token.isToken = function ( resource ) {
		if ( ! Carbon.Resource.isResource( resource ) ) return false;
		return resource.isOfType( _token.class );
	};

	Carbon.Auth.Token = _token;
}( Carbon, $, jsonld, Map, _shared ));