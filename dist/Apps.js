"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App = require("./App");
var Context_1 = require("./App/Context");
var Errors = require("./Errors");
var NS = require("./NS");
var PersistedApp = require("./PersistedApp");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
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
                throw new Errors.IllegalArgumentError("The resource fetched is not a " + NS.CS.Class.Application + ".");
            return new Context_1.default(_this.context, app);
        });
    };
    Class.prototype.getAllContexts = function () {
        var _this = this;
        return this.resolveURI("").then(function (appsContainerURI) {
            if (!_this.context.auth || !_this.context.auth.isAuthenticated())
                return _this.context.documents.getMembers(_this.getContainerURI(), false);
            var agentID = _this.context.auth.authenticatedAgent.id;
            return _this.context.documents.executeSELECTQuery(agentID, "\n\t\t\t\tSELECT ?app WHERE {\n\t\t\t\t\t<" + agentID + "> <" + NS.C.Predicate.appRoleMap + "> ?roleMap.\n\t\t\t\t\t?roleMap <" + NS.C.Predicate.entry + "> ?appEntry.\n\t\t\t\t\t?appEntry <" + NS.C.Predicate.key + "> ?app.\n\t\t\t\t}\n\t\t\t").then(function (_a) {
                var results = _a[0], response = _a[1];
                var apps = results.bindings.map(function (binding) { return binding["app"]; });
                return Pointer.Util.resolveAll(apps);
            });
        }).then(function (_a) {
            var apps = _a[0], response = _a[1];
            return apps.map(function (app) { return new Context_1.default(_this.context, app); });
        });
    };
    Class.prototype.create = function (appDocument, slug) {
        var _this = this;
        if (slug === void 0) { slug = null; }
        return this.resolveURI("").then(function (appsContainerURI) {
            if (!App.Factory.is(appDocument))
                throw new Errors.IllegalArgumentError("The Document is not a `Carbon.App.Class` object.");
            return _this.context.documents.createChild(appsContainerURI, appDocument, slug);
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
            var uri = RDF.URI.Util.resolve(containerURI, appURI);
            if (!RDF.URI.Util.isBaseOf(containerURI, uri))
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
exports.default = Class;

//# sourceMappingURL=Apps.js.map
