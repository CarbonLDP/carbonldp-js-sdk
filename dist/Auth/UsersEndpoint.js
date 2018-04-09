"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedProtectedDocument_1 = require("../PersistedProtectedDocument");
exports.UsersEndpoint = {
    is: function (value) {
        return PersistedProtectedDocument_1.PersistedProtectedDocument.is(value);
    },
    decorate: function (object, documents) {
        PersistedProtectedDocument_1.PersistedProtectedDocument.decorate(object, documents);
        return object;
    },
};

//# sourceMappingURL=UsersEndpoint.js.map
