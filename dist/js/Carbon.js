/// <reference path="../typings/typings.d.ts" />
System.register(["./Apps", "./Auth", "./AbstractContext", "./Document", "./Documents", "./HTTP", "./RDF", "./settings", "./Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Apps_1, Auth, AbstractContext_1, Document, Documents_1, HTTP, RDF, settings_1, Utils;
    var Carbon;
    return {
        setters:[
            function (Apps_1_1) {
                Apps_1 = Apps_1_1;
            },
            function (Auth_1) {
                Auth = Auth_1;
            },
            function (AbstractContext_1_1) {
                AbstractContext_1 = AbstractContext_1_1;
            },
            function (Document_1) {
                Document = Document_1;
            },
            function (Documents_1_1) {
                Documents_1 = Documents_1_1;
            },
            function (HTTP_1) {
                HTTP = HTTP_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (settings_1_1) {
                settings_1 = settings_1_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Carbon = (function (_super) {
                __extends(Carbon, _super);
                // TODO: Define settings type
                function Carbon(settings) {
                    _super.call(this);
                    settings = settings ? settings : settings_1.default;
                    Utils.M.extend(this.settings, Utils.M.from(settings));
                    this.apps = new Apps_1.default(this);
                }
                Object.defineProperty(Carbon, "version", {
                    /* tslint:enable: variable-name */
                    // TODO: Get package.json version directly
                    get: function () { return "0.16.1-ALPHA"; },
                    enumerable: true,
                    configurable: true
                });
                Carbon.prototype.resolve = function (uri) {
                    if (RDF.URI.Util.isAbsolute(uri))
                        return uri;
                    var finalURI = this.settings.get("http.ssl") ? "https://" : "http://";
                    finalURI += this.settings.get("domain") + "/" + this.getSetting("platform.container");
                    return RDF.URI.Util.resolve(finalURI, uri);
                };
                Carbon.prototype.getAPIDescription = function () {
                    return this.documents.get("api/").then(function (_a) {
                        var description = _a[0], response = _a[1];
                        return description;
                    });
                };
                /* tslint:disable: variable-name */
                Carbon.Apps = Apps_1.default;
                Carbon.Auth = Auth;
                Carbon.Document = Document;
                Carbon.Documents = Documents_1.default;
                Carbon.HTTP = HTTP;
                Carbon.RDF = RDF;
                Carbon.Utils = Utils;
                return Carbon;
            }(AbstractContext_1.default));
            exports_1("default",Carbon);
        }
    }
});

//# sourceMappingURL=Carbon.js.map
