"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var URI = require("./URI");
var ObjectSchema = require("./../ObjectSchema");
describe(JasmineExtender_1.module("Carbon/RDF/URI"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(URI).toBeDefined();
        expect(Utils.isObject(URI)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.URI.Class", "Wrapper for an URI string value"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(URI.Class).toBeDefined();
            expect(Utils.isFunction(URI.Class)).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "stringValue", type: "string", description: "The string that represents an URI" }
        ]), function () {
            var anURI = new URI.Class("http://example.com/resource/");
            expect(!!anURI).toBe(true);
            expect(anURI instanceof URI.Class).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "toString", "Returns a string that represents the URI of the class", { type: "string" }), function () {
            var stringURI = "http://example.com/resource/";
            var anURI = new URI.Class(stringURI);
            expect("toString" in anURI).toBe(true);
            expect(Utils.isFunction(anURI.toString)).toBe(true);
            expect(anURI.toString()).toEqual(stringURI);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.URI.Util", "CLass with useful functions for managing URI's"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(URI.Util).toBeDefined();
            expect(Utils.isFunction(URI.Util)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasFragment", "Returns true if the URI provided contains a fragment", [
            { name: "uri", type: "string" }
        ], { type: "boolean" }), function () {
            expect("hasFragment" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.hasFragment)).toBe(true);
            expect(URI.Util.hasFragment("http://example.com/resource/#fragment")).toBe(true);
            expect(URI.Util.hasFragment("prefix:resource/#fragment")).toBe(true);
            expect(URI.Util.hasFragment("http://example.com/resource/")).toBe(false);
            expect(URI.Util.hasFragment("prefix:resource/")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasProtocol", "Returns true if the URI provided has a protocol", [
            { name: "uri", type: "string" }
        ], { type: "boolean" }), function () {
            expect("hasProtocol" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.hasProtocol)).toBe(true);
            expect(URI.Util.hasProtocol("http://example.com/resource/")).toBe(true);
            expect(URI.Util.hasProtocol("https://example.com/resource/")).toBe(true);
            expect(URI.Util.hasProtocol("ftp://example.com/resource/")).toBe(false);
            expect(URI.Util.hasProtocol("file://example.com/resource/")).toBe(false);
            expect(URI.Util.hasProtocol("://example.com/resource/")).toBe(false);
            expect(URI.Util.hasProtocol("/resource/")).toBe(false);
            expect(URI.Util.hasProtocol("resource/")).toBe(false);
            expect(URI.Util.hasProtocol("prefix:resource/")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isAbsolute", "Returns true if the URI provided is absolute", [
            { name: "uri", type: "string" }
        ], { type: "boolean" }), function () {
            expect("isAbsolute" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.isAbsolute)).toBe(true);
            expect(URI.Util.isAbsolute("http://example.com/resoruce/")).toBe(true);
            expect(URI.Util.isAbsolute("https://example.com/resource/")).toBe(true);
            expect(URI.Util.isAbsolute("://example.com/resource/")).toBe(true);
            expect(URI.Util.isAbsolute("/resource/")).toBe(false);
            expect(URI.Util.isAbsolute("resource/")).toBe(false);
            expect(URI.Util.isAbsolute("resource/#fragment")).toBe(false);
            expect(URI.Util.isAbsolute("prefix:resource/")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isRelative", "Returns true if the URI provided is relative", [
            { name: "uri", type: "string" }
        ], { type: "boolean" }), function () {
            expect("isRelative" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.isRelative)).toBe(true);
            expect(URI.Util.isRelative("resource/")).toBe(true);
            expect(URI.Util.isRelative("resource/#fragment")).toBe(true);
            expect(URI.Util.isRelative("/resource/")).toBe(true);
            expect(URI.Util.isRelative("prefix:resource/")).toBe(true);
            expect(URI.Util.isRelative("http://example.com/resoruce/")).toBe(false);
            expect(URI.Util.isRelative("https://example.com/resource/")).toBe(false);
            expect(URI.Util.isRelative("://example.com/resource/")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isBNodeID", "Returns true if the URI provided reference to a Blank Node", [
            { name: "uri", type: "string" }
        ], { type: "boolean" }), function () {
            expect("isBNodeID" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.isBNodeID)).toBe(true);
            expect(URI.Util.isBNodeID("_:someIdNumber0123")).toBe(true);
            expect(URI.Util.isBNodeID("resource/")).toBe(false);
            expect(URI.Util.isBNodeID("resource/#fragment")).toBe(false);
            expect(URI.Util.isBNodeID("http://example.com/resoruce/")).toBe(false);
            expect(URI.Util.isBNodeID("https://example.com/resource/")).toBe(false);
            expect(URI.Util.isBNodeID("://example.com/resource/")).toBe(false);
            expect(URI.Util.isBNodeID("/resource/")).toBe(false);
            expect(URI.Util.isBNodeID("prefix:resource/")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isPrefixed", "Returns true if the URI provided has a prefix", [
            { name: "uri", type: "string" }
        ], { type: "boolean" }), function () {
            expect("isPrefixed" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.isPrefixed)).toBe(true);
            expect(URI.Util.isPrefixed("prefix:resource/")).toBe(true);
            expect(URI.Util.isPrefixed("_:someIdNumber0123")).toBe(false);
            expect(URI.Util.isPrefixed("resource/")).toBe(false);
            expect(URI.Util.isPrefixed("resource/#fragment")).toBe(false);
            expect(URI.Util.isPrefixed("http://example.com/resoruce/")).toBe(false);
            expect(URI.Util.isPrefixed("https://example.com/resource/")).toBe(false);
            expect(URI.Util.isPrefixed("://example.com/resource/")).toBe(false);
            expect(URI.Util.isPrefixed("/resource/")).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isFragmentOf", "Returns true if the first URI is a fragment od the second URI provided", [
            { name: "fragmentURI", type: "string" },
            { name: "uri", type: "string" }
        ], { type: "boolean" }), function () {
            expect("isFragmentOf" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.isFragmentOf)).toBe(true);
            var fragmentURI = "http://example.com/resource/#fragment";
            var resourceURI = "http://example.com/resource/";
            var prefixFragmentURI = "prefix:resource/#fragment";
            var prefixResourceURI = "prefix:resource/";
            expect(URI.Util.isFragmentOf(fragmentURI, resourceURI)).toBe(true);
            expect(URI.Util.isFragmentOf(prefixFragmentURI, prefixResourceURI)).toBe(true);
            expect(URI.Util.isFragmentOf(fragmentURI, prefixResourceURI)).toBe(false);
            expect(URI.Util.isFragmentOf(prefixFragmentURI, resourceURI)).toBe(false);
            expect(URI.Util.isFragmentOf(resourceURI, resourceURI)).toBe(false);
            expect(URI.Util.isFragmentOf(prefixResourceURI, prefixResourceURI)).toBe(false);
            expect(URI.Util.isFragmentOf(resourceURI, fragmentURI)).toBe(false);
            expect(URI.Util.isFragmentOf(prefixResourceURI, prefixFragmentURI)).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "isBaseOf", "Return true if the first URI is parent of the second URI provided", [
            { name: "baseURI", type: "string" },
            { name: "uri", type: "string" }
        ], { type: "boolean" }), function () {
            expect("isBaseOf" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.isBaseOf)).toBe(true);
            var namespaceURI = "http://example.com/resource/#";
            var fragmentURI = "http://example.com/resource/#fragment";
            var childURI = "http://example.com/resource/child/";
            var resourceURI = "http://example.com/resource/";
            var prefixFragmentURI = "prefix:resource/#fragment";
            var prefixResourceURI = "prefix:resource/";
            var prefixChildURI = "prefix:resource/child/";
            var anotherURI = "http://another_example.com/resource/";
            var prefixAnotherURI = "another_prefix:resource";
            expect(URI.Util.isBaseOf(namespaceURI, fragmentURI)).toBe(true);
            expect(URI.Util.isBaseOf(resourceURI, fragmentURI)).toBe(true);
            expect(URI.Util.isBaseOf(resourceURI, childURI)).toBe(true);
            expect(URI.Util.isBaseOf(prefixResourceURI, prefixFragmentURI)).toBe(true);
            expect(URI.Util.isBaseOf(prefixResourceURI, prefixChildURI)).toBe(true);
            expect(URI.Util.isBaseOf(anotherURI, fragmentURI)).toBe(false);
            expect(URI.Util.isBaseOf(anotherURI, childURI)).toBe(false);
            expect(URI.Util.isBaseOf(prefixAnotherURI, prefixFragmentURI)).toBe(false);
            expect(URI.Util.isBaseOf(prefixAnotherURI, prefixChildURI)).toBe(false);
            expect(URI.Util.isBaseOf(resourceURI, resourceURI)).toBe(true);
            expect(URI.Util.isBaseOf(prefixResourceURI, prefixResourceURI)).toBe(true);
            expect(URI.Util.isBaseOf(resourceURI, anotherURI)).toBe(false);
            expect(URI.Util.isBaseOf(prefixResourceURI, prefixAnotherURI)).toBe(false);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "getRelativeURI", "Returns the relative URI from a base URI provided", [
            { name: "absoluteURI", type: "string" },
            { name: "base", type: "string" }
        ], { type: "string" }), function () {
            expect("getRelativeURI" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.getRelativeURI)).toBe(true);
            var childURI = "http://example.com/resource/child/";
            var resourceURI = "http://example.com/resource/";
            var anotherURI = "http://another_example.com/resource/";
            var relativeURI = "child/";
            expect(URI.Util.getRelativeURI(childURI, resourceURI)).toBe(relativeURI);
            expect(URI.Util.getRelativeURI(relativeURI, resourceURI)).toBe(relativeURI);
            expect(URI.Util.getRelativeURI(childURI, anotherURI)).toBe(childURI);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "getDocumentURI", "Returns the URI that just reference to the Document of the URI provided", [
            { name: "uri", type: "string" }
        ]), function () {
            expect("getDocumentURI" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.getDocumentURI)).toBe(true);
            var documentURI = "http://example.com/resource/";
            var fragmentURI = "http://example.com/resource/#fragment";
            var relativeDocumentURI = "resource/";
            var relativeFragmentURI = "resource/#fragment";
            var prefixDocumentURI = "prefix:resource/";
            var prefixFragmentURI = "prefix:resource/#fragment";
            var errorURI = "http://example.com/resource/#fragment#anotherFragment";
            expect(URI.Util.getDocumentURI(fragmentURI)).toEqual(documentURI);
            expect(URI.Util.getDocumentURI(documentURI)).toEqual(documentURI);
            expect(URI.Util.getDocumentURI(relativeFragmentURI)).toEqual(relativeDocumentURI);
            expect(URI.Util.getDocumentURI(relativeDocumentURI)).toEqual(relativeDocumentURI);
            expect(URI.Util.getDocumentURI(prefixFragmentURI)).toEqual(prefixDocumentURI);
            expect(URI.Util.getDocumentURI(prefixDocumentURI)).toEqual(prefixDocumentURI);
            expect(URI.Util.getDocumentURI.bind(null, errorURI)).toThrowError(/IllegalArgument/);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "getFragment", "Returns the name of the fragment in the URI provided. If no fragment exists in the URI, null will be returned", [
            { name: "uri", type: "string" }
        ], { type: "string" }), function () {
            expect("getFragment" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.getFragment)).toBe(true);
            var documentURI = "http://example.com/resource/";
            var fragmentURI = "http://example.com/resource/#fragment";
            var relativeDocumentURI = "resource/";
            var relativeFragmentURI = "resource/#fragment";
            var fragmentName = "fragment";
            var errorURI = "http://example.com/resource/#fragment#anotherFragment";
            var prefixDocumentURI = "prefix:resource/";
            var prefixFragmentURI = "prefix:resource/#fragment";
            expect(URI.Util.getFragment(fragmentURI)).toEqual(fragmentName);
            expect(URI.Util.getFragment(relativeFragmentURI)).toEqual(fragmentName);
            expect(URI.Util.getFragment(prefixFragmentURI)).toEqual(fragmentName);
            expect(URI.Util.getFragment(documentURI)).toBeNull();
            expect(URI.Util.getFragment(relativeDocumentURI)).toBeNull();
            expect(URI.Util.getFragment(prefixDocumentURI)).toBeNull();
            expect(URI.Util.getDocumentURI.bind(null, errorURI)).toThrowError(/IllegalArgument/);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "getSlug", "Returns the slug of the URI. It takes an ending slash as part as the slug.", [
            { name: "uri", type: "string" }
        ], { type: "string" }), function () {
            (function () {
                expect("getSlug" in URI.Util).toEqual(true);
                expect(Utils.isFunction(URI.Util.getSlug)).toEqual(true);
            })();
            expect(URI.Util.getSlug("http://example.com/resource")).toEqual("resource");
            expect(URI.Util.getSlug("http://example.com/resource/")).toEqual("resource/");
            expect(URI.Util.getSlug("http://example.com/resource-1/resource-2/resource-3")).toEqual("resource-3");
            expect(URI.Util.getSlug("http://example.com/resource-1/resource-2/resource-3/")).toEqual("resource-3/");
            expect(URI.Util.getSlug("resource-1/resource-2/resource-3")).toEqual("resource-3");
            expect(URI.Util.getSlug("resource-1/resource-2/resource-3/")).toEqual("resource-3/");
            expect(URI.Util.getSlug("")).toEqual("");
            expect(URI.Util.getSlug("/")).toEqual("/");
            expect(URI.Util.getSlug("http://example.com/resource#fragment")).toEqual("fragment");
            expect(URI.Util.getSlug("http://example.com/resource#fragment/")).toEqual("fragment/");
            expect(URI.Util.getSlug("http://example.com/resource-1#fragment-2/fragment-3")).toEqual("fragment-3");
            expect(URI.Util.getSlug("http://example.com/resource-1#fragment-2/fragment-3/")).toEqual("fragment-3/");
            expect(URI.Util.getSlug("resource-1#fragment-2/fragment-3")).toEqual("fragment-3");
            expect(URI.Util.getSlug("resource-1#fragment-2/fragment-3/")).toEqual("fragment-3/");
            expect(URI.Util.getSlug("#")).toEqual("");
            expect(URI.Util.getSlug("#/")).toEqual("/");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "resolve", "Return a URI formed from a parent URI and a relative child URI", [
            { name: "parentURI", type: "string" },
            { name: "childURI", type: "string" }
        ], { type: "string" }), function () {
            expect("resolve" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.resolve)).toBe(true);
            var parentURI = "http://example.com/resource/";
            var parentURI2 = "http://example.com/resource";
            var childURI = "/child/";
            var childURI2 = "child/";
            var resultURI = "http://example.com/resource/child/";
            var prefixURI = "prefix:resource";
            expect(URI.Util.resolve(parentURI, childURI)).toEqual(resultURI);
            expect(URI.Util.resolve(parentURI2, childURI)).toEqual(resultURI);
            expect(URI.Util.resolve(parentURI, childURI2)).toEqual(resultURI);
            expect(URI.Util.resolve(parentURI2, childURI2)).toEqual(resultURI);
            expect(URI.Util.resolve(parentURI, resultURI)).toEqual(resultURI);
            expect(URI.Util.resolve(parentURI, prefixURI)).toEqual(prefixURI);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "removeProtocol", "Removes the protocol of the URI provided", [
            { name: "uri", type: "string" }
        ], { type: "string" }), function () {
            expect("removeProtocol" in URI.Util).toBe(true);
            expect(Utils.isFunction(URI.Util.removeProtocol)).toBe(true);
            var URI1 = "http://example.com/resource";
            var URI2 = "https://example.com/resource";
            var URI3 = "resource/child/";
            var resultURI = "://example.com/resource";
            var prefixURI = "prefix:resource/";
            expect(URI.Util.removeProtocol(URI1)).toEqual(resultURI);
            expect(URI.Util.removeProtocol(URI2)).toEqual(resultURI);
            expect(URI.Util.removeProtocol(URI3)).toEqual(URI3);
            expect(URI.Util.removeProtocol(resultURI)).toEqual(resultURI);
            expect(URI.Util.removeProtocol(prefixURI)).toEqual(prefixURI);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "prefix"), function () {
            it(JasmineExtender_1.hasSignature("Replace a base of a URI with the prefix provided. If the prefix can not be resolved, the URI provided will be returned", [
                { name: "uri", type: "string" },
                { name: "prefix", type: "string" },
                { name: "prefixURI", type: "string" }
            ], { type: "string" }), function () {
                expect("prefix" in URI.Util).toBe(true);
                expect(Utils.isFunction(URI.Util.prefix)).toBe(true);
                var resourceURI = "http://example.com/resource/";
                var anotherResourceURI = "http://example.com/another_resource/";
                var prefixURI = "http://example.com/";
                var anotherPrefixURI = "http://another_example.com/";
                var prefix = "prefix";
                var anotherPrefix = "another_prefix";
                var prefixResourceURI = "prefix:resource/";
                expect(URI.Util.prefix(resourceURI, prefix, prefixURI)).toBe(prefixResourceURI);
                expect(URI.Util.prefix(prefixResourceURI, prefix, prefixURI)).toBe(prefixResourceURI);
                expect(URI.Util.prefix(prefixResourceURI, anotherPrefix, prefix)).toBe(prefixResourceURI);
                expect(URI.Util.prefix(resourceURI, prefix, anotherPrefixURI)).toBe(resourceURI);
                expect(URI.Util.prefix(anotherResourceURI, prefix, anotherPrefixURI)).toBe(anotherResourceURI);
            });
            it(JasmineExtender_1.hasSignature("Replace the base of a URI with a prefix in accordance with the ObjectSchema provided. If the prefix can not be resolved, the URI provided will be returned", [
                { name: "uri", type: "string" },
                { name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema" }
            ], { type: "string" }), function () {
                expect("prefix" in URI.Util).toBe(true);
                expect(Utils.isFunction(URI.Util.prefix)).toBe(true);
                var resourceURI = "http://example.com/resource/";
                var anotherResourceURI = "http://another_example.com/resource/";
                var prefixResourceURI = "prefix:resource/";
                var schema = {
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "prefix": "http://example.com/",
                    "some_resource": {
                        "@id": "prefix:some_resource",
                        "@type": "@id"
                    }
                };
                var anotherSchema = {
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "another_prefix": "http://another_example.com/",
                    "some_resource": {
                        "@id": "prefix:some_resource",
                        "@type": "@id"
                    }
                };
                var digestedSchema = ObjectSchema.Digester.digestSchema(schema);
                var anotherDigestedSchema = ObjectSchema.Digester.digestSchema(anotherSchema);
                expect(URI.Util.prefix(resourceURI, digestedSchema)).toBe(prefixResourceURI);
                expect(URI.Util.prefix(resourceURI, anotherDigestedSchema)).toBe(resourceURI);
                expect(URI.Util.prefix(anotherResourceURI, digestedSchema)).toBe(anotherResourceURI);
                expect(URI.Util.prefix(prefixResourceURI, digestedSchema)).toBe(prefixResourceURI);
            });
        });
    });
});
