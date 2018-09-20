(function() {
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

	const carbon = new CarbonLDP( "http://localhost:8083" );
	carbon.extendObjectSchema( prefixes );

	describe( "Tests >", () => {

		let root;
		beforeAll( async function() {
			root = await carbon.documents.$create( {} );
		} );

		afterAll( async function() {
			if( ! root ) return;
			await root.$delete();
		} );


		describe( "Querying >", function() {

			const carbon1 = new CarbonLDP( "http://localhost:8083" );
			const carbon2 = new CarbonLDP( "http://localhost:8083" );
			const carbon3 = new CarbonLDP( "http://localhost:8083" );

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


			let childrenToCreate = 6;
			let parent;
			let children;
			let child;
			beforeAll( async function() {
				parent = await carbon1.documents.$create( root.$id, { types: [ "ex:Parent" ] } );

				for( let i = 0; i < childrenToCreate; i ++ ) {
					let type = i % 2 === 0 ? "ex:Even" : "ex:Odd";

					await parent.$create( {
						types: [ "ex:Child", type ],
						index: i + 1,
					} );
				}
			} );

			afterAll( async function() {
				if( ! parent ) return;
				await parent.$delete();
			} );


			it( "can retrieve all the children", async function() {
				let retrievedChildren = await parent.$getChildren();

				expect( retrievedChildren.length ).toEqual( childrenToCreate );

				for( let i = 0; i < childrenToCreate; i ++ ) {
					const type = i % 2 === 0 ? "http://example.org/ns#Even" : "http://example.org/ns#Odd";

					expect( retrievedChildren ).toContain( jasmine.objectContaining( {
						types: jasmine.arrayContaining( [ "http://example.org/ns#Child", type ] ),
						index: i + 1,
					} ) );
				}

				children = retrievedChildren;
			} );

			it( "can list the children", async function() {
				const shallowChildren = await carbon3.documents.$listChildren( parent.$id );

				expect( shallowChildren.length ).toEqual( childrenToCreate );
			} );

			it( "can remove one member", async function() {
				await parent.$removeMember( children[ 0 ] );

				expect( null ).nothing();
			} );

			it( "can retrieve all the members", async function() {
				let members = await parent.$getMembers();

				expect( members.length ).toEqual( childrenToCreate - 1 );
			} );

			it( "can retrieve children of a specific type", async function() {
				let filteredChildren = await parent.$getChildren( _ => _.withType( "ex:Even" ) );

				expect( filteredChildren.length ).toEqual( childrenToCreate / 2 );
			} );

			it( "can retrieve children with a property that has a specific value", async function() {
				let filteredChildren = await parent.$getChildren( _ => _
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
			} );

			it( `can create nested documents`, async function() {
				for( let i = 0; i < childrenToCreate; i ++ ) {
					let type = i % 2 === 0 ? "ex:Even" : "ex:Odd";

					await child.$create( {
						types: [ "ex:NestedChild", type ],
						index: i + 1,
					} );
				}
				expect( null ).nothing();
			} );

			it( `can retrieve nested documents`, async function() {
				let childrenWithNestedDocuments = await carbon2.documents.$getChildren( parent.$id, _ => _
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
			} );

			it( `can modify partial documents`, async function() {
				let [ child ] = await carbon2.documents.$getChildren( parent.$id, _ => _
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

				await child.$save();

				const freshChild = await carbon2.documents.$get( child.$id );

				expect( freshChild.index ).toEqual( 100 );
				expect( freshChild.somethingElse ).toEqual( "Hello world!" );
				expect( freshChild.modified ).toEqual( jasmine.any( Date ) );
			} );

		} );


		describe( "Creations >", function() {

			let doc;
			afterEach( async function() {
				if( ! doc ) return;
				await doc.$delete();
			} );


			it( "should create object", async function() {
				doc = await root.$create( {} );

				expect( doc.$slug ).toMatch( /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i );
			} );

			it( "should create object with options", async function() {
				doc = await root.$create( { the: "document" }, {} );

				expect( doc.$slug ).toMatch( /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i );
			} );

			it( "should create object with slug", async function() {
				doc = await root.$create( {}, "the-slug" );

				expect( doc.$slug ).toBe( "the-slug" );
			} );

			it( "should create object with slug and options", async function() {
				doc = await root.$create( {}, "the-slug", {} );

				expect( doc.$slug ).toBe( "the-slug" );
			} );


			it( "should create and retrieve object", async function() {
				doc = await root.$createAndRetrieve( {} );

				expect( doc ).toEqual( {
					created: jasmine.any( Date ),
					modified: jasmine.any( Date ),
					hasMemberRelation: jasmine.objectContaining( {
						$id: carbon.getObjectSchema().resolveURI( "ldp:member" ),
					} ),
					insertedContentRelation: jasmine.objectContaining( {
						$id: carbon.getObjectSchema().resolveURI( "ldp:MemberSubject" ),
					} ),
					membershipResource: doc,
				} );
			} );

			it( "should create and retrieve object with slug", async function() {
				doc = await root.$createAndRetrieve( {}, "the-slug" );

				expect( doc ).toEqual( {
					created: jasmine.any( Date ),
					modified: jasmine.any( Date ),
					hasMemberRelation: jasmine.objectContaining( {
						$id: carbon.getObjectSchema().resolveURI( "ldp:member" ),
					} ),
					insertedContentRelation: jasmine.objectContaining( {
						$id: carbon.getObjectSchema().resolveURI( "ldp:MemberSubject" ),
					} ),
					membershipResource: doc,
				} );

				expect( doc.$slug ).toBe( "the-slug" );
			} );


			xit( "should create object with @id", async function() {
				doc = await root.$create( { $id: "the-slug/" } );

				expect( doc.$slug ).toBe( "the-slug" );
			} );

			xit( "should create object with @id and slug", async function() {
				doc = await root.$create( { $id: "the-slug/" }, "ignored-slug" );

				expect( doc.$slug ).toBe( "the-slug" );
			} );


			it( "should create access point", async function() {
				doc = await root.$create( CarbonLDP.AccessPoint.create( {
					$id: "the-slug/",
					hasMemberRelation: "member",
					isMemberOfRelation: "isMemberOf",
				} ) );

				expect( doc.$slug ).toBe( "the-slug" );

				await root.$refresh();
				expect( root.accessPoints ).toContain( doc );
			} );

			it( "should create access point with options", async function() {
				doc = await root.$create( CarbonLDP.AccessPoint.create( {
					$id: "the-slug/",
					hasMemberRelation: "member",
					isMemberOfRelation: "isMemberOf",
				} ), {} );

				expect( doc.$slug ).toBe( "the-slug" );

				await root.$refresh();
				expect( root.accessPoints ).toContain( doc );
			} );

			it( "should create access point with slug", async function() {
				doc = await root.$create( CarbonLDP.AccessPoint.create( {
					hasMemberRelation: "member",
					isMemberOfRelation: "isMemberOf",
				} ), "the-slug" );

				expect( doc.$slug ).toBe( "the-slug" );

				await root.$refresh();
				expect( root.accessPoints ).toContain( doc );
			} );

			it( "should create access point with slug and options", async function() {
				doc = await root.$create( CarbonLDP.AccessPoint.create( {
					hasMemberRelation: "member",
					isMemberOfRelation: "isMemberOf",
				} ), "the-slug", {} );

				expect( doc.$slug ).toBe( "the-slug" );

				await root.$refresh();
				expect( root.accessPoints ).toContain( doc );
			} );


			it( "should create object with nested objects", async function() {
				doc = await root.$create( {
					nested1: { index: 1 },
					nested2: [ { index: 2 }, { index: 3 } ],
				} );

				expect( doc ).toEqual( {
					nested1: { index: 1 },
					nested2: [ { index: 2 }, { index: 3 } ],
				} );
			} );

			it( "should create and retrieve object with nested", async function() {
				const nested = { the: "nested one" };
				doc = await root.$createAndRetrieve( { nested: nested } );

				console.log( doc );
				expect( doc ).toEqual( {
					created: jasmine.any( Date ),
					modified: jasmine.any( Date ),
					hasMemberRelation: jasmine.objectContaining( {
						$id: carbon.getObjectSchema().resolveURI( "ldp:member" ),
					} ),
					insertedContentRelation: jasmine.objectContaining( {
						$id: carbon.getObjectSchema().resolveURI( "ldp:MemberSubject" ),
					} ),
					membershipResource: doc,

					nested: nested,
				} );
			} );

			it( "should updated nested when refreshed", async function() {
				const nested = { the: "nested one" };
				doc = await root.$create( { nested: nested } );

				// Use another instance to update
				const carbon2 = new CarbonLDP( "http://localhost:8083" );
				const copy = await carbon2.documents.$get( doc.$id );
				copy.nested.the = "updated nested one";
				await copy.$save();

				await doc.$refresh();
				expect( nested ).toEqual( { the: "updated nested one" } );
			} );

		} );


		describe( "AccessPoint >", function() {

			let accessPoint;
			let targetDoc;
			beforeAll( async function() {
				targetDoc = await root.$create( {} );
			} );

			afterAll( async function() {
				if( ! targetDoc ) return;
				await targetDoc.$delete();
			} );

			it( `can create an access point`, async function() {
				accessPoint = await targetDoc.$create( CarbonLDP.AccessPoint.create( {
					hasMemberRelation: "myRelation",
					isMemberOfRelation: "myInverseRelation",
				} ) );

				expect( null ).nothing();
			} );


			it( `should add a member from access point`, async function() {
				const member = await root.$create( {
					types: [ "ex:Child" ],
					the: "member",
				} );

				await accessPoint.$addMember( member );

				await targetDoc.$get();
				await member.$resolve();

				expect( targetDoc.myRelation ).toBe( member );
				expect( member.myInverseRelation ).toBe( targetDoc );
			} );

			it( `should add members from access point`, async function() {
				const members = [ ...Array( 5 ) ].map( ( _, i ) => ({
					types: [ "ex:Child" ],
					the: "member " + (i + 1),
					index: i + 1,
				}) );
				await root.$create( members );

				await accessPoint.$addMembers( members );

				await targetDoc.$get( { ensureLatest: true } );

				await Promise.all( members
					.map( async member => await member.$resolve() )
				);

				expect( targetDoc.myRelation ).toEqual( jasmine.arrayContaining( members ) );
				expect( members[ 0 ].myInverseRelation ).toBe( targetDoc );
				expect( members[ 1 ].myInverseRelation ).toBe( targetDoc );
			} );

			it( `should remove member from access point`, async function() {
				const members = await accessPoint.$getMembers();

				await accessPoint.$removeMember( members[ 0 ] );

				await targetDoc.$refresh();
				expect( targetDoc.myRelation.length ).toEqual( members.length - 1 );
				expect( targetDoc.myRelation ).not.toContain( members[ 0 ] );

				await members[ 0 ].$refresh();
				expect( members[ 0 ].myInverseRelation ).not.toBeDefined();
			} );

			it( `should remove members from access point`, async function() {
				const members = await accessPoint.$getMembers();

				await accessPoint.$removeMembers( [ members[ 0 ], members[ 1 ] ] );

				await targetDoc.$refresh();
				expect( targetDoc.myRelation.length ).toEqual( members.length - 2 );
				expect( targetDoc.myRelation.length ).not.toContain( members[ 0 ] );
				expect( targetDoc.myRelation.length ).not.toContain( members[ 1 ] );

				await Promise.all( members
					.map( async member => await member.$refresh() )
				);

				expect( members[ 0 ].myInverseRelation ).not.toBeDefined();
				expect( members[ 1 ].myInverseRelation ).not.toBeDefined();
			} );

			it( `should remove all rest members from access point`, async function() {
				const members = await accessPoint.$getMembers();
				expect( members.length ).toBeGreaterThan( 0, "The child document has no members left" );

				await accessPoint.$removeMembers();

				await targetDoc.$refresh();
				expect( targetDoc.myRelation ).not.toBeDefined();

				for( let member of members ) {
					await member.$refresh();
					expect( member.myInverseRelation ).not.toBeDefined();
				}
			} );

		} );


		describe( "Gets >", function() {

			it( "get full after partial", async function() {
				const child = await root.$create( {
					property1: "property 1",
					property2: "property 2",
					property3: "property 3",
				} );

				// Remove and get empty
				carbon.registry.removePointer( child.$id );
				const doc = carbon.registry.register( child.$id );


				await doc.$get( _ => _.properties( {
					property1: _.inherit,
					property2: _.inherit,
				} ) );
				expect( doc.property1 ).toBe( "property 1" );
				expect( doc.property2 ).toBe( "property 2" );
				expect( doc.property3 ).toBeUndefined();
				expect( doc.$isQueried() ).toBe( true );


				await doc.$get();
				expect( doc.property1 ).toBe( "property 1" );
				expect( doc.property2 ).toBe( "property 2" );
				expect( doc.property3 ).toBe( "property 3" );
				expect( doc.$isQueried() ).toBe( false );
			} );

		} );

	} );

})();