"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./../Utils");
exports.RDFList = {
    is: function (value) {
        return Utils.hasPropertyDefined(value, "@list");
    },
};
exports.default = exports.RDFList;

//# sourceMappingURL=List.js.map
