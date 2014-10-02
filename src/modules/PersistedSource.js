(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _persistedSource = {};

	_persistedSource.injectMethods = function ( sources ) {
		sources = isArray( sources ) ? sources : [sources];

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

				// === SPARQL Methods

				source.select = function ( query ) {
					var requestURL = _shared.getRequestURL( source.getURI() );
					return Carbon.SPARQL.select( requestURL, query );
				};

				// === End: SPARQL Methods

			}( source ));
		}
	};

	Carbon._PersistedSource = _persistedSource;
}( Carbon, $, jsonld, Map, _shared ));