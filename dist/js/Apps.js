/// <reference path="./../typings/typings.d.ts" />
System.register(["./App", "./RDF", "./Utils", "./NS/CS"], function(exports_1) {
    var App, RDF, Utils, CS;
    var Apps;
    return {
        setters:[
            function (App_1) {
                App = App_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (CS_1) {
                CS = CS_1;
            }],
        execute: function() {
            Apps = (function () {
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
                Apps.prototype.getAppsContainerURI = function () {
                    if (!this.context.hasSetting("platform.apps.container"))
                        throw new Error("The apps container URI hasn't been set.");
                    return this.context.getSetting("platform.apps.container");
                };
                return Apps;
            })();
            exports_1("Apps", Apps);
            exports_1("default",Apps);
        }
    }
});

//# sourceMappingURL=Apps.js.map
