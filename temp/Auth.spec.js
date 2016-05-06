"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var AbstractContext_1 = require("./AbstractContext");
var BasicAuthenticator_1 = require("./Auth/BasicAuthenticator");
var Token = require("./Auth/Token");
var TokenAuthenticator_1 = require("./Auth/TokenAuthenticator");
var UsernameAndPasswordToken_1 = require("./Auth/UsernameAndPasswordToken");
var Errors = require("./Errors");
var Auth = require("./Auth");
var Auth_1 = require("./Auth");
describe(JasmineExtender_1.module("Carbon/Auth"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Auth).toBeDefined();
        expect(Utils.isObject(Auth)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "AuthenticationToken", "Carbon.Auth.AuthenticationToken"), function () {
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Authenticator", "Carbon.Auth.Authenticator"), function () {
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "BasicAuthenticator", "Carbon.Auth.BasicAuthenticator"), function () {
        expect(Auth.BasicAuthenticator).toBeDefined();
        expect(Auth.BasicAuthenticator).toBe(BasicAuthenticator_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Token", "Carbon.Auth.Token"), function () {
        expect(Auth.Token).toBeDefined();
        expect(Auth.Token).toBe(Token);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "TokenAuthenticator", "Carbon.Auth.TokenAuthenticator"), function () {
        expect(Auth.TokenAuthenticator).toBeDefined();
        expect(Auth.TokenAuthenticator).toBe(TokenAuthenticator_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "UsernameAndPasswordToken", "Carbon.Auth.UsernameAndPasswordToken"), function () {
        expect(Auth.UsernameAndPasswordToken).toBeDefined();
        expect(Auth.UsernameAndPasswordToken).toBe(UsernameAndPasswordToken_1.default);
    });
    describe(JasmineExtender_1.enumeration("Carbon.Auth.Method", "Enum with for the methods of authentication supported"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Auth.Method).toBeDefined();
            expect(Utils.isObject(Auth.Method)).toBe(true);
        });
        it(JasmineExtender_1.hasEnumeral("BASIC", "HTTP Basic authentication sending the `username` and `password` in every call."), function () {
            expect(Auth.Method.BASIC).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("TOKEN", "Authentication with `username` and `password` generating a token that will be sent in every call."), function () {
            expect(Auth.Method.TOKEN).toBeDefined();
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.Auth.Class", "Class for manage all the methods of authentication."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Auth.Class).toBeDefined();
            expect(Utils.isFunction(Auth.Class)).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor(), function () {
            var context;
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
            context = new MockedContext();
            var auth = new Auth.Class(context);
            expect(auth).toBeTruthy();
            expect(auth instanceof Auth.Class).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "isAuthenticated", "Returns true the user is authenticated.", [
            { name: "askParent", type: "boolean", optional: true, default: "true" }
        ], { type: "boolean" }), function () {
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "authenticate", "Authenticate the user with an `username` and `password`. Uses the `TOKEN` method for the authentication.", [
            { name: "username", type: "string" },
            { name: "password", type: "string" }
        ], { type: "Promise<Carbon.Auth.Credentials>" }), function () {
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
            var auth = new Auth.Class(context);
            expect(auth.authenticate).toBeDefined();
            expect(Utils.isFunction(auth.authenticate)).toBe(true);
            var spy = spyOn(auth, "authenticateUsing");
            auth.authenticate("myUer@user.com", "myAwesomePassword");
            expect(spy).toHaveBeenCalledWith("TOKEN", "myUer@user.com", "myAwesomePassword");
        });
        describe(JasmineExtender_1.method(JasmineExtender_1.INSTANCE, "authenticateUsing"), function () {
            var context;
            beforeEach(function () {
                var MockedContext = (function (_super) {
                    __extends(MockedContext, _super);
                    function MockedContext() {
                        _super.apply(this, arguments);
                    }
                    MockedContext.prototype.resolve = function (uri) {
                        return "http://example.com/" + uri;
                    };
                    return MockedContext;
                }(AbstractContext_1.default));
                context = new MockedContext();
                jasmine.Ajax.install();
            });
            afterEach(function () {
                jasmine.Ajax.uninstall();
            });
            it(JasmineExtender_1.hasSignature("Authenticates the user with Basic HTTP Authentication, witch uses encoded username and password.", [
                { name: "method", type: "'BASIC'" },
                { name: "username", type: "string" },
                { name: "password", type: "string" }
            ], { type: "Promise<Carbon.Auth.UsernameAndPasswordCredentials.Class>" }), function (done) {
                var auth01 = new Auth.Class(context);
                expect(auth01.authenticateUsing).toBeDefined();
                expect(Utils.isFunction(auth01.authenticateUsing)).toBe(true);
                expect(auth01.isAuthenticated()).toBe(false);
                var username = "myUser@user.com";
                var password = "myAwesomePassword";
                var promises = [];
                var promise;
                var spies = {
                    success: function (credentials) {
                        expect(auth01.isAuthenticated()).toBe(true);
                        expect(credentials.username).toEqual(username);
                        expect(credentials.password).toEqual(password);
                    },
                    fail: function (error) {
                        expect(error.name).toBe(Errors.IllegalArgumentError.name);
                    }
                };
                var spySuccess = spyOn(spies, "success").and.callThrough();
                var spyFail = spyOn(spies, "fail").and.callThrough();
                promise = auth01.authenticateUsing("BASIC", username, password);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success, spies.fail));
                var auth02 = new Auth.Class(context);
                promise = auth02.authenticateUsing("BASIC", {});
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success, spies.fail));
                var auth03 = new Auth.Class(context);
                promise = auth03.authenticateUsing("Error", username, password);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success, spies.fail));
                Promise.all(promises).then(function () {
                    expect(spySuccess.calls.count()).toBe(1);
                    expect(spyFail.calls.count()).toBe(2);
                    done();
                }, done.fail);
            });
            it(JasmineExtender_1.hasSignature("Authenticates the user with username and password, and generates a JSON Web Token (JWT) credentials.", [
                { name: "method", type: "'TOKEN'" },
                { name: "username", type: "string" },
                { name: "password", type: "string" }
            ], { type: "Promise<Carbon.Auth.Token.Class>" }), function (done) {
                var auth01 = new Auth.Class(context);
                expect(auth01.authenticateUsing).toBeDefined();
                expect(Utils.isFunction(auth01.authenticateUsing)).toBe(true);
                expect(auth01.isAuthenticated()).toBe(false);
                var date = new Date();
                date.setDate(date.getDate() + 1);
                var token = [
                    {
                        "@id": "_:BlankNode",
                        "@type": [
                            "https://carbonldp.com/ns/v1/security#Token",
                            "https://carbonldp.com/ns/v1/platform#VolatileResource"
                        ],
                        "https://carbonldp.com/ns/v1/security#expirationTime": [
                            {
                                "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
                                "@value": date.toISOString()
                            }
                        ],
                        "https://carbonldp.com/ns/v1/security#tokenKey": [
                            {
                                "@value": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE"
                            }
                        ]
                    }
                ];
                var promises = [];
                var promise;
                var spies = {
                    success: function (credentials) {
                        expect(auth01.isAuthenticated()).toBe(true);
                        expect(credentials.key).toEqual(token[0]["https://carbonldp.com/ns/v1/security#tokenKey"][0]["@value"]);
                    },
                    fail: function (error) {
                        expect(error instanceof Errors.IllegalArgumentError).toBe(true);
                    }
                };
                var spySuccess = spyOn(spies, "success").and.callThrough();
                var spyFail = spyOn(spies, "fail").and.callThrough();
                jasmine.Ajax.stubRequest(/token/).andReturn({
                    status: 200,
                    responseText: JSON.stringify(token)
                });
                promise = auth01.authenticateUsing("TOKEN", "myUser@user.con", "myAwesomePassword");
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success, spies.fail));
                var auth02 = new Auth.Class(context);
                promise = auth02.authenticateUsing("TOKEN", {});
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success, spies.fail));
                var auth03 = new Auth.Class(context);
                promise = auth03.authenticateUsing("Error", "myUser@user.con", "myAwesomePassword");
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success, spies.fail));
                Promise.all(promises).then(function () {
                    expect(spySuccess.calls.count()).toBe(1);
                    expect(spyFail.calls.count()).toBe(2);
                    done();
                }, done.fail);
            });
            it(JasmineExtender_1.hasSignature("Authenticates the user with a JSON Web Token (JWT), i.e. the credentials generated by TokenAuthenticator.", [
                { name: "method", type: "'TOKEN'" },
                { name: "token", type: "Carbon.Auth.Token.Class" }
            ], { type: "Promise<Carbon.Auth.Token.Class>" }), function (done) {
                var auth01 = new Auth.Class(context);
                var auth02 = new Auth.Class(context);
                expect(auth01.authenticateUsing).toBeDefined();
                expect(Utils.isFunction(auth01.authenticateUsing)).toBe(true);
                expect(auth01.isAuthenticated()).toBe(false);
                var date;
                var token;
                var promises = [];
                var promise;
                var spies = {
                    success01: function (credential) {
                        expect(credential.key).toEqual(token.key);
                        expect(auth01.isAuthenticated()).toBe(true);
                    },
                    success02: function (credential) {
                        expect(credential.key).toEqual(token.key);
                        expect(auth02.isAuthenticated()).toBe(true);
                    },
                    fail: function (error) {
                        expect(error.name).toBe(Errors.IllegalArgumentError.name);
                    }
                };
                var spySuccess01 = spyOn(spies, "success01").and.callThrough();
                var spySuccess02 = spyOn(spies, "success02").and.callThrough();
                var spyFail = spyOn(spies, "fail").and.callThrough();
                date = new Date();
                date.setDate(date.getDate() + 1);
                token = {
                    expirationTime: date,
                    id: "_:BlankNode",
                    key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
                    types: [
                        "https://carbonldp.com/ns/v1/security#Token",
                        "https://carbonldp.com/ns/v1/platform#VolatileResource"
                    ]
                };
                promise = auth01.authenticateUsing("TOKEN", token);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success01, spies.fail));
                date = new Date();
                date.setDate(date.getDate() + 1);
                var getFromStorage = function () {
                    var storedToken = {
                        expirationTime: date.toISOString(),
                        id: "_:BlankNode",
                        key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
                        types: [
                            "https://carbonldp.com/ns/v1/security#Token",
                            "https://carbonldp.com/ns/v1/platform#VolatileResource"
                        ]
                    };
                    return JSON.parse(JSON.stringify(storedToken));
                };
                promise = auth02.authenticateUsing("TOKEN", getFromStorage());
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success02, spies.fail));
                var auth03 = new Auth.Class(context);
                date = new Date();
                date.setDate(date.getDate() - 1);
                token = {
                    expirationTime: date,
                    id: "_:BlankNode",
                    key: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodHRwczovL2V4YW1wbGUuY29tL3VzZXJzL2EtdXNlci8iLCJleHAiOjExNDkxMjAwMDAwMDB9.T8XSFKyiT-5PAx_yxv2uY94nfvx65zWz8mI2OlSUFnE",
                    types: [
                        "https://carbonldp.com/ns/v1/security#Token",
                        "https://carbonldp.com/ns/v1/platform#VolatileResource"
                    ]
                };
                promise = auth03.authenticateUsing("TOKEN", token);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success01, spies.fail));
                promise = auth03.authenticateUsing("TOKEN", {});
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success01, spies.fail));
                promise = auth03.authenticateUsing("Error", token);
                expect(promise instanceof Promise).toBe(true);
                promises.push(promise.then(spies.success01, spies.fail));
                Promise.all(promises).then(function () {
                    expect(spySuccess01.calls.count()).toBe(1);
                    expect(spySuccess02.calls.count()).toBe(1);
                    expect(spyFail.calls.count()).toBe(3);
                    done();
                }, done.fail);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "addAuthentication", "Add the authentication header to a `Carbon.HTTP.Request.Options` object.", [
            { name: "options", type: "Carbon.HTTP.Request.Options" }
        ]), function () {
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "clearAuthentication", "Deletes the current authentication"), function () {
        });
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.Auth.Class"), function () {
        expect(Auth_1.default).toBeDefined();
        expect(Auth_1.default).toBe(Auth.Class);
    });
});
