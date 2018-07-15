"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var tokens_1 = require("sparqler/tokens");
var Errors_1 = require("../Errors");
var Utils_1 = require("../Utils");
var Vocabularies_1 = require("../Vocabularies");
var QueryValue = (function () {
    function QueryValue(context, value) {
        this._value = value;
        this._context = context;
        if (Utils_1.isDate(value)) {
            this._literal = new tokens_1.LiteralToken();
            this.withType(Vocabularies_1.XSD.dateTime);
        }
        else {
            this._literal = new tokens_1.LiteralToken(value);
        }
    }
    QueryValue.prototype.withType = function (type) {
        if (!iri_1.isAbsolute(type)) {
            if (!Vocabularies_1.XSD.hasOwnProperty(type))
                throw new Errors_1.IllegalArgumentError("Invalid type provided.");
            type = Vocabularies_1.XSD[type];
        }
        var value = this._context.serializeLiteral(type, this._value);
        this._literal.setValue(value);
        this._literal.setType(this._context.compactIRI(type));
        return this;
    };
    QueryValue.prototype.withLanguage = function (language) {
        this._literal.setLanguage(language);
        return this;
    };
    QueryValue.prototype.getToken = function () {
        return this._literal;
    };
    QueryValue.prototype.toString = function () {
        return "" + this._literal;
    };
    return QueryValue;
}());
exports.QueryValue = QueryValue;

//# sourceMappingURL=QueryValue.js.map
