"use strict";
var DirectContainer = require("./DirectContainer");
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var NS = require("./../NS");
var Errors = require("./../Errors");
var Pointer = require("./../Pointer");
var Document = require("./../Document");
describe(JasmineExtender_1.module("Carbon/LDP/DirectContainer"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(DirectContainer).toBeDefined();
        expect(Utils.isObject(DirectContainer)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "RDF_CLASS", "string"), function () {
        expect(DirectContainer.RDF_CLASS).toBeDefined();
        expect(Utils.isString(DirectContainer.RDF_CLASS)).toBe(true);
        expect(DirectContainer.RDF_CLASS).toBe(NS.LDP.Class.DirectContainer);
    });
    describe(JasmineExtender_1.clazz("Carbon.DirectContainer.Factory", "Factory class for `Carbon.LDP.DirectContainer.Class` objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(DirectContainer.Factory).toBeDefined();
            expect(Utils.isFunction(DirectContainer.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties that defines a `Carbon.LDP.DirectContainer.Class` object", [
            { name: "resource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(DirectContainer.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(DirectContainer.Factory.hasClassProperties)).toBe(true);
            var object = {};
            expect(DirectContainer.Factory.hasClassProperties(object)).toBe(false);
            object.membershipResource = "http://example.com/myNamespace#some-relation";
            expect(DirectContainer.Factory.hasClassProperties(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided is considered as an `Carbon.LDP.DirectContainer.Class` object", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(DirectContainer.Factory.is).toBeDefined();
            expect(Utils.isFunction(DirectContainer.Factory.is)).toBe(true);
            var object;
            object = {};
            expect(DirectContainer.Factory.is(object)).toBe(false);
            object.membershipResource = "http://example.com/myNamespace#some-relation";
            expect(DirectContainer.Factory.is(object)).toBe(false);
            object.types = [NS.LDP.Class.DirectContainer];
            expect(DirectContainer.Factory.is(object)).toBe(false);
            object = Document.Factory.create();
            expect(DirectContainer.Factory.is(object)).toBe(false);
            object.membershipResource = "http://example.com/myNamespace#some-relation";
            expect(DirectContainer.Factory.is(object)).toBe(false);
            object.types.push(NS.LDP.Class.DirectContainer);
            expect(DirectContainer.Factory.is(object)).toBe(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "hasRDFClass"), function () {
            it(JasmineExtender_1.hasSignature("Returns true if the Pointer provided is an LDP DirectContainer.", [
                { name: "pointer", type: "Carbon.Pointer.Class" }
            ], { type: "boolean" }), function () {
                expect(DirectContainer.Factory.hasRDFClass).toBeDefined();
                expect(Utils.isFunction(DirectContainer.Factory.hasRDFClass)).toBe(true);
                var pointer;
                pointer = Document.Factory.create();
                expect(DirectContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/access-point/";
                expect(DirectContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/access-point/";
                pointer.types.push(NS.LDP.Class.Container);
                expect(DirectContainer.Factory.hasRDFClass(pointer)).toBe(false);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/access-point/";
                pointer.types.push(NS.LDP.Class.DirectContainer);
                expect(DirectContainer.Factory.hasRDFClass(pointer)).toBe(true);
                pointer = Document.Factory.create();
                pointer.id = "http://example.com/access-point/";
                pointer.types.push(NS.LDP.Class.Container);
                pointer.types.push(NS.LDP.Class.DirectContainer);
                expect(DirectContainer.Factory.hasRDFClass(pointer)).toBe(true);
            });
            it(JasmineExtender_1.hasSignature("Returns true if the Object provided is an LDP DirectContainer.", [
                { name: "expandedObject", type: "Object" }
            ], { type: "boolean" }), function () {
                expect(DirectContainer.Factory.hasRDFClass).toBeDefined();
                expect(Utils.isFunction(DirectContainer.Factory.hasRDFClass)).toBe(true);
                var object = {};
                expect(DirectContainer.Factory.hasRDFClass(object)).toBe(false);
                object = {
                    "@id": "http://example.com/access-point/",
                    "@type": [],
                    "http://example.com/ns#string": [{
                            "@value": "a string"
                        }],
                    "http://example.com/ns#integer": [{
                            "@value": "100",
                            "@type": "http://www.w3.org/2001/XMLSchema#integer"
                        }]
                };
                expect(DirectContainer.Factory.hasRDFClass(object)).toBe(false);
                object = {
                    "@id": "http://example.com/access-point/",
                    "@type": [
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
                expect(DirectContainer.Factory.hasRDFClass(object)).toBe(false);
                object = {
                    "@id": "http://example.com/access-point/",
                    "@type": [
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
                expect(DirectContainer.Factory.hasRDFClass(object)).toBe(true);
                object = {
                    "@id": "http://example.com/access-point/",
                    "@type": [
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
                expect(DirectContainer.Factory.hasRDFClass(object)).toBe(true);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Create a `Carbon.LDP.DirectContainer.Class` object with the parameters specified.", [
            { name: "membershipResource", type: "Carbon.Pointer.Class" },
            { name: "hasMemberRelation", type: "string | Carbon.Pointer.Class" },
            { name: "memberOfRelation", type: "string | Carbon.Pointer.Class", optional: true }
        ], { type: "Carbon.LDP.DirectContainer.Class" }), function () {
            expect(DirectContainer.Factory.create).toBeDefined();
            expect(Utils.isFunction(DirectContainer.Factory.create)).toBe(true);
            var spy = spyOn(DirectContainer.Factory, "createFrom");
            var pointer = Pointer.Factory.create();
            DirectContainer.Factory.create(pointer, "http://example.com/myNamespace#some-relation");
            expect(spy).toHaveBeenCalledWith({}, pointer, "http://example.com/myNamespace#some-relation", undefined);
            spy.calls.reset();
            DirectContainer.Factory.create(pointer, pointer);
            expect(spy).toHaveBeenCalledWith({}, pointer, pointer, undefined);
            spy.calls.reset();
            DirectContainer.Factory.create(pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation");
            expect(spy).toHaveBeenCalledWith({}, pointer, "http://example.com/myNamespace#some-relation", "http://example.com/myNamespace#some-inverted-relation");
            spy.calls.reset();
            DirectContainer.Factory.create(pointer, pointer, pointer);
            expect(spy).toHaveBeenCalledWith({}, pointer, pointer, pointer);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createFrom", "Create a `Carbon.LDP.DirectContainer.Class` object with the object provided and the parameters specified.", [
            { name: "object", type: "T extends Object" },
            { name: "membershipResource", type: "Carbon.Pointer.Class" },
            { name: "hasMemberRelation", type: "string | Carbon.Pointer.Class" },
            { name: "memberOfRelation", type: "string | Carbon.Pointer.Class", optional: true }
        ], { type: "T & Carbon.LDP.DirectContainer.Class" }), function () {
            expect(DirectContainer.Factory.createFrom).toBeDefined();
            expect(Utils.isFunction(DirectContainer.Factory.createFrom)).toBe(true);
            var membershipResource = Pointer.Factory.create("http://example.com/theResource/");
            var hasMemberRelation = Pointer.Factory.create("http://example.com/myNamespace#some-relation");
            var memberOfRelation = Pointer.Factory.create("http://example.com/myNamespace#some-inverted-relation");
            var directContainer;
            directContainer = DirectContainer.Factory.createFrom({}, membershipResource, "http://example.com/myNamespace#some-relation");
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBeUndefined();
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toEqual(hasMemberRelation);
            expect(directContainer.memberOfRelation).toBeUndefined();
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({}, membershipResource, hasMemberRelation);
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBeUndefined();
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toBe(hasMemberRelation);
            expect(directContainer.memberOfRelation).toBeUndefined();
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({}, membershipResource, "http://example.com/myNamespace#some-relation", "http://example.com/myNamesape#some-inverted-relation");
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBeUndefined();
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toEqual(hasMemberRelation);
            expect(directContainer.memberOfRelation).toEqual(memberOfRelation);
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({}, membershipResource, hasMemberRelation, "http://example.com/myNamesape#some-inverted-relation");
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBeUndefined();
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toBe(hasMemberRelation);
            expect(directContainer.memberOfRelation).toEqual(memberOfRelation);
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({}, membershipResource, hasMemberRelation, memberOfRelation);
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBeUndefined();
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toBe(hasMemberRelation);
            expect(directContainer.memberOfRelation).toBe(memberOfRelation);
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({ myProperty: "The property" }, membershipResource, "http://example.com/myNamespace#some-relation");
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBe("The property");
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toEqual(hasMemberRelation);
            expect(directContainer.memberOfRelation).toBeUndefined();
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({ myProperty: "The property" }, membershipResource, hasMemberRelation);
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBe("The property");
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toBe(hasMemberRelation);
            expect(directContainer.memberOfRelation).toBeUndefined();
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({ myProperty: "The property" }, membershipResource, "http://example.com/myNamespace#some-relation", "http://example.com/myNamesape#some-inverted-relation");
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBe("The property");
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toEqual(hasMemberRelation);
            expect(directContainer.memberOfRelation).toEqual(memberOfRelation);
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({ myProperty: "The property" }, membershipResource, hasMemberRelation, "http://example.com/myNamesape#some-inverted-relation");
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBe("The property");
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toBe(hasMemberRelation);
            expect(directContainer.memberOfRelation).toEqual(memberOfRelation);
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            directContainer = DirectContainer.Factory.createFrom({ myProperty: "The property" }, membershipResource, hasMemberRelation, memberOfRelation);
            expect(DirectContainer.Factory.is(directContainer)).toBe(true);
            expect(directContainer.myProperty).toBe("The property");
            expect(directContainer.membershipResource).toBe(membershipResource);
            expect(directContainer.hasMemberRelation).toBe(hasMemberRelation);
            expect(directContainer.memberOfRelation).toBe(memberOfRelation);
            expect(directContainer.types).toContain(NS.LDP.Class.DirectContainer);
            expect(function () { return DirectContainer.Factory.createFrom(directContainer, membershipResource, hasMemberRelation); }).toThrowError(Errors.IllegalArgumentError);
            expect(function () { return DirectContainer.Factory.createFrom({}, null, hasMemberRelation); }).toThrowError(Errors.IllegalArgumentError);
        });
    });
});
