"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (document) {
        return document.hasOwnProperty("_documents");
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

//# sourceMappingURL=DocumentedDocument.js.map
