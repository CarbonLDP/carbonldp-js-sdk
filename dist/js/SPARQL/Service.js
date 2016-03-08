/// <reference path="./../../typings/typings.d.ts" />
System.register(["./../Errors", "./../HTTP", "./../RDF", "./../Utils", "./RawResultsParser"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Errors, HTTP, RDF, Utils, RawResultsParser_1;
    var Class;
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (RawResultsParser_1_1) {
                RawResultsParser_1 = RawResultsParser_1_1;
            }],
        execute: function() {
            Class = (function () {
                function Class() {
                }
                Class.executeRawASKQuery = function (url, askQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, askQuery, options, Class.resultsParser);
                };
                Class.executeASKQuery = function (url, askQuery, options) {
                    if (options === void 0) { options = {}; }
                    return HTTP.Request.Service.post(url, askQuery, options, Class.resultsParser).then(function (_a) {
                        var rawResults = _a[0], response = _a[1];
                        return [rawResults.boolean, response];
                    });
                };
                Class.executeRawSELECTQuery = function (url, selectQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    HTTP.Request.Util.setAcceptHeader("application/sparql-results+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, selectQuery, options, Class.resultsParser);
                };
                Class.executeSELECTQuery = function (url, selectQuery, pointerLibrary, options) {
                    return Class.executeRawSELECTQuery(url, selectQuery, options).then(function (_a) {
                        var rawResults = _a[0], response = _a[1];
                        var rawBindings = rawResults.results.bindings;
                        var bindings = [];
                        for (var _i = 0, rawBindings_1 = rawBindings; _i < rawBindings_1.length; _i++) {
                            var bindingColumn = rawBindings_1[_i];
                            var binding = {};
                            for (var bindingRow in bindingColumn) {
                                if (!bindingColumn.hasOwnProperty(bindingRow))
                                    continue;
                                var bindingCell = bindingColumn[bindingRow];
                                binding[bindingRow] = Class.parseRawBindingProperty(bindingCell, pointerLibrary);
                            }
                            bindings.push(binding);
                        }
                        var results = {
                            vars: rawResults.head.vars,
                            bindings: bindings,
                        };
                        return [results, response];
                    });
                };
                Class.executeRawCONSTRUCTQuery = function (url, constructQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    if (HTTP.Request.Util.getHeader("Accept", options) === null)
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, constructQuery, options, Class.stringParser);
                };
                Class.executeRawDESCRIBEQuery = function (url, describeQuery, options) {
                    if (options === void 0) { options = {}; }
                    options = Utils.extend(options, Class.defaultOptions);
                    if (HTTP.Request.Util.getHeader("Accept", options) === null)
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", options);
                    HTTP.Request.Util.setContentTypeHeader("application/sparql-query", options);
                    return HTTP.Request.Service.post(url, describeQuery, options, Class.stringParser);
                };
                Class.parseRawBindingProperty = function (rawBindingProperty, pointerLibrary) {
                    switch (rawBindingProperty.type) {
                        case "uri":
                            return pointerLibrary.getPointer(rawBindingProperty.value);
                        case "bnode":
                            throw new Errors.NotImplementedError("BNodes cannot be queried directly");
                        case "literal":
                            if ("datatype" in rawBindingProperty) {
                                return RDF.Literal.Factory.parse(rawBindingProperty.value, rawBindingProperty.datatype);
                            }
                            else {
                                return RDF.Literal.Factory.parse(rawBindingProperty.value);
                            }
                        default:
                            throw new Errors.IllegalArgumentError("The bindingProperty has an unsupported type");
                    }
                };
                Class.defaultOptions = {};
                Class.resultsParser = new RawResultsParser_1.default();
                Class.stringParser = new HTTP.StringParser.Class();
                return Class;
            }());
            exports_1("Class", Class);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=Service.js.map
