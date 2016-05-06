"use strict";
var NS = require("./../NS");
exports.RDF_CLASS = NS.LDP.Class.BasicContainer;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasRDFClass = function (pointerOrExpandedObject) {
        var types = [];
        if ("@type" in pointerOrExpandedObject) {
            types = pointerOrExpandedObject["@type"];
        }
        else if ("types" in pointerOrExpandedObject) {
            types = pointerOrExpandedObject.types;
        }
        return types.indexOf(NS.LDP.Class.BasicContainer) !== -1;
    };
    return Factory;
}());
exports.Factory = Factory;
