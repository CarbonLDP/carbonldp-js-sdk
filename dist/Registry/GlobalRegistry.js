"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GeneralRegistry_1 = require("../GeneralRegistry/GeneralRegistry");
var RegisteredPointer_1 = require("./RegisteredPointer");
exports.GlobalRegistry = {
    create: function (data) {
        return exports.GlobalRegistry.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        var baseObject = Object.assign(object, {
            __modelDecorator: RegisteredPointer_1.RegisteredPointer,
        });
        return GeneralRegistry_1.GeneralRegistry.createFrom(baseObject);
    },
};

//# sourceMappingURL=GlobalRegistry.js.map
