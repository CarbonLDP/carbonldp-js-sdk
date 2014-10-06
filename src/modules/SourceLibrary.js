(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _sourceLibrary = {};

	function addRDFSources( rdfSources ) {
		rdfSources.forEach( function ( rdfSource ) {
			_sources.put( rdfSource.getURI(), rdfSource );
		} );
	}

	function prepareURI( uri ) {
		if ( Carbon.URI.isURI( uri ) ) return uri;

		// The URI is relative
		if ( ! Carbon.getURIProtocol() || ! Carbon.getDomain() || ! Carbon.getAppSlug() ) throw "Carbon hasn't been initialized to support relative uris.";

		return _sourceLibrary.getSourceBaseURI() + uri;
	}

	// Local variable to store the RDFSources retrieved
	var _sources = new Map();

	_sourceLibrary.get = function ( uri, options ) {
		var defaultOptions = {
			useCache: true
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		uri = prepareURI( uri );
		var requestURL = _shared.getRequestURL( uri );

		var deferred = $.Deferred();

		if ( _sources.containsKey( uri ) && options.useCache ) {
			deferred.resolve( _sources.get( uri ) );
		} else {
			Carbon.REST.get( requestURL, {
				authenticate: true
			} ).then(
				function ( rdfResources, jqXHR ) {
					var documentResources = Carbon.Document.getDocumentResources( rdfResources );
					Carbon.Source.injectMethods( documentResources );
					Carbon._PersistedSource.injectMethods( documentResources );

					var length = documentResources.length;
					for ( var i = 0; i < length; i ++ ) {
						var documentResource = documentResources[i];
						// Add methods depending on the RDFSource type
						if ( Carbon.BasicContainer.isBasicContainer( documentResource ) ) {
							Carbon.BasicContainer.injectMethods( documentResource );
							Carbon._PersistedBasicContainer.injectMethods( documentResource );
						} else if ( Carbon.DirectContainer.isDirectContainer( documentResource ) ) {

						} else if ( Carbon.IndirectContainer.isIndirectContainer( documentResource ) ) {

						}

						// Add Inline Resources to the documentResources
						var inlineResources = Carbon.Document.getInlineResources( documentResource, rdfResources );
						Carbon.InlineResource.injectMethods( inlineResources );
						Carbon._PersistedInlineResource.injectMethods( inlineResources );
						documentResource._addInlineResources( inlineResources );
					}

					var rdfSource = Carbon.Document.getResourceWithURI( uri, documentResources );
					if ( ! rdfSource ) {
						// TODO: FT
						deferred.reject( null );
					}

					// Add the ETag to the RDFSource
					var etag = jqXHR.getResponseHeader( Carbon.HTTPHeaders.etag );
					if ( ! etag ) {
						// TODO: Decide. Just log it?
						console.error( "-- SourceLibrary.get() > The response didn't contain an ETag." );
					} else {
						rdfSource.setETag( etag );
					}

					// Add the DocumentResources retrieved to the cache
					addRDFSources( documentResources );
					deferred.resolve( rdfSource );
				}, function ( errorObject ) {
					// TODO: FT
					deferred.reject( errorObject );
				}
			);
		}

		return deferred.promise();
	};

	_sourceLibrary.post = function ( parent, children, options ) {
		if ( ! parent || ! children ) return;

		children = _shared.isArray( children ) ? children : [children];

		var slugs = new Map();
		var sources = [];

		var length = children.length;
		for ( var i = 0; i < length; i ++ ) {
			var child = children[i];
			var slug = null;
			var source = null;

			if ( Carbon.Resource.isResource( child ) ) {
				source = child;
			} else {
				if ( _shared.hasProperty( child, "slug" ) && _shared.isString( child.slug ) ) slug = child.slug;
				if ( _shared.hasProperty( child, "source" ) && Carbon.Resource.isResource( child.source ) ) source = child.source;
				else source = Carbon.Source.create( null );
			}

			if ( source.isPersisted() ) throw "One of the RDFSources is already persisted.";

			var sourceURI = Carbon.getGenericRequestURI();
			source._setURI( sourceURI );

			sources.push( source );
			if ( slug ) {
				var genericURISlug = Carbon.URI.getSlug( sourceURI );
				slugs.put( genericURISlug, slug );
			}
		}

		var body = null;
		var slugHeader = null;

		if ( sources.length == 0 ) return;
		if ( sources.length == 1 ) {
			if ( slugs.getValues().length == 1 ) {
				slugHeader = slugs.getValues()[0];
			}
			body = sources[0].toJsonLD();
		} else {
			// TODO: Construct slug header
			body = Carbon.Document.toJsonLD( sources );
		}

		var requestURL = _shared.getRequestURL( parent.getURI() );
		var headers = {};
		if ( slugHeader ) headers["Slug"] = slugHeader;

		var deferred = $.Deferred();

		Carbon.REST.post( requestURL, body, {
			headers: headers
		} ).then(
			function ( jsonResponse, jqXHR ) {
				var location = jqXHR.getResponseHeader("Location");

				if( children.length == 1 ) {
					deferred.resolve( location );
				} else {
					// TODO: Handle multiple locations
					deferred.resolve( location );
				}
			}, function ( errorObject ) {
				// TODO: FT
				deferred.reject();
			}
		);

		return deferred;
	};

	_sourceLibrary.commit = function ( source ) {
		if ( source ) {
			return commitSource( source );
		} else {
			return commitAllSources();
		}

	};

	function commitSource( source ) {
		if ( ! source.isDirty() ) return;

		var uri = prepareURI( source.getURI() );
		var requestURL = _shared.getRequestURL( uri );

		var patchRequest = source._createPATCHRequest();

		var headers = {};
		headers[Carbon.HTTPHeaders.ifMatch] = source.getETag();

		var deferred = $.Deferred();

		Carbon.REST.patch( requestURL, patchRequest, {
			headers: headers
		} ).then(
			function ( jqXHR ) {
				var etag = jqXHR.getResponseHeader( Carbon.HTTPHeaders.etag );
				if ( ! etag ) {
					// TODO: Decide. Just log it?
					console.error( "-- SourceLibrary.commit() > The response didn't contain an ETag." );
				} else {
					source.setETag( etag );
				}

				source._clean();
				deferred.resolve();
			}, function ( errorObject ) {
				// TODO: FT
				deferred.reject();
			}
		);

		return deferred;
	}

	function commitAllSources() {

	}

	_sourceLibrary.getSourceBaseURI = function () {
		return Carbon.getAPIBaseURI() + "apps/" + Carbon.getAppSlug() + "/";
	};

	Carbon.SourceLibrary = _sourceLibrary;
}( Carbon, $, jsonld, Map, _shared ));