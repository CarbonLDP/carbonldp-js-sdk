(function(global, $, jsonld, Map) {
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

	var _shared = {};

	_shared = (function(_shared) {

	_shared.version = "0.2.0";
	_shared.requestProtocol = "https";
	_shared.uriProtocol = "http";
	_shared.domain = "carbonldp.com";

	// 0 - off
	// 1 - errors
	// 2 - errors / warnings
	// 3 - errors / warnings / debug
	// 4 - errors / warnings / debug / trace
	_shared.loggingLevel = 0;
	_shared.canShowErrors = (typeof console !== 'undefined' && typeof console.error !== 'undefined');
	_shared.canShowWarnings = (typeof console !== 'undefined' && typeof console.warn !== 'undefined');
	_shared.canShowDebug = (typeof console !== 'undefined' && typeof console.debug !== 'undefined');
	_shared.canShowLog = (typeof console !== 'undefined' && typeof console.log !== 'undefined');

	_shared.appSlug = null;
	_shared.api = null;

	_shared.hasFunction = function( object, functionName ) {
		return typeof object[functionName] === 'function';
	};

	_shared.hasProperty = function( object, property ) {
		if ( ! object ) return false;
		return 'undefined' !== typeof object[property];
	};

	_shared.isArray = function( object ) {
		return Object.prototype.toString.call( object ) === '[object Array]';
	};

	_shared.isString = function( string ) {
		return typeof string == 'string' || string instanceof String;
	};

	_shared.isBoolean = function( boolean ) {
		return typeof boolean == 'boolean';
	};

	_shared.isNumber = function( number ) {
		return typeof number == 'number' || number instanceof Number;
	};

	_shared.isInteger = function( number ) {
		if ( ! _shared.isNumber( number ) ) return false;
		return number % 1 == 0;
	};

	_shared.isDouble = function( number ) {
		if ( ! _shared.isNumber( number ) ) return false;
		return number % 1 != 0;
	};

	_shared.isDate = function( date ) {
		return typeof date == 'date' || date instanceof Date;
	};

	_shared.stringStartsWith = function( string, substring ) {
		return string.lastIndexOf( substring, 0 ) === 0;
	};

	_shared.stringEndsWith = function( string, substring ) {
		return string.indexOf( substring, string.length - substring.length ) !== - 1;
	};

	_shared.stringContains = function( string, substring ) {
		return ~ string.indexOf( substring );
	};

	_shared.slugify = function( slug ) {
		slug = slug
			.replace( /^\s\s*/, '' ) // Trim start
			.replace( /\s\s*$/, '' ) // Trim end
			.replace( /[^a-zA-Z0-9- ]/g, '' ) // Remove non alpha numeric symbols
			.replace( / +/g, '-' ) // Change spaces into single hyphens
		;
		return slug;
	};

	_shared.parseBoolean = function( string ) {
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
	};

	_shared.parseETag = function( etag ) {
		// Weak ETag
		if ( _shared.stringStartsWith( etag, 'W"/' ) ) {
			etag = etag.slice( 3, etag.length - 2 );
		}
		return Date.parse( etag );
	};

	_shared.getRequestURL = function( uri ) {
		if ( ! _shared.requestProtocol || ! _shared.uriProtocol ) throw "Carbon hasn't been initialized to support relative uris.";
		if ( _shared.stringStartsWith( uri, _shared.requestProtocol ) ) return;
		return uri.replace( _shared.uriProtocol, _shared.requestProtocol );
	};

	// Will be used as a "trace" level of debugging
	_shared.log = function() {
		if ( _shared.loggingLevel < 4 || ! _shared.canShowLog ) {
			return;
		}
		console.log.apply( console, arguments );
	};

	_shared.debug = function() {
		if ( _shared.loggingLevel >= 3 ) {
			if ( ! _shared.canShowDebug ) {
				if ( _shared.canShowLog ) console.log.apply( console, arguments );
				else return;
			}
		}
		console.debug.apply( console, arguments );
	};

	_shared.warn = function() {
		if ( _shared.loggingLevel < 2 || ! _shared.canShowWarnings ) {
			return;
		}
		console.warn.apply( console, arguments );
	};

	_shared.error = function() {
		if ( _shared.loggingLevel < 1 || ! _shared.canShowErrors ) {
			return;
		}
		console.error.apply( console, arguments );
	};

	return _shared;
}(_shared) );

	(function ( global, $, jsonld, Map, _shared ) {
		'use strict';

		var _carbon = {};

		// Public variables and methods
		_carbon.getVersion = function () {
			return _shared.version;
		};
		_carbon.getRequestProtocol = function() {
			return _shared.requestProtocol;
		};
		_carbon.getURIProtocol = function() {
			return _shared.uriProtocol;
		};
		_carbon.getDomain = function() {
			return _shared.domain;
		};
		_carbon.getAppSlug = function() {
			return _shared.appSlug;
		};
		_carbon.getAPIDescription = function() {
			return _shared.api;
		};

		_carbon.getAPIRequestURL = function () {
			return _shared.requestProtocol + "://" + _shared.domain + "/";
		};

		_carbon.getAPIBaseURI = function () {
			return _shared.uriProtocol + "://" + _shared.domain + "/";
		};

		_carbon.getAPIVersion = function () {
			if ( ! _shared.api ) {
				throw 'Carbon hasn\'t been initiated';
			}
			return _shared.api.getVersion();
		};

		_carbon.setDefaultAppSlug = function ( appSlug ) {
			_shared.appSlug = appSlug;
		};

		_carbon.HTTPHeaders = {
			etag   : "ETag",
			ifMatch: "If-Match"
		};

		_carbon.DefaultPrefixes = {
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
		_carbon.NS = _carbon.DefaultPrefixes.c;
		_carbon.SECURITY_NS = _carbon.DefaultPrefixes.cs;
		_carbon.INLINE_RESOURCE_SIGN = '#';
		_carbon.SYSTEM_RES_SIGN = '#$';

		_carbon.init = function ( options ) {
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

			_shared.loggingLevel = options.loggingLevel;

		_shared.log( ">> init() > Initializing Carbon's SDK." );
		_shared.debug( "-- init() >  Options: %o", options );

			if ( options.protocol ) _shared.requestProtocol = options.protocol;
			if ( options.domain ) _shared.domain = options.domain;

			if ( options.appSlug ) _carbon.setDefaultAppSlug( options.appSlug );

		_shared.log( "-- init() > Retrieving Carbon's API Description..." );
			var apiURL = _carbon.getAPIRequestURL() + 'api';
			var apiPromise = _carbon.REST.get( apiURL, {
				authenticate: false
			} );

			return apiPromise.then(
				function ( rdfResources ) {
					var deferred = $.Deferred();

					var apiDescription = _carbon.Document.getResourceOfType( _carbon.API.class, rdfResources );
					if ( ! apiDescription ) {
					_shared.error( "<< init() > The response didn't contain the API Description" );
						deferred.reject();
						return deferred.promise();
					}

					_carbon.Resource.injectPropertyMethods( apiDescription, _carbon.API.Property );
					_shared.api = apiDescription;

				_shared.debug( "<< init() > Carbon's API Description has been successfully retrieved." );
					deferred.resolve();
					return deferred.promise();
				}, function ( errorObject ) {
					// TODO: FT
				}
			);
		};

		_carbon.getGenericRequestURI = function () {
			return _carbon.getAPIBaseURI() + 'requests/' + (new Date().getTime());
		};

		_carbon.digestRDFResources = function ( jsonLDObjects ) {
		_shared.log( ">> digestRDFResources()" );
			var deferred = $.Deferred();
		_shared.log( "-- digestRDFResources() > Processing the jsonLD object..." );
			_carbon.processJsonLD( jsonLDObjects ).then(
				function ( jsonLDObjects ) {
				_shared.debug( "<< digestRDFResources() > JsonLD successfully processed." );
					_carbon.Resource.injectMethods( jsonLDObjects );
					deferred.resolve( jsonLDObjects );
				}, function ( errorObject ) {
				_shared.error( "<< digestRDFResources() > JsonLD couldn't be processed." );
					deferred.reject( errorObject );
				}
			);

			return deferred.promise();
		};

		_carbon.processJsonLD = function ( jsonLDDocument ) {
		_shared.log( ">> processJsonLD()" );
		_shared.debug( "-- processJsonLD() > JSON-LD Document: %o", jsonLDDocument );

			var deferred = $.Deferred();

		_shared.log( "-- processJsonLD() > Expanding JSON-LD Document..." );
			var processor = new jsonld.JsonLdProcessor();
			processor.expand( jsonLDDocument ).then(
				function ( jsonLDObjects ) {
				_shared.debug( "<< processJsonLD() > JsonLD successfully expanded." );
					deferred.resolve( jsonLDObjects );
				}, function () {
				_shared.error( "<< processJsonLD() > The JSON-LD Document couldn't be expanded." );
					deferred.reject();
				}
			);

			return deferred.promise();
		};

		global.Carbon = _carbon;
	}( global, $, jsonld, Map, _shared ));

	(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _api = {};
	_api.class = Carbon.DefaultPrefixes.api + 'API';

	_api.Property = {
		version: {
			uri     : Carbon.DefaultPrefixes.doap + 'version',
			multi   : false,
			literal : true,
			readOnly: true
		}
	};
	Carbon.API = _api;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _authHeaders = {
		authMethod: "X-Carbon-Auth-Method",
		username  : "X-Carbon-Agent-Username",
		password  : "X-Carbon-Agent-Password",
		key       : "X-Carbon-Agent-Key",
		token     : "X-Carbon-Agent-Token"
	};

	var _auth = {};

	var _authMethods = ['token', 'basic', 'username', 'key'];
	var _method = null;
	_auth.getMethod = function () {
		return _method;
	};
	_auth.setMethod = function ( method ) {
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

	_auth.login = function ( username, password, remember ) {
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
			url    : Carbon.getAPIRequestURL() + 'auth/token',
			headers: headers
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				Carbon.digestRDFResources( jsonResponse ).then(
					function ( rdfResources ) {
						var tokenResource = Carbon.Document.getResourceOfType( _auth.Token.class, rdfResources );
						if ( ! tokenResource ) {
							// TODO: Fail
							deferred.reject();
						} else {
							Carbon.Auth.Token.injectMethods( tokenResource );

							_auth.setToken( tokenResource );
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

	_auth.hasCredentials = function () {
		var method = _auth.getMethod();
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

	_auth.eraseCredentials = function () {
		Carbon.Auth.setMethod( null );
		_credentials = {
			token   : null,
			username: {
				username: null,
				password: null
			},
			key     : null
		};
	};

	_auth.setToken = function ( tokenResource ) {
		var tokenKey = tokenResource.getKey();
		if ( tokenKey === null ) {
			// The token resource didn't have a key
			throw 'The token doesn\'t contain a key';
		}

		_auth.setMethod( 'token' );
		_credentials.token = tokenKey;
	};

	_auth.setBasicCredentials = function ( username, password ) {
		if ( ! username || ! password ) return;
		_auth.setMethod( 'basic' );
		_credentials.username.username = username;
		_credentials.username.password = password;
	};

	_auth.setCredentialHeaders = function ( headers ) {
		var method = _auth.getMethod();
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

	_auth.registerAgent = function ( agent ) {
		var headers = {
			"Content-Type": "application/ld+json",
			"Accept"      : "application/ld+json"
		};

		headers = Carbon.Auth.setCredentialHeaders( headers );

		return $.ajax( {
			type   : 'POST',
			url    : Carbon.getAPIRequestURL() + 'agents',
			headers: headers,
			data   : JSON.stringify( agent )
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				return Carbon.digestRDFResources( jsonResponse );
			}, function ( jqXHR, textStatus, errorThrown ) {
				// TODO: FT
			}
		).then(
			function ( ldpResources ) {
				var deferred = $.Deferred();

				Carbon.Auth.Agent.injectMethods( ldpResources );

				deferred.resolve( ldpResources );
				return deferred.promise();
			}, function ( errorObject ) {
				// TODO: FT
			}
		);
	};

	Carbon.Auth = _auth;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _basicContainer = {};

	_basicContainer.class = Carbon.DefaultPrefixes.ldp + 'BasicContainer';

	_basicContainer.Properties = {
		contains         : {
			uri       : Carbon.DefaultPrefixes.ldp + 'contains',
			multiValue: true,
			literal   : false,
			readOnly  : true
		},
		member           : {
			uri       : Carbon.DefaultPrefixes.ldp + 'member',
			multiValue: true,
			literal   : false,
			readOnly  : true
		},
		memberOfRelation : {
			uri       : Carbon.DefaultPrefixes.ldp + 'memberOfRelation',
			multiValue: false,
			literal   : false,
			readOnly  : true
		},
		hasMemberRelation: {
			uri       : Carbon.DefaultPrefixes.ldp + 'hasMemberRelation',
			multiValue: false,
			literal   : false,
			readOnly  : true
		}
	};

	_basicContainer.isBasicContainer = function ( rdfSource ) {
		if ( ! rdfSource ) return false;
		if ( ! Carbon.Resource.isResource( rdfSource ) ) return false;
		return rdfSource.isOfType( Carbon.BasicContainer.class );
	};

	_basicContainer.create = function ( memberOfRelation, hasMemberRelation ) {
		var container = Carbon.Source.create();
		Carbon.BasicContainer.injectMethods( container );

		container.addType( Carbon.BasicContainer.class );

		if ( memberOfRelation ) {
			if ( ! Carbon.URI.isURI( memberOfRelation ) ) throw "The memberOfRelation must be a URI.";
			container.setProperty( Carbon.BasicContainer.Properties.memberOfRelation.uri, memberOfRelation );
		}
		if ( hasMemberRelation ) {
			if ( ! Carbon.URI.isURI( hasMemberRelation ) ) throw "The hasMemberRelation must be a URI.";
			container.setProperty( Carbon.BasicContainer.Properties.hasMemberRelation.uri, hasMemberRelation );
		}

		return container;
	};

	_basicContainer.injectMethods = function ( sources ) {
		sources = _shared.isArray( sources ) ? sources : [sources];

		Carbon.Resource.injectPropertyMethods( sources, Carbon.BasicContainer.Properties );

		var length = sources.length;
		for ( var i = 0; i < length; i ++ ) {
			var source = sources[i];
			(function ( source ) {

			}( source ));
		}
	};

	Carbon.BasicContainer = _basicContainer;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _directContainer = {};

	_directContainer.class = Carbon.DefaultPrefixes.ldp + 'DirectContainer';

	_directContainer.Property = {
		contains: Carbon.DefaultPrefixes.ldp + 'contains'
	};

	_directContainer.isDirectContainer = function ( rdfSource ) {
		if ( ! rdfSource ) return false;
		if ( ! Carbon.Resource.isResource( rdfSource ) ) return false;
		return rdfSource.isOfType( Carbon.DirectContainer.class );
	};

	_directContainer.injectMethods = function ( sources ) {
		sources.forEach( function ( source ) {

			// TODO: FT

		} );
	};

	Carbon.DirectContainer = _directContainer;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _document = {};

	_document.toJsonLD = function ( document ) {
		var arrayDocument = _shared.isArray( document ) ? document : [document];
		var jsonLD = "[";

		var addComma = false;
		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( _shared.hasFunction( resource, "toJsonLD" ) ) {
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
		var arrayDocument = _shared.isArray( document ) ? document : [document];

		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( _shared.hasFunction( resource, "isOfType" ) ) {
				if ( resource.isOfType( type ) ) return resource;
			}
		}

		return null;
	};

	_document.getResourceWithURI = function ( uri, document ) {
		var arrayDocument = _shared.isArray( document ) ? document : [document];

		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( Carbon.Resource.isResource( resource ) ) {
				if ( resource.getURI() == uri ) return resource;
			}
		}

		return null;
	};

	_document.getDocumentResources = function ( document ) {
		var documentResources = [];

		var arrayDocument = _shared.isArray( document ) ? document : [document];

		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( Carbon.Resource.isResource( resource ) ) {
				var uri = resource.getURI();
				if ( uri && Carbon.URI.isIndependentlyResolvable( uri ) ) documentResources.push( resource );
			}
		}

		return documentResources;
	};

	_document.getInlineResources = function ( documentResource, document ) {
		var inlineResources = [];

		var arrayDocument = _shared.isArray( document ) ? document : [document];

		var length = arrayDocument.length;
		for ( var i = 0; i < length; i ++ ) {
			var resource = arrayDocument[i];
			if ( Carbon.InlineResource.isInlineResource( resource ) ) inlineResources.push( resource );
		}

		return inlineResources;
	};

	Carbon.Document = _document;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _indirectContainer = {};

	_indirectContainer.class = Carbon.DefaultPrefixes.ldp + 'IndirectContainer';

	_indirectContainer.Property = {
		contains: Carbon.DefaultPrefixes.ldp + 'contains'
	};

	_indirectContainer.isIndirectContainer = function ( rdfSource ) {
		if ( ! rdfSource ) return false;
		if ( ! Carbon.Resource.isResource( rdfSource ) ) return false;
		return rdfSource.isOfType( Carbon.IndirectContainer.class );
	};

	_indirectContainer.injectMethods = function ( sources ) {
		sources.forEach( function ( source ) {

			// TODO: FT

		} );
	};

	Carbon.IndirectContainer = _indirectContainer;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _inlineResource = {};

	_inlineResource.isInlineResource = function ( resource ) {
		if ( ! Carbon.Resource.isResource( resource ) ) return false;

		var uri = resource.getURI();
		if ( ! uri ) return false;

		if ( ! Carbon.URI.isURI( uri ) ) {
			// The uri is relative
			return _shared.stringStartsWith( uri, Carbon.INLINE_RESOURCE_SIGN );
		} else {
			return _shared.stringContains( uri, Carbon.INLINE_RESOURCE_SIGN );
		}
	};

	_inlineResource.isInlineResourceOf = function ( resource, documentResource ) {
		if ( ! _inlineResource.isInlineResource( resource ) ) return false;
		if ( ! Carbon.Resource.isResource( documentResource ) ) throw "The documentResource provided isn't an RDF Resource.";

		var uri = resource.getURI();
		if ( ! uri ) return false;
		return _shared.stringStartsWith( uri, documentResource.getURI() + Carbon.INLINE_RESOURCE_SIGN );
	};

	_inlineResource._create = function () {
		var newResource = Carbon.Resource.create( null );
		_inlineResource.injectMethods( newResource );
		return newResource;
	};

	_inlineResource.injectMethods = function ( rdfResources ) {
		rdfResources = _shared.isArray( rdfResources ) ? rdfResources : [rdfResources];
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

	Carbon.InlineResource = _inlineResource;
}( Carbon, $, jsonld, Map, _shared ));

(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _literal = {};

	// TODO: Finish adding the extra datatypes
	_literal.DataTypes = {

		// Date/Time
		date              : Carbon.DefaultPrefixes.xsd + "date",
		dateTime          : Carbon.DefaultPrefixes.xsd + "dateTime",
		duration          : Carbon.DefaultPrefixes.xsd + "duration",
		gDay              : Carbon.DefaultPrefixes.xsd + "gDay",
		gMonth            : Carbon.DefaultPrefixes.xsd + "gMonth",
		gMonthDay         : Carbon.DefaultPrefixes.xsd + "gMonthDay",
		gYear             : Carbon.DefaultPrefixes.xsd + "gYear",
		gYearMonth        : Carbon.DefaultPrefixes.xsd + "gYearMonth",
		time              : Carbon.DefaultPrefixes.xsd + "time",

		// Numbers
		byte              : Carbon.DefaultPrefixes.xsd + "byte",
		decimal           : Carbon.DefaultPrefixes.xsd + "decimal",
		int               : Carbon.DefaultPrefixes.xsd + "int",
		integer           : Carbon.DefaultPrefixes.xsd + "integer",
		long              : Carbon.DefaultPrefixes.xsd + "long",
		negativeInteger   : Carbon.DefaultPrefixes.xsd + "negativeInteger",
		nonNegativeInteger: Carbon.DefaultPrefixes.xsd + "nonNegativeInteger",
		nonPositiveInteger: Carbon.DefaultPrefixes.xsd + "nonPositiveInteger",
		positiveInteger   : Carbon.DefaultPrefixes.xsd + "positiveInteger",
		short             : Carbon.DefaultPrefixes.xsd + "short",
		unsignedLong      : Carbon.DefaultPrefixes.xsd + "unsignedLong",
		unsignedInt       : Carbon.DefaultPrefixes.xsd + "unsignedInt",
		unsignedShort     : Carbon.DefaultPrefixes.xsd + "unsignedShort",
		unsignedByte      : Carbon.DefaultPrefixes.xsd + "unsignedByte",
		double            : Carbon.DefaultPrefixes.xsd + "double",
		float             : Carbon.DefaultPrefixes.xsd + "float",

		// Misc
		boolean           : Carbon.DefaultPrefixes.xsd + "boolean",
		string            : Carbon.DefaultPrefixes.xsd + "string"
	};
	_literal.InvertedDataTypes = (function ( carbon ) {
		var _inverted = {};

		var _normal = _literal.DataTypes;
		for ( var property in _normal ) {
			if ( _normal.hasOwnProperty( property ) ) {
				_inverted[_normal[property]] = property;
			}
		}

		return _inverted;
	}( Carbon ));

	_literal.toLiteral = function ( value ) {
		var literal = {};
		var type = null;

		switch ( true ) {
			case _shared.isDate( value ):
				type = _literal.DataTypes.dateTime;
				value = value.toISOString();
				break;
			case _shared.isNumber( value ):
				if ( _shared.isInteger( value ) ) {
					type = _literal.DataTypes.integer;
				} else {
					type = _literal.DataTypes.double;
				}
				break;
			case _shared.isString( value ):
				type = _literal.DataTypes.string;
				break;
			/*
			 TODO: Should we support arrays?
			 case_shared.isArray(value):
			 break;
			 */
			case _shared.isBoolean( value ):
				type = _literal.DataTypes.boolean;
				break;
		}

		literal["@value"] = value;
		if ( type ) literal["@type"] = type;

		return literal;
	};
	_literal.parseLiteral = function ( jsonLDValue ) {
		if ( ! jsonLDValue ) return null;
		if ( ! _shared.hasProperty( jsonLDValue, "@value" ) ) return null;

		if ( ! _shared.hasProperty( jsonLDValue, "@type" ) ) {
			// The literal doesn't have a defined type
			return jsonLDValue["@value"];
		}

		var type = jsonLDValue["@type"];
		if ( ! _shared.hasProperty( _literal.InvertedDataTypes, type ) ) {
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
				if ( _shared.isNumber( value ) ) {
					// Do nothing, it is already a number
				} else if ( _shared.isString( value ) ) {
					value = parseFloat( value );
				} else {
					throw "The number couldn't be parsed!";
				}
				break;

			// Misc
			case "boolean" :
				if ( _shared.isBoolean( value ) ) {
					// Do nothing, it is already a boolean
				} else if ( _shared.isString( value ) ) {
					value = _shared.parseBoolean( value );
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
		return _shared.hasProperty( jsonLDValue, "@value" );
	};

	Carbon.Literal = _literal;
}( Carbon, $, jsonld, Map, _shared ));
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
		rdfResources = _shared.isArray( rdfResources ) ? rdfResources : [rdfResources];

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
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _persistedBC = {};

	_persistedBC.injectMethods = function ( basicContainers ) {
		basicContainers = _shared.isArray( basicContainers ) ? basicContainers : [basicContainers];

		var length = basicContainers.length;
		for ( var i = 0; i < length; i ++ ) {
			var basicContainer = basicContainers[i];
			(function ( basicContainer ) {

				basicContainer.createSource = function ( children ) {
					//if (_shared.stringContains( slug, carbon.INLINE_RESOURCE_SIGN ) ) throw "The slug of a source cannot contain a # symbol.";

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
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _persistedInlineResource = {};

	_persistedInlineResource.injectMethods = function ( inlineResources ) {
		inlineResources = _shared.isArray( inlineResources ) ? inlineResources : [inlineResources];

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
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _rest = {};

	_rest.get = function ( uri, options ) {
		_shared.log( ">> REST.get()" );

		var defaultOptions = {
			authenticate: true
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		_shared.debug( "-- REST.get() > GET resource: %s, options: %o", uri, options );

		var headers = {
			"Accept": "application/ld+json"
		};

		if ( options.authenticate ) {
			headers = Carbon.Auth.setCredentialHeaders( headers );
		}

		var deferred = $.Deferred();
		$.ajax( {
			type   : 'GET',
			url    : uri,
			headers: headers
		} ).then(
			function ( jsonResponse, textStatus, jqXHR ) {
				_shared.debug( "-- REST.get() > The request was successfull." );
				_shared.log( "-- REST.get() > Digesting response..." );
				Carbon.digestRDFResources( jsonResponse ).then(
					function ( rdfResources ) {
						_shared.debug( "<< REST.get() > The response was successfully digested." );
						deferred.resolve( rdfResources, jqXHR );
					}, function ( errorObject ) {
						_shared.error( "<< REST.get() > The response couldn't be digested." );
						deferred.reject( errorObject );
					}
				);
			}, function ( jqXHR, textStatus, errorThrown ) {
				_shared.error( "<< REST.get() > The request failed. Response: %o", jqXHR );
				deferred.reject();
			}
		);

		return deferred.promise();
	};

	_rest.post = function ( uri, body, options ) {
		_shared.log( ">> REST.post()" );

		var defaultOptions = {
			authenticate: true,
			headers     : null
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		_shared.debug( "-- REST.post() > POST uri: %s, body: %o, options: %o", uri, body, options );

		var headers = {
			"Accept"      : "application/ld+json",
			"Content-Type": "application/ld+json"
		};

		if ( options.authenticate ) {
			headers = Carbon.Auth.setCredentialHeaders( headers );
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
				_shared.debug( "-- REST.post() > The request was successfull." );
				deferred.resolve( jsonResponse, jqXHR );
			}, function ( jqXHR, textStatus, errorThrown ) {
				_shared.error( "<< REST.post() > The request failed. Response: %o", jqXHR );
				deferred.reject();
			}
		);

		return deferred.promise();
	};

	_rest.patch = function ( uri, patchRequest, options ) {
		_shared.log( ">> REST.patch()" );

		var defaultOptions = {
			authenticate: true,
			headers     : null
		};
		if ( typeof options == 'object' ) {
			options = $.extend( defaultOptions, options );
		} else {
			options = defaultOptions;
		}

		_shared.debug( "-- REST.patch() > PATCH resource: %s, patchRequest: %o, options: %o", uri, patchRequest, options );

		var headers = {
			"Accept"      : "application/ld+json",
			"Content-Type": "application/ld+json"
		};

		if ( options.authenticate ) {
			headers = Carbon.Auth.setCredentialHeaders( headers );
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
				_shared.debug( "-- REST.patch() > The request was successfull." );
				deferred.resolve( jqXHR );
			}, function ( jqXHR, textStatus, errorThrown ) {
				_shared.error( "<< REST.patch() > The request failed. Response: %o", jqXHR );
				deferred.reject();
			}
		);

		return deferred.promise();
	};

	Carbon.REST = _rest;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _resource = {};

	_resource.class = Carbon.DefaultPrefixes.ldp + 'Resource';

	_resource.Property = {
		type: Carbon.DefaultPrefixes.rdf + 'type'
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
		if ( ! _shared.isArray( rdfResources ) ) {
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
				var property = Carbon.Resource.Property.type;
				if ( ! this.hasOwnProperty( property ) ) {
					return false;
				}
				var values = this[property];
				var isOfType = false;
				values.some( function ( value ) {
					if ( Carbon.Resource.isResource( value ) ) {
						if ( value["@id"] == type ) {
							isOfType = true;
							return true;
						}
					}
				} );
				return isOfType;
			};

			rdfResource.addType = function ( type ) {
				var typeResource = Carbon.Resource.create( type );
				this.addProperty( Carbon.Resource.Property.type, typeResource );
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
				var propertyArray = _shared.isArray( this[property] ) ? this[property] : [this[property]];
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
				if ( Carbon.Resource.isResource( value ) ) {
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

	Carbon.Resource = _resource;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _sparql = {};

	_sparql.ask = function ( url, query ) {
		if ( ! _shared.isString( url ) ) throw "The URL must be a String!";
		if ( ! _shared.isString( query ) ) throw "The query must be a String!";

		var headers = {};
		headers["Content-Type"] = "application/sparql-query";
		headers["Accept"] = "application/json; q=0.8, application/ld+json; q=0.2";

		var deferred = $.Deferred();

		Carbon.REST.post( url, query, {
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
		if ( ! _shared.isString( url ) ) throw "The URL must be a String!";
		if ( ! _shared.isString( query ) ) throw "The query must be a String!";

		var headers = {};
		headers["Content-Type"] = "application/sparql-query";
		headers["Accept"] = "application/sparql-results+json; q=0.8, application/ld+json; q=0.2";

		var deferred = $.Deferred();

		Carbon.REST.post( url, query, {
			headers: headers
		} ).then(
			function ( jsonResponse, jqXHR ) {
				if ( ! Carbon.SPARQL.ResultSet.isResultSet( jsonResponse ) ) {
					// TODO: FT
					deferred.reject();
					return;
				}
				Carbon.SPARQL.ResultSet.injectMethods( jsonResponse );

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

	Carbon.SPARQL = _sparql;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _source = {};

	_source.class = Carbon.DefaultPrefixes.ldp + 'RDFSource';

	_source.Property = {

	};

	_source.create = function () {
		var newSource = Carbon.Resource.create( null );
		_source.injectMethods( newSource );
		newSource.addType( Carbon.Source.class );
		return newSource;
	};

	_source.injectMethods = function ( resources ) {
		resources = _shared.isArray( resources ) ? resources : [resources];

		resources.forEach( function ( resource ) {

			resource._setURI = function ( uri ) {
				resource["@id"] = uri;
				var slugs = resource.getInlineResourceSlugs();
				(function ( slugs ) {
					var length = slugs.length;
					for ( var i = 0; i < length; i ++ ) {
						var slug = slugs[i];
						var inlineResource = resource.getInlineResource( slug );

						var inlineResourceURI = uri + Carbon.INLINE_RESOURCE_SIGN + slug;
						inlineResource._setURI( inlineResourceURI );
					}
				}( slugs ));

			};

			// === InlineResources

			var _inlineResources = new Map();
			resource.hasInlineResource = function ( uri ) {
				if ( ! Carbon.URI.isURI( uri ) ) {
					// The URI provided is relative
					if ( ! _shared.stringStartsWith( uri, Carbon.INLINE_RESOURCE_SIGN ) ) {
						uri = resource.getURI() + Carbon.INLINE_RESOURCE_SIGN + uri;
					} else {
						uri = resource.getURI() + uri;
					}
				}
				return _inlineResources.has( uri );
			};
			resource.getInlineResource = function ( uri ) {
				if ( Carbon.URI.isURI( uri ) ) {
					// The URI provided isn't relative
					if ( resource.isPersisted() ) throw "Cannot add an inlineResource with a complete URI to a non persisted Source.";
					else if ( Carbon.URI.getGlobalBase( uri ) != resource.getURI() ) throw "The inlineResource doesn't belong to this RDFSource.";

					uri = Carbon.URI.getLocalSlug( uri );
				} else {
					uri = _shared.stringStartsWith( Carbon.INLINE_RESOURCE_SIGN ) ? uri.substring( 1, uri.length - 1 ) : uri;
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
				inlineResources = _shared.isArray( inlineResources ) ? inlineResources : [inlineResources];

				var length = inlineResources.length;
				for ( var i = 0; i < length; i ++ ) {
					var inlineResource = inlineResources[i];

					if ( ! Carbon.InlineResource.isInlineResource( inlineResource ) ) throw "The inlineResource doesn't belong to this RDFSource.";

					var uri = inlineResource.getURI();
					if ( Carbon.URI.isURI( uri ) ) {
						if ( ! Carbon.InlineResource.isInlineResourceOf( inlineResource, this ) ) throw "The inlineResource doesn't belong to this RDFSource.";
						uri = Carbon.URI.getLocalSlug( uri );
					} else {
						// The InlineResource has a relative URI
						uri = _shared.stringStartsWith( Carbon.INLINE_RESOURCE_SIGN ) ? uri.substring( 1, uri.length - 1 ) : uri;
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

	Carbon.Source = _source;
}( Carbon, $, jsonld, Map, _shared ));
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
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

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
		if ( ! _shared.isString( uri ) ) return false;

		return _uriPattern.test( uri );
	};

	_uri.isIndependentlyResolvable = function ( uri ) {
		if ( ! _shared.isString( uri ) ) throw 'Not a String!';

		return ! _shared.stringContains( uri, Carbon.INLINE_RESOURCE_SIGN );
	};

	_uri.getGlobalBase = function ( uri ) {
		if ( ! _shared.isString( uri ) ) throw 'Not a String!';
		var index = uri.indexOf( Carbon.INLINE_RESOURCE_SIGN );
		if ( index == - 1 ) return uri;

		return uri.substring( 0, index - 1 );
	};
	_uri.getSlug = function ( uri ) {
		if ( ! _shared.isString( uri ) ) throw 'Not a String!';
		var tempURI = _shared.stringEndsWith( uri, "/" ) ? uri.substring( 0, uri.length - 1 ) : uri;
		var index = tempURI.lastIndexOf( "/" );
		if ( index == - 1 ) return uri;

		return uri.substring( 0, index - 1 );
	};
	_uri.getLocalSlug = function ( uri ) {
		if ( ! _shared.isString( uri ) ) throw 'Not a String!';
		var index = uri.indexOf( Carbon.INLINE_RESOURCE_SIGN );
		if ( index == - 1 ) return null;

		return uri.substring( index + 1, uri.length - 1 );
	};

	Carbon.URI = _uri;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _agent = {};

	_agent.class = Carbon.DefaultPrefixes.cs + 'Agent';
	_agent.Property = {
		uuid    : {
			uri    : Carbon.DefaultPrefixes.c + "uuid",
			multi  : false,
			literal: true
		},
		fullName: {
			uri    : Carbon.DefaultPrefixes.foaf + "name",
			multi  : false,
			literal: true
		},
		email   : {
			uri    : Carbon.DefaultPrefixes.vcard + "email",
			literal: true
		},
		password: {
			uri    : Carbon.DefaultPrefixes.cs + "password",
			multi  : false,
			literal: true
		},
		apiKey  : {
			uri     : Carbon.DefaultPrefixes.cs + "apiKey",
			multi   : false,
			readOnly: true,
			literal : true
		}
	};

	_agent.create = function ( uri ) {
		uri = typeof uri !== 'undefined' ? uri : Carbon.getGenericRequestURI();

		var agentResource = Carbon.Resource.create( uri );
		agentResource.addType( _agent.class );

		_agent.injectMethods( agentResource );

		return agentResource;
	};

	_agent.isAgent = function ( resource ) {
		if ( ! Carbon.Resource.isResource( resource ) ) return false;
		return resource.isOfType( _agent.class );
	};

	_agent.injectMethods = function ( resources ) {
		if ( ! ( resources instanceof Array ) ) {
			resources = [ resources ];
		}

		resources.forEach( function ( resource ) {

			Carbon.Resource.injectPropertyMethods( resource, _agent.Property );

		} );
	};

	Carbon.Auth.Agent = _agent;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _token = {};

	_token.class = Carbon.DefaultPrefixes.cs + 'Token';

	_token.Property = {
		key: {
			uri     : Carbon.DefaultPrefixes.cs + 'key',
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
			Carbon.Resource.injectPropertyMethods( resource, _token.Property );
		} );
	};

	_token.isToken = function ( resource ) {
		if ( ! Carbon.Resource.isResource( resource ) ) return false;
		return resource.isOfType( _token.class );
	};

	Carbon.Auth.Token = _token;
}( Carbon, $, jsonld, Map, _shared ));
(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _resultSet = {};

	_resultSet.isResultSet = function ( resultSet ) {
		if ( ! resultSet ) return false;
		return _shared.hasProperty( resultSet, "head" ) && _shared.hasProperty( resultSet, "results" );
	};

	_resultSet.injectMethods = function ( resultSets ) {
		resultSets = _shared.isArray( resultSets ) ? resultSets : [resultSets];
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

	Carbon.SPARQL.ResultSet = _resultSet;
}( Carbon, $, jsonld, Map, _shared ));

}(this, $, jsonld, Map));