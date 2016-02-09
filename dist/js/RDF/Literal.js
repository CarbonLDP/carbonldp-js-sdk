"use strict";

System.register(["./../Utils", "./../NS/XSD", "./Literal/Serializers"], function (_export, _context) {
    var Utils, XSD, Serializers, _createClass, Factory, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Utils) {
            Utils = _Utils;
        }, function (_NSXSD) {
            XSD = _NSXSD;
        }, function (_LiteralSerializers) {
            Serializers = _LiteralSerializers;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, null, [{
                    key: "from",
                    value: function from(value) {
                        if (Utils.isNull(value)) throw new Error("IllegalArgument: null cannot be converted into a Literal");
                        var type = undefined;

                        switch (true) {
                            case Utils.isDate(value):
                                type = XSD.DataType.dateTime;
                                value = value.toISOString();
                                break;

                            case Utils.isNumber(value):
                                if (Utils.isInteger(value)) {
                                    type = XSD.DataType.integer;
                                } else type = XSD.DataType.double;

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

                        var literal = {
                            "@value": value
                        };
                        if (type) literal["@type"] = type;
                        return literal;
                    }
                }, {
                    key: "parse",
                    value: function parse(literal) {
                        if (!literal) return null;
                        if (!Utils.hasProperty(literal, "@value")) return null;
                        if (!Utils.hasProperty(literal, "@type")) return literal["@value"];
                        var type = literal["@type"];
                        if (!Utils.hasProperty(XSD.DataType, type)) return literal["@value"];
                        var valueString = literal["@value"];
                        var value = undefined;

                        switch (type) {
                            case XSD.DataType.date:
                            case XSD.DataType.dateTime:
                            case XSD.DataType.time:
                                value = new Date(valueString);
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
                                value = parseFloat(valueString);
                                break;

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
                    }
                }, {
                    key: "is",
                    value: function is(value) {
                        if (!value) return false;
                        if (!Utils.isObject(value)) return false;
                        return Utils.hasProperty(value, "@value");
                    }
                }, {
                    key: "hasType",
                    value: function hasType(value, type) {
                        if (!value["@type"] && type === XSD.DataType.string) return true;
                        return value["@type"] === type;
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "areEqual",
                    value: function areEqual(literal1, literal2) {
                        return false;
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);

            _export("Serializers", Serializers);
        }
    };
});
//# sourceMappingURL=Literal.js.map
