"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment = __importStar(require("./Fragment"));
var ObjectSchema = __importStar(require("./ObjectSchema"));
var PersistedResource = __importStar(require("./PersistedResource"));
var RDF = __importStar(require("./RDF"));
function resolveURI(uri) {
    if (RDF.URI.Util.isAbsolute(uri))
        return uri;
    var schema = this.document._documents.getGeneralSchema();
    return ObjectSchema.Util.resolveURI(uri, schema, { vocab: true });
}
function extendAddType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
function extendHasType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        return superFunction.call(this, type);
    };
}
function extendRemoveType(superFunction) {
    return function (type) {
        type = resolveURI.call(this, type);
        superFunction.call(this, type);
    };
}
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return PersistedResource.Factory.hasClassProperties(object)
            && Fragment.Factory.hasClassProperties(object);
    };
    Factory.decorate = function (fragment) {
        PersistedResource.Factory.decorate(fragment);
        Object.defineProperties(fragment, {
            "addType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendAddType(fragment.addType),
            },
            "hasType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendHasType(fragment.hasType),
            },
            "removeType": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: extendRemoveType(fragment.removeType),
            },
        });
        return fragment;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=PersistedFragment.js.map
