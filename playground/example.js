(function() {
	function async( test ) {
		return function( done ) {
			test().then( done ).catch( done.fail );
		};
	}

	const carbon1 = new CarbonLDP( "http://localhost:8083" );
	const carbon2 = new CarbonLDP( "http://localhost:8083" );
	const carbon3 = new CarbonLDP( "http://localhost:8083" );

	const prefixes = {
		"acl": "http://www.w3.org/ns/auth/acl#",
		"api": "http://purl.org/linked-data/api/vocab#",
		"c": "https://carbonldp.com/ns/v1/platform#",
		"cs": "https://carbonldp.com/ns/v1/security#",
		"cp": "https://carbonldp.com/ns/v1/patch#",
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
		"xsd": "http://www.w3.org/2001/XMLSchema#",
		"schema": "https://schema.org/"
	};

	carbon1.extendObjectSchema( prefixes );
	carbon1.extendObjectSchema( "ex:Child", {
		"index": {
			"@id": "ex:index",
			"@type": "xsd:integer",
		}
	} );
	carbon1.extendObjectSchema( "ex:NestedChild", {
		"index": {
			"@id": "ex:index",
			"@type": "xsd:integer",
		}
	} );

	carbon2.extendObjectSchema( prefixes );
	carbon2.extendObjectSchema( "ex:Child", {
		"index": {
			"@id": "ex:index",
			"@type": "xsd:integer",
		}
	} );
	carbon2.extendObjectSchema( "ex:NestedChild", {
		"index": {
			"@id": "ex:index",
			"@type": "xsd:integer",
		}
	} );

	describe( "Tests >", () => {
		let childrenToCreate = 6;
		let parent;
		let children;
		let child;

		it( "can create a document", async( async function() {
			let createdParent = await carbon1.documents.createAndRetrieve( "/", {
				types: [ "ex:Parent" ]
			} );

			expect( Array.isArray( createdParent.types ) ).toBeTruthy();

			parent = createdParent;
		} ) );

		it( `can create ${childrenToCreate} children`, async( async function() {
			for( let i = 0; i < childrenToCreate; i ++ ) {
				let type = i % 2 === 0 ? "ex:Even" : "ex:Odd";

				await parent.create( {
					types: [ "ex:Child", type ],
					index: i + 1,
				} );
			}
			expect( null ).nothing();
		} ) );

		it( "can refresh the parent", async( async function() {
			await parent.refresh();

			expect( parent.contains.length ).toEqual( childrenToCreate );
		} ) );

		it( "can retrieve all the children", async( async function() {
			let retrievedChildren = await parent.getChildren();

			expect( retrievedChildren.length ).toEqual( childrenToCreate );

			for( let i = 0; i < childrenToCreate; i ++ ) {
				const type = i % 2 === 0 ? "http://example.org/ns#Even" : "http://example.org/ns#Odd";

				expect( retrievedChildren ).toContain( jasmine.objectContaining( {
					types: jasmine.arrayContaining( [ "http://example.org/ns#Child", type ] ),
					index: i + 1,
				} ) );
			}

			children = retrievedChildren;
		} ) );

		it( "can list the children", async( async function() {
			const shallowChildren = await carbon3.documents.listChildren( parent.$id );

			expect( shallowChildren.length ).toEqual( childrenToCreate );
		} ) );

		it( "can remove one member", async( async function() {
			await parent.removeMember( children[ 0 ] );

			expect( null ).nothing();
		} ) );

		it( "can retrieve all the members", async( async function() {
			let members = await parent.getMembers();

			expect( members.length ).toEqual( childrenToCreate - 1 );
		} ) );

		it( "can retrieve children of a specific type", async( async function() {
			let filteredChildren = await parent.getChildren( _ => _.withType( "ex:Even" ) );

			expect( filteredChildren.length ).toEqual( childrenToCreate / 2 );
		} ) );

		it( "can retrieve children with a property that has a specific value", async( async function() {
			let filteredChildren = await parent.getChildren( _ => _
				.withType( "ex:Child" )
				.properties( {
					"index": {
						"query": _ => _
							.values( _.value( 3 ) )
					}
				} )
			);

			expect( filteredChildren.length ).toEqual( 1 );
			expect( filteredChildren[ 0 ].index ).toEqual( 3 );

			child = filteredChildren[ 0 ];
		} ) );

		it( `can create nested documents`, async( async function() {
			for( let i = 0; i < childrenToCreate; i ++ ) {
				let type = i % 2 === 0 ? "ex:Even" : "ex:Odd";

				await child.create( {
					types: [ "ex:NestedChild", type ],
					index: i + 1,
				} );
			}
			expect( null ).nothing();
		} ) );

		it( `can retrieve nested documents`, async( async function() {
			let childrenWithNestedDocuments = await carbon2.documents.getChildren( parent.$id, _ => _
				.withType( "ex:Child" )
				.properties( {
					"index": {
						"query": _ => _
							.values( _.value( child.index ) )
					},
					"contains": {
						"query": _ => _
							.withType( "ex:NestedChild" )
							.properties( {
								"index": _.inherit
							} )
					}
				} )
			);

			expect( childrenWithNestedDocuments.length ).toEqual( 1 );

			const childWithNestedDocuments = childrenWithNestedDocuments[ 0 ];

			console.log( childWithNestedDocuments );

			expect( childWithNestedDocuments.contains.length ).toEqual( childrenToCreate );
			childWithNestedDocuments.contains.forEach( nestedDocument =>
				expect( nestedDocument.index ).toBeDefined()
			);
		} ) );

		it( `can modify partial documents`, async( async function() {
			let [ child ] = await carbon2.documents.getChildren( parent.$id, _ => _
				.withType( "ex:Child" )
				.properties( {
					"index": {
						"query": _ => _
							.values( _.value( 4 ) )
					}
				} )
			);

			child.index = 100;
			child.somethingElse = "Hello world!";

			await child.save();

			const freshChild = await carbon2.documents.get( child.$id );

			expect( freshChild.index ).toEqual( 100 );
			expect( freshChild.somethingElse ).toEqual( "Hello world!" );
			expect( freshChild.modified ).toEqual( jasmine.any( Date ) );
		} ) );

	} );
})();