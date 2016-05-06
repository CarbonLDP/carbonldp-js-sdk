"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var Errors = require("./HTTP/Errors");
var Header = require("./HTTP/Header");
var JSONParser = require("./HTTP/JSONParser");
var JSONLDParser = require("./HTTP/JSONLDParser");
var Method_1 = require("./HTTP/Method");
var Parser = require("./HTTP/Parser");
var Request = require("./HTTP/Request");
var Response = require("./HTTP/Response");
var StatusCode_1 = require("./HTTP/StatusCode");
var StringParser = require("./HTTP/StringParser");
var HTTP = require("./HTTP");
describe(JasmineExtender_1.module("Carbon/HTTP"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(HTTP).toBeDefined();
        expect(Utils.isObject(HTTP)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Errors", "Carbon/HTTP/Errors"), function () {
        expect(HTTP.Errors).toBeDefined();
        expect(HTTP.Errors).toBe(Errors);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Header", "Carbon/HTTP/Header"), function () {
        expect(HTTP.Header).toBeDefined();
        expect(HTTP.Header).toBe(Header);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "JSONParser", "Carbon/HTTP/JSONParser"), function () {
        expect(HTTP.JSONParser).toBeDefined();
        expect(HTTP.JSONParser).toBe(JSONParser);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "JSONLDParser", "Carbon/HTTP/JSONLDParser"), function () {
        expect(HTTP.JSONLDParser).toBeDefined();
        expect(HTTP.JSONLDParser).toBe(JSONLDParser);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Method", "Carbon/HTTP/Method"), function () {
        expect(HTTP.Method).toBeDefined();
        expect(HTTP.Method).toBe(Method_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Parser", "Carbon/HTTP/Parser"), function () {
        expect(HTTP.Parser).toBeDefined();
        expect(HTTP.Parser).toBe(Parser);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Request", "Carbon/HTTP/Request"), function () {
        expect(HTTP.Request).toBeDefined();
        expect(HTTP.Request).toBe(Request);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "Response", "Carbon/HTTP/Response"), function () {
        expect(HTTP.Response).toBeDefined();
        expect(HTTP.Response).toBe(Response);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "StatusCode", "Carbon/HTTP/StatusCode"), function () {
        expect(HTTP.StatusCode).toBeDefined();
        expect(HTTP.StatusCode).toBe(StatusCode_1.default);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "StringParser", "Carbon/HTTP/StringParser"), function () {
        expect(HTTP.StringParser).toBeDefined();
        expect(HTTP.StringParser).toBe(StringParser);
    });
});
