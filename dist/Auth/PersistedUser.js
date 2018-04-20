"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProtectedDocument_1 = require("../ProtectedDocument");
var TransientUser_1 = require("./TransientUser");
exports.PersistedUser = {
    is: function (value) {
        return TransientUser_1.TransientUser.isDecorated(value)
            && ProtectedDocument_1.ProtectedDocument.is(value);
    },
    decorate: function (object, documents) {
        TransientUser_1.TransientUser.decorate(object);
        ProtectedDocument_1.ProtectedDocument.decorate(object, documents);
        var persistedUser = object;
        persistedUser.addType(TransientUser_1.TransientUser.TYPE);
        return persistedUser;
    },
};

//# sourceMappingURL=PersistedUser.js.map
