/// <reference path="./../typings/typings.d.ts" />
System.register(["./AbstractContext", "./NS", "./RDF", "./Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var AbstractContext_1, NS, RDF, Utils;
    var RDF_CLASS, SCHEMA, AppContext, Factory;
    return {
        setters:[
            function (AbstractContext_1_1) {
                AbstractContext_1 = AbstractContext_1_1;
            },
            function (NS_1) {
                NS = NS_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.CS.Class.Application);
            exports_1("SCHEMA", SCHEMA = {
                "name": {
                    "@id": NS.CS.Predicate.name,
                    "@type": NS.XSD.DataType.string,
                },
                "rootContainer": {
                    "@id": NS.CS.Predicate.rootContainer,
                    "@type": "@id",
                },
                "allowsOrigin": {
                    "@id": NS.CS.Predicate.allowsOrigin,
                },
            });
            AppContext = (function (_super) {
                __extends(AppContext, _super);
                function AppContext(parentContext, app) {
                    _super.call(this, parentContext);
                    this.app = app;
                    this.base = this.getBase(this.app);
                }
                AppContext.prototype.resolve = function (uri) {
                    if (RDF.URI.Util.isAbsolute(uri))
                        return uri;
                    var finalURI = this.parentContext.resolve(this.base);
                    return RDF.URI.Util.resolve(finalURI, uri);
                };
                AppContext.prototype.getBase = function (resource) {
                    return resource.rootContainer.id;
                };
                return AppContext;
            }(AbstractContext_1.default));
            exports_1("Context", AppContext);
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "rootContainer"));
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=App.js.map
