"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Document = require("./../Document");
var Container = require("./Container");
describe(JasmineExtender_1.module("Carbon/LDP/Container"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Container).toBeDefined();
        expect(Utils.isObject(Container)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(Container.RDF_CLASS).toBeDefined();
        expect(Utils.isString(Container.RDF_CLASS)).toBe(true);
        expect(Container.RDF_CLASS).toBe(NS.LDP.Class.Container);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SCHEMA", "Carbon.ObjectSchema.Class"), function () {
        expect(Container.SCHEMA).toBeDefined();
        expect(Utils.isObject(Container.SCHEMA)).toBe(true);
        expect(Utils.hasProperty(Container.SCHEMA, "contains")).toBe(true);
        expect(Container.SCHEMA["contains"]).toEqual({
            "@id": NS.LDP.Predicate.contains,
            "@container": "@set",
            "@type": "@id"
        });
        expect(Utils.hasProperty(Container.SCHEMA, "members")).toBe(true);
        expect(Container.SCHEMA["members"]).toEqual({
            "@id": NS.LDP.Predicate.member,
            "@container": "@set",
            "@type": "@id"
        });
        expect(Utils.hasProperty(Container.SCHEMA, "memberOfRelation")).toBe(true);
        expect(Container.SCHEMA["memberOfRelation"]).toEqual({
            "@id": NS.LDP.Predicate.memberOfRelation,
            "@type": "@id"
        });
        expect(Utils.hasProperty(Container.SCHEMA, "hasMemberRelation")).toBe(true);
        expect(Container.SCHEMA["hasMemberRelation"]).toEqual({
            "@id": NS.LDP.Predicate.hasMemberRelation,
            "@type": "@id"
        });
        expect(Utils.hasProperty(Container.SCHEMA, "insertedContentRelation")).toBe(true);
        expect(Container.SCHEMA["insertedContentRelation"]).toEqual({
            "@id": NS.LDP.Predicate.insertedContentRelation,
            "@type": "@id"
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.LDP.Container.Factory", "Factory class for LDP Container objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Container.Factory).toBeDefined();
            expect(Utils.isFunction(Container.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object has the properties to be defined as a LDP Container", [
            { name: "resource", type: "Carbon.RDF.Node.Class" }
        ], { type: "boolean" }), function () {
            expect(Container.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(Container.Factory.hasClassProperties)).toBe(true);
            var object;
            object = {
                hasMemberRelation: Pointer.Factory.create("http://example.com/memberOf/"),
                memberOfRelation: Pointer.Factory.create("http://example.com/isAMemberOf/")
            };
            expect(Container.Factory.hasClassProperties(object)).toBe(true);
            object = {
                hasMemberRelation: Pointer.Factory.create("http://example.com/memberOf/")
            };
            expect(Container.Factory.hasClassProperties(object)).toBe(false);
            object = {
                memberOfRelation: Pointer.Factory.create("http://example.com/isAMemberOf/")
            };
            expect(Container.Factory.hasClassProperties(object)).toBe(false);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "hasRDFClass"), function () {
            it(JasmineExtender_1.hasSignature("Returns true if the Pointer provided is an LDP Container.", [
                { name: "pointer", type: "Carbon.Pointer.Class" }
            ], { type: "boolean" }), function () {
                expect(Container.Factory.hasRDFClass).toBeDefined();
                expect(Utils.isFunction(Container.Factory.hasRDFClass)).toBe(true);
                var pointer;
                pointer = Document.Factory.create();
                expect(Container.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                expect(Container.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.Container);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.BasicContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.DirectContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.IndirectContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.BasicContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.DirectContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.IndirectContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.BasicContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.DirectContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.IndirectContainer);
                expect(Container.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Pointer.Factory.create("http://example.com/resource/#pointer");
                expect(Container.Factory.hasRDFClass(pointer)).toBe(false);
            });
            it(JasmineExtender_1.hasSignature("Returns true if the Object provided is an LDP Container.", [
                { name: "expandedObject", type: "Object" }
            ], { type: "boolean" }), function () {
                expect(Container.Factory.hasRDFClass).toBeDefined();
                expect(Utils.isFunction(Container.Factory.hasRDFClass)).toBe(true);
                var object;
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
                        "http://www.w3.org/ns/ldp#RDFSource",
                        "http://www.w3.org/ns/ldp#Container",
                        "http://www.w3.org/ns/ldp#BasicContainer"
                    ],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
                        "http://www.w3.org/ns/ldp#RDFSource",
                        "http://www.w3.org/ns/ldp#Container",
                        "http://www.w3.org/ns/ldp#DirectContainer"
                    ],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
                        "http://www.w3.org/ns/ldp#RDFSource",
                        "http://www.w3.org/ns/ldp#Container",
                        "http://www.w3.org/ns/ldp#IndirectContainer"
                    ],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
                        "http://www.w3.org/ns/ldp#RDFSource",
                        "http://www.w3.org/ns/ldp#BasicContainer"
                    ],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
                        "http://www.w3.org/ns/ldp#RDFSource",
                        "http://www.w3.org/ns/ldp#DirectContainer"
                    ],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
                        "http://www.w3.org/ns/ldp#RDFSource",
                        "http://www.w3.org/ns/ldp#IndirectContainer"
                    ],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
                        "http://www.w3.org/ns/ldp#RDFSource",
                        "http://www.w3.org/ns/ldp#Container"
                    ],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
                        "http://www.w3.org/ns/ldp#RDFSource"
                    ],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(false);
                object = {
                    "@id": "http://example.com/resource/",
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(Container.Factory.hasRDFClass(object)).toBe(false);
                expect(Container.Factory.hasRDFClass({})).toBe(false);
            });
        });
    });
});
