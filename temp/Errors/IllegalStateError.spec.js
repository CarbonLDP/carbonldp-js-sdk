"use strict";
var IllegalStateError_1 = require("./IllegalStateError");
var AbstractError_1 = require("./AbstractError");
var Utils = require("./../Utils");
var JasmineExtender_1 = require("./../test/JasmineExtender");
describe(JasmineExtender_1.module("Carbon/Errors/IllegalStateError"), function () {
    describe(JasmineExtender_1.clazz("Carbon.Errors.IllegalStateError", "Error class that can be thrown to show an illegal state, meaning an state that the application is not supposed to reach."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(IllegalStateError_1.default).toBeDefined();
            expect(IllegalStateError_1.default).not.toBeNull();
            expect(Utils.isFunction(IllegalStateError_1.default)).toBe(true);
        });
        it(JasmineExtender_1.extendsClass("Carbon.Errors.AbstractError"), function () {
            var illegalStateError = new IllegalStateError_1.default("This is the message");
            expect(illegalStateError instanceof AbstractError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "message", type: "string", optional: true, default: "" }
        ]), function () {
            var error = new IllegalStateError_1.default("Message of the error");
            expect(error).toBeTruthy();
            expect(error instanceof IllegalStateError_1.default).toBe(true);
            error = new IllegalStateError_1.default();
            expect(error).toBeTruthy();
            expect(error instanceof IllegalStateError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "toString", { type: "string" }), function () {
            var error = new IllegalStateError_1.default("Message of the error");
            expect(error.toString).toBeDefined();
            expect(Utils.isFunction(error.toString));
            expect(error.toString()).toBe("IllegalStateError: Message of the error");
            error = new IllegalStateError_1.default();
            expect(error.toString()).toBe("IllegalStateError: ");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "name", "string"), function () {
            var error = new IllegalStateError_1.default("Message of the error");
            expect(error.name).toBeDefined();
            expect(Utils.isString(error.name)).toBe(true);
            expect(error.name).toBe("IllegalStateError");
        });
    });
});
