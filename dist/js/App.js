/// <reference path="../typings/es6/es6.d.ts" />
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
        "literal": false
    }
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
        _super.apply(this, arguments);
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "rootContainer"));
    };
    Factory.prototype.is = function (object) {
        return (_super.prototype.is.call(this, object) &&
            Utils.hasPropertyDefined(object, "rootContainer"));
    };
    Factory.prototype.from = function (resourceOrResources) {
        var superResult = _super.prototype.from.call(this, resourceOrResources);
        var resources = Utils.isArray(superResult) ? superResult : [superResult];
        for (var i = 0, length_1 = resources.length; i < length_1; i++) {
            var resource = resources[i];
            if (!Factory.hasClassProperties(resource))
                this.injectBehaviour(resource);
        }
        if (Utils.isArray(resourceOrResources))
            return resources;
        return resources[0];
    };
    Factory.prototype.hasRDFClass = function (resource) {
        return (resource.types.indexOf(exports.RDF_CLASS) !== -1);
    };
    Factory.prototype.injectBehaviour = function (resource) {
        RDF.Resource.Factory.injectDescriptions(resource, exports.DEFINITION);
        return resource;
    };
    return Factory;
})(LDP.RDFSource.Factory);
exports.Factory = Factory;
exports.factory = new Factory();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=App.js.map
