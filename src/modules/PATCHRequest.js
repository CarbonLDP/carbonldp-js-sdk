(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _patchRequest = {};

	_patchRequest.class = Carbon.DefaultPrefixes.cp + 'PATCHRequest';
	_patchRequest.Properties = {
		addAction   : Carbon.DefaultPrefixes.cp + 'addAction',
		setAction   : Carbon.DefaultPrefixes.cp + 'setAction',
		deleteAction: Carbon.DefaultPrefixes.cp + 'deleteAction'
	};

	var _addAction = {};
	_addAction.sufix = "~add";
	_addAction.Properties = {

	};
	var _setAction = {};
	_setAction.sufix = "~set";
	_setAction.Properties = {

	};
	var _deleteAction = {};
	_deleteAction.sufix = "~delete";
	_deleteAction.Properties = {
		allValuesOf: Carbon.DefaultPrefixes.cp + 'allValuesOf'
	};

	_patchRequest.create = function () {
		var patchRequest = Carbon.Resource.create( Carbon.getGenericRequestURI() );
		patchRequest.addType( _patchRequest.class );
		_patchRequest.injectMethods( patchRequest );

		return patchRequest;
	};

	_patchRequest.injectMethods = function ( rdfResources ) {
		rdfResources = isArray( rdfResources ) ? rdfResources : [rdfResources];

		var length = rdfResources.length;
		for ( var i = 0; i < length; i ++ ) {
			var rdfResource = rdfResources[i];
			(function ( rdfResource ) {

				var _addActions = new Map();
				var _setActions = new Map();
				var _deleteActions = new Map();

				rdfResource.addAddAction = function ( subject, predicate, object ) {
					var uri = null;
					if ( Carbon.URI.isURI( subject ) ) uri = subject;
					else if ( Carbon.Resource.isResource( subject ) ) uri = subject.getURI();
					if ( ! uri ) throw "The subject is neither a URI or an RDF Resource";

					uri = uri + _addAction.sufix;

					var addAction;
					if ( _addActions.containsKey( uri ) ) {
						addAction = _addActions.get( uri );
					} else {
						addAction = Carbon.Resource.create( uri );
					}

					addAction.addProperty( predicate, object );

					if ( ! _addActions.containsKey( uri ) ) {
						_addActions.put( uri, addAction );
					}

					rdfResource.addProperty( Carbon.PATCHRequest.Properties.addAction, addAction );
				};
				rdfResource.addSetAction = function ( subject, predicate, object ) {
					var uri = null;
					if ( Carbon.URI.isURI( subject ) ) uri = subject;
					else if ( Carbon.Resource.isResource( subject ) ) uri = subject.getURI();
					if ( ! uri ) throw "The subject is neither a URI or an RDF Resource";

					uri = uri + _setAction.sufix;

					var setAction;
					if ( _setActions.containsKey( uri ) ) {
						setAction = _setActions.get( uri );
					} else {
						setAction = Carbon.Resource.create( uri );
					}

					setAction.addProperty( predicate, object );

					if ( ! _setActions.containsKey( uri ) ) {
						_setActions.put( uri, setAction );
					}

					rdfResource.addProperty( Carbon.PATCHRequest.Properties.setAction, setAction );
				};
				rdfResource.addDeleteAction = function ( subject, predicate, object ) {
					var uri = null;
					if ( Carbon.URI.isURI( subject ) ) uri = subject;
					else if ( Carbon.Resource.isResource( subject ) ) uri = subject.getURI();
					if ( ! uri ) throw "The subject is neither a URI or an RDF Resource";

					uri = uri + _deleteAction.sufix;

					var deleteAction;
					if ( _deleteActions.containsKey( uri ) ) {
						deleteAction = _deleteActions.get( uri );
					} else {
						deleteAction = Carbon.Resource.create( uri );
					}

					if ( ! object ) {
						// The object wasn't defined, delete all values
						object = Carbon.Resource.create( predicate );
						predicate = _deleteAction.Properties.allValuesOf;
					}

					deleteAction.addProperty( predicate, object );

					if ( ! _deleteActions.containsKey( uri ) ) {
						_deleteActions.put( uri, deleteAction );
					}

					rdfResource.addProperty( Carbon.PATCHRequest.Properties.deleteAction, deleteAction );
				};

				rdfResource.toJsonLD = function () {
					var jsonLDResources = [this];
					jsonLDResources = jsonLDResources.concat( _addActions.getValues() );
					jsonLDResources = jsonLDResources.concat( _setActions.getValues() );
					jsonLDResources = jsonLDResources.concat( _deleteActions.getValues() );

					return JSON.stringify( jsonLDResources );
				};

			}( rdfResource ));
		}
	};

	Carbon.PATCHRequest = _patchRequest;
}( Carbon, $, jsonld, Map, _shared ));