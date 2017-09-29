"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var PersistedProtectedDocument = require("./../PersistedProtectedDocument");
var URI = require("./../RDF/URI");
var PersistedRole = require("./PersistedRole");
var Utils = require("./../Utils");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.createChild = function (parentRole, role, slugOrRequestOptions, requestOptions) {
        var _this = this;
        var parentURI = Utils.isString(parentRole) ? parentRole : parentRole.id;
        var slug = Utils.isString(slugOrRequestOptions) ? slugOrRequestOptions : null;
        requestOptions = HTTP.Request.Util.isOptions(slugOrRequestOptions) ? slugOrRequestOptions : requestOptions;
        var containerURI;
        var persistedRole;
        var responseCreated;
        return Utils.promiseMethod(function () {
            containerURI = _this.getContainerURI();
            parentURI = URI.Util.resolve(containerURI, parentURI);
            if (!URI.Util.isBaseOf(containerURI, parentURI))
                throw new Errors.IllegalArgumentError("The parent role provided is not a valid role.");
            return _this.context.documents.exists(parentURI);
        }).then(function (_a) {
            var exists = _a[0], response = _a[1];
            if (!exists)
                throw new Errors.IllegalArgumentError("The parent role provided doesn't exist.");
            return _this.context.documents.createChild(containerURI, role, slug, requestOptions);
        }).then(function (_a) {
            var newRole = _a[0], response = _a[1];
            responseCreated = response;
            persistedRole = PersistedRole.Factory.decorate(newRole, _this.context.documents);
            return _this.context.documents.addMember(parentURI, newRole);
        }).then(function (response) {
            return [persistedRole, responseCreated];
        });
    };
    Class.prototype.get = function (roleURI, requestOptions) {
        var _this = this;
        return Utils.promiseMethod(function () {
            return _this.context.documents.get(_this.resolveURI(roleURI), requestOptions);
        });
    };
    Class.prototype.listUsers = function (roleURI, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (accessPoint) {
            return _this.context.documents.listMembers(accessPoint.id, requestOptions);
        }).then(function (_a) {
            var documents = _a[0], response = _a[1];
            var users = documents.map(function (user) { return PersistedProtectedDocument.Factory.decorate(user, _this.context.documents); });
            return [users, response];
        });
    };
    Class.prototype.getUsers = function (roleURI, retrievalPreferencesOrRequestOptions, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (accessPoint) {
            return _this.context.documents.getMembers(accessPoint.id, retrievalPreferencesOrRequestOptions, requestOptions);
        });
    };
    Class.prototype.addUser = function (roleURI, user, requestOptions) {
        return this.addUsers(roleURI, [user], requestOptions);
    };
    Class.prototype.addUsers = function (roleURI, users, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (accessPoint) {
            return _this.context.documents.addMembers(accessPoint.id, users, requestOptions);
        });
    };
    Class.prototype.removeUser = function (roleURI, user, requestOptions) {
        return this.removeUsers(roleURI, [user], requestOptions);
    };
    Class.prototype.removeUsers = function (roleURI, users, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (accessPoint) {
            return _this.context.documents.removeMembers(accessPoint.id, users, requestOptions);
        });
    };
    Class.prototype.resolveURI = function (relativeURI) {
        var rolesContainer = this.getContainerURI();
        var absoluteRoleURI = URI.Util.resolve(rolesContainer, relativeURI);
        if (!absoluteRoleURI.startsWith(rolesContainer))
            throw new Errors.IllegalArgumentError("The provided URI \"" + relativeURI + "\" isn't a valid Carbon LDP role.");
        return absoluteRoleURI;
    };
    Class.prototype.getUsersAccessPoint = function (roleURI) {
        var _this = this;
        return Utils.promiseMethod(function () {
            var uri = _this.resolveURI(roleURI);
            return _this.context.documents.executeSELECTQuery(uri, "PREFIX:<https://carbonldp.com/ns/v1/>SELECT DISTINCT?accessPoint{<" + uri + ">:platform#accessPoint?accessPoint.?accessPoint<http://www.w3.org/ns/ldp#hasMemberRelation>:security#user}");
        }).then(function (_a) {
            var selectResults = _a[0], response = _a[1];
            return selectResults.bindings[0].accessPoint;
        });
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("system.roles.container"))
            throw new Errors.IllegalStateError("The \"system.roles.container\" setting hasn't been defined.");
        return this.context.resolveSystemURI(this.context.getSetting("system.roles.container"));
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Roles.js.map
