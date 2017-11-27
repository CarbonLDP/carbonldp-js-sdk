"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var tokens_1 = require("sparqler/tokens");
var Utils_1 = require("../../Utils");
var Errors_1 = require("./../../Errors");
var XSD = require("./../../NS/XSD");
var Class = (function () {
    function Class(context, value) {
        this._value = value;
        this._context = context;
        if (Utils_1.isDate(value)) {
            this._literal = new tokens_1.LiteralToken();
            this.withType(XSD.DataType.dateTime);
        }
        else {
            this._literal = new tokens_1.LiteralToken(value);
        }
    }
    Class.prototype.withType = function (type) {
        if (!iri_1.isAbsolute(type)) {
            if (!XSD.DataType.hasOwnProperty(type))
                throw new Errors_1.IllegalArgumentError("Invalid type provided.");
            type = XSD.DataType[type];
        }
        var value = this._context.serializeLiteral(type, this._value);
        this._literal.setValue(value);
        this._literal.setType(this._context.compactIRI(type));
        return this;
    };
    Class.prototype.withLanguage = function (language) {
        this._literal.setLanguage(language);
        return this;
    };
    Class.prototype.getToken = function () {
        return this._literal;
    };
    Class.prototype.toString = function () {
        return "" + this._literal;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=QueryValue.js.map
