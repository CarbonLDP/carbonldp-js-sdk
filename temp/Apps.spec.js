"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var AbstractContext_1 = require("./AbstractContext");
var Context_1 = require("./App/Context");
var NS = require("./NS");
var Errors = require("./Errors");
var App = require("./App");
var RDF = require("./RDF");
var Apps = require("./Apps");
var Apps_1 = require("./Apps");
describe(JasmineExtender_1.module("Carbon/Apps"), function () {
    var context;
    it(JasmineExtender_1.isDefined(), function () {
        expect(Apps).toBeDefined();
        expect(Utils.isObject(Apps)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Apps.Class", "Class for obtaining Carbon Apps."), function () {
        var apps;
        var platformBaseURI = "http://example.com/platform/";
        var appsContainerURI = platformBaseURI + "apps/";
        beforeEach(function () {
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    if (!RDF.URI.Util.isAbsolute(uri))
                        return RDF.URI.Util.resolve(platformBaseURI, uri);
                    return uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            context = new MockedContext();
            context.setSetting("platform.apps.container", appsContainerURI);
            apps = new Apps.Class(context);
            jasmine.Ajax.install();
        });
        afterEach(function () {
            jasmine.Ajax.uninstall();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(Apps.Class).toBeDefined();
            expect(Utils.isFunction(Apps.Class)).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "context", type: "Carbon.Context", description: "A context from where Carbon Apps can be obtained" }
        ]), function () {
            expect(apps).toBeTruthy();
            expect(apps instanceof Apps.Class).toBe(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "getContext"), function () {
            it(JasmineExtender_1.hasSignature("Obtains a `Carbon.App.Context` object of the specified app URI, if it exists within the context of the Apps instance.", [
                { name: "uri", type: "string" }
            ], { type: "Promise<Carbon.App.Context>" }), function (done) {
                expect(apps.getContext).toBeDefined();
                expect(Utils.isFunction(apps.getContext)).toBe(true);
                jasmine.Ajax.stubRequest("http://example.com/platform/apps/example-app/", null, "GET").andReturn({
                    status: 200,
                    responseHeaders: {
                        ETag: 'W/"123456789"'
                    },
                    responseText: "[{\n\t\t\t\t\t    \"@id\": \"http://example.com/platform/apps/example-app/\",\n\t\t\t\t\t    \"@graph\": [{\n\t\t\t\t\t        \"@id\": \"http://example.com/platform/apps/example-app/\",\n\t\t\t\t\t        \"@type\": [\n\t\t\t\t\t          \"http://www.w3.org/ns/ldp#RDFSource\",\n\t\t\t\t\t          \"http://www.w3.org/ns/ldp#BasicContainer\",\n\t\t\t\t\t          \"" + NS.CS.Class.Application + "\"\n\t\t\t\t\t        ],\n\t\t\t\t\t        \"https://carbonldp.com/ns/v1/security#rootContainer\": [{\n\t\t\t\t\t            \"@id\": \"https://example.com/apps/example-app/\"\n\t\t\t\t\t        }],\n\t\t\t\t\t        \"" + NS.CS.Predicate.name + "\": [{\n\t\t\t\t\t            \"@value\": \"Example App name\"\n\t\t\t\t\t        }],\n\t\t\t\t\t        \"" + NS.CS.Predicate.description + "\": [{\n\t\t\t\t\t            \"@value\": \"Example App description\"\n\t\t\t\t\t        }]\n\t\t\t\t\t    }]\n\t\t\t\t\t}]"
                });
                var spies = {
                    success: function (appContext) {
                        expect(appContext instanceof Context_1.default).toBe(true);
                    },
                    fail: function (some) {
                        console.log(some);
                    }
                };
                var successSpy = spyOn(spies, "success").and.callThrough();
                var failSpy = spyOn(spies, "fail").and.callThrough();
                var promise;
                var spy;
                spy = spyOn(context.documents, "get").and.callThrough();
                promise = apps.getContext('example-app/').then(spies.success, spies.fail);
                expect(promise instanceof Promise).toBe(true);
                promise.then(function () {
                    expect(spy).toHaveBeenCalledWith("http://example.com/platform/apps/example-app/");
                    expect(successSpy.calls.count()).toBe(1);
                    expect(failSpy.calls.count()).toBe(0);
                    done();
                }, done.fail);
            });
            it(JasmineExtender_1.hasSignature("Obtains a `Carbon.App.Context` object of the specified Pointer object, if it exists within the context of the Apps instance.", [
                { name: "pointer", type: "Carbon.Pointer.Class" }
            ], { type: "Promise<Carbon.App.Context>" }), function (done) {
                expect(apps.getContext).toBeDefined();
                expect(Utils.isFunction(apps.getContext)).toBe(true);
                jasmine.Ajax.stubRequest("http://example.com/platform/apps/example-app/", null, "GET").andReturn({
                    status: 200,
                    responseHeaders: {
                        ETag: 'W/"123456789"'
                    },
                    responseText: "[{\n\t\t\t\t\t    \"@id\": \"http://example.com/platform/apps/example-app/\",\n\t\t\t\t\t    \"@graph\": [{\n\t\t\t\t\t        \"@id\": \"http://example.com/platform/apps/example-app/\",\n\t\t\t\t\t        \"@type\": [\n\t\t\t\t\t          \"http://www.w3.org/ns/ldp#RDFSource\",\n\t\t\t\t\t          \"http://www.w3.org/ns/ldp#BasicContainer\",\n\t\t\t\t\t          \"" + NS.CS.Class.Application + "\"\n\t\t\t\t\t        ],\n\t\t\t\t\t        \"https://carbonldp.com/ns/v1/security#rootContainer\": [{\n\t\t\t\t\t            \"@id\": \"https://example.com/apps/example-app/\"\n\t\t\t\t\t        }],\n\t\t\t\t\t        \"" + NS.CS.Predicate.name + "\": [{\n\t\t\t\t\t            \"@value\": \"Example App name\"\n\t\t\t\t\t        }],\n\t\t\t\t\t        \"" + NS.CS.Predicate.description + "\": [{\n\t\t\t\t\t            \"@value\": \"Example App description\"\n\t\t\t\t\t        }]\n\t\t\t\t\t    }]\n\t\t\t\t\t}]"
                });
                var spies = {
                    success: function (appContext) {
                        expect(appContext instanceof Context_1.default).toBe(true);
                    },
                    fail: function (some) {
                        console.log(some);
                    }
                };
                var successSpy = spyOn(spies, "success").and.callThrough();
                var failSpy = spyOn(spies, "fail").and.callThrough();
                var promise;
                var pointer;
                var spy;
                spy = spyOn(context.documents, "get").and.callThrough();
                pointer = context.documents.getPointer("apps/example-app/");
                promise = apps.getContext(pointer).then(spies.success, spies.fail);
                expect(promise instanceof Promise).toBe(true);
                promise.then(function () {
                    expect(spy).toHaveBeenCalledWith("http://example.com/platform/apps/example-app/");
                    expect(successSpy.calls.count()).toBe(1);
                    expect(failSpy.calls.count()).toBe(0);
                    done();
                }, done.fail);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getAllContexts", "Obtains all the `Carbon.App.Context` objects of every app where the context of the Apps instance can reach.", { type: "Promise<Carbon.App.Context[]>" }), function (done) {
            expect(apps.getAllContexts).toBeDefined();
            expect(Utils.isFunction(apps.getAllContexts)).toBe(true);
            jasmine.Ajax.stubRequest("http://example.com/platform/apps/", null, "GET").andReturn({
                status: 200,
                responseHeaders: {
                    ETag: 'W/"123456789"'
                },
                responseText: "[{\n\t\t\t\t    \"@id\": \"http://example.com/platform/apps/\",\n\t\t\t\t    \"@graph\": [{\n\t\t\t\t        \"@id\": \"http://example.com/platform/apps/\",\n\t\t\t\t        \"@type\": [\n\t\t\t\t          \"http://www.w3.org/ns/ldp#BasicContainer\"\n\t\t\t\t        ],\n\t\t\t\t        \"http://www.w3.org/ns/ldp#hasMemberRelation\": [{\n\t\t\t\t            \"@id\": \"http://www.w3.org/ns/ldp#member\"\n\t\t\t\t        }],\n\t\t\t\t        \"http://www.w3.org/ns/ldp#member\": [{\n\t\t\t\t            \"@id\": \"http://example.com/platform/apps/example-app/\"\n\t\t\t\t        }, {\n\t\t\t\t            \"@id\": \"http://example.com/platform/apps/another-app/\"\n\t\t\t\t        }]\n\t\t\t\t    }]\n\t\t\t\t}]"
            });
            jasmine.Ajax.stubRequest(/example-app/, null, "GET").andReturn({
                status: 200,
                responseHeaders: {
                    ETag: 'W/"123456789"'
                },
                responseText: "[{\n\t\t\t\t    \"@id\": \"http://example.com/platform/apps/example-app/\",\n\t\t\t\t    \"@graph\": [{\n\t\t\t\t        \"@id\": \"http://example.com/platform/apps/example-app/\",\n\t\t\t\t        \"@type\": [\n\t\t\t\t          \"http://www.w3.org/ns/ldp#RDFSource\",\n\t\t\t\t          \"http://www.w3.org/ns/ldp#BasicContainer\",\n\t\t\t\t          \"" + NS.CS.Class.Application + "\"\n\t\t\t\t        ],\n\t\t\t\t        \"https://carbonldp.com/ns/v1/security#rootContainer\": [{\n\t\t\t\t            \"@id\": \"https://example.com/apps/example-app/\"\n\t\t\t\t        }],\n\t\t\t\t        \"" + NS.CS.Predicate.name + "\": [{\n\t\t\t\t            \"@value\": \"Example App name\"\n\t\t\t\t        }],\n\t\t\t\t        \"" + NS.CS.Predicate.description + "\": [{\n\t\t\t\t            \"@value\": \"Example App description\"\n\t\t\t\t        }]\n\t\t\t\t    }]\n\t\t\t\t}]"
            });
            jasmine.Ajax.stubRequest(/another-app/, null, "GET").andReturn({
                status: 200,
                responseHeaders: {
                    ETag: 'W/"123456789"'
                },
                responseText: "[{\n\t\t\t\t    \"@id\": \"http://example.com/platform/apps/another-app/\",\n\t\t\t\t    \"@graph\": [{\n\t\t\t\t        \"@id\": \"http://example.com/platform/apps/another-app/\",\n\t\t\t\t        \"@type\": [\n\t\t\t\t          \"http://www.w3.org/ns/ldp#RDFSource\",\n\t\t\t\t          \"http://www.w3.org/ns/ldp#BasicContainer\",\n\t\t\t\t          \"" + NS.CS.Class.Application + "\"\n\t\t\t\t        ],\n\t\t\t\t        \"https://carbonldp.com/ns/v1/security#rootContainer\": [{\n\t\t\t\t            \"@id\": \"https://example.com/apps/another-app/\"\n\t\t\t\t        }],\n\t\t\t\t        \"" + NS.CS.Predicate.name + "\": [{\n\t\t\t\t            \"@value\": \"Another App name\"\n\t\t\t\t        }]\n\t\t\t\t    }]\n\t\t\t\t}]"
            });
            var spies = {
                success: function (appsContext) {
                    expect(appsContext.length).toBe(2);
                    for (var _i = 0, appsContext_1 = appsContext; _i < appsContext_1.length; _i++) {
                        var appContext = appsContext_1[_i];
                        expect(appContext instanceof Context_1.default).toBe(true);
                    }
                },
                fail: function () {
                }
            };
            var successSpy = spyOn(spies, "success").and.callThrough();
            var failSpy = spyOn(spies, "fail").and.callThrough();
            var promise;
            promise = apps.getAllContexts().then(spies.success, spies.fail);
            expect(promise instanceof Promise).toBe(true);
            promise.then(function () {
                expect(successSpy.calls.count()).toBe(1);
                expect(failSpy.calls.count()).toBe(0);
                done();
            }, done.fail);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "create"), function () {
            it(JasmineExtender_1.hasSignature("Persists an App Document in the server, generating a unique slug.\n" +
                "Returns a Pointer for the stored App Document, and the response of the call.", [
                { name: "appDocument", type: "Carbon.App.Class" }
            ], { type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }), function (done) {
                expect(apps.create).toBeDefined();
                expect(Utils.isFunction(apps.create)).toBe(true);
                var spy = spyOn(context.documents, "createChild");
                var app = App.Factory.create("App name", "App description");
                apps.create(app);
                expect(spy).toHaveBeenCalledWith(appsContainerURI, null, app);
                var promise = apps.create(null);
                expect(promise instanceof Promise).toBe(true);
                var spies = {
                    onError: function (error) {
                        expect(error instanceof Errors.IllegalArgumentError);
                    }
                };
                spy = spyOn(spies, "onError").and.callThrough();
                promise = promise.catch(spies.onError);
                Promise.all([promise]).then(function () {
                    expect(spy).toHaveBeenCalled();
                    done();
                });
            });
            it(JasmineExtender_1.hasSignature("Persists an App Document in the server using the slug specified.\n" +
                "Returns a Pointer for the stored App Document, and the response of the call.", [
                { name: "slug", type: "string" },
                { name: "appDocument", type: "Carbon.App.Class" }
            ], { type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }), function (done) {
                expect(apps.create).toBeDefined();
                expect(Utils.isFunction(apps.create)).toBe(true);
                var promise;
                var spy = spyOn(context.documents, "createChild");
                var app = App.Factory.create("App name", "App description");
                apps.create("slug-of-app", app);
                expect(spy).toHaveBeenCalledWith(appsContainerURI, "slug-of-app", app);
                spy.calls.reset();
                apps.create(null, app);
                expect(spy).toHaveBeenCalledWith(appsContainerURI, null, app);
                promise = apps.create("slug-of-app", null);
                expect(promise instanceof Promise).toBe(true);
                var spies = {
                    onError: function (error) {
                        expect(error instanceof Errors.IllegalArgumentError);
                    }
                };
                spy = spyOn(spies, "onError").and.callThrough();
                promise = promise.catch(spies.onError);
                Promise.all([promise]).then(function () {
                    expect(spy).toHaveBeenCalled();
                    done();
                });
            });
        });
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.Apps.Class"), function () {
        expect(Apps_1.default).toBeDefined();
        expect(Apps.Class).toBe(Apps_1.default);
    });
});
