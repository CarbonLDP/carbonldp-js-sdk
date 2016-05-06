"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var XSD = require("./XSD");
describe(JasmineExtender_1.module("Carbon/NS/XSD"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(XSD).toBeDefined();
        expect(Utils.isObject(XSD)).toBe(true);
    });
    it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "namespace", "string"), function () {
        expect(XSD.namespace).toBeDefined();
        expect(Utils.isString(XSD.namespace)).toBe(true);
        expect(XSD.namespace).toBe("http://www.w3.org/2001/XMLSchema#");
    });
    describe(JasmineExtender_1.clazz("Carbon.NS.XSD.DataType", "DataType that contains data-types defined in the XML Schema Definition Language (XSD)"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(XSD.DataType).toBeDefined();
            expect(Utils.isFunction(XSD.DataType)).toBe(true);
            expect(Object.keys(XSD.DataType).length).toBe(28 * 2);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "date", "string"), function () {
            expect(XSD.DataType.date).toBeDefined();
            expect(Utils.isString(XSD.DataType.date)).toBe(true);
            expect(XSD.DataType.date).toBe("http://www.w3.org/2001/XMLSchema#date");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#date", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#date"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#date"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#date"]).toBe("date");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "dateTime", "string"), function () {
            expect(XSD.DataType.dateTime).toBeDefined();
            expect(Utils.isString(XSD.DataType.dateTime)).toBe(true);
            expect(XSD.DataType.dateTime).toBe("http://www.w3.org/2001/XMLSchema#dateTime");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#dateTime", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#dateTime"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#dateTime"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#dateTime"]).toBe("dateTime");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "duration", "string"), function () {
            expect(XSD.DataType.duration).toBeDefined();
            expect(Utils.isString(XSD.DataType.duration)).toBe(true);
            expect(XSD.DataType.duration).toBe("http://www.w3.org/2001/XMLSchema#duration");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#duration", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#duration"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#duration"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#duration"]).toBe("duration");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "gDay", "string"), function () {
            expect(XSD.DataType.gDay).toBeDefined();
            expect(Utils.isString(XSD.DataType.gDay)).toBe(true);
            expect(XSD.DataType.gDay).toBe("http://www.w3.org/2001/XMLSchema#gDay");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#gDay", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gDay"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#gDay"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gDay"]).toBe("gDay");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "gMonth", "string"), function () {
            expect(XSD.DataType.gMonth).toBeDefined();
            expect(Utils.isString(XSD.DataType.gMonth)).toBe(true);
            expect(XSD.DataType.gMonth).toBe("http://www.w3.org/2001/XMLSchema#gMonth");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#gMonth", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gMonth"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#gMonth"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gMonth"]).toBe("gMonth");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "gMonthDay", "string"), function () {
            expect(XSD.DataType.gMonthDay).toBeDefined();
            expect(Utils.isString(XSD.DataType.gMonthDay)).toBe(true);
            expect(XSD.DataType.gMonthDay).toBe("http://www.w3.org/2001/XMLSchema#gMonthDay");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#gMonthDay", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gMonthDay"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#gMonthDay"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gMonthDay"]).toBe("gMonthDay");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "gYear", "string"), function () {
            expect(XSD.DataType.gYear).toBeDefined();
            expect(Utils.isString(XSD.DataType.gYear)).toBe(true);
            expect(XSD.DataType.gYear).toBe("http://www.w3.org/2001/XMLSchema#gYear");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#gYear", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gYear"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#gYear"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gYear"]).toBe("gYear");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "gYearMonth", "string"), function () {
            expect(XSD.DataType.gYearMonth).toBeDefined();
            expect(Utils.isString(XSD.DataType.gYearMonth)).toBe(true);
            expect(XSD.DataType.gYearMonth).toBe("http://www.w3.org/2001/XMLSchema#gYearMonth");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#gYearMonth", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gYearMonth"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#gYearMonth"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#gYearMonth"]).toBe("gYearMonth");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "time", "string"), function () {
            expect(XSD.DataType.time).toBeDefined();
            expect(Utils.isString(XSD.DataType.time)).toBe(true);
            expect(XSD.DataType.time).toBe("http://www.w3.org/2001/XMLSchema#time");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#time", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#time"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#time"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#time"]).toBe("time");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "byte", "string"), function () {
            expect(XSD.DataType.byte).toBeDefined();
            expect(Utils.isString(XSD.DataType.byte)).toBe(true);
            expect(XSD.DataType.byte).toBe("http://www.w3.org/2001/XMLSchema#byte");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#byte", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#byte"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#byte"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#byte"]).toBe("byte");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "decimal", "string"), function () {
            expect(XSD.DataType.decimal).toBeDefined();
            expect(Utils.isString(XSD.DataType.decimal)).toBe(true);
            expect(XSD.DataType.decimal).toBe("http://www.w3.org/2001/XMLSchema#decimal");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#decimal", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#decimal"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#decimal"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#decimal"]).toBe("decimal");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "int", "string"), function () {
            expect(XSD.DataType.int).toBeDefined();
            expect(Utils.isString(XSD.DataType.int)).toBe(true);
            expect(XSD.DataType.int).toBe("http://www.w3.org/2001/XMLSchema#int");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#int", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#int"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#int"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#int"]).toBe("int");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "integer", "string"), function () {
            expect(XSD.DataType.integer).toBeDefined();
            expect(Utils.isString(XSD.DataType.integer)).toBe(true);
            expect(XSD.DataType.integer).toBe("http://www.w3.org/2001/XMLSchema#integer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#integer", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#integer"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#integer"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#integer"]).toBe("integer");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "long", "string"), function () {
            expect(XSD.DataType.long).toBeDefined();
            expect(Utils.isString(XSD.DataType.long)).toBe(true);
            expect(XSD.DataType.long).toBe("http://www.w3.org/2001/XMLSchema#long");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#long", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#long"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#long"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#long"]).toBe("long");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "negativeInteger", "string"), function () {
            expect(XSD.DataType.negativeInteger).toBeDefined();
            expect(Utils.isString(XSD.DataType.negativeInteger)).toBe(true);
            expect(XSD.DataType.negativeInteger).toBe("http://www.w3.org/2001/XMLSchema#negativeInteger");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#negativeInteger", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#negativeInteger"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#negativeInteger"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#negativeInteger"]).toBe("negativeInteger");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "nonNegativeInteger", "string"), function () {
            expect(XSD.DataType.nonNegativeInteger).toBeDefined();
            expect(Utils.isString(XSD.DataType.nonNegativeInteger)).toBe(true);
            expect(XSD.DataType.nonNegativeInteger).toBe("http://www.w3.org/2001/XMLSchema#nonNegativeInteger");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#nonNegativeInteger", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#nonNegativeInteger"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#nonNegativeInteger"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#nonNegativeInteger"]).toBe("nonNegativeInteger");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "nonPositiveInteger", "string"), function () {
            expect(XSD.DataType.nonPositiveInteger).toBeDefined();
            expect(Utils.isString(XSD.DataType.nonPositiveInteger)).toBe(true);
            expect(XSD.DataType.nonPositiveInteger).toBe("http://www.w3.org/2001/XMLSchema#nonPositiveInteger");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#nonPositiveInteger", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#nonPositiveInteger"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#nonPositiveInteger"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#nonPositiveInteger"]).toBe("nonPositiveInteger");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "positiveInteger", "string"), function () {
            expect(XSD.DataType.positiveInteger).toBeDefined();
            expect(Utils.isString(XSD.DataType.positiveInteger)).toBe(true);
            expect(XSD.DataType.positiveInteger).toBe("http://www.w3.org/2001/XMLSchema#positiveInteger");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#positiveInteger", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#positiveInteger"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#positiveInteger"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#positiveInteger"]).toBe("positiveInteger");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "short", "string"), function () {
            expect(XSD.DataType.short).toBeDefined();
            expect(Utils.isString(XSD.DataType.short)).toBe(true);
            expect(XSD.DataType.short).toBe("http://www.w3.org/2001/XMLSchema#short");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#short", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#short"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#short"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#short"]).toBe("short");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "unsignedLong", "string"), function () {
            expect(XSD.DataType.unsignedLong).toBeDefined();
            expect(Utils.isString(XSD.DataType.unsignedLong)).toBe(true);
            expect(XSD.DataType.unsignedLong).toBe("http://www.w3.org/2001/XMLSchema#unsignedLong");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#unsignedLong", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedLong"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedLong"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedLong"]).toBe("unsignedLong");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "unsignedInt", "string"), function () {
            expect(XSD.DataType.unsignedInt).toBeDefined();
            expect(Utils.isString(XSD.DataType.unsignedInt)).toBe(true);
            expect(XSD.DataType.unsignedInt).toBe("http://www.w3.org/2001/XMLSchema#unsignedInt");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#unsignedInt", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedInt"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedInt"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedInt"]).toBe("unsignedInt");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "unsignedShort", "string"), function () {
            expect(XSD.DataType.unsignedShort).toBeDefined();
            expect(Utils.isString(XSD.DataType.unsignedShort)).toBe(true);
            expect(XSD.DataType.unsignedShort).toBe("http://www.w3.org/2001/XMLSchema#unsignedShort");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#unsignedShort", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedShort"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedShort"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedShort"]).toBe("unsignedShort");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "unsignedByte", "string"), function () {
            expect(XSD.DataType.unsignedByte).toBeDefined();
            expect(Utils.isString(XSD.DataType.unsignedByte)).toBe(true);
            expect(XSD.DataType.unsignedByte).toBe("http://www.w3.org/2001/XMLSchema#unsignedByte");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#unsignedByte", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedByte"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedByte"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#unsignedByte"]).toBe("unsignedByte");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "double", "string"), function () {
            expect(XSD.DataType.double).toBeDefined();
            expect(Utils.isString(XSD.DataType.double)).toBe(true);
            expect(XSD.DataType.double).toBe("http://www.w3.org/2001/XMLSchema#double");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#double", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#double"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#double"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#double"]).toBe("double");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "float", "string"), function () {
            expect(XSD.DataType.float).toBeDefined();
            expect(Utils.isString(XSD.DataType.float)).toBe(true);
            expect(XSD.DataType.float).toBe("http://www.w3.org/2001/XMLSchema#float");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#float", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#float"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#float"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#float"]).toBe("float");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "boolean", "string"), function () {
            expect(XSD.DataType.boolean).toBeDefined();
            expect(Utils.isString(XSD.DataType.boolean)).toBe(true);
            expect(XSD.DataType.boolean).toBe("http://www.w3.org/2001/XMLSchema#boolean");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#boolean", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#boolean"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#boolean"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#boolean"]).toBe("boolean");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "string", "string"), function () {
            expect(XSD.DataType.string).toBeDefined();
            expect(Utils.isString(XSD.DataType.string)).toBe(true);
            expect(XSD.DataType.string).toBe("http://www.w3.org/2001/XMLSchema#string");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#string", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#string"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#string"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#string"]).toBe("string");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "object", "string"), function () {
            expect(XSD.DataType.object).toBeDefined();
            expect(Utils.isString(XSD.DataType.object)).toBe(true);
            expect(XSD.DataType.object).toBe("http://www.w3.org/2001/XMLSchema#object");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.STATIC, "http://www.w3.org/2001/XMLSchema#object", "string"), function () {
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#object"]).toBeDefined();
            expect(Utils.isString(XSD.DataType["http://www.w3.org/2001/XMLSchema#object"])).toBe(true);
            expect(XSD.DataType["http://www.w3.org/2001/XMLSchema#object"]).toBe("object");
        });
    });
});
