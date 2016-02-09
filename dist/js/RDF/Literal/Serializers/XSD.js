"use strict";

System.register(["./../../../Errors", "./../../../Utils"], function (_export, _context) {
    var Errors, Utils, _get, _createClass, DateSerializer, dateSerializer, DateTimeSerializer, dateTimeSerializer, TimeSerializer, timeSerializer, IntegerSerializer, integerSerializer, UnsignedIntegerSerializer, unsignedIntegerSerializer, FloatSerializer, floatSerializer, BooleanSerializer, booleanSerializer, StringSerializer, stringSerializer;

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function pad(value) {
        var paddedValue = String(value);
        if (paddedValue.length === 1) paddedValue = "0" + paddedValue;
        return paddedValue;
    }

    return {
        setters: [function (_Errors) {
            Errors = _Errors;
        }, function (_Utils) {
            Utils = _Utils;
        }],
        execute: function () {
            _get = function get(object, property, receiver) {
                if (object === null) object = Function.prototype;
                var desc = Object.getOwnPropertyDescriptor(object, property);

                if (desc === undefined) {
                    var parent = Object.getPrototypeOf(object);

                    if (parent === null) {
                        return undefined;
                    } else {
                        return get(parent, property, receiver);
                    }
                } else if ("value" in desc) {
                    return desc.value;
                } else {
                    var getter = desc.get;

                    if (getter === undefined) {
                        return undefined;
                    }

                    return getter.call(receiver);
                }
            };

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

            _export("DateSerializer", DateSerializer = function () {
                function DateSerializer() {
                    _classCallCheck(this, DateSerializer);
                }

                _createClass(DateSerializer, [{
                    key: "serialize",
                    value: function serialize(value) {
                        if (!Utils.isDate(value)) throw new Errors.IllegalArgumentError("The value is not a Date object.");
                        return value.getUTCFullYear() + "-" + pad(value.getUTCMonth() + 1) + "-" + pad(value.getUTCDate());
                    }
                }]);

                return DateSerializer;
            }());

            _export("DateSerializer", DateSerializer);

            _export("dateSerializer", dateSerializer = new DateSerializer());

            _export("dateSerializer", dateSerializer);

            _export("DateTimeSerializer", DateTimeSerializer = function () {
                function DateTimeSerializer() {
                    _classCallCheck(this, DateTimeSerializer);
                }

                _createClass(DateTimeSerializer, [{
                    key: "serialize",
                    value: function serialize(value) {
                        if (!Utils.isDate(value)) throw new Errors.IllegalArgumentError("The value is not a Date object.");
                        return value.toISOString();
                    }
                }]);

                return DateTimeSerializer;
            }());

            _export("DateTimeSerializer", DateTimeSerializer);

            _export("dateTimeSerializer", dateTimeSerializer = new DateTimeSerializer());

            _export("dateTimeSerializer", dateTimeSerializer);

            _export("TimeSerializer", TimeSerializer = function () {
                function TimeSerializer() {
                    _classCallCheck(this, TimeSerializer);
                }

                _createClass(TimeSerializer, [{
                    key: "serialize",
                    value: function serialize(value) {
                        if (!Utils.isDate(value)) throw new Errors.IllegalArgumentError("The value is not a Date object.");
                        return pad(value.getUTCHours()) + ":" + pad(value.getUTCMinutes()) + ":" + pad(value.getUTCSeconds()) + "." + String((value.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + "Z";
                    }
                }]);

                return TimeSerializer;
            }());

            _export("TimeSerializer", TimeSerializer);

            _export("timeSerializer", timeSerializer = new TimeSerializer());

            _export("timeSerializer", timeSerializer);

            _export("IntegerSerializer", IntegerSerializer = function () {
                function IntegerSerializer() {
                    _classCallCheck(this, IntegerSerializer);
                }

                _createClass(IntegerSerializer, [{
                    key: "serialize",
                    value: function serialize(value) {
                        if (!Utils.isNumber(value)) throw new Errors.IllegalArgumentError("The value is not a number.");
                        return ~ ~value + "";
                    }
                }]);

                return IntegerSerializer;
            }());

            _export("IntegerSerializer", IntegerSerializer);

            _export("integerSerializer", integerSerializer = new IntegerSerializer());

            _export("integerSerializer", integerSerializer);

            _export("UnsignedIntegerSerializer", UnsignedIntegerSerializer = function (_IntegerSerializer) {
                _inherits(UnsignedIntegerSerializer, _IntegerSerializer);

                function UnsignedIntegerSerializer() {
                    _classCallCheck(this, UnsignedIntegerSerializer);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnsignedIntegerSerializer).apply(this, arguments));
                }

                _createClass(UnsignedIntegerSerializer, [{
                    key: "serialize",
                    value: function serialize(value) {
                        var stringValue = _get(Object.getPrototypeOf(UnsignedIntegerSerializer.prototype), "serialize", this).call(this, value);

                        stringValue = Utils.S.startsWith(stringValue, "-") ? stringValue.substring(1) : stringValue;
                        return stringValue;
                    }
                }]);

                return UnsignedIntegerSerializer;
            }(IntegerSerializer));

            _export("UnsignedIntegerSerializer", UnsignedIntegerSerializer);

            _export("unsignedIntegerSerializer", unsignedIntegerSerializer = new UnsignedIntegerSerializer());

            _export("unsignedIntegerSerializer", unsignedIntegerSerializer);

            _export("FloatSerializer", FloatSerializer = function () {
                function FloatSerializer() {
                    _classCallCheck(this, FloatSerializer);
                }

                _createClass(FloatSerializer, [{
                    key: "serialize",
                    value: function serialize(value) {
                        if (!Utils.isNumber(value)) throw new Errors.IllegalArgumentError("The value is not a number.");
                        return value + "";
                    }
                }]);

                return FloatSerializer;
            }());

            _export("FloatSerializer", FloatSerializer);

            _export("floatSerializer", floatSerializer = new FloatSerializer());

            _export("floatSerializer", floatSerializer);

            _export("BooleanSerializer", BooleanSerializer = function () {
                function BooleanSerializer() {
                    _classCallCheck(this, BooleanSerializer);
                }

                _createClass(BooleanSerializer, [{
                    key: "serialize",
                    value: function serialize(value) {
                        if (!!value) {
                            return "true";
                        } else {
                            return "false";
                        }
                    }
                }]);

                return BooleanSerializer;
            }());

            _export("BooleanSerializer", BooleanSerializer);

            _export("booleanSerializer", booleanSerializer = new BooleanSerializer());

            _export("booleanSerializer", booleanSerializer);

            _export("StringSerializer", StringSerializer = function () {
                function StringSerializer() {
                    _classCallCheck(this, StringSerializer);
                }

                _createClass(StringSerializer, [{
                    key: "serialize",
                    value: function serialize(value) {
                        return value + "";
                    }
                }]);

                return StringSerializer;
            }());

            _export("StringSerializer", StringSerializer);

            _export("stringSerializer", stringSerializer = new StringSerializer());

            _export("stringSerializer", stringSerializer);
        }
    };
});
//# sourceMappingURL=XSD.js.map
