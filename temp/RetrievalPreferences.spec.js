"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var IllegalArgumentError_1 = require("./Errors/IllegalArgumentError");
var Utils = require("./Utils");
var RetrievalPreferences = require("./RetrievalPreferences");
describe(JasmineExtender_1.module("Carbon/RetrievalPreferences"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(RetrievalPreferences).toBeDefined();
        expect(Utils.isObject(RetrievalPreferences)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.RetrievalPreferences.Factory", "Factory class for `Carbon.RetrievalPreferences.Class` object."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RetrievalPreferences.Factory).toBeDefined();
            expect(Utils.isFunction(RetrievalPreferences.Factory)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "is", "Returns true if the object provided has the properties of a `Carbon.RetrievalPreferences.Class` object.", [
            { name: "object", type: "Object", description: "The object to check." }
        ], { type: "boolean" }), function () {
            expect(RetrievalPreferences.Factory.is).toBeDefined();
            expect(Utils.isFunction(RetrievalPreferences.Factory.is)).toBe(true);
            var object;
            object = {};
            expect(RetrievalPreferences.Factory.is(object)).toBe(false);
            object = { orderBy: [] };
            expect(RetrievalPreferences.Factory.is(object)).toBe(true);
            object = { limit: 0 };
            expect(RetrievalPreferences.Factory.is(object)).toBe(true);
            object = { offset: 0 };
            expect(RetrievalPreferences.Factory.is(object)).toBe(true);
            object = { orderBy: [], limit: 0 };
            expect(RetrievalPreferences.Factory.is(object)).toBe(true);
            object = { orderBy: [], offset: 0 };
            expect(RetrievalPreferences.Factory.is(object)).toBe(true);
            object = { limit: 0, offset: 0 };
            expect(RetrievalPreferences.Factory.is(object)).toBe(true);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.RetrievalPreferences.Util", "Useful function when working with `Carbon.RetrievalPreferences.Class` objects."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RetrievalPreferences.Util).toBeDefined();
            expect(Utils.isFunction(RetrievalPreferences.Util)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "stringifyRetrievalPreferences", "Convert the `Carbon.RetrievalPreferences.Class` object to a URL query string.", [
            { name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", description: "The preferences to stringify." }
        ], { type: "string" }), function () {
            expect(RetrievalPreferences.Util.stringifyRetrievalPreferences).toBeDefined();
            expect(Utils.isFunction(RetrievalPreferences.Util.stringifyRetrievalPreferences)).toBe(true);
            var preferences;
            var stringPreferences;
            preferences = {};
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("");
            preferences = { limit: 10 };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?limit=10");
            preferences = { offset: 5 };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?offset=5");
            preferences = { limit: 10, offset: 5 };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?limit=10&offset=5");
            preferences = { orderBy: [] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>");
            preferences = { orderBy: [{ "@id": "-http://example.com/ns#property" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=-<http://example.com/ns%23property>");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@type": "numeric" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;numeric");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@type": "string" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23string>");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@type": "boolean" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23boolean>");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@type": "dateTime" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23dateTime>");
            preferences = { orderBy: [{ "@id": "-http://example.com/ns#property", "@type": "numeric" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=-<http://example.com/ns%23property>;numeric");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@language": "es" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;es");
            preferences = { orderBy: [{ "@id": "-http://example.com/ns#property", "@language": "es" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=-<http://example.com/ns%23property>;es");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@language": "en" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;en");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;numeric;es");
            preferences = { orderBy: [{ "@id": "-http://example.com/ns#property", "@type": "numeric", "@language": "es" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=-<http://example.com/ns%23property>;numeric;es");
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@language": "en", "@type": "boolean" }] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en");
            preferences = { orderBy: [
                    { "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
                    { "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" }
                ] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en");
            preferences = { limit: 10, orderBy: [
                    { "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
                    { "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" }
                ] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?limit=10&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en");
            preferences = { offset: 5, orderBy: [
                    { "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
                    { "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" }
                ] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?offset=5&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en");
            preferences = { limit: 10, offset: 5, orderBy: [
                    { "@id": "http://example.com/ns#property", "@type": "numeric", "@language": "es" },
                    { "@id": "-http://example.com/ns#another-property", "@language": "en", "@type": "boolean" }
                ] };
            stringPreferences = RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences);
            expect(stringPreferences).toBe("?limit=10&offset=5&orderBy=<http://example.com/ns%23property>;numeric;es,-<http://example.com/ns%23another-property>;<http://www.w3.org/2001/XMLSchema%23boolean>;en");
            preferences = { orderBy: [{ "@type": "numeric" }] };
            expect(function () { return RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences); }).toThrowError(IllegalArgumentError_1.default);
            preferences = { orderBy: [{ "@language": "es" }] };
            expect(function () { return RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences); }).toThrowError(IllegalArgumentError_1.default);
            preferences = { orderBy: [{ "@type": "numeric", "@language": "es" }] };
            expect(function () { return RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences); }).toThrowError(IllegalArgumentError_1.default);
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@type": "wrong-type" }] };
            expect(function () { return RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences); }).toThrowError(IllegalArgumentError_1.default);
            preferences = { orderBy: [{ "@id": "http://example.com/ns#property", "@type": "float" }] };
            expect(function () { return RetrievalPreferences.Util.stringifyRetrievalPreferences(preferences); }).toThrowError(IllegalArgumentError_1.default);
        });
    });
});
