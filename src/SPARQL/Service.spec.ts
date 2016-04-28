import {
	INSTANCE,
	STATIC,

	module,

	isDefined,

	interfaze,
	clazz,
	method,

	hasConstructor,
	hasMethod,
	hasSignature,
	hasProperty,
	hasInterface,
	extendsClass,

	MethodArgument,
} from "./../test/JasmineExtender";

import * as HTTP from "./../HTTP";
import * as Errors from "./../Errors";
import * as Pointer from "./../Pointer";
import * as Utils from "./../Utils";

import * as RawResults from "./RawResults";
import * as SELECTResults from "./SELECTResults";

import * as Service from "./Service";
import DefaultExport from "./Service";

describe( module( "Carbon/SPARQL/Service" ), ():void => {
	it( isDefined(), ():void => {
		expect( Service ).toBeDefined();
		expect( Utils.isObject( Service ) ).toEqual( true );
	});

	describe( clazz( "Carbon.SPARQL.Service.Class", "Executes SPARQL queries and updates" ), ():void => {

		beforeEach( function ():void {
			jasmine.Ajax.install();
		} );

		afterEach( function ():void {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Service.Class ).toBeDefined();
			expect( Utils.isFunction( Service.Class ) ).toEqual( true );
		});

		it( hasMethod( STATIC, "executeRawASKQuery", "Executes an ASK Query and returns a raw application/sparql-results+json object", [
			{ name: "url", type: "string" },
			{ name: "askQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" } ), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			// Property Integrity
			(() => {
				expect( "executeRawASKQuery" in Service.Class ).toEqual( true );
				expect( Utils.isFunction( Service.Class.executeRawASKQuery ) ).toEqual( true );
			})();

			let promises:Promise<void>[] = [];

			// Simple test
			(() => {
				let askQuery:string = "ASK { ?subject ?predicate ?object }";

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/", askQuery, "POST" ).andReturn( {
					status: 200,
					responseText: '' +
						'{' +
					    '    "head" : {} ,' +
			            '    "boolean" : true' +
						'}' +
					'',
				} );

				promises.push( Service.Class.executeRawASKQuery( "http://example.com/sparql-endpoint/", askQuery ).then(
					( [ results, response ]:[ RawResults.Class, HTTP.Response.Class ] ):void => {
						// Inspect request sent
						let request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
						expect( request.method ).toEqual( "POST" );
						expect( request.url ).toMatch( "/sparql-endpoint/" );
						expect( "accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "accept" ] ).toEqual( "application/sparql-results+json" );
						expect( "content-type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "content-type" ] ).toEqual( "application/sparql-query" );

						// Inspect results
						expect( results ).toBeDefined();
						expect( response ).toBeDefined();
						// TODO: Test that response is a valid HTTP.Response.Class

						expect( RawResults.Factory.is( results ) ).toEqual( true );

						expect( "boolean" in results ).toEqual( true );
						expect( results.boolean ).toEqual( true );
					})
				);
			})();

			Promise.all( promises ).then( done, done.fail );
		});

		it( hasMethod( STATIC, "executeASKQuery", "Executes an ASK Query and returns a boolean", [
			{ name: "url", type: "string" },
			{ name: "askQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>" } ), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			// Property Integrity
			(() => {
				expect( "executeASKQuery" in Service.Class ).toEqual( true );
				expect( Utils.isFunction( Service.Class.executeASKQuery ) ).toEqual( true );
			})();

			let promises:Promise<void>[] = [];

			// Simple test
			(() => {
				let askQuery:string = "ASK { ?subject ?predicate ?object }";

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/", askQuery, "POST" ).andReturn( {
					status: 200,
					responseText: '' +
					'{' +
					'    "head" : {} ,' +
					'    "boolean" : true' +
					'}' +
					'',
				} );

				promises.push( Service.Class.executeASKQuery( "http://example.com/sparql-endpoint/", askQuery ).then(
					( [ result, response ]:[ boolean, HTTP.Response.Class ] ):void => {
						// TODO: Test that executeRawASKQuery was called

						// Inspect results
						expect( result ).toBeDefined();
						expect( response ).toBeDefined();
						// TODO: Test that response is a valid HTTP.Response.Class

						expect( Utils.isBoolean( result ) ).toEqual( true );

						expect( result ).toEqual( true );
					})
				);
			})();

			Promise.all( promises ).then( done, done.fail );
		});

		it( hasMethod( STATIC, "executeSELECTQuery", "Executes a SELECT Query and parses the results", [
			{ name: "url", type: "string" },
			{ name: "selectQuery", type: "string" },
			{ name: "pointerLibrary", type: "Carbon.Pointer.Library" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>" } ), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			// Property Integrity
			(() => {
				expect( "executeSELECTQuery" in Service.Class ).toEqual( true );
				expect( Utils.isFunction( Service.Class.executeSELECTQuery ) ).toEqual( true );
			})();

			let promises:Promise<void>[] = [];

			// Simple test
			(() => {
				let selectQuery:string = "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }";

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/", selectQuery, "POST" ).andReturn( {
					status: 200,
					responseText: `
						{
						   "head": {
						      "vars": [
						         "literalBinding",
						         "uriBinding"
						      ]
						   },
						   "results": {
						      "bindings": [
						         {
						            "literalBinding": {
						               "type": "literal",
						               "value": "some string"
						            },
						            "uriBinding": {
						               "type": "uri",
						               "value": "http://example.com/document-1/"
						            }
						         },
						         {
						            "literalBinding": {
						               "type": "literal",
						               "value": "12",
						               "datatype": "http://www.w3.org/2001/XMLSchema#integer"
						            },
						            "uriBinding": {
						               "type": "uri",
						               "value": "http://example.com/document-2/"
						            }
						         }
						      ]
						   }
						}
					`,
				} );

				class MockedPointerLibrary implements Pointer.Library {
					hasPointer( id: string ): boolean {
						return false;
					}
					getPointer( id: string ): Pointer.Class {
						return {
							_id: id,
							_resolved: false,
							id: id,
							isResolved: ():any => { return false; },
							resolve: ():any => { throw new Error(); }
						};
					}
				}

				let pointerLibrary:Pointer.Library = new MockedPointerLibrary();

				promises.push( Service.Class.executeSELECTQuery( "http://example.com/sparql-endpoint/", selectQuery, pointerLibrary ).then(
					( [ results, response ]:[ SELECTResults.Class, HTTP.Response.Class ] ):void => {
						// TODO: Test that executeRawSELECTQuery was called

						// Inspect results
						expect( results ).toBeDefined();
						expect( response ).toBeDefined();
						// TODO: Test that response is a valid HTTP.Response.Class

						expect( "vars" in results ).toEqual( true );
						expect( Utils.isArray( results.vars ) ).toEqual( true );
						expect( results.vars[ 0 ] ).toEqual( "literalBinding" );
						expect( results.vars[ 1 ] ).toEqual( "uriBinding" );

						expect( "bindings" in results ).toEqual( true );
						expect( Utils.isArray( results.bindings ) ).toEqual( true );

						expect( "literalBinding" in results.bindings[ 0 ] ).toEqual( true );
						expect( results.bindings[ 0 ][ "literalBinding" ] ).toEqual( "some string" );

						expect( "uriBinding" in results.bindings[ 0 ] ).toEqual( true );
						expect( results.bindings[ 0 ][ "uriBinding" ].id ).toEqual( "http://example.com/document-1/" );

						expect( "literalBinding" in results.bindings[ 1 ] ).toEqual( true );
						expect( results.bindings[ 1 ][ "literalBinding" ] ).toEqual( 12 );

						expect( "uriBinding" in results.bindings[ 1 ] ).toEqual( true );
						expect( results.bindings[ 1 ][ "uriBinding" ].id ).toEqual( "http://example.com/document-2/" );
					})
				);
			})();

			// BNode Test
			(() => {
				let selectQuery:string = "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }";

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/with-bnode/", selectQuery, "POST" ).andReturn( {
					status: 200,
					responseText: `
						{
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
						}
					`,
				} );

				class MockedPointerLibrary implements Pointer.Library {
					hasPointer( id: string ): boolean {
						return false;
					}
					getPointer( id: string ): Pointer.Class {
						return {
							_id: id,
							_resolved: false,
							id: id,
							isResolved: ():any => { return false; },
							resolve: ():any => { throw new Error(); }
						};
					}
				}

				let pointerLibrary:Pointer.Library = new MockedPointerLibrary();

				promises.push( Service.Class.executeSELECTQuery( "http://example.com/sparql-endpoint/with-bnode/", selectQuery, pointerLibrary ).then(
					():void => {
						throw new Error( "Shouldn't have been called" );
					},
					( error:Error ):void => {
						expect( error instanceof Errors.NotImplementedError ).toEqual( true );
					}
				)
				);
			})();

			Promise.all( promises ).then( done, done.fail );
		});

		it( hasMethod( STATIC, "executeRawSELECTQuery", "Executes a SELECT Query and returns a raw application/sparql-results+json object", [
			{ name: "url", type: "string" },
			{ name: "selectQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" } ), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			// Property Integrity
			(() => {
				expect( "executeRawSELECTQuery" in Service.Class ).toEqual( true );
				expect( Utils.isFunction( Service.Class.executeRawSELECTQuery ) ).toEqual( true );
			})();

			let promises:Promise<void>[] = [];

			// Simple test
			(() => {
				let selectQuery:string = "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }";

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/", selectQuery, "POST" ).andReturn( {
					status: 200,
					responseText: `
						{
						   "head":{
						      "vars":[
						         "book",
						         "title"
						      ]
						   },
						   "results":{
						      "bindings":[
						         {
						            "book":{
						               "type":"uri",
						               "value":"http://example.org/book/book6"
						            },
						            "title":{
						               "type":"literal",
						               "value":"Harry Potter and the Half-Blood Prince"
						            }
						         },
						         {
						            "book":{
						               "type":"uri",
						               "value":"http://example.org/book/book7"
						            },
						            "title":{
						               "type":"literal",
						               "value":"Harry Potter and the Deathly Hallows"
						            }
						         },
						         {
						            "book":{
						               "type":"uri",
						               "value":"http://example.org/book/book5"
						            },
						            "title":{
						               "type":"literal",
						               "value":"Harry Potter and the Order of the Phoenix"
						            }
						         },
						         {
						            "book":{
						               "type":"uri",
						               "value":"http://example.org/book/book4"
						            },
						            "title":{
						               "type":"literal",
						               "value":"Harry Potter and the Goblet of Fire"
						            }
						         },
						         {
						            "book":{
						               "type":"uri",
						               "value":"http://example.org/book/book2"
						            },
						            "title":{
						               "type":"literal",
						               "value":"Harry Potter and the Chamber of Secrets"
						            }
						         },
						         {
						            "book":{
						               "type":"uri",
						               "value":"http://example.org/book/book3"
						            },
						            "title":{
						               "type":"literal",
						               "value":"Harry Potter and the Prisoner Of Azkaban"
						            }
						         },
						         {
						            "book":{
						               "type":"uri",
						               "value":"http://example.org/book/book1"
						            },
						            "title":{
						               "type":"literal",
						               "value":"Harry Potter and the Philosopher's Stone"
						            }
						         }
						      ]
						   }
						}
					`,
				} );

				promises.push( Service.Class.executeRawSELECTQuery( "http://example.com/sparql-endpoint/", selectQuery ).then(
					( [ results, response ]:[ RawResults.Class, HTTP.Response.Class ] ):void => {
						// Inspect request sent
						let request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
						expect( request.method ).toEqual( "POST" );
						expect( request.url ).toMatch( "/sparql-endpoint/" );
						expect( "accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "accept" ] ).toEqual( "application/sparql-results+json" );
						expect( "content-type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "content-type" ] ).toEqual( "application/sparql-query" );

						// Inspect results
						expect( results ).toBeDefined();
						expect( response ).toBeDefined();
						// TODO: Test that response is a valid HTTP.Response.Class

						expect( RawResults.Factory.is( results ) ).toEqual( true );

						expect( "head" in results ).toEqual( true );
						expect( Utils.isObject( results.head ) ).toEqual( true );
						expect( "vars" in results.head ).toEqual( true );
						expect( Utils.isArray( results.head.vars ) ).toEqual( true );

						expect( "results" in results ).toEqual( true );
						expect( Utils.isObject( results.results ) ).toEqual( true );
						expect( "bindings" in results.results ).toEqual( true );
						expect( Utils.isArray( results.results.bindings ) ).toEqual( true );
					})
				);
			})();

			Promise.all( promises ).then( done, done.fail );
		});

		it( hasMethod( STATIC, "executeRawCONSTRUCTQuery", "Executes a CONSTRUCT Query and returns a string with the resulting model", [
			{ name: "url", type: "string" },
			{ name: "constructQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" } ), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			// Property Integrity
			(() => {
				expect( "executeRawCONSTRUCTQuery" in Service.Class ).toEqual( true );
				expect( Utils.isFunction( Service.Class.executeRawCONSTRUCTQuery ) ).toEqual( true );
			})();

			let promises:Promise<void>[] = [];

			// Default Accept
			(() => {
				let constructQuery:string = "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }";
				let model:string = '' +
					'{' +
					'	"@context": "http://schema.org/",' +
					'	"@type": "Person",' +
					'	"name": "Jane Doe",' +
					'	"jobTitle": "Professor",' +
					'	"telephone": "(425) 123-4567",' +
					'	"url": "http://www.janedoe.com"' +
					'}' +
				'';

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/json/", constructQuery, "POST" ).andReturn( {
					status: 200,
					responseText: model,
				} );

				promises.push( Service.Class.executeRawCONSTRUCTQuery( "http://example.com/sparql-endpoint/json/", constructQuery ).then(
					( [ resultModel, response ]:[ string, HTTP.Response.Class ] ):void => {
						// Inspect request sent
						let request:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
						expect( request.method ).toEqual( "POST" );
						expect( request.url ).toMatch( "/sparql-endpoint/json/" );
						expect( "accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "accept" ] ).toEqual( "application/ld+json" );
						expect( "content-type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "content-type" ] ).toEqual( "application/sparql-query" );

						// Inspect results
						expect( resultModel ).toBeDefined();
						expect( Utils.isString( resultModel ) ).toEqual( true );
						expect( resultModel ).toEqual( model );
					})
				);
			})();

			// Custom Accept
			(() => {
				let constructQuery:string = "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }";
				let model:string = '' +
					'<http://example.org/netWorth/nw1/liabilities/>' +
					'   a ldp:DirectContainer;' +
					'   dcterms:title "The liabilities of JohnZSmith";' +
					'   ldp:membershipResource <http://example.org/netWorth/nw1/>;' +
					'   ldp:hasMemberRelation o:liability;' +
					'   ldp:contains <l1>, <l2>, <l3>.' +
				'';
				let acceptHeader:string = "text/turtle";
				let requestOptions:HTTP.Request.Options = {headers: new Map().set("some", new HTTP.Header.Class("some") )};
				HTTP.Request.Util.setAcceptHeader( acceptHeader, requestOptions );

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/turtle/", constructQuery, "POST" ).andReturn( {
					status: 200,
					responseText: model,
				} );

				promises.push( Service.Class.executeRawCONSTRUCTQuery( "http://example.com/sparql-endpoint/turtle/", constructQuery, requestOptions ).then(
					( [ resultModel, response ]:[ string, HTTP.Response.Class ] ):void => {
						// Inspect request sent
						let request:JasmineAjaxRequest = jasmine.Ajax.requests.at( 1 );
						expect( request.method ).toEqual( "POST" );
						expect( request.url ).toMatch( "/sparql-endpoint/turtle/" );
						expect( "accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "accept" ] ).toEqual( acceptHeader );
						expect( "content-type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "content-type" ] ).toEqual( "application/sparql-query" );

						// Inspect results
						expect( resultModel ).toBeDefined();
						expect( Utils.isString( resultModel ) ).toEqual( true );
						expect( resultModel ).toEqual( model );
					})
				);
			})();

			Promise.all( promises ).then( done, done.fail );
		});

		it( hasMethod( STATIC, "executeRawDESCRIBEQuery", "Executes a DESCRIBE Query and returns a string with the resulting model", [
			{ name: "url", type: "string" },
			{ name: "describeQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" } ), ( done:{ ():void; fail:( error:any ) => void } ):void => {
			// Property Integrity
			(() => {
				expect( "executeRawDESCRIBEQuery" in Service.Class ).toEqual( true );
				expect( Utils.isFunction( Service.Class.executeRawDESCRIBEQuery ) ).toEqual( true );
			})();

			let promises:Promise<void>[] = [];

			// Default Accept
			(() => {
				let constructQuery:string = "DESCRIBE ?subject WHERE { ?subject ?predicate ?object }";
				let model:string = '' +
					'{' +
					'	"@context": "http://schema.org/",' +
					'	"@type": "Person",' +
					'	"name": "Jane Doe",' +
					'	"jobTitle": "Professor",' +
					'	"telephone": "(425) 123-4567",' +
					'	"url": "http://www.janedoe.com"' +
					'}' +
				'';

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/json/", constructQuery, "POST" ).andReturn( {
					status: 200,
					responseText: model,
				} );

				promises.push( Service.Class.executeRawDESCRIBEQuery( "http://example.com/sparql-endpoint/json/", constructQuery ).then(
					( [ resultModel, response ]:[ string, HTTP.Response.Class ] ):void => {
						// Inspect request sent
						let request:JasmineAjaxRequest = jasmine.Ajax.requests.at( 0 );
						expect( request.method ).toEqual( "POST" );
						expect( request.url ).toMatch( "/sparql-endpoint/json/" );
						expect( "accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "accept" ] ).toEqual( "application/ld+json" );
						expect( "content-type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "content-type" ] ).toEqual( "application/sparql-query" );

						// Inspect results
						expect( resultModel ).toBeDefined();
						expect( Utils.isString( resultModel ) ).toEqual( true );
						expect( resultModel ).toEqual( model );
					})
				);
			})();

			// Custom Accept
			(() => {
				let constructQuery:string = "DESCRIBE ?subject WHERE { ?subject ?predicate ?object }";
				let model:string = '' +
					'<http://example.org/netWorth/nw1/liabilities/>' +
					'   a ldp:DirectContainer;' +
					'   dcterms:title "The liabilities of JohnZSmith";' +
					'   ldp:membershipResource <http://example.org/netWorth/nw1/>;' +
					'   ldp:hasMemberRelation o:liability;' +
					'   ldp:contains <l1>, <l2>, <l3>.' +
				'';
				let acceptHeader:string = "text/turtle";
				let requestOptions:HTTP.Request.Options = {};
				HTTP.Request.Util.setAcceptHeader( acceptHeader, requestOptions );

				jasmine.Ajax.stubRequest( "http://example.com/sparql-endpoint/turtle/", constructQuery, "POST" ).andReturn( {
					status: 200,
					responseText: model,
				} );

				promises.push( Service.Class.executeRawDESCRIBEQuery( "http://example.com/sparql-endpoint/turtle/", constructQuery, requestOptions ).then(
					( [ resultModel, response ]:[ string, HTTP.Response.Class ] ):void => {
						// Inspect request sent
						let request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
						expect( request.method ).toEqual( "POST" );
						expect( request.url ).toMatch( "/sparql-endpoint/turtle/" );
						expect( "accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "accept" ] ).toEqual( acceptHeader );
						expect( "content-type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "content-type" ] ).toEqual( "application/sparql-query" );

						// Inspect results
						expect( resultModel ).toBeDefined();
						expect( Utils.isString( resultModel ) ).toEqual( true );
						expect( resultModel ).toEqual( model );
					})
				);
			})();

			Promise.all( promises ).then( done, done.fail );
		});
	});
});
