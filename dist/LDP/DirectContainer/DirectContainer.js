"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../../Document/Document");
var TransientDirectContainer_1 = require("./TransientDirectContainer");
exports.DirectContainer = {
    TYPE: TransientDirectContainer_1.TransientDirectContainer.TYPE,
    is: function (value) {
        return TransientDirectContainer_1.TransientDirectContainer.is(value)
            && Document_1.Document.is(value);
    },
    create: TransientDirectContainer_1.TransientDirectContainer.create,
    createFrom: TransientDirectContainer_1.TransientDirectContainer.createFrom,
};

//# sourceMappingURL=DirectContainer.js.map
