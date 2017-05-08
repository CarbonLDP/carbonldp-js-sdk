"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var PersistedProtectedDocument = require("./../PersistedProtectedDocument");
var URI = require("./../RDF/URI");
var Utils = require("./../Utils");
var PersistedRole = require("./PersistedRole");
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
        return this.resolveURI("").then(function (uri) {
            containerURI = uri;
            parentURI = URI.Util.resolve(containerURI, parentURI);
            if (!URI.Util.isBaseOf(containerURI, parentURI))
                throw new Errors.IllegalArgumentError("The parent role provided is not a valid role of the current context.");
            return _this.context.documents.exists(parentURI);
        }).then(function (_a) {
            var exists = _a[0], response = _a[1];
            if (!exists)
                throw new Errors.IllegalArgumentError("The parent role provided does not exist.");
            return _this.context.documents.createChild(containerURI, role, slug, requestOptions);
        }).then(function (_a) {
            var newRole = _a[0], response = _a[1];
            responseCreated = response;
            persistedRole = PersistedRole.Factory.decorate(newRole, _this);
            return _this.context.documents.addMember(parentURI, newRole);
        }).then(function (response) {
            return [persistedRole, responseCreated];
        });
    };
    Class.prototype.get = function (roleURI, requestOptions) {
        var _this = this;
        return this.resolveURI(roleURI).then(function (uri) {
            return _this.context.documents.get(uri, requestOptions);
        });
    };
    Class.prototype.listUsers = function (roleURI, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (usersAccessPoint) {
            return _this.context.documents.listMembers(usersAccessPoint.id, requestOptions);
        }).then(function (_a) {
            var users = _a[0], response = _a[1];
            return [users.map(function (user) { return PersistedProtectedDocument.Factory.decorate(user); }), response];
        });
    };
    Class.prototype.getUsers = function (roleURI, retrievalPreferencesOrRequestOptions, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (usersAccessPoint) {
            return _this.context.documents.getMembers(usersAccessPoint.id, retrievalPreferencesOrRequestOptions, requestOptions);
        });
    };
    Class.prototype.addUser = function (roleURI, user, requestOptions) {
        return this.addUsers(roleURI, [user], requestOptions);
    };
    Class.prototype.addUsers = function (roleURI, users, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (usersAccessPoint) {
            return _this.context.documents.addMembers(usersAccessPoint.id, users, requestOptions);
        });
    };
    Class.prototype.removeUser = function (roleURI, user, requestOptions) {
        return this.removeUsers(roleURI, [user], requestOptions);
    };
    Class.prototype.removeUsers = function (roleURI, users, requestOptions) {
        var _this = this;
        return this.getUsersAccessPoint(roleURI).then(function (usersAccessPoint) {
            return _this.context.documents.removeMembers(usersAccessPoint.id, users, requestOptions);
        });
    };
    Class.prototype.resolveURI = function (userURI) {
        var _this = this;
        return new Promise(function (resolve) {
            var containerURI = _this.context.resolve(_this.getContainerURI());
            var uri = URI.Util.resolve(containerURI, userURI);
            if (!URI.Util.isBaseOf(containerURI, uri))
                throw new Errors.IllegalArgumentError("The URI provided is not a valid role of the current context.");
            resolve(uri);
        });
    };
    Class.prototype.getUsersAccessPoint = function (roleURI) {
        var _this = this;
        return this.resolveURI(roleURI).then(function (uri) {
            return _this.context.documents.executeSELECTQuery(uri, "select distinct ?usersAccessPoint where {\n\t\t\t\t<" + uri + "> <https://carbonldp.com/ns/v1/platform#accessPoint> ?usersAccessPoint .\n\t\t\t\t?usersAccessPoint <http://www.w3.org/ns/ldp#hasMemberRelation> <https://carbonldp.com/ns/v1/security#user> .\n\t\t\t}");
        }).then(function (_a) {
            var selectResults = _a[0], response = _a[1];
            return selectResults.bindings[0]["usersAccessPoint"];
        });
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("system.roles.container"))
            throw new Errors.IllegalStateError("The roles container setting hasn't been declared.");
        return this.context.getSetting("system.roles.container");
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Roles.js.map
