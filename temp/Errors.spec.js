"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var IDAlreadyInUseError_1 = require("./Errors/IDAlreadyInUseError");
var IllegalActionError_1 = require("./Errors/IllegalActionError");
var IllegalArgumentError_1 = require("./Errors/IllegalArgumentError");
var IllegalStateError_1 = require("./Errors/IllegalStateError");
var NotImplementedError_1 = require("./Errors/NotImplementedError");
var Errors = require("./Errors");
describe(JasmineExtender_1.module("Carbon/Errors"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Errors).toBeDefined();
        expect(Utils.isObject(Errors)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "IDAlreadyInUseError", "Carbon/Errors/IDAlreadyInUseError"), function () {
        expect(Errors.IDAlreadyInUseError).toBeDefined();
        expect(Errors.IDAlreadyInUseError).toBe(IDAlreadyInUseError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "IllegalActionError", "Carbon/Errors/IllegalActionError"), function () {
        expect(Errors.IllegalActionError).toBeDefined();
        expect(Errors.IllegalActionError).toBe(IllegalActionError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "IllegalArgumentError", "Carbon/Errors/IllegalArgumentError"), function () {
        expect(Errors.IllegalArgumentError).toBeDefined();
        expect(Errors.IllegalArgumentError).toBe(IllegalArgumentError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "IllegalStateError", "Carbon/Errors/IllegalStateError"), function () {
        expect(Errors.IllegalStateError).toBeDefined();
        expect(Errors.IllegalStateError).toBe(IllegalStateError_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "NotImplementedError", "Carbon/Errors/NotImplementedError"), function () {
        expect(Errors.NotImplementedError).toBeDefined();
        expect(Errors.NotImplementedError).toBe(NotImplementedError_1.default);
    });
});
