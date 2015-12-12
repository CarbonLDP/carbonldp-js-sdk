/// <reference path="./../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NS = require("./NS");
var Context_1 = require("./Context");
var RDF = require("./RDF");
var LDP = require("./LDP");
var Utils = require("./Utils");
exports.RDF_CLASS = NS.CS.Class.Application;
exports.DEFINITION = Utils.M.from({
    "rootContainer": {
        "uri": NS.CS.Predicate.rootContainer,
        "multi": false,
        "literal": false,
    },
});
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(parentContext, resource) {
        _super.call(this);
        this.parentContext = parentContext;
        this.resource = resource;
        this.base = this.getBase(this.resource);
    }
    Class.prototype.resolve = function (uri) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        var finalURI = this.parentContext.resolve(this.base);
        return RDF.URI.Util.resolve(finalURI, uri);
    };
    Class.prototype.getBase = function (resource) {
        var rootContainerURI = RDF.URI.Util.removeProtocol(resource.rootContainer);
        var parentBase = RDF.URI.Util.removeProtocol(this.parentContext.resolve(""));
        if (Utils.S.startsWith(rootContainerURI, parentBase))
            rootContainerURI = rootContainerURI.substr(parentBase.length, rootContainerURI.length);
        return rootContainerURI;
    };
    return Class;
})(Context_1.default);
exports.Class = Class;
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory() {
        _super.call(this, exports.RDF_CLASS, [LDP.RDFSource.injector]);
    }
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "rootContainer"));
    };
    Factory.prototype.is = function (object) {
        return (_super.prototype.is.call(this, object) &&
            this.hasClassProperties(object));
    };
    Factory.prototype.injectBehavior = function (resource) {
        RDF.Resource.Factory.injectDescriptions(resource, exports.DEFINITION);
        return resource;
    };
    return Factory;
})(RDF.AbstractInjector);
exports.Factory = Factory;
exports.factory = new Factory();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=App.js.map
