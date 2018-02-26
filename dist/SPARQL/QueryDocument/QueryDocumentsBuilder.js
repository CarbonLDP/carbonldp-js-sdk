"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var Errors_1 = require("../../Errors");
var QueryDocumentBuilder = __importStar(require("./QueryDocumentBuilder"));
var Utils_1 = require("./Utils");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Class.prototype.orderBy = function (property, flow) {
        var propertyObj = this.property(property);
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new Errors_1.IllegalStateError("A sub-select token has not been defined.");
        this._orderData = void 0;
        var orderIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "order"; });
        if (orderIndex !== -1) {
            select.modifiers.splice(orderIndex, 1);
            var optionalIndex = select.patterns.findIndex(function (pattern) { return pattern.token === "optional"; });
            select.patterns.splice(optionalIndex, 1);
        }
        var validatedFlow = parseFlowString(flow);
        select.modifiers.unshift(new tokens_1.OrderToken(propertyObj.variable, validatedFlow));
        var orderData = {
            path: propertyObj.name
                .split(".")
                .slice(1)
                .join("."),
            flow: validatedFlow,
        };
        var propertyPatternsPath;
        while (propertyObj !== this._document) {
            var propertyTriple = propertyObj && propertyObj.getTriple();
            if (!propertyTriple)
                throw new Errors_1.IllegalArgumentError("The property \"" + propertyObj.name + "\" is not a valid property defined by the builder.");
            var propertyPattern = new tokens_1.OptionalToken()
                .addPattern(propertyTriple);
            if (propertyPatternsPath)
                propertyPattern.addPattern(propertyPatternsPath);
            propertyPatternsPath = propertyPattern;
            propertyObj = this._context.getProperty(Utils_1.getParentPath(propertyObj.name));
        }
        this._orderData = orderData;
        select.addPattern(propertyPatternsPath);
        return this;
    };
    Class.prototype.limit = function (limit) {
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new Errors_1.IllegalStateError("A sub-select token has not been defined.");
        var limitIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "limit"; });
        if (limitIndex !== -1)
            select.modifiers.splice(limitIndex, 1);
        select.modifiers.push(new tokens_1.LimitToken(limit));
        return this;
    };
    Class.prototype.offset = function (offset) {
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new Errors_1.IllegalStateError("A sub-select token has not been defined.");
        var offsetIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "offset"; });
        if (offsetIndex !== -1)
            select.modifiers.splice(offsetIndex, 1);
        select.modifiers.push(new tokens_1.OffsetToken(offset));
        return this;
    };
    return Class;
}(QueryDocumentBuilder.Class));
exports.Class = Class;
function parseFlowString(flow) {
    if (flow === void 0)
        return void 0;
    var upperCase = flow
        .toUpperCase();
    switch (upperCase) {
        case "ASC":
        case "DESC":
            return upperCase;
        case "ASCENDING":
        case "DESCENDING":
            return upperCase
                .slice(0, -6);
        default:
            throw new Errors_1.IllegalArgumentError("Invalid flow order.");
    }
}
exports.default = Class;

//# sourceMappingURL=QueryDocumentsBuilder.js.map
