"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var Method_1 = require("./Method");
describe(JasmineExtender_1.module("Carbon/HTTP/Method"), function () {
    describe(JasmineExtender_1.enumeration("Carbon.HTTP.Method", "Enum with the HTTP/1.1 methods"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Method_1.default).toBeDefined();
            expect(Utils.isObject(Method_1.default)).toBe(true);
        });
        it(JasmineExtender_1.hasEnumeral("OPTIONS", "Enum that identifies the OPTIONS HTTP/1.1 method, which allows the client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying a resource action or initiating a resource retrieval"), function () {
            expect(Method_1.default.OPTIONS).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("HEAD", "Enum that identifies the HEAD HTTP/1.1 method, which returns only the headers of a GET HTTP request"), function () {
            expect(Method_1.default.OPTIONS).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("GET", "Enum that identifies the GET HTTP/1.1 method, which returns whatever information is identified by the request URI"), function () {
            expect(Method_1.default.OPTIONS).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("POST", "Enum that identifies the POST HTTP/1.1 method, which request to the server to create a new entity"), function () {
            expect(Method_1.default.OPTIONS).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("PUT", "Enum that identifies the PUT HTTP/1.1 method, which allows to replace an entirely entity, or to send a signal to a resource"), function () {
            expect(Method_1.default.OPTIONS).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("PATCH", "Enum that identifies the PATCH HTTP/1.1 method, which allows to update specified fields of an entity"), function () {
            expect(Method_1.default.OPTIONS).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("DELETE", "Enum that identifies the DELETE HTTP/1.1 method, which allows to request the deletion of a resource identified by the request URI"), function () {
            expect(Method_1.default.OPTIONS).toBeDefined();
        });
    });
});
