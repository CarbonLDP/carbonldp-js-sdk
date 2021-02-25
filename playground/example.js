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

	const carbonldpSettings = {
		host: "local.example.com",
		ssl: false,
		port: 8083,
		// exposedHost: "dev.example.com",
		// exposedSsl: false,
	};

	const carbonldp = new CarbonLDP( carbonldpSettings );
	carbonldp.extendObjectSchema( prefixes );

	describe( "Tests >", function() {

		let root;
		beforeAll( function() {
			return carbonldp.documents
				.$create( {} )
				.then( function( doc ) {
					root = doc;
				} )
				;
		} );


		afterEach( function() {
			return root
				.$listChildren()
				.then( function( children ) {
					const promises = children
						.map( function( child ) {
							return child.$delete();
						} );

					return Promise.all( promises );
				} );
		} );

		afterAll( function() {
			if( !root ) return;

			return root
				.$delete();
		} );


		describe( "Querying >", function() {

			function extendObjectSchemas( carbonldp ) {
				carbonldp.extendObjectSchema( prefixes );
				carbonldp.extendObjectSchema( "ex:Child", {
					"index": {
						"@id": "ex:index",
						"@type": "xsd:integer",
					}
				} );
				carbonldp.extendObjectSchema( "ex:NestedChild", {
					"index": {
						"@id": "ex:index",
						"@type": "xsd:integer",
					}
				} );
			}


			let childrenToCreate = 6;
			let parent;
			let children;
			let carbonldp;
			beforeEach( function() {
				const carbonldp1 = new CarbonLDP( carbonldpSettings );
				const carbonldp2 = new CarbonLDP( carbonldpSettings );

				extendObjectSchemas( carbonldp1 );
				extendObjectSchemas( carbonldp2 );

				carbonldp = carbonldp2;

				return carbonldp1.documents
					.$create( root.$id, { types: [ "ex:Parent" ] } )
					.then( function( doc ) {
						parent = doc;

						children = new Array( childrenToCreate )
							.fill( undefined )
							.map( function( _, i ) {
								const type = i % 2 === 0
									? "ex:Even"
									: "ex:Odd";

								return {
									types: [ "ex:Child", type ],
									index: i + 1,
								};
							} )
						;

						return parent
							.$create( children );
					} )
					;
			} );

			afterEach( function() {
				if( !parent ) return;

				return parent
					.$delete();
			} );


			it( "should retrieve all the children", function() {
				return carbonldp.documents
					.$getChildren( parent.$id )
					.then( function( retrievedChildren ) {
						expect( retrievedChildren.length ).toEqual( childrenToCreate );

						for( let i = 0; i < childrenToCreate; i ++ ) {
							const type = i % 2 === 0 ? "http://example.org/ns#Even" : "http://example.org/ns#Odd";

							expect( retrievedChildren ).toContain( jasmine.objectContaining( {
								types: jasmine.arrayContaining( [ "http://example.org/ns#Child", type ] ),
								index: i + 1,
							} ) );
						}
					} )
					;
			} );

			it( "should list the children", function() {
				return carbonldp.documents
					.$listChildren( parent.$id )
					.then( function( shallowChildren ) {
						expect( shallowChildren.length ).toEqual( childrenToCreate );

						for( let i = 0; i < childrenToCreate; ++ i ) {
							const child = shallowChildren[ 0 ];
							expect( child ).toEqual( {} );
						}
					} )
					;

			} );

			it( "should remove one member", function() {
				return carbonldp.documents
					.$removeMember( parent.$id, children[ 0 ] )
					.then( function() {
						expect( null ).nothing();
					} )
					;
			} );

			it( "should retrieve all the members", function() {
				return carbonldp.documents
					.$getMembers( parent.$id )
					.then( function( members ) {
						expect( members.length ).toEqual( childrenToCreate );

						for( let i = 0; i < childrenToCreate; ++ i ) {
							const type = i % 2 === 0 ? "http://example.org/ns#Even" : "http://example.org/ns#Odd";

							expect( members ).toContain( jasmine.objectContaining( {
								types: jasmine.arrayContaining( [ "http://example.org/ns#Child", type ] ),
								index: i + 1,
							} ) );
						}
					} )
					;
			} );

			it( "should retrieve shallow children of a specific type", function() {
				return carbonldp.documents
					.$getChildren( parent.$id, function( _ ) {
						return _
							.withType( "ex:Even" );
					} )
					.then( function( filteredChildren ) {
						expect( filteredChildren.length ).toEqual( childrenToCreate / 2 );

						for( let i = 0; i < childrenToCreate / 2; ++ i ) {
							const child = filteredChildren[ 0 ];
							expect( child ).not.toEqual( {
								created: jasmine.any( Date ),
								modified: jasmine.any( Date ),
							} );
						}
					} )
					;

			} );

			it( "should retrieve children with a property that has a specific value", function() {
				return carbonldp.documents
					.$getChildren( parent.$id, function( _ ) {
						return _
							.withType( "ex:Child" )
							.properties( {
								"index": {
									"query": function( _ ) {
										return _
											.values( _.value( 3 ) );
									}
								}
							} );
					} )
					.then( function( filteredChildren ) {
						expect( filteredChildren.length ).toEqual( 1 );

						expect( filteredChildren[ 0 ].index ).toEqual( 3 );
					} )
					;

			} );

			it( "should create nested documents", function() {
				const nestedChildren = new Array( childrenToCreate )
					.fill( undefined )
					.map( function( _, i ) {
						let type = i % 2 === 0 ? "ex:Even" : "ex:Odd";

						return {
							types: [ "ex:NestedChild", type ],
							index: i + 1,
						};
					} )
				;

				return children[ 0 ]
					.$create( nestedChildren )
					.then( function() {
						expect( null ).nothing();
					} )
					;
			} );

			it( "should retrieve nested documents", function() {
				const child = children[ childrenToCreate / 2 ];

				const nestedChildren = new Array( childrenToCreate )
					.fill( undefined )
					.map( function( _, i ) {
						let type = i % 2 === 0 ? "ex:Even" : "ex:Odd";

						return {
							types: [ "ex:NestedChild", type ],
							index: i + 1,
						};
					} )
				;

				return child
					.$create( nestedChildren )
					.then( function() {
						return carbonldp.documents.$getChildren( parent.$id, function( _ ) {
							return _
								.withType( "ex:Child" )
								.properties( {
									"index": {
										"query": function( _ ) {
											return _
												.values( _.value( child.index ) );
										}
									},
									"contains": {
										"query": function( _ ) {
											return _
												.withType( "ex:NestedChild" )
												.properties( {
													"index": _.inherit
												} );
										}
									}
								} );
						} );
					} )
					.then( function( childrenWithNestedDocuments ) {
						expect( childrenWithNestedDocuments.length ).toEqual( 1 );

						const childWithNestedDocuments = childrenWithNestedDocuments[ 0 ];
						expect( childWithNestedDocuments.contains.length ).toEqual( childrenToCreate );
					} )
					;
			} );

			it( "should retrieve nested even documents with ALL", function() {
				const child = children[ childrenToCreate / 2 ];

				const nestedChildren = new Array( childrenToCreate )
					.fill( undefined )
					.map( function( _, i ) {
						let type = i % 2 === 0 ? "ex:Even" : "ex:Odd";

						return {
							types: [ "ex:NestedChild", type ],
							index: i + 1,
						};
					} )
				;
				return child
					.$create( nestedChildren )
					.then( function() {
						return carbonldp.documents.$getChildren( parent.$id, function( _ ) {
							return _
								.withType( "ex:Child" )
								.properties( {
									"index": {
										"query": function( _ ) {
											return _
												.values( _.value( child.index ) );
										}
									},
									"contains": {
										"query": function( _ ) {
											return _
												.withType( "ex:Even" )
												.properties( _.all );
										}
									}
								} );
						} );
					} )
					.then( function( childrenWithNestedDocuments ) {
						expect( childrenWithNestedDocuments.length ).toEqual( 1 );

						const childWithNestedDocuments = childrenWithNestedDocuments[ 0 ];
						expect( childWithNestedDocuments.contains.length ).toEqual( childrenToCreate / 2 );
					} )
					;
			} );

			it( "should retrieve nested even documents with FULL", function() {
				const child = children[ childrenToCreate / 2 ];

				const nestedChildren = new Array( childrenToCreate )
					.fill( undefined )
					.map( function( _, i ) {
						let type = i % 2 === 0 ? "ex:Even" : "ex:Odd";

						return {
							types: [ "ex:NestedChild", type ],
							index: i + 1,
						};
					} )
				;
				return child
					.$create( nestedChildren )
					.then( function() {
						return carbonldp.documents.$getChildren( parent.$id, function( _ ) {
							return _
								.withType( "ex:Child" )
								.properties( {
									"index": {
										"query": function( _ ) {
											return _
												.values( _.value( child.index ) );
										}
									},
									"contains": {
										"query": function( _ ) {
											return _
												.withType( "ex:Even" )
												.properties( _.constructor.FULL );
										}
									}
								} );
						} );
					} )
					.then( function( childrenWithNestedDocuments ) {
						expect( childrenWithNestedDocuments.length ).toEqual( 1 );

						const childWithNestedDocuments = childrenWithNestedDocuments[ 0 ];
						expect( childWithNestedDocuments.contains.length ).toEqual( childrenToCreate / 2 );
					} )
					;
			} );

			it( "should modify partial documents", function() {
				return carbonldp.documents
					.$getChildren( parent.$id, function( _ ) {
						return _
							.withType( "ex:Child" )
							.properties( {
								"index": {
									"query": function( _ ) {
										return _
											.values( _.value( 4 ) );
									}
								}
							} );
					} )
					.then( function( children ) {
						const child = children[ 0 ];

						child.index = 100;
						child.somethingElse = "Hello world!";

						return child
							.$save();
					} )
					.then( function( child ) {
						return carbonldp.documents
							.$get( child.$id )
					} )
					.then( function( child ) {
						expect( child.index ).toEqual( 100 );
						expect( child.somethingElse ).toEqual( "Hello world!" );
						expect( child.modified ).toEqual( jasmine.any( Date ) );
					} )
					;
			} );

			it( "should return filtered children with ALL", function() {
				return carbonldp.documents
					.$getChildren( parent.$id, function( _ ) {
						return _
							.properties( _.all )
							.filter( _.property( "index" ) + " = 2" );
					} )
					.then( function( children ) {
						expect( children ).toEqual( [
							{
								index: 2,
								created: jasmine.any( Date ),
								modified: jasmine.any( Date ),

								membershipResource: jasmine.anything(),
								hasMemberRelation: jasmine.anything(),
								insertedContentRelation: jasmine.anything(),
							},
						] );
					} );
			} );

			it( "should return even children with ALL", function() {
				return carbonldp.documents
					.$getChildren( parent.$id, function( _ ) {
						return _
							.withType( "ex:Even" )
							.properties( _.all );
					} )
					.then( function( children ) {
						expect( children.length ).toEqual( childrenToCreate / 2 );
					} )
					;
			} );

		} );


		describe( "Creations >", function() {

			it( "should create object", function() {
				return root
					.$create( {} )
					.then( function( doc ) {
						expect( doc.$slug ).toMatch( /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i );
					} )
					;
			} );

			it( "should create object with options", function() {
				return root
					.$create( { the: "document" }, {} )
					.then( function( doc ) {
						expect( doc.$slug ).toMatch( /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i );
					} )
					;
			} );

			it( "should create object with slug", function() {
				return root
					.$create( {}, "the-slug" )
					.then( function( doc ) {
						expect( doc.$slug ).toBe( "the-slug" );
					} )
					;
			} );

			it( "should create object with slug and options", function() {
				return root
					.$create( {}, "the-slug", {} )
					.then( function( doc ) {
						expect( doc.$slug ).toBe( "the-slug" );
					} )
					;
			} );


			it( "should create and retrieve object", function() {
				return root
					.$createAndRetrieve( {} )
					.then( function( doc ) {
						expect( doc ).toEqual( {
							created: jasmine.any( Date ),
							modified: jasmine.any( Date ),
							hasMemberRelation: jasmine.objectContaining( {
								$id: carbonldp.getObjectSchema().resolveURI( "ldp:member" ),
							} ),
							insertedContentRelation: jasmine.objectContaining( {
								$id: carbonldp.getObjectSchema().resolveURI( "ldp:MemberSubject" ),
							} ),
							membershipResource: jasmine.objectContaining( { $id: doc.$id } ),
						} );
					} )
					;
			} );

			it( "should create and retrieve object with slug", function() {
				return root
					.$createAndRetrieve( {}, "the-slug" )
					.then( function( doc ) {
						expect( doc ).toEqual( {
							created: jasmine.any( Date ),
							modified: jasmine.any( Date ),
							hasMemberRelation: jasmine.objectContaining( {
								$id: carbonldp.getObjectSchema().resolveURI( "ldp:member" ),
							} ),
							insertedContentRelation: jasmine.objectContaining( {
								$id: carbonldp.getObjectSchema().resolveURI( "ldp:MemberSubject" ),
							} ),
							membershipResource: jasmine.objectContaining( { $id: doc.$id } ),
						} );

						expect( doc.$slug ).toBe( "the-slug" );
					} )
					;
			} );


			xit( "should create object with @id", function() {
				return root
					.$create( { $id: "the-slug/" } )
					.then( function( doc ) {
						expect( doc.$slug ).toBe( "the-slug" );
					} )
					;
			} );

			xit( "should create object with @id and slug", function() {
				return root
					.$create( { $id: "the-slug/" }, "ignored-slug" )
					.then( function( doc ) {
						expect( doc.$slug ).toBe( "the-slug" );
					} )
					;
			} );


			it( "should create access point", function() {
				const doc = CarbonLDP.AccessPoint.create( {
					$id: "the-slug/",
					hasMemberRelation: "member",
					isMemberOfRelation: "isMemberOf",
				} );

				return root
					.$create( doc )
					.then( function( doc ) {
						expect( doc.$slug ).toBe( "the-slug" );

						return root
							.$refresh();
					} )
					.then( function() {
						expect( root.accessPoints ).toContain( doc );
					} )
					;
			} );

			it( "should create access point with options", function() {
				const doc = CarbonLDP.AccessPoint.create( {
					$id: "the-slug/",
					hasMemberRelation: "member",
					isMemberOfRelation: "isMemberOf",
				} );

				return root
					.$create( doc, {} )
					.then( function( doc ) {
						expect( doc.$slug ).toBe( "the-slug" );

						return root
							.$refresh()
					} )
					.then( function() {
						expect( root.accessPoints ).toContain( doc );
					} )
					;
			} );

			it( "should create access point with slug", function() {
				const doc = CarbonLDP.AccessPoint.create( {
					hasMemberRelation: "member",
					isMemberOfRelation: "isMemberOf",
				} );

				return root
					.$create( doc, "the-slug" )
					.then( function( doc ) {
						expect( doc.$slug ).toBe( "the-slug" );
					} );
			} );

			it( "should create access point with slug and options", function() {
				const doc = CarbonLDP.AccessPoint.create( {
					hasMemberRelation: "member",
					isMemberOfRelation: "isMemberOf",
				} );

				return root
					.$create( doc, "the-slug", {} )
					.then( function( doc ) {
						expect( doc.$slug ).toBe( "the-slug" );
					} );
			} );


			it( "should create object with nested objects", function() {
				return root
					.$create( {
						nested1: { index: 1 },
						nested2: [ { index: 2 }, { index: 3 } ],
					} )
					.then( function( doc ) {
						expect( doc ).toEqual( {
							nested1: { index: 1 },
							nested2: [ { index: 2 }, { index: 3 } ],
						} );
					} );
			} );

			it( "should create and retrieve object with nested", function() {
				const nested = { the: "nested one" };

				return root
					.$createAndRetrieve( { nested: nested } )
					.then( function( doc ) {
						expect( doc ).toEqual( {
							created: jasmine.any( Date ),
							modified: jasmine.any( Date ),
							hasMemberRelation: jasmine.objectContaining( {
								$id: carbonldp.getObjectSchema().resolveURI( "ldp:member" ),
							} ),
							insertedContentRelation: jasmine.objectContaining( {
								$id: carbonldp.getObjectSchema().resolveURI( "ldp:MemberSubject" ),
							} ),
							membershipResource: jasmine.objectContaining( { $id: doc.$id } ),

							nested: jasmine.objectContaining( { $id: nested.$id } ),
						} );
					} );
			} );

			it( "should updated nested when refreshed", function() {
				const nested = { the: "nested one" };

				return root
					.$create( { nested: nested } )
					.then( function( doc ) {
						// Use another instance to update
						const carbonldp2 = new CarbonLDP( carbonldpSettings );
						return carbonldp2.documents
							.$get( doc.$id )
							.then( function( sameDoc ) {
								sameDoc.nested.the = "updated nested one";
								return sameDoc.$save();
							} )
							.then( function() {
								// Refresh original update
								return doc.$refresh();
							} )
							.then( function() {
								expect( nested ).toEqual( { the: "updated nested one" } );
							} );
					} );
			} );

		} );


		describe( "AccessPoint >", function() {

			let accessPoint;
			let targetDoc;
			let existingMembers;
			const membersToCreate = 5;
			beforeEach( function() {
				return root
					.$createAndRetrieve( {} )
					.then( function( doc ) {
						targetDoc = doc;

						existingMembers = new Array( membersToCreate )
							.fill( undefined )
							.map( function( _, i ) {
								return {
									types: [ "ex:Child" ],
									the: "member " + (- i - 1),
									index: - i - 1,
									myInverseRelation: targetDoc,
								};
							} );

						return root
							.$create( existingMembers );
					} )
					.then( function() {
						targetDoc.myRelation = existingMembers.slice();

						return targetDoc
							.$saveAndRefresh();
					} )
					.then( function() {
						accessPoint = CarbonLDP.AccessPoint.create( {
							hasMemberRelation: "myRelation",
							isMemberOfRelation: "myInverseRelation",
						} );

						return targetDoc
							.$createAndRetrieve( accessPoint );
					} )
					;
			} );


			it( "should create an access point", function() {
				expect( null ).nothing();
			} );


			it( "should add a member from access point", function() {
				const member = {
					types: [ "ex:Child" ],
					the: "member",
				};

				return root
					.$create( member )
					.then( function() {
						return accessPoint
							.$addMember( member );
					} )
					.then( function() {
						return targetDoc
							.$refresh();
					} )
					.then( function() {
						expect( targetDoc.myRelation ).toEqual( jasmine.arrayContaining( [ member ] ) );

						return member
							.$resolve();
					} )
					.then( function() {
						expect( member.myInverseRelation ).toBe( targetDoc );
					} )
					;
			} );

			it( "should add members from access point", function() {
				const members = Array( membersToCreate )
					.fill( undefined )
					.map( function( _, i ) {
						return {
							types: [ "ex:Child" ],
							the: "member " + (i + 1),
							index: i + 1,
						};
					} );

				return root
					.$create( members )
					.then( function() {
						return accessPoint
							.$addMembers( members )
					} )
					.then( function() {
						return targetDoc
							.$get( { ensureLatest: true } );
					} )
					.then( function() {
						const promises = members
							.map( function( member ) {
								return member.$resolve();
							} );

						return Promise
							.all( promises )
					} )
					.then( function() {
						expect( targetDoc.myRelation ).toEqual( jasmine.arrayContaining( members ) );
						expect( members[ 0 ].myInverseRelation ).toBe( targetDoc );
						expect( members[ 1 ].myInverseRelation ).toBe( targetDoc );
					} )
					;
			} );

			it( "should remove member from access point", function() {
				return accessPoint
					.$removeMember( existingMembers[ 0 ] )
					.then( function() {
						return targetDoc
							.$refresh();
					} )
					.then( function() {
						expect( targetDoc.myRelation.length ).toEqual( existingMembers.length - 1 );
						expect( targetDoc.myRelation ).not.toContain( existingMembers[ 0 ] );

						return existingMembers[ 0 ]
							.$refresh();
					} )
					.then( function() {
						expect( existingMembers[ 0 ].myInverseRelation ).not.toBeDefined();
					} )
					;
			} );

			it( "should remove members from access point", function() {
				return accessPoint
					.$removeMembers( [ existingMembers[ 0 ], existingMembers[ 1 ] ] )
					.then( function() {
						return targetDoc
							.$refresh();
					} )
					.then( function() {
						expect( targetDoc.myRelation.length ).toEqual( existingMembers.length - 2 );
						expect( targetDoc.myRelation.length ).not.toContain( existingMembers[ 0 ] );
						expect( targetDoc.myRelation.length ).not.toContain( existingMembers[ 1 ] );
					} )
					.then( function() {
						const promises = existingMembers
							.map( function( member ) {
								return member.$refresh();
							} );

						return Promise.all( promises );
					} )
					.then( function() {
						expect( existingMembers[ 0 ].myInverseRelation ).not.toBeDefined();
						expect( existingMembers[ 1 ].myInverseRelation ).not.toBeDefined();
					} )
					;
			} );

			it( "should remove all rest members from access point", function() {
				return accessPoint
					.$removeMembers()
					.then( function() {
						return targetDoc
							.$refresh();
					} )
					.then( function() {
						expect( targetDoc.myRelation ).not.toBeDefined();

						const promises = existingMembers
							.map( function( member ) {
								return member.$refresh();
							} );

						return Promise.all( promises );
					} )
					.then( function() {
						existingMembers.forEach( function( member ) {
							expect( member.myInverseRelation ).not.toBeDefined();
						} );
					} )
					;
			} );

		} );


		describe( "Gets >", function() {

			it( "should get full after partial", function() {
				return root
					.$create( {
						property1: "property 1",
						property2: "property 2",
						property3: "property 3",
					} )
					.then( function( doc ) {
						// Remove reference
						carbonldp.registry.removePointer( doc.$id );

						return carbonldp.documents
							.$get( doc.$id, function( _ ) {
								return _.properties( {
									property1: _.inherit,
									property2: _.inherit,
								} );
							} );
					} )
					.then( function( doc ) {
						expect( doc.property1 ).toBe( "property 1" );
						expect( doc.property2 ).toBe( "property 2" );
						expect( doc.property3 ).toBeUndefined();
						expect( doc.$isQueried() ).toBe( true );

						return doc
							.$get();
					} )
					.then( function( doc ) {
						expect( doc.property1 ).toBe( "property 1" );
						expect( doc.property2 ).toBe( "property 2" );
						expect( doc.property3 ).toBe( "property 3" );
						expect( doc.$isQueried() ).toBe( false );
					} )
					;
			} );

			it( "should get multiple partial", function() {
				const docsIDs = [];

				return root
					.$create( {
						property1: "property 1",
						property2: "property 2",
						property3: "property 3",
					} )
					.then( function( doc ) {
						carbonldp.registry.removePointer( doc );
						docsIDs.push( doc.$id );

						return doc.$create( {
							property1: "property 1",
							property2: "property 2",
							property3: "property 3",
						} );
					} )
					.then( function( doc ) {
						carbonldp.registry.removePointer( doc );
						docsIDs.push( doc.$id );

						return carbonldp.documents
							.$get( docsIDs, function( _ ) {
								return _.properties( {
									property1: _.inherit,
									property2: _.inherit,
								} );
							} );
					} )
					.then( function( docs ) {
						expect( docs[ 0 ].property1 ).toBe( "property 1" );
						expect( docs[ 0 ].property2 ).toBe( "property 2" );
						expect( docs[ 0 ].property3 ).toBeUndefined();
						expect( docs[ 0 ].$isQueried() ).toBe( true );

						expect( docs[ 1 ].property1 ).toBe( "property 1" );
						expect( docs[ 1 ].property2 ).toBe( "property 2" );
						expect( docs[ 1 ].property3 ).toBeUndefined();
						expect( docs[ 1 ].$isQueried() ).toBe( true );
					} )
					;
			} );

			it( "should get multiple full", function() {
				const docsID = [];

				return root
					.$create( {
						property1: "property 1",
						property2: "property 2",
						property3: "property 3",
					} )
					.then( function( doc ) {
						carbonldp.registry.removePointer( doc );
						docsID.push( doc.$id );

						return doc.$create( {
							property1: "property 1",
							property2: "property 2",
							property3: "property 3",
						} );
					} )
					.then( function( doc ) {
						carbonldp.registry.removePointer( doc );
						docsID.push( doc.$id );

						return carbonldp.documents
							.$get( docsID );
					} )
					.then( function( docs ) {
						expect( docs[ 0 ].property1 ).toBe( "property 1" );
						expect( docs[ 0 ].property2 ).toBe( "property 2" );
						expect( docs[ 0 ].property3 ).toBe( "property 3" );
						expect( docs[ 0 ].$isQueried() ).toBe( false );

						expect( docs[ 1 ].property1 ).toBe( "property 1" );
						expect( docs[ 1 ].property2 ).toBe( "property 2" );
						expect( docs[ 1 ].property3 ).toBe( "property 3" );
						expect( docs[ 1 ].$isQueried() ).toBe( false );
					} )
					;
			} );

			it( "should get ALL and sub-properties", function() {
				return root
					.$create( {
						property1: "property 1",
						property2: "property 2",
						property3: "property 3",
					} )
					.then( function( doc ) {
						carbonldp.registry.removePointer( doc );

						return doc.$create( {
							property1: "property 1",
							property2: "property 2",
							property3: doc,
						} );
					} )
					.then( function( doc ) {
						carbonldp.registry.removePointer( doc );

						return carbonldp.documents
							.$get( doc.$id, function( _ ) {
								return _
									.properties( _.all )
									.properties( {
										property3: {
											query: function( _ ) {
												return _
													.properties( {
														property1: _.inherit,
														property2: _.inherit,
													} );
											}
										}
									} );
							} );
					} )
					.then( function( doc ) {
						expect( doc ).toEqual( {
							property1: "property 1",
							property2: "property 2",
							property3: {
								property1: "property 1",
								property2: "property 2",
							},

							hasMemberRelation: jasmine.any( Object ),
							insertedContentRelation: jasmine.any( Object ),
							membershipResource: jasmine.any( Object ),
							created: jasmine.any( Date ),
							modified: jasmine.any( Date ),
						} );

						expect( doc.$isQueried() ).toBe( true );
					} )
					;
			} );

		} );

	} );

})();