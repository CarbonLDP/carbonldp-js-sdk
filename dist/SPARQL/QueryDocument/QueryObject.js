"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var tokens_1 = require("sparqler/tokens");
var Utils_1 = require("../../Utils");
var Class = (function () {
    function Class(context, object) {
        this._context = context;
        var id = Utils_1.isString(object) ? object : object.id;
        var shortID = this._context.compactIRI(id);
        this._resource = iri_1.isPrefixed(shortID) ? new tokens_1.PrefixedNameToken(shortID) :
            iri_1.isBNodeLabel(shortID) ? new tokens_1.BlankNodeToken(shortID) : new tokens_1.IRIToken(shortID);
    }
    Class.prototype.toString = function () {
        return "" + this._resource;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryObject.js.map
