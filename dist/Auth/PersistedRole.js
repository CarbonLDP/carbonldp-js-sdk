"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./../Errors");
var PersistedProtectedDocument = require("./../PersistedProtectedDocument");
var Utils = require("./../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.hasPropertyDefined(object, "_roles")
            && Utils.hasFunction(object, "createChild")
            && Utils.hasFunction(object, "listUsers")
            && Utils.hasFunction(object, "getUsers")
            && Utils.hasFunction(object, "addUser")
            && Utils.hasFunction(object, "addUsers")
            && Utils.hasFunction(object, "removeUser")
            && Utils.hasFunction(object, "removeUsers");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedProtectedDocument.Factory.is(object);
    };
    Factory.decorate = function (object, documents) {
        var persistedRole = object;
        if (Factory.hasClassProperties(persistedRole))
            return persistedRole;
        PersistedProtectedDocument.Factory.decorate(persistedRole, documents);
        var context = documents.context;
        var roles = context ? context.auth.roles : null;
        Object.defineProperties(persistedRole, {
            "_roles": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: roles,
            },
            "createChild": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createChild,
            },
            "listUsers": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: listUsers,
            },
            "getUsers": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: getUsers,
            },
            "addUser": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: addUser,
            },
            "addUsers": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: addUsers,
            },
            "removeUser": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeUser,
            },
            "removeUsers": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: removeUsers,
            },
        });
        return persistedRole;
    };
    return Factory;
}());
exports.Factory = Factory;
function createChild(role, slugOrRequestOptions, requestOptions) {
    checkState(this);
    return this._roles.createChild(this.id, role, slugOrRequestOptions, requestOptions);
}
function listUsers(requestOptions) {
    checkState(this);
    return this._roles.listUsers(this.id, requestOptions);
}
function getUsers(retrievalPreferencesOrRequestOptions, requestOptions) {
    checkState(this);
    return this._roles.getUsers(this.id, retrievalPreferencesOrRequestOptions, requestOptions);
}
function addUser(user, requestOptions) {
    checkState(this);
    return this._roles.addUsers(this.id, [user], requestOptions);
}
function addUsers(users, requestOptions) {
    checkState(this);
    return this._roles.addUsers(this.id, users, requestOptions);
}
function removeUser(user, requestOptions) {
    checkState(this);
    return this._roles.removeUsers(this.id, [user], requestOptions);
}
function removeUsers(users, requestOptions) {
    checkState(this);
    return this._roles.removeUsers(this.id, users, requestOptions);
}
function checkState(role) {
    if (!role._roles)
        throw new Errors.IllegalStateError("The context of the current role, does not support roles management.");
}

//# sourceMappingURL=PersistedRole.js.map
