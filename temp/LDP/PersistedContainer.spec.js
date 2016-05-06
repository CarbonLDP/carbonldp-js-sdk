"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var Document = require("./../Document");
var PersistedDocument = require("./../PersistedDocument");
var AbstractContext_1 = require("./../AbstractContext");
var PersistedContainer = require("./PersistedContainer");
describe(JasmineExtender_1.module("Carbon/LDP/PersistedContainer"), function () {
    var context;
    it(JasmineExtender_1.isDefined(), function () {
        expect(PersistedContainer).toBeDefined();
        expect(Utils.isObject(PersistedContainer)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.LDP.PersistedContainer.Factory", "Factory class for LDP PersistedContainer objects"), function () {
        beforeEach(function () {
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
            context = new MockedContext();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(PersistedContainer.Factory).toBeDefined();
            expect(Utils.isFunction(PersistedContainer.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "hasClassProperties", "Returns true if the object has the properties to be defined as a PersistedContainer", [
            { name: "document", type: "Carbon.Document.Class" }
        ], { type: "boolean" }), function () {
            expect(PersistedContainer.Factory.hasClassProperties).toBeDefined();
            expect(Utils.isFunction(PersistedContainer.Factory.hasClassProperties)).toBe(true);
            var document;
            document = Document.Factory.create();
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document = Document.Factory.create();
            document.id = "http://example.com/resource/";
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document = PersistedDocument.Factory.create("http://example.com/resource/", context.documents);
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.addMember = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.addMembers = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.createChild = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.listChildren = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.listMembers = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.removeMember = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.removeMembers = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.removeAllMembers = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(false);
            document.upload = function () { };
            expect(PersistedContainer.Factory.hasClassProperties(document)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "decorate", "Returns the PersistedDocuments decorated as a PersistedContainer", [
            { name: "persistedDocument", type: "T extends Carbon.PersistedDocument.Class" }
        ], { "type": "T & Carbon.LDP.PersistedContainer.Class" }), function () {
            expect(PersistedContainer.Factory.decorate).toBeDefined();
            expect(Utils.isFunction(PersistedContainer.Factory.decorate)).toBe(true);
            var document;
            document = PersistedDocument.Factory.create("http://example.com/resource/", context.documents);
            var persistedContainer = PersistedContainer.Factory.decorate(document);
            expect(PersistedContainer.Factory.hasClassProperties(persistedContainer)).toBe(true);
            document = PersistedDocument.Factory.create("http://example.com/resource/", context.documents);
            document.addMember = function () { };
            document.addMembers = function () { };
            document.createChild = function () { };
            document.listChildren = function () { };
            document.listMembers = function () { };
            document.removeMember = function () { };
            document.removeMembers = function () { };
            document.removeAllMembers = function () { };
            document.upload = function () { };
            var anotherContainer = PersistedContainer.Factory.decorate(document);
            expect(PersistedContainer.Factory.hasClassProperties(anotherContainer)).toBe(true);
            expect(anotherContainer.addMember).not.toBe(persistedContainer.addMember);
            expect(anotherContainer.addMembers).not.toBe(persistedContainer.addMembers);
            expect(anotherContainer.createChild).not.toBe(persistedContainer.createChild);
            expect(anotherContainer.listChildren).not.toBe(persistedContainer.listChildren);
            expect(anotherContainer.listMembers).not.toBe(persistedContainer.listMembers);
            expect(anotherContainer.removeMember).not.toBe(persistedContainer.removeMember);
            expect(anotherContainer.removeMembers).not.toBe(persistedContainer.removeMembers);
            expect(anotherContainer.removeAllMembers).not.toBe(persistedContainer.removeAllMembers);
            expect(anotherContainer.upload).not.toBe(persistedContainer.upload);
        });
        describe(JasmineExtender_1.decoratedObject("Object decorated by the Carbon.LDP.PersistedContainer.Factory.decorate function.", [
            "Carbon.LDP.PersistedContainer.Class",
        ]), function () {
            var container;
            beforeEach(function () {
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
                context = new MockedContext();
                var document = PersistedDocument.Factory.create("http://example.com/resource/", context.documents);
                container = PersistedContainer.Factory.decorate(document);
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "addMember"), function () {
                it(JasmineExtender_1.hasSignature("Add the specified resource Pointer as a member of the container.", [
                    { name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to add as a member." },
                ], { type: "Promise<Carbon.HTTP.Response.Class>" }), function () {
                    expect(container.addMember).toBeDefined();
                    expect(Utils.isFunction(container.addMember)).toBeDefined();
                    var spy = spyOn(container._documents, "addMember");
                    var pointer = context.documents.getPointer("new-member/");
                    container.addMember(pointer);
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", pointer);
                });
                it(JasmineExtender_1.hasSignature("Add the specified resource URI as a member of the container.", [
                    { name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
                ], { type: "Promise<Carbon.HTTP.Response.Class>" }), function () {
                    expect(container.addMember).toBeDefined();
                    expect(Utils.isFunction(container.addMember)).toBeDefined();
                    var spy = spyOn(container._documents, "addMember");
                    container.addMember("new-member/");
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", "new-member/");
                });
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "addMembers", "Add the specified resources URI or Pointers as members of the container.", [
                { name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to add as members" },
            ], { type: "Promise<Carbon.HTTP.Response.Class>" }), function () {
                expect(container.addMembers).toBeDefined();
                expect(Utils.isFunction(container.addMembers)).toBeDefined();
                var spy = spyOn(container._documents, "addMembers");
                var pointers = [];
                pointers.push(context.documents.getPointer("new-member/"));
                container.addMembers(pointers);
                expect(spy).toHaveBeenCalledWith("http://example.com/resource/", pointers);
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "createChild"), function () {
                it(JasmineExtender_1.hasSignature([
                    { name: "slug", type: "string", description: "The slug name for the children URI." },
                    { name: "object", type: "Object", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one." }
                ], { type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                    expect(container.createChild).toBeDefined();
                    expect(Utils.isFunction(container.createChild)).toBeDefined();
                    var spy = spyOn(container._documents, "createChild");
                    var document = Document.Factory.create();
                    container.createChild("child", document);
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", "child", document);
                    spy.calls.reset();
                    var object = { my: "object" };
                    container.createChild("child", object);
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", "child", object);
                });
                it(JasmineExtender_1.hasSignature([
                    { name: "object", type: "Object", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one." }
                ], { type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                    expect(container.createChild).toBeDefined();
                    expect(Utils.isFunction(container.createChild)).toBeDefined();
                    var spy = spyOn(container._documents, "createChild");
                    var document = Document.Factory.create();
                    container.createChild(document);
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", document);
                    spy.calls.reset();
                    var object = { my: "object" };
                    container.createChild(object);
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", object);
                });
                it(JasmineExtender_1.hasSignature([
                    { name: "slug", type: "string", description: "The slug name for the children URI." }
                ], { type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                    expect(container.createChild).toBeDefined();
                    expect(Utils.isFunction(container.createChild)).toBeDefined();
                    var spy = spyOn(container._documents, "createChild");
                    container.createChild("child");
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", "child", {});
                });
                it(JasmineExtender_1.hasSignature({ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                    expect(container.createChild).toBeDefined();
                    expect(Utils.isFunction(container.createChild)).toBeDefined();
                    var spy = spyOn(container._documents, "createChild");
                    container.createChild();
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", {});
                });
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "listChildren", "Return all the children of the container.", { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response ]>" }), function () {
                expect(container.listChildren).toBeDefined();
                expect(Utils.isFunction(container.listChildren)).toBeDefined();
                var spy = spyOn(container._documents, "listChildren");
                container.listChildren();
                expect(spy).toHaveBeenCalledWith("http://example.com/resource/");
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "listMembers", [
                { name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`." },
            ], { type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }), function () {
                expect(container.listMembers).toBeDefined();
                expect(Utils.isFunction(container.listMembers)).toBeDefined();
                var spy = spyOn(container._documents, "listMembers");
                container.listMembers();
                expect(spy).toHaveBeenCalledWith("http://example.com/resource/", true);
                spy.calls.reset();
                container.listMembers(false);
                expect(spy).toHaveBeenCalledWith("http://example.com/resource/", false);
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "removeMember"), function () {
                it(JasmineExtender_1.hasSignature("Remove the specified resource Pointer as a member of the container.", [
                    { name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to remove as a member." },
                ], { type: "Promise<Carbon.HTTP.Response.Class>" }), function () {
                    expect(container.removeMember).toBeDefined();
                    expect(Utils.isFunction(container.removeMember)).toBeDefined();
                    var spy = spyOn(container._documents, "removeMember");
                    var pointer = context.documents.getPointer("remove-member/");
                    container.removeMember(pointer);
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", pointer);
                });
                it(JasmineExtender_1.hasSignature("Remove the specified resource URI as a member of the container.", [
                    { name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
                ], { type: "Promise<Carbon.HTTP.Response.Class>" }), function () {
                    expect(container.removeMember).toBeDefined();
                    expect(Utils.isFunction(container.removeMember)).toBeDefined();
                    var spy = spyOn(container._documents, "removeMember");
                    container.removeMember("remove-member/");
                    expect(spy).toHaveBeenCalledWith("http://example.com/resource/", "remove-member/");
                });
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "removeMembers", "Remove the specified resources URI or Pointers as members of the container.", [
                { name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to remove as members" },
            ], { type: "Promise<Carbon.HTTP.Response.Class>" }), function () {
                expect(container.removeMembers).toBeDefined();
                expect(Utils.isFunction(container.removeMembers)).toBeDefined();
                var spy = spyOn(container._documents, "removeMembers");
                var pointers = [];
                pointers.push(context.documents.getPointer("remove-member/"));
                container.removeMembers(pointers);
                expect(spy).toHaveBeenCalledWith("http://example.com/resource/", pointers);
            });
            it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "removeAllMembers", "Remove the specified resources URI or Pointers as members of the container.", [
                { name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to remove as members" },
            ], { type: "Promise<Carbon.HTTP.Response.Class>" }), function () {
                expect(container.removeAllMembers).toBeDefined();
                expect(Utils.isFunction(container.removeAllMembers)).toBeDefined();
                var spy = spyOn(container._documents, "removeAllMembers");
                container.removeAllMembers();
                expect(spy).toHaveBeenCalledWith("http://example.com/resource/");
            });
            describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "upload", "Upload a File to the server as a child of the Container."), function () {
                it(JasmineExtender_1.hasSignature([
                    { name: "slug", type: "string", description: "The slug that will be used in the URI of the data." },
                    { name: "data", type: "Blob", description: "Binary data to store in the server. The Blob works in a Browser." }
                ], { type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                    expect(container.upload).toBeDefined();
                    expect(Utils.isFunction(container.upload)).toBeDefined();
                    if (typeof Blob !== "undefined") {
                        var spy = spyOn(container._documents, "upload");
                        var blob = new Blob([JSON.stringify({ "some content": "for the blob." })], { type: "application/json" });
                        container.upload("child", blob);
                        expect(spy).toHaveBeenCalledWith("http://example.com/resource/", "child", blob);
                    }
                });
                it(JasmineExtender_1.hasSignature([
                    { name: "data", type: "Blob", description: "Binary data to store in the server. The Blob works in a Browser." }
                ], { type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                    expect(container.upload).toBeDefined();
                    expect(Utils.isFunction(container.upload)).toBeDefined();
                    if (typeof Blob !== "undefined") {
                        var spy = spyOn(container._documents, "upload");
                        var blob = new Blob([JSON.stringify({ "some content": "for the blob." })], { type: "application/json" });
                        container.upload(blob);
                        expect(spy).toHaveBeenCalledWith("http://example.com/resource/", blob);
                    }
                });
                it(JasmineExtender_1.hasSignature([
                    { name: "slug", type: "string", description: "The slug that will be used in the URI of the data." },
                    { name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js." }
                ], { type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                    expect(container.upload).toBeDefined();
                    expect(Utils.isFunction(container.upload)).toBeDefined();
                    if (typeof Buffer !== "undefined") {
                        var spy = spyOn(container._documents, "upload");
                        var buffer = new Buffer(JSON.stringify({ "some content": "for the buffer." }));
                        container.upload("child", buffer);
                        expect(spy).toHaveBeenCalledWith("http://example.com/resource/", "child", buffer);
                    }
                });
                it(JasmineExtender_1.hasSignature([
                    { name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js." }
                ], { type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }), function () {
                    expect(container.upload).toBeDefined();
                    expect(Utils.isFunction(container.upload)).toBeDefined();
                    if (typeof Buffer !== "undefined") {
                        var spy = spyOn(container._documents, "upload");
                        var buffer = new Buffer(JSON.stringify({ "some content": "for the buffer." }));
                        container.upload(buffer);
                        expect(spy).toHaveBeenCalledWith("http://example.com/resource/", buffer);
                    }
                });
            });
        });
    });
});
