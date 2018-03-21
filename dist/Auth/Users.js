"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = __importStar(require("../Errors"));
var RDF_1 = require("../RDF");
var Utils_1 = require("../Utils");
var PersistedUser = __importStar(require("./PersistedUser"));
var User_1 = require("./User");
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
            var requestUser = User_1.User.createFrom(userObject, disabled);
            requestUser.setCredentials(email, password);
            var containerURI = _this.resolveURI();
            return _this
                .context
                .documents
                .createChildAndRetrieve(containerURI, requestUser);
        });
    };
    Class.prototype.get = function (userURI, queryBuilderFnOrOptions, queryBuilderFn) {
        var _this = this;
        return Utils_1.promiseMethod(function () {
            var uri = _this.resolveURI(userURI);
            return _this
                .context
                .documents
                .get(uri, queryBuilderFnOrOptions, queryBuilderFn);
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
        var usersContainer = this.context.resolve(this.getContainerURI());
        if (!relativeURI)
            return usersContainer;
        var absoluteRoleURI = RDF_1.URI.resolve(usersContainer, relativeURI);
        if (!absoluteRoleURI.startsWith(usersContainer))
            throw new Errors.IllegalArgumentError("The URI \"" + relativeURI + "\" isn't a valid user URI.");
        return absoluteRoleURI;
    };
    Class.prototype.getContainerURI = function () {
        return this.context._resolvePath("users");
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Users.js.map
