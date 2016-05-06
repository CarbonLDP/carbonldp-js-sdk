"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Errors_1 = require("./Errors");
var Utils = require("./../Utils");
var Header = require("./Header");
var Response_1 = require("./Response");
var JSONParser_1 = require("./JSONParser");
var NS = require("./../NS");
var Request = require("./Request");
describe(JasmineExtender_1.module("Carbon/HTTP/Request"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Request).toBeDefined();
        expect(Utils.isObject(Request)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.Request.Service", "Class that have functions to manage HTTP requests"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Request.Service).toBeDefined();
            expect(Utils.isFunction(Request.Service)).toBe(true);
        });
        var responseHeaders = {
            status: 200,
            responseHeaders: {
                "X-Custom-Header-1": "Value 1",
                "X-Custom-Header-2": "Value 2",
                "X-Custom-Header-3": "Value 3",
                "X-Custom-Header-Multi": "1, 2, 3, 4, 5, 6, 7, 8"
            }
        };
        var responseFull = {
            status: 200,
            responseHeaders: {
                "X-Custom-Header-1": "Value 1",
                "X-Custom-Header-2": "Value 2",
                "X-Custom-Header-3": "Value 3",
                "X-Custom-Header-Multi": "1, 2, 3, 4, 5, 6, 7, 8"
            },
            contentType: "application/json",
            responseText: '[ { "value": "value", "type": "type" } ]'
        };
        var responseOptions = {
            status: 200,
            responseHeaders: {
                "Server": "Apache/2.4.1 (Unix) OpenSSL/1.0.0g",
                "Allow": "GET,HEAD,POST,OPTIONS,TRACE",
                "Content-Type": "httpd/unix-directory"
            },
            responseText: "May contains text that says something about the API"
        };
        var headersMap = new Map()
            .set("Content-Type", new Header.Class("application/json"))
            .set("Accept", new Header.Class("application/json"));
        var options = {
            headers: headersMap,
            timeout: 5000,
            sendCredentialsOnCORS: false
        };
        var parser = new JSONParser_1.default();
        beforeEach(function () {
            jasmine.Ajax.install();
            jasmine.Ajax.stubRequest("http://example.com/200", null, "OPTIONS").andReturn(responseOptions);
            jasmine.Ajax.stubRequest("http://example.com/200", null, "HEAD").andReturn(responseHeaders);
            jasmine.Ajax.stubRequest("http://example.com/200", null, "GET").andReturn(responseFull);
            jasmine.Ajax.stubRequest("http://example.com/200", null, "POST").andReturn(responseFull);
            jasmine.Ajax.stubRequest("http://example.com/200", null, "PUT").andReturn(responseFull);
            jasmine.Ajax.stubRequest("http://example.com/200", null, "PATCH").andReturn(responseFull);
            jasmine.Ajax.stubRequest("http://example.com/200", null, "DELETE").andReturn(responseFull);
            jasmine.Ajax.stubRequest("http://example.com/404", null).andReturn({ status: 404 });
            jasmine.Ajax.stubRequest("http://example.com/500", null).andReturn({ status: 500 });
        });
        afterEach(function () {
            jasmine.Ajax.uninstall();
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "send", "Generic send method, to be used by the others methods in the class", [
            { name: "url", type: "string" },
            { name: "body", type: "string" },
            { name: "options", type: "object" }
        ], { type: "Promise<Carbon.HTTP.Response>" }), function () {
            expect(Request.Service.send).toBeDefined();
            expect(Utils.isFunction(Request.Service.send)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "head", [
            { name: "url", type: "string" },
            { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
        ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
            expect(Request.Service.head).toBeDefined();
            expect(Utils.isFunction(Request.Service.head)).toBe(true);
            var promises = [];
            var promise;
            promise = Request.Service.head("http://example.com/200");
            testPromise(promise);
            promises.push(promise.then(function (response) {
                testHTTPResponse(response);
                expect(response.status).toEqual(200);
                expect(response.data).toEqual("");
                testHTTPResponseHeaders(response, responseHeaders.responseHeaders);
            }));
            promise = Request.Service.head("http://example.com/200", options);
            testPromise(promise);
            promises.push(promise.then(function (response) {
                testHTTPResponse(response);
                expect(response.status).toEqual(200);
                expect(response.data).toEqual("");
                testHTTPResponseHeaders(response, responseHeaders.responseHeaders);
            }));
            promise = Request.Service.head("http://example.com/404");
            testPromise(promise);
            promise = promise.catch(function (exception) {
                expect(exception instanceof Errors_1.NotFoundError).toBe(true);
            });
            promises.push(promise);
            promise = Request.Service.head("http://example.com/500", options);
            testPromise(promise);
            promise = promise.catch(function (exception) {
                expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
            });
            promises.push(promise);
            Promise.all(promises).then(done).catch(done.fail);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "options", [
            { name: "url", type: "string" },
            { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
        ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
            expect(Request.Service.head).toBeDefined();
            expect(Utils.isFunction(Request.Service.head)).toBe(true);
            var promises = [];
            var promise;
            promise = Request.Service.options("http://example.com/200");
            testPromise(promise);
            promises.push(promise.then(function (response) {
                testHTTPResponse(response);
                expect(response.status).toEqual(200);
                testHTTPResponseData(response, responseOptions.responseText);
                testHTTPResponseHeaders(response, responseOptions.responseHeaders);
            }));
            promise = Request.Service.options("http://example.com/200", options);
            testPromise(promise);
            promises.push(promise.then(function (response) {
                testHTTPResponse(response);
                expect(response.status).toEqual(200);
                testHTTPResponseData(response, responseOptions.responseText);
                testHTTPResponseHeaders(response, responseOptions.responseHeaders);
            }));
            promise = Request.Service.options("http://example.com/404");
            testPromise(promise);
            promise = promise.catch(function (exception) {
                expect(exception instanceof Errors_1.NotFoundError).toBe(true);
            });
            promises.push(promise);
            promise = Request.Service.options("http://example.com/500", options);
            testPromise(promise);
            promise = promise.catch(function (exception) {
                expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
            });
            promises.push(promise);
            Promise.all(promises).then(done).catch(done.fail);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "get"), function () {
            it(JasmineExtender_1.hasSignature("Simple get request", [
                { name: "url", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.get).toBeDefined();
                expect(Utils.isFunction(Request.Service.get)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.get("http://example.com/200");
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.get("http://example.com/200", options);
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.get("http://example.com/404");
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.get("http://example.com/500", options);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
            it(JasmineExtender_1.hasSignature("Get request with specified parser", [
                { name: "url", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
                { name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
            ], { type: "Promise<[Object, Carbon.HTTP.Response]>" }), function (done) {
                expect(Request.Service.get).toBeDefined();
                expect(Utils.isFunction(Request.Service.get)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.get("http://example.com/200", null, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.get("http://example.com/200", options, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.get("http://example.com/404", null, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.get("http://example.com/500", options, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "post"), function () {
            it(JasmineExtender_1.hasSignature("Simple post request", [
                { name: "url", type: "string" },
                { name: "body", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.post).toBeDefined();
                expect(Utils.isFunction(Request.Service.post)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.post("http://example.com/200", "some body data");
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.post("http://example.com/200", "some body data", options);
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.post("http://example.com/404", "some body data");
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.post("http://example.com/500", "some body data", options);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
            it(JasmineExtender_1.hasSignature("Post request with specified parser", [
                { name: "url", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
                { name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.post).toBeDefined();
                expect(Utils.isFunction(Request.Service.post)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.post("http://example.com/200", "some body data", null, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.post("http://example.com/200", "some body data", options, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.post("http://example.com/404", "some body data", null, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.post("http://example.com/500", "some body data", options, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "put"), function () {
            it(JasmineExtender_1.hasSignature("Simple put request", [
                { name: "url", type: "string" },
                { name: "body", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.put).toBeDefined();
                expect(Utils.isFunction(Request.Service.put)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.put("http://example.com/200", "some body data");
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.put("http://example.com/200", "some body data", options);
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.put("http://example.com/404", "some body data");
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.put("http://example.com/500", "some body data", options);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
            it(JasmineExtender_1.hasSignature("Put request with specified parser", [
                { name: "url", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
                { name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.put).toBeDefined();
                expect(Utils.isFunction(Request.Service.put)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.put("http://example.com/200", "some body data", null, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.put("http://example.com/200", "some body data", options, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.put("http://example.com/404", "some body data", null, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.put("http://example.com/500", "some body data", options, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "patch"), function () {
            it(JasmineExtender_1.hasSignature("Simple patch request", [
                { name: "url", type: "string" },
                { name: "body", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.patch).toBeDefined();
                expect(Utils.isFunction(Request.Service.patch)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.patch("http://example.com/200", "some body data");
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.patch("http://example.com/200", "some body data", options);
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.patch("http://example.com/404", "some body data");
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.patch("http://example.com/500", "some body data", options);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
            it(JasmineExtender_1.hasSignature("Patch request with specified parser", [
                { name: "url", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
                { name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.patch).toBeDefined();
                expect(Utils.isFunction(Request.Service.patch)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.patch("http://example.com/200", "some body data", null, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.patch("http://example.com/200", "some body data", options, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.patch("http://example.com/404", "some body data", null, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.patch("http://example.com/500", "some body data", options, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "delete"), function () {
            it(JasmineExtender_1.hasSignature("Simple delete request", [
                { name: "url", type: "string" },
                { name: "body", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.delete).toBeDefined();
                expect(Utils.isFunction(Request.Service.delete)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.delete("http://example.com/200", "some body data");
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.delete("http://example.com/200", "some body data", options);
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.delete("http://example.com/404", "some body data");
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.delete("http://example.com/500", "some body data", options);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
            it(JasmineExtender_1.hasSignature("Delete request with specified parser", [
                { name: "url", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
                { name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.delete).toBeDefined();
                expect(Utils.isFunction(Request.Service.delete)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.delete("http://example.com/200", "some body data", null, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.delete("http://example.com/200", "some body data", options, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.delete("http://example.com/404", "some body data", null, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.delete("http://example.com/500", "some body data", options, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
            it(JasmineExtender_1.hasSignature("Simple delete request", [
                { name: "url", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.delete).toBeDefined();
                expect(Utils.isFunction(Request.Service.delete)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.delete("http://example.com/200");
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.delete("http://example.com/200", options);
                testPromise(promise);
                promises.push(promise.then(function (response) {
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                }));
                promise = Request.Service.delete("http://example.com/404");
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.delete("http://example.com/500", options);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
            it(JasmineExtender_1.hasSignature("Delete request with specified parser", [
                { name: "url", type: "string" },
                { name: "options", type: "object", optional: true, default: "{ sendCredentialsOnCORS: true }" },
                { name: "parser", type: "Carbon.HTTP.Parser<T>", optional: true }
            ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
                expect(Request.Service.delete).toBeDefined();
                expect(Utils.isFunction(Request.Service.delete)).toBe(true);
                var promises = [];
                var promise;
                promise = Request.Service.delete("http://example.com/200", null, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.delete("http://example.com/200", options, parser);
                testPromise(promise);
                promises.push(promise.then(function (_a) {
                    var object = _a[0], response = _a[1];
                    testHTTPResponse(response);
                    expect(response.status).toEqual(200);
                    testHTTPResponseHeaders(response, responseFull.responseHeaders);
                    testHTTPResponseData(response, responseFull.responseText);
                    return parser.parse(responseFull.responseText).then(function (parsedObject) {
                        testDataParsed(object, parsedObject);
                    });
                }));
                promise = Request.Service.delete("http://example.com/404", null, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.NotFoundError).toBe(true);
                });
                promises.push(promise);
                promise = Request.Service.delete("http://example.com/500", options, parser);
                testPromise(promise);
                promise = promise.catch(function (exception) {
                    expect(exception instanceof Errors_1.InternalServerErrorError).toBe(true);
                });
                promises.push(promise);
                Promise.all(promises).then(done).catch(done.fail);
            });
        });
        function testPromise(promise) {
            expect(promise).toBeDefined();
            expect(promise instanceof Promise).toBeTruthy();
        }
        function testHTTPResponse(response) {
            expect(response).not.toBeNull();
            expect(response instanceof Response_1.default).toBeTruthy();
        }
        function testHTTPResponseHeaders(response, originalHeaders) {
            var headers = response.headers;
            for (var _i = 0, _a = Object.keys(originalHeaders); _i < _a.length; _i++) {
                var header = _a[_i];
                expect(headers.has(header.toLowerCase())).toBe(true);
                expect(headers.get(header.toLowerCase())).toEqual(new Header.Class(originalHeaders[header]));
            }
        }
        function testHTTPResponseData(response, originalData) {
            expect(response.data).toBeDefined();
            expect(response.data).toBe(originalData);
        }
        function testDataParsed(object, originalObject) {
            expect(object).toBeDefined();
            expect(object instanceof Object).toBe(true);
            expect(object).toEqual(originalObject);
        }
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.Request.Util", "Useful functions for manage the options object of a request"), function () {
        var options, optionsWithHeaders;
        beforeEach(function () {
            options = newOptionsObject();
            optionsWithHeaders = {
                headers: new Map()
                    .set("authorization", new Header.Class("Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=="))
                    .set("location", new Header.Class("http://example.com/resource/")),
                timeout: 5000,
                sendCredentialsOnCORS: false
            };
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(Request.Util).toBeDefined();
            expect(Utils.isFunction(Request.Util)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "getHeader", "Returns the header object of a header-name inside an options object request. Returns `undefined` if the header not exists. If `initialize` flag is provided with true, a empty header will be created even if it already exits", [
            { name: "headerName", type: "string" },
            { name: "requestOptions", type: "Object" },
            { name: "initialize", type: "boolean", optional: true, default: "false" }
        ], { type: "Carbon.HTTP.Header.Class" }), function () {
            expect(Request.Util.getHeader).toBeDefined();
            expect(Utils.isFunction(Request.Util.getHeader)).toBe(true);
            expect(Request.Util.getHeader("Authorization", optionsWithHeaders)).toEqual(new Header.Class("Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=="));
            expect(Request.Util.getHeader("Location", optionsWithHeaders)).toEqual(new Header.Class("http://example.com/resource/"));
            expect(Request.Util.getHeader("Other-header", optionsWithHeaders)).toBeUndefined();
            expect(Request.Util.getHeader("Authorization", options)).toBeUndefined();
            expect(Request.Util.getHeader("Other-header", optionsWithHeaders, true)).toEqual(new Header.Class());
            expect(Request.Util.getHeader("Authorization", options, true)).toEqual(new Header.Class());
            expect(Request.Util.getHeader("Authorization", optionsWithHeaders, true)).toEqual(new Header.Class("Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=="));
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "setAcceptHeader", "Set an Accept header in an options object request", [
            { name: "accept", type: "string" },
            { name: "requestOptions", type: "Object" }
        ], {
            type: "Object"
        }), function () {
            expect(Request.Util.setAcceptHeader).toBeDefined();
            expect(Utils.isFunction(Request.Util.setAcceptHeader)).toBe(true);
            options = Request.Util.setAcceptHeader("application/json", options);
            expect(Request.Util.getHeader("Accept", options)).toEqual(new Header.Class("application/json"));
            optionsWithHeaders = Request.Util.setAcceptHeader("application/json", optionsWithHeaders);
            expect(Request.Util.getHeader("Accept", optionsWithHeaders)).toEqual(new Header.Class("application/json"));
            expect(Request.Util.getHeader("Location", optionsWithHeaders)).toEqual(new Header.Class("http://example.com/resource/"));
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "setContentTypeHeader", "Set an Content-Type header in an options object request", [
            { name: "contentType", type: "string" },
            { name: "requestOptions", type: "Object" }
        ], {
            type: "Object"
        }), function () {
            expect(Request.Util.setContentTypeHeader).toBeDefined();
            expect(Utils.isFunction(Request.Util.setContentTypeHeader)).toBe(true);
            options = Request.Util.setContentTypeHeader("application/json", options);
            expect(Request.Util.getHeader("Content-Type", options)).toEqual(new Header.Class("application/json"));
            optionsWithHeaders = Request.Util.setContentTypeHeader("application/json", optionsWithHeaders);
            expect(Request.Util.getHeader("Content-Type", optionsWithHeaders)).toEqual(new Header.Class("application/json"));
            expect(Request.Util.getHeader("Location", optionsWithHeaders)).toEqual(new Header.Class("http://example.com/resource/"));
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "setIfMatchHeader", "Set a If-Match header in an options object request", [
            { name: "etag", type: "string" },
            { name: "requestOptions", type: "Object" }
        ], {
            type: "Object"
        }), function () {
            expect(Request.Util.setIfMatchHeader).toBeDefined();
            expect(Utils.isFunction(Request.Util.setIfMatchHeader)).toBe(true);
            options = Request.Util.setIfMatchHeader('W/"123456789"', options);
            expect(Request.Util.getHeader("If-Match", options)).toEqual(new Header.Class('W/"123456789"'));
            optionsWithHeaders = Request.Util.setIfMatchHeader('W/"123456789"', optionsWithHeaders);
            expect(Request.Util.getHeader("If-Match", optionsWithHeaders)).toEqual(new Header.Class('W/"123456789"'));
            expect(Request.Util.getHeader("Location", optionsWithHeaders)).toEqual(new Header.Class("http://example.com/resource/"));
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "setPreferredInteractionModel", "Set a Prefer header with `rel=interaction-model` in an options object request", [
            { name: "interactionModelURI", type: "string" },
            { name: "requestOptions", type: "Object" }
        ], {
            type: "Object"
        }), function () {
            expect(Request.Util.setPreferredInteractionModel).toBeDefined();
            expect(Utils.isFunction(Request.Util.setPreferredInteractionModel)).toBe(true);
            options = Request.Util.setPreferredInteractionModel("http://www.w3.org/ns/ldp#RDFSource", options);
            expect(Request.Util.getHeader("Prefer", options)).toEqual(new Header.Class("http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model"));
            optionsWithHeaders = Request.Util.setPreferredInteractionModel("http://www.w3.org/ns/ldp#RDFSource", optionsWithHeaders);
            expect(Request.Util.getHeader("Prefer", optionsWithHeaders)).toEqual(new Header.Class("http://www.w3.org/ns/ldp#RDFSource; rel=interaction-model"));
            expect(Request.Util.getHeader("Location", optionsWithHeaders)).toEqual(new Header.Class("http://example.com/resource/"));
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "setSlug", "Set a Slug header in an options object request", [
            { name: "slug", type: "string" },
            { name: "requestOptions", type: "Object" }
        ], {
            type: "Object"
        }), function () {
            expect(Request.Util.setSlug).toBeDefined();
            expect(Utils.isFunction(Request.Util.setSlug)).toBe(true);
            options = Request.Util.setSlug("a-slug-name", options);
            expect(Request.Util.getHeader("Slug", options)).toEqual(new Header.Class("a-slug-name"));
            optionsWithHeaders = Request.Util.setSlug("a-slug-name", optionsWithHeaders);
            expect(Request.Util.getHeader("Slug", optionsWithHeaders)).toEqual(new Header.Class("a-slug-name"));
            expect(Request.Util.getHeader("Location", optionsWithHeaders)).toEqual(new Header.Class("http://example.com/resource/"));
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "setContainerRetrievalPreferences", "Set a Prefer header with `return=representation` in an options object request", [
            { name: "preference", type: "Carbon.HTTP.Request.ContainerRetrievalPreferences" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options" },
            { name: "returnRepresentation", type: "boolean", optional: true, description: "If set to true, add `return=representation;` before include and/or omit. Default value is set to `true`." }
        ], {
            type: "Object"
        }), function () {
            expect(Request.Util.setContainerRetrievalPreferences).toBeDefined();
            expect(Utils.isFunction(Request.Util.setContainerRetrievalPreferences)).toBe(true);
            var preferencesEmpty = {};
            var preferencesIncludeNormal = {
                include: [
                    NS.LDP.Class.PreferMinimalContainer,
                    NS.LDP.Class.PreferMembership,
                ]
            };
            var preferencesIncludeString = "return=representation; include=\"" + NS.LDP.Class.PreferMinimalContainer + " " + NS.LDP.Class.PreferMembership + "\"";
            var preferencesIncludeStringNoRepresentatation = "include=\"" + NS.LDP.Class.PreferMinimalContainer + " " + NS.LDP.Class.PreferMembership + "\"";
            var preferencesIncludeEmpty = {
                include: []
            };
            var preferencesOmitNormal = {
                omit: [
                    NS.LDP.Class.PreferContainment,
                    NS.C.Class.PreferContainmentResources,
                    NS.C.Class.PreferMembershipResources,
                ]
            };
            var preferencesOmitString = "return=representation; omit=\"" + NS.LDP.Class.PreferContainment + " " + NS.C.Class.PreferContainmentResources + " " + NS.C.Class.PreferMembershipResources + "\"";
            var preferencesOmitStringNoRepresentatation = "omit=\"" + NS.LDP.Class.PreferContainment + " " + NS.C.Class.PreferContainmentResources + " " + NS.C.Class.PreferMembershipResources + "\"";
            var preferencesOmitEmpty = {
                omit: []
            };
            var preferencesFullNormal = {
                include: [
                    NS.LDP.Class.PreferMinimalContainer,
                    NS.LDP.Class.PreferMembership,
                ],
                omit: [
                    NS.LDP.Class.PreferContainment,
                    NS.C.Class.PreferContainmentResources,
                    NS.C.Class.PreferMembershipResources,
                ]
            };
            var preferencesFullString = "return=representation; include=\"" + NS.LDP.Class.PreferMinimalContainer + " " + NS.LDP.Class.PreferMembership + "\", return=representation; omit=\"" + NS.LDP.Class.PreferContainment + " " + NS.C.Class.PreferContainmentResources + " " + NS.C.Class.PreferMembershipResources + "\"";
            var preferencesFullStringNoRepresentatation = "include=\"" + NS.LDP.Class.PreferMinimalContainer + " " + NS.LDP.Class.PreferMembership + "\", omit=\"" + NS.LDP.Class.PreferContainment + " " + NS.C.Class.PreferContainmentResources + " " + NS.C.Class.PreferMembershipResources + "\"";
            var preferencesFullEmpty = {
                include: [],
                omit: []
            };
            options = Request.Util.setContainerRetrievalPreferences(preferencesEmpty, newOptionsObject());
            expect(Request.Util.getHeader("Prefer", options)).toEqual(new Header.Class());
            options = Request.Util.setContainerRetrievalPreferences(preferencesIncludeEmpty, newOptionsObject());
            expect(Request.Util.getHeader("Prefer", options)).toEqual(new Header.Class());
            options = Request.Util.setContainerRetrievalPreferences(preferencesOmitEmpty, newOptionsObject());
            expect(Request.Util.getHeader("Prefer", options)).toEqual(new Header.Class());
            options = Request.Util.setContainerRetrievalPreferences(preferencesFullEmpty, newOptionsObject());
            expect(Request.Util.getHeader("Prefer", options)).toEqual(new Header.Class());
            options = Request.Util.setContainerRetrievalPreferences(preferencesIncludeNormal, newOptionsObject());
            expect(Request.Util.getHeader("Prefer", options).toString()).toEqual(preferencesIncludeString);
            options = Request.Util.setContainerRetrievalPreferences(preferencesOmitNormal, newOptionsObject());
            expect(Request.Util.getHeader("Prefer", options).toString()).toEqual(preferencesOmitString);
            options = Request.Util.setContainerRetrievalPreferences(preferencesFullNormal, newOptionsObject());
            expect(Request.Util.getHeader("Prefer", options).toString()).toEqual(preferencesFullString);
            options = Request.Util.setContainerRetrievalPreferences(preferencesIncludeNormal, newOptionsObject(), false);
            expect(Request.Util.getHeader("Prefer", options).toString()).toEqual(preferencesIncludeStringNoRepresentatation);
            options = Request.Util.setContainerRetrievalPreferences(preferencesOmitNormal, newOptionsObject(), false);
            expect(Request.Util.getHeader("Prefer", options).toString()).toEqual(preferencesOmitStringNoRepresentatation);
            options = Request.Util.setContainerRetrievalPreferences(preferencesFullNormal, newOptionsObject(), false);
            expect(Request.Util.getHeader("Prefer", options).toString()).toEqual(preferencesFullStringNoRepresentatation);
        });
        function newOptionsObject() {
            return {
                timeout: 5000,
                sendCredentialsOnCORS: false
            };
        }
    });
});
