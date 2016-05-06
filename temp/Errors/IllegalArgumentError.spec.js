"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var IllegalArgumentError_1 = require("./IllegalArgumentError");
var AbstractError_1 = require("./AbstractError");
describe(JasmineExtender_1.module("Carbon/Errors/IllegalArgumentError"), function () {
    describe(JasmineExtender_1.clazz("Carbon.Errors.IllegalArgumentError", "Error class that indicates an illegal argument was provided to in a function"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(IllegalArgumentError_1.default).toBeDefined();
            expect(Utils.isFunction(IllegalArgumentError_1.default)).toBe(true);
            var error = new IllegalArgumentError_1.default("Message of the error");
            expect(error instanceof IllegalArgumentError_1.default).toBe(true);
        });
        it(JasmineExtender_1.extendsClass("Carbon.Errors.AbstractError"), function () {
            var error = new IllegalArgumentError_1.default("Message of the error");
            expect(error instanceof AbstractError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "name", "string"), function () {
            var error = new IllegalArgumentError_1.default("Message of the error");
            expect(error.name).toBeDefined();
            expect(Utils.isString(error.name)).toBe(true);
            expect(error.name).toBe("IllegalArgumentError");
        });
    });
});
