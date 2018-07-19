"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document/Document");
var TransientAccessPoint_1 = require("./TransientAccessPoint");
exports.AccessPoint = {
    TYPE: TransientAccessPoint_1.TransientAccessPoint.TYPE,
    is: function (value) {
        return TransientAccessPoint_1.TransientAccessPoint.is(value)
            && Document_1.Document.is(value);
    },
    create: TransientAccessPoint_1.TransientAccessPoint.create,
    createFrom: TransientAccessPoint_1.TransientAccessPoint.createFrom,
};

//# sourceMappingURL=AccessPoint.js.map
