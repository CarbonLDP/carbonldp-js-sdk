"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var VCARD = require("./VCARD");
describe(JasmineExtender_1.module("Carbon/NS/VCARD"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(VCARD).toBeDefined();
        expect(Utils.isObject(VCARD)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "namespace", "string"), function () {
        expect(VCARD.namespace).toBeDefined();
        expect(Utils.isString(VCARD.namespace)).toBe(true);
        expect(VCARD.namespace).toBe("http://www.w3.org/2001/vcard-rdf/3.0#");
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.VCARD.Predicate", "Class that contains some predicates defined in the vCard Ontology Specification"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(VCARD.Predicate).toBeDefined();
            expect(Utils.isFunction(VCARD.Predicate)).toBe(true);
            expect(Object.keys(VCARD.Predicate).length).toBe(1);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "email", "string"), function () {
            expect(VCARD.Predicate.email).toBeDefined();
            expect(Utils.isString(VCARD.Predicate.email)).toBe(true);
            expect(VCARD.Predicate.email).toBe("http://www.w3.org/2001/vcard-rdf/3.0#email");
        });
    });
});
