"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var Resource = __importStar(require("../Resource"));
var Utils_1 = require("../Utils");
var prototype_1 = require("./prototype");
exports.isDecoratedDocument = function (object) {
    return Utils_1.isObject(object) &&
        Utils_1.hasPropertyDefined(object, "_fragmentsIndex") &&
        Utils_1.hasFunction(object, "_normalize") &&
        Utils_1.hasFunction(object, "_removeFragment") &&
        Utils_1.hasFunction(object, "hasPointer") &&
        Utils_1.hasFunction(object, "getPointer") &&
        Utils_1.hasFunction(object, "inScope") &&
        Utils_1.hasFunction(object, "hasFragment") &&
        Utils_1.hasFunction(object, "getFragment") &&
        Utils_1.hasFunction(object, "getNamedFragment") &&
        Utils_1.hasFunction(object, "getFragments") &&
        Utils_1.hasFunction(object, "createFragment") &&
        Utils_1.hasFunction(object, "createNamedFragment") &&
        Utils_1.hasFunction(object, "removeNamedFragment") &&
        Utils_1.hasFunction(object, "toJSON");
};
exports.isDocument = function (object) {
    return Resource.Factory.is(object) &&
        exports.isDecoratedDocument(object);
};
exports.createDocument = function () {
    return exports.createDocumentFrom({});
};
exports.createDocumentFrom = function (object) {
    if (exports.isDocument(object))
        throw new Errors_1.IllegalArgumentError("The object provided is already a Document.");
    var document = exports.decorateDocument(object);
    prototype_1.convertNestedObjects(document, document);
    return document;
};
exports.decorateDocument = function (object) {
    if (exports.isDecoratedDocument(object))
        return object;
    Resource.Factory.decorate(object);
    Object.defineProperties(object, {
        "_fragmentsIndex": {
            configurable: true,
            value: new Map(),
        },
        "_normalize": {
            configurable: true,
            value: prototype_1.normalize,
        },
        "_removeFragment": {
            configurable: true,
            value: prototype_1.removeFragment,
        },
        "hasPointer": {
            configurable: true,
            value: prototype_1.hasPointer,
        },
        "getPointer": {
            configurable: true,
            value: prototype_1.getPointer,
        },
        "inScope": {
            configurable: true,
            value: prototype_1.inScope,
        },
        "hasFragment": {
            configurable: true,
            value: prototype_1.hasFragment,
        },
        "getFragment": {
            configurable: true,
            value: prototype_1.getFragment,
        },
        "getNamedFragment": {
            configurable: true,
            value: prototype_1.getNamedFragment,
        },
        "getFragments": {
            configurable: true,
            value: prototype_1.getFragments,
        },
        "createFragment": {
            configurable: true,
            value: prototype_1.createFragment,
        },
        "createNamedFragment": {
            configurable: true,
            value: prototype_1.createNamedFragment,
        },
        "removeNamedFragment": {
            configurable: true,
            value: prototype_1.removeNamedFragment,
        },
        "toJSON": {
            configurable: true,
            value: prototype_1.toJSON,
        },
    });
    return object;
};

//# sourceMappingURL=factory.js.map
