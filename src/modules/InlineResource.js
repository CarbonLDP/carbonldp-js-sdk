(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _inlineResource = {};

	_inlineResource.isInlineResource = function ( resource ) {
		if ( ! Carbon.Resource.isResource( resource ) ) return false;

		var uri = resource.getURI();
		if ( ! uri ) return false;

		if ( ! Carbon.URI.isURI( uri ) ) {
			// The uri is relative
			return _shared.stringStartsWith( uri, Carbon.INLINE_RESOURCE_SIGN );
		} else {
			return _shared.stringContains( uri, Carbon.INLINE_RESOURCE_SIGN );
		}
	};

	_inlineResource.isInlineResourceOf = function ( resource, documentResource ) {
		if ( ! _inlineResource.isInlineResource( resource ) ) return false;
		if ( ! Carbon.Resource.isResource( documentResource ) ) throw "The documentResource provided isn't an RDF Resource.";

		var uri = resource.getURI();
		if ( ! uri ) return false;
		return _shared.stringStartsWith( uri, documentResource.getURI() + Carbon.INLINE_RESOURCE_SIGN );
	};

	_inlineResource._create = function () {
		var newResource = Carbon.Resource.create( null );
		_inlineResource.injectMethods( newResource );
		return newResource;
	};

	_inlineResource.injectMethods = function ( rdfResources ) {
		rdfResources = _shared.isArray( rdfResources ) ? rdfResources : [rdfResources];
		var length = rdfResources.length;
		for ( var i = 0; i < length; i ++ ) {
			var rdfResource = rdfResources[i];
			(function ( rdfResource ) {

				var _documentResource = null;
				rdfResource.getDocumentResource = function ( documentResource ) {
					return _documentResource;
				};
				rdfResource._setDocumentResource = function ( documentResource ) {
					if ( ! _inlineResource.isInlineResourceOf( this, documentResource ) ) {
						throw "The Resource is not the Document Resource of this Inline Resource.";
					}
					_documentResource = documentResource;
				};

			}( rdfResource ));
		}
	};

	Carbon.InlineResource = _inlineResource;
}( Carbon, $, jsonld, Map, _shared ));
