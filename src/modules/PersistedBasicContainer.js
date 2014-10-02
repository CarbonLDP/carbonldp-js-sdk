(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _persistedBC = {};

	_persistedBC.injectMethods = function ( basicContainers ) {
		basicContainers = isArray( basicContainers ) ? basicContainers : [basicContainers];

		var length = basicContainers.length;
		for ( var i = 0; i < length; i ++ ) {
			var basicContainer = basicContainers[i];
			(function ( basicContainer ) {

				basicContainer.createSource = function ( children ) {
					//if ( stringContains( slug, carbon.INLINE_RESOURCE_SIGN ) ) throw "The slug of a source cannot contain a # symbol.";

					var deferred = $.Deferred();

					Carbon.SourceLibrary.post( basicContainer, children ).then(
						function () {
							// TODO: Decide. What should we do here?
							deferred.resolve();
						}, function ( errorResponse ) {
							// TODO: FT
							deferred.reject();
						}
					);

					return deferred;
				};
				basicContainer.createBasicContainer = function ( slug, basicContainer ) {
					// TODO
				};

			}( basicContainer ));
		}
	};

	Carbon._PersistedBasicContainer = _persistedBC;
}( Carbon, $, jsonld, Map, _shared ));