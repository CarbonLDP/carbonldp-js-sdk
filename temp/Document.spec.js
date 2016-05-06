"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Errors = require("./Errors");
var Pointer = require("./Pointer");
var Fragment = require("./Fragment");
var NamedFragment = require("./NamedFragment");
var URI = require("./RDF/URI");
var AbstractContext_1 = require("./AbstractContext");
var JSONLDConverter_1 = require("./JSONLDConverter");
var Resource = require("./Resource");
var Document = require("./Document");
describe(JasmineExtender_1.module("Carbon/Document"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Document).toBeDefined();
        expect(Utils.isObject(Document)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Document.Factory", "Factory class for Document objects."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Document.Factory).toBeDefined();
            expect(Utils.isFunction(Document.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object provided has the properties and functions of a Document object", [
            { name: "documentResource", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(Document.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(Document.Factory.hasClassProperties)).toBe(true);
            var resource = undefined;
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource = {};
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["_fragmentsIndex"] = null;
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["hasFragment"] = function () { };
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["getFragment"] = function () { };
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["getNamedFragment"] = function () { };
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["getFragments"] = function () { };
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["createFragment"] = function () { };
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["createNamedFragment"] = function () { };
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["removeFragment"] = function () { };
            expect(Document.Factory.hasClassProperties(resource)).toBe(false);
            resource["toJSON"] = function () { };
            expect(Document.Factory.hasClassProperties(resource)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object is considered a Document object", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(Document.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(Document.Factory.hasClassProperties)).toBe(true);
            var resource = undefined;
            expect(Document.Factory.is(resource)).toBe(false);
            resource = {};
            expect(Document.Factory.is(resource)).toBe(false);
            resource["_fragmentsIndex"] = null;
            expect(Document.Factory.is(resource)).toBe(false);
            resource["hasFragment"] = function () { };
            expect(Document.Factory.is(resource)).toBe(false);
            resource["getFragment"] = function () { };
            expect(Document.Factory.is(resource)).toBe(false);
            resource["getNamedFragment"] = function () { };
            expect(Document.Factory.is(resource)).toBe(false);
            resource["getFragments"] = function () { };
            expect(Document.Factory.is(resource)).toBe(false);
            resource["createFragment"] = function () { };
            expect(Document.Factory.is(resource)).toBe(false);
            resource["createNamedFragment"] = function () { };
            expect(Document.Factory.is(resource)).toBe(false);
            resource["removeFragment"] = function () { };
            expect(Document.Factory.is(resource)).toBe(false);
            resource["toJSON"] = function () { };
            expect(Document.Factory.is(resource)).toBe(false);
            var document = Resource.Factory.createFrom(resource);
            expect(Document.Factory.is(document)).toBe(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "create"), function () {
            it(JasmineExtender_1.hasSignature("Creates an empty Document object.", { type: "Carbon.Document.Class" }), function () {
                expect(Document.Factory.create).toBeDefined();
                expect(Utils.isFunction(Document.Factory.create)).toBe(true);
                var document;
                document = Document.Factory.create();
                expect(document.id).toBe("");
                expect(Document.Factory.hasClassProperties(document)).toBe(true);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "createFrom"), function () {
            it(JasmineExtender_1.hasSignature("Creates a Document object from the object provided.", [
                { name: "object", type: "T extends Object" }
            ], { type: "Carbon.Document.Class" }), function () {
                expect(Document.Factory.createFrom).toBeDefined();
                expect(Utils.isFunction(Document.Factory.createFrom)).toBe(true);
                var document;
                document = Document.Factory.createFrom({});
                expect(Document.Factory.hasClassProperties(document)).toBe(true);
                expect(document.id).toBe("");
                expect(document.myProperty).toBeUndefined();
                document = Document.Factory.createFrom({ myProperty: "a property" });
                expect(Document.Factory.hasClassProperties(document)).toBe(true);
                expect(document.id).toBe("");
                expect(document.myProperty).toBe("a property");
                (function () {
                    var object = {
                        myProperty: "THE property",
                        myBlankNode: {
                            myProperty: "A BlankNode property"
                        },
                        myNamedFragment: {
                            slug: "namedFragment",
                            myProperty: "A NamedFragment property"
                        }
                    };
                    document = Document.Factory.createFrom(object);
                    expect(object).toBe(document);
                    expect(document.id).toBe("");
                    expect(document.myProperty).toBe("THE property");
                    expect(document.hasFragment("namedFragment")).toBe(true);
                    var fragments = document.getFragments();
                    expect(fragments.length).toBe(2);
                    var theBNode, theNFragment;
                    theBNode = fragments[0];
                    theNFragment = fragments[1];
                    expect(URI.Util.isBNodeID(theBNode.id)).toBe(true);
                    expect(theBNode.myProperty).toBe("A BlankNode property");
                    expect(document["myBlankNode"]).toBe(theBNode);
                    expect(object["myBlankNode"]).toBe(document["myBlankNode"]);
                    expect(URI.Util.getFragment(theNFragment.id)).toEqual(theNFragment.slug);
                    expect(theNFragment.slug).toBe("namedFragment");
                    expect(theNFragment.myProperty).toBe("A NamedFragment property");
                    expect(document["myNamedFragment"]).toBe(theNFragment);
                    expect(object["myNamedFragment"]).toBe(document["myNamedFragment"]);
                })();
                (function () {
                    var object = {
                        myProperty: "THE property",
                        myBlankNode: {
                            myProperty: "A BlankNode property"
                        },
                        myNamedFragment: {
                            slug: "namedFragment",
                            myProperty: "A NamedFragment property",
                            anotherFragment: {
                                myProperty: "A nested BlankNode property"
                            }
                        }
                    };
                    document = Document.Factory.createFrom(object);
                    expect(object).toBe(document);
                    expect(document.id).toBe("");
                    expect(document.myProperty).toBe("THE property");
                    expect(document.hasFragment("namedFragment")).toBe(true);
                    var fragments = document.getFragments();
                    expect(fragments.length).toBe(3);
                    var theBNode, theNestedBNode, theNFragment;
                    theBNode = fragments[0];
                    theNFragment = fragments[1];
                    theNestedBNode = fragments[2];
                    expect(URI.Util.isBNodeID(theBNode.id)).toBe(true);
                    expect(theBNode.myProperty).toBe("A BlankNode property");
                    expect(document["myBlankNode"]).toBe(theBNode);
                    expect(object["myBlankNode"]).toBe(document["myBlankNode"]);
                    expect(URI.Util.getFragment(theNFragment.id)).toEqual(theNFragment.slug);
                    expect(theNFragment.slug).toBe("namedFragment");
                    expect(theNFragment.myProperty).toBe("A NamedFragment property");
                    expect(document["myNamedFragment"]).toBe(theNFragment);
                    expect(object["myNamedFragment"]).toBe(document["myNamedFragment"]);
                    expect(URI.Util.isBNodeID(theNestedBNode.id)).toBe(true);
                    expect(theNestedBNode.myProperty).toBe("A nested BlankNode property");
                    expect(theNFragment["anotherFragment"]).toBe(theNestedBNode);
                    expect(object["anotherFragment"]).toBe(document["anotherFragment"]);
                })();
                (function () {
                    var fragment = {
                        myProperty: "A BlankNode property"
                    };
                    var object = {
                        myProperty: "THE property",
                        myBlankNode: fragment,
                        myNamedFragment: {
                            slug: "namedFragment",
                            myProperty: "A NamedFragment property",
                            sameBlankNode: fragment
                        }
                    };
                    document = Document.Factory.createFrom(object);
                    expect(object).toBe(document);
                    expect(document.id).toBe("");
                    expect(document.myProperty).toBe("THE property");
                    expect(document.hasFragment("namedFragment")).toBe(true);
                    var fragments = document.getFragments();
                    expect(fragments.length).toBe(2);
                    var theBNode, theNFragment;
                    theBNode = fragments[0];
                    theNFragment = fragments[1];
                    expect(URI.Util.isBNodeID(theBNode.id)).toBe(true);
                    expect(theBNode.myProperty).toBe("A BlankNode property");
                    expect(document["myBlankNode"]).toBe(theBNode);
                    expect(document["myBlankNode"]).toBe(document["myNamedFragment"]["sameBlankNode"]);
                    expect(object["myBlankNode"]).toBe(document["myBlankNode"]);
                    expect(URI.Util.getFragment(theNFragment.id)).toEqual(theNFragment.slug);
                    expect(theNFragment.slug).toBe("namedFragment");
                    expect(theNFragment.myProperty).toBe("A NamedFragment property");
                    expect(document["myNamedFragment"]).toBe(theNFragment);
                    expect(object["myNamedFragment"]).toBe(document["myNamedFragment"]);
                    expect(theNFragment["sameBlankNode"]).toBe(theBNode);
                    expect(object["myNamedFragment"]["sameBlankNode"]).toBe(document["myNamedFragment"]["sameBlankNode"]);
                    expect(fragment).toBe(document["myBlankNode"]);
                })();
                (function () {
                    var anotherBlankNode_1 = {
                        id: "_:2",
                        myProperty: "Another BNode property",
                    };
                    var anotherBlankNode_2 = {
                        id: "_:2",
                        newProperty: "New property",
                    };
                    var object = {
                        id: "http://example.org/resource/",
                        myProperty: "THE property",
                        myNamedFragment: {
                            id: "http://example.org/resource/#namedFragment",
                            myProperty: "A NamedFragment property",
                            anotherBlankNode: anotherBlankNode_1
                        },
                        myBlankNode: {
                            id: "_:1",
                            myProperty: "A BNode property",
                            myNamedFragment: {
                                slug: "namedFragment",
                                myProperty: "A replace of the NamedFragment property",
                                anotherBlankNode: anotherBlankNode_2
                            }
                        }
                    };
                    document = Document.Factory.createFrom(object);
                    expect(object).toBe(document);
                    expect(document.id).toBe("http://example.org/resource/");
                    expect(document.myProperty).toBe("THE property");
                    expect(document.hasFragment("namedFragment")).toBe(true);
                    var fragments = document.getFragments();
                    expect(fragments.length).toBe(3);
                    var theBNode, anotherBNode, theNFragment;
                    theNFragment = fragments[0];
                    anotherBNode = fragments[1];
                    theBNode = fragments[2];
                    expect(URI.Util.getDocumentURI(theNFragment.id)).toEqual("http://example.org/resource/");
                    expect(URI.Util.getFragment(theNFragment.id)).toEqual(theNFragment.slug);
                    expect(theNFragment.slug).toBe("namedFragment");
                    expect(theNFragment.myProperty).toBe("A replace of the NamedFragment property");
                    expect(theNFragment["anotherBlankNode"]).toBe(anotherBNode);
                    expect(document["myNamedFragment"]).toBe(theNFragment);
                    expect(object["myNamedFragment"]).toBe(document["myNamedFragment"]);
                    expect(object["myNamedFragment"]["anotherBlankNode"]).toBe(document["myNamedFragment"]["anotherBlankNode"]);
                    expect(URI.Util.isBNodeID(theBNode.id)).toBe(true);
                    expect(theBNode.id).toBe("_:1");
                    expect(theBNode.myProperty).toBe("A BNode property");
                    expect(document["myBlankNode"]).toBe(theBNode);
                    expect(object["myBlankNode"]).toBe(document["myBlankNode"]);
                    expect(URI.Util.isBNodeID(anotherBNode.id)).toBe(true);
                    expect(anotherBNode.id).toBe("_:2");
                    expect(anotherBNode.myProperty).toBe("Another BNode property");
                    expect(anotherBNode["newProperty"]).toBe("New property");
                    expect(document["myNamedFragment"]["anotherBlankNode"]).toBe(anotherBlankNode_1);
                    expect(document["myNamedFragment"]["anotherBlankNode"]).toBe(document["myBlankNode"]["myNamedFragment"]["anotherBlankNode"]);
                    expect(document["myBlankNode"]["myNamedFragment"]["anotherBlankNode"]).not.toBe(anotherBlankNode_2);
                    expect(document["myBlankNode"]["myNamedFragment"]["anotherBlankNode"]).toBe(anotherBlankNode_1);
                })();
                (function () {
                    var object = {
                        id: "http://example.org/resource/",
                        myProperty: "THE property",
                        myNamedFragment: {
                            id: "http://example.org/no-parent-resource/#namedFragment",
                            myProperty: "A NamedFragment property",
                            anotherBlankNode: {
                                id: "_:2",
                                myProperty: "Another BNode property",
                            }
                        }
                    };
                    document = Document.Factory.createFrom(object);
                    expect(object).toBe(document);
                    expect(document.id).toBe("http://example.org/resource/");
                    expect(document.myProperty).toBe("THE property");
                    expect(document.hasFragment("namedFragment")).toBe(false);
                    var fragments = document.getFragments();
                    expect(Utils.isArray(fragments)).toBe(true);
                    expect(fragments.length).toBe(0);
                    expect(object["myNamedFragment"]).toBe(document["myNamedFragment"]);
                    expect(object["myNamedFragment"]["anotherBlankNode"]).toBe(document["myNamedFragment"]["anotherBlankNode"]);
                })();
                (function () {
                    var object = {
                        myProperty: "The ONE property",
                        date: new Date(),
                        pointerList: [
                            {
                                slug: "Fragment_1",
                                myProperty: "The Named Fragment"
                            },
                            {
                                id: "_:Fragment_2",
                                myProperty: "The Blank Node"
                            }
                        ],
                        pointer: {
                            id: "#Fragment_1",
                            myProperty: "The real Named Fragment"
                        }
                    };
                    document = Document.Factory.createFrom(object);
                    expect(object).toBe(document);
                    expect(document.id).toBe("");
                    expect(document.myProperty).toBe("The ONE property");
                    expect(document.hasFragment("Fragment_1")).toBe(true);
                    expect(document.hasFragment("_:Fragment_2")).toBe(true);
                    var fragments = document.getFragments();
                    expect(Utils.isArray(fragments)).toBe(true);
                    expect(fragments.length).toBe(2);
                    var theBNode, theNFragment;
                    theNFragment = fragments[0];
                    theBNode = fragments[1];
                    expect(theNFragment.id).toEqual("#Fragment_1");
                    expect(theNFragment.slug).toBe("Fragment_1");
                    expect(theNFragment.myProperty).toBe("The real Named Fragment");
                    expect(URI.Util.isBNodeID(theBNode.id)).toBe(true);
                    expect(theBNode.id).toBe("_:Fragment_2");
                    expect(theBNode.myProperty).toBe("The Blank Node");
                    expect(document["pointerList"][0]).toBe(fragments[0]);
                    expect(document["pointerList"][1]).toBe(fragments[1]);
                    expect(document["pointer"]).toBe(theNFragment);
                    expect(object["pointer"]).toBe(document["pointer"]);
                    expect(object["pointerList"][0]).toBe(document["pointerList"][0]);
                    expect(object["pointerList"][1]).toBe(document["pointerList"][1]);
                })();
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "decorate", "Adds the properties and method necessary for a Document object.", [
            { name: "object", type: "T extends Object" }
        ], { type: "T & Carbon.Document.Class" }), function () {
            expect(Document.Factory.decorate).toBeDefined();
            expect(Utils.isFunction(Document.Factory.decorate)).toBe(true);
            var document;
            var anotherDocument;
            document = Document.Factory.decorate({});
            expect(Document.Factory.hasClassProperties(document)).toBe(true);
            document = Document.Factory.decorate({ myProperty: "a property" });
            expect(Document.Factory.hasClassProperties(document)).toBe(true);
            expect(document.myProperty).toBeDefined();
            expect(document.myProperty).toBe("a property");
            anotherDocument = Document.Factory.decorate(document);
            expect(anotherDocument).toBe(document);
        });
        describe(JasmineExtender_1.decoratedObject("Object decorated by the Carbon.LDP.PersistedContainer.Factory.decorate function.", [
            "Carbon.LDP.PersistedContainer.Class"
        ]), function () {
            var document;
            beforeEach(function () {
                document = Document.Factory.create();
                document.id = "http://example.com/document/";
            });
            it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "_fragmentsIndex", "Map<string, Carbon.Fragment.Class>", "Map object for store the fragment pointers (named fragments and blank nodes) of the document."), function () {
                expect(document._fragmentsIndex).toBeDefined();
                expect(Utils.isMap(document._fragmentsIndex)).toBe(true);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "hasPointer", "Returns true if the Document object has a pointer referenced by the URI provided.", [
                { name: "id", type: "string" }
            ], { type: "boolean" }), function () {
                expect(document.hasPointer).toBeDefined();
                expect(Utils.isFunction(document.hasPointer)).toBe(true);
                expect(document.hasPointer("http://example.com/document/")).toBe(true);
                expect(document.hasPointer("document/")).toBe(false);
                expect(document.hasPointer("http://example.com/document/#fragment")).toBe(false);
                expect(document.hasPointer("_:BlankNode")).toBe(false);
                expect(document.hasPointer("http://example.com/another-document/")).toBe(false);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getPointer", "Returns the pointer referenced by the URI provided. If not exists a pointer is created.\n" +
                "Returns null if the URI is not inside scope of the document.", [
                { name: "id", type: "string" }
            ], { type: "boolean" }), function () {
                expect(document.getPointer).toBeDefined();
                expect(Utils.isFunction(document.getPointer)).toBe(true);
                var pointer;
                pointer = document.getPointer("http://example.com/document/");
                expect(pointer).toBe(document);
                pointer = document.getPointer("http://example.com/document/#fragment");
                expect(pointer.id).toBe("http://example.com/document/#fragment");
                pointer = document.getPointer("_:BlankNode");
                expect(pointer.id).toBe("_:BlankNode");
                pointer = document.getPointer("#fragment");
                expect(pointer.id).toBe("http://example.com/document/#fragment");
                pointer = document.getPointer("this-is-considered-a-fragment/");
                expect(pointer.id).toBe("http://example.com/document/#this-is-considered-a-fragment/");
                pointer = document.getPointer("http://example.com/another-document/");
                expect(pointer).toBeNull();
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "inScope"), function () {
                it(JasmineExtender_1.hasSignature("Returns true if the pointer provided is in the scope of the document.", [
                    { name: "pointer", type: "Carbon.Pointer.Class" }
                ], { type: "boolean" }), function () {
                    expect(document.inScope).toBeDefined();
                    expect(Utils.isFunction(document.inScope)).toBe(true);
                    var pointer;
                    expect(document.inScope.bind(document, undefined)).toThrowError();
                    expect(document.inScope.bind(document, null)).toThrowError();
                    expect(document.inScope(document)).toBe(true);
                    pointer = Pointer.Factory.create("http://example.com/document/");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("http://example.com/document/#fragment");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("http://example.com/document/#another-fragment");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("_:BlankNode");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("#fragment");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("this-is-considered-fragment/");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("http://example.com/document/child/");
                    expect(document.inScope(pointer)).toBe(false);
                    pointer = Pointer.Factory.create("http://example.com/another-document/");
                    expect(document.inScope(pointer)).toBe(false);
                    pointer = Pointer.Factory.create("http://example.org/document/");
                    expect(document.inScope(pointer)).toBe(false);
                });
                it(JasmineExtender_1.hasSignature("Returns true if the URI provided is in the scope of the document.", [
                    { name: "id", type: "string" }
                ], { type: "boolean" }), function () {
                    expect(document.inScope).toBeDefined();
                    expect(Utils.isFunction(document.inScope)).toBe(true);
                    expect(document.inScope(document.id)).toBe(true);
                    expect(document.inScope("http://example.com/document/")).toBe(true);
                    expect(document.inScope("http://example.com/document/#fragment")).toBe(true);
                    expect(document.inScope("http://example.com/document/#another-fragment")).toBe(true);
                    expect(document.inScope("_:BlankNode")).toBe(true);
                    expect(document.inScope("#fragment")).toBe(true);
                    expect(document.inScope("this-is-considered-fragment/")).toBe(true);
                    expect(document.inScope("http://example.com/document/child/")).toBe(false);
                    expect(document.inScope("http://example.com/another-document/")).toBe(false);
                    expect(document.inScope("http://example.org/document/")).toBe(false);
                });
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "hasFragment", "Returns true if the document has the fragment id provided", [
                { name: "id", type: "string" }
            ], { type: "boolean" }), function () {
                expect(document.hasFragment).toBeDefined();
                expect(Utils.isFunction(document.hasFragment)).toBe(true);
                expect(document.hasFragment("http://example.com/document/")).toBe(false);
                expect(document.hasFragment("http://example.com/document/#fragment")).toBe(false);
                expect(document.hasFragment("http://example.com/document/#another-fragment")).toBe(false);
                expect(document.hasFragment("_:BlankNode")).toBe(false);
                document.getPointer("http://example.com/document/#fragment");
                document.getPointer("_:BlankNode");
                expect(document.hasFragment("http://example.com/document/#fragment")).toBe(true);
                expect(document.hasFragment("#fragment")).toBe(true);
                expect(document.hasFragment("fragment")).toBe(true);
                expect(document.hasFragment("_:BlankNode")).toBe(true);
                expect(document.hasFragment("http://example.com/document/#another-fragment")).toBe(false);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getFragment", "Returns the fragment referenced by the URI provided.\n" +
                "Returns null if no fragment exists in the document.", [
                { name: "id", type: "string" }
            ], { type: "Carbon.Fragment.Class" }), function () {
                expect(document.getFragment).toBeDefined();
                expect(Utils.isFunction(document.getFragment)).toBe(true);
                var fragment;
                expect(document.getFragment("http://example.com/document/#fragment")).toBeNull();
                expect(document.getFragment("#fragment")).toBeNull();
                expect(document.getFragment("fragment")).toBeNull();
                expect(document.getFragment("_:BlankNode")).toBeNull();
                document.getPointer("http://example.com/document/#fragment");
                document.getPointer("_:BlankNode");
                fragment = document.getFragment("http://example.com/document/#fragment");
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.id).toBe("http://example.com/document/#fragment");
                fragment = document.getFragment("#fragment");
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.id).toBe("http://example.com/document/#fragment");
                fragment = document.getFragment("fragment");
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.id).toBe("http://example.com/document/#fragment");
                fragment = document.getFragment("_:BlankNode");
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.id).toBe("_:BlankNode");
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getNamedFragment", "Returns the fragment referenced by the URI provided.\n" +
                "Returns null if no fragment exists in the document.", [
                { name: "id", type: "string" }
            ], { type: "Carbon.Fragment.Class" }), function () {
                expect(document.getNamedFragment).toBeDefined();
                expect(Utils.isFunction(document.getNamedFragment)).toBe(true);
                expect(document.getNamedFragment.bind(document, "_:BlankNode")).toThrowError(Errors.IllegalArgumentError);
                expect(document.getNamedFragment.bind(document, "http://example.com/another-document/#fragment")).toThrowError(Errors.IllegalArgumentError);
                expect(document.getNamedFragment("http://example.com/document/#fragment")).toBeNull();
                expect(document.getNamedFragment("#fragment")).toBeNull();
                expect(document.getNamedFragment("fragment")).toBeNull();
                document.getPointer("http://example.com/document/#fragment");
                document.getPointer("_:BlankNode");
                var fragment;
                fragment = document.getNamedFragment("http://example.com/document/#fragment");
                expect(NamedFragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.id).toBe("http://example.com/document/#fragment");
                fragment = document.getNamedFragment("#fragment");
                expect(NamedFragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.id).toBe("http://example.com/document/#fragment");
                fragment = document.getNamedFragment("fragment");
                expect(NamedFragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.id).toBe("http://example.com/document/#fragment");
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getFragments", "Returns an array of the fragments in the document", { type: "Carbon.Fragment.Class[]" }), function () {
                expect(document.getFragments).toBeDefined();
                expect(Utils.isFunction(document.getFragments)).toBe(true);
                var fragments;
                fragments = document.getFragments();
                expect(Utils.isArray(fragments)).toBe(true);
                expect(fragments.length).toBe(0);
                document.getPointer("http://example.com/document/#fragment");
                document.getPointer("_:BlankNode");
                fragments = document.getFragments();
                expect(Utils.isArray(fragments)).toBe(true);
                expect(fragments.length).toBe(2);
                if (NamedFragment.Factory.hasClassProperties(fragments[0])) {
                    expect(fragments[0].id).toBe("http://example.com/document/#fragment");
                    expect(fragments[1].id).toBe("_:BlankNode");
                }
                else {
                    expect(fragments[0].id).toBe("_:BlankNode");
                    expect(fragments[1].id).toBe("http://example.com/document/#fragment");
                }
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "createFragment"), function () {
                it(JasmineExtender_1.hasSignature("Creates a NamedFragment from the object provided and the slug specified.", [
                    { name: "slug", type: "string" },
                    { name: "object", type: "Object" }
                ], { type: "Carbon.NamedFragment.Class" }), function () {
                    expect(document.createFragment).toBeDefined();
                    expect(Utils.isFunction(document.createFragment)).toBe(true);
                    var object;
                    var fragment;
                    object = {};
                    fragment = document.createFragment("fragment", object);
                    expect(object).toBe(fragment);
                    expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                    expect(fragment.id).toBe("http://example.com/document/#fragment");
                    expect(fragment.myProperty).toBeUndefined();
                    object = { myProperty: "The property" };
                    fragment = document.createFragment("http://example.com/document/#another-fragment", object);
                    expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                    expect(fragment.id).toBe("http://example.com/document/#another-fragment");
                    expect(fragment.myProperty).toBe("The property");
                    object = { myProperty: "The BlankNode property" };
                    fragment = document.createFragment("_:BlankNode", object);
                    expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                    expect(fragment.id).toBe("_:BlankNode");
                    expect(fragment.myProperty).toBe("The BlankNode property");
                    expect(document.createFragment.bind(document, "http://example.com/another-document/#fragment", {})).toThrowError(Errors.IllegalArgumentError);
                    expect(document.createFragment.bind(document, "fragment", {})).toThrowError(Errors.IDAlreadyInUseError);
                    expect(document.createFragment.bind(document, "_:BlankNode", {})).toThrowError(Errors.IDAlreadyInUseError);
                });
                it(JasmineExtender_1.hasSignature("Creates a BlankNode from the object provided, sing no slug was specififed.", [
                    { name: "object", type: "Object" }
                ], { type: "Carbon.Fragment.Class" }), function () {
                    expect(document.createFragment).toBeDefined();
                    expect(Utils.isFunction(document.createFragment)).toBe(true);
                    var object;
                    var fragment;
                    object = {};
                    fragment = document.createFragment(object);
                    expect(object).toBe(fragment);
                    expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                    expect(URI.Util.isBNodeID(fragment.id)).toBe(true);
                    expect(fragment.myProperty).toBeUndefined();
                    object = { myProperty: "The property" };
                    fragment = document.createFragment(object);
                    expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                    expect(URI.Util.isBNodeID(fragment.id)).toBe(true);
                    expect(fragment.myProperty).toBe("The property");
                });
                it(JasmineExtender_1.hasSignature("Creates a Fragment with the slug provided.", [
                    { name: "slug", type: "string" }
                ], { type: "Carbon.Fragment.Class" }), function () {
                    expect(document.createFragment).toBeDefined();
                    expect(Utils.isFunction(document.createFragment)).toBe(true);
                    var fragment;
                    fragment = document.createFragment("fragment");
                    expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                    expect(fragment.id).toBe("http://example.com/document/#fragment");
                    fragment = document.createFragment("http://example.com/document/#another-fragment");
                    expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                    expect(fragment.id).toBe("http://example.com/document/#another-fragment");
                    fragment = document.createFragment("_:BlankNode");
                    expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                    expect(fragment.id).toBe("_:BlankNode");
                    expect(document.createFragment.bind(document, "http://example.com/another-document/#fragment")).toThrowError(Errors.IllegalArgumentError);
                    expect(document.createFragment.bind(document, "fragment")).toThrowError(Errors.IDAlreadyInUseError);
                    expect(document.createFragment.bind(document, "_:BlankNode")).toThrowError(Errors.IDAlreadyInUseError);
                });
                it(JasmineExtender_1.hasSignature("Creates a Blank Node Fragment, since no slug is provided", { type: "Carbon.Fragment.Class" }), function () {
                    expect(document.createFragment).toBeDefined();
                    expect(Utils.isFunction(document.createFragment)).toBe(true);
                    var fragment1;
                    var fragment2;
                    fragment1 = document.createFragment();
                    expect(Fragment.Factory.hasClassProperties(fragment1)).toBe(true);
                    expect(Utils.isString(fragment1.id)).toBe(true);
                    expect(URI.Util.isBNodeID(fragment1.id)).toBe(true);
                    fragment2 = document.createFragment();
                    expect(Fragment.Factory.hasClassProperties(fragment2)).toBe(true);
                    expect(Utils.isString(fragment2.id)).toBe(true);
                    expect(URI.Util.isBNodeID(fragment2.id)).toBe(true);
                    expect(fragment1.id).not.toBe(fragment2.id);
                });
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "createNamedFragment", "Create a Named Fragment with the slug provided", [
                { name: "slug", type: "string" }
            ], { type: "Carbon.NamedFragment.Class" }), function () {
                expect(document.createNamedFragment).toBeDefined();
                expect(Utils.isFunction(document.createNamedFragment)).toBe(true);
                var fragment;
                fragment = document.createNamedFragment("fragment");
                expect(NamedFragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.slug).toBe("fragment");
                expect(fragment.id).toBe("http://example.com/document/#fragment");
                fragment = document.createNamedFragment("http://example.com/document/#another-fragment");
                expect(Fragment.Factory.hasClassProperties(fragment)).toBe(true);
                expect(fragment.slug).toBe("another-fragment");
                expect(fragment.id).toBe("http://example.com/document/#another-fragment");
                expect(document.createNamedFragment.bind(document, "_:BlankNode")).toThrowError(Errors.IllegalArgumentError);
                expect(document.createNamedFragment.bind(document, "http://example.com/another-document/#fragment")).toThrowError(Errors.IllegalArgumentError);
                expect(document.createNamedFragment.bind(document, "fragment")).toThrowError(Errors.IDAlreadyInUseError);
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "removeFragment"), function () {
                it(JasmineExtender_1.hasSignature("Remove the fragment referenced by the NamedFragment object provided from the Document.", [
                    { name: "fragment", type: "Carbon.NamedFragment.Class" }
                ]), function () {
                });
                it(JasmineExtender_1.hasSignature("Remove the fragment referenced by the Fragment object provided from the Document.", [
                    { name: "fragment", type: "Carbon.Fragment.Class" }
                ]), function () {
                });
                it(JasmineExtender_1.hasSignature("Remove the fragment referenced by the Slug string provided from the Document.", [
                    { name: "slug", type: "string" }
                ]), function () {
                });
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "toJSON"), function () {
                var jsonEmptyDocument;
                var jsonFullDocument;
                beforeAll(function () {
                    var emptyObject = {
                        "@id": "http://example.com/document/",
                        "@graph": [{
                                "@id": "http://example.com/document/",
                                "@type": []
                            }, {
                                "@id": "_:BlankNode",
                                "@type": []
                            }, {
                                "@id": "http://example.com/document/#fragment",
                                "@type": []
                            }]
                    };
                    jsonEmptyDocument = JSON.stringify(emptyObject);
                    var fullObject = {
                        "@id": "http://example.com/document/",
                        "@graph": [{
                                "@id": "http://example.com/document/",
                                "@type": [],
                                "http://example.com/ns#myProperty": [{
                                        "@value": "a property",
                                        "@type": "http://www.w3.org/2001/XMLSchema#string"
                                    }],
                                "http://example.com/ns#myDate": [{
                                        "@value": "2016-06-01",
                                        "@type": "http://www.w3.org/2001/XMLSchema#date"
                                    }],
                                "http://example.com/ns#myFragment": [{
                                        "@id": "_:BlankNode"
                                    }, {
                                        "@id": "http://example.com/document/#fragment"
                                    }]
                            }, {
                                "@id": "_:BlankNode",
                                "@type": []
                            }, {
                                "@id": "http://example.com/document/#fragment",
                                "@type": []
                            }]
                    };
                    jsonFullDocument = JSON.stringify(fullObject);
                });
                beforeEach(function () {
                    document.createFragment("_:BlankNode");
                    document.createFragment("fragment");
                    document["myProperty"] = "a property";
                    document["myDate"] = new Date("2016-06-01");
                    document["myFragment"] = document.getFragments();
                });
                it(JasmineExtender_1.hasSignature("Returns a JSON string from the document using an ObjectSchema and a JSONLDConverter", [
                    { name: "objectSchemaResolver", type: "Carbon.ObjectSchema.Resolver" },
                    { name: "jsonLDConverter", type: "JSONLDConverter" }
                ], { type: "string" }), function () {
                    expect(document.toJSON).toBeDefined();
                    expect(Utils.isFunction(document.toJSON)).toBe(true);
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
                    var converter = new JSONLDConverter_1.default();
                    var json;
                    json = document.toJSON(context.documents, converter);
                    expect(json).toEqual(jsonEmptyDocument);
                    context.extendObjectSchema({
                        "ex": "http://example.com/ns#",
                        "xsd": "http://www.w3.org/2001/XMLSchema#",
                        "ldp": "http://www.w3.org/ns/ldp#",
                        "myProperty": {
                            "@id": "ex:myProperty",
                            "@type": "xsd:string"
                        },
                        "myDate": {
                            "@id": "ex:myDate",
                            "@type": "xsd:date",
                        },
                        "myFragment": {
                            "@id": "ex:myFragment",
                            "@type": "@id",
                            "@container": "@set"
                        }
                    });
                    json = document.toJSON(context.documents, converter);
                    expect(json).toEqual(jsonFullDocument);
                });
                it(JasmineExtender_1.hasSignature("Returns a JSON string from the document using an ObjectSchema", [
                    { name: "objectSchemaResolver", type: "Carbon.ObjectSchema.Resolver" }
                ], { type: "string" }), function () {
                    expect(document.toJSON).toBeDefined();
                    expect(Utils.isFunction(document.toJSON)).toBe(true);
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
                    var json;
                    json = document.toJSON(context.documents);
                    expect(json).toEqual(jsonEmptyDocument);
                    context.extendObjectSchema({
                        "ex": "http://example.com/ns#",
                        "xsd": "http://www.w3.org/2001/XMLSchema#",
                        "ldp": "http://www.w3.org/ns/ldp#",
                        "myProperty": {
                            "@id": "ex:myProperty",
                            "@type": "xsd:string"
                        },
                        "myDate": {
                            "@id": "ex:myDate",
                            "@type": "xsd:date",
                        },
                        "myFragment": {
                            "@id": "ex:myFragment",
                            "@type": "@id",
                            "@container": "@set"
                        }
                    });
                    json = document.toJSON(context.documents);
                    expect(json).toEqual(jsonFullDocument);
                });
                it(JasmineExtender_1.hasSignature("Returns a JSON string from the document using the default ObjectSchema", { type: "string" }), function () {
                    expect(document.toJSON).toBeDefined();
                    expect(Utils.isFunction(document.toJSON)).toBe(true);
                    var json;
                    json = document.toJSON();
                    expect(json).toEqual(jsonEmptyDocument);
                });
            });
        });
    });
});
