"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SDKContext = require("./SDKContext");
var SDKContext_1 = require("./SDKContext");
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Auth = require("./Auth");
var Documents_1 = require("./Documents");
var ObjectSchema = require("./ObjectSchema");
describe(JasmineExtender_1.module("Carbon/SDKContext"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(SDKContext).toBeDefined();
        expect(Utils.isObject(SDKContext)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.SDKContext.Class", "Base class for every Context in the SDK."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(SDKContext.Class).toBeDefined();
            expect(Utils.isFunction(SDKContext.Class)).toBe(true);
        });
        var context;
        beforeEach(function () {
            context = new SDKContext.Class();
            jasmine.addMatchers({
                toEqual: function (util) {
                    return {
                        compare: function (actual, expected) {
                            return { pass: util.equals(actual, expected, [compareMap]) };
                        }
                    };
                    function compareMap(actual, expected) {
                        if (actual instanceof Map) {
                            var pass = actual.size === expected.size;
                            if (pass) {
                                actual.forEach(function (v, k) { pass = pass && util.equals(v, expected.get(k)); });
                            }
                            return pass;
                        }
                        else {
                            return undefined;
                        }
                    }
                }
            });
        });
        it(JasmineExtender_1.hasConstructor(), function () {
            expect(context).toBeTruthy();
            expect(context instanceof SDKContext.Class);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "auth", "Carbon.Auth.Class", "Instance of Auth class for manage all the authentications in the context."), function () {
            expect(context.auth).toBeDefined();
            expect(context.auth instanceof Auth.Class);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "documents", "Carbon.Documents", "Instance of Documents class for manage all the documents in the context."), function () {
            expect(context.documents).toBeDefined();
            expect(context.documents instanceof Documents_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "parentContext", "Carbon.Context", "Accessor for the parent context of the context. It is null since SDKContext.Class its the base of all context."), function () {
            expect(context.parentContext).toBeDefined();
            expect(context.parentContext).toBeNull();
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getBaseURI", "Returns the base URI of the context, witch for is an empty string for this context.", { type: "string" }), function () {
            expect(context.getBaseURI).toBeDefined();
            expect(Utils.isFunction(context.getBaseURI)).toBe(true);
            expect(context.getBaseURI()).toBe("");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "resolve", "Returns URI provided resolved in this context, witch is the same URI provided.", [
            { name: "relativeURI", type: "string" }
        ], { type: "string" }), function () {
            expect(context.resolve).toBeDefined();
            expect(Utils.isFunction(context.resolve)).toBe(true);
            expect(context.resolve("http://example.com/a/uri/")).toBe("http://example.com/a/uri/");
            expect(context.resolve("a/relative/uri/")).toBe("a/relative/uri/");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "hasSetting", "Returns true if the setting looked for is established in the context.", [
            { name: "name", type: "string" }
        ], { type: "boolean" }), function () {
            expect(context.hasSetting).toBeDefined();
            expect(Utils.isFunction(context.hasSetting)).toBe(true);
            expect(context.hasSetting("a.setting")).toBe(false);
            var MyContext = (function (_super) {
                __extends(MyContext, _super);
                function MyContext() {
                    _super.call(this);
                    this.settings.set("a.setting", "my setting");
                }
                return MyContext;
            }(SDKContext.Class));
            var mockedContext = new MyContext();
            expect(mockedContext.hasSetting("a.setting")).toBe(true);
            expect(mockedContext.hasSetting("another.setting")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getSetting", "Returns the value of the setting looked for.\n\t\t\tReturns `null` if no settign with the name specified exists.", [
            { name: "name", type: "string" }
        ], { type: "string" }), function () {
            expect(context.getSetting).toBeDefined();
            expect(Utils.isFunction(context.getSetting)).toBeDefined();
            expect(context.getSetting("a.setting ")).toBeNull();
            var MyContext = (function (_super) {
                __extends(MyContext, _super);
                function MyContext() {
                    _super.call(this);
                    this.settings.set("a.setting", "my setting");
                }
                return MyContext;
            }(SDKContext.Class));
            var mockedContext = new MyContext();
            expect(mockedContext.getSetting("a.setting")).toBe("my setting");
            expect(mockedContext.getSetting("another.setting")).toBeNull();
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "setSetting", "Set a setting in the the context.", [
            { name: "name", type: "string" },
            { name: "value", type: "any" }
        ]), function () {
            expect(context.setSetting).toBeDefined();
            expect(Utils.isFunction(context.setSetting)).toBe(true);
            context.setSetting("a.setting", "my setting");
            expect(context.hasSetting("a.setting")).toBe(true);
            context.setSetting("a.setting", "the same setting");
            expect(context.getSetting("a.setting")).toBe("the same setting");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "deleteSetting", "Deletes the setting specified from the the context.", [
            { name: "name", type: "string" }
        ]), function () {
            expect(context.deleteSetting).toBeDefined();
            expect(Utils.isFunction(context.deleteSetting)).toBe(true);
            var MyContext = (function (_super) {
                __extends(MyContext, _super);
                function MyContext() {
                    _super.call(this);
                    this.settings.set("a.setting", "my setting");
                }
                return MyContext;
            }(SDKContext.Class));
            var mockedContext = new MyContext();
            mockedContext.deleteSetting("a.setting");
            expect(mockedContext.hasSetting("a.setting")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "hasObjectSchema", "Returns true if the is an ObjectSchema for the specified type.", [
            { name: "type", type: "string" }
        ], { type: "boolean" }), function () {
            expect(context.hasObjectSchema).toBeDefined();
            expect(Utils.isFunction(context.hasObjectSchema)).toBe(true);
            expect(context.hasObjectSchema("http://example.com/ns#MyType")).toBe(false);
            var MyContext = (function (_super) {
                __extends(MyContext, _super);
                function MyContext() {
                    _super.call(this);
                    this.typeObjectSchemaMap.set("http://example.com/ns#MyType", null);
                }
                return MyContext;
            }(SDKContext.Class));
            var mockedContext = new MyContext();
            expect(mockedContext.hasObjectSchema("http://example.com/ns#MyType")).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getObjectSchema", "Returns the ObjectSchema for the specified type or null if not exits.\n\t\t\tIf no type specified the general object schema of the context is returned. This is an schema that applies for all the types.", [
            { name: "type", type: "string", optional: true, default: "null" }
        ], { type: "Carbon.ObjectSchema.DigestedObjectSchema" }), function () {
            expect(context.getObjectSchema).toBeDefined();
            expect(Utils.isFunction(context.getObjectSchema)).toBe(true);
            var rawObjectSchema = {
                "ex": "http://example.com/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "string": {
                    "@id": "ex:string",
                    "@type": "xsd:string"
                },
                "pointer": {
                    "@id": "ex:pointer",
                    "@type": "@id"
                }
            };
            var objectSchema;
            objectSchema = new ObjectSchema.DigestedObjectSchema();
            var MyContext = (function (_super) {
                __extends(MyContext, _super);
                function MyContext() {
                    _super.call(this);
                    this.typeObjectSchemaMap.set("http://example.com/ns#MyType", objectSchema);
                    this.generalObjectSchema = ObjectSchema.Digester.digestSchema(rawObjectSchema);
                }
                return MyContext;
            }(SDKContext.Class));
            var mockedContext = new MyContext();
            expect(context.getObjectSchema("http://example.com/ns#MyType")).toBeNull();
            var returnedSchema;
            returnedSchema = mockedContext.getObjectSchema("http://example.com/ns#MyType");
            expect(returnedSchema instanceof ObjectSchema.DigestedObjectSchema).toBe(true);
            expect(returnedSchema).toBe(objectSchema);
            returnedSchema = context.getObjectSchema();
            expect(returnedSchema instanceof ObjectSchema.DigestedObjectSchema).toBe(true);
            expect(returnedSchema).toEqual(SDKContext.instance.getObjectSchema());
            returnedSchema = mockedContext.getObjectSchema();
            expect(returnedSchema instanceof ObjectSchema.DigestedObjectSchema).toBe(true);
            expect(returnedSchema).toEqual(ObjectSchema.Digester.digestSchema(rawObjectSchema));
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "extendObjectSchema"), function () {
            it(JasmineExtender_1.hasSignature("Extends an Schema for a specified type of Resource", [
                { name: "type", type: "string" },
                { name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema" }
            ]), function () {
                expect(context.extendObjectSchema).toBeDefined();
                expect(Utils.isFunction(context.extendObjectSchema)).toBe(true);
                var objectSchema = {
                    "ex": "http://example.com/ns#",
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "string": {
                        "@id": "ex:string",
                        "@type": "xsd:string"
                    },
                    "pointer": {
                        "@id": "ex:pointer",
                        "@type": "@id"
                    }
                };
                context.extendObjectSchema("http://example.com/ns#MyType", objectSchema);
                expect(context.hasObjectSchema("http://example.com/ns#MyType")).toBe(true);
                var digestedSchema = context.getObjectSchema("http://example.com/ns#MyType");
                expect(digestedSchema instanceof ObjectSchema.DigestedObjectSchema).toBe(true);
                expect(digestedSchema).toEqual(ObjectSchema.Digester.digestSchema(objectSchema));
            });
            it(JasmineExtender_1.hasSignature("Extends the General Schema of the context.", [
                { name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema" }
            ]), function () {
                expect(context.extendObjectSchema).toBeDefined();
                expect(Utils.isFunction(context.extendObjectSchema)).toBe(true);
                var objectSchema = {
                    "ex": "http://example.com/ns#",
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "string": {
                        "@id": "ex:string",
                        "@type": "xsd:string"
                    },
                    "pointer": {
                        "@id": "ex:pointer",
                        "@type": "@id"
                    }
                };
                context.extendObjectSchema(objectSchema);
                var digestedSchema = context.getObjectSchema();
                expect(digestedSchema instanceof ObjectSchema.DigestedObjectSchema).toBe(true);
                var some = new ObjectSchema.DigestedObjectSchema();
                expect(digestedSchema.properties).not.toEqual(some.properties);
                var expectedDigestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas([
                    ObjectSchema.Digester.digestSchema(objectSchema),
                    SDKContext.instance.getObjectSchema(),
                ]);
                expect(digestedSchema).toEqual(expectedDigestedSchema);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "clearObjectSchema", "Remove the Schema of the type specified, if not provided empty the General Schema.", [
            { name: "type", type: "string", optional: true }
        ]), function () {
            expect(context.clearObjectSchema).toBeDefined();
            expect(Utils.isFunction(context.clearObjectSchema)).toBe(true);
            var rawObjectSchema = {
                "ex": "http://example.com/ns#",
                "xsd": "http://www.w3.org/2001/XMLSchema#",
                "string": {
                    "@id": "ex:string",
                    "@type": "xsd:string"
                },
                "pointer": {
                    "@id": "ex:pointer",
                    "@type": "@id"
                }
            };
            var objectSchema = ObjectSchema.Digester.digestSchema(rawObjectSchema);
            var MyContext = (function (_super) {
                __extends(MyContext, _super);
                function MyContext() {
                    _super.call(this);
                    this.typeObjectSchemaMap.set("http://example.com/ns#MyType", objectSchema);
                    this.generalObjectSchema = ObjectSchema.Digester.digestSchema(rawObjectSchema);
                }
                return MyContext;
            }(SDKContext.Class));
            var mockedContext = new MyContext();
            expect(mockedContext.hasObjectSchema("http://example.com/ns#MyType")).toBe(true);
            mockedContext.clearObjectSchema("http://example.com/ns#MyType");
            expect(mockedContext.hasObjectSchema("http://example.com/ns#MyType")).toBe(false);
            var returnedSchema;
            returnedSchema = mockedContext.getObjectSchema();
            expect(returnedSchema).toEqual(objectSchema);
            mockedContext.clearObjectSchema();
            returnedSchema = mockedContext.getObjectSchema();
            expect(returnedSchema).not.toEqual(objectSchema);
            expect(returnedSchema).toEqual(new ObjectSchema.DigestedObjectSchema());
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "instance", "Carbon.SDKContext.Class", "Instance of SDKContext.Class for be used as a singleton and for base parent in every context."), function () {
        expect(SDKContext.instance).toBeDefined();
        expect(SDKContext.instance).toBeTruthy();
        expect(SDKContext.instance instanceof SDKContext.Class).toBe(true);
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.SDKContext.instance"), function () {
        expect(SDKContext_1.default).toBeDefined();
        expect(SDKContext_1.default).toBe(SDKContext.instance);
    });
});
