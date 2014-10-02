(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _document = {};

	_document.toJsonLD = function ( document ) {
		var arrayDocument = _shared.isArray( document ) ? document : [document];
		var jsonLD = "[";

		var addComma = false;
		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( _shared.hasFunction( resource, "toJsonLD" ) ) {
				if ( addComma ) {
					jsonLD += ",";
				}
				jsonLD += resource.toJsonLD();
				addComma = true;
			}
		}

		jsonLD += "]";

		return jsonLD;
	};

	_document.getResourceOfType = function ( type, document ) {
		var arrayDocument = _shared.isArray( document ) ? document : [document];

		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( _shared.hasFunction( resource, "isOfType" ) ) {
				if ( resource.isOfType( type ) ) return resource;
			}
		}

		return null;
	};

	_document.getResourceWithURI = function ( uri, document ) {
		var arrayDocument = _shared.isArray( document ) ? document : [document];

		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( Carbon.Resource.isResource( resource ) ) {
				if ( resource.getURI() == uri ) return resource;
			}
		}

		return null;
	};

	_document.getDocumentResources = function ( document ) {
		var documentResources = [];

		var arrayDocument = _shared.isArray( document ) ? document : [document];

		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( Carbon.Resource.isResource( resource ) ) {
				var uri = resource.getURI();
				if ( uri && Carbon.URI.isIndependentlyResolvable( uri ) ) documentResources.push( resource );
			}
		}

		return documentResources;
	};

	_document.getInlineResources = function ( documentResource, document ) {
		var inlineResources = [];

		var arrayDocument = _shared.isArray( document ) ? document : [document];

		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( Carbon.InlineResource.isInlineResource( resource ) ) inlineResources.push( resource );
		}

		return inlineResources;
	};

	Carbon.Document = _document;
}( Carbon, $, jsonld, Map, _shared ));