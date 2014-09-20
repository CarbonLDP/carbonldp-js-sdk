/**
 * @overview Carbon LDP JavaScript Library v1.0.0
 * @copyright Base22, LLC. 2014
 */

/** Directives for use when pasting code for evaluation at: http://www.jslint.com/ */
/*jslint browser: false, devel: true, debug: false, sloppy: false, white: true */

/** Immediately Invoked Function Expression (IIFE) */

(function ( root, factory, $, jsonld, Map ) {
	'use strict';

	if ( ! factory ) {
		console.error( "The Carbon factory couldn't be initialized." );
		return null;
	}

	// Setup defaults for all ajax calls
	$.ajaxSetup( {
		headers : {
			'Accept': 'application/ld+json'
		},
		dataType: 'json'
	} );

	root.Carbon = factory( $, jsonld, Map );

}( this, function ( $, jsonld, Map ) {
		'use strict';

		if ( ! $ ) {
			console.error( "The Carbon LDP JavaScript library depends on jQuery. Please include it on the source code." );
			return null;
		}

		if ( ! jsonld ) {
			console.error( "The Carbon LDP JavaScript library depends on JSON-LD. Please include it on the source code." );
			return null;
		}
		if ( ! Map ) {
			console.error( "The Carbon LDP JavaScript library depends on the Map library. Please include it on the source code." );
			return null;
		}

		// Private variables
		var _version = "0.2.0";
		var _requestProtocol = "https";
		var _uriProtocol = "http";
		var _domain = "carbonldp.com";

		// 0 - off
		// 1 - errors
		// 2 - errors / warnings
		// 3 - errors / warnings / debug
		// 4 - errors / warnings / debug / trace
		var _loggingLevel = 0;
		var _canShowErrors = (typeof console !== 'undefined' && typeof console.error !== 'undefined');
		var _canShowWarnings = (typeof console !== 'undefined' && typeof console.warn !== 'undefined');
		var _canShowDebug = (typeof console !== 'undefined' && typeof console.debug !== 'undefined');
		var _canShowLog = (typeof console !== 'undefined' && typeof console.log !== 'undefined');

		var _appSlug = null;
		var _api = null;

		// ----------------------------------------------------------------------
		// Carbon
		// ----------------------------------------------------------------------

		var carbon = function () {
		};

		// Public variables and methods
		carbon.getVersion = function () {
			return _version;
		};

		carbon.getAPIRequestURL = function () {
			return _requestProtocol + "://" + _domain + "/";
		};

		carbon.getAPIBaseURI = function () {
			return _uriProtocol + "://" + _domain + "/";
		};

		carbon.getAPIVersion = function () {
			if ( ! _api ) {
				throw 'Carbon hasn\'t been initiated';
			}
			return _api.getVersion();
		};

		carbon.setDefaultAppSlug = function ( appSlug ) {
			_appSlug = appSlug;
		};

		carbon.HTTPHeaders = {
			etag   : "ETag",
			ifMatch: "If-Match"
		};

		carbon.DefaultPrefixes = {
			acl     : 'http://www.w3.org/ns/auth/acl#',
			api     : 'http://purl.org/linked-data/api/vocab#',
			c       : 'http://carbonldp.com/ns/v1/platform#',
			cs      : 'http://carbonldp.com/ns/v1/security#',
			cp      : 'http://carbonldp.com/ns/v1/patch#',
			cc      : 'http://creativecommons.org/ns#',
			cert    : 'http://www.w3.org/ns/auth/cert#',
			dbp     : 'http://dbpedia.org/property/',
			dc      : 'http://purl.org/dc/terms/',
			dc11    : 'http://purl.org/dc/elements/1.1/',
			dcterms : 'http://purl.org/dc/terms/',
			doap    : 'http://usefulinc.com/ns/doap#',
			example : 'http://example.org/ns#',
			exif    : 'http://www.w3.org/2003/12/exif/ns#',
			fn      : 'http://www.w3.org/2005/xpath-functions#',
			foaf    : 'http://xmlns.com/foaf/0.1/',
			geo     : 'http://www.w3.org/2003/01/geo/wgs84_pos#',
			geonames: 'http://www.geonames.org/ontology#',
			gr      : 'http://purl.org/goodrelations/v1#',
			http    : 'http://www.w3.org/2006/http#',
			ldp     : 'http://www.w3.org/ns/ldp#',
			log     : 'http://www.w3.org/2000/10/swap/log#',
			owl     : 'http://www.w3.org/2002/07/owl#',
			rdf     : 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
			rdfs    : 'http://www.w3.org/2000/01/rdf-schema#',
			rei     : 'http://www.w3.org/2004/06/rei#',
			rsa     : 'http://www.w3.org/ns/auth/rsa#',
			rss     : 'http://purl.org/rss/1.0/',
			sfn     : 'http://www.w3.org/ns/sparql#',
			sioc    : 'http://rdfs.org/sioc/ns#',
			skos    : 'http://www.w3.org/2004/02/skos/core#',
			swrc    : 'http://swrc.ontoware.org/ontology#',
			types   : 'http://rdfs.org/sioc/types#',
			vcard   : 'http://www.w3.org/2001/vcard-rdf/3.0#',
			wot     : 'http://xmlns.com/wot/0.1/',
			xhtml   : 'http://www.w3.org/1999/xhtml#',
			xsd     : 'http://www.w3.org/2001/XMLSchema#'
		};
		carbon.NS = carbon.DefaultPrefixes.c;
		carbon.SECURITY_NS = carbon.DefaultPrefixes.cs;
		carbon.INLINE_RESOURCE_SIGN = '#';
		carbon.SYSTEM_RES_SIGN = '#$';

		carbon.API = (function ( carbon, $ ) {
			var _api = {};
			_api.class = carbon.DefaultPrefixes.api + 'API';

			_api.Property = {
				version: {
					uri     : carbon.DefaultPrefixes.doap + 'version',
					multi   : false,
					literal : true,
					readOnly: true
				}
			};
			return _api;
		}( carbon, $ ));
		// ----------------------------------------------------------------------
		// Auth
		// ----------------------------------------------------------------------

		carbon.Auth = (function ( carbon, $, Map ) {
			var _authHeaders = {
				authMethod: "X-Carbon-Auth-Method",
				username  : "X-Carbon-Agent-Username",
				password  : "X-Carbon-Agent-Password",
				key       : "X-Carbon-Agent-Key",
				token     : "X-Carbon-Agent-Token"
			};

			var auth = {};

			auth.Token = (function ( carbon, $ ) {
				var _token = {};

				_token.class = carbon.DefaultPrefixes.cs + 'Token';

				_token.Property = {
					key: {
						uri     : carbon.DefaultPrefixes.cs + 'key',
						multi   : false,
						literal : true,
						readOnly: true
					}
				};

				_token.injectMethods = function ( resources ) {
					if ( ! ( resources instanceof Array ) ) {
						resources = [ resources ];
					}

					resources.forEach( function ( resource ) {
						carbon.Resource.injectPropertyMethods( resource, _token.Property );
					} );
				};

				_token.isToken = function ( resource ) {
					if ( ! carbon.Resource.isResource( resource ) ) return false;
					return resource.isOfType( _token.class );
				};

				return _token;
			}( carbon, $ ));

			auth.Agent = (function ( carbon, $ ) {
				var _agent = {};

				_agent.class = carbon.DefaultPrefixes.cs + 'Agent';
				_agent.Property = {
					uuid    : {
						uri    : carbon.DefaultPrefixes.c + "uuid",
						multi  : false,
						literal: true
					},
					fullName: {
						uri    : carbon.DefaultPrefixes.foaf + "name",
						multi  : false,
						literal: true
					},
					email   : {
						uri    : carbon.DefaultPrefixes.vcard + "email",
						literal: true
					},
					password: {
						uri    : carbon.DefaultPrefixes.cs + "password",
						multi  : false,
						literal: true
					},
					apiKey  : {
						uri     : carbon.DefaultPrefixes.cs + "apiKey",
						multi   : false,
						readOnly: true,
						literal : true
					}
				};

				_agent.create = function ( uri ) {
					uri = typeof uri !== 'undefined' ? uri : carbon.getGenericRequestURI();

					var agentResource = carbon.Resource.create( uri );
					agentResource.addType( _agent.class );

					_agent.injectMethods( agentResource );

					return agentResource;
				};

				_agent.isAgent = function ( resource ) {
					if ( ! carbon.Resource.isResource( resource ) ) return false;
					return resource.isOfType( _agent.class );
				};

				_agent.injectMethods = function ( resources ) {
					if ( ! ( resources instanceof Array ) ) {
						resources = [ resources ];
					}

					resources.forEach( function ( resource ) {

						carbon.Resource.injectPropertyMethods( resource, _agent.Property );

					} );
				};

				return _agent;
			}( carbon, $ ));

			var _authMethods = ['token', 'basic', 'username', 'key'];
			var _method = null;
			auth.getMethod = function () {
				return _method;
			};
			auth.setMethod = function ( method ) {
				if ( method === null ) {
					_method = null;
					return;
				}
				if ( $.inArray( method, _authMethods ) == - 1 ) {
					console.error( '<< Carbon.Auth.setMethod() > The method: "' + method + '" is not supported.' );
					throw 'Method not supported';
				}
				_method = method;
			};

			var _credentials = {
				token   : null,
				username: {
					username: null,
					password: null
				},
				key     : null
			};

			auth.login = function ( username, password, remember ) {
				remember = typeof remember !== 'undefined' ? remember : false;

				var headers = {
					"Authorization": "Basic " + btoa( username + ":" + password ),
					"Accept"       : "application/ld+json"
				};

				if ( remember ) {
					headers["Prefer"] = "return=\"cs:Cookie\"";
				}

				var deferred = $.Deferred();

				$.ajax( {
					type   : 'GET',
					url    : carbon.getAPIRequestURL() + 'auth/token',
					headers: headers
				} ).then(
					function ( jsonResponse, textStatus, jqXHR ) {
						carbon.digestRDFResources( jsonResponse ).then(
							function ( rdfResources ) {
								var tokenResource = carbon.Document.getResourceOfType( auth.Token.class, rdfResources );
								if ( ! tokenResource ) {
									// TODO: Fail
									deferred.reject();
								} else {
									carbon.Auth.Token.injectMethods( tokenResource );

									auth.setToken( tokenResource );
									deferred.resolve();
								}
							}, function ( errorObject ) {
								// TODO: FT
								deferred.reject( errorObject );
							}
						);
					}, function ( jqXHR, textStatus, errorThrown ) {
						// TODO: FT
						deferred.reject();
					}
				);

				return deferred;
			};

			auth.hasCredentials = function () {
				var method = auth.getMethod();
				if ( method === null ) return false;

				switch ( method ) {
					case "basic":
					case "username":
						var username = _credentials.username.username;
						var password = _credentials.username.password;

						if ( username === null ) return false;
						if ( password === null ) return false;

						break;
					case "token":
						var token = _credentials.token;

						if ( token === null ) return false;
						break;
					case "key":
						var key = _credentials.key;

						if ( key === null ) return false;
						break;
					default:
						return false;
				}
				return true;
			};

			auth.eraseCredentials = function () {
				carbon.Auth.setMethod( null );
				_credentials = {
					token   : null,
					username: {
						username: null,
						password: null
					},
					key     : null
				};
			};

			auth.setToken = function ( tokenResource ) {
				var tokenKey = tokenResource.getKey();
				if ( tokenKey === null ) {
					// The token resource didn't have a key
					throw 'The token doesn\'t contain a key';
				}

				auth.setMethod( 'token' );
				_credentials.token = tokenKey;
			};

			auth.setCredentialHeaders = function ( headers ) {
				var method = auth.getMethod();
				if ( method === null ) return headers;

				var authHeaders = {};
				switch ( method ) {
					case "token":
						var token = _credentials.token;

						if ( token === null ) break;

						authHeaders[_authHeaders.authMethod] = method;
						authHeaders[_authHeaders.token] = token;
						break;
					default:
						break;
				}

				$.extend( headers, authHeaders );
				return headers;
			};

			auth.registerAgent = function ( agent ) {
				var headers = {
					"Content-Type": "application/ld+json",
					"Accept"      : "application/ld+json"
				};

				headers = carbon.Auth.setCredentialHeaders( headers );

				return $.ajax( {
					type   : 'POST',
					url    : carbon.getAPIRequestURL() + 'agents',
					headers: headers,
					data   : JSON.stringify( agent )
				} ).then(
					function ( jsonResponse, textStatus, jqXHR ) {
						return carbon.digestRDFResources( jsonResponse );
					}, function ( jqXHR, textStatus, errorThrown ) {
						// TODO: FT
					}
				).then(
					function ( ldpResources ) {
						var deferred = $.Deferred();

						carbon.Auth.Agent.injectMethods( ldpResources );

						deferred.resolve( ldpResources );
						return deferred.promise();
					}, function ( errorObject ) {
						// TODO: FT
					}
				);
			};

			return auth;
		}( carbon, $, Map ));

		// ----------------------------------------------------------------------
		// End: Auth
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// REST
		// ----------------------------------------------------------------------

		carbon.REST = (function ( carbon, $, Map ) {
			var _rest = {};

			_rest.get = function ( uri, options ) {
				log( ">> REST.get()" );

				var defaultOptions = {
					authenticate: true
				};
				if ( typeof options == 'object' ) {
					options = $.extend( defaultOptions, options );
				} else {
					options = defaultOptions;
				}

				debug( "-- REST.get() > GET resource: %s, options: %o", uri, options );

				var headers = {
					"Accept": "application/ld+json"
				};

				if ( options.authenticate ) {
					headers = carbon.Auth.setCredentialHeaders( headers );
				}

				var deferred = $.Deferred();
				$.ajax( {
					type   : 'GET',
					url    : uri,
					headers: headers
				} ).then(
					function ( jsonResponse, textStatus, jqXHR ) {
						debug( "-- REST.get() > The request was successfull." );
						log( "-- REST.get() > Digesting response..." );
						carbon.digestRDFResources( jsonResponse ).then(
							function ( rdfResources ) {
								debug( "<< REST.get() > The response was successfully digested." );
								deferred.resolve( rdfResources, jqXHR );
							}, function ( errorObject ) {
								error( "<< REST.get() > The response couldn't be digested." );
								deferred.reject( errorObject );
							}
						);
					}, function ( jqXHR, textStatus, errorThrown ) {
						error( "<< REST.get() > The request failed. Response: %o", jqXHR );
						deferred.reject();
					}
				);

				return deferred.promise();
			};

			_rest.patch = function ( uri, patchRequest, options ) {
				log( ">> REST.patch()" );

				var defaultOptions = {
					authenticate: true,
					headers     : null
				};
				if ( typeof options == 'object' ) {
					options = $.extend( defaultOptions, options );
				} else {
					options = defaultOptions;
				}

				debug( "-- REST.patch() > PATCH resource: %s, patchRequest: %o, options: %o", uri, patchRequest, options );

				var headers = {
					"Accept"      : "application/ld+json",
					"Content-Type": "application/ld+json"
				};

				if ( options.authenticate ) {
					headers = carbon.Auth.setCredentialHeaders( headers );
				}

				if ( options.headers ) {
					headers = $.extend( headers, options.headers );
				}

				var deferred = $.Deferred();
				$.ajax( {
					type       : 'PATCH',
					url        : uri,
					dataType   : "text",
					headers    : headers,
					crossDomain: true,
					data       : patchRequest.toJsonLD()
				} ).then(
					function ( jsonResponse, textStatus, jqXHR ) {
						debug( "-- REST.patch() > The request was successfull." );
						deferred.resolve( jqXHR );
					}, function ( jqXHR, textStatus, errorThrown ) {
						error( "<< REST.patch() > The request failed. Response: %o", jqXHR );
						deferred.reject();
					}
				);

				return deferred.promise();
			};

			return _rest;
		}( carbon, $, Map ));

		// ----------------------------------------------------------------------
		// End: REST
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// SourceLibrary
		// ----------------------------------------------------------------------

		carbon.SourceLibrary = (function ( carbon, $, Map ) {
			var _sourceLibrary = {};

			function addRDFSources( rdfSources ) {
				rdfSources.forEach( function ( rdfSource ) {
					_sources.put( rdfSource.getURI(), rdfSource );
				} );
			}

			function prepareURI( uri ) {
				if ( carbon.URI.isURI( uri ) ) return uri;

				// The URI is relative
				if ( ! _uriProtocol || ! _domain || ! _appSlug ) throw "Carbon hasn't been initialized to support relative uris.";

				return _sourceLibrary.getSourceBaseURI() + uri;
			}

			function getRequestURL( uri ) {
				if ( ! _requestProtocol || ! _uriProtocol ) throw "Carbon hasn't been initialized to support relative uris.";
				if ( stringStartsWith( uri, _requestProtocol ) ) return;
				return uri.replace( _uriProtocol, _requestProtocol );
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
				var requestURL = getRequestURL( uri );

				var deferred = $.Deferred();

				if ( _sources.containsKey( uri ) && options.useCache ) {
					deferred.resolve( _sources.get( uri ) );
				} else {
					carbon.REST.get( requestURL, {
						authenticate: true
					} ).then(
						function ( rdfResources, jqXHR ) {
							var documentResources = carbon.Document.getDocumentResources( rdfResources );
							carbon.Source.injectMethods( documentResources );
							carbon.PersistedSource.injectMethods( documentResources );

							// Add Inline Resources to the documentResources
							var length = documentResources.length;
							for ( var i = 0; i < length; i ++ ) {
								var documentResource = documentResources[i];
								var inlineResources = carbon.Document.getInlineResources( documentResource, rdfResources );
								carbon.InlineResource.injectMethods( inlineResources );
								documentResource.addInlineResources( inlineResources );
							}

							var rdfSource = carbon.Document.getResourceWithURI( uri, documentResources );
							if ( ! rdfSource ) {
								// TODO: FT
								deferred.reject( errorObject );
							}

							// Add the ETag to the RDFSource
							var etag = jqXHR.getResponseHeader( carbon.HTTPHeaders.etag );
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

			_sourceLibrary.commit = function ( source ) {
				if ( ! source.isDirty() ) return;

				var uri = prepareURI( source.getURI() );
				var requestURL = getRequestURL( uri );

				var patchRequest = source._createPATCHRequest();

				var headers = {};
				headers[carbon.HTTPHeaders.ifMatch] = source.getETag();

				var deferred = $.Deferred();

				carbon.REST.patch( requestURL, patchRequest, {
					headers: headers
				} ).then(
					function ( jqXHR ) {
						var etag = jqXHR.getResponseHeader( carbon.HTTPHeaders.etag );
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
			};

			_sourceLibrary.getSourceBaseURI = function () {
				return carbon.getAPIBaseURI() + "apps/" + _appSlug + "/";
			};

			return _sourceLibrary;
		}( carbon, $, Map ));

		// ----------------------------------------------------------------------
		// End: ResourceLibrary
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// RDF Document
		// ----------------------------------------------------------------------

		carbon.Document = (function ( carbon, $ ) {
			var _document = {};

			_document.getResourceOfType = function ( type, document ) {
				var arrayDocument = isArray( document ) ? document : [document];

				var length = arrayDocument.length;
				for ( var i = 0; i < length; i ++ ) {
					var resource = arrayDocument[i];
					if ( hasFunction( resource, "isOfType" ) ) {
						if ( resource.isOfType( type ) ) return resource;
					}
				}

				return null;
			};

			_document.getResourceWithURI = function ( uri, document ) {
				var arrayDocument = isArray( document ) ? document : [document];

				var length = arrayDocument.length;
				for ( var i = 0; i < length; i ++ ) {
					var resource = arrayDocument[i];
					if ( carbon.Resource.isResource( resource ) ) {
						if ( resource.getURI() == uri ) return resource;
					}
				}

				return null;
			};

			_document.getDocumentResources = function ( document ) {
				var documentResources = [];

				var arrayDocument = isArray( document ) ? document : [document];

				var length = arrayDocument.length;
				for ( var i = 0; i < length; i ++ ) {
					var resource = arrayDocument[i];
					if ( carbon.Resource.isResource( resource ) ) {
						var uri = resource.getURI();
						if ( uri && carbon.URI.isIndependentlyResolvable( uri ) ) documentResources.push( resource );
					}
				}

				return documentResources;
			};

			_document.getInlineResources = function ( documentResource, document ) {
				var inlineResources = [];

				var arrayDocument = isArray( document ) ? document : [document];

				var length = arrayDocument.length;
				for ( var i = 0; i < length; i ++ ) {
					var resource = arrayDocument[i];
					if ( carbon.InlineResource.isInlineResource( resource ) ) inlineResources.push( resource );
				}

				return inlineResources;
			};

			return _document;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: RDF Document
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// URI
		// ----------------------------------------------------------------------

		carbon.URI = (function ( carbon, $ ) {
			var _uri = {};

			var _uriPattern = new RegExp(
					'^(https?:\\/\\/)?' + // Protocol
					'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain Name
					'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
					'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and Path
					'(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
					'(\\#[-a-z\\d_]*)?$' // Fragment Locator
				, 'i' );

			_uri.isURI = function ( uri ) {
				if ( ! isString( uri ) ) return false;

				return _uriPattern.test( uri );
			};

			_uri.isIndependentlyResolvable = function ( uri ) {
				if ( ! isString( uri ) ) throw 'Not a String!';

				return ! stringContains( uri, carbon.INLINE_RESOURCE_SIGN );
			};

			return _uri;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: URI
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// RDF Resource
		// ----------------------------------------------------------------------

		carbon.Resource = (function ( carbon, $ ) {
			var _resource = {};

			_resource.class = carbon.DefaultPrefixes.ldp + 'Resource';

			_resource.Property = {
				type: carbon.DefaultPrefixes.rdf + 'type'
			};

			_resource.isResource = function ( rdfResource ) {
				if ( ! rdfResource ) return false;
				return rdfResource.hasOwnProperty( "@id" );
			};

			_resource.injectMethods = function ( rdfResources ) {
				if ( ! isArray( rdfResources ) ) {
					rdfResources = [ rdfResources ];
				}

				rdfResources.forEach( function ( rdfResource ) {

					rdfResource.getURI = function () {
						return this["@id"];
					};

					rdfResource.isOfType = function ( type ) {
						var property = carbon.Resource.Property.type;
						if ( ! this.hasOwnProperty( property ) ) {
							return false;
						}
						var values = this[property];
						var isOfType = false;
						values.some( function ( value ) {
							if ( carbon.Resource.isResource( value ) ) {
								if ( value["@id"] == type ) {
									isOfType = true;
									return true;
								}
							}
						} );
						return isOfType;
					};

					rdfResource.addType = function ( type ) {
						var typeResource = carbon.Resource.create( type );
						this.addProperty( carbon.Resource.Property.type, typeResource );
					};

					rdfResource.hasProperty = function ( property ) {
						return this.hasOwnProperty( property );
					};

					rdfResource.getProperty = function ( property ) {
						if ( ! this.hasProperty( property ) ) return null;
						if ( this[property] instanceof Array ) {
							if ( this[property].length < 1 ) return null;
							return this[property][0];
						}
						return this[property];
					};

					rdfResource.getPropertyValue = function ( property ) {
						var propertyObject = this.getProperty( property );
						if ( propertyObject === null ) return null;
						if ( propertyObject.hasOwnProperty( '@value' ) ) return propertyObject['@value'];
						return null;
					};

					rdfResource.getPropertyURI = function ( property ) {
						var propertyObject = this.getProperty( property );
						if ( propertyObject === null ) return null;
						if ( propertyObject.hasOwnProperty( '@id' ) ) return propertyObject['@id'];
						return null;
					};

					rdfResource.listProperties = function ( property ) {
						if ( ! this.hasProperty( property ) ) return null;
						if ( this[property] instanceof Array ) {
							if ( this[property].length < 1 ) return null;
							return this[property];
						}
						return null;
					};

					rdfResource.listPropertyValues = function ( property ) {
						var values = [];
						if ( ! this.hasProperty( property ) ) return values;
						var propertyArray = isArray( this[property] ) ? this[property] : [this[property]];
						var length = propertyArray.length;
						for ( var i = 0; i < length; i ++ ) {
							var propertyObject = propertyArray[i];
							if ( property ) {
								if ( propertyObject.hasOwnProperty( '@value' ) ) values.push( propertyObject['@value'] );
							}
						}
						return values;
					};

					var _propertyCallbacks = {
						add   : [],
						remove: []
					};
					rdfResource._getAddCallbacks = function () {
						return _propertyCallbacks.add;
					};
					rdfResource._addAddCallback = function ( callback ) {
						_propertyCallbacks.add.push( callback );
					};
					rdfResource._getRemoveCallbacks = function () {
						return _propertyCallbacks.remove;
					};
					rdfResource._addRemoveCallback = function ( callback ) {
						_propertyCallbacks.remove.push( callback );
					};

					rdfResource.addProperty = function ( property, value ) {
						var propertyArray;
						if ( this.hasProperty( property ) ) {
							propertyArray = this.listProperties( property );
						} else {
							propertyArray = [];
						}

						// TODO: Do proper type casting
						var propertyValue = {};
						if ( carbon.Resource.isResource( value ) ) {
							propertyValue["@id"] = value.getURI();
						} else {
							propertyValue["@value"] = value;
						}

						// Execute callbacks
						var addCallbacks = rdfResource._getAddCallbacks();
						var addIt = true;
						for ( var i = 0; i < addCallbacks.length; i ++ ) {
							var addCallback = addCallbacks[i];
							if ( ! addCallback( property, value ) ) {
								addIt = false;
								break;
							}
						}

						if ( addIt ) {
							propertyArray.push( propertyValue );
							this[property] = propertyArray;
						}
					};

					rdfResource.setProperty = function ( property, value ) {
						this.removeProperty( property );
						if ( value === undefined || value === null ) return;
						this.addProperty( property, value );
					};

					// TODO: Add remove by value
					rdfResource.removeProperty = function ( property ) {
						// Execute callbacks
						var removeCallbacks = rdfResource._getRemoveCallbacks();
						var removeIt = true;
						for ( var i = 0; i < removeCallbacks.length; i ++ ) {
							var removeCallback = removeCallbacks[i];
							if ( ! removeCallback( property ) ) {
								removeIt = false;
								break;
							}
						}

						if ( ! this.hasOwnProperty( property ) ) {
							return;
						}

						if ( removeIt ) {
							delete this[property];
						}
					};

				} );
			};

			_resource.injectPropertyMethods = function ( resource, propertiesObject ) {
				for ( var property in propertiesObject ) {
					// This is needed so the Object properties don't get included
					if ( propertiesObject.hasOwnProperty( property ) ) {
						var capitalizedProperty = property.charAt( 0 ).toUpperCase() + property.slice( 1 );

						var propertyValue = propertiesObject[property];
						if ( typeof propertyValue == 'string' || propertyValue instanceof String ) {
							var stringValue = propertyValue;
							propertyValue = {};
							propertyValue.uri = stringValue;
						}
						var defaultPropertyOptions = {
							multi   : true,
							readOnly: false,
							literal : null
						};
						$.extend( defaultPropertyOptions, propertyValue );
						propertyValue = defaultPropertyOptions;

						if ( propertyValue.multi ) {
							// Adder
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["add" + capitalizedProperty] = function ( value ) {
									this.addProperty( _propertyURI, value );
								};
							})();
						}
						// Single-Getter
						if ( propertyValue.literal === null ) {
							if ( propertyValue.multi ) {
								(function () {
									var _propertyURI = propertyValue.uri;
									resource["list" + capitalizedProperty + "s"] = function () {
										return this.listProperties( _propertyURI );
									};
								})();
							}

							(function () {
								var _propertyURI = propertyValue.uri;
								resource["get" + capitalizedProperty] = function () {
									return this.getProperty( _propertyURI );
								};
							})();
						} else if ( propertyValue.literal ) {
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["get" + capitalizedProperty] = function () {
									return this.getPropertyValue( _propertyURI );
								};
							})();

							if ( propertyValue.multi ) {
								(function () {
									var _propertyURI = propertyValue.uri;
									resource["list" + capitalizedProperty + "s"] = function () {
										return this.listPropertyValues( _propertyURI );
									};
								})();
							}
						} else {
							if ( propertyValue.multi ) {
								(function () {
									var _propertyURI = propertyValue.uri;
									resource["list" + capitalizedProperty + "s"] = function () {
										return this.listProperties( _propertyURI );
									};
								})();
							}

							(function () {
								var _propertyURI = propertyValue.uri;
								resource["get" + capitalizedProperty + "URI"] = function () {
									return this.getPropertyURI( _propertyURI );
								};
							})();
						}

						if ( ! propertyValue.readOnly ) {
							// Setter
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["set" + capitalizedProperty] = function ( value ) {
									this.setProperty( _propertyURI, value );
								};
							})();

							(function () {
								var _propertyURI = propertyValue.uri;
								resource["deleteAll" + capitalizedProperty + "s"] = function () {
									this.removeProperty( _propertyURI );
								};
							})();
						}
					}
				}
			};

			_resource.create = function ( uri ) {
				var newResource = {};

				newResource["@id"] = uri;

				_resource.injectMethods( newResource );

				return newResource;
			};

			return _resource;
		}( carbon, $ ) );

		// ----------------------------------------------------------------------
		// End: RDF Resource
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// RDF Inline Resource
		// ----------------------------------------------------------------------

		carbon.InlineResource = (function ( carbon, $ ) {
			var _inlineResource = {};

			_inlineResource.isInlineResource = function ( resource ) {
				if ( ! carbon.Resource.isResource( resource ) ) return false;

				var uri = resource.getURI();
				if ( ! uri ) return false;

				if ( ! carbon.URI.isURI( uri ) ) {
					// The uri is relative
					return stringStartsWith( uri, carbon.INLINE_RESOURCE_SIGN );
				} else {
					return stringContains( uri, carbon.INLINE_RESOURCE_SIGN );
				}
			};

			_inlineResource.isInlineResourceOf = function ( resource, documentResource ) {
				if ( ! _inlineResource.isInlineResource( resource ) ) return false;
				if ( ! carbon.Resource.isResource( documentResource ) ) throw "The documentResource provided isn't an RDF Resource.";

				var uri = resource.getURI();
				if ( ! uri ) return false;
				return stringStartsWith( uri, documentResource.getURI() + carbon.INLINE_RESOURCE_SIGN );
			};

			_inlineResource.injectMethods = function ( rdfResources ) {
				var length = rdfResources.length;
				for ( var i = 0; i < length; i ++ ) {
					var rdfResource = rdfResources[i];
					(function ( rdfResource ) {

					}( rdfResource ));
				}
			};

			return _inlineResource;
		}( carbon, $ ) );

		// ----------------------------------------------------------------------
		// End: Inline Resource
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// Persisted Resource
		// ----------------------------------------------------------------------

		carbon.PersistedResource = (function ( carbon, Map, $ ) {
			var _persistedResource = {};

			_persistedResource.injectMethods = function ( rdfResources ) {
				var length = rdfResources.length;
				for ( var i = 0; i < length; i ++ ) {
					var rdfResource = rdfResources[i];
					(function ( rdfResource ) {

					}( rdfResource ));
				}
			};

			return _persistedResource;
		}( carbon, Map, $ ) );

		// ----------------------------------------------------------------------
		// End: Persisted Resource
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// RDF Source
		// ----------------------------------------------------------------------

		carbon.Source = (function ( carbon, Map, $ ) {
			var _source = {};

			_source.class = carbon.DefaultPrefixes.ldp + 'RDFSource';

			_source.Property = {

			};

			_source.injectMethods = function ( resources ) {
				resources.forEach( function ( resource ) {

					// === InlineResources

					var _inlineResources = new Map();
					resource.getInlineResource = function ( uri ) {
						return _inlineResources.get( uri );
					};
					resource.addInlineResources = function ( inlineResources ) {
						inlineResources = isArray( inlineResources ) ? inlineResources : [inlineResources];

						var length = inlineResources.length;
						for ( var i = 0; i < length; i ++ ) {
							var inlineResource = inlineResources[i];

							if ( ! carbon.InlineResource.isInlineResource( inlineResource ) ) throw "The inlineResource doesn't belong to this RDFSource.";

							var uri = inlineResource.getURI();
							if ( ! carbon.URI.isURI( uri ) ) {
								// The InlineResource has a relative URI
								uri = this.getURI() + uri;
								inlineResource["@id"] = uri;
							} else {
								if ( ! carbon.InlineResource.isInlineResourceOf( inlineResource, this ) ) throw "The inlineResource doesn't belong to this RDFSource.";
							}

							_inlineResources.put( uri, inlineResource );
						}
					};
					resource.getInlineResources = function () {
						return _inlineResources.getValues();
					};

					// === End: InlineResources

					resource.toJsonLD = function () {
						var jsonLDResources = [this];

						jsonLDResources = jsonLDResources.concat( _inlineResources.getValues() );

						return JSON.stringify( jsonLDResources );
					};

				} );
			};

			return _source;
		}( carbon, Map, $ ));

		// ----------------------------------------------------------------------
		// End: RDF Source
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// Persisted RDF Source
		// ----------------------------------------------------------------------

		carbon.PersistedSource = (function ( carbon, Map, $ ) {
			var _persistedSource = {};

			_persistedSource.injectMethods = function ( sources ) {
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
								if ( inlineResources.isDirty() ) return true;
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
							var patchRequest = carbon.PATCHRequest.create();

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

							return patchRequest;
						};

						source.commit = function () {
							return carbon.SourceLibrary.commit( source );
						};

						source._clean = function () {
							_isDirty = false;
							_addModifications = [];
							_setModifications = [];
							_deleteModifications = [];
						};

					}( source ));
				}
			};

			return _persistedSource;
		}( carbon, Map, $ ));

		// ----------------------------------------------------------------------
		// End: Persisted RDF Source
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// BasicContainer
		// ----------------------------------------------------------------------

		carbon.BasicContainer = (function ( carbon, $ ) {
			var _basicContainer = {};

			_basicContainer.class = carbon.DefaultPrefixes.ldp + 'BasicContainer';

			_basicContainer.Property = {
				contains: carbon.DefaultPrefixes.ldp + 'contains',
				member  : carbon.DefaultPrefixes.ldp + 'member'
			};

			_basicContainer.injectMethods = function ( sources ) {
				sources.forEach( function ( source ) {

					// TODO: FT

				} );
			};

			return _basicContainer;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: BasicContainer
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// DirectContainer
		// ----------------------------------------------------------------------

		carbon.DirectContainer = (function ( carbon, $ ) {
			var _directContainer = {};

			_directContainer.class = carbon.DefaultPrefixes.ldp + 'DirectContainer';

			_directContainer.Property = {
				contains: carbon.DefaultPrefixes.ldp + 'contains'
			};

			_directContainer.injectMethods = function ( sources ) {
				sources.forEach( function ( source ) {

					// TODO: FT

				} );
			};

			return _directContainer;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: DirectContainer
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// IndirectContainer
		// ----------------------------------------------------------------------

		carbon.IndirectContainer = (function ( carbon, $ ) {
			var _indirectContainer = {};

			_indirectContainer.class = carbon.DefaultPrefixes.ldp + 'IndirectContainer';

			_indirectContainer.Property = {
				contains: carbon.DefaultPrefixes.ldp + 'contains'
			};

			_indirectContainer.injectMethods = function ( sources ) {
				sources.forEach( function ( source ) {

					// TODO: FT

				} );
			};

			return _indirectContainer;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: IndirectContainer
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// PATCH Request
		// ----------------------------------------------------------------------

		carbon.PATCHRequest = (function ( carbon, $ ) {
			var _patchRequest = {};

			_patchRequest.class = carbon.DefaultPrefixes.cp + 'PATCHRequest';
			_patchRequest.Properties = {
				addAction   : carbon.DefaultPrefixes.cp + 'addAction',
				setAction   : carbon.DefaultPrefixes.cp + 'setAction',
				deleteAction: carbon.DefaultPrefixes.cp + 'deleteAction'
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
				allValuesOf: carbon.DefaultPrefixes.cp + 'allValuesOf'
			};

			_patchRequest.create = function () {
				var patchRequest = carbon.Resource.create( carbon.getGenericRequestURI() );
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
							if ( carbon.URI.isURI( subject ) ) uri = subject;
							else if ( carbon.Resource.isResource( subject ) ) uri = subject.getURI();
							if ( ! uri ) throw "The subject is neither a URI or an RDF Resource";

							uri = uri + _addAction.sufix;

							var addAction;
							if ( _addActions.containsKey( uri ) ) {
								addAction = _addActions.get( uri );
							} else {
								addAction = carbon.Resource.create( uri );
							}

							addAction.addProperty( predicate, object );

							if ( ! _addActions.containsKey( uri ) ) {
								_addActions.put( uri, addAction );
							}

							rdfResource.addProperty( carbon.PATCHRequest.Properties.addAction, addAction );
						};
						rdfResource.addSetAction = function ( subject, predicate, object ) {
							var uri = null;
							if ( carbon.URI.isURI( subject ) ) uri = subject;
							else if ( carbon.Resource.isResource( subject ) ) uri = subject.getURI();
							if ( ! uri ) throw "The subject is neither a URI or an RDF Resource";

							uri = uri + _setAction.sufix;

							var setAction;
							if ( _setActions.containsKey( uri ) ) {
								setAction = _setActions.get( uri );
							} else {
								setAction = carbon.Resource.create( uri );
							}

							setAction.addProperty( predicate, object );

							if ( ! _setActions.containsKey( uri ) ) {
								_setActions.put( uri, setAction );
							}

							rdfResource.addProperty( carbon.PATCHRequest.Properties.setAction, setAction );
						};
						rdfResource.addDeleteAction = function ( subject, predicate, object ) {
							var uri = null;
							if ( carbon.URI.isURI( subject ) ) uri = subject;
							else if ( carbon.Resource.isResource( subject ) ) uri = subject.getURI();
							if ( ! uri ) throw "The subject is neither a URI or an RDF Resource";

							uri = uri + _deleteAction.sufix;

							var deleteAction;
							if ( _deleteActions.containsKey( uri ) ) {
								deleteAction = _deleteActions.get( uri );
							} else {
								deleteAction = carbon.Resource.create( uri );
							}

							if ( ! object ) {
								// The object wasn't defined, delete all values
								object = carbon.Resource.create( predicate );
								predicate = _deleteAction.Properties.allValuesOf;
							}

							deleteAction.addProperty( predicate, object );

							if ( ! _deleteActions.containsKey( uri ) ) {
								_deleteActions.put( uri, deleteAction );
							}

							rdfResource.addProperty( carbon.PATCHRequest.Properties.deleteAction, deleteAction );
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

			return _patchRequest;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: PATCH Request
		// ----------------------------------------------------------------------

		carbon.init = function ( options ) {
			var defaultOptions = {
				protocol    : null,
				domain      : null,
				loggingLevel: 0,
				appSlug     : null
			};
			if ( typeof options == 'object' ) {
				options = $.extend( defaultOptions, options );
			} else {
				options = defaultOptions;
			}

			_loggingLevel = options.loggingLevel;

			log( ">> init() > Initializing Carbon's SDK." );
			debug( "-- init() >  Options: %o", options );

			if ( options.protocol ) _requestProtocol = options.protocol;
			if ( options.domain ) _domain = options.domain;

			if ( options.appSlug ) carbon.setDefaultAppSlug( options.appSlug );

			log( "-- init() > Retrieving Carbon's API Description..." );
			var apiURL = carbon.getAPIRequestURL() + 'api';
			var apiPromise = carbon.REST.get( apiURL, {
				authenticate: false
			} );

			return apiPromise.then(
				function ( rdfResources ) {
					var deferred = $.Deferred();

					var apiDescription = carbon.Document.getResourceOfType( carbon.API.class, rdfResources );
					if ( ! apiDescription ) {
						error( "<< init() > The response didn't contain the API Description" );
						deferred.reject();
						return deferred.promise();
					}

					carbon.Resource.injectPropertyMethods( apiDescription, carbon.API.Property );
					_api = apiDescription;

					debug( "<< init() > Carbon's API Description has been successfully retrieved." );
					deferred.resolve();
					return deferred.promise();
				}, function ( errorObject ) {
					// TODO: FT
				}
			);
		};

		carbon.getGenericRequestURI = function () {
			return carbon.getAPIBaseURI() + 'requests/' + (new Date().getTime());
		};

		carbon.digestRDFResources = function ( jsonLDObjects ) {
			log( ">> digestRDFResources()" );
			var deferred = $.Deferred();
			log( "-- digestRDFResources() > Processing the jsonLD object..." );
			carbon.processJsonLD( jsonLDObjects ).then(
				function ( jsonLDObjects ) {
					debug( "<< digestRDFResources() > JsonLD successfully processed." );
					carbon.Resource.injectMethods( jsonLDObjects );
					deferred.resolve( jsonLDObjects );
				}, function ( errorObject ) {
					error( "<< digestRDFResources() > JsonLD couldn't be processed." );
					deferred.reject( errorObject );
				}
			);

			return deferred.promise();
		};

		carbon.processJsonLD = function ( jsonLDDocument ) {
			log( ">> processJsonLD()" );
			debug( "-- processJsonLD() > JSON-LD Document: %o", jsonLDDocument );

			var deferred = $.Deferred();

			log( "-- processJsonLD() > Expanding JSON-LD Document..." );
			var processor = new jsonld.JsonLdProcessor();
			processor.expand( jsonLDDocument ).then(
				function ( jsonLDObjects ) {
					debug( "<< processJsonLD() > JsonLD successfully expanded." );
					deferred.resolve( jsonLDObjects );
				}, function () {
					error( "<< processJsonLD() > The JSON-LD Document couldn't be expanded." );
					deferred.reject();
				}
			);

			return deferred.promise();
		};

		return carbon;

		// ----------------------------------------------------------------------
		// End: Carbon
		// ----------------------------------------------------------------------

		// Private functions

		function hasFunction( object, functionName ) {
			return typeof object[functionName] === 'function';
		}

		function isArray( object ) {
			return Object.prototype.toString.call( object ) === '[object Array]';
		}

		function isString( string ) {
			return typeof string == 'string' || string instanceof String;
		}

		function stringStartsWith( string, substring ) {
			return string.lastIndexOf( substring, 0 ) === 0;
		}

		function stringContains( string, substring ) {
			return ~ string.indexOf( substring );
		}

		// Will be used as a "trace" level of debugging
		function log() {
			if ( _loggingLevel < 4 || ! _canShowLog ) {
				return;
			}
			console.log.apply( console, arguments );
		}

		function debug() {
			if ( _loggingLevel >= 3 ) {
				if ( ! _canShowDebug ) {
					if ( _canShowLog ) console.log.apply( console, arguments );
					else return;
				}
			}
			console.debug.apply( console, arguments );
		}

		function warn() {
			if ( _loggingLevel < 2 || ! _canShowWarnings ) {
				return;
			}
			console.warn.apply( console, arguments );
		}

		function error() {
			if ( _loggingLevel < 1 || ! _canShowErrors ) {
				return;
			}
			console.error.apply( console, arguments );
		}
	},
	jQuery, jsonld, Map
))
;

