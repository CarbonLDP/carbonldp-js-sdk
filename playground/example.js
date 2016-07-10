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
			let timeline;

			carbon.auth.authenticate( "app@example.com", "app" ).then( function() {
				return carbon.apps.getContext( "test-app/" );
			} ).then( ( _appContext ) => {
				appContext = _appContext;
				return appContext.documents.get( "" );
			} ).then( ( [ _timeline, response ] ) => {
				timeline = _timeline;

				removeFragments( timeline );

				timeline.labels = [];

				return saveAndRefresh( timeline );
			} ).then( () => {
				timeline.labels = [
					timeline.createFragment( {
						color: "#1111",
						style: "style-1",
						type: "car"
					} ),
					timeline.createFragment( {
						color: "#2222",
						style: "style-2",
						type: "cyclist"
					} )
				];

				return saveAndRefresh( timeline );
			} ).then( () => {
				console.log( timeline.labels[ 0 ].color );
				console.log( timeline.labels[ 1 ].color );

				let label1 = timeline.labels.find( ( label ) => label.color === "#1111" );
				let label2 = timeline.labels.find( ( label ) => label.color === "#2222" );

				label2.color = "#222";
				label2.newProperty = "Hello!";

				timeline.removeFragment( label1 );
				timeline.labels = [ label2 ];

				timeline.labels.push(
					timeline.createFragment( {
						color: "#3333",
						style: "style-3",
						type: "pedestrian"
					} )
				);
				timeline.labels.push(
					timeline.createFragment( {
						color: "#4444",
						style: "style-4",
						type: "car"
					} )
				);

				return saveAndRefresh( timeline );
			} ).then( () => {
				expect( "labels" in timeline ).toEqual( true );
				expect( timeline.labels.length ).toEqual( 3 );
				expect( timeline.getFragments().length ).toEqual( 3 );

				let label2 = timeline.labels.find( ( label ) => label.color === "#222" );
				let label3 = timeline.labels.find( ( label ) => label.color === "#3333" );
				let label4 = timeline.labels.find( ( label ) => label.color === "#4444" );

				expect( label2 ).toBeDefined();
				expect( label2.newProperty ).toEqual( "Hello!" );
				expect( label2.style ).toEqual( "style-2" );
				expect( label2.type ).toEqual( "cyclist" );

				expect( label3 ).toBeDefined();
				expect( label3.style ).toEqual( "style-3" );
				expect( label3.type ).toEqual( "pedestrian" );

				expect( label4 ).toBeDefined();
				expect( label4.style ).toEqual( "style-4" );
				expect( label4.type ).toEqual( "car" );

				console.log( timeline );
				console.log( timeline.labels[ 0 ].color );
				console.log( timeline.labels[ 1 ].color );
				console.log( timeline.labels[ 2 ].color );
			} ).then( () => {
				done();
			} ).catch( ( error ) => {
				done( error );
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