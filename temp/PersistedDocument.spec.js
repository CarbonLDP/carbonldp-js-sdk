"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PersistedDocument = require("./PersistedDocument");
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Document = require("./Document");
var AbstractContext_1 = require("./AbstractContext");
var AccessPoint = require("./AccessPoint");
var Documents_1 = require("./Documents");
var Pointer = require("./Pointer");
var URI = require("./RDF/URI");
describe(JasmineExtender_1.module("Carbon/PersistedDocument"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(PersistedDocument).toBeDefined();
        expect(Utils.isObject(PersistedDocument)).toEqual(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.PersistedDocument.Factory", "Factory class for PersistedDocument objects."), function () {
        var context;
        beforeEach(function () {
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return URI.Util.isRelative(uri) ? "http://example.com/" + uri : uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            context = new MockedContext();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(PersistedDocument.Factory).toBeDefined();
            expect(Utils.isFunction(PersistedDocument.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the Document provided has the properties and functions of a PersistedDocument object", [
            { name: "document", type: "Carbon.Document.Class" }
        ], { type: "boolean" }), function () {
            expect(PersistedDocument.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(PersistedDocument.Factory.hasClassProperties)).toBe(true);
            var document = undefined;
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document = Document.Factory.create();
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["_documents"] = null;
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["_etag"] = null;
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["refresh"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["save"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["destroy"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["createAccessPoint"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["executeRawASKQuery"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["executeASKQuery"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["executeRawSELECTQuery"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["executeSELECTQuery"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["executeRawDESCRIBEQuery"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(false);
            document["executeRawCONSTRUCTQuery"] = function () { };
            expect(PersistedDocument.Factory.hasClassProperties(document)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the element provided is a PersistedDocument object.", [
            { name: "object", type: "Object" }
        ], { type: "boolean" }), function () {
            expect(PersistedDocument.Factory.is).toBeDefined();
            expect(Utils.isFunction(PersistedDocument.Factory.is)).toBe(true);
            expect(PersistedDocument.Factory.is(undefined)).toBe(false);
            expect(PersistedDocument.Factory.is(null)).toBe(false);
            expect(PersistedDocument.Factory.is("a string")).toBe(false);
            expect(PersistedDocument.Factory.is(100)).toBe(false);
            expect(PersistedDocument.Factory.is({})).toBe(false);
            var object = Document.Factory.create();
            object["_documents"] = null;
            object["_etag"] = null;
            object["refresh"] = function () { };
            object["save"] = function () { };
            object["destroy"] = function () { };
            object["createAccessPoint"] = function () { };
            object["executeRawASKQuery"] = function () { };
            object["executeASKQuery"] = function () { };
            object["executeRawSELECTQuery"] = function () { };
            object["executeSELECTQuery"] = function () { };
            object["executeRawDESCRIBEQuery"] = function () { };
            object["executeRawCONSTRUCTQuery"] = function () { };
            expect(PersistedDocument.Factory.is(object)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "create", "Creates an empty PersistedDocument object with the URI provided and contained by the Documents object specified.", [
            { name: "uri", type: "string" },
            { name: "documents", type: "Carbon.Documents" }
        ], { type: "Carbon.PersistedDocument.Class" }), function () {
            expect(PersistedDocument.Factory.create).toBeDefined();
            expect(Utils.isFunction(PersistedDocument.Factory.create)).toBe(true);
            var document;
            document = PersistedDocument.Factory.create("http://example.com/resource/", context.documents);
            expect(PersistedDocument.Factory.is(document)).toBe(true);
            expect(document.id).toBe("http://example.com/resource/");
            expect(document._documents).toBe(context.documents);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "createFrom", "Creates a PersistedDocument object from the object and URI provided, with the Documents object specified as container.", [
            { name: "object", type: "T extends Object" },
            { name: "uri", type: "string" }
        ], { type: "Carbon.PersistedDocument.Class" }), function () {
            expect(PersistedDocument.Factory.createFrom).toBeDefined();
            expect(Utils.isFunction(PersistedDocument.Factory.createFrom)).toBe(true);
            var persistedDocument;
            persistedDocument = PersistedDocument.Factory.createFrom({}, "http://example.com/resource/", context.documents);
            expect(PersistedDocument.Factory.is(persistedDocument)).toBe(true);
            expect(persistedDocument.id).toBe("http://example.com/resource/");
            persistedDocument = PersistedDocument.Factory.createFrom({ myProperty: "a property" }, "http://example.com/resource/", context.documents);
            expect(PersistedDocument.Factory.is(persistedDocument)).toBe(true);
            expect(persistedDocument.id).toBe("http://example.com/resource/");
            expect(persistedDocument.myProperty).toBe("a property");
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "decorate", "Adds the properties and methods necessary for a PersistedDocument object.", [
            { name: "object", type: "T extends Object" },
            { name: "documents", type: "Carbon.Documents" }
        ], { type: "T & Carbon.PersistedDocument.Class" }), function () {
            expect(PersistedDocument.Factory.decorate).toBeDefined();
            expect(Utils.isFunction(PersistedDocument.Factory.decorate)).toBe(true);
            var document;
            var persistedDocument;
            document = Document.Factory.createFrom({});
            persistedDocument = PersistedDocument.Factory.decorate(document, context.documents);
            expect(PersistedDocument.Factory.is(persistedDocument)).toBe(true);
            expect(persistedDocument.myProperty).toBeUndefined();
            expect(persistedDocument._documents).toBe(context.documents);
            document = Document.Factory.createFrom({ myProperty: "a property" });
            persistedDocument = PersistedDocument.Factory.decorate(document, context.documents);
            expect(PersistedDocument.Factory.is(persistedDocument)).toBe(true);
            expect(persistedDocument.myProperty).toBeDefined();
            expect(persistedDocument.myProperty).toBe("a property");
            expect(persistedDocument._documents).toBe(context.documents);
        });
        describe(JasmineExtender_1.decoratedObject("Object decorated by the Carbon.LDP.PersistedContainer.Factory.decorate function.", [
            "Carbon.LDP.PersistedContainer.Class"
        ]), function () {
            var document;
            beforeEach(function () {
                context.documents.getPointer("http://example.com/in/documents/");
                document = PersistedDocument.Factory.create("http://example.com/document/", context.documents);
                document.createNamedFragment("fragment");
                document.createFragment("_:BlankNode");
            });
            it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "_documents", "Carbon.Documents", "Documents object who is the container of the PersistedContainer."), function () {
                expect(document._documents).toBeDefined();
                expect(Utils.isObject(document._documents)).toBe(true);
                expect(document._documents instanceof Documents_1.default).toBe(true);
            });
            it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "_etag", "string", "The ETag (entity tag) of the PersistedDocument."), function () {
                expect(document._etag).toBeDefined();
                expect(document._etag).toBeNull();
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "hasPointer", "Returns true if the PersistedDocument object has a pointer referenced by the URI provided.", [
                { name: "id", type: "string" }
            ], { type: "boolean" }), function () {
                expect(document.hasPointer).toBeDefined();
                expect(Utils.isFunction(document.hasPointer)).toBe(true);
                expect(document.hasPointer("http://example.com/document/")).toBe(true);
                expect(document.hasPointer("http://example.com/document/#fragment")).toBe(true);
                expect(document.hasPointer("_:BlankNode")).toBe(true);
                expect(document.hasPointer("http://example.com/in/documents/")).toBe(true);
                expect(document.hasPointer("http://example.com/document/#another-fragment")).toBe(false);
                expect(document.hasPointer("_:AnotherBlankNode")).toBe(false);
                expect(document.hasPointer("http://example.com/another-document/")).toBe(false);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "getPointer", "Returns the pointer referenced by the URI provided. If not exists a pointer is created.\n" +
                "Returns null if the URI is not inside scope of the PersistedDocument.", [
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
                pointer = document.getPointer("http://example.com/document/#another-fragment");
                expect(pointer.id).toBe("http://example.com/document/#another-fragment");
                pointer = document.getPointer("_:AnotherBlankNode");
                expect(pointer.id).toBe("_:AnotherBlankNode");
                pointer = document.getPointer("this-is-considered-a-fragment/");
                expect(pointer.id).toBe("http://example.com/document/#this-is-considered-a-fragment/");
                pointer = document.getPointer("http://example.com/in/documents/");
                expect(pointer.id).toBe("http://example.com/in/documents/");
                pointer = document.getPointer("http://example.com/another-document/");
                expect(pointer.id).toBe("http://example.com/another-document/");
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "inScope"), function () {
                it(JasmineExtender_1.hasSignature("Returns true if the pointer provided is in the scope of the PersistedDocument.", [
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
                    pointer = Pointer.Factory.create("this-is-considered-a-fragment/");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("http://example.com/in/documents/");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("http://example.com/document/child/");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("http://example.com/another-document/");
                    expect(document.inScope(pointer)).toBe(true);
                    pointer = Pointer.Factory.create("http://example.org/document/");
                    expect(document.inScope(pointer)).toBe(true);
                });
                it(JasmineExtender_1.hasSignature("Returns true if the URI provided is in the scope of the PersistedDocument.", [
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
                    expect(document.inScope("this-is-considered-a-fragment/")).toBe(true);
                    expect(document.inScope("http://example.com/in/documents/")).toBe(true);
                    expect(document.inScope("http://example.com/document/child/")).toBe(true);
                    expect(document.inScope("http://example.com/another-document/")).toBe(true);
                    expect(document.inScope("http://example.org/document/")).toBe(true);
                });
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "refresh", "Sync the PersistedDocument with the data in the server.", { type: "Promise<void>" }), function () {
                expect(document.refresh).toBeDefined();
                expect(Utils.isFunction(document.refresh)).toBe(true);
                var spy = spyOn(context.documents, "refresh");
                document.refresh();
                expect(spy).toHaveBeenCalledWith(document);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "save", "Save the PersistedDocument to the server.", { type: "Promise<[ Carbon.PersistedDocument.Class, HTTP.Response.Class ]>" }), function () {
                expect(document.save).toBeDefined();
                expect(Utils.isFunction(document.save)).toBe(true);
                var spy = spyOn(context.documents, "save");
                document.save();
                expect(spy).toHaveBeenCalledWith(document);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "destroy", "Remove the data in the server referred by the id of the PersistedDocument.", { type: "Promise<Carbon.HTTP.Response.Class>" }), function () {
                expect(document.destroy).toBeDefined();
                expect(Utils.isFunction(document.destroy)).toBe(true);
                var spy = spyOn(context.documents, "delete");
                document.destroy();
                expect(spy).toHaveBeenCalledWith(document.id);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "createAccessPoint", "Creates an AccessPoint for the PersistedDocument.", { type: "Promise<[Carbon.Pointer.Class, Carbon.HTTP.Response.Class]>" }), function () {
                expect(document.createAccessPoint).toBeDefined();
                expect(Utils.isFunction(document.createAccessPoint)).toBe(true);
                var accessPoint = AccessPoint.Factory.create(document, "http://example.com/");
                var requestOptions = {};
                var spy = spyOn(context.documents, "createAccessPoint");
                document.createAccessPoint(accessPoint, "slug", requestOptions);
                expect(spy).toHaveBeenCalledWith(accessPoint, "slug", requestOptions);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeRawASKQuery", "Executes an ASK query in the document and returns a raw application/sparql-results+json object.", [
                { name: "askQuery", type: "string" },
                { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
            ], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                expect(document.executeRawASKQuery).toBeDefined();
                expect(Utils.isFunction(document.executeRawASKQuery)).toBe(true);
                var spy = spyOn(context.documents, "executeRawASKQuery");
                document.executeRawASKQuery("ASK { ?subject, ?predicate, ?object }");
                expect(spy).toHaveBeenCalledWith(document.id, "ASK { ?subject, ?predicate, ?object }", {});
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeASKQuery", "Executes an ASK query in the document and returns a boolean of th result.", [
                { name: "askQuery", type: "string" },
                { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
            ], { type: "Promise<[ boolean, Carbon.HTTP.Response.Class ]>" }), function () {
                expect(document.executeASKQuery).toBeDefined();
                expect(Utils.isFunction(document.executeASKQuery)).toBe(true);
                var spy = spyOn(context.documents, "executeASKQuery");
                document.executeASKQuery("ASK { ?subject, ?predicate, ?object }");
                expect(spy).toHaveBeenCalledWith(document.id, "ASK { ?subject, ?predicate, ?object }", {});
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeRawSELECTQuery", "Executes an SELECT query in the document and returns a raw application/sparql-results+json object.", [
                { name: "selectQuery", type: "string" },
                { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
            ], { type: "Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                expect(document.executeRawSELECTQuery).toBeDefined();
                expect(Utils.isFunction(document.executeRawSELECTQuery)).toBe(true);
                var spy = spyOn(context.documents, "executeRawSELECTQuery");
                document.executeRawSELECTQuery("SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }");
                expect(spy).toHaveBeenCalledWith(document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {});
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeSELECTQuery", "Executes an SELECT query in the document and returns the results as a `Carbon.SPARQL.SELECTResults.Class` object.", [
                { name: "selectQuery", type: "string" },
                { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
            ], { type: "Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                expect(document.executeSELECTQuery).toBeDefined();
                expect(Utils.isFunction(document.executeSELECTQuery)).toBe(true);
                var spy = spyOn(context.documents, "executeSELECTQuery");
                document.executeSELECTQuery("SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }");
                expect(spy).toHaveBeenCalledWith(document.id, "SELECT ?book ?title WHERE { <http://example.com/some-document/> ?book ?title }", {});
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeRawCONSTRUCTQuery", "Executes an CONSTRUCT query in the document and returns a string with the resulting model.", [
                { name: "constructQuery", type: "string" },
                { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
            ], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }), function () {
                expect(document.executeRawCONSTRUCTQuery).toBeDefined();
                expect(Utils.isFunction(document.executeRawCONSTRUCTQuery)).toBe(true);
                var spy = spyOn(context.documents, "executeRawCONSTRUCTQuery");
                document.executeRawCONSTRUCTQuery("CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }");
                expect(spy).toHaveBeenCalledWith(document.id, "CONSTRUCT { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {});
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "executeRawDESCRIBEQuery", "Executes an DESCRIBE query in the document and returns a string with the resulting model.", [
                { name: "constructQuery", type: "string" },
                { name: "requestOptions", type: "Carbon.HTTP.Request.Options", optional: true }
            ], { type: "Promise<[ string, Carbon.HTTP.Response.Class ]>" }), function () {
                expect(document.executeRawDESCRIBEQuery).toBeDefined();
                expect(Utils.isFunction(document.executeRawDESCRIBEQuery)).toBe(true);
                var spy = spyOn(context.documents, "executeRawDESCRIBEQuery");
                document.executeRawDESCRIBEQuery("DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }");
                expect(spy).toHaveBeenCalledWith(document.id, "DESCRIBE { ?subject ?predicate ?object } WHERE { ?subject ?predicate ?object }", {});
            });
        });
    });
});
