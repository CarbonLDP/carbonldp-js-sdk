"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JasmineExtender_1 = require("./../test/JasmineExtender");
var AbstractContext_1 = require("./../AbstractContext");
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var Utils = require("./../Utils");
var UsernameAndPasswordToken_1 = require("./UsernameAndPasswordToken");
var Token = require("./Token");
var TokenAuthenticator = require("./TokenAuthenticator");
describe(JasmineExtender_1.module("Carbon/Auth/TokenAuthenticator"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(TokenAuthenticator).toBeDefined();
        expect(Utils.isObject(TokenAuthenticator)).toEqual(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Auth.TokenAuthenticator.Class", "\n\t\tAuthenticates requests using Basic Authentication\n\t"), function () {
        beforeEach(function () {
            jasmine.Ajax.install();
        });
        afterEach(function () {
            jasmine.Ajax.uninstall();
        });
        it(JasmineExtender_1.isDefined(), function () {
            expect(TokenAuthenticator.Class).toBeDefined();
            expect(Utils.isFunction(TokenAuthenticator.Class)).toEqual(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "context", type: "Carbon.Context", description: "The context where to authenticate the agent." }
        ]), function () {
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
            var authenticator = new TokenAuthenticator.Class(new MockedContext());
            expect(!!authenticator).toEqual(true);
            expect(authenticator instanceof TokenAuthenticator.Class).toEqual(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "isAuthenticated", "\n\t\t\treturns true if the instance contains stored credentials.\n\t\t", { type: "boolean" }), function () {
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
            var authenticator = new TokenAuthenticator.Class(new MockedContext());
            expect("isAuthenticated" in authenticator).toEqual(true);
            expect(Utils.isFunction(authenticator.isAuthenticated)).toEqual(true);
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "authenticate"), function () {
            it(JasmineExtender_1.hasSignature("Stores credentials to authenticate future requests.", [
                { name: "authenticationToken", type: "Carbon.Auth.UsernameAndPasswordToken" }
            ], { type: "Promise<Carbon.Auth.Token.Class>" }), function (done) {
                (function () {
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
                    var context = new MockedContext();
                    var authenticator = new TokenAuthenticator.Class(context);
                    expect("authenticate" in authenticator).toEqual(true);
                    expect(Utils.isFunction(authenticator.authenticate)).toEqual(true);
                })();
                var promises = [];
                (function () {
                    var SuccessfulContext = (function (_super) {
                        __extends(SuccessfulContext, _super);
                        function SuccessfulContext() {
                            _super.apply(this, arguments);
                        }
                        SuccessfulContext.prototype.resolve = function (relativeURI) {
                            return "http://example.com/successful/" + relativeURI;
                        };
                        return SuccessfulContext;
                    }(AbstractContext_1.default));
                    var expirationTime = new Date();
                    expirationTime.setDate(expirationTime.getDate() + 1);
                    jasmine.Ajax.stubRequest("http://example.com/successful/auth-tokens/", null, "POST").andReturn({
                        status: 200,
                        responseText: "\n\t\t\t\t\t\t[{\n\t\t\t\t\t\t\t\"@id\": \"\",\n\t\t\t\t\t\t\t\"@type\": [\n\t\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#Token\",\n\t\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t\t\t],\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#tokenKey\": \"token-value\",\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#expirationTime\": {\n\t\t\t\t\t\t\t\t\"@value\": \"" + expirationTime.toISOString() + "\",\n\t\t\t\t\t\t\t\t\"@type\": \"http://www.w3.org/2001/XMLSchema#dateTime\"\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}]\n\t\t\t\t\t",
                    });
                    var context = new SuccessfulContext();
                    var authenticator = new TokenAuthenticator.Class(context);
                    promises.push(authenticator.authenticate(new UsernameAndPasswordToken_1.default("user", "pass")).then(function (token) {
                        expect(authenticator.isAuthenticated()).toEqual(true);
                        expect(token).toBeDefined();
                        expect(token).not.toBeNull();
                        expect(Token.Factory.is(token)).toEqual(true);
                    }));
                })();
                (function () {
                    var UnsuccessfulContext = (function (_super) {
                        __extends(UnsuccessfulContext, _super);
                        function UnsuccessfulContext() {
                            _super.apply(this, arguments);
                        }
                        UnsuccessfulContext.prototype.resolve = function (relativeURI) {
                            return "http://example.com/unsuccessful/" + relativeURI;
                        };
                        return UnsuccessfulContext;
                    }(AbstractContext_1.default));
                    var expirationTime = new Date();
                    expirationTime.setDate(expirationTime.getDate() + 1);
                    jasmine.Ajax.stubRequest("http://example.com/unsuccessful/auth-tokens/", null, "POST").andReturn({
                        status: 401
                    });
                    var context = new UnsuccessfulContext();
                    var authenticator = new TokenAuthenticator.Class(context);
                    promises.push(authenticator.authenticate(new UsernameAndPasswordToken_1.default("user", "pass")).then(function () {
                        done.fail(new Error("The authentication should have been unsuccessful."));
                    }, function (error) {
                        expect(error instanceof HTTP.Errors.UnauthorizedError).toEqual(true);
                        expect(authenticator.isAuthenticated()).toEqual(false);
                    }));
                })();
                Promise.all(promises).then(function () {
                    done();
                }, function (error) {
                    done.fail(error);
                });
            });
            it(JasmineExtender_1.hasSignature("Stores credentials to authenticate future requests.", [
                { name: "token", type: "Carbon.Auth.Token.Class" }
            ], { type: "Promise<Carbon.Auth.Token.Class>" }), function (done) {
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
                var context = new MockedContext();
                (function () {
                    var authenticator = new TokenAuthenticator.Class(context);
                    expect("authenticate" in authenticator).toEqual(true);
                    expect(Utils.isFunction(authenticator.authenticate)).toEqual(true);
                })();
                var promises = [];
                (function () {
                    var expirationTime = new Date();
                    expirationTime.setDate(expirationTime.getDate() + 1);
                    var tokenString = "{\n\t\t\t\t\t\t\"expirationTime\": \"" + expirationTime.toISOString() + "\",\n\t\t\t\t\t\t\"id\": \"\",\n\t\t\t\t\t\t\"key\": \"token-value\",\n\t\t\t\t\t\t\"types\": [\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#Token\",\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t\t]\n\t\t\t\t\t}";
                    var authenticator = new TokenAuthenticator.Class(context);
                    promises.push(authenticator.authenticate(JSON.parse(tokenString))
                        .then(function (tokenCredentials) {
                        expect(authenticator.isAuthenticated()).toEqual(true);
                        expect(tokenCredentials).toBeDefined();
                        expect(tokenCredentials).not.toBeNull();
                        expect(Token.Factory.is(tokenCredentials)).toEqual(true);
                    }));
                })();
                (function () {
                    var expirationTime = new Date();
                    expirationTime.setDate(expirationTime.getDate() - 1);
                    var tokenString = "{\n\t\t\t\t\t\t\"expirationTime\": \"" + expirationTime.toISOString() + "\",\n\t\t\t\t\t\t\"id\": \"\",\n\t\t\t\t\t\t\"key\": \"token-value\",\n\t\t\t\t\t\t\"types\": [\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#Token\",\n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/platform#VolatileResource\"\n\t\t\t\t\t\t]\n\t\t\t\t\t}";
                    var authenticator = new TokenAuthenticator.Class(context);
                    promises.push(authenticator.authenticate(JSON.parse(tokenString)).then(function () {
                        done.fail(new Error("The authentication should have been unsuccessful."));
                    }, function (error) {
                        expect(error instanceof Errors.IllegalArgumentError).toEqual(true);
                        expect(authenticator.isAuthenticated()).toEqual(false);
                    }));
                })();
                Promise.all(promises).then(function () {
                    done();
                }, function (error) {
                    done.fail(error);
                });
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "addAuthentication", "\n\t\t\tAdds the Basic authentication header to the passed request options object.\n\t\t", [
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", description: "Request options object to add Authentication headers." }
        ], { type: "Carbon.HTTP.Request.Options", description: "The request options with the added authentication headers." }), function (done) {
            (function () {
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
                var authenticator = new TokenAuthenticator.Class(new MockedContext());
                expect("addAuthentication" in authenticator).toEqual(true);
                expect(Utils.isFunction(authenticator.addAuthentication)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var SuccessfulContext = (function (_super) {
                    __extends(SuccessfulContext, _super);
                    function SuccessfulContext() {
                        _super.apply(this, arguments);
                    }
                    SuccessfulContext.prototype.resolve = function (relativeURI) {
                        return "http://example.com/successful/" + relativeURI;
                    };
                    return SuccessfulContext;
                }(AbstractContext_1.default));
                var expirationTime = new Date();
                expirationTime.setDate(expirationTime.getDate() + 1);
                jasmine.Ajax.stubRequest("http://example.com/successful/auth-tokens/", null, "POST").andReturn({
                    status: 200,
                    responseText: "[{\n\t\t\t\t\t\t\"@id\": \"\", \n\t\t\t\t\t\t\"@type\": [ \n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#Token\" \n\t\t\t\t\t\t], \n\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#tokenKey\": \"token-value\", \n\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#expirationTime\": { \n\t\t\t\t\t\t\t\"@value\": \"" + expirationTime.toISOString() + "\"  , \n\t\t\t\t\t\t\t\"@type\": \"http://www.w3.org/2001/XMLSchema#dateTime\" \n\t\t\t\t\t\t} \n\t\t\t\t\t}]",
                });
                var context = new SuccessfulContext();
                var authenticator = new TokenAuthenticator.Class(context);
                promises.push(authenticator.authenticate(new UsernameAndPasswordToken_1.default("user", "pass")).then(function () {
                    var requestOptions = authenticator.addAuthentication({});
                    expect(!!requestOptions).toEqual(true);
                    expect(Utils.isObject(requestOptions)).toEqual(true);
                    expect("headers" in requestOptions).toEqual(true);
                    expect(requestOptions.headers instanceof Map).toEqual(true);
                    expect(requestOptions.headers.has("authorization")).toEqual(true);
                    var authorizationHeader = requestOptions.headers.get("authorization");
                    expect(authorizationHeader instanceof HTTP.Header.Class).toEqual(true);
                    expect(authorizationHeader.values.length).toEqual(1);
                    var authorization = authorizationHeader.toString();
                    expect(Utils.S.startsWith(authorization, "Token ")).toEqual(true);
                    expect(authorization.substring(6)).toEqual("token-value");
                }));
            })();
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                done.fail(error);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "clearAuthentication", "\n\t\t\tClears any saved credentials and restores the Authenticator to its initial state.\n\t\t"), function (done) {
            (function () {
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
                var authenticator = new TokenAuthenticator.Class(new MockedContext());
                expect("clearAuthentication" in authenticator).toEqual(true);
                expect(Utils.isFunction(authenticator.clearAuthentication)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var SuccessfulContext = (function (_super) {
                    __extends(SuccessfulContext, _super);
                    function SuccessfulContext() {
                        _super.apply(this, arguments);
                    }
                    SuccessfulContext.prototype.resolve = function (relativeURI) {
                        return "http://example.com/successful/" + relativeURI;
                    };
                    return SuccessfulContext;
                }(AbstractContext_1.default));
                var expirationTime = new Date();
                expirationTime.setDate(expirationTime.getDate() + 1);
                jasmine.Ajax.stubRequest("http://example.com/successful/auth-tokens/", null, "POST").andReturn({
                    status: 200,
                    responseText: "[{\n\t\t\t\t\t\t\"@id\": \"\", \n\t\t\t\t\t\t\"@type\": [ \n\t\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#Token\" \n\t\t\t\t\t\t], \n\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#tokenKey\": \"token-value\", \n\t\t\t\t\t\t\"https://carbonldp.com/ns/v1/security#expirationTime\": { \n\t\t\t\t\t\t\t\"@value\": \"" + expirationTime.toISOString() + "\"  , \n\t\t\t\t\t\t\t\"@type\": \"http://www.w3.org/2001/XMLSchema#dateTime\" \n\t\t\t\t\t\t} \n\t\t\t\t\t}]",
                });
                var context = new SuccessfulContext();
                var authenticator = new TokenAuthenticator.Class(context);
                promises.push(authenticator.authenticate(new UsernameAndPasswordToken_1.default("user", "pass")).then(function () {
                    expect(authenticator.isAuthenticated()).toEqual(true);
                    authenticator.clearAuthentication();
                    expect(authenticator.isAuthenticated()).toEqual(false);
                }));
            })();
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                done.fail(error);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "supports", "Returns true if the Authenticator supports the AuthenticationToken.", [
            { name: "authenticationToken", type: "Carbon.Auth.AuthenticationToken" }
        ], { type: "boolean" }), function () {
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
            var authenticator = new TokenAuthenticator.Class(new MockedContext());
            expect(authenticator.supports).toBeDefined();
            expect(Utils.isFunction(authenticator.supports)).toEqual(true);
            var DummyToken = (function () {
                function DummyToken() {
                }
                return DummyToken;
            }());
            expect(authenticator.supports(new UsernameAndPasswordToken_1.default("user", "pass"))).toEqual(true);
            expect(authenticator.supports(new DummyToken())).toEqual(false);
        });
    });
});
