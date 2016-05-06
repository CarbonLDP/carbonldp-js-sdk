"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var Header = require("./Header");
var Response = require("./Response");
var Response_1 = require("./Response");
describe(JasmineExtender_1.module("Carbon/HTTP/Response"), function () {
    var rawResponse = {
        "status": 200,
        "responseText": "A body response",
        responseHeaders: {
            "Content-Type": "text/plain",
            "Server": "Apache/2.4.1 (Unix)",
            "ETag": 'W/"123456789"'
        }
    };
    var inXMLHttpRequest = (typeof XMLHttpRequest !== "undefined");
    it(JasmineExtender_1.isDefined(), function () {
        expect(Utils.isObject(Response)).toBe(true);
        expect(Response).toBeDefined();
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.Response.Class", "Class that represents an HTTP Response"), function () {
        beforeAll(function () {
            jasmine.Ajax.install();
            jasmine.Ajax.stubRequest("http://example.com/request/").andReturn(rawResponse);
        });
        afterAll(function () {
            jasmine.Ajax.uninstall();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(Response.Class).toBeDefined();
            expect(Utils.isFunction(Response.Class)).toBe(true);
        });
        describe(JasmineExtender_1.constructor(), function () {
            it(JasmineExtender_1.hasSignature("Signature that only works when working in a Browser.", [
                { name: "request", type: "XMLHttpRequest" }
            ]), function (done) {
                createResponse(function (response) {
                    expect(response).toBeDefined();
                    expect(response instanceof Response.Class).toBe(true);
                    done();
                }, done.fail);
            });
            it(JasmineExtender_1.hasSignature("Signature that only works when working in Node.js.", [
                { name: "request", type: "ClientRequest" },
                { name: "data", type: "string" },
                { name: "response", type: "IncomingMessage" }
            ]), function (done) {
                createResponse(function (response) {
                    expect(response).toBeDefined();
                    expect(response instanceof Response.Class).toBe(true);
                    done();
                }, done.fail);
            });
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "status", "number", "The status code returned by the request"), function (done) {
            createResponse(function (response) {
                expect(response.status).toBeDefined();
                expect(Utils.isNumber(response.status)).toBe(true);
                expect(response.status).toBe(rawResponse.status);
                done();
            }, done.fail);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "data", "string", "The body returned by the request"), function (done) {
            createResponse(function (response) {
                expect(response.data).toBeDefined();
                expect(Utils.isString(response.data)).toBe(true);
                expect(response.data).toBe(rawResponse.responseText);
                done();
            }, done.fail);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "headers", "Map<string, Carbon.HTTP.Header.Class>", "A map object containing the headers returned by the request"), function (done) {
            createResponse(function (response) {
                expect(response.headers).toBeDefined();
                expect(Utils.isMap(response.headers)).toBe(true);
                var objectKeys = Object.keys(rawResponse.responseHeaders);
                expect(response.headers.size).toBe(objectKeys.length);
                for (var _i = 0, objectKeys_1 = objectKeys; _i < objectKeys_1.length; _i++) {
                    var header = objectKeys_1[_i];
                    expect(response.getHeader(header)).toEqual(new Header.Class(rawResponse.responseHeaders[header]));
                }
                done();
            }, done.fail);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "request", "XMLHttpRequest | ClientRequest", "The XMLHttpRequest object that was provided in the constructor when working in a Browser, or The ClientRequest object when working with Node.js."), function (done) {
            createResponse(function (response, request) {
                expect(response.request).toBeDefined();
                if (inXMLHttpRequest)
                    expect(response.request instanceof XMLHttpRequest).toBe(true);
                else
                    expect(response.request instanceof require("http").ClientRequest).toBe(true);
                expect(response.request).toBe(request);
                done();
            }, done.fail);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getHeader", "Return the Header object referred by the name provided.", [
            { name: "name", type: "string" }
        ], { type: "Carbon.HTTP.Header.Class" }), function (done) {
            createResponse(function (response) {
                expect(response.getHeader).toBeDefined();
                expect(Utils.isFunction(response.getHeader)).toBe(true);
                var header = response.getHeader("Content-Type");
                expect(header instanceof Header.Class).toBe(true);
                done();
            }, done.fail);
        });
        function createResponse(callback, fail) {
            if (inXMLHttpRequest) {
                var request_1 = new XMLHttpRequest();
                request_1.open("GET", "http://example.com/request/");
                request_1.onerror = fail;
                request_1.onload = function () {
                    var response = new Response.Class(request_1);
                    callback(response, request_1);
                };
                request_1.send();
            }
            else {
                var http = require("http");
                var request_2 = http.request({
                    method: "GET",
                    protocol: "http:",
                    host: "example.com",
                    path: "/request/"
                }, function (res) {
                    res.setEncoding("utf8");
                    res.on("data", function (data) {
                        var response = new Response.Class(request_2, data, res);
                        callback(response, request_2);
                    });
                });
                request_2.on("error", fail);
                request_2.end();
            }
        }
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.Response.Util", "Class with useful methods to use with a `Carbon.HTTP.Response.Class` object"), function () {
        beforeAll(function () {
            jasmine.Ajax.install();
            jasmine.Ajax.stubRequest("http://example.com/request/full/").andReturn(rawResponse);
            jasmine.Ajax.stubRequest("http://example.com/request/empty/").andReturn({});
        });
        afterAll(function () {
            jasmine.Ajax.uninstall();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(Response.Util).toBeDefined();
            expect(Utils.isFunction(Response.Util)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "getETag", "Return the ETag string header of a `Carbon.HTTP.Response.Class` object. Returns null if no ETag exists", [
            { name: "response", type: "Carbon.HTTP.Response.Class" }
        ], { type: "string" }), function (done) {
            expect(Response.Util.getETag).toBeDefined();
            expect(Utils.isFunction(Response.Util.getETag)).toBe(true);
            var promises = [];
            promises.push(createResponse("full/", function (response) {
                expect(Response.Util.getETag(response)).toBe(rawResponse.responseHeaders["ETag"]);
            }));
            promises.push(createResponse("empty/", function (response) {
                expect(Response.Util.getETag(response)).toBeNull();
            }));
            Promise.all(promises).then(done).catch(done.fail);
        });
        function createResponse(type, callback) {
            return new Promise(function (resolve, reject) {
                if (inXMLHttpRequest) {
                    var request_3 = new XMLHttpRequest();
                    request_3.open("GET", "http://example.com/request/" + type);
                    request_3.onerror = reject;
                    request_3.onload = function () {
                        var response = new Response.Class(request_3);
                        callback(response);
                        resolve();
                    };
                    request_3.send();
                }
                else {
                    var http = require("http");
                    var request_4 = http.request({
                        method: "GET",
                        protocol: "http:",
                        host: "example.com",
                        path: "/request/" + type
                    }, function (res) {
                        var data = "";
                        res.setEncoding("utf8");
                        res.on("data", function (chunk) {
                            data = chunk;
                        });
                        res.on("end", function () {
                            var response = new Response.Class(request_4, data, res);
                            callback(response);
                            resolve();
                        });
                    });
                    request_4.on("error", reject);
                    request_4.end();
                }
            });
        }
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.HTTP.Response.Class"), function () {
        expect(Response_1.default).toBe(Response.Class);
    });
});
