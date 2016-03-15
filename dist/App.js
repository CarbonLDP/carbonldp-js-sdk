"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractContext_1 = require("./AbstractContext");
var NS = require("./NS");
var RDF = require("./RDF");
var Utils = require("./Utils");
exports.RDF_CLASS = NS.CS.Class.Application;
exports.SCHEMA = {
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
};
var AppContext = (function (_super) {
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
exports.Context = AppContext;
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "rootContainer"));
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=App.js.map
