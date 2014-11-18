define(
	[
		// Dependencies
		'jsonld', 'underscore', 'jog', 'Carbon/utils/Map'
	], function( jsonld, _, JSLogger ){
		var Carbon = {};

		var _config = {
			version: "0.8.0",
			requestProtocol: "https",
			uriProtocol: "http",
			domain: "carbonldp.com",
			endpoints: {
				apps: 'apps/'
			}
		};
		Carbon.config = {};
		Carbon.config.getVersion = function() {
			return _config.version;
		};
		Carbon.config.getRequestProtocol = function() {
			return _config.requestProtocol;
		};
		Carbon.config.getURIProtocol = function() {
			return _config.uriProtocol;
		};
		Carbon.config.getDomain = function() {
			return _config.domain;
		};
		Carbon.getAPIRequestURL = function() {
			return _config.requestProtocol + "://" + _config.domain + "/";
		};
		Carbon.getAPIBaseURI = function() {
			return _config.uriProtocol + "://" + _config.domain + "/";
		};

		Carbon.URI = require('src/rdf/URI');


	    return Carbon;
	}
);

(function(global, $, jsonld) {
	if ( ! $ ) {
		console.error( "The Carbon LDP JavaScript library depends on jQuery. Please include it on the source code." );
		return null;
	}
	if ( ! jsonld ) {
		console.error( "The Carbon LDP JavaScript library depends on JSON-LD. Please include it on the source code." );
		return null;
	}

	//#include("Map.js")

	var _shared = {};

	//#include("shared.js")

	(function ( global, $, jsonld, Map, _shared ) {
		'use strict';

		var Carbon = {};

		// Public variables and methods
		Carbon.getVersion = function () {
			return _shared.version;
		};
		Carbon.getRequestProtocol = function() {
			return _shared.requestProtocol;
		};
		Carbon.getURIProtocol = function() {
			return _shared.uriProtocol;
		};
		Carbon.getDomain = function() {
			return _shared.domain;
		};
		Carbon.getAppSlug = function() {
			return _shared.appSlug;
		};
		Carbon.getAPIDescription = function() {
			return _shared.api;
		};

		Carbon.getAPIRequestURL = function () {
			return _shared.requestProtocol + "://" + _shared.domain + "/";
		};

		Carbon.getAPIBaseURI = function () {
			return _shared.uriProtocol + "://" + _shared.domain + "/";
		};

		Carbon.getAPIVersion = function () {
			if ( ! _shared.api ) {
				throw 'Carbon hasn\'t been initiated';
			}
			return _shared.api.getVersion();
		};

		Carbon.setDefaultAppSlug = function ( appSlug ) {
			_shared.appSlug = appSlug;
		};

		Carbon.HTTPHeaders = {
			etag   : "ETag",
			ifMatch: "If-Match"
		};

		Carbon.DefaultPrefixes = {
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
		Carbon.NS = Carbon.DefaultPrefixes.c;
		Carbon.SECURITY_NS = Carbon.DefaultPrefixes.cs;
		Carbon.INLINE_RESOURCE_SIGN = '#';
		Carbon.SYSTEM_RES_SIGN = '#$';

		Carbon.init = function ( options ) {
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

			JSLogger.loggingLevel = options.loggingLevel;

		JSLogger.log( ">> init() > Initializing Carbon's SDK." );
		_shared.debug( "-- init() >  Options: %o", options );

			if ( options.protocol ) _shared.requestProtocol = options.protocol;
			if ( options.domain ) _shared.domain = options.domain;

			if ( options.appSlug ) Carbon.setDefaultAppSlug( options.appSlug );

		JSLogger.log( "-- init() > Retrieving Carbon's API Description..." );
			var apiURL = Carbon.getAPIRequestURL() + 'api';
			var apiPromise = Carbon.REST.get( apiURL, {
				authenticate: false
			} );

			return apiPromise.then(
				function ( rdfResources ) {
					var deferred = $.Deferred();

					var apiDescription = Carbon.Document.getResourceOfType( Carbon.API.class, rdfResources );
					if ( ! apiDescription ) {
					_shared.error( "<< init() > The response didn't contain the API Description" );
						deferred.reject();
						return deferred.promise();
					}

					Carbon.Resource.injectPropertyMethods( apiDescription, Carbon.API.Property );
					_shared.api = apiDescription;

				_shared.debug( "<< init() > Carbon's API Description has been successfully retrieved." );
					deferred.resolve();
					return deferred.promise();
				}, function ( errorObject ) {
					// TODO: FT
				}
			);
		};

		Carbon.getGenericRequestURI = function () {
			return Carbon.getAPIBaseURI() + 'requests/' + (new Date().getTime());
		};

		Carbon.digestRDFResources = function ( jsonLDObjects ) {
		JSLogger.log( ">> digestRDFResources()" );
			var deferred = $.Deferred();
		JSLogger.log( "-- digestRDFResources() > Processing the jsonLD object..." );
			Carbon.processJsonLD( jsonLDObjects ).then(
				function ( jsonLDObjects ) {
				_shared.debug( "<< digestRDFResources() > JsonLD successfully processed." );
					Carbon.Resource.injectMethods( jsonLDObjects );
					deferred.resolve( jsonLDObjects );
				}, function ( errorObject ) {
				_shared.error( "<< digestRDFResources() > JsonLD couldn't be processed." );
					deferred.reject( errorObject );
				}
			);

			return deferred.promise();
		};

		Carbon.processJsonLD = function ( jsonLDDocument ) {
			JSLogger.log( ">> processJsonLD()" );
			_shared.debug( "-- processJsonLD() > JSON-LD Document: %o", jsonLDDocument );

			var deferred = $.Deferred();

			JSLogger.log( "-- processJsonLD() > Expanding JSON-LD Document..." );
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

		global.Carbon = Carbon;
	}( global, $, jsonld, Map, _shared ));

	//#include("modules.js")

}(this, $, jsonld));