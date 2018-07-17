"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientDirectContainer_1 = require("../LDP/DirectContainer/TransientDirectContainer");
var C_1 = require("../Vocabularies/C");
exports.TransientAccessPoint = {
    TYPE: C_1.C.AccessPoint,
    is: function (value) {
        return TransientDirectContainer_1.TransientDirectContainer.is(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientAccessPoint.createFrom(copy);
    },
    createFrom: function (object) {
        var accessPoint = TransientDirectContainer_1.TransientDirectContainer
            .createFrom(object);
        accessPoint
            .$addType(exports.TransientAccessPoint.TYPE);
        return accessPoint;
    },
};

//# sourceMappingURL=TransientAccessPoint.js.map
