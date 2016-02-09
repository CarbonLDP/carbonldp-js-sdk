"use strict";

System.register(["./../Utils"], function (_export, _context) {
    var Utils, namespace, DataType;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Utils) {
            Utils = _Utils;
        }],
        execute: function () {
            _export("namespace", namespace = "http://www.w3.org/2001/XMLSchema#");

            _export("namespace", namespace);

            _export("DataType", DataType = function DataType() {
                _classCallCheck(this, DataType);
            });

            _export("DataType", DataType);

            DataType.date = namespace + "date";
            DataType.dateTime = namespace + "dateTime";
            DataType.duration = namespace + "duration";
            DataType.gDay = namespace + "gDay";
            DataType.gMonth = namespace + "gMonth";
            DataType.gMonthDay = namespace + "gMonthDay";
            DataType.gYear = namespace + "gYear";
            DataType.gYearMonth = namespace + "gYearMonth";
            DataType.time = namespace + "time";
            DataType.byte = namespace + "byte";
            DataType.decimal = namespace + "decimal";
            DataType.int = namespace + "int";
            DataType.integer = namespace + "integer";
            DataType.long = namespace + "long";
            DataType.negativeInteger = namespace + "negativeInteger";
            DataType.nonNegativeInteger = namespace + "nonNegativeInteger";
            DataType.nonPositiveInteger = namespace + "nonPositiveInteger";
            DataType.positiveInteger = namespace + "positiveInteger";
            DataType.short = namespace + "short";
            DataType.unsignedLong = namespace + "unsignedLong";
            DataType.unsignedInt = namespace + "unsignedInt";
            DataType.unsignedShort = namespace + "unsignedShort";
            DataType.unsignedByte = namespace + "unsignedByte";
            DataType.double = namespace + "double";
            DataType.float = namespace + "float";
            DataType.boolean = namespace + "boolean";
            DataType.string = namespace + "string";
            DataType.object = namespace + "object";
            Utils.forEachOwnProperty(DataType, function (key, value) {
                DataType[value] = key;
            });
        }
    };
});
//# sourceMappingURL=XSD.js.map
