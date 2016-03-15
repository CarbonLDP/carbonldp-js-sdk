"use strict";
var App = require("./App");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Utils = require("./Utils");
var CS = require("./NS/CS");
var Apps = (function () {
    function Apps(context) {
        this.context = context;
    }
    Apps.prototype.get = function (uri) {
        var _this = this;
        var appsContainerURI = this.getAppsContainerURI();
        if (RDF.URI.Util.isRelative(uri)) {
            if (!Utils.S.startsWith(uri, appsContainerURI))
                uri = RDF.URI.Util.resolve(appsContainerURI, uri);
            uri = this.context.resolve(uri);
        }
        return this.context.documents.get(uri).then(function (_a) {
            var document = _a[0], response = _a[1];
            if (!document.types.indexOf(CS.Class.Application))
                throw new Error("The resource fetched is not a cs:Application.");
            return new App.Context(_this.context, document);
        });
    };
    Apps.prototype.getAll = function () {
        var _this = this;
        return this.context.documents.getMembers(this.getAppsContainerURI(), false).then(function (_a) {
            var members = _a[0], response = _a[1];
            return Pointer.Util.resolveAll(members);
        }).then(function (_a) {
            var members = _a[0], responses = _a[1];
            return members.map(function (member) { return new App.Context(_this.context, member); });
        });
    };
    Apps.prototype.getAppsContainerURI = function () {
        if (!this.context.hasSetting("platform.apps.container"))
            throw new Error("The apps container URI hasn't been set.");
        return this.context.getSetting("platform.apps.container");
    };
    return Apps;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Apps;

//# sourceMappingURL=Apps.js.map
