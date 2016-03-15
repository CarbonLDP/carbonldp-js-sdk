System.register(["./../Utils", "./../NS/XSD", "./../Errors", "./Literal/Serializers"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils, XSD, Errors, Serializers;
    var Factory, Util;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (XSD_1) {
                XSD = XSD_1;
            },
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Serializers_1) {
                Serializers = Serializers_1;
            }],
        execute: function() {
            Factory = (function () {
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
                            // Treat it as an unknown object
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
                    // The DataType isn't supported
                    if (!Utils.hasProperty(XSD.DataType, literalDataType))
                        return literalValue;
                    var value;
                    var parts;
                    switch (literalDataType) {
                        // Dates
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
                            // TODO: Support duration values (create a class or something...)
                            break;
                        case XSD.DataType.gDay:
                        case XSD.DataType.gMonth:
                        case XSD.DataType.gMonthDay:
                        case XSD.DataType.gYear:
                        case XSD.DataType.gYearMonth:
                            // TODO: Decide. Should we return it as a Date?
                            break;
                        // Numbers
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
                        // Misc
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
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.areEqual = function (literal1, literal2) {
                    // TODO: Implement
                    return false;
                };
                return Util;
            }());
            exports_1("Util", Util);
            exports_1("Serializers", Serializers);
        }
    }
});

//# sourceMappingURL=Literal.js.map
