"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("./Document");
var Utils_1 = require("./Utils");
exports.ServiceAwareDocument = {
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && object.hasOwnProperty("_documents");
    },
    decorate: function (object, documents) {
        if (exports.ServiceAwareDocument.isDecorated(object))
            return object;
        Document_1.Document.decorate(object);
        return Object.defineProperties(object, {
            "_documents": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: documents,
            },
        });
    },
};

//# sourceMappingURL=ServiceAwareDocument.js.map
