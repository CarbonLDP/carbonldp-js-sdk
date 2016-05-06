"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var RDFNode = require("./RDFNode");
var Errors = require("./../Errors");
var RDFDocument = require("./Document");
describe(JasmineExtender_1.module("Carbon/RDF/Document"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(RDFDocument).toBeDefined();
        expect(Utils.isObject(RDFDocument)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Document.Factory", "Class Factory to manage creation and management of RDFDocument objects"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RDFDocument.Factory).toBeDefined();
            expect(Utils.isFunction(RDFDocument.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object is an RDFDocument object", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(RDFDocument.Factory.is).toBeDefined();
            expect(Utils.isFunction(RDFDocument.Factory.is)).toBe(true);
            var object;
            object = {
                "@id": "",
                "@graph": [
                    { "@id": "http://example.com/resource/1" },
                    { "@id": "http://example.com/resource/1#fragment-1" },
                    { "@id": "http://example.com/resource/2" }
                ]
            };
            expect(RDFDocument.Factory.is(object)).toBe(true);
            object = {
                "@graph": [
                    { "@id": "http://example.com/resource/1" },
                    { "@id": "http://example.com/resource/1#fragment-1" },
                    { "@id": "http://example.com/resource/2" }
                ]
            };
            expect(RDFDocument.Factory.is(object)).toBe(true);
            expect(RDFDocument.Factory.is({ "@graph": [] })).toBe(true);
            expect(RDFDocument.Factory.is({ "something-else": [] })).toBe(false);
            expect(RDFDocument.Factory.is({ "@graph": {} })).toBe(false);
            expect(RDFDocument.Factory.is({ "@graph": "something else" })).toBe(false);
            expect(RDFDocument.Factory.is({})).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Return an RDFDocument object created with the parameters provided", [
            { name: "resources", type: "Carbon.RDF.RDFNode.Class[]" },
            { name: "uri", type: "string", optional: true }
        ], { type: "Carbon.RDF.RDFDocument.Class" }), function () {
            expect(RDFDocument.Factory.create).toBeDefined();
            expect(Utils.isFunction(RDFDocument.Factory.create)).toBe(true);
            var nodes;
            nodes = [
                { "@id": "http://example.com/resource/1" },
                { "@id": "http://example.com/resource/1#fragment-1" },
                { "@id": "http://example.com/resource/2" }
            ];
            expect(RDFDocument.Factory.create(nodes)).toEqual({
                "@graph": [
                    { "@id": "http://example.com/resource/1" },
                    { "@id": "http://example.com/resource/1#fragment-1" },
                    { "@id": "http://example.com/resource/2" }
                ]
            });
            expect(RDFDocument.Factory.create(nodes, "http://example.com/uri-resource/")).toEqual({
                "@id": "http://example.com/uri-resource/",
                "@graph": [
                    { "@id": "http://example.com/resource/1" },
                    { "@id": "http://example.com/resource/1#fragment-1" },
                    { "@id": "http://example.com/resource/2" }
                ]
            });
            nodes = [];
            expect(RDFDocument.Factory.create(nodes)).toEqual({
                "@graph": [],
            });
            expect(RDFDocument.Factory.create(nodes, "http://example.com/uri-resource/")).toEqual({
                "@id": "http://example.com/uri-resource/",
                "@graph": [],
            });
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Document.Util", "Class with useful functions for manage RDF Documents"), function () {
        var document;
        var node, fragment, bNode;
        beforeEach(function () {
            node = { "@id": "http://example.com/resource/node/" };
            fragment = { "@id": "http://example.com/resource/#fragment" };
            bNode = { "@id": "_:IdOfBlankNode" };
            document = {
                "@id": "http://example.com/resource/",
                "@graph": [
                    node,
                    fragment,
                    bNode
                ],
            };
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(RDFDocument.Util).toBeDefined();
            expect(Utils.isFunction(RDFDocument.Util)).toBe(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "getDocuments"), function () {
            it(JasmineExtender_1.isDefined(), function () {
                expect(RDFDocument.Util.getDocuments).toBeDefined();
                expect(Utils.isFunction(RDFDocument.Util.getDocuments)).toBe(true);
            });
            it(JasmineExtender_1.hasSignature("Returns an array of documents from an array of resources or documents.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the objects are not RDF like", [
                { name: "objects", type: "Object[]" }
            ], { type: "Carbon.RDF.Document.Class[]" }), function () {
                var documents;
                documents = RDFDocument.Util.getDocuments([]);
                expect(Utils.isArray(documents)).toBe(true);
                expect(documents.length).toBe(0);
                documents = RDFDocument.Util.getDocuments([document, document, document]);
                expect(Utils.isArray(documents)).toBe(true);
                expect(documents.length).toBe(3);
                expect(documents[0]).toEqual(document);
                documents = RDFDocument.Util.getDocuments([node, fragment, bNode]);
                expect(Utils.isArray(documents)).toBe(true);
                expect(documents.length).toBe(1);
                expect(RDFDocument.Factory.is(documents[0])).toBe(true);
                expect(documents[0]["@graph"]).toBeDefined();
                expect(Utils.isArray(documents[0]["@graph"])).toBe(true);
                expect(documents[0]["@graph"].length).toBe(3);
                expect(documents[0]["@graph"]).toEqual([node, fragment, bNode]);
                expect(RDFDocument.Util.getDocuments.bind(null, [{}, {}, {}])).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getDocuments.bind(null, [null, null, null])).toThrowError(Errors.IllegalArgumentError);
            });
            it(JasmineExtender_1.hasSignature("Returns an array of documents from a document or resource.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
                { name: "object", type: "Object" }
            ], { type: "Carbon.RDF.Document.Class[]" }), function () {
                var documents;
                documents = RDFDocument.Util.getDocuments(document);
                expect(Utils.isArray(documents)).toBe(true);
                expect(documents.length).toBe(1);
                expect(documents[0]).toEqual(document);
                documents = RDFDocument.Util.getDocuments(document);
                expect(Utils.isArray(documents)).toBe(true);
                expect(documents.length).toBe(1);
                expect(documents[0]).toEqual(document);
                documents = RDFDocument.Util.getDocuments(node);
                expect(Utils.isArray(documents)).toBe(true);
                expect(documents.length).toBe(1);
                expect(documents[0]["@graph"]).toBeDefined();
                expect(Utils.isArray(documents[0]["@graph"])).toBe(true);
                expect(documents[0]["@graph"].length).toBe(1);
                expect(documents[0]["@graph"][0]).toEqual(node);
                expect(RDFDocument.Util.getDocuments.bind(null, {})).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getDocuments.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "getResources"), function () {
            it(JasmineExtender_1.isDefined(), function () {
                expect(RDFDocument.Util.getResources).toBeDefined();
                expect(Utils.isFunction(RDFDocument.Util.getResources)).toBe(true);
            });
            it(JasmineExtender_1.hasSignature("Returns all the resources from a array of documents or resources.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the objects are not RDF like", [
                { name: "objects", type: "Object[]" }
            ], { type: "Carbon.RDF.RDFNode.Class" }), function () {
                var nodes;
                nodes = RDFDocument.Util.getResources([]);
                expect(Utils.isArray(nodes)).toBe(true);
                expect(nodes.length).toBe(0);
                nodes = RDFDocument.Util.getResources([document, document]);
                expect(Utils.isArray(nodes)).toBe(true);
                expect(nodes.length).toBe(3 * 2);
                expect(RDFNode.Factory.is(nodes[0])).toBe(true);
                expect(nodes[0]).toEqual(node);
                expect(RDFNode.Util.areEqual(nodes[0], node)).toBe(true);
                nodes = RDFDocument.Util.getResources([node, node, node, node]);
                expect(Utils.isArray(nodes)).toBe(true);
                expect(nodes.length).toBe(4);
                expect(RDFNode.Factory.is(nodes[0])).toBe(true);
                expect(nodes[0]).toEqual(node);
                expect(RDFNode.Util.areEqual(nodes[0], node)).toBe(true);
                expect(RDFDocument.Util.getResources.bind(null, [{}, {}])).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getResources.bind(null, [null, null])).toThrowError(Errors.IllegalArgumentError);
            });
            it(JasmineExtender_1.hasSignature("Returns all the resources from a document or resource.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
                { name: "object", type: "Object" }
            ], { type: "Carbon.RDF.RDFNode.Class" }), function () {
                var nodes;
                nodes = RDFDocument.Util.getResources([]);
                expect(Utils.isArray(nodes)).toBe(true);
                expect(nodes.length).toBe(0);
                nodes = RDFDocument.Util.getResources(document);
                expect(Utils.isArray(nodes)).toBe(true);
                expect(nodes.length).toBe(3);
                expect(RDFNode.Factory.is(nodes[0])).toBe(true);
                expect(nodes[0]).toEqual(node);
                expect(RDFNode.Util.areEqual(nodes[0], node)).toBe(true);
                nodes = RDFDocument.Util.getResources(node);
                expect(Utils.isArray(nodes)).toBe(true);
                expect(nodes.length).toBe(1);
                expect(RDFNode.Factory.is(nodes[0])).toBe(true);
                expect(nodes[0]).toEqual(node);
                expect(RDFNode.Util.areEqual(nodes[0], node)).toBe(true);
                expect(RDFDocument.Util.getResources.bind(null, {})).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getResources.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "getDocumentResources"), function () {
            it(JasmineExtender_1.isDefined(), function () {
                expect(RDFDocument.Util.getDocumentResources).toBeDefined();
                expect(Utils.isFunction(RDFDocument.Util.getDocumentResources)).toBe(true);
            });
            it(JasmineExtender_1.hasSignature("Returns all the resources that refers to documents from a document.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
                { name: "document", type: "Carbon.RDF.Document.Class" }
            ], { type: "Carbon.RDF.RDFNode.Class[]" }), function () {
                var documentResources;
                documentResources = RDFDocument.Util.getDocumentResources(document);
                expect(Utils.isArray(documentResources)).toBe(true);
                expect(documentResources.length).toBe(1);
                expect(documentResources).toEqual([node]);
                expect(RDFDocument.Util.getDocumentResources.bind(null, {})).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getDocumentResources.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            });
            it(JasmineExtender_1.hasSignature("Returns all the resources that refers to documents from an array of resources.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
                { name: "document", type: "Carbon.RDF.RDFNode.Class[]" }
            ], { type: "Carbon.RDF.RDFNode.Class[]" }), function () {
                var documentResources;
                documentResources = RDFDocument.Util.getDocumentResources([node, fragment, bNode, node]);
                expect(Utils.isArray(documentResources)).toBe(true);
                expect(documentResources.length).toBe(2);
                expect(documentResources).toEqual([node, node]);
                expect(RDFDocument.Util.getDocumentResources.bind(null, [{}, {}])).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getDocumentResources.bind(null, [null, null])).toThrowError(Errors.IllegalArgumentError);
            });
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "getFragmentResources"), function () {
            it(JasmineExtender_1.isDefined(), function () {
                expect(RDFDocument.Util.getFragmentResources).toBeDefined();
                expect(Utils.isFunction(RDFDocument.Util.getFragmentResources)).toBe(true);
            });
            it(JasmineExtender_1.hasSignature("Returns all the resources that refers to fragments from a document. " +
                "If documentResource is provided, it will return the fragments of the specified document.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
                { name: "document", type: "Carbon.RDF.Document.Class" },
                { name: "documentResource", type: "Carbon.RDF.RDFNode.Class", optional: true }
            ], { type: "Carbon.RDF.RDFNode.Class[]" }), function () {
                var fragmentResources;
                fragmentResources = RDFDocument.Util.getFragmentResources(document);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(1);
                expect(fragmentResources[0]).toEqual(fragment);
                var myFragment = {
                    "@id": document["@id"] + "#fragment-2",
                    "@type": ["http://example.com/types/#fragment"],
                    "http://example.com/property": [{
                            "@value": "A property"
                        }]
                };
                var myDocument = RDFDocument.Factory.create([
                    fragment,
                    node,
                    myFragment,
                    bNode
                ], "http://example.com/resource-another/");
                var documentResource;
                documentResource = RDFNode.Factory.create(document["@id"]);
                fragmentResources = RDFDocument.Util.getFragmentResources(myDocument, documentResource);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(2);
                expect(fragmentResources).toEqual([fragment, myFragment]);
                documentResource = RDFNode.Factory.create(fragment["@id"]);
                fragmentResources = RDFDocument.Util.getFragmentResources(myDocument, documentResource);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(0);
                documentResource = RDFNode.Factory.create(myDocument["@id"]);
                fragmentResources = RDFDocument.Util.getFragmentResources(myDocument, documentResource);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(0);
                expect(RDFDocument.Util.getFragmentResources.bind(null, {})).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getFragmentResources.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            });
            it(JasmineExtender_1.hasSignature("Returns all the resources that refers to fragments from a document. " +
                "If documentResourceURI is provided, it will return the fragments of the specified URI.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
                { name: "document", type: "Carbon.RDF.Document.Class" },
                { name: "documentResourceURI", type: "string", optional: true }
            ], { type: "Carbon.RDF.RDFNode.Class[]" }), function () {
                var fragmentResources;
                fragmentResources = RDFDocument.Util.getFragmentResources(document);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(1);
                expect(fragmentResources[0]).toEqual(fragment);
                var myFragment = {
                    "@id": document["@id"] + "#fragment-2",
                    "@type": ["http://example.com/types/#fragment"],
                    "http://example.com/property": [{
                            "@value": "A property"
                        }]
                };
                var myDocument = RDFDocument.Factory.create([
                    fragment,
                    node,
                    myFragment,
                    bNode
                ], "http://example.com/resource-another/");
                fragmentResources = RDFDocument.Util.getFragmentResources(myDocument, document["@id"]);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(2);
                expect(fragmentResources).toEqual([fragment, myFragment]);
                fragmentResources = RDFDocument.Util.getFragmentResources(myDocument, fragment["@id"]);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(0);
                fragmentResources = RDFDocument.Util.getFragmentResources(myDocument, myDocument["@id"]);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(0);
                expect(RDFDocument.Util.getFragmentResources.bind(null, {})).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getFragmentResources.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            });
            it(JasmineExtender_1.hasSignature("Returns all the resources that refers to fragments from an array of resources. " +
                "If documentResource is provided, it will return the fragments of the specified document.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
                { name: "document", type: "Carbon.RDF.Document.Class" },
                { name: "documentResource", type: "Carbon.RDF.RDFNode.Class", optional: true }
            ], { type: "Carbon.RDF.RDFNode.Class[]" }), function () {
                var fragmentResources;
                fragmentResources = RDFDocument.Util.getFragmentResources(document);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(1);
                expect(fragmentResources[0]).toEqual(fragment);
                var myFragment = {
                    "@id": document["@id"] + "#fragment-2",
                    "@type": ["http://example.com/types/#fragment"],
                    "http://example.com/property": [{
                            "@value": "A property"
                        }]
                };
                var resources = [fragment, node, myFragment, bNode];
                var documentResource;
                documentResource = RDFNode.Factory.create(document["@id"]);
                fragmentResources = RDFDocument.Util.getFragmentResources(resources, documentResource);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(2);
                expect(fragmentResources).toEqual([fragment, myFragment]);
                documentResource = RDFNode.Factory.create(fragment["@id"]);
                fragmentResources = RDFDocument.Util.getFragmentResources(resources, documentResource);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(0);
                fragmentResources = RDFDocument.Util.getFragmentResources(resources, "http://example.com/resource-another/");
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(0);
                expect(RDFDocument.Util.getFragmentResources.bind(null, [{}, {}])).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getFragmentResources.bind(null, [null, null])).toThrowError(Errors.IllegalArgumentError);
            });
            it(JasmineExtender_1.hasSignature("Returns all the resources that refers to fragments from a document. " +
                "If documentResourceURI is provided, it will return the fragments of the specified URI.\n" +
                "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
                { name: "document", type: "Carbon.RDF.Document.Class" },
                { name: "documentResourceURI", type: "string", optional: true }
            ], { type: "Carbon.RDF.RDFNode.Class[]" }), function () {
                var fragmentResources;
                fragmentResources = RDFDocument.Util.getFragmentResources(document);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(1);
                expect(fragmentResources[0]).toEqual(fragment);
                var myFragment = {
                    "@id": document["@id"] + "#fragment-2",
                    "@type": ["http://example.com/types/#fragment"],
                    "http://example.com/property": [{
                            "@value": "A property"
                        }]
                };
                var resources = [fragment, node, myFragment, bNode];
                fragmentResources = RDFDocument.Util.getFragmentResources(resources, document["@id"]);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(2);
                expect(fragmentResources).toEqual([fragment, myFragment]);
                fragmentResources = RDFDocument.Util.getFragmentResources(resources, fragment["@id"]);
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(0);
                fragmentResources = RDFDocument.Util.getFragmentResources(resources, "http://example.com/resource-another/");
                expect(Utils.isArray(fragmentResources)).toBe(true);
                expect(fragmentResources.length).toBe(0);
                expect(RDFDocument.Util.getFragmentResources.bind(null, [{}, {}])).toThrowError(Errors.IllegalArgumentError);
                expect(RDFDocument.Util.getFragmentResources.bind(null, [null, null])).toThrowError(Errors.IllegalArgumentError);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "getBNodeResources", "Returns all the resources that refers to blank nodes from a document.\n" +
            "Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like", [
            { name: "document", type: "Carbon.RDF.Document.Class" }
        ], { type: "Carbon.RDF.RDFNode.Class[]" }), function () {
            expect(RDFDocument.Util.getBNodeResources).toBeDefined();
            expect(Utils.isFunction(RDFDocument.Util.getBNodeResources)).toBe(true);
            var bNodeResources;
            bNodeResources = RDFDocument.Util.getBNodeResources(document);
            expect(Utils.isArray(bNodeResources)).toBe(true);
            expect(bNodeResources.length).toBe(1);
            expect(bNodeResources[0]).toEqual(bNode);
            expect(RDFDocument.Util.getBNodeResources.bind(null, {})).toThrowError(Errors.IllegalArgumentError);
            expect(RDFDocument.Util.getBNodeResources.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Document.Parser", "Async class for parse a JSON-LD string to an array of RDFDocuments"), function () {
        var compactedObject = {
            "@context": {
                "ex": "http://example.com/",
                "ns": "http://example.com/ns#",
            },
            "@id": "ex:resource/",
            "@graph": [
                {
                    "@id": "http://example.com/resource/",
                    "ns:string": [{
                            "@value": "Document Resource"
                        }],
                    "ns:pointerSet": [
                        { "@id": "_:1" },
                        { "@id": "http://example.com/resource/#1" },
                        { "@id": "http://example.com/external-resource/" },
                    ],
                },
                {
                    "@id": "_:1",
                    "ns:string": {
                        "@value": "Fragment 1"
                    },
                    "ns:pointerSet": [
                        { "@id": "ex:resource/" },
                        { "@id": "ex:resource/#1" },
                    ],
                },
                {
                    "@id": "ex:resource/#1",
                    "ns:string": {
                        "@value": "NamedFragment 1"
                    },
                },
            ],
        };
        var expandedObject = [{
                "@id": "http://example.com/resource/",
                "@graph": [
                    {
                        "@id": "http://example.com/resource/",
                        "http://example.com/ns#string": [{
                                "@value": "Document Resource"
                            }],
                        "http://example.com/ns#pointerSet": [
                            { "@id": "_:1" },
                            { "@id": "http://example.com/resource/#1" },
                            { "@id": "http://example.com/external-resource/" },
                        ],
                    },
                    {
                        "@id": "_:1",
                        "http://example.com/ns#string": [{
                                "@value": "Fragment 1"
                            }],
                        "http://example.com/ns#pointerSet": [
                            { "@id": "http://example.com/resource/" },
                            { "@id": "http://example.com/resource/#1" },
                        ],
                    },
                    {
                        "@id": "http://example.com/resource/#1",
                        "http://example.com/ns#string": [{
                                "@value": "NamedFragment 1"
                            }],
                    },
                ],
            }];
        it(JasmineExtender_1.isDefined(), function () {
            expect(RDFDocument.Parser).toBeDefined();
            expect(Utils.isFunction(RDFDocument.Parser)).toBe(true);
            var parser = new RDFDocument.Parser();
            expect(parser).toBeDefined();
            expect(parser instanceof RDFDocument.Parser).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "parse", "Parse the a JSON-LD string to an array of RDFDocuments", [
            { name: "input", type: "string" }
        ], { type: "Promise<any>" }), function (done) {
            var parser = new RDFDocument.Parser();
            var input;
            input = JSON.stringify(compactedObject);
            var spies = {
                success: function (result) {
                    expect(Utils.isArray(result)).toBe(true);
                    expect(result.length).toBe(1);
                    expect(RDFDocument.Factory.is(result[0])).toBe(true);
                    expect(result).toEqual(expandedObject);
                },
                successEmpty: function (result) {
                    expect(Utils.isArray(result)).toBe(true);
                    expect(result.length).toBe(0);
                },
                error: function (error) {
                    expect(error instanceof Error).toBe(true);
                }
            };
            var success = spyOn(spies, 'success').and.callThrough();
            var successEmpty = spyOn(spies, 'successEmpty').and.callThrough();
            var error = spyOn(spies, 'error').and.callThrough();
            var promises = [];
            var promise;
            promise = parser.parse(input).then(spies.success, spies.error);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise);
            promise = parser.parse("some String /12121/ that is not JSON ))(*&^%$#@!").then(spies.success, spies.error);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise);
            promise = parser.parse("{}").then(spies.successEmpty, spies.error);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise);
            promise = parser.parse("[ {}, null ]").then(spies.successEmpty, spies.error);
            expect(promise instanceof Promise).toBe(true);
            promises.push(promise);
            Promise.all(promises).then(function () {
                expect(success.calls.count()).toBe(1);
                expect(successEmpty.calls.count()).toBe(2);
                expect(error.calls.count()).toBe(1);
                done();
            }, done.fail);
        });
    });
});
