"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var CS = require("./CS");
describe(JasmineExtender_1.module("Carbon/NS/CS"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(CS).toBeDefined();
        expect(Utils.isObject(CS)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "namespace", "string"), function () {
        expect(CS.namespace).toBeDefined();
        expect(Utils.isString(CS.namespace)).toBe(true);
        expect(CS.namespace).toBe("https://carbonldp.com/ns/v1/security#");
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.CS.Class", "Class that contains objects defined by Carbon Security"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(CS.Class).toBeDefined();
            expect(Utils.isFunction(CS.Class)).toBe(true);
            expect(Object.keys(CS.Class).length).toBe(4);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "Application", "string"), function () {
            expect(CS.Class.Application).toBeDefined();
            expect(Utils.isString(CS.Class.Application)).toBe(true);
            expect(CS.Class.Application).toBe("https://carbonldp.com/ns/v1/security#Application");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "Token", "string"), function () {
            expect(CS.Class.Token).toBeDefined();
            expect(Utils.isString(CS.Class.Token)).toBe(true);
            expect(CS.Class.Token).toBe("https://carbonldp.com/ns/v1/security#Token");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "AllOrigins", "string"), function () {
            expect(CS.Class.AllOrigins).toBeDefined();
            expect(Utils.isString(CS.Class.AllOrigins)).toBe(true);
            expect(CS.Class.AllOrigins).toBe("https://carbonldp.com/ns/v1/security#AllOrigins");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "AllOrigins", "string"), function () {
            expect(CS.Class.Agent).toBeDefined();
            expect(Utils.isString(CS.Class.Agent)).toBe(true);
            expect(CS.Class.Agent).toBe("https://carbonldp.com/ns/v1/security#Agent");
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.CS.Predicate", "Class that contains predicates defined by Carbon Security"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(CS.Predicate).toBeDefined();
            expect(Utils.isFunction(CS.Predicate)).toBe(true);
            expect(Object.keys(CS.Predicate).length).toBe(7);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "name", "string"), function () {
            expect(CS.Predicate.name).toBeDefined();
            expect(Utils.isString(CS.Predicate.name)).toBe(true);
            expect(CS.Predicate.name).toBe("https://carbonldp.com/ns/v1/security#name");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "allowsOrigin", "string"), function () {
            expect(CS.Predicate.allowsOrigin).toBeDefined();
            expect(Utils.isString(CS.Predicate.allowsOrigin)).toBe(true);
            expect(CS.Predicate.allowsOrigin).toBe("https://carbonldp.com/ns/v1/security#allowsOrigin");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "rootContainer", "string"), function () {
            expect(CS.Predicate.rootContainer).toBeDefined();
            expect(Utils.isString(CS.Predicate.rootContainer)).toBe(true);
            expect(CS.Predicate.rootContainer).toBe("https://carbonldp.com/ns/v1/security#rootContainer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "tokenKey", "string"), function () {
            expect(CS.Predicate.tokenKey).toBeDefined();
            expect(Utils.isString(CS.Predicate.tokenKey)).toBe(true);
            expect(CS.Predicate.tokenKey).toBe("https://carbonldp.com/ns/v1/security#tokenKey");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "expirationTime", "string"), function () {
            expect(CS.Predicate.expirationTime).toBeDefined();
            expect(Utils.isString(CS.Predicate.expirationTime)).toBe(true);
            expect(CS.Predicate.expirationTime).toBe("https://carbonldp.com/ns/v1/security#expirationTime");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "password", "string"), function () {
            expect(CS.Predicate.password).toBeDefined();
            expect(Utils.isString(CS.Predicate.password)).toBe(true);
            expect(CS.Predicate.password).toBe("https://carbonldp.com/ns/v1/security#password");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "description", "string"), function () {
            expect(CS.Predicate.description).toBeDefined();
            expect(Utils.isString(CS.Predicate.description)).toBe(true);
            expect(CS.Predicate.description).toBe("https://carbonldp.com/ns/v1/security#description");
        });
    });
});
