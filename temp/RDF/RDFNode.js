"use strict";
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return Utils.hasProperty(value, "@id")
            && Utils.isString(value["@id"]);
    };
    Factory.create = function (uri) {
        return {
            "@id": uri,
        };
    };
    return Factory;
}());
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.areEqual = function (node1, node2) {
        return node1["@id"] === node2["@id"];
    };
    Util.getPropertyURI = function (node, predicate) {
        if (!(predicate in node))
            return null;
        if (!Utils.isArray(node[predicate]))
            return null;
        var uri = node[predicate].find(function (value) { return Factory.is(value); });
        return typeof uri !== "undefined" ? uri["@id"] : null;
    };
    return Util;
}());
exports.Util = Util;
