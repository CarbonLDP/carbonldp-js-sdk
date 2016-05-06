"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var Utils = require("./Utils");
var RawResults = require("./SPARQL/RawResults");
var RawResultsParser = require("./SPARQL/RawResultsParser");
var Service_1 = require("./SPARQL/Service");
var SPARQL = require("./SPARQL");
describe(JasmineExtender_1.module("Carbon/SPARQL"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(SPARQL).toBeDefined();
        expect(Utils.isObject(SPARQL)).toBe(true);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RawResultsRawResults", "Carbon/SPARQL/RawResults"), function () {
        expect(SPARQL.RawResults).toBeDefined();
        expect(SPARQL.RawResults).toBe(RawResults);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "RawResultsParserRawResultsParser", "Carbon/SPARQL/RawResultsParser"), function () {
        expect(SPARQL.RawResultsParser).toBeDefined();
        expect(SPARQL.RawResultsParser).toBe(RawResultsParser);
    });
    it(JasmineExtender_1.reexports(JasmineExtender_1.STATIC, "ServiceService", "Carbon/SPARQL/Service"), function () {
        expect(SPARQL.Service).toBeDefined();
        expect(SPARQL.Service).toBe(Service_1.default);
    });
});
