"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./../Errors");
var URI = require("./../RDF/URI");
var Credentials = require("./Credentials");
var PersistedUser = require("./PersistedUser");
var Utils_1 = require("../Utils");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.register = function (email, password, enabled) {
        var _this = this;
        var credentials = Credentials.Factory.create(email, password);
        credentials.enabled = enabled;
        return Utils_1.promiseMethod(function () {
            var containerURI = _this.getCredentialsContainerURI();
            return _this.context.documents.createChildAndRetrieve(containerURI, credentials);
        }).then(function (_a) {
            var persistedCredentials = _a[0], response = _a[1];
            return [persistedCredentials.user, response];
        });
    };
    Class.prototype.get = function (userURI, requestOptions) {
        var _this = this;
        return new Promise(function (resolve) {
            return resolve(_this.context.documents.get(_this.resolveURI(userURI), requestOptions));
        });
    };
    Class.prototype.enableCredentials = function (userURI, requestOptions) {
        return this.changeEnabledStatus(userURI, true, requestOptions);
    };
    Class.prototype.disableCredentials = function (userURI, requestOptions) {
        return this.changeEnabledStatus(userURI, false, requestOptions);
    };
    Class.prototype.delete = function (userURI, requestOptions) {
        var _this = this;
        return new Promise(function (resolve) {
            return resolve(_this.context.documents.delete(_this.resolveURI(userURI), requestOptions));
        });
    };
    Class.prototype.changeEnabledStatus = function (userURI, value, requestOptions) {
        var _this = this;
        return Promise.resolve().then(function () {
            var absoluteUserURI = _this.resolveURI(userURI);
            var userPointer = _this.context.documents.getPointer(absoluteUserURI);
            var persistedUser = PersistedUser.Factory.decorate(userPointer, _this.context.documents);
            if (value)
                return persistedUser.enableCredentials(requestOptions);
            return persistedUser.disableCredentials(requestOptions);
        });
    };
    Class.prototype.resolveURI = function (relativeURI) {
        var usersContainer = this.getContainerURI();
        var absoluteRoleURI = URI.Util.resolve(usersContainer, relativeURI);
        if (!absoluteRoleURI.startsWith(usersContainer))
            throw new Errors.IllegalArgumentError("The provided URI \"" + relativeURI + "\" isn't a valid Carbon LDP user.");
        return absoluteRoleURI;
    };
    Class.prototype.getContainerURI = function () {
        return this.context._resolvePath("users");
    };
    Class.prototype.getCredentialsContainerURI = function () {
        return this.context._resolvePath("system.credentials");
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Users.js.map
