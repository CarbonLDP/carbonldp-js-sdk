"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NS = require("./../NS");
var Resource = require("./../Resource");
exports.RDF_CLASS = NS.C.Class.VolatileResource;
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return Resource.Factory.is(object)
            && Factory.hasRDFClass(object);
    };
    Factory.hasRDFClass = function (object) {
        if (!object)
            return false;
        var types = ("@type" in object) ? object["@type"] : ("types" in object) ? object.types : [];
        return types.indexOf(exports.RDF_CLASS) !== -1;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=VolatileResource.js.map
