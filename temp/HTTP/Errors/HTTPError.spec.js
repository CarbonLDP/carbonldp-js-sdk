"use strict";
var JasmineExtender_1 = require("./../../test/JasmineExtender");
var Utils = require("./../../Utils");
var HTTPError_1 = require("./HTTPError");
var AbstractError_1 = require("./../../Errors/AbstractError");
var Request_1 = require("../Request");
describe(JasmineExtender_1.module("Carbon/HTTP/Errors/HTTPError"), function () {
    describe(JasmineExtender_1.clazz("Carbon.HTTP.Errors.HTTPError", "Error class for define any type of HTTP Error occurred"), function () {
        var response;
        beforeAll(function (done) {
            jasmine.Ajax.install();
            jasmine.Ajax.stubRequest("http://example.com/request/").andReturn({
                "status": 200,
                "responseText": "A response"
            });
            Request_1.Service.send("GET", "http://example.com/request/").then(function (_response) {
                response = _response;
                done();
            }).catch(done.fail);
        });
        afterAll(function () {
            jasmine.Ajax.uninstall();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(HTTPError_1.default).toBeDefined();
            expect(Utils.isFunction(HTTPError_1.default)).toBe(true);
        });
        it(JasmineExtender_1.extendsClass("Carbon.Errors.AbstractError"), function () {
            var error = new HTTPError_1.default("Message of the error", response);
            expect(error instanceof AbstractError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "message", type: "string" },
            { name: "response", type: "Carbon.HTTP.Response" }
        ]), function () {
            var error = new HTTPError_1.default("Message of the error", response);
            expect(error).toBeTruthy();
            expect(error instanceof HTTPError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "toString", { type: "string" }), function () {
            var error = new HTTPError_1.default("Message of the error", response);
            expect(error.toString).toBeDefined();
            expect(Utils.isFunction(error.toString));
            expect(error.toString()).toBe("HTTPError: Message of the error");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "name", "string"), function () {
            var error = new HTTPError_1.default("Message of the error", response);
            expect(error.name).toBeDefined();
            expect(Utils.isString(error.name)).toBe(true);
            expect(error.name).toBe("HTTPError");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "statusCode", "number"), function () {
            expect(HTTPError_1.default.statusCode).toBeDefined();
            expect(Utils.isNumber(HTTPError_1.default.statusCode));
            expect(HTTPError_1.default.statusCode).toBeNull();
        });
    });
});
