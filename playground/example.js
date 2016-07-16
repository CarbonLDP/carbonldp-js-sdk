(function() {
	describe( "something", () => {
		it( "something else", ( done ) => {
			"use strict";

			let carbon = new Carbon();
			carbon.setSetting( "domain", "local.carbonldp.com" );

			carbon.extendObjectSchema( {
				"acl": "http://www.w3.org/ns/auth/acl#",
				"api": "http://purl.org/linked-data/api/vocab#",
				"c": "http://carbonldp.com/ns/v1/platform#",
				"cs": "http://carbonldp.com/ns/v1/security#",
				"cp": "http://carbonldp.com/ns/v1/patch#",
				"cc": "http://creativecommons.org/ns#",
				"cert": "http://www.w3.org/ns/auth/cert#",
				"dbp": "http://dbpedia.org/property/",
				"dc": "http://purl.org/dc/terms/",
				"doap": "http://usefulinc.com/ns/doap#",
				"example": "http://example.org/ns#",
				"ex": "http://example.org/ns#",
				"exif": "http://www.w3.org/2003/12/exif/ns#",
				"fn": "http://www.w3.org/2005/xpath-functions#",
				"foaf": "http://xmlns.com/foaf/0.1/",
				"geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
				"geonames": "http://www.geonames.org/ontology#",
				"gr": "http://purl.org/goodrelations/v1#",
				"http": "http://www.w3.org/2006/http#",
				"ldp": "http://www.w3.org/ns/ldp#",
				"log": "http://www.w3.org/2000/10/swap/log#",
				"owl": "http://www.w3.org/2002/07/owl#",
				"rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
				"rdfs": "http://www.w3.org/2000/01/rdf-schema#",
				"rei": "http://www.w3.org/2004/06/rei#",
				"rsa": "http://www.w3.org/ns/auth/rsa#",
				"rss": "http://purl.org/rss/1.0/",
				"sd": "http://www.w3.org/ns/sparql-service-description#",
				"sfn": "http://www.w3.org/ns/sparql#",
				"sioc": "http://rdfs.org/sioc/ns#",
				"skos": "http://www.w3.org/2004/02/skos/core#",
				"swrc": "http://swrc.ontoware.org/ontology#",
				"types": "http://rdfs.org/sioc/types#",
				"vcard": "http://www.w3.org/2001/vcard-rdf/3.0#",
				"wot": "http://xmlns.com/wot/0.1/",
				"xhtml": "http://www.w3.org/1999/xhtml#",
				"xsd": "http://www.w3.org/2001/XMLSchema#"
			} );

			carbon.extendObjectSchema( {
				"hri": "http://hri.base22.com/ns#",
				"labels": {
					"@id": "hri:labels",
					"@type": "@id",
					"@container": "@set"
				},
				"gradient": {
					"@id": "hri:gradient",
					"@type": "@id"
				}
			} );

			let appContext;
			let resource;
			let fragment;

			carbon.auth.authenticate( "admin@carbonldp.com", "hello" ).then( function() {
				return carbon.apps.getContext( "test-app/" );
			} ).then( ( _appContext ) => {
				appContext = _appContext;
				return appContext.documents.get( "5080328326853933297/" );
			} ).then( ( [ _resource, response ] ) => {
				resource = _resource;
				debugger;
				removeFragments( resource );
				fragment = resource.myFragment = resource.createFragment( {
					string: "A fragment",
				} );
				return saveAndRefresh( resource );
			} ).then( ( [ _resource, responses ] ) => {
				expect( _resource ).toBe( resource );
				expect( fragment ).toBe( _resource.myFragment );
				done();
			} ).catch( ( error ) => {
				done.fail( error );
			} );

			function saveAndRefresh( persistedDocument ) {
				let responses = [];
				return persistedDocument.save().then( ( [ persistedDocument, response ] ) => {
					responses.push( response );
					return persistedDocument.refresh();
				} ).then( ( [ persistedDocument, response ] ) => {
					responses.push( response );
					return [ persistedDocument, responses ];
				} );
			}

			function removeFragments( persistedDocument ) {
				for( let fragment of persistedDocument.getFragments() ) {
					persistedDocument.removeFragment( fragment );
				}
			}
		} );
	} );
})();