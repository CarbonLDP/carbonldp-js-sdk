"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URI_1 = require("../RDF/URI");
var DigestedObjectSchema = (function () {
    function DigestedObjectSchema() {
        this.base = "";
        this.vocab = void 0;
        this.language = null;
        this.prefixes = new Map();
        this.properties = new Map();
    }
    DigestedObjectSchema.prototype.resolveURI = function (uri, relativeTo) {
        if (relativeTo === void 0) { relativeTo = {}; }
        if (uri === null || URI_1.URI.isAbsolute(uri) || URI_1.URI.isBNodeID(uri))
            return uri;
        var _a = uri.split(":"), prefix = _a[0], _b = _a[1], localName = _b === void 0 ? "" : _b;
        var definedReference = this.prefixes.has(prefix) ?
            this.prefixes.get(prefix) : this.properties.has(prefix) ?
            this.properties.get(prefix).uri
            : null;
        if (definedReference !== null && definedReference !== prefix) {
            return this.resolveURI(definedReference + localName, { vocab: true });
        }
        if (localName)
            return uri;
        if (relativeTo.vocab && this.vocab)
            return this.vocab + uri;
        if (relativeTo.base)
            return URI_1.URI.resolve(this.base, uri);
        return uri;
    };
    return DigestedObjectSchema;
}());
exports.DigestedObjectSchema = DigestedObjectSchema;

//# sourceMappingURL=DigestedObjectSchema.js.map
