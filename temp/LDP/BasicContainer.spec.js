"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Document = require("./../Document");
var BasicContainer = require("./BasicContainer");
describe(JasmineExtender_1.module("Carbon/LDP/BasicContainer"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(BasicContainer).toBeDefined();
        expect(Utils.isObject(BasicContainer)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(BasicContainer.RDF_CLASS).toBeDefined();
        expect(Utils.isString(BasicContainer.RDF_CLASS)).toBe(true);
        expect(BasicContainer.RDF_CLASS).toBe(NS.LDP.Class.BasicContainer);
    });
    describe(JasmineExtender_1.clazz("Carbon.LDP.BasicContainer.Factory", "Factory class for LDP BasicContainer objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(BasicContainer.Factory).toBeDefined();
            expect(Utils.isFunction(BasicContainer.Factory)).toBe(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "hasRDFClass"), function () {
            it(JasmineExtender_1.hasSignature("Returns true if the Pointer provided is an LDP BasicContainer.", [
                { name: "pointer", type: "Carbon.Pointer.Class" }
            ], { type: "boolean" }), function () {
                expect(BasicContainer.Factory.hasRDFClass).toBeDefined();
                expect(Utils.isFunction(BasicContainer.Factory.hasRDFClass)).toBe(true);
                var pointer;
                pointer = Document.Factory.create();
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.Container);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.DirectContainer);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.IndirectContainer);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.DirectContainer);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.IndirectContainer);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.BasicContainer);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.BasicContainer);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/resource/";
                pointer.types.push(NS.LDP.Class.RDFSource);
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.BasicContainer);
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Pointer.Factory.create("http://example.com/resource/#pointer");
                expect(BasicContainer.Factory.hasRDFClass(pointer)).toBe(false);
            });
            it(JasmineExtender_1.hasSignature("Returns true if the Pointer provided is an LDP BasicContainer.", [
                { name: "pointer", type: "Carbon.Pointer.Class" }
            ], { type: "boolean" }), function () {
                expect(BasicContainer.Factory.hasRDFClass).toBeDefined();
                expect(Utils.isFunction(BasicContainer.Factory.hasRDFClass)).toBe(true);
                var object;
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
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
                expect(BasicContainer.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/resource/",
                    "@type": [
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
                expect(BasicContainer.Factory.hasRDFClass(object)).toBe(true);
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
                expect(BasicContainer.Factory.hasRDFClass(object)).toBe(true);
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
                expect(BasicContainer.Factory.hasRDFClass(object)).toBe(false);
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
                expect(BasicContainer.Factory.hasRDFClass(object)).toBe(false);
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
                expect(BasicContainer.Factory.hasRDFClass(object)).toBe(false);
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
                expect(BasicContainer.Factory.hasRDFClass(object)).toBe(false);
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
                expect(BasicContainer.Factory.hasRDFClass(object)).toBe(false);
                expect(BasicContainer.Factory.hasRDFClass({})).toBe(false);
            });
        });
    });
});
