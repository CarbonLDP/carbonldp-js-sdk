"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.namespace = "http://www.w3.org/ns/shacl#";
var Class = (function () {
    function Class() {
    }
    Object.defineProperty(Class, "ValidationReport", {
        get: function () { return exports.namespace + "ValidationReport"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}());
exports.Class = Class;
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "conforms", {
        get: function () { return exports.namespace + "conforms"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "result", {
        get: function () { return exports.namespace + "result"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Predicate, "shapesGraphWellFormed", {
        get: function () { return exports.namespace + "shapesGraphWellFormed"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;

//# sourceMappingURL=SHACL.js.map
