(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _persistedInlineResource = {};

	_persistedInlineResource.injectMethods = function ( inlineResources ) {
		inlineResources = isArray( inlineResources ) ? inlineResources : [inlineResources];

		var length = inlineResources.length;
		for ( var i = 0; i < length; i ++ ) {
			var inlineResource = inlineResources[i];
			(function ( inlineResource ) {

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
				inlineResource.isDirty = function () {
					return _isDirty;
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

				inlineResource._addAddCallback( propertyAdded );

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

				inlineResource._addRemoveCallback( propertyRemoved );

				// === End: Property Modifications

				inlineResource._completePATCHRequest = function ( patchRequest ) {
					(function () {
						var length = _addModifications.length;
						for ( var i = 0; i < length; i ++ ) {
							var addModification = _addModifications[i];
							patchRequest.addAddAction( inlineResource, addModification.property, addModification.value );
						}
					}());
					(function () {
						var length = _setModifications.length;
						for ( var i = 0; i < length; i ++ ) {
							var setModification = _setModifications[i];
							patchRequest.addSetAction( inlineResource, setModification.property, setModification.value );
						}
					}());
					(function () {
						var length = _deleteModifications.length;
						for ( var i = 0; i < length; i ++ ) {
							var deleteModification = _deleteModifications[i];
							patchRequest.addDeleteAction( inlineResource, deleteModification );
						}
					}());

					return patchRequest;
				};

				inlineResource.commit = function () {
					return this.getDocumentResource().commit();
				};

				inlineResource._clean = function () {
					_isDirty = false;
					_addModifications = [];
					_setModifications = [];
					_deleteModifications = [];
				};

			}( inlineResource ));
		}
	};

	Carbon._PersistedInlineResource = _persistedInlineResource;
}( Carbon, $, jsonld, Map, _shared ));