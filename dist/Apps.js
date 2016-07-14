"use strict";
var App = require("./App");
var Context_1 = require("./App/Context");
var Errors = require("./Errors");
var PersistedApp = require("./PersistedApp");
var URI = require("./RDF/URI");
var Utils = require("./Utils");
var Class = (function () {
    function Class(context) {
        this.context = context;
    }
    Class.prototype.getContext = function (pointerOrURI) {
        var _this = this;
        var pointer = !Utils.isString(pointerOrURI) ? pointerOrURI : null;
        var uri = !!pointer ? pointer.id : pointerOrURI;
        if (!uri)
            return Promise.reject(new Errors.IllegalArgumentError("The application's URI must be defined."));
        return this.resolveURI(uri).then(function (appURI) {
            pointer = _this.context.documents.getPointer(appURI);
            return pointer.resolve();
        }).then(function (_a) {
            var app = _a[0], response = _a[1];
            if (!PersistedApp.Factory.is(app))
                throw new Errors.IllegalArgumentError("The resource fetched is not a cs:Application.");
            return new Context_1.default(_this.context, app);
        });
    };
    Class.prototype.getAllContexts = function () {
        var _this = this;
        return this.resolveURI("").then(function (appsContainerURI) {
            return _this.context.documents.getMembers(appsContainerURI, false);
        }).then(function (_a) {
            var members = _a[0], response = _a[1];
            return members.map(function (member) { return new Context_1.default(_this.context, member); });
        });
    };
    Class.prototype.create = function (slugOrApp, appDocument) {
        var _this = this;
        return this.resolveURI("").then(function (appsContainerURI) {
            var slug = Utils.isString(slugOrApp) ? slugOrApp : null;
            appDocument = appDocument || slugOrApp;
            if (!App.Factory.is(appDocument))
                throw new Errors.IllegalArgumentError("The Document is not a `Carbon.App.Class` object.");
            return _this.context.documents.createChild(appsContainerURI, slug, appDocument);
        });
    };
    Class.prototype.delete = function (appURI, requestOptions) {
        var _this = this;
        if (!appURI)
            return Promise.reject(new Errors.IllegalArgumentError("The application's URI must be defined."));
        return this.resolveURI(appURI).then(function (uri) {
            return _this.context.documents.delete(uri, requestOptions);
        });
    };
    Class.prototype.resolveURI = function (appURI) {
        var _this = this;
        return new Promise(function (resolve) {
            var containerURI = _this.context.resolve(_this.getContainerURI());
            var uri = URI.Util.resolve(containerURI, appURI);
            if (!URI.Util.isBaseOf(containerURI, uri))
                throw new Errors.IllegalArgumentError("The URI provided is not a valid app of the current context.");
            resolve(uri);
        });
    };
    Class.prototype.getContainerURI = function () {
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
