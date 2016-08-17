"use strict";
var Errors = require("./../Errors");
var HTTP = require("./../HTTP");
var URI = require("./../RDF/URI");
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
            persistedRole = newRole;
            responseCreated = response;
            return _this.context.documents.addMember(parentURI, newRole);
        }).then(function (response) {
            return [persistedRole, [responseCreated, response]];
        });
    };
    Class.prototype.get = function (roleURI, requestOptions) {
        var _this = this;
        return this.resolveURI(roleURI).then(function (uri) {
            return _this.context.documents.get(uri, requestOptions);
        });
    };
    Class.prototype.resolveURI = function (agentURI) {
        var _this = this;
        return new Promise(function (resolve) {
            var containerURI = _this.context.resolve(_this.getContainerURI());
            var uri = URI.Util.resolve(containerURI, agentURI);
            if (!URI.Util.isBaseOf(containerURI, uri))
                throw new Errors.IllegalArgumentError("The URI provided is not a valid role of the current context.");
            resolve(uri);
        });
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("platform.roles.container"))
            throw new Errors.IllegalStateError("The roles container setting hasn't been declared.");
        return this.context.getSetting("platform.roles.container");
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Roles.js.map
