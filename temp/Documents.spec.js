"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JasmineExtender_1 = require("./test/JasmineExtender");
var AbstractContext_1 = require("./AbstractContext");
var AccessPoint = require("./AccessPoint");
var Document = require("./Document");
var Documents_1 = require("./Documents");
var Errors = require("./Errors");
var HTTP = require("./HTTP");
var NS = require("./NS");
var PersistedDocument = require("./PersistedDocument");
var Pointer = require("./Pointer");
var SPARQL = require("./SPARQL");
var Utils = require("./Utils");
describe(JasmineExtender_1.module("Carbon/Documents", ""), function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });
    it(JasmineExtender_1.isDefined(), function () {
        expect(Documents_1.default).toBeDefined();
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "get", [
        { name: "uri", type: "string" }
    ], { type: "Promise<[ Carbon.PersistedDocument.Class, HTTP.Response.Class ]>" }), function (done) {
        var promises = [];
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        var responseBody = JSON.stringify({
            "@id": "http://example.com/resource/",
            "@graph": [
                {
                    "@id": "http://example.com/resource/",
                    "http://example.com/ns#string": [{ "@value": "Document Resource" }],
                    "http://example.com/ns#pointerSet": [
                        { "@id": "_:1" },
                        { "@id": "_:2" },
                        { "@id": "http://example.com/resource/#1" },
                        { "@id": "http://example.com/external-resource/" },
                    ],
                },
                {
                    "@id": "_:1",
                    "http://example.com/ns#string": [{ "@value": "Fragment 1" }],
                    "http://example.com/ns#pointerSet": [
                        { "@id": "http://example.com/resource/" },
                        { "@id": "http://example.com/resource/#1" },
                    ],
                },
                {
                    "@id": "_:2",
                    "http://example.com/ns#string": [{ "@value": "Fragment 2" }],
                },
                {
                    "@id": "http://example.com/resource/#1",
                    "http://example.com/ns#string": [{ "@value": "NamedFragment 1" }],
                },
                {
                    "@id": "http://example.com/resource/#2",
                    "http://example.com/ns#string": [{ "@value": "NamedFragment 1" }],
                },
            ],
        });
        var objectSchema = {
            "ex": "http://example.com/ns#",
            "xsd": "http://www.w3.org/2001/XMLSchema#",
            "string": {
                "@id": "ex:string",
                "@type": "xsd:string",
            },
            "date": {
                "@id": "ex:date",
                "@type": "xsd:dateTime",
            },
            "numberList": {
                "@id": "ex:numberList",
                "@type": "xsd:integer",
                "@container": "@list",
            },
            "languageMap": {
                "@id": "ex:languageMap",
                "@container": "@language",
            },
            "pointer": {
                "@id": "ex:pointer",
                "@type": "@id",
            },
            "pointerList": {
                "@id": "ex:pointerList",
                "@type": "@id",
                "@container": "@list",
            },
            "pointerSet": {
                "@id": "ex:pointerSet",
                "@type": "@id",
                "@container": "@set",
            },
        };
        context.extendObjectSchema(objectSchema);
        jasmine.Ajax.stubRequest("http://example.com/resource/", null, "GET").andReturn({
            status: 200,
            responseHeaders: {
                "ETag": "162458126348712643",
            },
            responseText: responseBody,
        });
        promises.push(documents.get("http://example.com/resource/").then(function (_a) {
            var document = _a[0], response = _a[1];
            expect(document).toBeDefined();
            expect(Utils.isObject(document)).toEqual(true);
            expect(response).toBeDefined();
            expect(Utils.isObject(response)).toEqual(true);
        }));
        Promise.all(promises).then(function () {
            done();
        }, function (error) {
            error = !!error ? error : new Error("Unknown error");
            done.fail(error);
        });
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "exists", "Returns a Promise with a boolean indicating if the resource exists or not.", [
        { name: "documentURI", type: "string" },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
    ], { type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>" }), function (done) {
        var promises = [];
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        var spies = {
            exists: function (_a) {
                var exists = _a[0], response = _a[1];
                expect(exists).toBe(true);
                expect(response instanceof HTTP.Response.Class).toBe(true);
            },
            notExists: function (_a) {
                var exists = _a[0], response = _a[1];
                expect(exists).toBe(false);
                expect(response instanceof HTTP.Response.Class).toBe(true);
            },
            fail: function (error) {
                expect(error instanceof HTTP.Errors.Error).toBe(true);
            }
        };
        var spyExists = spyOn(spies, "exists").and.callThrough();
        var spyNotExists = spyOn(spies, "notExists").and.callThrough();
        var spyFail = spyOn(spies, "fail").and.callThrough();
        jasmine.Ajax.stubRequest("http://example.com/resource/exists/", null, "HEAD").andReturn({
            status: 200
        });
        jasmine.Ajax.stubRequest("http://example.com/resource/not-exists/", null, "HEAD").andReturn({
            status: 404
        });
        jasmine.Ajax.stubRequest("http://example.com/resource/error/", null, "HEAD").andReturn({
            status: 500
        });
        var promise;
        promise = documents.exists("http://example.com/resource/exists/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.exists));
        promise = documents.exists("http://example.com/resource/not-exists/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.notExists));
        promise = documents.exists("http://example.com/resource/error/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.catch(spies.fail));
        Promise.all(promises).then(function () {
            expect(spyExists).toHaveBeenCalledTimes(1);
            expect(spyNotExists).toHaveBeenCalledTimes(1);
            expect(spyFail).toHaveBeenCalledTimes(1);
            done();
        }, done.fail);
    });
    describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "createChild"), function () {
        it(JasmineExtender_1.hasSignature("Create a child document for the respective parent source.", [
            { name: "parentURI", type: "string" },
            { name: "childDocument", type: "Carbon.Document.Class" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            var objectSchema = {
                "ex": "http://example.com/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "string": {
                    "@id": "ex:string",
                    "@type": "xsd:string",
                },
                "date": {
                    "@id": "ex:date",
                    "@type": "xsd:dateTime",
                },
                "numberList": {
                    "@id": "ex:numberList",
                    "@type": "xsd:integer",
                    "@container": "@list",
                },
                "languageMap": {
                    "@id": "ex:languageMap",
                    "@container": "@language",
                },
                "pointer": {
                    "@id": "ex:pointer",
                    "@type": "@id",
                },
                "pointerList": {
                    "@id": "ex:pointerList",
                    "@type": "@id",
                    "@container": "@list",
                },
                "pointerSet": {
                    "@id": "ex:pointerSet",
                    "@type": "@id",
                    "@container": "@set",
                },
            };
            var childDocument = Document.Factory.create();
            var fragment1 = childDocument.createFragment();
            var fragment2 = childDocument.createFragment();
            var namedFragment1 = childDocument.createFragment("1");
            var namedFragment2 = childDocument.createFragment("2");
            childDocument.string = "Some string";
            childDocument.date = new Date();
            childDocument.pointerList = [fragment1, fragment2];
            childDocument.pointerSet = [fragment1, namedFragment1];
            namedFragment2.pointer = childDocument;
            context.extendObjectSchema(objectSchema);
            jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                status: 200,
                responseHeaders: {
                    "Location": "http://example.com/parent-resource/new-resource/",
                },
            });
            promises.push(documents.createChild("http://example.com/parent-resource/", childDocument).then(function (response) {
                expect(response).toBeDefined();
            }));
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                error = !!error ? error : new Error("Unknown error");
                done.fail(error);
            });
        });
        it(JasmineExtender_1.hasSignature("Create a child document for the respective parent source.", [
            { name: "parentURI", type: "string" },
            { name: "slug", type: "string" },
            { name: "childDocument", type: "Carbon.Document.Class" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            var objectSchema = {
                "ex": "http://example.com/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "string": {
                    "@id": "ex:string",
                    "@type": "xsd:string",
                },
                "date": {
                    "@id": "ex:date",
                    "@type": "xsd:dateTime",
                },
                "numberList": {
                    "@id": "ex:numberList",
                    "@type": "xsd:integer",
                    "@container": "@list",
                },
                "languageMap": {
                    "@id": "ex:languageMap",
                    "@container": "@language",
                },
                "pointer": {
                    "@id": "ex:pointer",
                    "@type": "@id",
                },
                "pointerList": {
                    "@id": "ex:pointerList",
                    "@type": "@id",
                    "@container": "@list",
                },
                "pointerSet": {
                    "@id": "ex:pointerSet",
                    "@type": "@id",
                    "@container": "@set",
                },
            };
            var childDocument = Document.Factory.create();
            var fragment1 = childDocument.createFragment();
            var fragment2 = childDocument.createFragment();
            var namedFragment1 = childDocument.createFragment("1");
            var namedFragment2 = childDocument.createFragment("2");
            childDocument.string = "Some string";
            childDocument.date = new Date();
            childDocument.pointerList = [fragment1, fragment2];
            childDocument.pointerSet = [fragment1, namedFragment1];
            namedFragment2.pointer = childDocument;
            context.extendObjectSchema(objectSchema);
            jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                status: 200,
                responseHeaders: {
                    "Location": "http://example.com/parent-resource/new-resource/",
                },
            });
            promises.push(documents.createChild("http://example.com/parent-resource/", "child-document", childDocument).then(function (response) {
                expect(response).toBeDefined();
            }));
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                error = !!error ? error : new Error("Unknown error");
                done.fail(error);
            });
        });
        it(JasmineExtender_1.hasSignature("Create a child document for the respective parent source.", [
            { name: "parentURI", type: "string" },
            { name: "childObject", type: "Object" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            var objectSchema = {
                "ex": "http://example.com/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "string": {
                    "@id": "ex:string",
                    "@type": "xsd:string",
                },
                "date": {
                    "@id": "ex:date",
                    "@type": "xsd:dateTime",
                },
                "numberList": {
                    "@id": "ex:numberList",
                    "@type": "xsd:integer",
                    "@container": "@list",
                },
                "languageMap": {
                    "@id": "ex:languageMap",
                    "@container": "@language",
                },
                "pointer": {
                    "@id": "ex:pointer",
                    "@type": "@id",
                },
                "pointerList": {
                    "@id": "ex:pointerList",
                    "@type": "@id",
                    "@container": "@list",
                },
                "pointerSet": {
                    "@id": "ex:pointerSet",
                    "@type": "@id",
                    "@container": "@set",
                },
            };
            var childObject = {
                string: "The ONE string",
                date: new Date(),
                pointerList: [
                    {
                        slug: "Fragment_1",
                        string: "The Named Fragment"
                    },
                    {
                        id: "_:Fragment_2",
                        string: "The Blank Node"
                    }
                ],
                pointer: {
                    id: "#Fragment_1",
                    string: "The real Named Fragment"
                }
            };
            context.extendObjectSchema(objectSchema);
            jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                status: 200,
                responseHeaders: {
                    "Location": "http://example.com/parent-resource/new-resource/",
                },
            });
            promises.push(documents.createChild("http://example.com/parent-resource/", childObject).then(function (_a) {
                var pointer = _a[0], response = _a[1];
                expect(Pointer.Factory.is(pointer)).toBe(true);
            }));
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                error = !!error ? error : new Error("Unknown error");
                done.fail(error);
            });
        });
        it(JasmineExtender_1.hasSignature("Create a child document for the respective parent source.", [
            { name: "parentURI", type: "string" },
            { name: "slug", type: "string" },
            { name: "childObject", type: "Object" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            var objectSchema = {
                "ex": "http://example.com/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "string": {
                    "@id": "ex:string",
                    "@type": "xsd:string",
                },
                "date": {
                    "@id": "ex:date",
                    "@type": "xsd:dateTime",
                },
                "numberList": {
                    "@id": "ex:numberList",
                    "@type": "xsd:integer",
                    "@container": "@list",
                },
                "languageMap": {
                    "@id": "ex:languageMap",
                    "@container": "@language",
                },
                "pointer": {
                    "@id": "ex:pointer",
                    "@type": "@id",
                },
                "pointerList": {
                    "@id": "ex:pointerList",
                    "@type": "@id",
                    "@container": "@list",
                },
                "pointerSet": {
                    "@id": "ex:pointerSet",
                    "@type": "@id",
                    "@container": "@set",
                },
            };
            var childObject = {
                string: "The ONE string",
                date: new Date(),
                pointerList: [
                    {
                        slug: "Fragment_1",
                        string: "The Named Fragment"
                    },
                    {
                        id: "_:Fragment_2",
                        string: "The Blank Node"
                    }
                ],
                pointer: {
                    id: "#Fragment_1",
                    string: "The real Named Fragment"
                }
            };
            context.extendObjectSchema(objectSchema);
            jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                status: 200,
                responseHeaders: {
                    "Location": "http://example.com/parent-resource/new-resource/",
                },
            });
            promises.push(documents.createChild("http://example.com/parent-resource/", "child-document", childObject).then(function (response) {
                expect(response).toBeDefined();
            }));
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                error = !!error ? error : new Error("Unknown error");
                done.fail(error);
            });
        });
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "listChildren", "Return all the children of the container specified.", [
        { name: "parentURI", type: "string", description: "URI of the document container to look for their children." },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
    ], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response ]>" }), function (done) {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return "http://example.com/" + uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        expect(documents.listChildren).toBeDefined();
        expect(Utils.isFunction(documents.listChildren)).toBe(true);
        jasmine.Ajax.stubRequest("http://example.com/empty-resource/", null, "GET").andReturn({
            status: 200,
            responseText: "[]"
        });
        jasmine.Ajax.stubRequest("http://example.com/another-empty-resource/", null, "GET").andReturn({
            status: 200,
            responseText: "[\n\t\t\t  {\n\t\t\t    \"@graph\": [\n\t\t\t      {\n\t\t\t        \"@id\": \"http://example.com/resource/\",\n\t\t\t        \"http://www.w3.org/ns/ldp#contains\": []\n\t\t\t      }\n\t\t\t    ],\n\t\t\t    \"@id\": \"http://example.com/resource/\"\n\t\t\t  }\n\t\t\t]"
        });
        jasmine.Ajax.stubRequest("http://example.com/another-another-empty-resource/", null, "GET").andReturn({
            status: 200,
            responseText: "[\n\t\t\t  {\n\t\t\t    \"@graph\": [\n\t\t\t      {\n\t\t\t        \"@id\": \"http://example.com/resource/\"\n\t\t\t      }\n\t\t\t    ],\n\t\t\t    \"@id\": \"http://example.com/resource/\"\n\t\t\t  }\n\t\t\t]"
        });
        jasmine.Ajax.stubRequest("http://example.com/resource/", null, "GET").andReturn({
            status: 200,
            responseText: "[\n\t\t\t  {\n\t\t\t    \"@graph\": [\n\t\t\t      {\n\t\t\t        \"@id\": \"http://example.com/resource/\",\n\t\t\t        \"http://www.w3.org/ns/ldp#contains\": [\n\t\t\t          {\n\t\t\t            \"@id\": \"http://example.com/resource/pointer-01/\"\n\t\t\t          },\n\t\t\t          {\n\t\t\t            \"@id\": \"http://example.com/resource/pointer-02/\"\n\t\t\t          }\n\t\t\t        ]\n\t\t\t      }\n\t\t\t    ],\n\t\t\t    \"@id\": \"http://example.com/resource/\"\n\t\t\t  }\n\t\t\t]"
        });
        var spies = {
            success: function (_a) {
                var pointers = _a[0], response = _a[1];
                expect(pointers).toBeDefined();
                expect(Utils.isArray(pointers)).toBe(true);
                expect(pointers.length).toBe(2);
                expect(Pointer.Factory.is(pointers[0])).toBe(true);
                expect(pointers[0].id).toBe("http://example.com/resource/pointer-01/");
                expect(Pointer.Factory.is(pointers[1])).toBe(true);
                expect(pointers[1].id).toBe("http://example.com/resource/pointer-02/");
                expect(response).toBeDefined();
                expect(response instanceof HTTP.Response.Class).toBe(true);
            },
            successEmpty: function (_a) {
                var pointers = _a[0], response = _a[1];
                expect(pointers).toBeDefined();
                expect(Utils.isArray(pointers)).toBe(true);
                expect(pointers.length).toBe(0);
                expect(response).toBeDefined();
                expect(response instanceof HTTP.Response.Class).toBe(true);
            },
            fail: function (error) {
                expect(error).toBeDefined();
                expect(error instanceof Errors.IllegalArgumentError).toBe(true);
            }
        };
        var spySuccess = spyOn(spies, "success").and.callThrough();
        var spyEmpty = spyOn(spies, "successEmpty").and.callThrough();
        var spyFail = spyOn(spies, "fail").and.callThrough();
        var promises = [];
        var promise;
        promise = documents.listChildren("resource/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.success));
        promise = documents.listChildren("empty-resource/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.successEmpty));
        promise = documents.listChildren("another-empty-resource/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.successEmpty));
        promise = documents.listChildren("another-another-empty-resource/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.successEmpty));
        Promise.all(promises).then(function () {
            expect(spySuccess).toHaveBeenCalledTimes(1);
            expect(spyEmpty).toHaveBeenCalledTimes(3);
            expect(spyFail).not.toHaveBeenCalled();
            done();
        }).catch(done.fail);
    });
    describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "getChildren", "Retrieves and resolve all the children of a specified document."), function () {
        var documents;
        beforeEach(function () {
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return "http://example.com/" + uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            context.extendObjectSchema({
                "ex": "http://example.com/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "string": {
                    "@id": "ex:string",
                    "@type": "xsd:string",
                },
                "pointer": {
                    "@id": "ex:pointer",
                    "@type": "@id",
                },
            });
            documents = context.documents;
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(documents.getChildren).toBeDefined();
            expect(Utils.isFunction(documents.getChildren)).toBe(true);
        });
        function stubListRequest(resource) {
            jasmine.Ajax.stubRequest(new RegExp(resource), null, "GET").andReturn({
                status: 200,
                responseText: "[\n\t\t\t\t\t{\n\t\t\t\t\t    \"@id\": \"_:00\",\n\t\t\t\t\t    \"@type\": [\n\t\t\t\t\t      \"https://carbonldp.com/ns/v1/platform#ResponseDescription\",\n\t\t\t\t\t      \"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t    ],\n\t\t\t\t\t    \"https://carbonldp.com/ns/v1/platform#responseProperty\": [{\n\t\t\t\t\t\t\t\"@id\": \"_:01\"\n\t\t\t\t\t\t}, {\n\t\t\t\t\t\t\t\"@id\": \"_:02\"\n\t\t\t\t\t\t}]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t    \"@id\": \"_:01\",\n\t\t\t\t\t    \"@type\": [\n\t\t\t\t\t        \"https://carbonldp.com/ns/v1/platform#ResponseMetaData\",\n\t\t\t\t\t        \"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t    ],\n\t\t\t\t\t    \"https://carbonldp.com/ns/v1/platform#eTag\": [{\n\t\t\t\t\t        \"@value\": \"\\\"1234567890\\\"\"\n\t\t\t\t\t    }],\n\t\t\t\t\t    \"https://carbonldp.com/ns/v1/platform#responsePropertyResource\": [{\n\t\t\t\t\t        \"@id\": \"http://example.com/resource/element-01/\"\n\t\t\t\t\t    }]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"_:02\",\n\t\t\t\t\t\t\"@type\": [\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#ResponseMetaData\",\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t\t],\n\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#eTag\": [{\n\t\t\t\t\t\t\t\"@value\": \"\\\"0987654321\\\"\"\n\t\t\t\t\t\t}],\n\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#responsePropertyResource\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-02/\"\n\t\t\t\t\t\t}]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/" + resource + "/\",\n\t\t\t\t\t\t\"@graph\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/" + resource + "/\",\n\t\t\t\t\t        \"http://www.w3.org/ns/ldp#contains\": [{\n\t\t\t\t\t            \"@id\": \"http://example.com/resource/element-01/\"\n\t\t\t\t\t        }, {\n\t\t\t\t\t            \"@id\": \"http://example.com/resource/element-02/\"\n\t\t\t\t\t        }]\n\t\t\t\t\t    }]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-01/\",\n\t\t\t\t\t\t\"@graph\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-01/\",\n\t\t\t\t\t\t\t\"@type\": [ \"http://www.w3.org/ns/ldp#BasicContainer\" ],\n\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Document of resource 01\" }],\n\t\t\t\t\t\t\t\"http://example.com/ns#pointer\": [\n\t\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/resource/element-01/#1\" }\n\t\t\t\t\t\t\t]\n\t\t\t\t\t    }, {\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-01/#1\",\n\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"NamedFragment of resource 01\" }]\n\t\t\t\t\t    }]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-02/\",\n\t\t\t\t\t\t\"@graph\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-02/\",\n\t\t\t\t\t\t\t\"@type\": [ \"http://www.w3.org/ns/ldp#BasicContainer\" ],\n\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Document of resource 02\" }],\n\t\t\t\t\t\t\t\"http://example.com/ns#pointer\": [\n\t\t\t\t\t\t\t\t{ \"@id\": \"_:01\" }\n\t\t\t\t\t\t\t]\n\t\t\t\t\t    }, {\n\t\t\t\t\t\t\t\"@id\": \"_:01\",\n\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"BlankNode of resource 02\" }]\n\t\t\t\t\t    }]\n\t\t\t\t\t}\n\t\t\t\t]"
            });
        }
        function checkResponse(pointers, response) {
            expect(pointers).toBeDefined();
            expect(Utils.isArray(pointers)).toBe(true);
            expect(pointers.length).toBe(2);
            expect(Pointer.Util.getIDs(pointers)).toEqual(["http://example.com/resource/element-01/", "http://example.com/resource/element-02/"]);
            expect(pointers[0].id).toBe("http://example.com/resource/element-01/");
            expect(pointers[0].isResolved()).toBe(true);
            expect(pointers[0]["_etag"]).toBe("\"1234567890\"");
            expect(pointers[0]["string"]).toBe("Document of resource 01");
            expect(pointers[0]["pointer"]).toBeDefined();
            expect(pointers[0]["pointer"]["id"]).toBe("http://example.com/resource/element-01/#1");
            expect(pointers[0]["pointer"]["string"]).toBe("NamedFragment of resource 01");
            expect(pointers[1].id).toBe("http://example.com/resource/element-02/");
            expect(pointers[1].isResolved()).toBe(true);
            expect(pointers[1]["_etag"]).toBe("\"0987654321\"");
            expect(pointers[1]["string"]).toBe("Document of resource 02");
            expect(pointers[1]["pointer"]).toBeDefined();
            expect(pointers[1]["pointer"]["id"]).toBe("_:01");
            expect(pointers[1]["pointer"]["string"]).toBe("BlankNode of resource 02");
            expect(response).toBeDefined();
            expect(response instanceof HTTP.Response.Class).toBe(true);
        }
        function getPrefers(request) {
            var prefers = [];
            var types = ["include", "omit"];
            var _loop_1 = function(index) {
                var preferType = "return=representation; " + types[index] + "=";
                var prefersValues = new HTTP.Header.Class(request.requestHeaders["prefer"]);
                var preferInclude = prefersValues.values.find(function (value) {
                    return value.toString().startsWith(preferType);
                });
                prefers[index] = preferInclude.toString().substring(preferType.length + 1, preferInclude.toString().length - 1).split(" ");
            };
            for (var index in types) {
                _loop_1(index);
            }
            return prefers;
        }
        function checkPrefer(request, nonReadable) {
            if (nonReadable === void 0) { nonReadable = true; }
            var includes = null;
            var omits = null;
            expect(request.requestHeaders["prefer"]).toBeDefined();
            _a = getPrefers(request), includes = _a[0], omits = _a[1];
            expect(includes).toContain(NS.LDP.Class.PreferContainment);
            expect(includes).toContain(NS.C.Class.PreferContainmentResources);
            expect(omits).toContain(NS.LDP.Class.PreferMembership);
            expect(omits).toContain(NS.C.Class.PreferMembershipResources);
            var _a;
        }
        it(JasmineExtender_1.hasSignature("Retrieves all the children of a document and their content, where you can specify the retrieval preferences and the options for the request.", [
            { name: "parentURI", type: "string", description: "URI of the document to ask its children." },
            { name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object for specify the retrieval preferences for the request." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
        ], { type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>" }), function (done) {
            var promises = [];
            (function () {
                stubListRequest("resource-1/");
                var options = { timeout: 12345 };
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getChildren("resource-1/", retrievalPreferences, options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-1/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request);
                }));
            })();
            (function () {
                stubListRequest("resource-2/");
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getChildren("resource-2/", retrievalPreferences);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-2/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request);
                }));
            })();
            (function () {
                jasmine.Ajax.stubRequest(new RegExp("resource-3/"), null, "GET").andReturn({
                    status: 200,
                    responseText: "[]"
                });
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getChildren("resource-3/", retrievalPreferences);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    expect(pointers).toBeDefined();
                    expect(Utils.isArray(pointers)).toBeDefined();
                    expect(pointers.length).toBe(0);
                    expect(response).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-3/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-3/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request);
                }));
            })();
            (function () {
                jasmine.Ajax.stubRequest(new RegExp("resource-4/"), null, "GET").andReturn({
                    status: 200,
                    responseText: "{}"
                });
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getChildren("resource-4/", retrievalPreferences);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    expect(pointers).toBeDefined();
                    expect(Utils.isArray(pointers)).toBeDefined();
                    expect(pointers.length).toBe(0);
                    expect(response).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-4/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-4/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request);
                }));
            })();
            Promise.all(promises).then(done).catch(done.fail);
        });
        it(JasmineExtender_1.hasSignature("Retrieves all the children of a document and their content, where you can specify options for the request.", [
            { name: "parentURI", type: "string", description: "URI of the document to ask its children." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
        ], { type: "Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>" }), function (done) {
            var promises = [];
            (function () {
                stubListRequest("resource-1/");
                var options = { timeout: 12345 };
                var promise = documents.getChildren("resource-1/", options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-1/)[0];
                    expect(request.url).toMatch("resource-1/");
                    checkPrefer(request);
                }));
            })();
            (function () {
                stubListRequest("resource-2/");
                var promise = documents.getChildren("resource-2/");
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-2/)[0];
                    expect(request.url).toMatch("resource-2/");
                    checkPrefer(request);
                }));
            })();
            (function () {
                jasmine.Ajax.stubRequest(new RegExp("resource-3/"), null, "GET").andReturn({
                    status: 200,
                    responseText: "[]"
                });
                var promise = documents.getChildren("resource-3/");
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    expect(pointers).toBeDefined();
                    expect(Utils.isArray(pointers)).toBeDefined();
                    expect(pointers.length).toBe(0);
                    expect(response).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-3/)[0];
                    expect(request.url.indexOf("resource-3/")).not.toBe(-1);
                    checkPrefer(request);
                }));
            })();
            (function () {
                jasmine.Ajax.stubRequest(new RegExp("resource-4/"), null, "GET").andReturn({
                    status: 200,
                    responseText: "{}"
                });
                var promise = documents.getChildren("resource-4/");
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    expect(pointers).toBeDefined();
                    expect(Utils.isArray(pointers)).toBeDefined();
                    expect(pointers.length).toBe(0);
                    expect(response).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-4/)[0];
                    expect(request.url.indexOf("resource-4/")).not.toBe(-1);
                    checkPrefer(request);
                }));
            })();
            Promise.all(promises).then(done).catch(done.fail);
        });
    });
    describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "createAccessPoint"), function () {
        it(JasmineExtender_1.hasSignature("Create an AccessPoint of the document.", [
            { name: "documentURI", type: "string" },
            { name: "accessPoint", type: "Carbon.AccessPoint.Class" },
            { name: "slug", type: "string", optional: true },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            var spy = {
                success: function (_a) {
                    var pointer = _a[0], response = _a[1];
                    expect(pointer.id).toBe("http://example.com/parent-resource/access-point/");
                },
                fail: function (error) {
                    expect(error instanceof Errors.IllegalArgumentError).toBe(true);
                }
            };
            var spySuccess = spyOn(spy, "success").and.callThrough();
            var spyFail = spyOn(spy, "fail").and.callThrough();
            jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                status: 200,
                responseHeaders: {
                    "Location": "http://example.com/parent-resource/access-point/",
                },
            });
            var membershipResource = Pointer.Factory.create("http://example.com/parent-resource/");
            var promise;
            var accessPoint;
            accessPoint = AccessPoint.Factory.create(membershipResource, "http://example.com/myNamespace#some-relation");
            promise = documents.createAccessPoint("http://example.com/parent-resource/", accessPoint, "access-point");
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.then(spy.success));
            accessPoint = AccessPoint.Factory.create(membershipResource, "http://example.com/myNamespace#some-relation");
            promise = documents.createAccessPoint("http://example.com/parent-resource/", accessPoint);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.then(spy.success));
            promise = documents.createAccessPoint("http://example.com/the-bad-parent-resource/", accessPoint);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.catch(spy.fail));
            accessPoint.id = "http://example.com/bad-access-point-id/";
            promise = documents.createAccessPoint("http://example.com/parent-resource/", accessPoint);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.catch(spy.fail));
            accessPoint.id = "";
            var persisted = PersistedDocument.Factory.decorate(accessPoint, documents);
            promise = documents.createAccessPoint("http://example.com/parent-resource/", persisted);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.catch(spy.fail));
            Promise.all(promises).then(function () {
                expect(spySuccess).toHaveBeenCalledTimes(2);
                expect(spyFail).toHaveBeenCalledTimes(3);
                done();
            }, done.fail);
        });
        it(JasmineExtender_1.hasSignature("Create an AccessPoint of the document.", [
            { name: "accessPoint", type: "Carbon.AccessPoint.Class" },
            { name: "slug", type: "string", optional: true },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            var spy = {
                success: function (_a) {
                    var pointer = _a[0], response = _a[1];
                    expect(pointer.id).toBe("http://example.com/parent-resource/access-point/");
                },
                fail: function (error) {
                    expect(error instanceof Errors.IllegalArgumentError).toBe(true);
                }
            };
            var spySuccess = spyOn(spy, "success").and.callThrough();
            var spyFail = spyOn(spy, "fail").and.callThrough();
            jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                status: 200,
                responseHeaders: {
                    "Location": "http://example.com/parent-resource/access-point/",
                },
            });
            var membershipResource = Pointer.Factory.create("http://example.com/parent-resource/");
            var promise;
            var accessPoint;
            accessPoint = AccessPoint.Factory.create(membershipResource, "http://example.com/myNamespace#some-relation");
            promise = documents.createAccessPoint(accessPoint, "access-point");
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.then(spy.success));
            accessPoint = AccessPoint.Factory.create(membershipResource, "http://example.com/myNamespace#some-relation");
            promise = documents.createAccessPoint(accessPoint);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.then(spy.success));
            accessPoint.id = "http://example.com/bad-access-point-id/";
            promise = documents.createAccessPoint(accessPoint);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.catch(spy.fail));
            accessPoint.id = "";
            var persisted = PersistedDocument.Factory.decorate(accessPoint, documents);
            promise = documents.createAccessPoint(persisted);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise.catch(spy.fail));
            Promise.all(promises).then(function () {
                expect(spySuccess).toHaveBeenCalledTimes(2);
                expect(spyFail).toHaveBeenCalledTimes(2);
                done();
            }, done.fail);
        });
    });
    describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "upload"), function () {
        it(JasmineExtender_1.hasSignature("Upload a binary data to the server, creating a child for the parent specified. This signature it's only when working in a Browser.", [
            { name: "parentURI", type: "string" },
            { name: "data", type: "Blob" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            expect(documents.upload).toBeDefined();
            expect(Utils.isFunction(documents.upload)).toBe(true);
            if (typeof Blob !== "undefined") {
                var spy = {
                    success: function (response) {
                        expect(response).toBeDefined();
                        expect(Utils.isArray(response)).toBe(true);
                        expect(response.length).toBe(2);
                        var pointer = response[0];
                        expect(pointer.id).toBe("http://example.com/parent-resource/new-auto-generated-id/");
                    }
                };
                var spySuccess_1 = spyOn(spy, "success").and.callThrough();
                var blob = new Blob([JSON.stringify({ "some content": "for the blob." })], { type: "application/json" });
                jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                    status: 200,
                    responseHeaders: {
                        "Location": "http://example.com/parent-resource/new-auto-generated-id/",
                    },
                });
                promises.push(documents.upload("http://example.com/parent-resource/", blob).then(spy.success));
                Promise.all(promises).then(function () {
                    expect(spySuccess_1).toHaveBeenCalled();
                    done();
                }, done.fail);
            }
            else {
                done();
            }
        });
        it(JasmineExtender_1.hasSignature("Upload a binary data to the server, creating a child for the parent specified. This signature it's only when working in a Browser.", [
            { name: "parentURI", type: "string" },
            { name: "slug", type: "string" },
            { name: "data", type: "Blob" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            expect(documents.upload).toBeDefined();
            expect(Utils.isFunction(documents.upload)).toBe(true);
            if (typeof Blob !== "undefined") {
                var spy = {
                    success: function (response) {
                        expect(response).toBeDefined();
                        expect(Utils.isArray(response)).toBe(true);
                        expect(response.length).toBe(2);
                        var pointer = response[0];
                        expect(pointer.id).toBe("http://example.com/parent-resource/slug-id/");
                    }
                };
                var spySuccess_2 = spyOn(spy, "success").and.callThrough();
                var blob = new Blob([JSON.stringify({ "some content": "for the blob." })], { type: "application/json" });
                jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                    status: 200,
                    responseHeaders: {
                        "Location": "http://example.com/parent-resource/slug-id/",
                    },
                });
                promises.push(documents.upload("http://example.com/parent-resource/", "slug-id", blob).then(spy.success));
                Promise.all(promises).then(function () {
                    expect(spySuccess_2).toHaveBeenCalled();
                    done();
                }, done.fail);
            }
            else {
                done();
            }
        });
        it(JasmineExtender_1.hasSignature("Upload a binary data to the server, creating a child for the parent specified. This signature it's only when working in Node.js.", [
            { name: "parentURI", type: "string" },
            { name: "data", type: "Buffer" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            expect(documents.upload).toBeDefined();
            expect(Utils.isFunction(documents.upload)).toBe(true);
            if (typeof Buffer !== "undefined") {
                var spy = {
                    success: function (response) {
                        expect(response).toBeDefined();
                        expect(Utils.isArray(response)).toBe(true);
                        expect(response.length).toBe(2);
                        var pointer = response[0];
                        expect(pointer.id).toBe("http://example.com/parent-resource/new-auto-generated-id/");
                    }
                };
                var spySuccess_3 = spyOn(spy, "success").and.callThrough();
                var buffer = new Buffer(JSON.stringify({ "some content": "for the buffer." }));
                jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                    status: 200,
                    responseHeaders: {
                        "Location": "http://example.com/parent-resource/new-auto-generated-id/",
                    },
                });
                promises.push(documents.upload("http://example.com/parent-resource/", buffer).then(spy.success));
                Promise.all(promises).then(function () {
                    expect(spySuccess_3).toHaveBeenCalled();
                    done();
                }, done.fail);
            }
            else {
                done();
            }
        });
        it(JasmineExtender_1.hasSignature("Upload a binary data to the server, creating a child for the parent specified. This signature it's only when working in Node.js.", [
            { name: "parentURI", type: "string" },
            { name: "slug", type: "string" },
            { name: "data", type: "Buffer" },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
        ], { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function (done) {
            var promises = [];
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            var documents = context.documents;
            expect(documents.upload).toBeDefined();
            expect(Utils.isFunction(documents.upload)).toBe(true);
            if (typeof Buffer !== "undefined") {
                var spy = {
                    success: function (response) {
                        expect(response).toBeDefined();
                        expect(Utils.isArray(response)).toBe(true);
                        expect(response.length).toBe(2);
                        var pointer = response[0];
                        expect(pointer.id).toBe("http://example.com/parent-resource/new-auto-generated-id/");
                    }
                };
                var spySuccess_4 = spyOn(spy, "success").and.callThrough();
                var buffer = new Buffer(JSON.stringify({ "some content": "for the buffer." }));
                jasmine.Ajax.stubRequest("http://example.com/parent-resource/", null, "POST").andReturn({
                    status: 200,
                    responseHeaders: {
                        "Location": "http://example.com/parent-resource/new-auto-generated-id/",
                    },
                });
                promises.push(documents.upload("http://example.com/parent-resource/", "slug-id", buffer).then(spy.success));
                Promise.all(promises).then(function () {
                    expect(spySuccess_4).toHaveBeenCalled();
                    done();
                }, done.fail);
            }
            else {
                done();
            }
        });
    });
    describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "listMembers", "Retrieves (but doesn't resolve) all the members of the document."), function () {
        var documents;
        beforeEach(function () {
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return "http://example.com/" + uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            documents = context.documents;
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(documents.listMembers).toBeDefined();
            expect(Utils.isFunction(documents.listMembers)).toBe(true);
        });
        it(JasmineExtender_1.hasSignature("Retrieves all the members of a document with out resolving them, where you can specify if the response should include the Non Readable resources and options for the request.", [
            { name: "uri", type: "string", description: "URI of the document to ask its members." },
            { name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the the response should include the Non Readable resources. By default this is set to `true`." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
        ], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }), function (done) {
            var promises = [];
            (function () {
                stubListRequest("resource-1/");
                var options = { timeout: 12345 };
                var promise = documents.listMembers("resource-1/", true, options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-1/)[0];
                    expect(request.url).toMatch("resource-1/");
                    checkPrefer(request, "include");
                }));
            })();
            (function () {
                stubListRequest("resource-2/");
                var options = { timeout: 12345 };
                var promise = documents.listMembers("resource-2/", false, options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-2/)[0];
                    expect(request.url).toMatch("resource-2/");
                    checkPrefer(request, "omit");
                }));
            })();
            (function () {
                stubListRequest("resource-3/");
                var promise = documents.listMembers("resource-3/", true);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-3/)[0];
                    expect(request.url).toMatch("resource-3/");
                    checkPrefer(request, "include");
                }));
            })();
            (function () {
                stubListRequest("resource-4/");
                var promise = documents.listMembers("resource-4/", false);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-4/)[0];
                    expect(request.url).toMatch("resource-4/");
                    checkPrefer(request, "omit");
                }));
            })();
            (function () {
                stubListRequest("resource-5/");
                var promise = documents.listMembers("resource-5/");
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-5/)[0];
                    expect(request.url).toMatch("resource-5/");
                    checkPrefer(request, "include");
                }));
            })();
            Promise.all(promises).then(done).catch(done.fail);
        });
        it(JasmineExtender_1.hasSignature("Retrieves all the members of a document with out resolving them, where you can specify options for the request.", [
            { name: "uri", type: "string", description: "URI of the document to ask its members." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
        ], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }), function (done) {
            var promises = [];
            (function () {
                stubListRequest("resource-1/");
                var options = { timeout: 12345 };
                var promise = documents.listMembers("resource-1/", options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-1/)[0];
                    expect(request.url).toMatch("resource-1/");
                    checkPrefer(request, "include");
                }));
            })();
            (function () {
                stubListRequest("resource-2/");
                var promise = documents.listMembers("resource-2/");
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-2/)[0];
                    expect(request.url).toMatch("resource-2/");
                    checkPrefer(request, "include");
                }));
            })();
            Promise.all(promises).then(done).catch(done.fail);
        });
        function stubListRequest(resource) {
            jasmine.Ajax.stubRequest(new RegExp(resource), null, "GET").andReturn({
                status: 200,
                responseText: "[{\n\t\t\t\t\t\t\"@id\": \"http://example.com/" + resource + "\",\n\t\t\t\t\t\t\"@graph\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/" + resource + "\",\n\t\t\t\t\t\t\t\"@type\": [ \"http://www.w3.org/ns/ldp#BasicContainer\" ],\n\t\t\t\t\t\t\t\"http://www.w3.org/ns/ldp#hasMemberRelation\": [{\n\t\t\t\t\t            \"@id\": \"http://www.w3.org/ns/ldp#my-member\"\n\t\t\t\t\t        }],\n\t\t\t\t\t        \"http://www.w3.org/ns/ldp#my-member\": [{\n\t\t\t\t\t            \"@id\": \"http://example.com/resource/element-01/\"\n\t\t\t\t\t        }, {\n\t\t\t\t\t            \"@id\": \"http://example.com/resource/element-02/\"\n\t\t\t\t\t        }, {\n\t\t\t\t\t            \"@id\": \"http://example.com/resource/element-03/\"\n\t\t\t\t\t        }]\n\t\t\t\t\t    }]\n\t\t\t\t\t}]"
            });
        }
        function checkResponse(pointers, response) {
            expect(pointers).toBeDefined();
            expect(Utils.isArray(pointers)).toBe(true);
            expect(pointers.length).toBe(3);
            expect(Pointer.Util.getIDs(pointers)).toEqual(["http://example.com/resource/element-01/", "http://example.com/resource/element-02/", "http://example.com/resource/element-03/"]);
            expect(response).toBeDefined();
            expect(response instanceof HTTP.Response.Class).toBe(true);
        }
        function checkPrefer(request, preferType) {
            var prefer = "return=representation; " + preferType + "=";
            expect(request.requestHeaders["prefer"]).toBeDefined();
            var prefers = new HTTP.Header.Class(request.requestHeaders["prefer"]);
            var preferInclude = prefers.values.find(function (value) {
                return value.toString().startsWith(prefer);
            });
            var includes = preferInclude.toString().substring(prefer.length, preferInclude.toString().length - 1).split(" ");
            expect(includes).toContain(NS.C.Class.NonReadableMembershipResourceTriples);
        }
    });
    describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "getMembers", "Retrieves and resolve all the members of a specified document."), function () {
        var documents;
        beforeEach(function () {
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return "http://example.com/" + uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            var context = new MockedContext();
            context.extendObjectSchema({
                "ex": "http://example.com/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "string": {
                    "@id": "ex:string",
                    "@type": "xsd:string",
                },
                "pointer": {
                    "@id": "ex:pointer",
                    "@type": "@id",
                },
            });
            documents = context.documents;
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(documents.getMembers).toBeDefined();
            expect(Utils.isFunction(documents.getMembers)).toBe(true);
        });
        function stubListRequest(resource) {
            jasmine.Ajax.stubRequest(new RegExp(resource), null, "GET").andReturn({
                status: 200,
                responseText: "[\n\t\t\t\t\t{\n\t\t\t\t\t    \"@id\": \"_:00\",\n\t\t\t\t\t    \"@type\": [\n\t\t\t\t\t      \"https://carbonldp.com/ns/v1/platform#ResponseDescription\",\n\t\t\t\t\t      \"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t    ],\n\t\t\t\t\t    \"https://carbonldp.com/ns/v1/platform#responseProperty\": [{\n\t\t\t\t\t\t\t\"@id\": \"_:01\"\n\t\t\t\t\t\t}, {\n\t\t\t\t\t\t\t\"@id\": \"_:02\"\n\t\t\t\t\t\t}]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t    \"@id\": \"_:01\",\n\t\t\t\t\t    \"@type\": [\n\t\t\t\t\t        \"https://carbonldp.com/ns/v1/platform#ResponseMetaData\",\n\t\t\t\t\t        \"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t    ],\n\t\t\t\t\t    \"https://carbonldp.com/ns/v1/platform#eTag\": [{\n\t\t\t\t\t        \"@value\": \"\\\"1234567890\\\"\"\n\t\t\t\t\t    }],\n\t\t\t\t\t    \"https://carbonldp.com/ns/v1/platform#responsePropertyResource\": [{\n\t\t\t\t\t        \"@id\": \"http://example.com/resource/element-01/\"\n\t\t\t\t\t    }]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"_:02\",\n\t\t\t\t\t\t\"@type\": [\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#ResponseMetaData\",\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t\t],\n\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#eTag\": [{\n\t\t\t\t\t\t\t\"@value\": \"\\\"0987654321\\\"\"\n\t\t\t\t\t\t}],\n\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#responsePropertyResource\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-02/\"\n\t\t\t\t\t\t}]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/" + resource + "/\",\n\t\t\t\t\t\t\"@graph\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/" + resource + "/\",\n\t\t\t\t\t\t\t\"@type\": [ \"http://www.w3.org/ns/ldp#BasicContainer\" ],\n\t\t\t\t\t\t\t\"http://www.w3.org/ns/ldp#hasMemberRelation\": [{\n\t\t\t\t\t            \"@id\": \"http://www.w3.org/ns/ldp#my-member\"\n\t\t\t\t\t        }],\n\t\t\t\t\t        \"http://www.w3.org/ns/ldp#my-member\": [{\n\t\t\t\t\t            \"@id\": \"http://example.com/resource/element-01/\"\n\t\t\t\t\t        }, {\n\t\t\t\t\t            \"@id\": \"http://example.com/resource/element-02/\"\n\t\t\t\t\t        }]\n\t\t\t\t\t    }]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-01/\",\n\t\t\t\t\t\t\"@graph\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-01/\",\n\t\t\t\t\t\t\t\"@type\": [ \"http://www.w3.org/ns/ldp#BasicContainer\" ],\n\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Document of resource 01\" }],\n\t\t\t\t\t\t\t\"http://example.com/ns#pointer\": [\n\t\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/resource/element-01/#1\" }\n\t\t\t\t\t\t\t]\n\t\t\t\t\t    }, {\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-01/#1\",\n\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"NamedFragment of resource 01\" }]\n\t\t\t\t\t    }]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-02/\",\n\t\t\t\t\t\t\"@graph\": [{\n\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/element-02/\",\n\t\t\t\t\t\t\t\"@type\": [ \"http://www.w3.org/ns/ldp#BasicContainer\" ],\n\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Document of resource 02\" }],\n\t\t\t\t\t\t\t\"http://example.com/ns#pointer\": [\n\t\t\t\t\t\t\t\t{ \"@id\": \"_:01\" }\n\t\t\t\t\t\t\t]\n\t\t\t\t\t    }, {\n\t\t\t\t\t\t\t\"@id\": \"_:01\",\n\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"BlankNode of resource 02\" }]\n\t\t\t\t\t    }]\n\t\t\t\t\t}\n\t\t\t\t]"
            });
        }
        function checkResponse(pointers, response) {
            expect(pointers).toBeDefined();
            expect(Utils.isArray(pointers)).toBe(true);
            expect(pointers.length).toBe(2);
            expect(Pointer.Util.getIDs(pointers)).toEqual(["http://example.com/resource/element-01/", "http://example.com/resource/element-02/"]);
            expect(pointers[0].id).toBe("http://example.com/resource/element-01/");
            expect(pointers[0].isResolved()).toBe(true);
            expect(pointers[0]["_etag"]).toBe("\"1234567890\"");
            expect(pointers[0]["string"]).toBe("Document of resource 01");
            expect(pointers[0]["pointer"]).toBeDefined();
            expect(pointers[0]["pointer"]["id"]).toBe("http://example.com/resource/element-01/#1");
            expect(pointers[0]["pointer"]["string"]).toBe("NamedFragment of resource 01");
            expect(pointers[1].id).toBe("http://example.com/resource/element-02/");
            expect(pointers[1].isResolved()).toBe(true);
            expect(pointers[1]["_etag"]).toBe("\"0987654321\"");
            expect(pointers[1]["string"]).toBe("Document of resource 02");
            expect(pointers[1]["pointer"]).toBeDefined();
            expect(pointers[1]["pointer"]["id"]).toBe("_:01");
            expect(pointers[1]["pointer"]["string"]).toBe("BlankNode of resource 02");
            expect(response).toBeDefined();
            expect(response instanceof HTTP.Response.Class).toBe(true);
        }
        function getPrefers(request) {
            var prefers = [];
            var types = ["include", "omit"];
            var _loop_2 = function(index) {
                var preferType = "return=representation; " + types[index] + "=";
                var prefersValues = new HTTP.Header.Class(request.requestHeaders["prefer"]);
                var preferInclude = prefersValues.values.find(function (value) {
                    return value.toString().startsWith(preferType);
                });
                prefers[index] = preferInclude.toString().substring(preferType.length + 1, preferInclude.toString().length - 1).split(" ");
            };
            for (var index in types) {
                _loop_2(index);
            }
            return prefers;
        }
        function checkPrefer(request, nonReadable) {
            if (nonReadable === void 0) { nonReadable = true; }
            var includes = null;
            var omits = null;
            expect(request.requestHeaders["prefer"]).toBeDefined();
            _a = getPrefers(request), includes = _a[0], omits = _a[1];
            expect(includes).toContain(NS.LDP.Class.PreferMembership);
            expect(includes).toContain(NS.C.Class.PreferMembershipResources);
            expect(omits).toContain(NS.LDP.Class.PreferContainment);
            expect(omits).toContain(NS.C.Class.PreferContainmentResources);
            if (nonReadable) {
                expect(includes).toContain(NS.C.Class.NonReadableMembershipResourceTriples);
            }
            else {
                expect(omits).toContain(NS.C.Class.NonReadableMembershipResourceTriples);
            }
            var _a;
        }
        it(JasmineExtender_1.hasSignature("Retrieves all the members of a document and their contents, where you can specify if the response should include the Non Readable resources, the retrieval preferences and the options for the request.", [
            { name: "uri", type: "string", description: "URI of the document to ask its members." },
            { name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the the response should include the Non Readable resources. By default this is set to `true`." },
            { name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object for specify the retrieval preferences for the request." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
        ], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }), function (done) {
            var promises = [];
            (function () {
                stubListRequest("resource-1/");
                var options = { timeout: 12345 };
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getMembers("resource-1/", true, retrievalPreferences, options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-1/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request, true);
                }));
            })();
            (function () {
                stubListRequest("resource-2/");
                var options = { timeout: 12345 };
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getMembers("resource-2/", false, retrievalPreferences, options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-2/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request, false);
                }));
            })();
            (function () {
                stubListRequest("resource-3/");
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getMembers("resource-3/", true, retrievalPreferences);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-3/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-3/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request, true);
                }));
            })();
            (function () {
                stubListRequest("resource-4/");
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getMembers("resource-4/", false, retrievalPreferences);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-4/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-4/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request, false);
                }));
            })();
            Promise.all(promises).then(done).catch(done.fail);
        });
        it(JasmineExtender_1.hasSignature("Retrieves all the members of a document and their contents, where you can specify if the response should include the Non Readable resources and options for the request.", [
            { name: "uri", type: "string", description: "URI of the document to ask its members." },
            { name: "includeNonReadable", type: "boolean", optional: true, description: "Specify if the the response should include the Non Readable resources. By default this is set to `true`." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
        ], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }), function (done) {
            var promises = [];
            (function () {
                stubListRequest("resource-1/");
                var options = { timeout: 12345 };
                var promise = documents.getMembers("resource-1/", true, options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-1/)[0];
                    expect(request.url).toMatch("resource-1/");
                    checkPrefer(request, true);
                }));
            })();
            (function () {
                stubListRequest("resource-2/");
                var options = { timeout: 12345 };
                var promise = documents.getMembers("resource-2/", false, options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-2/)[0];
                    expect(request.url).toMatch("resource-2/");
                    checkPrefer(request, false);
                }));
            })();
            (function () {
                stubListRequest("resource-3/");
                var promise = documents.getMembers("resource-3/", true);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-3/)[0];
                    expect(request.url).toMatch("resource-3/");
                    checkPrefer(request, true);
                }));
            })();
            (function () {
                stubListRequest("resource-4/");
                var promise = documents.getMembers("resource-4/", false);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-4/)[0];
                    expect(request.url).toMatch("resource-4/");
                    checkPrefer(request, false);
                }));
            })();
            Promise.all(promises).then(done).catch(done.fail);
        });
        it(JasmineExtender_1.hasSignature("Retrieves all the members of a document and their content, where you can specify the retrieval preferences and the options for the request.", [
            { name: "uri", type: "string", description: "URI of the document to ask its members." },
            { name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true, description: "An object for specify the retrieval preferences for the request." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
        ], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }), function (done) {
            var promises = [];
            (function () {
                stubListRequest("resource-1/");
                var options = { timeout: 12345 };
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getMembers("resource-1/", retrievalPreferences, options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-1/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-1/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request);
                }));
            })();
            (function () {
                stubListRequest("resource-2/");
                var retrievalPreferences = {
                    limit: 10,
                    offset: 0,
                    orderBy: [{ "@id": "http://example.com/ns#string", "@type": "string" }]
                };
                var promise = documents.getMembers("resource-2/", retrievalPreferences);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-2/)[0];
                    var url = decodeURI(request.url);
                    expect(url.indexOf("resource-2/?limit=10&offset=0&orderBy=<http://example.com/ns%23string>;<http://www.w3.org/2001/XMLSchema%23string>")).not.toBe(-1);
                    checkPrefer(request);
                }));
            })();
            Promise.all(promises).then(done).catch(done.fail);
        });
        it(JasmineExtender_1.hasSignature("Retrieves all the members of a document and their contents, where you can specify options for the request.", [
            { name: "uri", type: "string", description: "URI of the document to ask its members." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true, description: "Options that can be specified for change the behavior of the request." },
        ], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }), function (done) {
            var promises = [];
            (function () {
                stubListRequest("resource-1/");
                var options = { timeout: 12345 };
                var promise = documents.getMembers("resource-1/", options);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    expect(options.timeout).toBe(12345);
                    expect(options.headers).toBeDefined();
                    var request = jasmine.Ajax.requests.filter(/resource-1/)[0];
                    expect(request.url).toMatch("resource-1/");
                    checkPrefer(request);
                }));
            })();
            (function () {
                stubListRequest("resource-2/");
                var promise = documents.getMembers("resource-2/");
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(function (_a) {
                    var pointers = _a[0], response = _a[1];
                    checkResponse(pointers, response);
                    var request = jasmine.Ajax.requests.filter(/resource-2/)[0];
                    expect(request.url).toMatch("resource-2/");
                    checkPrefer(request);
                }));
            })();
            Promise.all(promises).then(done).catch(done.fail);
        });
    });
    describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "addMember"), function () {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return "http://example.com/" + uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context;
        var documents;
        beforeEach(function () {
            context = new MockedContext();
            documents = context.documents;
        });
        it(JasmineExtender_1.hasSignature("Add the specified resource Pointer as a member of the document container specified.", [
            { name: "documentURI", type: "string", description: "URI of the document container where to add the member." },
            { name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to add as a member." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
        ], { type: "Promise<Carbon.HTTP.Response>" }), function () {
            expect(documents.addMember).toBeDefined();
            expect(Utils.isFunction(documents.addMember)).toBe(true);
            var spy = spyOn(documents, "addMembers");
            var pointer = documents.getPointer("new-member/");
            documents.addMember("resource/", pointer);
            expect(spy).toHaveBeenCalledWith("resource/", [pointer], {});
        });
        it(JasmineExtender_1.hasSignature("Add the specified resource URI as a member of the document container specified.", [
            { name: "documentURI", type: "string", description: "URI of the document container where to add the member." },
            { name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
        ], { type: "Promise<Carbon.HTTP.Response>" }), function () {
            expect(documents.addMember).toBeDefined();
            expect(Utils.isFunction(documents.addMember)).toBe(true);
            var spy = spyOn(documents, "addMembers");
            documents.addMember("resource/", "new-member/");
            expect(spy).toHaveBeenCalledWith("resource/", ["new-member/"], {});
        });
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "addMembers", "Add the specified resources URI or Pointers as members of the document container specified.", [
        { name: "documentURI", type: "string", description: "URI of the document container where to add the members." },
        { name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to add as members" },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
    ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return "http://example.com/" + uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        expect(documents.addMembers).toBeDefined();
        expect(Utils.isFunction(documents.addMembers)).toBe(true);
        jasmine.Ajax.stubRequest("http://example.com/resource/", null, "PUT").andReturn({
            status: 200
        });
        var spies = {
            success: function (response) {
                expect(response).toBeDefined();
                expect(response instanceof HTTP.Response.Class).toBe(true);
            },
            fail: function (error) {
                expect(error).toBeDefined();
                expect(error instanceof Errors.IllegalArgumentError);
            }
        };
        var spySuccess = spyOn(spies, "success").and.callThrough();
        var spyFail = spyOn(spies, "fail").and.callThrough();
        var promises = [];
        var promise;
        var members;
        members = [documents.getPointer("new-member-01/"), "new-member-02/"];
        promise = documents.addMembers("resource/", members);
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.success));
        members = [documents.getPointer("new-member-01/"), "new-member-02/", { "something": "nor string or Pointer" }];
        promise = documents.addMembers("resource/", members);
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.catch(spies.fail));
        Promise.all(promises).then(function () {
            expect(spySuccess).toHaveBeenCalledTimes(1);
            expect(spyFail).toHaveBeenCalledTimes(1);
            done();
        }, done.fail);
    });
    describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "removeMember"), function () {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return "http://example.com/" + uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context;
        var documents;
        beforeEach(function () {
            context = new MockedContext();
            documents = context.documents;
        });
        it(JasmineExtender_1.hasSignature("Remove the specified resource Pointer member of the resource container specified.", [
            { name: "documentURI", type: "string", description: "URI of the resource container where to remove the member." },
            { name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to remove as a member." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
        ], { type: "Promise<Carbon.HTTP.Response>" }), function () {
            expect(documents.removeMember).toBeDefined();
            expect(Utils.isFunction(documents.removeMember)).toBe(true);
            var spy = spyOn(documents, "removeMembers");
            var pointer = documents.getPointer("remove-member/");
            documents.removeMember("resource/", pointer);
            expect(spy).toHaveBeenCalledWith("resource/", [pointer], {});
        });
        it(JasmineExtender_1.hasSignature("Remove the specified resource URI member of the resource container specified.", [
            { name: "documentURI", type: "string", description: "URI of the resource container where to remove the member." },
            { name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
        ], { type: "Promise<Carbon.HTTP.Response>" }), function () {
            expect(documents.removeMember).toBeDefined();
            expect(Utils.isFunction(documents.removeMember)).toBe(true);
            var spy = spyOn(documents, "removeMembers");
            documents.removeMember("resource/", "remove-member/");
            expect(spy).toHaveBeenCalledWith("resource/", ["remove-member/"], {});
        });
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "removeMembers", "Remove the specified resources URI or Pointers as members of the document container specified.", [
        { name: "documentURI", type: "string", description: "URI of the document container where to remove the members." },
        { name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to remove as members" },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
    ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return "http://example.com/" + uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        expect(documents.removeMembers).toBeDefined();
        expect(Utils.isFunction(documents.removeMembers)).toBe(true);
        jasmine.Ajax.stubRequest("http://example.com/resource/", null, "DELETE").andReturn({
            status: 200
        });
        var spies = {
            success: function (response) {
                expect(response).toBeDefined();
                expect(response instanceof HTTP.Response.Class).toBe(true);
            },
            fail: function (error) {
                expect(error).toBeDefined();
                expect(error instanceof Errors.IllegalArgumentError).toBe(true);
            }
        };
        var spySuccess = spyOn(spies, "success").and.callThrough();
        var spyFail = spyOn(spies, "fail").and.callThrough();
        var promises = [];
        var promise;
        var members;
        members = [documents.getPointer("remove-member-01/"), "remove-member-02/"];
        promise = documents.removeMembers("resource/", members);
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.success));
        members = [documents.getPointer("remove-member-01/"), "remove-member-02/", { "something": "nor string or Pointer" }];
        promise = documents.removeMembers("resource/", members);
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.catch(spies.fail));
        Promise.all(promises).then(function () {
            expect(spySuccess).toHaveBeenCalledTimes(1);
            expect(spyFail).toHaveBeenCalledTimes(1);
            done();
        }, done.fail);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "removeAllMembers", "Remove all the members of the document container specified.", [
        { name: "documentURI", type: "string", description: "URI of the document container where to remove the members." },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
    ], { type: "Promise<Carbon.HTTP.Response>" }), function (done) {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return "http://example.com/" + uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        expect(documents.removeAllMembers).toBeDefined();
        expect(Utils.isFunction(documents.removeAllMembers)).toBe(true);
        jasmine.Ajax.stubRequest("http://example.com/resource/", null, "DELETE").andReturn({
            status: 200
        });
        var spies = {
            success: function (response) {
                expect(response).toBeDefined();
                expect(response instanceof HTTP.Response.Class).toBe(true);
            },
            fail: function (error) {
                expect(error).toBeDefined();
                expect(error instanceof Errors.IllegalArgumentError).toBe(true);
            }
        };
        var spySuccess = spyOn(spies, "success").and.callThrough();
        var spyFail = spyOn(spies, "fail").and.callThrough();
        var promises = [];
        var promise;
        promise = documents.removeAllMembers("resource/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.success));
        Promise.all(promises).then(function () {
            expect(spySuccess).toHaveBeenCalledTimes(1);
            expect(spyFail).not.toHaveBeenCalled();
            done();
        }).catch(done.fail);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "refresh", "Update the document with the data of the server, if there is a diferent version on it.", [
        { name: "persistedDocument", type: "Carbon.PersistedDocument.Class", description: "The persisted document to update." },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
    ], { type: "Promise<[ Carbon.PersistedDocument.Class, Carbon.HTTP.Response ]>" }), function (done) {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        expect(documents.refresh).toBeDefined();
        expect(Utils.isFunction(documents.refresh)).toBe(true);
        var objectSchema = {
            "ex": "http://example.com/ns#",
            "xsd": "http://www.w3.org/2001/XMLSchema#",
            "string": {
                "@id": "ex:string",
                "@type": "xsd:string",
            },
            "date": {
                "@id": "ex:date",
                "@type": "xsd:dateTime",
            },
            "numberList": {
                "@id": "ex:numberList",
                "@type": "xsd:integer",
                "@container": "@list",
            },
            "languageMap": {
                "@id": "ex:languageMap",
                "@container": "@language",
            },
            "pointer": {
                "@id": "ex:pointer",
                "@type": "@id",
            },
            "pointerList": {
                "@id": "ex:pointerList",
                "@type": "@id",
                "@container": "@list",
            },
            "pointerSet": {
                "@id": "ex:pointerSet",
                "@type": "@id",
                "@container": "@set",
            },
        };
        context.extendObjectSchema(objectSchema);
        jasmine.Ajax.stubRequest("http://example.com/resource/", null, "HEAD").andReturn({
            status: 200,
            responseHeaders: {
                "ETag": "\"0123456789\""
            }
        });
        jasmine.Ajax.stubRequest("http://example.com/resource/", null, "GET").andReturn({
            status: 200,
            responseText: "[{\n\t\t\t\t\"@id\": \"http://example.com/resource/\",\n\t\t\t\t\"@graph\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/resource/\",\n\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Document Resource\" }],\n\t\t\t\t\t\t\"http://example.com/ns#pointer\": [{ \"@id\": \"http://example.com/resource/#1\" }],\n\t\t\t\t\t\t\"http://example.com/ns#pointerSet\": [\n\t\t\t\t\t\t\t{ \"@id\": \"_:1\" },\n\t\t\t\t\t\t\t{ \"@id\": \"_:2\" },\n\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/resource/#1\" },\n\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/external-resource/\" }\n\t\t\t\t\t\t]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"_:1\",\n\t\t\t\t\t\t\"" + NS.C.Predicate.bNodeIdentifier + "\": \"UUID fo _:1\",\n\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Fragment 1\" }],\n\t\t\t\t\t\t\"http://example.com/ns#pointerSet\": [\n\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/resource/\" },\n\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/resource/#1\" }\n\t\t\t\t\t\t]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"_:2\",\n\t\t\t\t\t\t\"" + NS.C.Predicate.bNodeIdentifier + "\": \"UUID fo _:2\",\n\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Fragment 2\" }]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/resource/#1\",\n\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"NamedFragment 1\" }]\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\t\"@id\": \"http://example.com/resource/#2\",\n\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"NamedFragment 2\" }]\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}]",
            responseHeaders: {
                "ETag": "\"0123456789\""
            }
        });
        var document;
        var fragment;
        var blankNode01;
        var blankNode02;
        var promises = [];
        var spies = {
            init: function (_a) {
                var persistedDoc = _a[0], response = _a[1];
                document = persistedDoc;
                fragment = persistedDoc.getNamedFragment("#1");
                blankNode01 = persistedDoc.getFragment("_:1");
                blankNode02 = persistedDoc.getFragment("_:2");
                expect(document["string"]).toBe("Document Resource");
                expect(fragment["string"]).toBe("NamedFragment 1");
                expect(document["pointer"]).toBe(fragment);
                expect(blankNode01["string"]).toBe("Fragment 1");
                expect(blankNode02["string"]).toBe("Fragment 2");
                document["new-property"] = "A new property that will be erased at refresh";
                var promise = documents.refresh(document);
                expect(promise instanceof Promise).toBe(true);
                return promise.then(spies.same);
            },
            same: function (_a) {
                var persistedDoc = _a[0], response = _a[1];
                expect(persistedDoc).toBe(document);
                expect(response).toBeNull();
                jasmine.Ajax.stubRequest("http://example.com/resource/", null, "HEAD").andReturn({
                    status: 200,
                    responseHeaders: {
                        "ETag": "\"dif0123456789\""
                    }
                });
                jasmine.Ajax.stubRequest("http://example.com/resource/", null, "GET").andReturn({
                    status: 200,
                    responseText: "[{\n\t\t\t\t\t\t\"@id\": \"http://example.com/resource/\",\n\t\t\t\t\t\t\"@graph\": [\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/\",\n\t\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Changed Document Resource\" }],\n\t\t\t\t\t\t\t\t\"http://example.com/ns#pointer\": [{ \"@id\": \"_:0001\" }],\n\t\t\t\t\t\t\t\t\"http://example.com/ns#pointerSet\": [\n\t\t\t\t\t\t\t\t\t{ \"@id\": \"_:0001\" },\n\t\t\t\t\t\t\t\t\t{ \"@id\": \"_:2\" },\n\t\t\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/resource/#1\" },\n\t\t\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/external-resource/\" }\n\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\"@id\": \"_:0001\",\n\t\t\t\t\t\t\t\t\"" + NS.C.Predicate.bNodeIdentifier + "\": \"UUID fo _:1\",\n\t\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Changed Fragment 1\" }],\n\t\t\t\t\t\t\t\t\"http://example.com/ns#pointerSet\": [\n\t\t\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/resource/\" },\n\t\t\t\t\t\t\t\t\t{ \"@id\": \"http://example.com/resource/#1\" }\n\t\t\t\t\t\t\t\t]\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\"@id\": \"_:2\",\n\t\t\t\t\t\t\t\t\"" + NS.C.Predicate.bNodeIdentifier + "\": \"NOT the UUID fo _:2\",\n\t\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Fragment 2\" }]\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/#1\",\n\t\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"Changed NamedFragment 1\" }]\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\"@id\": \"http://example.com/resource/#3\",\n\t\t\t\t\t\t\t\t\"http://example.com/ns#string\": [{ \"@value\": \"NamedFragment 3\" }]\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t]\n\t\t\t\t\t}]",
                    responseHeaders: {
                        "ETag": "\"dif0123456789\""
                    }
                });
                var promise = documents.refresh(document);
                expect(promise instanceof Promise).toBe(true);
                return promise.then(spies.success);
            },
            success: function (_a) {
                var persistedDoc = _a[0], response = _a[1];
                expect(persistedDoc).toBe(document);
                expect(document["string"]).toBe("Changed Document Resource");
                expect(fragment["string"]).toBe("Changed NamedFragment 1");
                expect(document["pointer"]).toBe(blankNode01);
                expect(document["pointer"]["string"]).toBe("Changed Fragment 1");
                expect(blankNode01["string"]).toBe("Changed Fragment 1");
                expect(blankNode01.id).toBe("_:0001");
                expect(blankNode01).toBe(document.getFragment("_:0001"));
                expect(document["pointerSet"][0]).toBe(blankNode01);
                expect(document.hasFragment("_:1")).toBe(false);
                expect(blankNode02.id).toBe("_:2");
                expect(blankNode02.id).not.toBe(document.getFragment("_:2"));
                expect(document["pointerSet"][1]).not.toBe(blankNode02);
                expect(document.hasFragment("#2")).toBe(false);
                expect(document.hasFragment("#3")).toBe(true);
                expect(document["new-property"]).toBeUndefined();
                expect(response).toBeDefined();
                expect(response instanceof HTTP.Response.Class).toBe(true);
            }
        };
        var spySuccess = spyOn(spies, "success").and.callThrough();
        var spySame = spyOn(spies, "same").and.callThrough();
        var promise = documents.get("http://example.com/resource/");
        expect(promise instanceof Promise).toBe(true);
        promises.push(promise.then(spies.init));
        Promise.all(promises).then(function () {
            expect(spySame).toHaveBeenCalledTimes(1);
            expect(spySuccess).toHaveBeenCalledTimes(1);
            done();
        }).catch(done.fail);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "delete", "Delete a the Resource referred by a PersistedDocument from the server.", [
        { name: "documentURI", type: "string" },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
    ], { type: "Promise<Carbon.HTTP.Response.Class>" }), function (done) {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        expect(documents.delete).toBeDefined();
        expect(Utils.isFunction(documents.delete)).toBe(true);
        jasmine.Ajax.stubRequest("http://example.com/resource/", null, "DELETE").andReturn({
            status: 200
        });
        var spies = {
            success: function (response) {
                expect(response).toBeDefined();
                expect(response instanceof HTTP.Response.Class).toBe(true);
            }
        };
        var spySuccess = spyOn(spies, "success").and.callThrough();
        var promise = documents.delete("http://example.com/resource/").then(spies.success);
        Promise.all([promise]).then(function () {
            expect(spySuccess).toHaveBeenCalled();
            done();
        }, done.fail);
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeRawASKQuery", "\n\t\t\tExecutes an ASK query on a document and returns a raw application/sparql-results+json object\n\t\t", [
        { name: "documentURI", type: "string" },
        { name: "askQuery", type: "string" },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
    ], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }), function () {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        (function () {
            expect("executeRawASKQuery" in documents).toEqual(true);
            expect(Utils.isFunction(documents.executeRawASKQuery)).toEqual(true);
        })();
        (function () {
            spyOn(SPARQL.Service, "executeRawASKQuery");
            documents.executeRawASKQuery("http://example.com/document/", "ASK { ?subject, ?predicate, ?object }");
            expect(SPARQL.Service.executeRawASKQuery).toHaveBeenCalled();
        })();
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeRawSELECTQuery", "Executes a SELECT query on a document and returns a raw application/sparql-results+json object", [
        { name: "documentURI", type: "string" },
        { name: "selectQuery", type: "string" },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
    ], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }), function () {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        (function () {
            expect("executeRawSELECTQuery" in documents).toEqual(true);
            expect(Utils.isFunction(documents.executeRawSELECTQuery)).toEqual(true);
        })();
        (function () {
            spyOn(SPARQL.Service, "executeRawSELECTQuery");
            documents.executeRawSELECTQuery("http://example.com/document/", "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }");
            expect(SPARQL.Service.executeRawSELECTQuery).toHaveBeenCalled();
        })();
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeRawCONSTRUCTQuery", "\n\t\t\tExecutes a CONSTRUCT query on a document and returns a string with the resulting model\n\t\t", [
        { name: "documentURI", type: "string" },
        { name: "constructQuery", type: "string" },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
    ], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }), function () {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        (function () {
            expect("executeRawCONSTRUCTQuery" in documents).toEqual(true);
            expect(Utils.isFunction(documents.executeRawCONSTRUCTQuery)).toEqual(true);
        })();
        (function () {
            spyOn(SPARQL.Service, "executeRawCONSTRUCTQuery");
            documents.executeRawCONSTRUCTQuery("http://example.com/document/", "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }");
            expect(SPARQL.Service.executeRawCONSTRUCTQuery).toHaveBeenCalled();
        })();
    });
    it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeRawDESCRIBEQuery", "\n\t\t\tExecutes a DESCRIBE Query and returns a string with the resulting model\n\t\t", [
        { name: "documentURI", type: "string" },
        { name: "describeQuery", type: "string" },
        { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true },
    ], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }), function () {
        var MockedContext = (function (_super) {
            __extends(MockedContext, _super);
            function MockedContext() {
                _super.apply(this, arguments);
            }
            MockedContext.prototype.resolve = function (uri) {
                return uri;
            };
            return MockedContext;
        }(AbstractContext_1.default));
        var context = new MockedContext();
        var documents = context.documents;
        (function () {
            expect("executeRawDESCRIBEQuery" in documents).toEqual(true);
            expect(Utils.isFunction(documents.executeRawDESCRIBEQuery)).toEqual(true);
        })();
        (function () {
            spyOn(SPARQL.Service, "executeRawDESCRIBEQuery");
            documents.executeRawDESCRIBEQuery("http://example.com/document/", "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }");
            expect(SPARQL.Service.executeRawDESCRIBEQuery).toHaveBeenCalled();
        })();
    });
});
