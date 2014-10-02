(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _indirectContainer = {};

	_indirectContainer.class = Carbon.DefaultPrefixes.ldp + 'IndirectContainer';

	_indirectContainer.Property = {
		contains: Carbon.DefaultPrefixes.ldp + 'contains'
	};

	_indirectContainer.isIndirectContainer = function ( rdfSource ) {
		if ( ! rdfSource ) return false;
		if ( ! Carbon.Resource.isResource( rdfSource ) ) return false;
		return rdfSource.isOfType( Carbon.IndirectContainer.class );
	};

	_indirectContainer.injectMethods = function ( sources ) {
		sources.forEach( function ( source ) {

			// TODO: FT

		} );
	};

	Carbon.IndirectContainer = _indirectContainer;
}( Carbon, $, jsonld, Map, _shared ));