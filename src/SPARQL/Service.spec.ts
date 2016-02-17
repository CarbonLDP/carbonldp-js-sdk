/// <reference path="./../../typings/typings.d.ts" />

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
import * as Utils from "./../Utils";

import * as RawResults from "./RawResults";

import * as Service from "./Service";
import DefaultExport from "./Service";

describe( module( "Carbon/SPARQL/Service" ), ():void => {
	it( isDefined(), ():void => {
		expect( Service ).toBeDefined();
		expect( Utils.isObject( Service ) ).toEqual( true );
	});

	describe( clazz( "Carbon.SPARQL.Service.Class", "Executes SPARQL queries and updates"), ():void => {

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
		], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" } ), ( done:( error?:Error ) => void ):void => {
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
						expect( request.url ).toEqual( "http://example.com/sparql-endpoint/" );
						expect( "Accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Accept" ] ).toEqual( "application/sparql-results+json" );
						expect( "Content-Type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Content-Type" ] ).toEqual( "application/sparql-query" );

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

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done( error );
			});
		});
		it( hasMethod( STATIC, "executeRawSELECTQuery", "Executes a SELECT Query and returns a raw application/sparql-results+json object", [
			{ name: "url", type: "string" },
			{ name: "selectQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" } ), ( done:( error?:Error ) => void ):void => {
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
					responseText: '' +
						'{' +
						'   "head":{' +
						'      "vars":[' +
						'         "book",' +
						'         "title"' +
						'      ]' +
						'   },' +
						'   "results":{' +
						'      "bindings":[' +
						'         {' +
						'            "book":{' +
						'               "type":"uri",' +
						'               "value":"http://example.org/book/book6"' +
						'            },' +
						'            "title":{' +
						'               "type":"literal",' +
						'               "value":"Harry Potter and the Half-Blood Prince"' +
						'            }' +
						'         },' +
						'         {' +
						'            "book":{' +
						'               "type":"uri",' +
						'               "value":"http://example.org/book/book7"' +
						'            },' +
						'            "title":{' +
						'               "type":"literal",' +
						'               "value":"Harry Potter and the Deathly Hallows"' +
						'            }' +
						'         },' +
						'         {' +
						'            "book":{' +
						'               "type":"uri",' +
						'               "value":"http://example.org/book/book5"' +
						'            },' +
						'            "title":{' +
						'               "type":"literal",' +
						'               "value":"Harry Potter and the Order of the Phoenix"' +
						'            }' +
						'         },' +
						'         {' +
						'            "book":{' +
						'               "type":"uri",' +
						'               "value":"http://example.org/book/book4"' +
						'            },' +
						'            "title":{' +
						'               "type":"literal",' +
						'               "value":"Harry Potter and the Goblet of Fire"' +
						'            }' +
						'         },' +
						'         {' +
						'            "book":{' +
						'               "type":"uri",' +
						'               "value":"http://example.org/book/book2"' +
						'            },' +
						'            "title":{' +
						'               "type":"literal",' +
						'               "value":"Harry Potter and the Chamber of Secrets"' +
						'            }' +
						'         },' +
						'         {' +
						'            "book":{' +
						'               "type":"uri",' +
						'               "value":"http://example.org/book/book3"' +
						'            },' +
						'            "title":{' +
						'               "type":"literal",' +
						'               "value":"Harry Potter and the Prisoner Of Azkaban"' +
						'            }' +
						'         },' +
						'         {' +
						'            "book":{' +
						'               "type":"uri",' +
						'               "value":"http://example.org/book/book1"' +
						'            },' +
						'            "title":{' +
						'               "type":"literal",' +
						'               "value":"Harry Potter and the Philosopher\'s Stone"' +
						'            }' +
						'         }' +
						'      ]' +
						'   }' +
						'}' +
					'',
				} );

				promises.push( Service.Class.executeRawSELECTQuery( "http://example.com/sparql-endpoint/", selectQuery ).then(
					( [ results, response ]:[ RawResults.Class, HTTP.Response.Class ] ):void => {
						// Inspect request sent
						let request:JasmineAjaxRequest = jasmine.Ajax.requests.mostRecent();
						expect( request.method ).toEqual( "POST" );
						expect( request.url ).toEqual( "http://example.com/sparql-endpoint/" );
						expect( "Accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Accept" ] ).toEqual( "application/sparql-results+json" );
						expect( "Content-Type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Content-Type" ] ).toEqual( "application/sparql-query" );

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

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done( error );
			});
		});

		it( hasMethod( STATIC, "executeRawCONSTRUCTQuery", "Executes a CONSTRUCT Query and returns a string with the resulting model", [
			{ name: "url", type: "string" },
			{ name: "constructQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" } ), ( done:( error?:Error ) => void ):void => {
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
						expect( request.url ).toEqual( "http://example.com/sparql-endpoint/json/" );
						expect( "Accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Accept" ] ).toEqual( "application/ld+json" );
						expect( "Content-Type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Content-Type" ] ).toEqual( "application/sparql-query" );

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
				let requestOptions:HTTP.Request.Options = {};
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
						expect( request.url ).toEqual( "http://example.com/sparql-endpoint/turtle/" );
						expect( "Accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Accept" ] ).toEqual( acceptHeader );
						expect( "Content-Type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Content-Type" ] ).toEqual( "application/sparql-query" );

						// Inspect results
						expect( resultModel ).toBeDefined();
						expect( Utils.isString( resultModel ) ).toEqual( true );
						expect( resultModel ).toEqual( model );
					})
				);
			})();

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done( error );
			});
		});

		it( hasMethod( STATIC, "executeRawDESCRIBEQuery", "Executes a DESCRIBE Query and returns a string with the resulting model", [
			{ name: "url", type: "string" },
			{ name: "describeQuery", type: "string" },
			{ name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
		], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" } ), ( done:( error?:Error ) => void ):void => {
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
						expect( request.url ).toEqual( "http://example.com/sparql-endpoint/json/" );
						expect( "Accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Accept" ] ).toEqual( "application/ld+json" );
						expect( "Content-Type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Content-Type" ] ).toEqual( "application/sparql-query" );

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
						expect( request.url ).toEqual( "http://example.com/sparql-endpoint/turtle/" );
						expect( "Accept" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Accept" ] ).toEqual( acceptHeader );
						expect( "Content-Type" in request.requestHeaders ).toEqual( true );
						expect( request.requestHeaders[ "Content-Type" ] ).toEqual( "application/sparql-query" );

						// Inspect results
						expect( resultModel ).toBeDefined();
						expect( Utils.isString( resultModel ) ).toEqual( true );
						expect( resultModel ).toEqual( model );
					})
				);
			})();

			Promise.all( promises ).then( ():void => {
				done();
			}, ( error:Error ):void => {
				done( error );
			});
		});
	});
});
