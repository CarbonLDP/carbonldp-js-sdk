"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("./User");
var Errors = require("./../Errors");
var URI = require("./../RDF/URI");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.register = function (userDocument, slug) {
        var _this = this;
        if (slug === void 0) { slug = null; }
        return this.resolveURI("").then(function (containerURI) {
            if (!User.Factory.is(userDocument))
                throw new Errors.IllegalArgumentError("The Document is not a cs:User object.");
            return _this.context.documents.createChild(containerURI, userDocument, slug);
        });
    };
    Class.prototype.get = function (userURI, requestOptions) {
        var _this = this;
        return this.resolveURI(userURI).then(function (uri) {
            return _this.context.documents.get(uri, requestOptions);
        });
    };
    Class.prototype.enable = function (userURI, requestOptions) {
        return this.changeEnabledStatus(userURI, true, requestOptions);
    };
    Class.prototype.disable = function (userURI, requestOptions) {
        return this.changeEnabledStatus(userURI, false, requestOptions);
    };
    Class.prototype.delete = function (userURI, requestOptions) {
        var _this = this;
        return this.resolveURI(userURI).then(function (uri) {
            return _this.context.documents.delete(uri, requestOptions);
        });
    };
    Class.prototype.changeEnabledStatus = function (userURI, value, requestOptions) {
        var getResponse;
        return this.get(userURI, requestOptions).then(function (_a) {
            var user = _a[0], response = _a[1];
            getResponse = response;
            user.enabled = value;
            return user.save();
        }).then(function (_a) {
            var user = _a[0], response = _a[1];
            return [user, [getResponse, response]];
        });
    };
    Class.prototype.resolveURI = function (userURI) {
        var _this = this;
        return new Promise(function (resolve) {
            var containerURI = _this.context.resolve(_this.getContainerURI());
            var uri = URI.Util.resolve(containerURI, userURI);
            if (!URI.Util.isBaseOf(containerURI, uri))
                throw new Errors.IllegalArgumentError("The URI provided is not a valid user of the current context.");
            resolve(uri);
        });
    };
    Class.prototype.getContainerURI = function () {
        if (!this.context.hasSetting("system.users.container"))
            throw new Errors.IllegalStateError("The users container URI hasn't been set.");
        return this.context.getSetting("system.users.container");
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Users.js.map
