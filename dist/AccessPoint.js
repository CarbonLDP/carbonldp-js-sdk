"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var LDP = __importStar(require("./LDP"));
var NS = __importStar(require("./Vocabularies/index"));
exports.RDF_CLASS = NS.C.AccessPoint;
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return LDP.DirectContainer.Factory.is(object);
    };
    Factory.create = function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return Factory.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    };
    Factory.createFrom = function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        return LDP.DirectContainer.Factory.createFrom(object, membershipResource, hasMemberRelation, isMemberOfRelation);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=AccessPoint.js.map
