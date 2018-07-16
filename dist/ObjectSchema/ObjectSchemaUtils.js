"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectSchemaUtils = (function () {
    function ObjectSchemaUtils() {
    }
    ObjectSchemaUtils._resolveProperty = function (schema, definition, inSame) {
        var uri = definition.uri;
        var type = definition.literalType;
        var resolvedURI = schema.resolveURI(uri, { vocab: true });
        var resolvedType = schema.resolveURI(type, { vocab: true, base: true });
        if (resolvedURI !== uri || resolvedType !== type) {
            definition = inSame ? definition : __assign({}, definition);
            definition.uri = resolvedURI;
            definition.literalType = resolvedType;
        }
        return definition;
    };
    return ObjectSchemaUtils;
}());
exports.ObjectSchemaUtils = ObjectSchemaUtils;

//# sourceMappingURL=ObjectSchemaUtils.js.map
