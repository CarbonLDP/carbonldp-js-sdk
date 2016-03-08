System.register(["./../Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    var namespace, DataType;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("namespace", namespace = "http://www.w3.org/2001/XMLSchema#");
            DataType = (function () {
                function DataType() {
                }
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
                return DataType;
            }());
            exports_1("DataType", DataType);
            Utils.forEachOwnProperty(DataType, function (key, value) {
                DataType[value] = key;
            });
        }
    }
});

//# sourceMappingURL=XSD.js.map
