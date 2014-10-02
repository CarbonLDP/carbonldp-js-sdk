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