"use strict";
var IllegalArgumentError_1 = require("./Errors/IllegalArgumentError");
var ObjectSchema = require("./ObjectSchema");
var XSD = require("./NS/XSD");
var URI = require("./RDF/URI");
var Utils = require("./Utils");
var allowedTypes = ["numeric", "string", "boolean", "dateTime"];
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Utils.hasPropertyDefined(object, "orderBy")
            || Utils.hasPropertyDefined(object, "limit")
            || Utils.hasPropertyDefined(object, "offset");
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.stringifyRetrievalPreferences = function (retrievalPreferences, digestedSchema) {
        var stringPreferences = "";
        if ("limit" in retrievalPreferences) {
            stringPreferences += "limit=" + retrievalPreferences.limit;
        }
        if ("offset" in retrievalPreferences) {
            stringPreferences += (stringPreferences ? "&" : "") + "offset=" + retrievalPreferences.offset;
        }
        if ("orderBy" in retrievalPreferences && retrievalPreferences.orderBy.length > 0) {
            stringPreferences += (stringPreferences ? "&" : "") + "orderBy=";
            var stringOrders = [];
            for (var _i = 0, _a = retrievalPreferences.orderBy; _i < _a.length; _i++) {
                var orderBy = _a[_i];
                var stringOrder = "";
                if ("@id" in orderBy) {
                    var id = orderBy["@id"];
                    var descending = false;
                    if (id.startsWith("-")) {
                        descending = true;
                        id = id.substr(1);
                    }
                    if (!!digestedSchema && URI.Util.isRelative(id))
                        id = ObjectSchema.Util.resolveURI(id, digestedSchema);
                    stringOrder += (descending ? "-" : "") + "<" + encodeURI(id).replace("#", "%23") + ">";
                }
                if ("@type" in orderBy) {
                    if (!stringOrder)
                        throw new IllegalArgumentError_1.default("The @id property is missing in OrderBy property.");
                    var type = orderBy["@type"];
                    if (allowedTypes.indexOf(type) === -1)
                        throw new IllegalArgumentError_1.default("The @type value specified is not valid.");
                    if (type !== "numeric")
                        type = "<" + encodeURI(XSD.DataType[type]).replace("#", "%23") + ">";
                    stringOrder += ";" + type;
                }
                if ("@language" in orderBy) {
                    if (!stringOrder)
                        throw new IllegalArgumentError_1.default("The @id property is missing in OrderBy property.");
                    stringOrder += ";" + orderBy["@language"];
                }
                stringOrders.push(stringOrder);
            }
            stringPreferences += stringOrders.join(",");
        }
        return stringPreferences ? "?" + stringPreferences : stringPreferences;
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=RetrievalPreferences.js.map
