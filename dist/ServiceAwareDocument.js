"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils_1.isObject(object)
            && object.hasOwnProperty("_documents");
    };
    Factory.decorate = function (document, documents) {
        if (Factory.hasClassProperties(document))
            return document;
        return Object.defineProperties(document, {
            "_documents": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: documents,
            },
        });
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=ServiceAwareDocument.js.map
