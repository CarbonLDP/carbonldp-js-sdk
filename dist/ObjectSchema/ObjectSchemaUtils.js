"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var RDF_1 = require("../RDF");
var Utils = __importStar(require("../Utils"));
var ObjectSchemaUtils = (function () {
    function ObjectSchemaUtils() {
    }
    ObjectSchemaUtils.resolveURI = function (uri, schema, relativeTo) {
        if (relativeTo === void 0) { relativeTo = {}; }
        if (uri === null || RDF_1.URI.isAbsolute(uri) || RDF_1.URI.isBNodeID(uri))
            return uri;
        var _a = uri.split(":"), prefix = _a[0], _b = _a[1], localName = _b === void 0 ? "" : _b;
        var definedReference = schema.prefixes.has(prefix) ?
            schema.prefixes.get(prefix) : schema.properties.has(prefix) ?
            schema.properties.get(prefix).uri
            : null;
        if (definedReference !== null && definedReference !== prefix) {
            return ObjectSchemaUtils.resolveURI(definedReference + localName, schema, { vocab: true });
        }
        if (localName)
            return uri;
        if (relativeTo.vocab && schema.vocab)
            return schema.vocab + uri;
        if (relativeTo.base)
            return RDF_1.URI.resolve(schema.base, uri);
        return uri;
    };
    ObjectSchemaUtils.resolveProperty = function (schema, definition, inSame) {
        var uri = definition.uri;
        var type = definition.literalType;
        var resolvedURI = ObjectSchemaUtils.resolveURI(uri, schema, { vocab: true });
        var resolvedType = ObjectSchemaUtils.resolveURI(type, schema, { vocab: true, base: true });
        if (resolvedURI !== uri || resolvedType !== type) {
            definition = inSame ? definition : Utils.ObjectUtils.clone(definition);
            definition.uri = resolvedURI;
            definition.literalType = resolvedType;
        }
        return definition;
    };
    return ObjectSchemaUtils;
}());
exports.ObjectSchemaUtils = ObjectSchemaUtils;

//# sourceMappingURL=ObjectSchemaUtils.js.map
