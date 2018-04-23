"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProtectedDocument_1 = require("../ProtectedDocument");
var TransientAccessPoint_1 = require("./TransientAccessPoint");
exports.AccessPoint = {
    TYPE: TransientAccessPoint_1.TransientAccessPoint.TYPE,
    is: function (value) {
        return TransientAccessPoint_1.TransientAccessPoint.is(value)
            && ProtectedDocument_1.ProtectedDocument.is(value);
    },
    create: TransientAccessPoint_1.TransientAccessPoint.create,
    createFrom: TransientAccessPoint_1.TransientAccessPoint.createFrom,
};

//# sourceMappingURL=AccessPoint.js.map
