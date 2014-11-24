(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _persistedSource = {};

	_persistedSource.injectMethods = function ( sources ) {
		sources = _shared.isArray( sources ) ? sources : [sources];

		var length = sources.length;
		for ( var i = 0; i < length; i ++ ) {
			var source = sources[i];
			(function ( source ) {

				// === Property Modifications

				var _addModifications = [];
				var _setModifications = [];
				var _deleteModifications = [];

				function _addModificationIndexes( property ) {
					var indexes = [];
					var length = _addModifications.length;
					for ( var i = 0; i < length; i ++ ) {
						if ( _addModifications[i].property == property ) {
							indexes.push( i );
						}
					}
					return indexes;
				}

				function _setModificationIndex( property ) {
					var length = _setModifications.length;
					for ( var i = 0; i < length; i ++ ) {
						if ( _setModifications[i].property == property ) {
							return i;
						}
					}
					return - 1;
				}

				function _deleteModificationIndex( property ) {
					var length = _deleteModifications.length;
					for ( var i = 0; i < length; i ++ ) {
						if ( _deleteModifications[i] == property ) {
							return i;
						}
					}
					return - 1;
				}

				var _isDirty = false;
				source.isDirty = function () {
					if ( _isDirty ) return true;

					var inlineResources = this.getInlineResources();
					var length = inlineResources.length;
					for ( var i = 0; i < length; i ++ ) {
						var inlineResource = inlineResources[i];
						if ( inlineResource.isDirty() ) return true;
					}

					return false;
				};

				function propertyAdded( property, value ) {
					_isDirty = true;

					var deleteIndex = _deleteModificationIndex( property );
					if ( deleteIndex != - 1 ) {
						// A delete modification for this property was already executed
						// combine them into a set modification
						_deleteModifications.splice( deleteIndex, 1 );
						_setModifications.push( {
							property: property,
							value   : value
						} );
						return;
					}

					var setIndex = _setModificationIndex( property );
					if ( setIndex != - 1 ) {
						// A set modification for this property was already executed
						// move it into another addModification
						var setModification = _setModifications[setIndex];
						_setModifications.splice( setIndex, 1 );
						_addModifications.push( setModification );
					}

					_addModifications.push( {
						property: property,
						value   : value
					} );

					return true;
				}

				source._addAddCallback( propertyAdded );

				// TODO: Remove by value
				function propertyRemoved( property, value ) {
					_isDirty = true;

					var setIndex = _setModificationIndex( property );
					if ( setIndex != - 1 ) {
						// A set modification for this property was already executed
						// delete it
						_setModifications.splice( setIndex, 1 );
					} else {
						var addIndexes = _addModificationIndexes( property );
						addIndexes.reverse();
						if ( addIndexes.length > 0 ) {
							// Add modifications for this property were already executed
							// delete them
							var length = _addModifications.length;
							for ( var i = length - 1; i >= 0; i -- ) {
								if ( addIndexes[0] == i ) {
									addIndexes.splice( 0, 1 );
									_addModifications.splice( i, 1 );
								}
							}
						}
					}

					_deleteModifications.push( property );

					return true;
				}

				source._addRemoveCallback( propertyRemoved );

				// === End: Property Modifications
				// === ETag

				var _etag = null;

				source.getETag = function () {
					return _etag;
				};

				source.setETag = function ( etag ) {
					_etag = etag;
				};

				// === End: ETag

				source._createPATCHRequest = function () {
					var patchRequest = Carbon.PATCHRequest.create();

					(function () {
						var length = _addModifications.length;
						for ( var i = 0; i < length; i ++ ) {
							var addModification = _addModifications[i];
							patchRequest.addAddAction( source, addModification.property, addModification.value );
						}
					}());
					(function () {
						var length = _setModifications.length;
						for ( var i = 0; i < length; i ++ ) {
							var setModification = _setModifications[i];
							patchRequest.addSetAction( source, setModification.property, setModification.value );
						}
					}());
					(function () {
						var length = _deleteModifications.length;
						for ( var i = 0; i < length; i ++ ) {
							var deleteModification = _deleteModifications[i];
							patchRequest.addDeleteAction( source, deleteModification );
						}
					}());

					// InlineResources
					(function () {
						var inlineResources = source.getInlineResources();
						var length = inlineResources.length;
						for ( var i = 0; i < length; i ++ ) {
							var inlineResource = inlineResources[i];
							inlineResource._completePATCHRequest( patchRequest );
						}
					}());

					return patchRequest;
				};

				source.commit = function () {
					return Carbon.SourceLibrary.commit( source );
				};

				source.destroy = function () {
					return Carbon.SourceLibrary.destroy( source );
				};

				source._clean = function () {
					_isDirty = false;
					_addModifications = [];
					_setModifications = [];
					_deleteModifications = [];

					(function () {
						var inlineResources = source.getInlineResources();
						var length = inlineResources.length;
						for ( var i = 0; i < length; i ++ ) {
							var inlineResource = inlineResources[i];
							inlineResource._clean();
						}
					}());
				};

				// === InlineResources

				var _inlineResources = new Map();
				source.hasInlineResource = function ( uri ) {
					if ( ! Carbon.URI.isURI( uri ) ) {
						// The URI provided is relative
						if ( ! _shared.stringStartsWith( uri, Carbon.INLINE_RESOURCE_SIGN ) ) {
							uri = source.getURI() + Carbon.INLINE_RESOURCE_SIGN + uri;
						} else {
							uri = source.getURI() + uri;
						}
					}
					return _inlineResources.has( uri );
				};
				source.getInlineResource = function ( uri ) {
					if ( Carbon.URI.isURI( uri ) ) {
						// The URI provided isn't relative
						if ( source.isPersisted() ) throw "Cannot add an inlineResource with a complete URI to a non persisted Source.";
						else if ( Carbon.URI.getGlobalBase( uri ) != source.getURI() ) throw "The inlineResource doesn't belong to this RDFSource.";
					} else {
						uri = _shared.stringStartsWith( Carbon.INLINE_RESOURCE_SIGN ) ? uri.substring( 1, uri.length - 1 ) : uri;
						uri = source.getURI() + "#" + uri;
					}

					return _inlineResources.get( uri );
				};
				source.getInlineResources = function () {
					return _inlineResources.getValues();
				};
				source.getInlineResourceSlugs = function () {
					return _inlineResources.getKeys();
				};
				source._addInlineResources = function ( inlineResources ) {
					inlineResources = _shared.isArray( inlineResources ) ? inlineResources : [inlineResources];

					var length = inlineResources.length;
					for ( var i = 0; i < length; i ++ ) {
						var inlineResource = inlineResources[i];

						if ( ! Carbon.InlineResource.isInlineResource( inlineResource ) ) throw "The inlineResource doesn't belong to this RDFSource.";

						var uri = inlineResource.getURI();
						if ( Carbon.URI.isURI( uri ) ) {
							if ( ! Carbon.InlineResource.isInlineResourceOf( inlineResource, this ) ) throw "The inlineResource doesn't belong to this RDFSource.";
						} else {
							// The InlineResource has a relative URI
							uri = _shared.stringStartsWith( Carbon.INLINE_RESOURCE_SIGN ) ? uri.substring( 1, uri.length - 1 ) : uri;
							uri = source.getURI() + "#" + uri;
						}

						inlineResource._setDocumentResource( this );
						_inlineResources.put( uri, inlineResource );
					}
				};
				source.createInlineResource = function ( slug ) {
					if ( ! slug ) slug = new Date().getMilliseconds();

					var uri = null;
					if ( Carbon.URI.isURI( slug ) ) {
						// The URI provided isn't relative
						if ( source.isPersisted() ) throw "Cannot add an inlineResource with a complete URI to a non persisted Source.";
						else if ( Carbon.URI.getGlobalBase( slug ) != source.getURI() ) throw "The inlineResource doesn't belong to this RDFSource.";
						uri = slug;
					} else {
						slug = _shared.stringStartsWith( Carbon.INLINE_RESOURCE_SIGN ) ? slug.substring( 1, slug.length - 1 ) : slug;
						uri = source.getURI() + "#" + slug;
					}

					if ( _inlineResources.containsKey( uri ) ) throw "An InlineResource already exists with that slug";

					var inlineResource = Carbon.InlineResource._create();
					inlineResource._setURI( uri );
					Carbon._PersistedInlineResource.injectMethods( inlineResource );

					_inlineResources.put(uri, inlineResource);

					return inlineResource;
				};
				// === End: InlineResources
				// === SPARQL Methods

				source.select = function ( query ) {
					var requestURL = _shared.getRequestURL( source.getURI() );
					return Carbon.SPARQL.select( requestURL, query );
				};

				// === End: SPARQL Methods

				source.toJsonLD = function () {
					var jsonLDResources = [this];

					jsonLDResources = jsonLDResources.concat( _inlineResources.getValues() );

					return JSON.stringify( jsonLDResources );
				};

			}( source ));
		}
	};

	Carbon._PersistedSource = _persistedSource;
}( Carbon, $, jsonld, Map, _shared ));