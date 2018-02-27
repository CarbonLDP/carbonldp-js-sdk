"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(require("../Errors"));
var Request_1 = require("../HTTP/Request");
var StringParser_1 = require("../HTTP/StringParser");
var RDF = __importStar(require("./../RDF"));
var RawResultsParser_1 = __importDefault(require("./RawResultsParser"));
var Class = (function () {
    function Class() {
    }
    Class.executeRawASKQuery = function (url, askQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, Class.defaultOptions);
        Request_1.RequestUtils.setAcceptHeader("application/sparql-results+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-query", options);
        return Request_1.RequestService.post(url, askQuery, options, Class.resultsParser);
    };
    Class.executeASKQuery = function (url, askQuery, options) {
        if (options === void 0) { options = {}; }
        return Class
            .executeRawASKQuery(url, askQuery, options)
            .then(function (_a) {
            var rawResults = _a[0], response = _a[1];
            return [rawResults.boolean, response];
        });
    };
    Class.executeRawSELECTQuery = function (url, selectQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, Class.defaultOptions);
        Request_1.RequestUtils.setAcceptHeader("application/sparql-results+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-query", options);
        return Request_1.RequestService.post(url, selectQuery, options, Class.resultsParser);
    };
    Class.executeSELECTQuery = function (url, selectQuery, pointerLibrary, options) {
        if (options === void 0) { options = {}; }
        return Class
            .executeRawSELECTQuery(url, selectQuery, options)
            .then(function (_a) {
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
        options = Object.assign(options, Class.defaultOptions);
        if (Request_1.RequestUtils.getHeader("Accept", options) === undefined)
            Request_1.RequestUtils.setAcceptHeader("application/ld+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-query", options);
        return Request_1.RequestService.post(url, constructQuery, options, Class.stringParser);
    };
    Class.executeRawDESCRIBEQuery = function (url, describeQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, Class.defaultOptions);
        if (Request_1.RequestUtils.getHeader("Accept", options) === undefined)
            Request_1.RequestUtils.setAcceptHeader("application/ld+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-query", options);
        return Request_1.RequestService.post(url, describeQuery, options, Class.stringParser);
    };
    Class.executeUPDATE = function (url, updateQuery, options) {
        if (options === void 0) { options = {}; }
        options = Object.assign(options, Class.defaultOptions);
        if (Request_1.RequestUtils.getHeader("Accept", options) === undefined)
            Request_1.RequestUtils.setAcceptHeader("application/ld+json", options);
        Request_1.RequestUtils.setContentTypeHeader("application/sparql-update", options);
        return Request_1.RequestService.post(url, updateQuery, options);
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
    Class.stringParser = new StringParser_1.StringParser();
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Service.js.map
