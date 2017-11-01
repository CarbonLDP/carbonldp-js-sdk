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
var QueryDocumentBuilder = require("./QueryDocumentBuilder");
var Utils_1 = require("./Utils");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Class.prototype.orderBy = function (property) {
        return this._orderBy(property);
    };
    Class.prototype.orderAscendantBy = function (property) {
        return this._orderBy(property, "ASC");
    };
    Class.prototype.orderDescendantBy = function (property) {
        return this._orderBy(property, "DESC");
    };
    Class.prototype.limit = function (limit) {
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new Error("A sub-select token has not been defined.");
        var limitIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "limit"; });
        if (limitIndex !== -1)
            select.modifiers.splice(limitIndex, 1);
        select.modifiers.push(new tokens_1.LimitToken(limit));
        return this;
    };
    Class.prototype.offset = function (offset) {
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new Error("A sub-select token has not been defined.");
        var offsetIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "offset"; });
        if (offsetIndex !== -1)
            select.modifiers.splice(offsetIndex, 1);
        select.modifiers.push(new tokens_1.OffsetToken(offset));
        return this;
    };
    Class.prototype._orderBy = function (property, flow) {
        var levelRegex = Utils_1.getLevelRegExp(this._document.name);
        if (!levelRegex.test(property.name))
            throw new Error("Property \"" + property.name + "\" isn't a direct property of a member.");
        var select = this._document.getPatterns().find(function (pattern) { return pattern.token === "select"; });
        if (!select)
            throw new Error("A sub-select token has not been defined.");
        var orderIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "order"; });
        if (orderIndex !== -1) {
            select.modifiers.splice(orderIndex, 1);
            var optionalIndex = select.patterns.findIndex(function (pattern) { return pattern.token === "optional"; });
            select.patterns.splice(optionalIndex, 1);
        }
        select.modifiers.unshift(new tokens_1.OrderToken(property.variable, flow));
        var propertyDefinitions = property.getPatterns()
            .find(function (pattern) { return pattern.token === "optional"; });
        if (!propertyDefinitions)
            throw new Error("The property provided is not a valid property defined by the builder.");
        var propertyTriple = propertyDefinitions.patterns[0];
        select.addPattern(new tokens_1.OptionalToken()
            .addPattern(propertyTriple));
        return this;
    };
    return Class;
}(QueryDocumentBuilder.Class));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryMembersBuilder.js.map
