"use strict";
exports.namespace = "http://www.w3.org/2001/vcard-rdf/3.0#";
var Predicate = (function () {
    function Predicate() {
    }
    Object.defineProperty(Predicate, "email", {
        get: function () { return exports.namespace + "email"; },
        enumerable: true,
        configurable: true
    });
    return Predicate;
}());
exports.Predicate = Predicate;
