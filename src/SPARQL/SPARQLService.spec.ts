import { NotImplementedError } from "../Errors/NotImplementedError";

import { Header } from "../HTTP/Header";
import { Response } from "../HTTP/Response";

import { Pointer } from "../Pointer/Pointer";
import { PointerLibrary } from "../Pointer/PointerLibrary";

import { SPARQLService } from "./SPARQLService";


class MockPointerLibrary implements PointerLibrary {
	hasPointer( id:string ):boolean {
		return false;
	}

	getPointer( id:string ):Pointer {
		return { $id: id };
	}
}

describe( "SPARQLService", () => {

	beforeEach( () => {
		jasmine.Ajax.install();
	} );

	afterEach( () => {
		jasmine.Ajax.uninstall();
	} );

	it( "should exist", () => {
		expect( SPARQLService ).toBeDefined();
		expect( SPARQLService ).toEqual( jasmine.any( Function ) );
	} );


	describe( "SPARQLService.executeRawASKQuery", () => {

		it( "should exist", () => {
			expect( SPARQLService.executeRawASKQuery ).toBeDefined();
			expect( SPARQLService.executeRawASKQuery ).toEqual( jasmine.any( Function ) );
		} );


		it( "should send request to URI", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			await SPARQLService
				.executeRawASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.url ).toBe( "http://example.com/sparql-endpoint/" );
		} );

		it( "should send the query", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			await SPARQLService
				.executeRawASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.params ).toBe( "ASK { ?subject ?predicate ?object }" );
		} );

		it( "should send the basic headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			await SPARQLService
				.executeRawASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/sparql-results+json",
				"content-type": "application/sparql-query",
			} );
		} );

		it( "should send the custom headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			await SPARQLService
				.executeRawASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }",
					{
						headers: new Map( [
							[ "custom", new Header( "custom value" ) ],
						] ),
					}
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/sparql-results+json",
				"content-type": "application/sparql-query",
				"custom": "custom value",
			} );
		} );


		it( "should return the parsed data", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			const [ results ] = await SPARQLService
				.executeRawASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			expect( results ).toEqual( {
				"head": {},
				"boolean": true,
			} );
		} );

		it( "should return the response object", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			const [ , response ] = await SPARQLService
				.executeRawASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			expect( response ).toEqual( jasmine.any( Response ) );
		} );

	} );

	describe( "SPARQLService.executeASKQuery", () => {

		it( "should exist", () => {
			expect( SPARQLService.executeASKQuery ).toBeDefined();
			expect( SPARQLService.executeASKQuery ).toEqual( jasmine.any( Function ) );
		} );


		it( "should send request to URI", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			await SPARQLService
				.executeASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.url ).toBe( "http://example.com/sparql-endpoint/" );
		} );

		it( "should send the query", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			await SPARQLService
				.executeASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.params ).toBe( "ASK { ?subject ?predicate ?object }" );
		} );

		it( "should send the basic headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			await SPARQLService
				.executeASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/sparql-results+json",
				"content-type": "application/sparql-query",
			} );
		} );

		it( "should send the custom headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			await SPARQLService
				.executeASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }",
					{
						headers: new Map( [
							[ "custom", new Header( "custom value" ) ],
						] ),
					}
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/sparql-results+json",
				"content-type": "application/sparql-query",
				"custom": "custom value",
			} );
		} );


		it( "should return the parsed data", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			const [ results ] = await SPARQLService
				.executeASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			expect( results ).toEqual( true );
		} );

		it( "should return the response object", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head" : {},
						"boolean" : true
					}`,
				} );


			const [ , response ] = await SPARQLService
				.executeASKQuery(
					"http://example.com/sparql-endpoint/",
					"ASK { ?subject ?predicate ?object }"
				);

			expect( response ).toEqual( jasmine.any( Response ) );
		} );

	} );


	describe( "SPARQLService.executeRawSELECTQuery", () => {

		it( "should exist", () => {
			expect( SPARQLService.executeRawSELECTQuery ).toBeDefined();
			expect( SPARQLService.executeRawSELECTQuery ).toEqual( jasmine.any( Function ) );
		} );


		it( "should send request to URI", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeRawSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.url ).toBe( "http://example.com/sparql-endpoint/" );
		} );

		it( "should send the query", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeRawSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.params ).toBe( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
		} );

		it( "should send the basic headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeRawSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/sparql-results+json",
				"content-type": "application/sparql-query",
			} );
		} );

		it( "should send the custom headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeRawSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }",
					{
						headers: new Map( [
							[ "custom", new Header( "custom value" ) ],
						] ),
					}
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/sparql-results+json",
				"content-type": "application/sparql-query",
				"custom": "custom value",
			} );
		} );


		it( "should return the parsed data", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			const [ results ] = await SPARQLService
				.executeRawSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }"
				);

			expect( results ).toEqual( {
				"head": {
					"vars": [
						"book",
						"title",
					],
				},
				"results": {
					"bindings": [
						{
							"book": {
								"type": "uri",
								"value": "http://example.org/book/book6",
							},
							"title": {
								"type": "literal",
								"value": "Harry Potter and the Half-Blood Prince",
							},
						},
						{
							"book": {
								"type": "uri",
								"value": "http://example.org/book/book7",
							},
							"title": {
								"type": "literal",
								"value": "Harry Potter and the Deathly Hallows",
							},
						},
						{
							"book": {
								"type": "uri",
								"value": "http://example.org/book/book5",
							},
							"title": {
								"type": "literal",
								"value": "Harry Potter and the Order of the Phoenix",
							},
						},
						{
							"book": {
								"type": "uri",
								"value": "http://example.org/book/book4",
							},
							"title": {
								"type": "literal",
								"value": "Harry Potter and the Goblet of Fire",
							},
						},
						{
							"book": {
								"type": "uri",
								"value": "http://example.org/book/book2",
							},
							"title": {
								"type": "literal",
								"value": "Harry Potter and the Chamber of Secrets",
							},
						},
						{
							"book": {
								"type": "uri",
								"value": "http://example.org/book/book3",
							},
							"title": {
								"type": "literal",
								"value": "Harry Potter and the Prisoner Of Azkaban",
							},
						},
						{
							"book": {
								"type": "uri",
								"value": "http://example.org/book/book1",
							},
							"title": {
								"type": "literal",
								"value": "Harry Potter and the Philosopher's Stone",
							},
						},
					],
				},
			} );
		} );

		it( "should return the response object", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			const [ , response ] = await SPARQLService
				.executeRawSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }"
				);

			expect( response ).toEqual( jasmine.any( Response ) );
		} );

	} );

	describe( "SPARQLService.executeSELECTQuery", () => {

		it( "should exist", () => {
			expect( SPARQLService.executeSELECTQuery ).toBeDefined();
			expect( SPARQLService.executeSELECTQuery ).toEqual( jasmine.any( Function ) );
		} );


		it( "should send request to URI", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }",
					new MockPointerLibrary()
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.url ).toBe( "http://example.com/sparql-endpoint/" );
		} );

		it( "should send the query", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }",
					new MockPointerLibrary()
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.params ).toBe( "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }" );
		} );

		it( "should send the basic headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }",
					new MockPointerLibrary()
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/sparql-results+json",
				"content-type": "application/sparql-query",
			} );
		} );

		it( "should send the custom headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }",
					new MockPointerLibrary(),
					{
						headers: new Map( [
							[ "custom", new Header( "custom value" ) ],
						] ),
					}
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/sparql-results+json",
				"content-type": "application/sparql-query",
				"custom": "custom value",
			} );
		} );


		it( "should return the parsed data", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			const [ results ] = await SPARQLService
				.executeSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }",
					new MockPointerLibrary()
				);

			expect( results ).toEqual( {
				"vars": [
					"book",
					"title",
				],
				"bindings": [
					{
						"book": { $id: "http://example.org/book/book6" },
						"title": "Harry Potter and the Half-Blood Prince",
					},
					{
						"book": { $id: "http://example.org/book/book7" },
						"title": "Harry Potter and the Deathly Hallows",
					},
					{
						"book": { $id: "http://example.org/book/book5" },
						"title": "Harry Potter and the Order of the Phoenix",
					},
					{
						"book": { $id: "http://example.org/book/book4" },
						"title": "Harry Potter and the Goblet of Fire",
					},
					{
						"book": { $id: "http://example.org/book/book2" },
						"title": "Harry Potter and the Chamber of Secrets",
					},
					{
						"book": { $id: "http://example.org/book/book3" },
						"title": "Harry Potter and the Prisoner Of Azkaban",
					},
					{
						"book": { $id: "http://example.org/book/book1" },
						"title": "Harry Potter and the Philosopher's Stone",
					},
				],
			} );
		} );

		it( "should throw error when bNode in bindings", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"bnodeBinding"
							]
						},
						"results": {
							"bindings": [
								{
									"bnodeBinding": {
										"type": "bnode",
										"value": "r1"
									}
								}
							]
						}
					}`,
				} );


			await SPARQLService
				.executeSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }",
					new MockPointerLibrary()
				)
				.then( () => fail( "Should not be resolved." ) )
				.catch( error => {
					expect( error ).toEqual( jasmine.any( NotImplementedError ) );
					expect( error.message ).toEqual( "BNodes cannot be queried directly" );
				} );
		} );

		it( "should return the response object", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"head": {
							"vars": [
								"book",
								"title"
							]
						},
						"results": {
							"bindings": [
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book6"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Half-Blood Prince"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book7"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Deathly Hallows"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book5"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Order of the Phoenix"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book4"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Goblet of Fire"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book2"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Chamber of Secrets"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book3"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Prisoner Of Azkaban"
									}
								},
								{
									"book": {
										"type": "uri",
										"value": "http://example.org/book/book1"
									},
									"title": {
										"type": "literal",
										"value": "Harry Potter and the Philosopher's Stone"
									}
								}
							]
						}
					}`,
				} );


			const [ , response ] = await SPARQLService
				.executeSELECTQuery(
					"http://example.com/sparql-endpoint/",
					"SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }",
					new MockPointerLibrary()
				);

			expect( response ).toEqual( jasmine.any( Response ) );
		} );

	} );


	describe( "SPARQLService.executeRawCONSTRUCTQuery", () => {

		it( "should exist", () => {
			expect( SPARQLService.executeRawCONSTRUCTQuery ).toBeDefined();
			expect( SPARQLService.executeRawCONSTRUCTQuery ).toEqual( jasmine.any( Function ) );
		} );


		it( "should send request to URI", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			await SPARQLService
				.executeRawCONSTRUCTQuery(
					"http://example.com/sparql-endpoint/",
					"CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.url ).toBe( "http://example.com/sparql-endpoint/" );
		} );

		it( "should send the query", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			await SPARQLService
				.executeRawCONSTRUCTQuery(
					"http://example.com/sparql-endpoint/",
					"CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.params ).toBe( "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }" );
		} );

		it( "should send the basic headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			await SPARQLService
				.executeRawCONSTRUCTQuery(
					"http://example.com/sparql-endpoint/",
					"CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/ld+json",
				"content-type": "application/sparql-query",
			} );
		} );

		it( "should send the custom headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			await SPARQLService
				.executeRawCONSTRUCTQuery(
					"http://example.com/sparql-endpoint/",
					"CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }",
					{
						headers: new Map( [
							[ "custom", new Header( "custom value" ) ],
						] ),
					}
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/ld+json",
				"content-type": "application/sparql-query",
				"custom": "custom value",
			} );
		} );


		it( "should return the parsed data", async () => {
			const data:string = `{
				"@context": "http://schema.org/",
				"@type": "Person",
				"name": "Jane Doe",
				"jobTitle": "Professor",
				"telephone": "(425) 123-4567",
				"url": "http://www.janedoe.com"
			}`;

			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: data,
				} );


			const [ results ] = await SPARQLService
				.executeRawCONSTRUCTQuery(
					"http://example.com/sparql-endpoint/",
					"CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }"
				);

			expect( results ).toEqual( data );
		} );

		it( "should return the response object", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			const [ , response ] = await SPARQLService
				.executeRawCONSTRUCTQuery(
					"http://example.com/sparql-endpoint/",
					"CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }"
				);

			expect( response ).toEqual( jasmine.any( Response ) );
		} );

	} );


	describe( "SPARQLService.executeRawDESCRIBEQuery", () => {

		it( "should exist", () => {
			expect( SPARQLService.executeRawDESCRIBEQuery ).toBeDefined();
			expect( SPARQLService.executeRawDESCRIBEQuery ).toEqual( jasmine.any( Function ) );
		} );


		it( "should send request to URI", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			await SPARQLService
				.executeRawDESCRIBEQuery(
					"http://example.com/sparql-endpoint/",
					"DESCRIBE ?subject WHERE { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.url ).toBe( "http://example.com/sparql-endpoint/" );
		} );

		it( "should send the query", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			await SPARQLService
				.executeRawDESCRIBEQuery(
					"http://example.com/sparql-endpoint/",
					"DESCRIBE ?subject WHERE { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.params ).toBe( "DESCRIBE ?subject WHERE { ?subject ?predicate ?object }" );
		} );

		it( "should send the basic headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			await SPARQLService
				.executeRawDESCRIBEQuery(
					"http://example.com/sparql-endpoint/",
					"DESCRIBE ?subject WHERE { ?subject ?predicate ?object }"
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/ld+json",
				"content-type": "application/sparql-query",
			} );
		} );

		it( "should send the custom headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			await SPARQLService
				.executeRawDESCRIBEQuery(
					"http://example.com/sparql-endpoint/",
					"DESCRIBE ?subject WHERE { ?subject ?predicate ?object }",
					{
						headers: new Map( [
							[ "custom", new Header( "custom value" ) ],
						] ),
					}
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/ld+json",
				"content-type": "application/sparql-query",
				"custom": "custom value",
			} );
		} );


		it( "should return the parsed data", async () => {
			const data:string = `{
				"@context": "http://schema.org/",
				"@type": "Person",
				"name": "Jane Doe",
				"jobTitle": "Professor",
				"telephone": "(425) 123-4567",
				"url": "http://www.janedoe.com"
			}`;

			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: data,
				} );


			const [ results ] = await SPARQLService
				.executeRawDESCRIBEQuery(
					"http://example.com/sparql-endpoint/",
					"DESCRIBE ?subject WHERE { ?subject ?predicate ?object }"
				);

			expect( results ).toEqual( data );
		} );

		it( "should return the response object", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: `{
						"@context": "http://schema.org/",
						"@type": "Person",
						"name": "Jane Doe",
						"jobTitle": "Professor",
						"telephone": "(425) 123-4567",
						"url": "http://www.janedoe.com"
					}`,
				} );


			const [ , response ] = await SPARQLService
				.executeRawDESCRIBEQuery(
					"http://example.com/sparql-endpoint/",
					"DESCRIBE ?subject WHERE { ?subject ?predicate ?object }"
				);

			expect( response ).toEqual( jasmine.any( Response ) );
		} );

	} );


	describe( "SPARQLService.executeUPDATE", () => {

		it( "should exist", () => {
			expect( SPARQLService.executeUPDATE ).toBeDefined();
			expect( SPARQLService.executeUPDATE ).toEqual( jasmine.any( Function ) );
		} );


		it( "should send request to URI", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: ``,
				} );


			await SPARQLService
				.executeUPDATE(
					"http://example.com/sparql-endpoint/",
					`INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }`
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.url ).toBe( "http://example.com/sparql-endpoint/" );
		} );

		it( "should send the query", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: ``,
				} );


			await SPARQLService
				.executeUPDATE(
					"http://example.com/sparql-endpoint/",
					`INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }`
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.params ).toBe( `INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }` );
		} );

		it( "should send the basic headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: ``,
				} );


			await SPARQLService
				.executeUPDATE(
					"http://example.com/sparql-endpoint/",
					`INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }`
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/ld+json",
				"content-type": "application/sparql-update",
			} );
		} );

		it( "should send the custom headers", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: ``,
				} );


			await SPARQLService
				.executeUPDATE(
					"http://example.com/sparql-endpoint/",
					`INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }`,
					{
						headers: new Map( [
							[ "custom", new Header( "custom value" ) ],
						] ),
					}
				);

			const request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
			expect( request.requestHeaders ).toEqual( {
				"accept": "application/ld+json",
				"content-type": "application/sparql-update",
				"custom": "custom value",
			} );
		} );


		it( "should return the response object", async () => {
			jasmine.Ajax
				.stubRequest( "http://example.com/sparql-endpoint/", null, "POST" )
				.andReturn( {
					status: 200,
					responseText: ``,
				} );


			const response:Response = await SPARQLService
				.executeUPDATE(
					"http://example.com/sparql-endpoint/",
					`INSERT DATA { GRAPH <http://example.com/some-document/> { <http://example.com/some-document/> <http://example.com/ns#propertyString> "Property Value" } }`
				);

			expect( response ).toEqual( jasmine.any( Response ) );
		} );

	} );

} );
