"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var IDAlreadyInUseError_1 = require("./IDAlreadyInUseError");
var AbstractError_1 = require("./AbstractError");
describe(JasmineExtender_1.module("Carbon/Errors/IDAlreadyInUseError"), function () {
    describe(JasmineExtender_1.clazz("Carbon.Errors.IDAlreadyInUseError", "Error class to indicates that an ID is already in use"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(IDAlreadyInUseError_1.default).toBeDefined();
            expect(Utils.isFunction(IDAlreadyInUseError_1.default)).toBe(true);
            var error = new IDAlreadyInUseError_1.default("Message of the error");
            expect(error instanceof IDAlreadyInUseError_1.default).toBe(true);
        });
        it(JasmineExtender_1.extendsClass("Carbon.Errors.AbstractError"), function () {
            var error = new IDAlreadyInUseError_1.default("Message of the error");
            expect(error instanceof AbstractError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "name", "string"), function () {
            var error = new IDAlreadyInUseError_1.default("Message of the error");
            expect(error.name).toBeDefined();
            expect(Utils.isString(error.name)).toBe(true);
            expect(error.name).toBe("IDAlreadyInUseError");
        });
    });
});
