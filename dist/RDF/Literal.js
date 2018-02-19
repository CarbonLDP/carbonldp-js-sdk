"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = __importStar(require("./../Utils"));
var XSD = __importStar(require("../Vocabularies/XSD"));
var Errors = __importStar(require("./../Errors"));
var Serializers = __importStar(require("./Literal/Serializers"));
exports.Serializers = Serializers;
var Factory = (function () {
    function Factory() {
    }
    Factory.from = function (value) {
        if (Utils.isNull(value))
            throw new Errors.IllegalArgumentError("Null cannot be converted into a Literal");
        if (!Utils.isDefined(value))
            throw new Errors.IllegalArgumentError("The value is undefined");
        var type;
        switch (true) {
            case Utils.isDate(value):
                type = XSD.DataType.dateTime;
                value = value.toISOString();
                break;
            case Utils.isNumber(value):
                if (Utils.isInteger(value)) {
                    type = XSD.DataType.integer;
                }
                else {
                    type = XSD.DataType.double;
                }
                break;
            case Utils.isString(value):
                type = XSD.DataType.string;
                break;
            case Utils.isBoolean(value):
                type = XSD.DataType.boolean;
                break;
            default:
                type = XSD.DataType.object;
                value = JSON.stringify(value);
                break;
        }
        var literal = { "@value": value.toString() };
        if (type)
            literal["@type"] = type;
        return literal;
    };
    Factory.parse = function (literalValueOrLiteral, literalDataType) {
        if (literalDataType === void 0) { literalDataType = null; }
        var literalValue;
        if (Utils.isString(literalValueOrLiteral)) {
            literalValue = literalValueOrLiteral;
        }
        else {
            var literal = literalValueOrLiteral;
            if (!literal)
                return null;
            if (!Utils.hasProperty(literal, "@value"))
                return null;
            literalDataType = "@type" in literal ? literal["@type"] : null;
            literalValue = literal["@value"];
        }
        if (literalDataType === null)
            return literalValue;
        if (!Utils.hasProperty(XSD.DataType, literalDataType))
            return literalValue;
        var value;
        var parts;
        switch (literalDataType) {
            case XSD.DataType.date:
            case XSD.DataType.dateTime:
                value = new Date(literalValue);
                break;
            case XSD.DataType.time:
                parts = literalValue.match(/(\d+):(\d+):(\d+)\.(\d+)Z/);
                value = new Date();
                value.setUTCHours(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]), parseFloat(parts[4]));
                break;
            case XSD.DataType.duration:
                break;
            case XSD.DataType.gDay:
            case XSD.DataType.gMonth:
            case XSD.DataType.gMonthDay:
            case XSD.DataType.gYear:
            case XSD.DataType.gYearMonth:
                break;
            case XSD.DataType.byte:
            case XSD.DataType.decimal:
            case XSD.DataType.int:
            case XSD.DataType.integer:
            case XSD.DataType.long:
            case XSD.DataType.negativeInteger:
            case XSD.DataType.nonNegativeInteger:
            case XSD.DataType.nonPositiveInteger:
            case XSD.DataType.positiveInteger:
            case XSD.DataType.short:
            case XSD.DataType.unsignedLong:
            case XSD.DataType.unsignedInt:
            case XSD.DataType.unsignedShort:
            case XSD.DataType.unsignedByte:
            case XSD.DataType.double:
            case XSD.DataType.float:
                value = parseFloat(literalValue);
                break;
            case XSD.DataType.boolean:
                value = Utils.parseBoolean(literalValue);
                break;
            case XSD.DataType.string:
                value = literalValue;
                break;
            case XSD.DataType.object:
                value = JSON.parse(literalValue);
                break;
            default:
                break;
        }
        return value;
    };
    Factory.is = function (value) {
        return Utils.hasProperty(value, "@value")
            && Utils.isString(value["@value"]);
    };
    Factory.hasType = function (value, type) {
        if (!value["@type"] && type === XSD.DataType.string)
            return true;
        return value["@type"] === type;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Literal.js.map
