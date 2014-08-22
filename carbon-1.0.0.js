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
		var _version = "1.0.0";
		var _protocol = "http";
		var _domain = "carbonldp.com"

		// Carbon constructor
		var carbon = function () {
		};

		// Public variables and methods

		carbon.getAPIBaseURL = function () {
			return _protocol + "://" + _domain + "/api/";
		}

		carbon.DefaultPrefixes = {
			acl     : 'http://www.w3.org/ns/auth/acl#',
			c       : 'http://carbonldp.com/ns/v1/platform#',
			cs      : 'http://carbonldp.com/ns/v1/security#',
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

		carbon.getVersion = function () {
			return _version;
		};

		// ----------------------------------------------------------------------
		// Auth
		// ----------------------------------------------------------------------

		carbon.Auth = (function ( carbon, $, Map ) {
			var auth = {};

			auth.headers = {
				authMethod: "X-Carbon-Auth-Method",
				username  : "X-Carbon-Agent-Username",
				password  : "X-Carbon-Agent-Password",
				key       : "X-Carbon-Agent-Key",
				token     : "X-Carbon-Agent-Token"
			};

			auth.Token = (function ( carbon, $ ) {
				var _token = {};

				_token.class = carbon.DefaultPrefixes.cs + 'Token';

				_token.Property = {
					key: carbon.DefaultPrefixes.cs + 'key'
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
					return;
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

				return $.ajax( {
					type   : 'POST',
					url    : carbon.getAPIBaseURL() + 'auth/login',
					headers: headers
				} ).then(
					function ( jsonResponse, textStatus, jqXHR ) {
						return carbon.digestLDObjects( jsonResponse );
					}, function ( jqXHR, textStatus, errorThrown ) {
						// TODO: FT
						var deferred = $.Deferred();

						deferred.reject();

						return deferred;
					}
				).then(
					function ( resources ) {
						var deferred = $.Deferred();

						var tokenResource = carbon.Document.getResourceOfType( auth.Token.class, resources );
						if ( tokenResource === null ) {
							// The response didn't contained a token object
							// TODO: Fail
							deferred.reject();
						} else {
							auth.setToken( tokenResource );
							deferred.resolve();
						}
						return deferred.promise();
					},
					function ( errorObject ) {
						// TODO: FT
					}
				);
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

			auth.setToken = function ( tokenResource ) {
				var tokenKey = tokenResource.getPropertyValue( auth.Token.Property.key );
				if ( tokenKey === null ) {
					// The token resource didn't have a key
					// TODO: Fail
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

						authHeaders[auth.headers.authMethod] = method;
						authHeaders[auth.headers.token] = token;
						break;
					default:
						break;
				}

				$.extend( headers, authHeaders );
				return headers;
			};

			auth.postAgent = function ( agent ) {
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
						return carbon.digestLDObjects( jsonResponse );
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

			function addLDPResources( ldpResources ) {
				ldpResources.forEach( function ( ldpResource ) {
					_sources.put( ldpResource.getURI(), ldpResource );
				} );
			}

			// Local variable to store the RDFSources retrieved
			var _sources = new Map();
			// Local variable to store the ETags and relate them to their URI
			var _etags = new Map();

			/**
			 * Retrieves an RDFSource from the local cac
			 * @param {String} uri The URI of the source that wants to be retrieved.
			 * @param {boolean} options.useCache  Specifies if the cache will be used or not.
			 * @returns {Promise}
			 */
			sourceLibrary.get = function ( uri, options ) {
				var defaultOptions = {
					useCache: true
				};
				if ( typeof options == 'object' ) {
					options = $.extend( defaultOptions, options );
				} else {
					options = defaultOptions;
				}

				if ( _sources.containsKey( uri ) && options.useCache ) {
					return new Promise( function ( fulfill, reject ) {
						fulfill( _sources.get( uri ) );
					} );
				} else {

					var headers = {
						"Accept": "application/ld+json"
					};

					headers = carbon.Auth.setCredentialHeaders( headers );

					return $.ajax( {
						type   : 'GET',
						url    : uri,
						headers: headers
					} ).then(
						function ( jsonResponse, textStatus, jqXHR ) {
							return carbon.digestLDObjects( jsonResponse );
						}, function ( jqXHR, textStatus, errorThrown ) {
							// TODO: FT
						}
					).then(
						function ( ldpResources ) {
							var deferred = $.Deferred();

							addLDPResources( ldpResources );

							deferred.resolve( ldpResources );
							return deferred.promise();
						}, function ( errorObject ) {
							// TODO: FT
						}
					);
				}
			};

			return sourceLibrary;
		}( carbon, $, Map ));

		// ----------------------------------------------------------------------
		// End: ResourceLibrary
		// ----------------------------------------------------------------------

		carbon.digestLDObjects = function ( jsonLDObjects ) {
			var deferred = $.Deferred();
			var processor = new jsonld.JsonLdProcessor();
			processor.expand( jsonLDObjects ).then( function ( jsonLDObjects ) {
				deferred.resolve( jsonLDObjects );
			}, function () {
				// TODO: Create custom error object
				deferred.reject();
			} );
			return deferred.promise().then( function ( jsonLDObjects ) {
				var deferred = $.Deferred();

				carbon.Resource.injectMethods( jsonLDObjects );

				deferred.resolve( jsonLDObjects );
				return deferred.promise();
			}, function ( errorObject ) {
				// TODO: FT
			} );
		};

		// ----------------------------------------------------------------------
		// Document
		// ----------------------------------------------------------------------

		carbon.Document = (function ( carbon, $ ) {
			var _document = {};

			_document.getResourceOfType = function ( type, document ) {
				if ( ! (document instanceof Array) ) throw 'Not an array';

				var typedResource = null;
				document.some( function ( resource ) {
					if ( hasFunction( resource, "isOfType" ) ) {
						if ( resource.isOfType( type ) ) {
							typedResource = resource;
							return true;
						}
					}
				} );
				return typedResource;
			};

			return _document;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: Document
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// Resource
		// ----------------------------------------------------------------------

		carbon.Resource = (function ( carbon, $ ) {
			var _resource = {};

			_resource.class = carbon.DefaultPrefixes.ldp + 'Resource';

			_resource.Property = {
				type: carbon.DefaultPrefixes.rdf + 'type'
			};

			_resource.isResource = function ( jsonldResource ) {
				return jsonldResource.hasOwnProperty( "@id" );
			};

			_resource.injectMethods = function ( jsonldResources ) {
				if ( ! ( jsonldResources instanceof Array ) ) {
					jsonldResources = [ jsonldResources ];
				}

				jsonldResources.forEach( function ( jsonldResource ) {

					jsonldResource.getURI = function () {
						return this["@id"];
					};

					jsonldResource.isOfType = function ( type ) {
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

					jsonldResource.addType = function ( type ) {
						var typeResource = carbon.Resource.create( type );
						this.addProperty( carbon.Resource.Property.type, typeResource );
					};

					jsonldResource.hasProperty = function ( property ) {
						return this.hasOwnProperty( property );
					};

					jsonldResource.getProperty = function ( property ) {
						if ( ! this.hasProperty( property ) ) return null;
						if ( this[property] instanceof Array ) {
							if ( this[property].length < 1 ) return null;
							return this[property][0];
						}
						return this[property];
					};

					jsonldResource.getPropertyValue = function ( property ) {
						var propertyObject = this.getProperty( property );
						if ( propertyObject === null ) return null;
						if ( propertyObject.hasOwnProperty( '@value' ) ) return propertyObject['@value'];
						return null;
					};

					jsonldResource.getPropertyURI = function ( property ) {
						var propertyObject = this.getProperty( property );
						if ( propertyObject === null ) return null;
						if ( propertyObject.hasOwnProperty( '@id' ) ) return propertyObject['@id'];
						return null;
					};

					jsonldResource.listProperties = function ( property ) {
						if ( ! this.hasProperty( property ) ) return null;
						if ( this[property] instanceof Array ) {
							if ( this[property].length < 1 ) return null;
							return this[property];
						}
						return null;
					};

					jsonldResource.addProperty = function ( property, value ) {
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

						propertyArray.push( propertyValue );

						this[property] = propertyArray;
					};

					jsonldResource.setProperty = function ( property, value ) {
						this.removeProperty( property );
						this.addProperty( property, value );
					};

					jsonldResource.removeProperty = function ( property ) {
						if ( this.hasOwnProperty( property ) ) delete this[property];
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
		// End: Resource
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// Source
		// ----------------------------------------------------------------------

		carbon.Source = (function ( carbon, $ ) {
			var source = {};

			source.class = carbon.DefaultPrefixes.ldp + 'RDFSource';

			source.Property = {

			};

			source.injectMethods = function ( resources ) {
				resources.forEach( function ( resource ) {

					resource.getETag = function () {

					};

				} );
			};

			return source;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: Source
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// BasicContainer
		// ----------------------------------------------------------------------

		carbon.BasicContainer = (function ( carbon, $ ) {
			var basicContainer = {};

			basicContainer.class = carbon.DefaultPrefixes.ldp + 'BasicContainer';

			basicContainer.Property = {
				contains: carbon.DefaultPrefixes.ldp + 'contains',
				member  : carbon.DefaultPrefixes.ldp + 'member'
			};

			basicContainer.injectMethods = function ( sources ) {
				sources.forEach( function ( source ) {

					// TODO: FT

				} );
			};

			return basicContainer;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: BasicContainer
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// DirectContainer
		// ----------------------------------------------------------------------

		carbon.DirectContainer = (function ( carbon, $ ) {
			var directContainer = {};

			directContainer.class = carbon.DefaultPrefixes.ldp + 'DirectContainer';

			directContainer.Property = {
				contains: carbon.DefaultPrefixes.ldp + 'contains'
			};

			directContainer.injectMethods = function ( sources ) {
				sources.forEach( function ( source ) {

					// TODO: FT

				} );
			};

			return directContainer;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: DirectContainer
		// ----------------------------------------------------------------------

		// ----------------------------------------------------------------------
		// IndirectContainer
		// ----------------------------------------------------------------------

		carbon.IndirectContainer = (function ( carbon, $ ) {
			var indirectContainer = {};

			indirectContainer.class = carbon.DefaultPrefixes.ldp + 'IndirectContainer';

			indirectContainer.Property = {
				contains: carbon.DefaultPrefixes.ldp + 'contains'
			};

			indirectContainer.injectMethods = function ( sources ) {
				sources.forEach( function ( source ) {

					// TODO: FT

				} );
			};

			return indirectContainer;
		}( carbon, $ ));

		// ----------------------------------------------------------------------
		// End: DirectContainer
		// ----------------------------------------------------------------------

		carbon.getGenericRequestURI = function () {
			return carbon.getAPIBaseURL() + 'requests/' + (new Date().getTime());
		};

		/**
		 * Parses the given JSON-LD object into an ErrorResponse object.
		 */
		carbon.parseErrorResponse = function ( urlOrJsonObj, opts ) {

			console.log( '-- Carbon.parseErrorResponse() > typeof urlOrJsonObj param: ' + typeof urlOrJsonObj );

			// Private properties
			var deferred = $.Deferred();

			var type = "ErrorResponse";

			// ----------------------------------------------------------------------
			// ErrorResponse - Public (delegate) properties and methods
			// ----------------------------------------------------------------------

			// ----------------------------------------------------------------------
			// ErrorResponse - Instance Initialization
			// ----------------------------------------------------------------------

			// If the err parameter given is a string, we assume it is a URL
			if ( typeof urlOrJsonObj == "string" ) {

				console.log( "-- Carbon.parseErrorResponse() > Got string parameter; assuming it's a URL to load." );

				$.when( fetch( urlOrJsonObj, opts ) ).then( // SUCCESS FUNCTION
					// May want to do a promise deal here since the method we're calling
					// uses a deferred and returns a promise...
					// WARNING: DEFINED AGAIN BELOW IN OUTER ELSE BLOCK!
					function ( doc ) {
						var promise = makeErrorResponse( doc );
						promise.done( function ( errorResponseObject ) {
							deferred.resolve( errorResponseObject );
						} );
						promise.fail( function ( errMsg ) {
							deferred.reject( errMsg );
						} );
					},

					// FAILURE FUNCTION
					function () {

						console.error( 'TO DO: We\'ll need better error handling here - tied more specifically to error codes.' );
						console.error( 'Is the resource secured, but not being requested with appropriate credentials, API key, or token?' );
						console.error( 'Check the web server fronting the app server or servlet container that hosts Carbon; is it running and accessible?' );
						console.error( 'Check all integrated database services; are they running and accessible?' );

						var errMessage = 'Error loading: ' + urlOrJsonObj;
						deferred.reject( errMessage );

					} );

			} else {
				console.log( "-- Carbon.parseErrorResponse() > Parameter is not a string; assuming it's JSON-LD object." );

				// THIS IS THE SAME AS WHAT'S DEFINED IN SUCCESS FUNCTION ABOVE!
				var promise = makeErrorResponse( doc );
				promise.done( function ( errorResponseObject ) {
					deferred.resolve( errorResponseObject );
				} );
				promise.fail( function ( errMsg ) {
					deferred.reject( errMsg );
				} );

			}

			return deferred.promise();
		};

		return carbon;

		// ======================================================================
		// END - Carbon object factory (produces and returns the Carbon object)
		// ======================================================================

		// ======================================================================
		// Private Functions
		// ======================================================================

		function hasFunction( object, functionName ) {
			if ( typeof object[functionName] === 'function' ) return true;
			return false;
		}

		/**
		 * Makes an Ajax GET request to the given URL through promise
		 *
		 */
		function fetch( url, opts ) {

			console.log( '>> fetch("' + url + '")' );

			// do the fetch...
			var httpHeaders = {};
			if ( opts && opts.headers ) {
				httpHeaders = opts.headers;
			}

			return $.ajax( {
				url    : url,
				headers: httpHeaders
				//context: window.document
			} );

		} // END fetch()

		/**
		 * private method makes an inline object array of HeaderIssues, ParameterIssues, EntityBodyIssues
		 * This is a utility function used by the function makeErrorResponse(), below.
		 */
		function makeInlineIssues( expandedJLO, issues ) {

			var C_ISSUE_CODE = 'http://carbonldp.com/ns#issueCode', C_ISSUE_DESC = 'http://carbonldp.com/ns#issueDescription', C_KEY = 'http://carbonldp.com/ns#key', C_VAL = 'http://carbonldp.com/ns#value';

			var expandedJLOLen = expandedJLO.length;
			var issuesLen = issues.length;

			var resultingIssueObjArray = [];

			for ( var p = 0; p < issuesLen; p ++ ) {

				var issueId = issues[p]['@id'];

				// Now that we have the URL to the inline parameter issue, we'll loop until we find the inline for it

				for ( var pi = 0; pi < expandedJLOLen; pi ++ ) {

					if ( expandedJLO[pi]['@id'] === issueId ) {

						var issue = {};

						issue.uri = expandedJLO[pi]['@id'];

						// Accept string or number
						var code = expandedJLO[pi][C_ISSUE_CODE][0]['@value'];
						if ( typeof code === 'string' ) {
							issue.issueCode = parseInt( code );
						} else {
							issue.issueCode = code;
						}

						issue.issueDescription = expandedJLO[pi][C_ISSUE_DESC][0]['@value'];
						if ( expandedJLO[pi][C_KEY] ) {
							issue.key = expandedJLO[pi][C_KEY][0]['@value'];
						}
						if ( expandedJLO[pi][C_VAL] ) {
							issue.val = expandedJLO[pi][C_VAL][0]['@value'];
						}

						resultingIssueObjArray.push( issue );

					}

				}

			}

			return resultingIssueObjArray;

		} // END: makeInlineIssues()

		/**
		 * Makes an ErrorResponse object with the given expanded JSON-LD error response.
		 */
		function makeErrorResponse( doc ) {

			console.log( ">> ~private makeErrorResponse()" );

			var deferred = $.Deferred();

			var CLASS = "ErrorResponse";

			var Properties = {
				CARBON_CODE     : carbon.NS + "carbonCode",
				DEBUG_MESSAGE   : cabon.NS + 'debugMessage',
				E_BODY_ISSUE    : cabon.NS + 'EntityBodyIssue',
				C_ERROR_RESPONSE: cabon.NS + 'ErrorResponse',
				FRIENDLY_MSG    : cabon.NS + 'friendlyMessage',
				HAS_E_BODY_ISSUE: cabon.NS + 'hasEntityBodyIssue',
				HAS_HEADER_ISSUE: cabon.NS + 'hasHeaderIssue',
				HAS_PARAM_ISSUE : cabon.NS + 'hasParameterIssue',
				HEADER_ISSUE    : cabon.NS + 'HeaderIssue',
				HTTP_STATUS_CODE: cabon.NS + 'httpStatusCode'
			};

			var ErrorResponse = {
				getObjectType: function () {
					return type;
				}
			};

			var errorResponse = Object.create( ErrorResponse );

			var context = {"c": carbon.NS_C};

			jsonld.expand( doc, context, function ( err, expandedJLO ) {

				// Uncomment to log the expanded JSON-LD object...
				// console.log(JSON.stringify(expandedJLO, null, 2));

				var expandedJLOLen = expandedJLO.length;

				for ( var i = 0; i < expandedJLOLen; i ++ ) {

					// The first (and only) @id URI without a hash is our root resource; the rest are inline.
					if ( expandedJLO[i]['@id'].indexOf( '#' ) == - 1 ) {

						errorResponse.uri = expandedJLO[i]['@id'];

						// Handle either string or number

						var cCode = expandedJLO[i][C_CARBON_CODE][0]['@value'];
						if ( typeof cCode === 'string' ) {
							errorResponse.carbonCode = parseInt( cCode );
						} else {
							errorResponse.carbonCode = cCode;
						}

						errorResponse.friendlyMessage = expandedJLO[i][C_FRIENDLY_MSG][0]['@value'];

						// Handle either string or number
						var status = expandedJLO[i][C_HTTP_STATUS_CODE][0]['@value'];
						if ( typeof status === 'string' ) {
							errorResponse.httpStatusCode = parseInt( status );
						} else {
							errorResponse.httpStatusCode = status;
						}

						errorResponse.debugMessage = expandedJLO[i][C_DEBUG_MESSAGE][0]['@value'];
						errorResponse.paramIssues = [];
						errorResponse.headerIssues = [];
						errorResponse.entityBodyIssues = [];

						// The param issue is an array of one or more objects, with each object specifying
						// the @id of an inline.

						var paramIssues = expandedJLO[i][C_HAS_PARAM_ISSUE];
						errorResponse.paramIssues = makeInlineIssues( expandedJLO, paramIssues );

						var headerIssues = expandedJLO[i][C_HAS_HEADER_ISSUE];
						errorResponse.headerIssues = makeInlineIssues( expandedJLO, headerIssues );

						var entityBodyIssues = expandedJLO[i][C_HAS_E_BODY_ISSUE];
						errorResponse.entityBodyIssues = makeInlineIssues( expandedJLO, entityBodyIssues );

						break;

					}

				}

				errorResponse.hasParameterIssue = function () {
					return errorResponse.paramIssues.length > 0;
				};

				errorResponse.hasHeaderIssue = function () {
					return errorResponse.headerIssues.length > 0;
				};

				errorResponse.hasEntityBodyIssue = function () {
					return errorResponse.entityBodyIssues.length > 0;
				};

				// DO THE WORK HERE...

				deferred.resolve( errorResponse );

			} );

			return deferred.promise();

		} // END: makeErrorResponse()

	},
	jQuery, jsonld, Map
))
;

