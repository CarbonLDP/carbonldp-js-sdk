/// <reference path="./../typings/typings.d.ts" />
System.register(["./App", "./Pointer", "./RDF", "./Utils", "./NS/CS"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var App, Pointer, RDF, Utils, CS;
    var Apps;
    return {
        setters:[
            function (App_1) {
                App = App_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
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
            exports_1("Apps", Apps);
            exports_1("default",Apps);
        }
    }
});

//# sourceMappingURL=Apps.js.map
