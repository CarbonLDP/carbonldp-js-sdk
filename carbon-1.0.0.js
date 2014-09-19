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
		var _protocol = "https";
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

		carbon.getAPIBaseURL = function () {
			return _protocol + "://" + _domain + "/";
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
		carbon.SECONDARY_RES_SIGN = '#';
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
					url    : carbon.getAPIBaseURL() + 'auth/token',
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
					url    : carbon.getAPIBaseURL() + 'agents',
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
		// ResourceLibrary
		// ----------------------------------------------------------------------

		carbon.SourceLibrary = (function ( carbon, $, Map ) {
			var sourceLibrary = {};

			function addRDFSources( rdfSources ) {
				rdfSources.forEach( function ( rdfSource ) {
					_sources.put( rdfSource.getURI(), rdfSource );
				} );
			}

			// Local variable to store the RDFSources retrieved
			var _sources = new Map();

			sourceLibrary.get = function ( uri, options ) {
				var defaultOptions = {
					useCache: true
				};
				if ( typeof options == 'object' ) {
					options = $.extend( defaultOptions, options );
				} else {
					options = defaultOptions;
				}

				var deferred = $.Deferred();

				if ( _sources.containsKey( uri ) && options.useCache ) {
					deferred.resolve( _sources.get( uri ) );
				} else {
					carbon.getRDFResource( uri, {
						authenticate: true
					} ).then(
						function ( rdfResources, jqXHR ) {
							// TODO: FT
						}, function ( errorObject ) {
							// TODO: FT
							deferred.reject( errorObject );
						}
					);
				}

				return deferred.promise();
			};

			return sourceLibrary;
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
				var typedResource = null;
				if ( isArray( document ) ) {
					document.some( function ( resource ) {
						if ( hasFunction( resource, "isOfType" ) ) {
							if ( resource.isOfType( type ) ) {
								typedResource = resource;
								return true;
							}
						}
					} );
				} else {
					if ( hasFunction( document, "isOfType" ) && document.isOfType( type ) ) {
						typedResource = document;
					}
				}

				return typedResource;
			};

			return _document;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: RDF Document
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
							// Multi-Getter
							(function () {
								var _propertyURI = propertyValue.uri;
								resource["list" + capitalizedProperty + "s"] = function () {
									return this.listProperties( _propertyURI );
								};
							})();
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
						} else {
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
		// RDF Source
		// ----------------------------------------------------------------------

		carbon.Source = (function ( carbon, $ ) {
			var _source = {};

			_source.class = carbon.DefaultPrefixes.ldp + 'RDFSource';

			_source.Property = {

			};

			_source.injectMethods = function ( resources ) {
				resources.forEach( function ( resource ) {
					var _addModifications = [];
					var _setModifications = [];
					var _removeModifications = [];

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

					function _removeModificationIndex( property ) {
						var length = _removeModifications.length;
						for ( var i = 0; i < length; i ++ ) {
							if ( _removeModifications[i] == property ) {
								return i;
							}
						}
						return - 1;
					}

					var _isDirty = false;
					resource.isDirty = function () {
						return _isDirty;
					}

					function propertyAdded( property, value ) {
						_isDirty = true;

						var removeIndex = _removeModificationIndex( property );
						if ( removeIndex != - 1 ) {
							// A remove modification for this property was already executed
							// combine them into a set modification
							_removeModifications.splice( removeIndex, 1 );
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

					resource._addAddCallback( propertyAdded );

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
							if ( addIndexes.length > 0 ) {
								// Add modifications for this property were already executed
								// delete them
								var length = _addModifications.length;
								for ( var i = length - 1; i >= 0; i -- ) {
									_addModifications.splice( i, 1 );
								}
							}
						}

						_removeModifications.push( property );

						return true;
					}

					resource._addRemoveCallback( propertyRemoved );

					resource.logModifications = function() {
						console.log("addModifications: %o", _addModifications);
						console.log("setModifications: %o", _setModifications);
						console.log("removeModifications: %o", _removeModifications);
					};

					var _etag = null;

					resource.getETag = function() {
						return _etag;
					};

					resource.setETag = function( etag ) {
						_etag = etag;
					};

				} );
			};

			return _source;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: RDF Source
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

			if ( options.protocol ) _protocol = options.protocol;
			if ( options.domain ) _domain = options.domain;

			if ( options.appSlug ) carbon.setDefaultAppSlug( options.appSlug );

			log( "-- init() > Retrieving Carbon's API Description..." );
			var apiURL = carbon.getAPIBaseURL() + 'api';
			var apiPromise = carbon.getRDFResource( apiURL, {
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
			return carbon.getAPIBaseURL() + 'requests/' + (new Date().getTime());
		};

		carbon.getRDFResource = function ( uri, options ) {
			log( ">> getRDFResource()" );

			var defaultOptions = {
				authenticate: true
			};
			if ( typeof options == 'object' ) {
				options = $.extend( defaultOptions, options );
			} else {
				options = defaultOptions;
			}

			debug( "-- getRDFResource() > Get resource: %s, options: %o", uri, options );

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
					debug( "-- getRDFResource() > The request was successfull." );
					log( "-- getRDFResource() > Digesting response..." );
					carbon.digestRDFResources( jsonResponse ).then(
						function ( rdfResources ) {
							debug( "<< getRDFResource() > The response was successfully digested." );
							deferred.resolve( rdfResources, jqXHR );
						}, function ( errorObject ) {
							error( "<< getRDFResource() > The response couldn't be digested." );
							deferred.reject( errorObject );
						}
					);
				}, function ( jqXHR, textStatus, errorThrown ) {
					error( "<< getRDFResource() > The request failed. Response: %o", jqXHR );
					deferred.reject();
				}
			);

			return deferred.promise();
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

