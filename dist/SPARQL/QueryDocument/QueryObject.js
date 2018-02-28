"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var tokens_1 = require("sparqler/tokens");
var Utils_1 = require("../../Utils");
var QueryObject = (function () {
    function QueryObject(context, object) {
        this._context = context;
        var id = Utils_1.isString(object) ? object : object.id;
        this._resource = iri_1.isBNodeLabel(id) ? new tokens_1.BlankNodeToken(id) : this._context.compactIRI(id);
    }
    QueryObject.prototype.getToken = function () {
        return this._resource;
    };
    QueryObject.prototype.toString = function () {
        return "" + this._resource;
    };
    return QueryObject;
}());
exports.QueryObject = QueryObject;
exports.default = QueryObject;

//# sourceMappingURL=QueryObject.js.map
