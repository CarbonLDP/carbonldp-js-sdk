"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(require("../Errors"));
var ProtectedDocument_1 = require("../ProtectedDocument");
var Utils = __importStar(require("./../Utils"));
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "createChild")
            && Utils.hasFunction(object, "getUsers")
            && Utils.hasFunction(object, "addUser")
            && Utils.hasFunction(object, "addUsers")
            && Utils.hasFunction(object, "removeUser")
            && Utils.hasFunction(object, "removeUsers");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && ProtectedDocument_1.ProtectedDocument.is(object);
    };
    Factory.decorate = function (object, documents) {
        if (Factory.hasClassProperties(object))
            return object;
        ProtectedDocument_1.ProtectedDocument.decorate(object, documents);
        return Object.defineProperties(object, {
            "createChild": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: createChild,
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
    };
    return Factory;
}());
exports.Factory = Factory;
function createChild(role, slugOrRequestOptions, requestOptions) {
    var _this = this;
    return getRolesClass(this)
        .then(function (roles) {
        return roles.createChild(_this.id, role, slugOrRequestOptions, requestOptions);
    });
}
function getUsers(queryBuilderFnOrOptions, queryBuilderFn) {
    var _this = this;
    return getRolesClass(this)
        .then(function (roles) {
        return roles.getUsers(_this.id, queryBuilderFnOrOptions, queryBuilderFn);
    });
}
function addUser(user, requestOptions) {
    var _this = this;
    return getRolesClass(this)
        .then(function (roles) {
        return roles.addUser(_this.id, user, requestOptions);
    });
}
function addUsers(users, requestOptions) {
    var _this = this;
    return getRolesClass(this)
        .then(function (roles) {
        return roles.addUsers(_this.id, users, requestOptions);
    });
}
function removeUser(user, requestOptions) {
    var _this = this;
    return getRolesClass(this)
        .then(function (roles) {
        return roles.removeUser(_this.id, user, requestOptions);
    });
}
function removeUsers(users, requestOptions) {
    var _this = this;
    return getRolesClass(this)
        .then(function (roles) {
        return roles.removeUsers(_this.id, users, requestOptions);
    });
}
function getRolesClass(role) {
    return Utils.promiseMethod(function () {
        if (!role._documents["context"])
            throw new Errors.IllegalStateError("The context of the role doesn't support roles management.");
        return role._documents["context"].auth.roles;
    });
}

//# sourceMappingURL=PersistedRole.js.map
