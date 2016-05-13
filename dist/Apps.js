"use strict";
var Context_1 = require("./App/Context");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Utils = require("./Utils");
var App = require("./App");
var PersistedApp = require("./PersistedApp");
var Errors = require("./Errors");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.getContext = function (pointerOrURI) {
        var _this = this;
        var pointer = !Utils.isString(pointerOrURI) ? pointerOrURI : null;
        if (!pointer) {
            var appsContainerURI = this.getAppsContainerURI();
            var uri = Utils.isString(pointerOrURI) ? pointerOrURI : null;
            if (!uri)
                return Promise.reject(new Errors.IllegalArgumentError("The application's URI cannot be null"));
            if (RDF.URI.Util.isRelative(uri)) {
                if (!Utils.S.startsWith(uri, appsContainerURI))
                    uri = RDF.URI.Util.resolve(appsContainerURI, uri);
                uri = this.context.resolve(uri);
            }
            pointer = this.context.documents.getPointer(uri);
        }
        return pointer.resolve().then(function (_a) {
            var app = _a[0], response = _a[1];
            if (!PersistedApp.Factory.is(app))
                return Promise.reject(new Errors.IllegalArgumentError("The resource fetched is not a cs:Application."));
            var appContext = new Context_1.default(_this.context, app);
            app.rootContainer = appContext.documents.getPointer(app.rootContainer.id);
            return appContext;
        });
    };
    Class.prototype.getAllContexts = function () {
        var _this = this;
        return this.context.documents.listMembers(this.getAppsContainerURI(), false).then(function (_a) {
            var members = _a[0], response = _a[1];
            return Pointer.Util.resolveAll(members);
        }).then(function (_a) {
            var members = _a[0], responses = _a[1];
            return members.map(function (member) { return new Context_1.default(_this.context, member); });
        });
    };
    Class.prototype.create = function (slugOrApp, appDocument) {
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
