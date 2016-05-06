"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var UsernameAndPasswordToken = require("./UsernameAndPasswordToken");
describe(JasmineExtender_1.module("Carbon/Auth/UsernameAndPasswordToken"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(UsernameAndPasswordToken).toBeDefined();
        expect(Utils.isObject(UsernameAndPasswordToken)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.Auth.UsernameAndPasswordToken.Class", "Wrapper for manage an Authentication Token in form of UserName/Password"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(UsernameAndPasswordToken.Class).toBeDefined();
            expect(Utils.isFunction(UsernameAndPasswordToken.Class)).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "username", type: "string" },
            { name: "password", type: "string" }
        ]), function () {
            var token = new UsernameAndPasswordToken.Class("myUserName", "myPassword");
            expect(token).toBeTruthy();
            expect(token instanceof UsernameAndPasswordToken.Class).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "username", "string"), function () {
            var token = new UsernameAndPasswordToken.Class("myUserName", "myPassword");
            expect(token.username).toBeDefined();
            expect(Utils.isString(token.username)).toBe(true);
            expect(token.username).toBe("myUserName");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "password", "string"), function () {
            var token = new UsernameAndPasswordToken.Class("myUserName", "myPassword");
            expect(token.password).toBeDefined();
            expect(Utils.isString(token.password)).toBe(true);
            expect(token.password).toBe("myPassword");
        });
    });
});
