"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../Utils");
var Errors = require("./../Errors");
var URI = require("./../RDF/URI");
var PersistedUser = require("./PersistedUser");
var User = require("./User");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.register = function (email, password, disabled) {
        return this.registerWith({}, email, password, disabled);
    };
    Class.prototype.registerWith = function (userObject, email, password, disabled) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var requestUser = User.Factory.createFrom(userObject, disabled);
            requestUser.setCredentials(email, password);
            var containerURI = _this.resolveURI();
            return _this
                .context
                .documents
                .createChildAndRetrieve(containerURI, requestUser);
        });
    };
    Class.prototype.get = function (userURI, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var uri = _this.resolveURI(userURI);
            return _this
                .context
                .documents
                .get(uri, requestOptions);
        });
    };
    Class.prototype.enable = function (userURI, requestOptions) {
        return this
            .getPersistedUser(userURI)
            .then(function (persistedUser) {
            return persistedUser.enable(requestOptions);
        });
    };
    Class.prototype.disable = function (userURI, requestOptions) {
        return this
            .getPersistedUser(userURI)
            .then(function (persistedUser) {
            return persistedUser.disable(requestOptions);
        });
    };
    Class.prototype.delete = function (userURI, requestOptions) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var uri = _this.resolveURI(userURI);
            return _this
                .context
                .documents
                .delete(uri, requestOptions);
        });
    };
    Class.prototype.getPersistedUser = function (userURI) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var userID = _this.resolveURI(userURI);
            var userPointer = _this.context.documents.getPointer(userID);
            return PersistedUser.Factory.decorate(userPointer, _this.context.documents);
        });
    };
    Class.prototype.resolveURI = function (relativeURI) {
        if (!this.context.hasSetting("users.container"))
            throw new Errors.IllegalStateError("The \"users.container\" setting hasn't been defined.");
        var usersContainer = this.context.resolve(this.context.getSetting("users.container"));
        if (!relativeURI)
            return usersContainer;
        var absoluteRoleURI = URI.Util.resolve(usersContainer, relativeURI);
        if (!absoluteRoleURI.startsWith(usersContainer))
            throw new Errors.IllegalArgumentError("The URI \"" + relativeURI + "\" isn't a valid user URI.");
        return absoluteRoleURI;
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Users.js.map
