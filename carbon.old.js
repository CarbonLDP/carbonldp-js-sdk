/**
 * @overview Carbon LDP JavaScript Library v0.4.0
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
		var _version = "0.4.0";
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

			auth.setBasicCredentials = function ( username, password ) {
				if ( ! username || ! password ) return;
				auth.setMethod( 'basic' );
				_credentials.username.username = username;
				_credentials.username.password = password;
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

			_rest.post = function ( uri, body, options ) {
				log( ">> REST.post()" );

				var defaultOptions = {
					authenticate: true,
					headers     : null
				};
				if ( typeof options == 'object' ) {
					options = $.extend( defaultOptions, options );
				} else {
					options = defaultOptions;
				}

				debug( "-- REST.post() > POST uri: %s, body: %o, options: %o", uri, body, options );

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
					type       : 'POST',
					url        : uri,
					headers    : headers,
					crossDomain: true,
					data       : body
				} ).then(
					function ( jsonResponse, textStatus, jqXHR ) {
						debug( "-- REST.post() > The request was successfull." );
						deferred.resolve( jsonResponse, jqXHR );
					}, function ( jqXHR, textStatus, errorThrown ) {
						error( "<< REST.post() > The request failed. Response: %o", jqXHR );
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
		// SPARQL
		// ----------------------------------------------------------------------

		carbon.SPARQL = (function ( carbon, $, Map ) {
			var _sparql = {};

			_sparql.ask = function ( url, query ) {
				if ( ! isString( url ) ) throw "The URL must be a String!";
				if ( ! isString( query ) ) throw "The query must be a String!";

				var headers = {};
				headers["Content-Type"] = "application/sparql-query";
				headers["Accept"] = "application/json; q=0.8, application/ld+json; q=0.2";

				var deferred = $.Deferred();

				carbon.REST.post( url, query, {
					headers: headers
				} ).then(
					function ( jsonResponse, jqXHR ) {
						if ( typeof jsonResponse !== 'boolean' ) {
							// TODO: FT
							deferred.reject();
							return;
						}

						deferred.resolve( jsonResponse );
					}, function ( errorResponse ) {
						// TODO: FT
						deferred.reject( errorResponse );
					}
				);

				return deferred;
			};
			_sparql.select = function ( url, query ) {
				if ( ! isString( url ) ) throw "The URL must be a String!";
				if ( ! isString( query ) ) throw "The query must be a String!";

				var headers = {};
				headers["Content-Type"] = "application/sparql-query";
				headers["Accept"] = "application/sparql-results+json; q=0.8, application/ld+json; q=0.2";

				var deferred = $.Deferred();

				carbon.REST.post( url, query, {
					headers: headers
				} ).then(
					function ( jsonResponse, jqXHR ) {
						if ( ! carbon.SPARQL.ResultSet.isResultSet( jsonResponse ) ) {
							// TODO: FT
							deferred.reject();
							return;
						}
						carbon.SPARQL.ResultSet.injectMethods( jsonResponse );

						deferred.resolve( jsonResponse );
					}, function ( errorResponse ) {
						// TODO: FT
						deferred.reject( errorResponse );
					}
				);

				return deferred;
			};
			_sparql.describe = function () {
				// TODO
			};
			_sparql.construct = function () {
				// TODO
			};
			_sparql.update = function () {
				// TODO
			};

			_sparql.ResultSet = (function ( carbon, $, Map ) {
				var _resultSet = {};

				_resultSet.isResultSet = function ( resultSet ) {
					if ( ! resultSet ) return false;
					return hasProperty( resultSet, "head" ) && hasProperty( resultSet, "results" );
				};

				_resultSet.injectMethods = function ( resultSets ) {
					resultSets = isArray( resultSets ) ? resultSets : [resultSets];
					var length = resultSets.length;
					for ( var i = 0; i < length; i ++ ) {
						var resultSet = resultSets[i];
						(function ( resultSet ) {

							resultSet.hasColumn = function ( column ) {
								var length = resultSet.head.vars.length;
								for ( var i = 0; i < length; i ++ ) {
									if ( resultSet.head.vars[i] == column ) return true;
								}
								return false;
							};
							resultSet.getRows = function () {
								return resultSet.results.bindings;
							};
							resultSet.isEmpty = function () {
								return resultSet.results.bindings.length == 0;
							};

						}( resultSet ));
					}
				};

				return _resultSet;
			}( carbon, $, Map ));

			return _sparql;
		}( carbon, $, Map ));

		// ----------------------------------------------------------------------
		// End: SPARQL
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
							carbon._PersistedSource.injectMethods( documentResources );

							var length = documentResources.length;
							for ( var i = 0; i < length; i ++ ) {
								var documentResource = documentResources[i];
								// Add methods depending on the RDFSource type
								if ( carbon.BasicContainer.isBasicContainer( documentResource ) ) {
									carbon.BasicContainer.injectMethods( documentResource );
									carbon._PersistedBasicContainer.injectMethods( documentResource );
								} else if ( carbon.DirectContainer.isDirectContainer( documentResource ) ) {

								} else if ( carbon.IndirectContainer.isIndirectContainer( documentResource ) ) {

								}

								// Add Inline Resources to the documentResources
								var inlineResources = carbon.Document.getInlineResources( documentResource, rdfResources );
								carbon.InlineResource.injectMethods( inlineResources );
								carbon.PersistedInlineResource.injectMethods( inlineResources );
								documentResource._addInlineResources( inlineResources );
							}

							var rdfSource = carbon.Document.getResourceWithURI( uri, documentResources );
							if ( ! rdfSource ) {
								// TODO: FT
								deferred.reject( null );
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

			_sourceLibrary.post = function ( parent, children, options ) {
				if ( ! parent || ! children ) return;

				children = isArray( children ) ? children : [children];

				var slugs = new Map();
				var sources = [];

				var length = children.length;
				for ( var i = 0; i < length; i ++ ) {
					var child = children[i];
					var slug = null;
					var source = null;

					if ( carbon.Resource.isResource( child ) ) {
						source = child;
					} else {
						if ( hasProperty( child, "slug" ) && isString( child.slug ) ) slug = child.slug;
						if ( hasProperty( child, "source" ) && carbon.Resource.isResource( child.source ) ) source = child.source;
						else source = carbon.Source.create( null );
					}

					if ( source.isPersisted() ) throw "One of the RDFSources is already persisted.";

					var sourceURI = carbon.getGenericRequestURI();
					source._setURI( sourceURI );

					sources.push( source );
					if ( slug ) {
						var genericURISlug = carbon.URI.getSlug( sourceURI );
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
					body = carbon.Document.toJsonLD( sources );
				}

				var requestURL = getRequestURL( parent.getURI() );
				var headers = {};
				if ( slugHeader ) headers["Slug"] = slugHeader;

				var deferred = $.Deferred();

				carbon.REST.post( requestURL, body, {
					headers: headers
				} ).then(
					function ( jqXHR ) {
						// TODO: FT
						deferred.resolve();
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
			}

			function commitAllSources() {

			}

			_sourceLibrary.getSourceBaseURI = function () {
				return carbon.getAPIBaseURI() + "apps/" + _appSlug + "/";
			};

			return _sourceLibrary;
		}( carbon, $, Map ));

		// ----------------------------------------------------------------------
		// End: ResourceLibrary
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// PropertyValue
		// ----------------------------------------------------------------------

		carbon.Literal = (function ( carbon, $ ) {
			var _literal = {};

			// TODO: Finish adding the extra datatypes
			_literal.DataTypes = {

				// Date/Time
				date              : carbon.DefaultPrefixes.xsd + "date",
				dateTime          : carbon.DefaultPrefixes.xsd + "dateTime",
				duration          : carbon.DefaultPrefixes.xsd + "duration",
				gDay              : carbon.DefaultPrefixes.xsd + "gDay",
				gMonth            : carbon.DefaultPrefixes.xsd + "gMonth",
				gMonthDay         : carbon.DefaultPrefixes.xsd + "gMonthDay",
				gYear             : carbon.DefaultPrefixes.xsd + "gYear",
				gYearMonth        : carbon.DefaultPrefixes.xsd + "gYearMonth",
				time              : carbon.DefaultPrefixes.xsd + "time",

				// Numbers
				byte              : carbon.DefaultPrefixes.xsd + "byte",
				decimal           : carbon.DefaultPrefixes.xsd + "decimal",
				int               : carbon.DefaultPrefixes.xsd + "int",
				integer           : carbon.DefaultPrefixes.xsd + "integer",
				long              : carbon.DefaultPrefixes.xsd + "long",
				negativeInteger   : carbon.DefaultPrefixes.xsd + "negativeInteger",
				nonNegativeInteger: carbon.DefaultPrefixes.xsd + "nonNegativeInteger",
				nonPositiveInteger: carbon.DefaultPrefixes.xsd + "nonPositiveInteger",
				positiveInteger   : carbon.DefaultPrefixes.xsd + "positiveInteger",
				short             : carbon.DefaultPrefixes.xsd + "short",
				unsignedLong      : carbon.DefaultPrefixes.xsd + "unsignedLong",
				unsignedInt       : carbon.DefaultPrefixes.xsd + "unsignedInt",
				unsignedShort     : carbon.DefaultPrefixes.xsd + "unsignedShort",
				unsignedByte      : carbon.DefaultPrefixes.xsd + "unsignedByte",
				double            : carbon.DefaultPrefixes.xsd + "double",
				float             : carbon.DefaultPrefixes.xsd + "float",

				// Misc
				boolean           : carbon.DefaultPrefixes.xsd + "boolean",
				string            : carbon.DefaultPrefixes.xsd + "string"
			};
			_literal.InvertedDataTypes = (function (carbon) {
				var _inverted = {};

				var _normal = _literal.DataTypes;
				for ( var property in _normal ) {
					if ( _normal.hasOwnProperty( property ) ) {
						_inverted[_normal[property]] = property;
					}
				}

				return _inverted;
			}(carbon));

			_literal.toLiteral = function ( value ) {
				var literal = {};
				var type = null;

				switch ( true ) {
					case isDate( value ):
						type = _literal.DataTypes.dateTime;
						value = value.toISOString();
						break;
					case isNumber( value ):
						if ( isInteger( value ) ) {
							type = _literal.DataTypes.integer;
						} else {
							type = _literal.DataTypes.double;
						}
						break;
					case isString( value ):
						type = _literal.DataTypes.string;
						break;
					/*
					 TODO: Should we support arrays?
					 case isArray(value):
					 break;
					 */
					case isBoolean( value ):
						type = _literal.DataTypes.boolean;
						break;
				}

				literal["@value"] = value;
				if( type ) literal["@type"] = type;

				return literal;
			};
			_literal.parseLiteral = function ( jsonLDValue ) {
				if ( ! jsonLDValue ) return null;
				if ( ! hasProperty( jsonLDValue, "@value" ) ) return null;

				if ( ! hasProperty( jsonLDValue, "@type" ) ) {
					// The literal doesn't have a defined type
					return jsonLDValue["@value"];
				}

				var type = jsonLDValue["@type"];
				if ( ! hasProperty( _literal.InvertedDataTypes, type ) ) {
					// The Datetype isn't supported
					return jsonLDValue["@value"];
				}
				var dataType = _literal.InvertedDataTypes[type];
				var dataTypes = _literal.DataTypes;
				var value = jsonLDValue["@value"];
				switch ( dataType ) {
					// Dates
					case "date":
					case "dateTime":
					case "time":
						value = new Date( value );
						break;
					case "duration":
						// TODO: Support duration values (create a class or something...)
						break;
					case "gDay":
					case "gMonth":
					case "gMonthDay":
					case "gYear":
					case "gYearMonth":
						// TODO: Decide. Should we return it as a Date?
						break;

					// Numbers
					case "byte" :
					case "decimal" :
					case "int" :
					case "integer" :
					case "long" :
					case "negativeInteger" :
					case "nonNegativeInteger" :
					case "nonPositiveInteger" :
					case "positiveInteger" :
					case "short" :
					case "unsignedLong" :
					case "unsignedInt" :
					case "unsignedShort" :
					case "unsignedByte" :
					case "double" :
					case "float" :
						if ( isNumber( value ) ) {
							// Do nothing, it is already a number
						} else if ( isString( value ) ) {
							value = parseFloat( value );
						} else {
							throw "The number couldn't be parsed!";
						}
						break;

					// Misc
					case "boolean" :
						if ( isBoolean( value ) ) {
							// Do nothing, it is already a boolean
						} else if ( isString( value ) ) {
							value = parseBoolean( value );
						} else {
							value = ! ! value;
						}
						break;
					case "string":
						// Do nothing, the value will already be a string
						break;
					default:
						break;
				}

				return value;
			};
			_literal.isLiteral = function ( jsonLDValue ) {
				if ( ! jsonLDValue ) return false;
				return hasProperty( jsonLDValue, "@value" );
			};

			return _literal;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: PropertyValue
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// RDF Document
		// ----------------------------------------------------------------------

		carbon.Document = (function ( carbon, $ ) {
			var _document = {};

			_document.toJsonLD = function ( document ) {
				var arrayDocument = isArray( document ) ? document : [document];
				var jsonLD = "[";

				var addComma = false;
				var length = arrayDocument.length;
				for ( var i = 0; i < length; i ++ ) {
					var resource = arrayDocument[i];
					if ( hasFunction( resource, "toJsonLD" ) ) {
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

			_uri.getGlobalBase = function ( uri ) {
				if ( ! isString( uri ) ) throw 'Not a String!';
				var index = uri.indexOf( carbon.INLINE_RESOURCE_SIGN );
				if ( index == - 1 ) return uri;

				return uri.substring( 0, index - 1 );
			};
			_uri.getSlug = function ( uri ) {
				if ( ! isString( uri ) ) throw 'Not a String!';
				var tempURI = stringEndsWith( uri, "/" ) ? uri.substring( 0, uri.length - 1 ) : uri;
				var index = tempURI.lastIndexOf( "/" );
				if ( index == - 1 ) return uri;

				return uri.substring( 0, index - 1 );
			};
			_uri.getLocalSlug = function ( uri ) {
				if ( ! isString( uri ) ) throw 'Not a String!';
				var index = uri.indexOf( carbon.INLINE_RESOURCE_SIGN );
				if ( index == - 1 ) return null;

				return uri.substring( index + 1, uri.length - 1 );
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

			_resource.create = function ( uri ) {
				var newResource = {};
				_resource.injectMethods( newResource );
				newResource._setURI( uri );
				return newResource;
			};

			_resource.injectMethods = function ( rdfResources ) {
				if ( ! isArray( rdfResources ) ) {
					rdfResources = [ rdfResources ];
				}

				rdfResources.forEach( function ( rdfResource ) {

					rdfResource.getURI = function () {
						return this["@id"];
					};
					rdfResource._setURI = function ( uri ) {
						this["@id"] = uri;
					};

					rdfResource.isPersisted = function () {
						return ! ! this.getURI();
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

					rdfResource.toJsonLD = function () {
						return JSON.stringify( rdfResource );
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

			_inlineResource._create = function () {
				var newResource = carbon.Resource.create( null );
				_inlineResource.injectMethods( newResource );
				return newResource;
			};

			_inlineResource.injectMethods = function ( rdfResources ) {
				rdfResources = isArray( rdfResources ) ? rdfResources : [rdfResources];
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

			return _inlineResource;
		}( carbon, $ ) );

		// ----------------------------------------------------------------------
		// End: Inline Resource
		// ----------------------------------------------------------------------
		// ----------------------------------------------------------------------
		// Persisted Inline Resource
		// ----------------------------------------------------------------------

		carbon.PersistedInlineResource = (function ( carbon, Map, $ ) {
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

			return _persistedInlineResource;
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

			_source.create = function () {
				var newSource = carbon.Resource.create( null );
				_source.injectMethods( newSource );
				newSource.addType( carbon.Source.class );
				return newSource;
			};

			_source.injectMethods = function ( resources ) {
				resources = isArray( resources ) ? resources : [resources];

				resources.forEach( function ( resource ) {

					resource._setURI = function ( uri ) {
						resource["@id"] = uri;
						var slugs = resource.getInlineResourceSlugs();
						(function ( slugs ) {
							var length = slugs.length;
							for ( var i = 0; i < length; i ++ ) {
								var slug = slugs[i];
								var inlineResource = resource.getInlineResource( slug );

								var inlineResourceURI = uri + carbon.INLINE_RESOURCE_SIGN + slug;
								inlineResource._setURI( inlineResourceURI );
							}
						}( slugs ));

					};

					// === InlineResources

					var _inlineResources = new Map();
					resource.hasInlineResource = function ( uri ) {
						if ( ! carbon.URI.isURI( uri ) ) {
							// The URI provided is relative
							if ( ! stringStartsWith( uri, carbon.INLINE_RESOURCE_SIGN ) ) {
								uri = resource.getURI() + carbon.INLINE_RESOURCE_SIGN + uri;
							} else {
								uri = resource.getURI() + uri;
							}
						}
						return _inlineResources.has( uri );
					};
					resource.getInlineResource = function ( uri ) {
						if ( carbon.URI.isURI( uri ) ) {
							// The URI provided isn't relative
							if ( resource.isPersisted() ) throw "Cannot add an inlineResource with a complete URI to a non persisted Source.";
							else if ( carbon.URI.getGlobalBase( uri ) != resource.getURI() ) throw "The inlineResource doesn't belong to this RDFSource.";

							uri = carbon.URI.getLocalSlug( uri );
						} else {
							uri = stringStartsWith( carbon.INLINE_RESOURCE_SIGN ) ? uri.substring( 1, uri.length - 1 ) : uri;
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
						inlineResources = isArray( inlineResources ) ? inlineResources : [inlineResources];

						var length = inlineResources.length;
						for ( var i = 0; i < length; i ++ ) {
							var inlineResource = inlineResources[i];

							if ( ! carbon.InlineResource.isInlineResource( inlineResource ) ) throw "The inlineResource doesn't belong to this RDFSource.";

							var uri = inlineResource.getURI();
							if ( carbon.URI.isURI( uri ) ) {
								if ( ! carbon.InlineResource.isInlineResourceOf( inlineResource, this ) ) throw "The inlineResource doesn't belong to this RDFSource.";
								uri = carbon.URI.getLocalSlug( uri );
							} else {
								// The InlineResource has a relative URI
								uri = stringStartsWith( carbon.INLINE_RESOURCE_SIGN ) ? uri.substring( 1, uri.length - 1 ) : uri;
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

			return _source;
		}( carbon, Map, $ ));

		// ----------------------------------------------------------------------
		// End: RDF Source
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// Persisted RDF Source
		// ----------------------------------------------------------------------

		carbon._PersistedSource = (function ( carbon, Map, $ ) {
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
							return carbon.SourceLibrary.commit( source );
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
							var requestURL = getRequestURL( source.getURI() );
							return carbon.SPARQL.select( requestURL, query );
						};

						// === End: SPARQL Methods

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

			_basicContainer.Properties = {
				contains         : {
					uri       : carbon.DefaultPrefixes.ldp + 'contains',
					multiValue: true,
					literal   : false,
					readOnly  : true
				},
				member           : {
					uri       : carbon.DefaultPrefixes.ldp + 'member',
					multiValue: true,
					literal   : false,
					readOnly  : true
				},
				memberOfRelation : {
					uri       : carbon.DefaultPrefixes.ldp + 'memberOfRelation',
					multiValue: false,
					literal   : false,
					readOnly  : true
				},
				hasMemberRelation: {
					uri       : carbon.DefaultPrefixes.ldp + 'hasMemberRelation',
					multiValue: false,
					literal   : false,
					readOnly  : true
				}
			};

			_basicContainer.isBasicContainer = function ( rdfSource ) {
				if ( ! rdfSource ) return false;
				if ( ! carbon.Resource.isResource( rdfSource ) ) return false;
				return rdfSource.isOfType( carbon.BasicContainer.class );
			};

			_basicContainer.create = function ( memberOfRelation, hasMemberRelation ) {
				var container = carbon.Source.create();
				carbon.BasicContainer.injectMethods( container );

				container.addType( carbon.BasicContainer.class );

				if ( memberOfRelation ) {
					if ( ! carbon.URI.isURI( memberOfRelation ) ) throw "The memberOfRelation must be a URI.";
					container.setProperty( carbon.BasicContainer.Properties.memberOfRelation.uri, memberOfRelation );
				}
				if ( hasMemberRelation ) {
					if ( ! carbon.URI.isURI( hasMemberRelation ) ) throw "The hasMemberRelation must be a URI.";
					container.setProperty( carbon.BasicContainer.Properties.hasMemberRelation.uri, hasMemberRelation );
				}

				return container;
			};

			_basicContainer.injectMethods = function ( sources ) {
				sources = isArray( sources ) ? sources : [sources];

				carbon.Resource.injectPropertyMethods( sources, carbon.BasicContainer.Properties );

				var length = sources.length;
				for ( var i = 0; i < length; i ++ ) {
					var source = sources[i];
					(function ( source ) {

					}( source ));
				}
			};

			return _basicContainer;
		}( carbon, $ ));

		carbon._PersistedBasicContainer = (function ( carbon, $ ) {
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

							carbon.SourceLibrary.post( basicContainer, children ).then(
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

			return _persistedBC;
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

			_directContainer.isDirectContainer = function ( rdfSource ) {
				if ( ! rdfSource ) return false;
				if ( ! carbon.Resource.isResource( rdfSource ) ) return false;
				return rdfSource.isOfType( carbon.DirectContainer.class );
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

			_indirectContainer.isIndirectContainer = function ( rdfSource ) {
				if ( ! rdfSource ) return false;
				if ( ! carbon.Resource.isResource( rdfSource ) ) return false;
				return rdfSource.isOfType( carbon.IndirectContainer.class );
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

		function hasProperty( object, property ) {
			if ( ! object ) return false;
			return 'undefined' !== typeof object[property];
		}

		function isArray( object ) {
			return Object.prototype.toString.call( object ) === '[object Array]';
		}

		function isString( string ) {
			return typeof string == 'string' || string instanceof String;
		}

		function isBoolean( boolean ) {
			return typeof boolean == 'boolean';
		}

		function isNumber( number ) {
			return typeof number == 'number' || number instanceof Number;
		}

		function isInteger( number ) {
			if ( ! isNumber( number ) ) return false;
			return number % 1 == 0;
		}

		function isDouble( number ) {
			if ( ! isNumber( number ) ) return false;
			return number % 1 != 0;
		}

		function isDate( date ) {
			return typeof date == 'date' || date instanceof Date;
		}

		function stringStartsWith( string, substring ) {
			return string.lastIndexOf( substring, 0 ) === 0;
		}

		function stringEndsWith( string, substring ) {
			return string.indexOf( substring, string.length - substring.length ) !== - 1;
		}

		function stringContains( string, substring ) {
			return ~ string.indexOf( substring );
		}

		function slugify( slug ) {
			slug = slug
				.replace( /^\s\s*/, '' ) // Trim start
				.replace( /\s\s*$/, '' ) // Trim end
				.replace( /[^a-zA-Z0-9- ]/g, '' ) // Remove non alpha numeric symbols
				.replace( / +/g, '-' ) // Change spaces into single hyphens
			;
			return slug;
		}

		function parseBoolean( string ) {
			switch ( string.toLowerCase() ) {
				case "true":
				case "yes":
				case "1":
					return true;
				case "false":
				case "no":
				case "0":
				case null:
					return false;
				default:
					return Boolean( string );
			}
		}

		function parseETag( etag ) {
			// Weak ETag
			if ( stringStartsWith( etag, 'W"/' ) ) {
				etag = etag.slice( 3, etag.length - 2 );
			}
			return Date.parse( etag );
		}

		function getRequestURL( uri ) {
			if ( ! _requestProtocol || ! _uriProtocol ) throw "Carbon hasn't been initialized to support relative uris.";
			if ( stringStartsWith( uri, _requestProtocol ) ) return;
			return uri.replace( _uriProtocol, _requestProtocol );
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

