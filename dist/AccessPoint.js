"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientDirectContainer_1 = require("./LDP/TransientDirectContainer");
var C_1 = require("./Vocabularies/C");
exports.AccessPoint = {
    TYPE: C_1.C.AccessPoint,
    is: function (object) {
        return TransientDirectContainer_1.TransientDirectContainer.is(object);
    },
    create: function (membershipResource, hasMemberRelation, isMemberOfRelation) {
        return exports.AccessPoint.createFrom({}, membershipResource, hasMemberRelation, isMemberOfRelation);
    },
    createFrom: function (object, membershipResource, hasMemberRelation, isMemberOfRelation) {
        return TransientDirectContainer_1.TransientDirectContainer.createFrom(object, membershipResource, hasMemberRelation, isMemberOfRelation);
    },
};

//# sourceMappingURL=AccessPoint.js.map
