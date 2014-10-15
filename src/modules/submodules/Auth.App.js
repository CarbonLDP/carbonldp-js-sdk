(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _app = {};

	_app.class = Carbon.DefaultPrefixes.cs + 'Application';
	_app.Properties = {
		slug  : {
			uri    : Carbon.DefaultPrefixes.c + 'slug',
			multi  : false,
			literal: true
		},
		name  : {
			uri    : Carbon.DefaultPrefixes.doap + "name",
			multi  : false,
			literal: true
		},
		domain: {
			uri    : Carbon.DefaultPrefixes.cs + 'sourceDomain',
			multi  : true,
			literal: false
		}
	};

	_app.create = function ( uri ) {
		uri = typeof uri !== 'undefined' ? uri : Carbon.getGenericRequestURI();

		var appResource = Carbon.Resource.create( uri );
		appResource.addType( _app.class );

		_app.injectMethods( appResource );

		return appResource;
	};

	_app.isApp = function ( resource ) {
		if ( ! Carbon.Resource.isResource( resource ) ) return false;
		return resource.isOfType( _app.class );
	};

	_app.injectMethods = function ( resources ) {
		if ( ! ( resources instanceof Array ) ) {
			resources = [ resources ];
		}

		resources.forEach( function ( resource ) {

			Carbon.Resource.injectPropertyMethods( resource, _app.Property );

		} );
	};

	_app.getApps = function () {
		var uri = Carbon.getAPIRequestURL() + _shared.endpoints.apps;

		var deferred = $.Deferred();

		// TODO: Use inline option to get them all at once
		Carbon.SourceLibrary.get( uri ).then(
			function ( appsContainer ) {
				var members = appsContainer.listMemberURIs();
				if ( ! members || members.length == 0 ) {
					// Return an empty array
					deferred.resolve( [] );
					return;
				}

				return Carbon.SourceLibrary.get( members );
			}, deferred.reject
		).then(
			function ( apps ) {
				apps = _shared.isArray( apps ) ? apps : [apps];
				Carbon.Resource.injectPropertyMethods( apps, _app.Properties );
				deferred.resolve( apps );
			}, deferred.reject
		);

		return deferred;
	};

	_app.getApp = function ( appURI ) {
		if ( ! Carbon.URI.isURI( appURI ) ) {
			// The URI is relative, treat it as a slug
			appURI = Carbon.getAPIRequestURL() + _shared.endpoints.apps + appURI;
		}

		var deferred = $.Deferred();
		Carbon.SourceLibrary.get( appURI ).then(
			function ( app ) {
				Carbon.Resource.injectPropertyMethods( app, _app.Properties );
				deferred.resolve( app );
			}, deferred.reject
		);
		return deferred.promise();
	};

	Carbon.Auth.App = _app;
}( Carbon, jQuery, jsonld, Map, _shared ));