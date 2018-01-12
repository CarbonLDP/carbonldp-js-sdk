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
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("sparqler/tokens");
var Errors_1 = require("./../../Errors");
var QueryDocumentBuilder = require("./QueryDocumentBuilder");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Class.prototype.orderBy = function (property, flow) {
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new Errors_1.IllegalStateError("A sub-select token has not been defined.");
        var orderIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "order"; });
        if (orderIndex !== -1) {
            select.modifiers.splice(orderIndex, 1);
            var optionalIndex = select.patterns.findIndex(function (pattern) { return pattern.token === "optional"; });
            select.patterns.splice(optionalIndex, 1);
        }
        select.modifiers.unshift(new tokens_1.OrderToken(property.variable, parseFlowString(flow)));
        var propertyPatternsPath;
        while (property !== this._document) {
            var propertyTriple = property && property.getTriple();
            if (!propertyTriple)
                throw new Errors_1.IllegalArgumentError("The property \"" + property.name + "\" is not a valid property defined by the builder.");
            var propertyPattern = new tokens_1.OptionalToken()
                .addPattern(propertyTriple);
            if (propertyPatternsPath)
                propertyPattern.addPattern(propertyPatternsPath);
            propertyPatternsPath = propertyPattern;
            property = this._context.getProperty(property.name
                .split(".")
                .slice(0, -1)
                .join("."));
        }
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
