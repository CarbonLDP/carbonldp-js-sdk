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
            && object.hasType(exports.RDF_CLASS);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=VolatileResource.js.map
