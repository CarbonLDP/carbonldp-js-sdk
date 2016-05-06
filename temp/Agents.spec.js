"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Agents = require("./Agents");
var Agents_1 = require("./Agents");
var Agent = require("./Agent");
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Errors = require("./Errors");
var AbstractContext_1 = require("./AbstractContext");
describe(JasmineExtender_1.module("Carbon/Agents"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Agents).toBeDefined();
        expect(Utils.isObject(Agents)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Agents.Class", "Class for manage Agents of a determined context."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Agents.Class).toBeDefined();
            expect(Utils.isFunction(Agents.Class)).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor(), function () {
            var agents;
            var context;
            var MockedContext = (function (_super) {
                __extends(MockedContext, _super);
                function MockedContext() {
                    _super.apply(this, arguments);
                }
                MockedContext.prototype.resolve = function (uri) {
                    return "http://example.com/container/" + uri;
                };
                return MockedContext;
            }(AbstractContext_1.default));
            context = new MockedContext();
            agents = new Agents.Class(context);
            expect(agents).toBeTruthy();
            expect(agents instanceof Agents.Class).toBe(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "create"), function () {
            it(JasmineExtender_1.hasSignature("Persists an Agent Document in the server, generating a random unique slug.\n" +
                "Returns a Promise with a Pointer for the stored Agent, and the response of the call.", [
                { name: "agentDocument", type: "Carbon.Agents.Agent.Class" }
            ], { type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }), function (done) {
                var agents;
                var context;
                var MockedContext = (function (_super) {
                    __extends(MockedContext, _super);
                    function MockedContext() {
                        _super.apply(this, arguments);
                    }
                    MockedContext.prototype.resolve = function (uri) {
                        return "http://example.com/container/" + uri;
                    };
                    return MockedContext;
                }(AbstractContext_1.default));
                context = new MockedContext();
                agents = new Agents.Class(context);
                expect(agents.create).toBeDefined();
                expect(Utils.isFunction(agents.create)).toBe(true);
                var spy = spyOn(context.documents, "createChild");
                var agent = Agent.Factory.create("Agent name", "email.of.agent@example.com", "myAwesomePassword");
                expect(function () { return agents.create(agent); }).toThrowError(Errors.IllegalStateError);
                context.setSetting("platform.agents.container", "agents/");
                agents.create(agent);
                expect(spy).toHaveBeenCalledWith("http://example.com/container/agents/", agent);
                var promise;
                promise = agents.create(null);
                expect(promise instanceof Promise).toBe(true);
                var spies = {
                    onError: function (error) {
                        expect(error instanceof Errors.IllegalArgumentError);
                    }
                };
                spy = spyOn(spies, "onError").and.callThrough();
                promise = promise.catch(spies.onError);
                Promise.all([promise]).then(function () {
                    expect(spy).toHaveBeenCalled();
                    done();
                });
            });
            it(JasmineExtender_1.hasSignature("Persists an Agent Document in the server using the slug specified.\n" +
                "Returns a Promise with a Pointer for the stored Agent, and the response of the call.", [
                { name: "slug", type: "string" },
                { name: "agentDocument", type: "Carbon.Agents.Agent.Class" }
            ], { type: "Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>" }), function (done) {
                var agents;
                var context;
                var MockedContext = (function (_super) {
                    __extends(MockedContext, _super);
                    function MockedContext() {
                        _super.apply(this, arguments);
                    }
                    MockedContext.prototype.resolve = function (uri) {
                        return "http://example.com/container/" + uri;
                    };
                    return MockedContext;
                }(AbstractContext_1.default));
                context = new MockedContext();
                agents = new Agents.Class(context);
                expect(agents.create).toBeDefined();
                expect(Utils.isFunction(agents.create)).toBe(true);
                var promise;
                var spy = spyOn(context.documents, "createChild");
                var agent = Agent.Factory.create("Agent name", "email.of.agent@example.com", "myAwesomePassword");
                expect(function () { return agents.create("agentSlug", agent); }).toThrowError(Errors.IllegalStateError);
                context.setSetting("platform.agents.container", "agents/");
                agents.create("agentSlug", agent);
                expect(spy).toHaveBeenCalledWith("http://example.com/container/agents/", "agentSlug", agent);
                spy.calls.reset();
                agents.create(null, agent);
                expect(spy).toHaveBeenCalledWith("http://example.com/container/agents/", agent);
                promise = agents.create("agentSlug", null);
                expect(promise instanceof Promise).toBe(true);
                var spies = {
                    onError: function (error) {
                        expect(error instanceof Errors.IllegalArgumentError);
                    }
                };
                spy = spyOn(spies, "onError").and.callThrough();
                promise = promise.catch(spies.onError);
                Promise.all([promise]).then(function () {
                    expect(spy).toHaveBeenCalled();
                    done();
                });
            });
        });
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.Agents.Class"), function () {
        expect(Agents_1.default).toBeDefined();
        expect(Agents_1.default).toBe(Agents.Class);
    });
});
