"use strict";
var JasmineExtender_1 = require("./../../../test/JasmineExtender");
var Utils = require("./../../../Utils");
var XSD = require("./XSD");
var Errors = require("./../../../Errors");
describe(JasmineExtender_1.module("Carbon/RDF/Literal/Serializers/XSD"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(XSD).toBeDefined();
        expect(Utils.isObject(XSD)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Literal.Serializes.XSD.DateSerializer", "Class that can serialize a Date object into a string literal with format `YYY-MM-DD`" +
        "Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.dateSerializer`"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.DateSerializer).toBeDefined();
            expect(Utils.isFunction(XSD.DateSerializer)).toBe(true);
            var serializer = new XSD.DateSerializer();
            expect(serializer).toBeTruthy();
            expect(serializer instanceof XSD.DateSerializer).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "serialize", "Returns the string with format `YYY-MM-DD`, of the Date object", [
            { name: "value", type: "any" }
        ], { type: "string" }), function () {
            var serializer = new XSD.DateSerializer();
            expect(serializer.serialize).toBeDefined();
            expect(Utils.isFunction(serializer.serialize)).toBe(true);
            var date = new Date('05 October 2011 14:48 UTC');
            expect(serializer.serialize(date)).toBe("2011-10-05");
            expect(serializer.serialize.bind(null, { another: "object", that: "is", not: "a Date" })).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "another object that: is not a Date")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "2011-10-05")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, undefined)).toThrowError(Errors.IllegalArgumentError);
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "dateSerializer", "Carbon.RDF.Literal.Serializes.XSD.DateSerializer", "The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.DateSerializer`"), function () {
        expect(XSD.dateSerializer).toBeDefined();
        expect(XSD.dateSerializer instanceof XSD.DateSerializer).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Literal.Serializes.XSD.DateTimeSerializer", "Class that can serialize a Date object into a string ISO literal" +
        "Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.dateTimeSerializer`"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.DateTimeSerializer).toBeDefined();
            expect(Utils.isFunction(XSD.DateTimeSerializer)).toBe(true);
            var serializer = new XSD.DateTimeSerializer();
            expect(serializer).toBeTruthy();
            expect(serializer instanceof XSD.DateTimeSerializer).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "serialize", "Returns the simplified extended ISO format (ISO 8601) of the Date object", [
            { name: "value", type: "any" }
        ], { type: "string" }), function () {
            var serializer = new XSD.DateTimeSerializer();
            expect(serializer.serialize).toBeDefined();
            expect(Utils.isFunction(serializer.serialize)).toBe(true);
            var date = new Date('05 October 2011 14:48 UTC');
            expect(serializer.serialize(date)).toBe("2011-10-05T14:48:00.000Z");
            expect(serializer.serialize.bind(null, { another: "object", that: "is", not: "a Date" })).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "another object that: is not a Date")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "2011-10-05T14:48:00.000Z")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, undefined)).toThrowError(Errors.IllegalArgumentError);
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "dateTimeSerializer", "Carbon.RDF.Literal.Serializes.XSD.DateTimeSerializer", "The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.DateTimeSerializer`"), function () {
        expect(XSD.dateTimeSerializer).toBeDefined();
        expect(XSD.dateTimeSerializer instanceof XSD.DateTimeSerializer).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Literal.Serializes.XSD.TimeSerializer", "Class that can serialize a Date object into a literal string with format `HH:mm:ss.sssZ`" +
        "Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.timeSerializer`"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.TimeSerializer).toBeDefined();
            expect(Utils.isFunction(XSD.TimeSerializer)).toBe(true);
            var serializer = new XSD.TimeSerializer();
            expect(serializer).toBeTruthy();
            expect(serializer instanceof XSD.TimeSerializer).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "serialize", "Returns a string representing the Date object with format `HH:mm:ss.sssZ`", [
            { name: "value", type: "any" }
        ], { type: "string" }), function () {
            var serializer = new XSD.TimeSerializer();
            expect(serializer.serialize).toBeDefined();
            expect(Utils.isFunction(serializer.serialize)).toBe(true);
            var date = new Date('05 October 2011 14:48 UTC');
            expect(serializer.serialize(date)).toBe("14:48:00.000Z");
            expect(serializer.serialize.bind(null, { another: "object", that: "is", not: "a Date" })).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "another object that: is not a Date")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "14:48:00.000Z")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, undefined)).toThrowError(Errors.IllegalArgumentError);
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "timeSerializer", "Carbon.RDF.Literal.Serializes.XSD.TimeSerializer", "The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.TimeSerializer`"), function () {
        expect(XSD.timeSerializer).toBeDefined();
        expect(XSD.timeSerializer instanceof XSD.TimeSerializer).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Literal.Serializes.XSD.IntegerSerializer", "Class that can serialize any Number value to a string literal of an integer" +
        "Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.integerSerializer`"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.IntegerSerializer).toBeDefined();
            expect(Utils.isFunction(XSD.IntegerSerializer)).toBe(true);
            var serializer = new XSD.IntegerSerializer();
            expect(serializer).toBeTruthy();
            expect(serializer instanceof XSD.IntegerSerializer).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "serialize", "Returns a string representing a integer from the Number provided", [
            { name: "value", type: "any" }
        ], { type: "string" }), function () {
            var serializer = new XSD.IntegerSerializer();
            expect(serializer.serialize).toBeDefined();
            expect(Utils.isFunction(serializer.serialize)).toBe(true);
            expect(serializer.serialize(100)).toBe("100");
            expect(serializer.serialize(-100)).toBe("-100");
            expect(serializer.serialize(100.123456789)).toBe("100");
            expect(serializer.serialize(-100.123456789)).toBe("-100");
            expect(serializer.serialize(0.123456789)).toBe("0");
            expect(serializer.serialize(-0.123456789)).toBe("0");
            expect(serializer.serialize(NaN)).toBe("0");
            expect(serializer.serialize(Infinity)).toBe("0");
            expect(serializer.serialize(-Infinity)).toBe("0");
            expect(serializer.serialize.bind(null, { another: "object", that: "is", not: "a Number" })).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "another object that: is not a Number")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "100.132")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, undefined)).toThrowError(Errors.IllegalArgumentError);
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "integerSerializer", "Carbon.RDF.Literal.Serializes.XSD.IntegerSerializer", "The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.IntegerSerializer`"), function () {
        expect(XSD.integerSerializer).toBeDefined();
        expect(XSD.integerSerializer instanceof XSD.IntegerSerializer).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Literal.Serializes.XSD.UnsignedIntegerSerializer", "Class that can serialize any Number value to a string literal of an unsigned integer" +
        "Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.unsignedIntegerSerializer`"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.UnsignedIntegerSerializer).toBeDefined();
            expect(Utils.isFunction(XSD.UnsignedIntegerSerializer)).toBe(true);
            var serializer = new XSD.UnsignedIntegerSerializer();
            expect(serializer).toBeTruthy();
            expect(serializer instanceof XSD.UnsignedIntegerSerializer).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "serialize", "Returns a string representing an unsigned integer from the Number provided", [
            { name: "value", type: "any" }
        ], { type: "string" }), function () {
            var serializer = new XSD.UnsignedIntegerSerializer();
            expect(serializer.serialize).toBeDefined();
            expect(Utils.isFunction(serializer.serialize)).toBe(true);
            expect(serializer.serialize(100)).toBe("100");
            expect(serializer.serialize(-100)).toBe("100");
            expect(serializer.serialize(100.123456789)).toBe("100");
            expect(serializer.serialize(-100.123456789)).toBe("100");
            expect(serializer.serialize(0.123456789)).toBe("0");
            expect(serializer.serialize(-0.123456789)).toBe("0");
            expect(serializer.serialize(NaN)).toBe("0");
            expect(serializer.serialize(Infinity)).toBe("0");
            expect(serializer.serialize(-Infinity)).toBe("0");
            expect(serializer.serialize.bind(null, { another: "object", that: "is", not: "a Number" })).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "another object that: is not a Number")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "100.132")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, undefined)).toThrowError(Errors.IllegalArgumentError);
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "unsignedIntegerSerializer", "Carbon.RDF.Literal.Serializes.XSD.UnsignedIntegerSerializer", "The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.UnsignedIntegerSerializer`"), function () {
        expect(XSD.unsignedIntegerSerializer).toBeDefined();
        expect(XSD.unsignedIntegerSerializer instanceof XSD.UnsignedIntegerSerializer).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Literal.Serializes.XSD.FloatSerializer", "Class that can serialize any Number value to a string literal of float" +
        "Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.floatSerializer`"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.FloatSerializer).toBeDefined();
            expect(Utils.isFunction(XSD.FloatSerializer)).toBe(true);
            var serializer = new XSD.FloatSerializer();
            expect(serializer).toBeTruthy();
            expect(serializer instanceof XSD.FloatSerializer).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "serialize", "Returns a string representing a float from the Number provided", [
            { name: "value", type: "any" }
        ], { type: "string" }), function () {
            var serializer = new XSD.FloatSerializer();
            expect(serializer.serialize).toBeDefined();
            expect(Utils.isFunction(serializer.serialize)).toBe(true);
            expect(serializer.serialize(100)).toBe("100");
            expect(serializer.serialize(-100)).toBe("-100");
            expect(serializer.serialize(100.123456789)).toBe("100.123456789");
            expect(serializer.serialize(-100.123456789)).toBe("-100.123456789");
            expect(serializer.serialize(0.123456789)).toBe("0.123456789");
            expect(serializer.serialize(-0.123456789)).toBe("-0.123456789");
            expect(serializer.serialize(NaN)).toBe("NaN");
            expect(serializer.serialize(Infinity)).toBe("INF");
            expect(serializer.serialize(-Infinity)).toBe("-INF");
            expect(serializer.serialize.bind(null, { another: "object", that: "is", not: "a Number" })).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "another object that: is not a Number")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, "100.132")).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, null)).toThrowError(Errors.IllegalArgumentError);
            expect(serializer.serialize.bind(null, undefined)).toThrowError(Errors.IllegalArgumentError);
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "floatSerializer", "Carbon.RDF.Literal.Serializes.XSD.FloatSerializer", "The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.FloatSerializer`"), function () {
        expect(XSD.floatSerializer).toBeDefined();
        expect(XSD.floatSerializer instanceof XSD.FloatSerializer).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Literal.Serializes.XSD.BooleanSerializer", "Class that can serialize any variable to a string literal representation its truth value" +
        "Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.booleanSerializer`"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.BooleanSerializer).toBeDefined();
            expect(Utils.isFunction(XSD.BooleanSerializer)).toBe(true);
            var serializer = new XSD.BooleanSerializer();
            expect(serializer).toBeTruthy();
            expect(serializer instanceof XSD.BooleanSerializer).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "serialize", "Returns a string representing the truth value from the variable provided", [
            { name: "value", type: "any" }
        ], { type: "string" }), function () {
            var serializer = new XSD.BooleanSerializer();
            expect(serializer.serialize).toBeDefined();
            expect(Utils.isFunction(serializer.serialize)).toBe(true);
            expect(serializer.serialize(true)).toBe("true");
            expect(serializer.serialize(1)).toBe("true");
            expect(serializer.serialize(100)).toBe("true");
            expect(serializer.serialize(-100)).toBe("true");
            expect(serializer.serialize(100.123456789)).toBe("true");
            expect(serializer.serialize(-100.123456789)).toBe("true");
            expect(serializer.serialize(0.123456789)).toBe("true");
            expect(serializer.serialize(-0.123456789)).toBe("true");
            expect(serializer.serialize(Infinity)).toBe("true");
            expect(serializer.serialize(-Infinity)).toBe("true");
            expect(serializer.serialize({ another: "object", that: "is", not: "a Boolean" })).toBe("true");
            expect(serializer.serialize("another object that: is not a Boolean")).toBe("true");
            expect(serializer.serialize({})).toBe("true");
            expect(serializer.serialize([])).toBe("true");
            expect(serializer.serialize(-0)).toBe("false");
            expect(serializer.serialize(0)).toBe("false");
            expect(serializer.serialize(null)).toBe("false");
            expect(serializer.serialize(undefined)).toBe("false");
            expect(serializer.serialize("")).toBe("false");
            expect(serializer.serialize(NaN)).toBe("false");
            expect(serializer.serialize(false)).toBe("false");
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "booleanSerializer", "Carbon.RDF.Literal.Serializes.XSD.BooleanSerializer", "The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.BooleanSerializer`"), function () {
        expect(XSD.booleanSerializer).toBeDefined();
        expect(XSD.booleanSerializer instanceof XSD.BooleanSerializer).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RDF.Literal.Serializes.XSD.StringSerializer", "Class that can serialize any variable to a string literal representation its truth value" +
        "Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.stringSerializer`"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.StringSerializer).toBeDefined();
            expect(Utils.isFunction(XSD.StringSerializer)).toBe(true);
            var serializer = new XSD.StringSerializer();
            expect(serializer).toBeTruthy();
            expect(serializer instanceof XSD.StringSerializer).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "serialize", "Returns a string representing the truth value from the variable provided", [
            { name: "value", type: "any" }
        ], { type: "string" }), function () {
            var serializer = new XSD.StringSerializer();
            expect(serializer.serialize).toBeDefined();
            expect(Utils.isFunction(serializer.serialize)).toBe(true);
            expect(serializer.serialize(-0.0)).toBe("0");
            expect(serializer.serialize(0.0)).toBe("0");
            expect(serializer.serialize(1)).toBe("1");
            expect(serializer.serialize(100)).toBe("100");
            expect(serializer.serialize(-100)).toBe("-100");
            expect(serializer.serialize(100.123456789)).toBe("100.123456789");
            expect(serializer.serialize(-100.123456789)).toBe("-100.123456789");
            expect(serializer.serialize(NaN)).toBe("NaN");
            expect(serializer.serialize(Infinity)).toBe("Infinity");
            expect(serializer.serialize(-Infinity)).toBe("-Infinity");
            expect(serializer.serialize({ an: "object" })).toBe("[object Object]");
            expect(serializer.serialize(["an", "array"])).toBe("an,array");
            expect(serializer.serialize("a string")).toBe("a string");
            expect(serializer.serialize("")).toBe("");
            expect(serializer.serialize(true)).toBe("true");
            expect(serializer.serialize(false)).toBe("false");
            expect(serializer.serialize(function () { return "some"; })).toBe('function () { return "some"; }');
            expect(serializer.serialize(undefined)).toBe("undefined");
            expect(serializer.serialize(null)).toBe("null");
        });
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "stringSerializer", "Carbon.RDF.Literal.Serializes.XSD.StringSerializer", "The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.StringSerializer`"), function () {
        expect(XSD.stringSerializer).toBeDefined();
        expect(XSD.stringSerializer instanceof XSD.StringSerializer).toBe(true);
    });
});
