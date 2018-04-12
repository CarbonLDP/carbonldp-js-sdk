"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersistedProtectedDocument_1 = require("../PersistedProtectedDocument");
var User_1 = require("./User");
exports.PersistedUser = {
    is: function (value) {
        return User_1.User.isDecorated(value)
            && PersistedProtectedDocument_1.PersistedProtectedDocument.is(value);
    },
    decorate: function (object, documents) {
        User_1.User.decorate(object);
        PersistedProtectedDocument_1.PersistedProtectedDocument.decorate(object, documents);
        var persistedUser = object;
        persistedUser.addType(User_1.User.TYPE);
        return persistedUser;
    },
};

//# sourceMappingURL=PersistedUser.js.map
