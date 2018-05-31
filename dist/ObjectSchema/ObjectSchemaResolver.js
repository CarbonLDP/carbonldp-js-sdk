"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
exports.ObjectSchemaResolver = {
    is: function (value) {
        return Utils_1.isObject(value)
            && Utils_1.hasFunction(value, "getGeneralSchema")
            && Utils_1.hasFunction(value, "hasSchemaFor")
            && Utils_1.hasFunction(value, "getSchemaFor");
    },
};

//# sourceMappingURL=ObjectSchemaResolver.js.map
