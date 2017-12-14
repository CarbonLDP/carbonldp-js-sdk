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
    Factory.createFrom = function (object) {
        var resource = Resource.Factory.createFrom(object);
        resource.addType(exports.RDF_CLASS);
        return resource;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=VolatileResource.js.map
