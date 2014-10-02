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

			};

			// === InlineResources

			var _inlineResources = new Map();
			resource.hasInlineResource = function ( uri ) {
				if ( ! Carbon.URI.isURI( uri ) ) {
					// The URI provided is relative
					if ( ! _shared.stringStartsWith( uri, Carbon.INLINE_RESOURCE_SIGN ) ) {
						uri = resource.getURI() + Carbon.INLINE_RESOURCE_SIGN + uri;
					} else {
						uri = resource.getURI() + uri;
					}
				}
				return _inlineResources.has( uri );
			};
			resource.getInlineResource = function ( uri ) {
				if ( Carbon.URI.isURI( uri ) ) {
					// The URI provided isn't relative
					if ( resource.isPersisted() ) throw "Cannot add an inlineResource with a complete URI to a non persisted Source.";
					else if ( Carbon.URI.getGlobalBase( uri ) != resource.getURI() ) throw "The inlineResource doesn't belong to this RDFSource.";

					uri = Carbon.URI.getLocalSlug( uri );
				} else {
					uri = _shared.stringStartsWith( Carbon.INLINE_RESOURCE_SIGN ) ? uri.substring( 1, uri.length - 1 ) : uri;
				}

				return _inlineResources.get( uri );
			};
			resource.getInlineResources = function () {
				return _inlineResources.getValues();
			};
			resource.getInlineResourceSlugs = function () {
				return _inlineResources.getKeys();
			};
			resource._addInlineResources = function ( inlineResources ) {
				inlineResources = _shared.isArray( inlineResources ) ? inlineResources : [inlineResources];

				var length = inlineResources.length;
				for ( var i = 0; i < length; i ++ ) {
					var inlineResource = inlineResources[i];

					if ( ! Carbon.InlineResource.isInlineResource( inlineResource ) ) throw "The inlineResource doesn't belong to this RDFSource.";

					var uri = inlineResource.getURI();
					if ( Carbon.URI.isURI( uri ) ) {
						if ( ! Carbon.InlineResource.isInlineResourceOf( inlineResource, this ) ) throw "The inlineResource doesn't belong to this RDFSource.";
						uri = Carbon.URI.getLocalSlug( uri );
					} else {
						// The InlineResource has a relative URI
						uri = _shared.stringStartsWith( Carbon.INLINE_RESOURCE_SIGN ) ? uri.substring( 1, uri.length - 1 ) : uri;
					}

					inlineResource._setDocumentResource( this );
					_inlineResources.put( uri, inlineResource );
				}
			};

			// === End: InlineResources

			resource.toJsonLD = function () {
				var jsonLDResources = [this];

				jsonLDResources = jsonLDResources.concat( _inlineResources.getValues() );

				return JSON.stringify( jsonLDResources );
			};

		} );
	};

	Carbon.Source = _source;
}( Carbon, $, jsonld, Map, _shared ));