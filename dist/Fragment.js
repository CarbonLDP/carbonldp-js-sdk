"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("./Resource");
var Utils = __importStar(require("./Utils"));
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "document"));
    };
    Factory.create = function (idOrDocument, document) {
        return this.createFrom({}, idOrDocument, document);
    };
    Factory.createFrom = function (object, idOrDocument, document) {
        if (document === void 0) { document = null; }
        var id = !!idOrDocument && Utils.isString(idOrDocument) ? idOrDocument : "";
        document = document || idOrDocument;
        var resource = Resource_1.Resource.createFrom(object, id);
        if (Factory.hasClassProperties(resource))
            return resource;
        Object.defineProperties(resource, {
            "document": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: document,
            },
        });
        return resource;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Fragment.js.map
