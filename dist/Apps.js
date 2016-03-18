"use strict";
var AppContext_1 = require("./Apps/AppContext");
exports.AppContext = AppContext_1.default;
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Utils = require("./Utils");
var App = require("./Apps/App");
exports.App = App;
var PersistedApp = require("./Apps/PersistedApp");
exports.PersistedApp = PersistedApp;
var Errors = require("./Errors");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.getAppContext = function (uri) {
        var _this = this;
        var appsContainerURI = this.getAppsContainerURI();
        if (RDF.URI.Util.isRelative(uri)) {
            if (!Utils.S.startsWith(uri, appsContainerURI))
                uri = RDF.URI.Util.resolve(appsContainerURI, uri);
            uri = this.context.resolve(uri);
        }
        return this.context.documents.get(uri).then(function (_a) {
            var document = _a[0], response = _a[1];
            if (!PersistedApp.Factory.is(document))
                throw new Errors.IllegalArgumentError("The resource fetched is not a cs:Application.");
            return new AppContext_1.default(_this.context, document);
        });
    };
    Class.prototype.getAllAppContext = function () {
        var _this = this;
        return this.context.documents.getMembers(this.getAppsContainerURI(), false).then(function (_a) {
            var members = _a[0], response = _a[1];
            return Pointer.Util.resolveAll(members);
        }).then(function (_a) {
            var members = _a[0], responses = _a[1];
            return members.map(function (member) { return new AppContext_1.default(_this.context, member); });
        });
    };
    Class.prototype.createApp = function (slugOrApp, appDocument) {
        var appsContainerURI = this.context.resolve(this.getAppsContainerURI());
        var slug = Utils.isString(slugOrApp) ? slugOrApp : null;
        appDocument = appDocument || slugOrApp;
        if (!App.Factory.is(appDocument))
            return Promise.reject(new Errors.IllegalArgumentError("The Document is not a `Carbon.App.Class` object."));
        return this.context.documents.createChild(appsContainerURI, slug, appDocument);
    };
    Class.prototype.getAppsContainerURI = function () {
        if (!this.context.hasSetting("platform.apps.container"))
            throw new Errors.IllegalStateError("The apps container URI hasn't been set.");
        return this.context.getSetting("platform.apps.container");
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Apps.js.map
