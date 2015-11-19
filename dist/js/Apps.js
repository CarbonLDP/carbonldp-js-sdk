/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
var App = require("./App");
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
            this.context.resolve(uri);
        }
        return this.context.Documents.get(uri).then(function (processedResponse) {
            var document = processedResponse.result;
            if (!document.types.indexOf(CS.Class.Application))
                throw new Error("The resource fetched is not a cs:Application.");
            var appResource = App.factory.from(document);
            return new App.Class(_this.context, appResource);
        });
    };
    Apps.prototype.getAppsContainerURI = function () {
        if (!this.context.hasSetting("platform.apps.container"))
            throw new Error("The apps container URI hasn't been set.");
        return this.context.getSetting("platform.apps.container");
    };
    return Apps;
})();
exports.Apps = Apps;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Apps;

//# sourceMappingURL=Apps.js.map
