"use strict";
var Utils = require("./../Utils");
var Document = require("./Document");
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
    Util.hasType = function (node, type) {
        return Util.getTypes(node).indexOf(type) !== -1;
    };
    Util.getTypes = function (node) {
        if (!("@type" in node))
            return [];
        return node["@type"];
    };
    Util.getPropertyURI = function (node, predicate) {
        if (!(predicate in node))
            return null;
        if (!Utils.isArray(node[predicate]))
            return null;
        var uri = node[predicate].find(function (value) { return Factory.is(value); });
        return typeof uri !== "undefined" ? uri["@id"] : null;
    };
    Util.getFreeNodes = function (value) {
        if (!Utils.isArray(value))
            return [];
        var array = value;
        return array
            .filter(function (element) { return !Document.Factory.is(element); })
            .filter(function (element) { return Factory.is(element); });
    };
    return Util;
}());
exports.Util = Util;

//# sourceMappingURL=RDFNode.js.map
