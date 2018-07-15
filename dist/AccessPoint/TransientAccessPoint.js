"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LDP_1 = require("../LDP");
var Vocabularies_1 = require("../Vocabularies");
exports.TransientAccessPoint = {
    TYPE: Vocabularies_1.C.AccessPoint,
    is: function (value) {
        return LDP_1.TransientDirectContainer.is(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientAccessPoint.createFrom(copy);
    },
    createFrom: function (object) {
        var accessPoint = LDP_1.TransientDirectContainer
            .createFrom(object);
        accessPoint
            .addType(exports.TransientAccessPoint.TYPE);
        return accessPoint;
    },
};

//# sourceMappingURL=TransientAccessPoint.js.map
