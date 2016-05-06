"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var HTTP = require("./../HTTP");
var Errors = require("./../Errors");
var Utils = require("./../Utils");
var RawResults = require("./RawResults");
var Service = require("./Service");
describe(JasmineExtender_1.module("Carbon/SPARQL/Service"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Service).toBeDefined();
        expect(Utils.isObject(Service)).toEqual(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.SPARQL.Service.Class", "Executes SPARQL queries and updates"), function () {
        beforeEach(function () {
            jasmine.Ajax.install();
        });
        afterEach(function () {
            jasmine.Ajax.uninstall();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(Service.Class).toBeDefined();
            expect(Utils.isFunction(Service.Class)).toEqual(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "executeRawASKQuery", "Executes an ASK Query and returns a raw application/sparql-results+json object", [
            { name: "url", type: "string" },
            { name: "askQuery", type: "string" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }), function (done) {
            (function () {
                expect("executeRawASKQuery" in Service.Class).toEqual(true);
                expect(Utils.isFunction(Service.Class.executeRawASKQuery)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var askQuery = "ASK { ?subject ?predicate ?object }";
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/", askQuery, "POST").andReturn({
                    status: 200,
                    responseText: '' +
                        '{' +
                        '    "head" : {} ,' +
                        '    "boolean" : true' +
                        '}' +
                        '',
                });
                promises.push(Service.Class.executeRawASKQuery("http://example.com/sparql-endpoint/", askQuery).then(function (_a) {
                    var results = _a[0], response = _a[1];
                    var request = jasmine.Ajax.requests.mostRecent();
                    expect(request.method).toEqual("POST");
                    expect(request.url).toMatch("/sparql-endpoint/");
                    expect("accept" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["accept"]).toEqual("application/sparql-results+json");
                    expect("content-type" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["content-type"]).toEqual("application/sparql-query");
                    expect(results).toBeDefined();
                    expect(response).toBeDefined();
                    expect(RawResults.Factory.is(results)).toEqual(true);
                    expect("boolean" in results).toEqual(true);
                    expect(results.boolean).toEqual(true);
                }));
            })();
            Promise.all(promises).then(done, done.fail);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "executeASKQuery", "Executes an ASK Query and returns a boolean", [
            { name: "url", type: "string" },
            { name: "askQuery", type: "string" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>" }), function (done) {
            (function () {
                expect("executeASKQuery" in Service.Class).toEqual(true);
                expect(Utils.isFunction(Service.Class.executeASKQuery)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var askQuery = "ASK { ?subject ?predicate ?object }";
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/", askQuery, "POST").andReturn({
                    status: 200,
                    responseText: '' +
                        '{' +
                        '    "head" : {} ,' +
                        '    "boolean" : true' +
                        '}' +
                        '',
                });
                promises.push(Service.Class.executeASKQuery("http://example.com/sparql-endpoint/", askQuery).then(function (_a) {
                    var result = _a[0], response = _a[1];
                    expect(result).toBeDefined();
                    expect(response).toBeDefined();
                    expect(Utils.isBoolean(result)).toEqual(true);
                    expect(result).toEqual(true);
                }));
            })();
            Promise.all(promises).then(done, done.fail);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "executeSELECTQuery", "Executes a SELECT Query and parses the results", [
            { name: "url", type: "string" },
            { name: "selectQuery", type: "string" },
            { name: "pointerLibrary", type: "Carbon.Pointer.Library" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>" }), function (done) {
            (function () {
                expect("executeSELECTQuery" in Service.Class).toEqual(true);
                expect(Utils.isFunction(Service.Class.executeSELECTQuery)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var selectQuery = "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }";
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/", selectQuery, "POST").andReturn({
                    status: 200,
                    responseText: "\n\t\t\t\t\t\t{\n\t\t\t\t\t\t   \"head\": {\n\t\t\t\t\t\t      \"vars\": [\n\t\t\t\t\t\t         \"literalBinding\",\n\t\t\t\t\t\t         \"uriBinding\"\n\t\t\t\t\t\t      ]\n\t\t\t\t\t\t   },\n\t\t\t\t\t\t   \"results\": {\n\t\t\t\t\t\t      \"bindings\": [\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"literalBinding\": {\n\t\t\t\t\t\t               \"type\": \"literal\",\n\t\t\t\t\t\t               \"value\": \"some string\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"uriBinding\": {\n\t\t\t\t\t\t               \"type\": \"uri\",\n\t\t\t\t\t\t               \"value\": \"http://example.com/document-1/\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         },\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"literalBinding\": {\n\t\t\t\t\t\t               \"type\": \"literal\",\n\t\t\t\t\t\t               \"value\": \"12\",\n\t\t\t\t\t\t               \"datatype\": \"http://www.w3.org/2001/XMLSchema#integer\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"uriBinding\": {\n\t\t\t\t\t\t               \"type\": \"uri\",\n\t\t\t\t\t\t               \"value\": \"http://example.com/document-2/\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         }\n\t\t\t\t\t\t      ]\n\t\t\t\t\t\t   }\n\t\t\t\t\t\t}\n\t\t\t\t\t",
                });
                var MockedPointerLibrary = (function () {
                    function MockedPointerLibrary() {
                    }
                    MockedPointerLibrary.prototype.hasPointer = function (id) {
                        return false;
                    };
                    MockedPointerLibrary.prototype.getPointer = function (id) {
                        return {
                            _id: id,
                            _resolved: false,
                            id: id,
                            isResolved: function () { return false; },
                            resolve: function () { throw new Error(); }
                        };
                    };
                    return MockedPointerLibrary;
                }());
                var pointerLibrary = new MockedPointerLibrary();
                promises.push(Service.Class.executeSELECTQuery("http://example.com/sparql-endpoint/", selectQuery, pointerLibrary).then(function (_a) {
                    var results = _a[0], response = _a[1];
                    expect(results).toBeDefined();
                    expect(response).toBeDefined();
                    expect("vars" in results).toEqual(true);
                    expect(Utils.isArray(results.vars)).toEqual(true);
                    expect(results.vars[0]).toEqual("literalBinding");
                    expect(results.vars[1]).toEqual("uriBinding");
                    expect("bindings" in results).toEqual(true);
                    expect(Utils.isArray(results.bindings)).toEqual(true);
                    expect("literalBinding" in results.bindings[0]).toEqual(true);
                    expect(results.bindings[0]["literalBinding"]).toEqual("some string");
                    expect("uriBinding" in results.bindings[0]).toEqual(true);
                    expect(results.bindings[0]["uriBinding"].id).toEqual("http://example.com/document-1/");
                    expect("literalBinding" in results.bindings[1]).toEqual(true);
                    expect(results.bindings[1]["literalBinding"]).toEqual(12);
                    expect("uriBinding" in results.bindings[1]).toEqual(true);
                    expect(results.bindings[1]["uriBinding"].id).toEqual("http://example.com/document-2/");
                }));
            })();
            (function () {
                var selectQuery = "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }";
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/with-bnode/", selectQuery, "POST").andReturn({
                    status: 200,
                    responseText: "\n\t\t\t\t\t\t{\n\t\t\t\t\t\t   \"head\": {\n\t\t\t\t\t\t      \"vars\": [\n\t\t\t\t\t\t         \"bnodeBinding\"\n\t\t\t\t\t\t      ]\n\t\t\t\t\t\t   },\n\t\t\t\t\t\t   \"results\": {\n\t\t\t\t\t\t      \"bindings\": [\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"bnodeBinding\": {\n\t\t\t\t\t\t               \"type\": \"bnode\",\n\t\t\t\t\t\t               \"value\": \"r1\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         }\n\t\t\t\t\t\t      ]\n\t\t\t\t\t\t   }\n\t\t\t\t\t\t}\n\t\t\t\t\t",
                });
                var MockedPointerLibrary = (function () {
                    function MockedPointerLibrary() {
                    }
                    MockedPointerLibrary.prototype.hasPointer = function (id) {
                        return false;
                    };
                    MockedPointerLibrary.prototype.getPointer = function (id) {
                        return {
                            _id: id,
                            _resolved: false,
                            id: id,
                            isResolved: function () { return false; },
                            resolve: function () { throw new Error(); }
                        };
                    };
                    return MockedPointerLibrary;
                }());
                var pointerLibrary = new MockedPointerLibrary();
                promises.push(Service.Class.executeSELECTQuery("http://example.com/sparql-endpoint/with-bnode/", selectQuery, pointerLibrary).then(function () {
                    throw new Error("Shouldn't have been called");
                }, function (error) {
                    expect(error instanceof Errors.NotImplementedError).toEqual(true);
                }));
            })();
            Promise.all(promises).then(done, done.fail);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "executeRawSELECTQuery", "Executes a SELECT Query and returns a raw application/sparql-results+json object", [
            { name: "url", type: "string" },
            { name: "selectQuery", type: "string" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }), function (done) {
            (function () {
                expect("executeRawSELECTQuery" in Service.Class).toEqual(true);
                expect(Utils.isFunction(Service.Class.executeRawSELECTQuery)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var selectQuery = "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }";
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/", selectQuery, "POST").andReturn({
                    status: 200,
                    responseText: "\n\t\t\t\t\t\t{\n\t\t\t\t\t\t   \"head\":{\n\t\t\t\t\t\t      \"vars\":[\n\t\t\t\t\t\t         \"book\",\n\t\t\t\t\t\t         \"title\"\n\t\t\t\t\t\t      ]\n\t\t\t\t\t\t   },\n\t\t\t\t\t\t   \"results\":{\n\t\t\t\t\t\t      \"bindings\":[\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"book\":{\n\t\t\t\t\t\t               \"type\":\"uri\",\n\t\t\t\t\t\t               \"value\":\"http://example.org/book/book6\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"title\":{\n\t\t\t\t\t\t               \"type\":\"literal\",\n\t\t\t\t\t\t               \"value\":\"Harry Potter and the Half-Blood Prince\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         },\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"book\":{\n\t\t\t\t\t\t               \"type\":\"uri\",\n\t\t\t\t\t\t               \"value\":\"http://example.org/book/book7\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"title\":{\n\t\t\t\t\t\t               \"type\":\"literal\",\n\t\t\t\t\t\t               \"value\":\"Harry Potter and the Deathly Hallows\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         },\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"book\":{\n\t\t\t\t\t\t               \"type\":\"uri\",\n\t\t\t\t\t\t               \"value\":\"http://example.org/book/book5\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"title\":{\n\t\t\t\t\t\t               \"type\":\"literal\",\n\t\t\t\t\t\t               \"value\":\"Harry Potter and the Order of the Phoenix\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         },\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"book\":{\n\t\t\t\t\t\t               \"type\":\"uri\",\n\t\t\t\t\t\t               \"value\":\"http://example.org/book/book4\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"title\":{\n\t\t\t\t\t\t               \"type\":\"literal\",\n\t\t\t\t\t\t               \"value\":\"Harry Potter and the Goblet of Fire\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         },\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"book\":{\n\t\t\t\t\t\t               \"type\":\"uri\",\n\t\t\t\t\t\t               \"value\":\"http://example.org/book/book2\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"title\":{\n\t\t\t\t\t\t               \"type\":\"literal\",\n\t\t\t\t\t\t               \"value\":\"Harry Potter and the Chamber of Secrets\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         },\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"book\":{\n\t\t\t\t\t\t               \"type\":\"uri\",\n\t\t\t\t\t\t               \"value\":\"http://example.org/book/book3\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"title\":{\n\t\t\t\t\t\t               \"type\":\"literal\",\n\t\t\t\t\t\t               \"value\":\"Harry Potter and the Prisoner Of Azkaban\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         },\n\t\t\t\t\t\t         {\n\t\t\t\t\t\t            \"book\":{\n\t\t\t\t\t\t               \"type\":\"uri\",\n\t\t\t\t\t\t               \"value\":\"http://example.org/book/book1\"\n\t\t\t\t\t\t            },\n\t\t\t\t\t\t            \"title\":{\n\t\t\t\t\t\t               \"type\":\"literal\",\n\t\t\t\t\t\t               \"value\":\"Harry Potter and the Philosopher's Stone\"\n\t\t\t\t\t\t            }\n\t\t\t\t\t\t         }\n\t\t\t\t\t\t      ]\n\t\t\t\t\t\t   }\n\t\t\t\t\t\t}\n\t\t\t\t\t",
                });
                promises.push(Service.Class.executeRawSELECTQuery("http://example.com/sparql-endpoint/", selectQuery).then(function (_a) {
                    var results = _a[0], response = _a[1];
                    var request = jasmine.Ajax.requests.mostRecent();
                    expect(request.method).toEqual("POST");
                    expect(request.url).toMatch("/sparql-endpoint/");
                    expect("accept" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["accept"]).toEqual("application/sparql-results+json");
                    expect("content-type" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["content-type"]).toEqual("application/sparql-query");
                    expect(results).toBeDefined();
                    expect(response).toBeDefined();
                    expect(RawResults.Factory.is(results)).toEqual(true);
                    expect("head" in results).toEqual(true);
                    expect(Utils.isObject(results.head)).toEqual(true);
                    expect("vars" in results.head).toEqual(true);
                    expect(Utils.isArray(results.head.vars)).toEqual(true);
                    expect("results" in results).toEqual(true);
                    expect(Utils.isObject(results.results)).toEqual(true);
                    expect("bindings" in results.results).toEqual(true);
                    expect(Utils.isArray(results.results.bindings)).toEqual(true);
                }));
            })();
            Promise.all(promises).then(done, done.fail);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "executeRawCONSTRUCTQuery", "Executes a CONSTRUCT Query and returns a string with the resulting model", [
            { name: "url", type: "string" },
            { name: "constructQuery", type: "string" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }), function (done) {
            (function () {
                expect("executeRawCONSTRUCTQuery" in Service.Class).toEqual(true);
                expect(Utils.isFunction(Service.Class.executeRawCONSTRUCTQuery)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var constructQuery = "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }";
                var model = '' +
                    '{' +
                    '	"@context": "http://schema.org/",' +
                    '	"@type": "Person",' +
                    '	"name": "Jane Doe",' +
                    '	"jobTitle": "Professor",' +
                    '	"telephone": "(425) 123-4567",' +
                    '	"url": "http://www.janedoe.com"' +
                    '}' +
                    '';
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/json/", constructQuery, "POST").andReturn({
                    status: 200,
                    responseText: model,
                });
                promises.push(Service.Class.executeRawCONSTRUCTQuery("http://example.com/sparql-endpoint/json/", constructQuery).then(function (_a) {
                    var resultModel = _a[0], response = _a[1];
                    var request = jasmine.Ajax.requests.at(0);
                    expect(request.method).toEqual("POST");
                    expect(request.url).toMatch("/sparql-endpoint/json/");
                    expect("accept" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["accept"]).toEqual("application/ld+json");
                    expect("content-type" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["content-type"]).toEqual("application/sparql-query");
                    expect(resultModel).toBeDefined();
                    expect(Utils.isString(resultModel)).toEqual(true);
                    expect(resultModel).toEqual(model);
                }));
            })();
            (function () {
                var constructQuery = "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }";
                var model = '' +
                    '<http://example.org/netWorth/nw1/liabilities/>' +
                    '   a ldp:DirectContainer;' +
                    '   dcterms:title "The liabilities of JohnZSmith";' +
                    '   ldp:membershipResource <http://example.org/netWorth/nw1/>;' +
                    '   ldp:hasMemberRelation o:liability;' +
                    '   ldp:contains <l1>, <l2>, <l3>.' +
                    '';
                var acceptHeader = "text/turtle";
                var requestOptions = { headers: new Map().set("some", new HTTP.Header.Class("some")) };
                HTTP.Request.Util.setAcceptHeader(acceptHeader, requestOptions);
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/turtle/", constructQuery, "POST").andReturn({
                    status: 200,
                    responseText: model,
                });
                promises.push(Service.Class.executeRawCONSTRUCTQuery("http://example.com/sparql-endpoint/turtle/", constructQuery, requestOptions).then(function (_a) {
                    var resultModel = _a[0], response = _a[1];
                    var request = jasmine.Ajax.requests.at(1);
                    expect(request.method).toEqual("POST");
                    expect(request.url).toMatch("/sparql-endpoint/turtle/");
                    expect("accept" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["accept"]).toEqual(acceptHeader);
                    expect("content-type" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["content-type"]).toEqual("application/sparql-query");
                    expect(resultModel).toBeDefined();
                    expect(Utils.isString(resultModel)).toEqual(true);
                    expect(resultModel).toEqual(model);
                }));
            })();
            Promise.all(promises).then(done, done.fail);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "executeRawDESCRIBEQuery", "Executes a DESCRIBE Query and returns a string with the resulting model", [
            { name: "url", type: "string" },
            { name: "describeQuery", type: "string" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }), function (done) {
            (function () {
                expect("executeRawDESCRIBEQuery" in Service.Class).toEqual(true);
                expect(Utils.isFunction(Service.Class.executeRawDESCRIBEQuery)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var constructQuery = "DESCRIBE ?subject WHERE { ?subject ?predicate ?object }";
                var model = '' +
                    '{' +
                    '	"@context": "http://schema.org/",' +
                    '	"@type": "Person",' +
                    '	"name": "Jane Doe",' +
                    '	"jobTitle": "Professor",' +
                    '	"telephone": "(425) 123-4567",' +
                    '	"url": "http://www.janedoe.com"' +
                    '}' +
                    '';
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/json/", constructQuery, "POST").andReturn({
                    status: 200,
                    responseText: model,
                });
                promises.push(Service.Class.executeRawDESCRIBEQuery("http://example.com/sparql-endpoint/json/", constructQuery).then(function (_a) {
                    var resultModel = _a[0], response = _a[1];
                    var request = jasmine.Ajax.requests.at(0);
                    expect(request.method).toEqual("POST");
                    expect(request.url).toMatch("/sparql-endpoint/json/");
                    expect("accept" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["accept"]).toEqual("application/ld+json");
                    expect("content-type" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["content-type"]).toEqual("application/sparql-query");
                    expect(resultModel).toBeDefined();
                    expect(Utils.isString(resultModel)).toEqual(true);
                    expect(resultModel).toEqual(model);
                }));
            })();
            (function () {
                var constructQuery = "DESCRIBE ?subject WHERE { ?subject ?predicate ?object }";
                var model = '' +
                    '<http://example.org/netWorth/nw1/liabilities/>' +
                    '   a ldp:DirectContainer;' +
                    '   dcterms:title "The liabilities of JohnZSmith";' +
                    '   ldp:membershipResource <http://example.org/netWorth/nw1/>;' +
                    '   ldp:hasMemberRelation o:liability;' +
                    '   ldp:contains <l1>, <l2>, <l3>.' +
                    '';
                var acceptHeader = "text/turtle";
                var requestOptions = {};
                HTTP.Request.Util.setAcceptHeader(acceptHeader, requestOptions);
                jasmine.Ajax.stubRequest("http://example.com/sparql-endpoint/turtle/", constructQuery, "POST").andReturn({
                    status: 200,
                    responseText: model,
                });
                promises.push(Service.Class.executeRawDESCRIBEQuery("http://example.com/sparql-endpoint/turtle/", constructQuery, requestOptions).then(function (_a) {
                    var resultModel = _a[0], response = _a[1];
                    var request = jasmine.Ajax.requests.mostRecent();
                    expect(request.method).toEqual("POST");
                    expect(request.url).toMatch("/sparql-endpoint/turtle/");
                    expect("accept" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["accept"]).toEqual(acceptHeader);
                    expect("content-type" in request.requestHeaders).toEqual(true);
                    expect(request.requestHeaders["content-type"]).toEqual("application/sparql-query");
                    expect(resultModel).toBeDefined();
                    expect(Utils.isString(resultModel)).toEqual(true);
                    expect(resultModel).toEqual(model);
                }));
            })();
            Promise.all(promises).then(done, done.fail);
        });
    });
});
