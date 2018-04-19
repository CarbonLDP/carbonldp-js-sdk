"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProtectedDocument_1 = require("../ProtectedDocument");
var User_1 = require("./User");
exports.PersistedUser = {
    is: function (value) {
        return User_1.User.isDecorated(value)
            && ProtectedDocument_1.ProtectedDocument.is(value);
    },
    decorate: function (object, documents) {
        User_1.User.decorate(object);
        ProtectedDocument_1.ProtectedDocument.decorate(object, documents);
        var persistedUser = object;
        persistedUser.addType(User_1.User.TYPE);
        return persistedUser;
    },
};

//# sourceMappingURL=PersistedUser.js.map
