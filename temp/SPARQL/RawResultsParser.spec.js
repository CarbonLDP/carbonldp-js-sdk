"use strict";
var JasmineExtender_1 = require("./../test/JasmineExtender");
var Utils = require("./../Utils");
var RawResults = require("./RawResults");
var RawResultsParser = require("./RawResultsParser");
var RawResultsParser_1 = require("./RawResultsParser");
describe(JasmineExtender_1.module("Carbon/SPARQL/RawResultsParser"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(RawResultsParser).toBeDefined();
        expect(Utils.isObject(RawResultsParser)).toBe(true);
    });
    describe(JasmineExtender_1.clazz("Carbon.SPARQL.RawResultsParser.Class", "Class for parse SPARQL Query result to a `Carbon.SPARQL.RawResult.Class` object"), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(RawResultsParser.Class).toBeDefined();
            expect(Utils.isFunction(RawResultsParser.Class)).toBe(true);
            var parser = new RawResultsParser.Class();
            expect(parser).toBeTruthy();
            expect(parser instanceof RawResultsParser.Class).toBe(true);
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.INSTANCE, "parse", "Parse the SPARQL Query string result to a `Carbon.SPARQL.RawResult.Class` object", [
            { name: "input", type: "string" }
        ], { type: "Promise<Carbon.SPARQL.RawResult.Class>" }), function (done) {
            var parser = new RawResultsParser.Class();
            expect(parser.parse).toBeDefined();
            expect(Utils.isFunction(parser.parse)).toBe(true);
            var querySelectObject = {
                "head": {
                    "link": [
                        "http://www.w3.org/TR/rdf-sparql-XMLres/example.rq"
                    ],
                    "vars": [
                        "x",
                        "hpage",
                        "name",
                        "mbox",
                        "age",
                        "blurb",
                        "friend"
                    ]
                },
                "results": {
                    "bindings": [
                        {
                            "x": { "type": "bnode", "value": "r1" },
                            "hpage": { "type": "uri", "value": "http://work.example.org/alice/" },
                            "name": { "type": "literal", "value": "Alice" },
                            "mbox": { "type": "literal", "value": "" },
                            "blurb": {
                                "datatype": "http://www.w3.org/1999/02/22-rdf-syntax-ns#XMLLiteral",
                                "type": "literal",
                                "value": "<p xmlns=\"http://www.w3.org/1999/xhtml\">My name is <b>alice</b></p>"
                            },
                            "friend": { "type": "bnode", "value": "r2" }
                        },
                        {
                            "x": { "type": "bnode", "value": "r2" },
                            "hpage": { "type": "uri", "value": "http://work.example.org/bob/" },
                            "name": { "type": "literal", "value": "Bob", "xml:lang": "en" },
                            "mbox": { "type": "uri", "value": "mailto:bob@work.example.org" },
                            "friend": { "type": "bnode", "value": "r1" }
                        }
                    ]
                }
            };
            var querySelectString = JSON.stringify(querySelectObject);
            var queryAskObject = {
                "head": {},
                "boolean": true
            };
            var queryAskString = JSON.stringify(queryAskObject);
            var spies = {
                successSelect: function (result) {
                    expect(RawResults.Factory.is(result)).toBe(true);
                    expect(result).toEqual(querySelectObject);
                },
                successAsk: function (result) {
                    expect(RawResults.Factory.is(result)).toBe(true);
                    expect(result).toEqual(queryAskObject);
                },
                fail: function (error) {
                    expect(error).toBeTruthy();
                    expect(error instanceof Error).toBe(true);
                }
            };
            var spySuccessSelect = spyOn(spies, "successSelect").and.callThrough();
            var spySuccessAsk = spyOn(spies, "successAsk").and.callThrough();
            var spyFail = spyOn(spies, "fail").and.callThrough();
            var promises = [];
            var promise;
            promise = parser.parse(querySelectString);
            expect(promise instanceof Promise);
            promises.push(promise.then(spies.successSelect, spies.fail));
            promise = parser.parse(queryAskString);
            expect(promise instanceof Promise);
            promises.push(promise.then(spies.successAsk, spies.fail));
            promise = parser.parse("something that is not a valid JSON !@#$%^&*()_+¡™£¢∞§¶•ªº–");
            expect(promise instanceof Promise);
            promises.push(promise.then(spies.successSelect, spies.fail));
            Promise.all(promises).then(function () {
                expect(spySuccessSelect.calls.count()).toBe(1);
                expect(spySuccessAsk.calls.count()).toBe(1);
                expect(spyFail.calls.count()).toBe(1);
                done();
            }, done.fail);
        });
    });
    it(JasmineExtender_1.hasDefaultExport("Carbon.SPARQL.RawResultParser.Class"), function () {
        expect(RawResultsParser_1.default).toBeDefined();
        expect(RawResultsParser_1.default).toBe(RawResultsParser.Class);
    });
});
