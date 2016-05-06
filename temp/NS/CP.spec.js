"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var CP = require("./CP");
describe(JasmineExtender_1.module("Carbon/NS/CP"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(CP).toBeDefined();
        expect(Utils.isObject(CP)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "namespace", "string"), function () {
        expect(CP.namespace).toBeDefined();
        expect(Utils.isString(CP.namespace)).toBe(true);
        expect(CP.namespace).toBe("https://carbonldp.com/ns/v1/patch#");
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.CP.Predicate", "Class that contains predicates defined by Carbon Patch"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(CP.Predicate).toBeDefined();
            expect(Utils.isFunction(CP.Predicate)).toBe(true);
            expect(Object.keys(CP.Predicate).length).toBe(3);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "ADD_ACTION", "string"), function () {
            expect(CP.Predicate.ADD_ACTION).toBeDefined();
            expect(Utils.isString(CP.Predicate.ADD_ACTION)).toBe(true);
            expect(CP.Predicate.ADD_ACTION).toBe("https://carbonldp.com/ns/v1/patch#addAction");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "SET_ACTION", "string"), function () {
            expect(CP.Predicate.SET_ACTION).toBeDefined();
            expect(Utils.isString(CP.Predicate.SET_ACTION)).toBe(true);
            expect(CP.Predicate.SET_ACTION).toBe("https://carbonldp.com/ns/v1/patch#setAction");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "DELETE_ACTION", "string"), function () {
            expect(CP.Predicate.DELETE_ACTION).toBeDefined();
            expect(Utils.isString(CP.Predicate.DELETE_ACTION)).toBe(true);
            expect(CP.Predicate.DELETE_ACTION).toBe("https://carbonldp.com/ns/v1/patch#deleteAction");
        });
    });
});
