"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractContext_1 = require("./AbstractContext");
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var SDKContext = require("./SDKContext");
describe(JasmineExtender_1.module("Carbon/AbstractContext"), function () {
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
    var context;
    describe(JasmineExtender_1.clazz("Carbon.AbstractContext", "Abstract class for defining contexts"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(AbstractContext_1.default).toBeDefined();
            expect(Utils.isFunction(AbstractContext_1.default)).toBe(true);
        });
        beforeEach(function () {
            context = new MockedContext();
        });
        it(JasmineExtender_1.hasConstructor(), function () {
            expect(context).toBeTruthy();
            expect(context instanceof AbstractContext_1.default).toBe(true);
        });
        it(JasmineExtender_1.extendsClass("Carbon.SDKContext.Class"), function () {
            expect(context instanceof SDKContext.Class).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "resolve", "Abstract method which implementation must resolve the URI provided in the scope of the application.", [
            { name: "relativeURI", type: "string" }
        ], { type: "string" }), function () {
            expect(context.resolve).toBeDefined();
            expect(Utils.isFunction(context.resolve)).toBe(true);
            expect(context.resolve("the mock just returns the string provided")).toBe("the mock just returns the string provided");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "parentContext", "Carbon.Context", "The parent context provided in the constructor. " +
            "If no context has provided, the property will be the singleton `Carbon.SDKContext.instance` of the class `Carbon.SDKContext.Class`."), function () {
            expect(context.parentContext).toBeDefined();
            expect(context.parentContext).toBe(SDKContext.instance);
            var newContext = new MockedContext(context);
            expect(newContext.parentContext).toBe(context);
        });
    });
});
