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
    Class.prototype.orderAscendantBy = function (property) {
        return this._orderBy(property, "ASC");
    };
    Class.prototype.orderDescendantBy = function (property) {
        return this._orderBy(property, "DESC");
    };
    Class.prototype.orderBy = function (property) {
        return this._orderBy(property);
    };
    Class.prototype.limit = function (limit) {
        var select = this._document.getPatterns()[0];
        var limitIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "limit"; });
        if (limitIndex !== -1)
            select.modifiers.splice(limitIndex, 1);
        select.addModifier(new tokens_1.LimitToken(limit));
        return this;
    };
    Class.prototype.offset = function (offset) {
        var select = this._document.getPatterns()[0];
        var offsetIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "offset"; });
        if (offsetIndex !== -1)
            select.modifiers.splice(offsetIndex, 1);
        select.addModifier(new tokens_1.OffsetToken(offset));
        return this;
    };
    Class.prototype._orderBy = function (property, flow) {
        var levelRegex = Utils_1.getLevelRegExp(this._document.name);
        if (!levelRegex.test(property.name))
            throw new Error("Property \"" + property.name + "\" isn't a direct property of a member.");
        var select = this._document.getPatterns()[0];
        var orderIndex = select.modifiers.findIndex(function (pattern) { return pattern.token === "order"; });
        if (orderIndex !== -1) {
            select.modifiers.splice(orderIndex, 1);
            var optionalIndex = select.patterns.findIndex(function (pattern) { return pattern.token === "optional"; });
            select.patterns.splice(optionalIndex, 1);
        }
        select.addModifier(new tokens_1.OrderToken(property.variable, flow));
        var propertyTriple = property.getPatterns()
            .find(function (pattern) { return pattern.token === "optional"; })
            .patterns[0];
        select.addPattern(new tokens_1.OptionalToken()
            .addPattern(propertyTriple));
        return this;
    };
    return Class;
}(QueryDocumentBuilder.Class));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryMembersBuilder.js.map
