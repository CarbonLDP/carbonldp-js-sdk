"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Endpoint_1 = require("../Endpoint");
var Errors_1 = require("../Errors");
var Vocabularies_1 = require("../Vocabularies");
var PersistedUser_1 = require("./PersistedUser");
var User_1 = require("./User");
var EndpointUserFactory = {
    createFrom: createFromBase,
    decorate: PersistedUser_1.PersistedUser.decorate,
};
exports.UsersEndpoint = {
    TYPE: Vocabularies_1.CS.Users,
    isDecorated: function (object) {
        return (object["_ModelFactory"] === EndpointUserFactory);
    },
    decorate: function (object, documents) {
        if (exports.UsersEndpoint.isDecorated(object))
            return object;
        Endpoint_1.Endpoint.decorate(object, documents);
        return Object.defineProperties(object, {
            "_ModelFactory": {
                value: EndpointUserFactory,
            },
        });
    },
};
function createFromBase(base) {
    if (!base.credentials)
        throw new Errors_1.IllegalArgumentError("A credentials object is required.");
    var user = User_1.User.createFrom(base);
    if (!user.credentials.username)
        throw new Errors_1.IllegalArgumentError("A credentials username cannot be empty.");
    if (!user.credentials.password)
        throw new Errors_1.IllegalArgumentError("A credentials password cannot be empty.");
    user.setCredentials(user.credentials.username, user.credentials.password);
    return user;
}

//# sourceMappingURL=UsersEndpoint.js.map
