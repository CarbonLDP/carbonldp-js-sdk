"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var Utils = require("./../Utils");
var UsernameAndPasswordToken_1 = require("./UsernameAndPasswordToken");
var BasicAuthenticator = require("./BasicAuthenticator");
describe(JasmineExtender_1.module("Carbon/Auth/BasicAuthenticator"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(BasicAuthenticator).toBeDefined();
        expect(Utils.isObject(BasicAuthenticator)).toEqual(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Auth.BasicAuthenticator.Class", "\n\t\tAuthenticates requests using Basic Authentication\n\t"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(BasicAuthenticator.Class).toBeDefined();
            expect(Utils.isFunction(BasicAuthenticator.Class)).toEqual(true);
        });
        it(JasmineExtender_1.hasConstructor(), function () {
            var authenticator = new BasicAuthenticator.Class();
            expect(!!authenticator).toEqual(true);
            expect(authenticator instanceof BasicAuthenticator.Class).toEqual(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "isAuthenticated", "\n\t\t\treturns true if the instance contains stored credentials.\n\t\t", { type: "boolean" }), function (done) {
            var authenticator = new BasicAuthenticator.Class();
            expect(authenticator.isAuthenticated).toBeDefined();
            expect(Utils.isFunction(authenticator.isAuthenticated)).toBeDefined();
            expect(authenticator.isAuthenticated()).toEqual(false);
            authenticator.authenticate(new UsernameAndPasswordToken_1.default("foo", "foo")).then(function () {
                expect(authenticator.isAuthenticated()).toEqual(true);
                authenticator.clearAuthentication();
                expect(authenticator.isAuthenticated()).toEqual(false);
                done();
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "authenticate", "\n\t\t\tStores credentials to authenticate future requests.\n\t\t", [
            { name: "authenticationToken", type: "Carbon.Auth.UsernameAndPasswordToken" }
        ], { type: "Promise<void>" }), function (done) {
            (function () {
                var authenticator = new BasicAuthenticator.Class();
                expect(authenticator.authenticate).toBeDefined();
                expect(Utils.isFunction(authenticator.authenticate)).toEqual(true);
            })();
            var promises = [];
            (function () {
                var authenticator = new BasicAuthenticator.Class();
                var promise;
                promise = authenticator.authenticate(new UsernameAndPasswordToken_1.default("foo", "foo"));
                expect(!!promise).toEqual(true);
                expect(promise instanceof Promise).toEqual(true);
                promises.push(promise.then(function (credentials) {
                    expect(authenticator.isAuthenticated()).toEqual(true);
                    expect(credentials).toBeDefined();
                    expect(credentials).not.toBeNull();
                    expect("username" in credentials).toEqual(true);
                    expect(!!credentials.username).toEqual(true);
                    expect(Utils.isString(credentials.username)).toEqual(true);
                    expect("password" in credentials).toEqual(true);
                    expect(!!credentials.password).toEqual(true);
                    expect(Utils.isString(credentials.password)).toEqual(true);
                }, done));
            })();
            (function () {
                var unsuccessfulAuthenticator = new BasicAuthenticator.Class();
                var promise;
                promise = unsuccessfulAuthenticator.authenticate(new UsernameAndPasswordToken_1.default(null, null));
                expect(!!promise).toEqual(true);
                expect(promise instanceof Promise).toEqual(true);
                promises.push(promise.then(function () {
                    done.fail(new Error("Promise should have failed."));
                }, function (error) {
                    expect(error instanceof Errors.IllegalArgumentError).toEqual(true);
                    expect(unsuccessfulAuthenticator.isAuthenticated()).toEqual(false);
                    return;
                }));
            })();
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                done.fail(error);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "addAuthentication", "\n\t\t\tAdds the Basic authentication header to the passed request options object.\n\t\t", [
            { name: "requestOptions", type: "Carbon.HTTP.Request.Options", description: "Request options object to add Authentication headers." }
        ], { type: "Carbon.HTTP.Request.Options", description: "The request options with the added authentication headers." }), function (done) {
            var promises = [];
            var authenticator = new BasicAuthenticator.Class();
            expect(authenticator.addAuthentication).toBeDefined();
            expect(Utils.isFunction(authenticator.addAuthentication)).toEqual(true);
            expect(function () {
                authenticator.addAuthentication({});
            }).toThrow(new Errors.IllegalStateError("The authenticator isn't authenticated."));
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
                expect(Utils.S.startsWith(authorization, "Basic ")).toEqual(true);
                var auth;
                if (typeof atob !== "undefined")
                    auth = atob(authorization.substring(6));
                else
                    auth = (new Buffer(authorization.substring(6), 'base64')).toString("utf8");
                expect(auth).toEqual("user:pass");
            }, done));
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                done.fail(error);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "clearAuthentication", "\n\t\t\tClears any saved credentials and restores the Authenticator to its initial state.\n\t\t"), function (done) {
            var promises = [];
            var authenticator = new BasicAuthenticator.Class();
            expect(authenticator.clearAuthentication).toBeDefined();
            expect(Utils.isFunction(authenticator.clearAuthentication)).toEqual(true);
            authenticator.clearAuthentication();
            promises.push(authenticator.authenticate(new UsernameAndPasswordToken_1.default("user", "pass")).then(function () {
                expect(authenticator.isAuthenticated()).toEqual(true);
                authenticator.clearAuthentication();
                expect(authenticator.isAuthenticated()).toEqual(false);
            }, done));
            Promise.all(promises).then(function () {
                done();
            }, function (error) {
                done.fail(error);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "supports", "Returns true if the Authenticator supports the AuthenticationToken.", [
            { name: "authenticationToken", type: "Carbon.Auth.AuthenticationToken" }
        ], { type: "boolean" }), function () {
            var authenticator = new BasicAuthenticator.Class();
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
