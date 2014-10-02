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

	//#include("shared.js")

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

	//#include("modules.js")

}(this, $, jsonld, Map));