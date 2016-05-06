"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractError_1 = require("./AbstractError");
var Utils = require("./../Utils");
var JasmineExtender_1 = require("./../test/JasmineExtender");
describe(JasmineExtender_1.module("Carbon/Errors/AbstractError"), function () {
    describe(JasmineExtender_1.clazz("Carbon.Errors.AbstractError", ""), function () {
        var DummyError = (function (_super) {
            __extends(DummyError, _super);
            function DummyError() {
                _super.apply(this, arguments);
            }
            return DummyError;
        }(AbstractError_1.default));
        it(JasmineExtender_1.isDefined(), function () {
            expect(AbstractError_1.default).toBeDefined();
            expect(AbstractError_1.default).not.toBeNull();
            expect(Utils.isFunction(AbstractError_1.default)).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "message", type: "string" }
        ]), function () {
            var exception = new DummyError("This is the message");
            expect(exception instanceof Error).toBe(true);
            expect(exception instanceof AbstractError_1.default).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "toString", "Returns a string representation", { type: "string" }), function () {
            var exception = new DummyError("This is the message");
            expect(exception.toString).toBeDefined();
            expect(exception.toString).not.toBeNull();
            expect(Utils.isFunction(exception.toString)).toBe(true);
            expect(Utils.isString(exception.toString())).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "name", "string"), function () {
            var exception = new DummyError("This is the message");
            expect(exception.name).toBeDefined();
            expect(Utils.isString(exception.name)).toBe(true);
            expect(exception.name).toEqual("AbstractError");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "message", "string"), function () {
            var exception = new DummyError("This is the message");
            expect(exception.message).toBeDefined();
            expect(Utils.isString(exception.message)).toBe(true);
            expect(exception.message).toEqual("This is the message");
        });
    });
});
