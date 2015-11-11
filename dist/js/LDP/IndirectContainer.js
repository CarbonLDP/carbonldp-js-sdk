/// <reference path="../../typings/es6/es6.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NS = require("./../NS");
var RDF = require("./../RDF");
var AccessPoint = require("./AccessPoint");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.LDP.Class.IndirectContainer;
exports.DEFINITION = Utils.M.from({
    "insertedContentRelation": {
        "uri": NS.LDP.Predicate.insertedContentRelation,
        "multi": false,
        "literal": false
    }
});
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory() {
        _super.apply(this, arguments);
    }
    Factory.prototype.is = function (object) {
        return (_super.prototype.is.call(this, object) &&
            this.hasRDFClass(object) &&
            this.hasClassProperties(object));
    };
    Factory.prototype.from = function (resourceOrResources) {
        var sources = _super.prototype.from.call(this, resourceOrResources);
        var resources = Utils.isArray(sources) ? sources : [sources];
        for (var i = 0, length_1 = resources.length; i < length_1; i++) {
            var resource = resources[i];
            if (!this.hasClassProperties(resource))
                this.injectBehaviour(resource);
        }
        if (Utils.isArray(resourceOrResources))
            return resources;
        return resources[0];
    };
    Factory.prototype.hasRDFClass = function (resource) {
        return (resource.types.indexOf(exports.RDF_CLASS) !== -1);
    };
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "insertedContentRelation"));
    };
    Factory.prototype.injectBehaviour = function (resource) {
        RDF.Resource.Factory.injectDescriptions(resource, exports.DEFINITION);
        return resource;
    };
    return Factory;
})(AccessPoint.Factory);
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=IndirectContainer.js.map
