"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var NotImplementedError_1 = require("./NotImplementedError");
var AbstractError_1 = require("./AbstractError");
describe(JasmineExtender_1.module("Carbon/Errors/NotImplementedError"), function () {
    describe(JasmineExtender_1.clazz("Carbon.Errors.NotImplementedError", "Error class that indicates a function that is still not implemented"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(NotImplementedError_1.default).toBeDefined();
            expect(Utils.isFunction(NotImplementedError_1.default)).toBe(true);
        });
        it(JasmineExtender_1.extendsClass("Carbon.Errors.AbstractError"), function () {
            var error = new NotImplementedError_1.default("Message of the error");
            expect(error instanceof AbstractError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "message", type: "string", optional: true, default: "" }
        ]), function () {
            var error = new NotImplementedError_1.default("Message of the error");
            expect(error).toBeTruthy();
            expect(error instanceof NotImplementedError_1.default).toBe(true);
            error = new NotImplementedError_1.default();
            expect(error).toBeTruthy();
            expect(error instanceof NotImplementedError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "toString", { type: "string" }), function () {
            var error = new NotImplementedError_1.default("Message of the error");
            expect(error.toString).toBeDefined();
            expect(Utils.isFunction(error.toString));
            expect(error.toString()).toBe("NotImplementedError: Message of the error");
            error = new NotImplementedError_1.default();
            expect(error.toString()).toBe("NotImplementedError: ");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "name", "string"), function () {
            var error = new NotImplementedError_1.default("Message of the error");
            expect(error.name).toBeDefined();
            expect(Utils.isString(error.name)).toBe(true);
            expect(error.name).toBe("NotImplementedError");
        });
    });
});
