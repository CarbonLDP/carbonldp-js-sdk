(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _source = {};

	_source.class = Carbon.DefaultPrefixes.ldp + 'RDFSource';

	_source.Property = {

	};

	_source.create = function () {
		var newSource = Carbon.Resource.create( null );
		_source.injectMethods( newSource );
		newSource.addType( Carbon.Source.class );
		return newSource;
	};

	_source.injectMethods = function ( resources ) {
		resources = _shared.isArray( resources ) ? resources : [resources];

		resources.forEach( function ( resource ) {

			resource._setURI = function ( uri ) {
				resource["@id"] = uri;
				/*
				var slugs = resource.getInlineResourceSlugs();
				(function ( slugs ) {
					var length = slugs.length;
					for ( var i = 0; i < length; i ++ ) {
						var slug = slugs[i];
						var inlineResource = resource.getInlineResource( slug );

						var inlineResourceURI = uri + Carbon.INLINE_RESOURCE_SIGN + slug;
						inlineResource._setURI( inlineResourceURI );
					}
				}( slugs ));
				*/
			};

			resource.toJsonLD = function () {
				return JSON.stringify( this );
			};

		} );
	};

	Carbon.Source = _source;
}( Carbon, $, jsonld, Map, _shared ));