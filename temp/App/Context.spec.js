"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JasmineExtender_1 = require("./../test/JasmineExtender");
var AbstractContext_1 = require("./../AbstractContext");
var Agents = require("./../Agents");
var App = require("./../App");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
var Context_1 = require("./Context");
describe(JasmineExtender_1.module("Carbon/App/Context"), function () {
    describe(JasmineExtender_1.clazz("Carbon.App.Context", "Class that represents a Carbon Application. " +
        "It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application's scope."), function () {
        var parentContext;
        var appContext;
        beforeEach(function () {
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
            var parentContext = new MockedContext();
            var app = App.Factory.create("App name", "App description");
            app.rootContainer = Pointer.Factory.create("http://example.com/apps/example-app/");
            appContext = new Context_1.default(parentContext, app);
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(Context_1.default).toBeDefined();
            expect(Utils.isFunction(Context_1.default));
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "parentContext", type: "Carbon.Context" },
            { name: "app", type: "Carbon.App.Context" },
        ]), function () {
            expect(appContext).toBeTruthy();
            expect(appContext instanceof Context_1.default);
        });
        it(JasmineExtender_1.extendsClass("Carbon.AbstractContext"), function () {
            expect(appContext instanceof AbstractContext_1.default);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "agents", "Carbon.Agents.Class", "Instance of Agents class for manage the agents inside of an application."), function () {
            expect(appContext.agents).toBeDefined();
            expect(appContext.agents instanceof Agents.Class).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "app", "Carbon.App.Class", "Object of type `Carbon.App.Class` witch is the Document that represents the actual Application."), function () {
            expect(appContext.app).toBeDefined();
            expect(App.Factory.is(appContext.app)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "resolve", "Resolve the URI provided in the scope of the application", [
            { name: "uri", type: "string" }
        ], { type: "string" }), function () {
            expect(appContext.resolve("/child/")).toBe("http://example.com/apps/example-app/child/");
            expect(appContext.resolve("/child-another/grandchild/"))
                .toBe("http://example.com/apps/example-app/child-another/grandchild/");
            expect(appContext.resolve("http://example.com/apps/another-app/child/"))
                .toBe("http://example.com/apps/another-app/child/");
        });
    });
});
