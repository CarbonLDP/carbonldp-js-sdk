"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectContainer_1 = require("./LDP/DirectContainer");
var C_1 = require("./Vocabularies/C");
exports.AccessPoint = {
    TYPE: C_1.C.AccessPoint,
    is: function (object) {
        return DirectContainer_1.DirectContainer.is(object);
    },
    create: function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return exports.AccessPoint.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    },
    createFrom: function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        return DirectContainer_1.DirectContainer.createFrom(object, membershipResource, hasMemberRelation, isMemberOfRelation);
    },
};
exports.default = exports.AccessPoint;

//# sourceMappingURL=AccessPoint.js.map
