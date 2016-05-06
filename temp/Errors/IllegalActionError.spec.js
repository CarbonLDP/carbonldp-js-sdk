"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var IllegalActionError_1 = require("./IllegalActionError");
var AbstractError_1 = require("./AbstractError");
describe(JasmineExtender_1.module("Carbon/Errors/IllegalActionError"), function () {
    describe(JasmineExtender_1.clazz("Carbon.Errors.IllegalActionError", "Error class that indicates a illegal action"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(IllegalActionError_1.default).toBeDefined();
            expect(Utils.isFunction(IllegalActionError_1.default)).toBe(true);
            var error = new IllegalActionError_1.default("Message of the error");
            expect(error instanceof IllegalActionError_1.default).toBe(true);
        });
        it(JasmineExtender_1.extendsClass("Carbon.Errors.AbstractError"), function () {
            var error = new IllegalActionError_1.default("Message of the error");
            expect(error instanceof AbstractError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "name", "string"), function () {
            var error = new IllegalActionError_1.default("Message of the error");
            expect(error.name).toBeDefined();
            expect(Utils.isString(error.name)).toBe(true);
            expect(error.name).toBe("IllegalActionError");
        });
    });
});
