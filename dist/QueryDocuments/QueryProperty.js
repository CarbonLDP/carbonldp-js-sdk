"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var ObjectSchema_1 = require("../ObjectSchema");
var Utils_1 = require("./Utils");
var QueryPropertyType;
(function (QueryPropertyType) {
    QueryPropertyType[QueryPropertyType["FULL"] = 0] = "FULL";
    QueryPropertyType[QueryPropertyType["PARTIAL"] = 1] = "PARTIAL";
    QueryPropertyType[QueryPropertyType["ALL"] = 2] = "ALL";
    QueryPropertyType[QueryPropertyType["EMPTY"] = 3] = "EMPTY";
})(QueryPropertyType = exports.QueryPropertyType || (exports.QueryPropertyType = {}));
var QueryProperty = (function () {
    function QueryProperty(context, name) {
        this.name = name;
        this.variable = context.getVariable(name);
        this._optional = true;
        this._context = context;
        this._patterns = [];
    }
    QueryProperty.prototype.addPattern = function () {
        var patterns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            patterns[_i] = arguments[_i];
        }
        var _a;
        (_a = this._patterns).push.apply(_a, patterns);
        return this;
    };
    QueryProperty.prototype.getPatterns = function () {
        var _a;
        var patterns = this._patterns.slice();
        var fn = getFunctionPattern(this.getType());
        if (fn) {
            var index = patterns.findIndex(function (pattern) { return pattern === void 0; });
            patterns[index] = fn(this._context, this.name);
        }
        if (!this._optional)
            return patterns;
        return [(_a = new tokens_1.OptionalToken()).addPattern.apply(_a, patterns),];
    };
    QueryProperty.prototype.getSchema = function () {
        if (this._schema)
            return this._schema;
        return this._schema = new ObjectSchema_1.DigestedObjectSchema();
    };
    QueryProperty.prototype.isOptional = function () {
        return this._optional;
    };
    QueryProperty.prototype.setOptional = function (optional) {
        this._optional = optional;
        return this;
    };
    QueryProperty.prototype.getType = function () {
        return this._type;
    };
    QueryProperty.prototype.setType = function (type) {
        if (this._type === void 0)
            this._patterns.push(void 0);
        this._type = type;
        return this;
    };
    QueryProperty.prototype.getTriple = function () {
        return this._patterns
            .find(function (pattern) { return pattern instanceof tokens_1.SubjectToken; });
    };
    QueryProperty.prototype.toString = function () {
        return "" + this.variable;
    };
    return QueryProperty;
}());
exports.QueryProperty = QueryProperty;
function getFunctionPattern(type) {
    switch (type) {
        case QueryPropertyType.ALL:
            return Utils_1.createAllPattern;
        case QueryPropertyType.FULL:
            return Utils_1.createGraphPattern;
        case QueryPropertyType.EMPTY:
        case QueryPropertyType.PARTIAL:
            return Utils_1.createTypesPattern;
        default:
            return null;
    }
}

//# sourceMappingURL=QueryProperty.js.map
