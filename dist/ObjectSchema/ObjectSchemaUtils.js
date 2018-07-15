"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var ObjectSchemaUtils = (function () {
    function ObjectSchemaUtils() {
    }
    ObjectSchemaUtils.resolveProperty = function (schema, definition, inSame) {
        var uri = definition.uri;
        var type = definition.literalType;
        var resolvedURI = schema.resolveURI(uri, { vocab: true });
        var resolvedType = schema.resolveURI(type, { vocab: true, base: true });
        if (resolvedURI !== uri || resolvedType !== type) {
            definition = inSame ? definition : Utils_1.ObjectUtils.clone(definition);
            definition.uri = resolvedURI;
            definition.literalType = resolvedType;
        }
        return definition;
    };
    return ObjectSchemaUtils;
}());
exports.ObjectSchemaUtils = ObjectSchemaUtils;

//# sourceMappingURL=ObjectSchemaUtils.js.map
