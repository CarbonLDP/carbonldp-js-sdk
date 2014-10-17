(function ( Carbon, $, jsonld, Map, _shared ) {
	'use strict';

	var _basicContainer = {};

	_basicContainer.class = Carbon.DefaultPrefixes.ldp + 'BasicContainer';

	_basicContainer.Properties = {
		contains         : {
			uri         : Carbon.DefaultPrefixes.ldp + 'contains',
			multiValue  : true,
			literal     : false,
			readOnly    : true,
			singularForm: "containment",
			pluralForm  : "containments"
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