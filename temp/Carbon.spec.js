"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var AccessPoint = require("./AccessPoint");
var Agent = require("./Agent");
var Agents = require("./Agents");
var App = require("./App");
var Apps = require("./Apps");
var Auth = require("./Auth");
var Document = require("./Document");
var Documents_1 = require("./Documents");
var Errors = require("./Errors");
var Fragment = require("./Fragment");
var HTTP = require("./HTTP");
var JSONLDConverter = require("./JSONLDConverter");
var LDP = require("./LDP");
var NamedFragment = require("./NamedFragment");
var NS = require("./NS");
var ObjectSchema = require("./ObjectSchema");
var Persisted = require("./Persisted");
var PersistedApp = require("./PersistedApp");
var PersistedDocument = require("./PersistedDocument");
var PersistedFragment = require("./PersistedFragment");
var PersistedNamedFragment = require("./PersistedNamedFragment");
var PersistedResource = require("./PersistedResource");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Resource = require("./Resource");
var SDKContext = require("./SDKContext");
var SPARQL = require("./SPARQL");
var Utils = require("./Utils");
var Carbon_1 = require("./Carbon");
describe(JasmineExtender_1.module("Carbon"), function () {
    describe(JasmineExtender_1.clazz("Carbon", "Principal class that contains all references for use the SDK."), function () {
        var carbon;
        var myCarbon;
        beforeEach(function () {
            carbon = new Carbon_1.default();
            myCarbon = new Carbon_1.default({
                "domain": "example.com",
                "http.ssl": false,
                "auth.method": Auth.Method.TOKEN,
                "platform.container": "example-platform/",
                "platform.apps.container": "example-apps/"
            });
            jasmine.Ajax.install();
        });
        afterEach(function () {
            jasmine.Ajax.uninstall();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(Carbon_1.default).toBeDefined();
            expect(Utils.isFunction(Carbon_1.default)).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "version", "string", "Returns the version of the SDK"), function () {
            expect(Carbon_1.default.version).toBeDefined();
            expect(Utils.isString(Carbon_1.default.version)).toBe(true);
            expect(Carbon_1.default.version).toMatch(/\d+\.\d+\.\d+.*/);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "version", "string", "Returns the version of the SDK"), function () {
            expect(carbon.version).toBeDefined();
            expect(Utils.isString(carbon.version)).toBe(true);
            expect(carbon.version).toMatch(/\d+\.\d+\.\d+.*/);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Agent", "Carbon/Agent"), function () {
            expect(Carbon_1.default.Agent).toBeDefined();
            expect(Carbon_1.default.Agent).toBe(Agent);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "AccessPoint", "Carbon/AccessPoint"), function () {
            expect(Carbon_1.default.AccessPoint).toBeDefined();
            expect(Carbon_1.default.AccessPoint).toBe(AccessPoint);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Agents", "Carbon/Agents"), function () {
            expect(Carbon_1.default.Agents).toBeDefined();
            expect(Carbon_1.default.Agents).toBe(Agents);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "App", "Carbon/App"), function () {
            expect(Carbon_1.default.App).toBeDefined();
            expect(Carbon_1.default.App).toBe(App);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Apps", "Carbon/Apps"), function () {
            expect(Carbon_1.default.Apps).toBeDefined();
            expect(Carbon_1.default.Apps).toBe(Apps);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Auth", "Carbon/Auth"), function () {
            expect(Carbon_1.default.Auth).toBeDefined();
            expect(Carbon_1.default.Auth).toBe(Auth);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Document", "Carbon/Document"), function () {
            expect(Carbon_1.default.Document).toBeDefined();
            expect(Carbon_1.default.Document).toBe(Document);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Documents", "Carbon/Documents"), function () {
            expect(Carbon_1.default.Documents).toBeDefined();
            expect(Carbon_1.default.Documents).toBe(Documents_1.default);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Errors", "Carbon/Errors"), function () {
            expect(Carbon_1.default.Errors).toBeDefined();
            expect(Carbon_1.default.Errors).toBe(Errors);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Fragment", "Carbon/Fragment"), function () {
            expect(Carbon_1.default.Fragment).toBeDefined();
            expect(Carbon_1.default.Fragment).toBe(Fragment);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "HTTP", "Carbon/HTTP"), function () {
            expect(Carbon_1.default.HTTP).toBeDefined();
            expect(Carbon_1.default.HTTP).toBe(HTTP);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "JSONLDConverter", "Carbon/JSONLDConverter"), function () {
            expect(Carbon_1.default.JSONLDConverter).toBeDefined();
            expect(Carbon_1.default.JSONLDConverter).toBe(JSONLDConverter);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "LDP", "Carbon/LDP"), function () {
            expect(Carbon_1.default.LDP).toBeDefined();
            expect(Carbon_1.default.LDP).toBe(LDP);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "NamedFragment", "Carbon/NamedFragment"), function () {
            expect(Carbon_1.default.NamedFragment).toBeDefined();
            expect(Carbon_1.default.NamedFragment).toBe(NamedFragment);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "NS", "Carbon/NS"), function () {
            expect(Carbon_1.default.NS).toBeDefined();
            expect(Carbon_1.default.NS).toBe(NS);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "ObjectSchema", "Carbon/ObjectSchema"), function () {
            expect(Carbon_1.default.ObjectSchema).toBeDefined();
            expect(Carbon_1.default.ObjectSchema).toBe(ObjectSchema);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Persisted", "Carbon/Persisted"), function () {
            expect(Carbon_1.default.Persisted).toBeDefined();
            expect(Carbon_1.default.Persisted).toBe(Persisted);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "PersistedApp", "Carbon/PersistedApp"), function () {
            expect(Carbon_1.default.PersistedApp).toBeDefined();
            expect(Carbon_1.default.PersistedApp).toBe(PersistedApp);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "PersistedDocument", "Carbon/PersistedDocument"), function () {
            expect(Carbon_1.default.PersistedDocument).toBeDefined();
            expect(Carbon_1.default.PersistedDocument).toBe(PersistedDocument);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "PersistedFragment", "Carbon/PersistedFragment"), function () {
            expect(Carbon_1.default.PersistedFragment).toBeDefined();
            expect(Carbon_1.default.PersistedFragment).toBe(PersistedFragment);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "PersistedNamedFragment", "Carbon/PersistedNamedFragment"), function () {
            expect(Carbon_1.default.PersistedNamedFragment).toBeDefined();
            expect(Carbon_1.default.PersistedNamedFragment).toBe(PersistedNamedFragment);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "PersistedResource", "Carbon/PersistedResource"), function () {
            expect(Carbon_1.default.PersistedResource).toBeDefined();
            expect(Carbon_1.default.PersistedResource).toBe(PersistedResource);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Pointer", "Carbon/Pointer"), function () {
            expect(Carbon_1.default.Pointer).toBeDefined();
            expect(Carbon_1.default.Pointer).toBe(Pointer);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RDF", "Carbon/RDF"), function () {
            expect(Carbon_1.default.RDF).toBeDefined();
            expect(Carbon_1.default.RDF).toBe(RDF);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Resource", "Carbon/Resource"), function () {
            expect(Carbon_1.default.Resource).toBeDefined();
            expect(Carbon_1.default.Resource).toBe(Resource);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "SDKContext", "Carbon/SDKContext"), function () {
            expect(Carbon_1.default.SDKContext).toBeDefined();
            expect(Carbon_1.default.SDKContext).toBe(SDKContext);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "SPARQL", "Carbon/SPARQL"), function () {
            expect(Carbon_1.default.SPARQL).toBeDefined();
            expect(Carbon_1.default.SPARQL).toBe(SPARQL);
        });
        it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Utils", "Carbon/Utils"), function () {
            expect(Carbon_1.default.Utils).toBeDefined();
            expect(Carbon_1.default.Utils).toBe(Utils);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "settings", type: "any", optional: true }
        ]), function () {
            expect(carbon).toBeTruthy();
            expect(carbon instanceof Carbon_1.default).toBe(true);
            expect(myCarbon).toBeTruthy();
            expect(myCarbon instanceof Carbon_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "resolve", "Resolve the URI provided in the context of the instance, this information is provided in the settings object.", [
            { name: "uri", type: "string" }
        ], { type: "string" }), function () {
            expect(carbon.resolve).toBeDefined();
            expect(Utils.isFunction(carbon.resolve)).toBe(true);
            expect(carbon.resolve("http://example.com/platform/my-resource/")).toBe("http://example.com/platform/my-resource/");
            expect(carbon.resolve("my-resource/")).toBe("https://carbonldp.com/platform/my-resource/");
            expect(myCarbon.resolve("http://example.com/example-platform/my-resource/")).toBe("http://example.com/example-platform/my-resource/");
            expect(myCarbon.resolve("my-resource/")).toBe("http://example.com/example-platform/my-resource/");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getAPIDescription", "Returns the API description of the connected platform in the instance of Carbon", { type: "Promise<Carbon.APIDescription.Class>" }), function (done) {
            expect(carbon.getAPIDescription).toBeDefined();
            expect(Utils.isFunction(carbon.getAPIDescription)).toBe(true);
            jasmine.Ajax.stubRequest(/api/, null, "GET").andReturn({
                status: 200,
                responseHeaders: {
                    "ETag": 'W/"123456789"'
                },
                responseText: "[{\n\t\t\t\t    \"@graph\": [{\n\t\t\t\t        \"@id\": \"https://carbonldp.com/platform/api/\",\n\t\t\t\t        \"@type\": [\n\t\t\t\t\t\t\t\"http://www.w3.org/ns/ldp#Resource\",\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#API\",\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t        ],\n\t\t\t\t        \"https://carbonldp.com/ns/v1/platform#buildDate\": [{\n\t\t\t\t            \"@type\": \"http://www.w3.org/2001/XMLSchema#dateTime\",\n\t\t\t\t            \"@value\": \"2016-06-01T00:00:00.000-06:00\"\n\t\t\t\t        }],\n\t\t\t\t        \"https://carbonldp.com/ns/v1/platform#version\": [{\n\t\t\t\t            \"@value\": \"1.0.0\"\n\t\t\t\t        }]\n\t\t\t\t      }\n\t\t\t\t    ],\n\t\t\t\t    \"@id\": \"https://carbonldp.com/platform/api/\"\n\t\t\t\t}]"
            });
            var promise;
            promise = carbon.getAPIDescription();
            expect(promise instanceof Promise).toBe(true);
            promise.then(function (description) {
                expect(description).toBeTruthy();
                expect(description.version).toBe("1.0.0");
                done();
            }, done.fail);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "apps", "Carbon.Apps.Class", "Instance of the class `Carbon.Apps` in the context of the Carbon instance."), function () {
            expect(carbon.apps).toBeDefined();
            expect(Utils.isObject(carbon.apps));
            expect(carbon.apps instanceof Apps.Class);
        });
    });
});
