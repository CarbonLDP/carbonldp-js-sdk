"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var Header = require("./Header");
var Header_1 = require("./Header");
describe(JasmineExtender_1.module("Carbon/HTTP/Header"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(Header).toBeDefined();
        expect(Utils.isObject(Header)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.Header.Value", "Class wrapper for a string value of a HTTP header"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Header.Value).toBeDefined();
            expect(Utils.isFunction(Header.Value)).toBe(true);
        });
        it(JasmineExtender_1.hasConstructor([
            { name: "value", type: "string" }
        ]), function () {
            var value = new Header.Value("a value");
            expect(value).toBeTruthy();
            expect(value instanceof Header.Value).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "toString", { type: "string" }), function () {
            var value = new Header.Value("a value");
            expect(value.toString).toBeDefined();
            expect(Utils.isFunction(value.toString)).toBe(true);
            expect(value.toString()).toBe("a value");
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.Header.Class", "Class for have better management of the values in a HTTP header"), function () {
        var valuesArray = [
            new Header.Value("a_value"),
            new Header.Value("another_value"),
            new Header.Value("last_value")
        ];
        var valuesString = "a_value, another_value, last_value";
        it(JasmineExtender_1.isDefined(), function () {
            expect(Header.Class).toBeDefined();
            expect(Utils.isFunction(Header.Class)).toBe(true);
        });
        describe(JasmineExtender_1.constructor(), function () {
            it(JasmineExtender_1.hasSignature([
                { name: "values", type: "Array <Carbon.HTTP.Header.Value>" }
            ]), function () {
                var header = new Header.Class(valuesArray);
                expect(header).toBeTruthy();
                expect(header instanceof Header.Class).toBe(true);
            });
            it(JasmineExtender_1.hasSignature([
                { name: "value", type: "string" }
            ]), function () {
                var header = new Header.Class(valuesString);
                expect(header).toBeTruthy();
                expect(header instanceof Header.Class).toBe(true);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "toString", "string"), function () {
            var header = new Header.Class(valuesArray);
            expect(header.toString).toBeDefined();
            expect(Utils.isFunction(header.toString)).toBe(true);
            expect(header.toString()).toBe(valuesString);
            header = new Header.Class(valuesString);
            expect(header.toString).toBeDefined();
            expect(Utils.isFunction(header.toString)).toBe(true);
            expect(header.toString()).toBe(valuesString);
            header = new Header.Class("");
            expect(header.toString).toBeDefined();
            expect(Utils.isFunction(header.toString)).toBe(true);
            expect(header.toString()).toBe("");
            header = new Header.Class([]);
            expect(header.toString).toBeDefined();
            expect(Utils.isFunction(header.toString)).toBe(true);
            expect(header.toString()).toBe("");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "values", "Array <Carbon.HTTP.Header.Value>", "Array that contains each value of the header"), function () {
            var header = new Header.Class(valuesArray);
            expect(header.values).toBeDefined();
            expect(Utils.isArray(header.values)).toBe(true);
            expect(header.values).toEqual(valuesArray);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.HTTP.Header.Util", "Class with useful options for manage headers"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(Header.Util).toBeDefined();
            expect(Utils.isFunction(Header.Util)).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "parseHeaders", "Returns an Map object, witch relates the all header-names with a `Carbon.HTTP.Header.Class` containing their values", [
            { name: "headersString", type: "string" }
        ], { type: "Map <string, Carbon.HTTP.Header.Class>" }), function () {
            expect(Header.Util.parseHeaders).toBeDefined();
            expect(Utils.isFunction(Header.Util.parseHeaders)).toBe(true);
            var headersString = "\n\t\t\t\tHost: http://example.com\n\t\t\t\tUser-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)\n\t\t\t\tAccept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\n\t\t\t\tCache-Control: no-cache\n\t\t\t";
            var headersMap = Header.Util.parseHeaders(headersString);
            expect(Utils.isMap(headersMap)).toBe(true);
            expect(headersMap.size).toBe(4);
            expect(headersMap.get("host").toString()).toEqual("http://example.com");
            expect(headersMap.get("user-agent").toString()).toBe("Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)");
            expect(headersMap.get("cache-control").toString()).toBe("no-cache");
            expect(headersMap.get("accept")).toEqual(new Header.Class("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"));
        });
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.HTTP.Header.Class"), function () {
        expect(Header_1.default).toBeDefined();
        expect(Header_1.default).toBe(Header.Class);
    });
});
