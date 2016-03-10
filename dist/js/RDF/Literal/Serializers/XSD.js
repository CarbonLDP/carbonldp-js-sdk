System.register(["./../../../Errors", "./../../../Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Errors, Utils;
    var DateSerializer, dateSerializer, DateTimeSerializer, dateTimeSerializer, TimeSerializer, timeSerializer, IntegerSerializer, integerSerializer, UnsignedIntegerSerializer, unsignedIntegerSerializer, FloatSerializer, floatSerializer, BooleanSerializer, booleanSerializer, StringSerializer, stringSerializer;
    function pad(value) {
        var paddedValue = String(value);
        if (paddedValue.length === 1)
            paddedValue = "0" + paddedValue;
        return paddedValue;
    }
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            DateSerializer = (function () {
                function DateSerializer() {
                }
                DateSerializer.prototype.serialize = function (value) {
                    if (!Utils.isDate(value))
                        throw new Errors.IllegalArgumentError("The value is not a Date object.");
                    return value.getUTCFullYear() + "-" + pad((value.getUTCMonth() + 1)) + "-" + pad(value.getUTCDate());
                };
                return DateSerializer;
            }());
            exports_1("DateSerializer", DateSerializer);
            exports_1("dateSerializer", dateSerializer = new DateSerializer());
            DateTimeSerializer = (function () {
                function DateTimeSerializer() {
                }
                DateTimeSerializer.prototype.serialize = function (value) {
                    if (!Utils.isDate(value))
                        throw new Errors.IllegalArgumentError("The value is not a Date object.");
                    return value.toISOString();
                };
                return DateTimeSerializer;
            }());
            exports_1("DateTimeSerializer", DateTimeSerializer);
            exports_1("dateTimeSerializer", dateTimeSerializer = new DateTimeSerializer());
            TimeSerializer = (function () {
                function TimeSerializer() {
                }
                TimeSerializer.prototype.serialize = function (value) {
                    if (!Utils.isDate(value))
                        throw new Errors.IllegalArgumentError("The value is not a Date object.");
                    return pad(value.getUTCHours())
                        + ":" + pad(value.getUTCMinutes())
                        + ":" + pad(value.getUTCSeconds())
                        + "." + String((value.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
                        + "Z";
                };
                return TimeSerializer;
            }());
            exports_1("TimeSerializer", TimeSerializer);
            exports_1("timeSerializer", timeSerializer = new TimeSerializer());
            IntegerSerializer = (function () {
                function IntegerSerializer() {
                }
                IntegerSerializer.prototype.serialize = function (value) {
                    if (!Utils.isNumber(value))
                        throw new Errors.IllegalArgumentError("The value is not a number.");
                    // Negative truncate
                    return (~~value).toString();
                };
                return IntegerSerializer;
            }());
            exports_1("IntegerSerializer", IntegerSerializer);
            exports_1("integerSerializer", integerSerializer = new IntegerSerializer());
            UnsignedIntegerSerializer = (function (_super) {
                __extends(UnsignedIntegerSerializer, _super);
                function UnsignedIntegerSerializer() {
                    _super.apply(this, arguments);
                }
                UnsignedIntegerSerializer.prototype.serialize = function (value) {
                    var stringValue = _super.prototype.serialize.call(this, value);
                    stringValue = Utils.S.startsWith(stringValue, "-") ? stringValue.substring(1) : stringValue;
                    return stringValue;
                };
                return UnsignedIntegerSerializer;
            }(IntegerSerializer));
            exports_1("UnsignedIntegerSerializer", UnsignedIntegerSerializer);
            exports_1("unsignedIntegerSerializer", unsignedIntegerSerializer = new UnsignedIntegerSerializer());
            FloatSerializer = (function () {
                function FloatSerializer() {
                }
                FloatSerializer.prototype.serialize = function (value) {
                    if (!Utils.isNumber(value))
                        throw new Errors.IllegalArgumentError("The value is not a number.");
                    if (value === Number.POSITIVE_INFINITY)
                        return "INF";
                    if (value === Number.NEGATIVE_INFINITY)
                        return "-INF";
                    return value.toString();
                };
                return FloatSerializer;
            }());
            exports_1("FloatSerializer", FloatSerializer);
            exports_1("floatSerializer", floatSerializer = new FloatSerializer());
            BooleanSerializer = (function () {
                function BooleanSerializer() {
                }
                BooleanSerializer.prototype.serialize = function (value) {
                    return (!!value).toString();
                };
                return BooleanSerializer;
            }());
            exports_1("BooleanSerializer", BooleanSerializer);
            exports_1("booleanSerializer", booleanSerializer = new BooleanSerializer());
            StringSerializer = (function () {
                function StringSerializer() {
                }
                StringSerializer.prototype.serialize = function (value) {
                    return String(value);
                };
                return StringSerializer;
            }());
            exports_1("StringSerializer", StringSerializer);
            exports_1("stringSerializer", stringSerializer = new StringSerializer());
        }
    }
});

//# sourceMappingURL=XSD.js.map
