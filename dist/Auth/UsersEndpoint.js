"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProtectedDocument_1 = require("../ProtectedDocument");
exports.UsersEndpoint = {
    is: function (value) {
        return ProtectedDocument_1.ProtectedDocument.is(value);
    },
    decorate: function (object) {
        ProtectedDocument_1.ProtectedDocument.decorate(object);
        return object;
    },
};

//# sourceMappingURL=UsersEndpoint.js.map
