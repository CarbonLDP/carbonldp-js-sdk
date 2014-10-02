(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _directContainer = {};

	_directContainer.class = Carbon.DefaultPrefixes.ldp + 'DirectContainer';

	_directContainer.Property = {
		contains: Carbon.DefaultPrefixes.ldp + 'contains'
	};

	_directContainer.isDirectContainer = function ( rdfSource ) {
		if ( ! rdfSource ) return false;
		if ( ! Carbon.Resource.isResource( rdfSource ) ) return false;
		return rdfSource.isOfType( Carbon.DirectContainer.class );
	};

	_directContainer.injectMethods = function ( sources ) {
		sources.forEach( function ( source ) {

			// TODO: FT

		} );
	};

	Carbon.DirectContainer = _directContainer;
}( Carbon, $, jsonld, Map, _shared ));