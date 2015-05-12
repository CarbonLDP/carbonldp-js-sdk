define(["require", "exports", '../Utils', '../namespaces/XSD'], function (require, exports, Utils, XSD) {
    var Factory = (function () {
        function Factory() {
        }
        Factory.from = function (value) {
            if (Utils.isNull(value))
                throw new Error("IllegalArgument: null cannot be converted into a Literal");
            var type;
            switch (true) {
                case Utils.isDate(value):
                    type = XSD.DataType.dateTime;
                    value = value.toISOString();
                    break;
                case Utils.isNumber(value):
                    if (Utils.isInteger(value))
                        type = XSD.DataType.integer;
                    else
                        type = XSD.DataType.double;
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
            var literal = { '@value': value };
            if (type)
                literal['@type'] = type;
            return literal;
        };
        Factory.parse = function (literal) {
            if (!literal)
                return null;
            if (!Utils.hasProperty(literal, '@value'))
                return null;
            if (!Utils.hasProperty(literal, '@type'))
                return literal['@value'];
            var type = literal['@type'];
            // The DataType isn't supported
            if (!Utils.hasProperty(XSD.DataType, type))
                return literal['@value'];
            var valueString = literal['@value'];
            var value;
            switch (type) {
                // Dates
                case XSD.DataType.date:
                case XSD.DataType.dateTime:
                case XSD.DataType.time:
                    value = new Date(valueString);
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
                    value = parseFloat(valueString);
                    break;
                // Misc
                case XSD.DataType.boolean:
                    value = Utils.parseBoolean(valueString);
                    break;
                case XSD.DataType.string:
                    value = valueString;
                    break;
                case XSD.DataType.object:
                    value = JSON.parse(valueString);
                    break;
                default:
                    break;
            }
            return value;
        };
        Factory.is = function (value) {
            if (!value)
                return false;
            if (!Utils.isObject(value))
                return false;
            return Utils.hasProperty(value, '@value');
        };
        return Factory;
    })();
    exports.Factory = Factory;
    var Util = (function () {
        function Util() {
        }
        Util.areEqual = function (literal1, literal2) {
            // TODO: Implement
            return false;
        };
        return Util;
    })();
    exports.Util = Util;
});
//# sourceMappingURL=Literal.js.map