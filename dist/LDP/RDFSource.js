var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NS = require('./../NS');
var RDF = require('./../RDF');
var Utils = require('./../Utils');
var RDFClass = NS.LDP.Class.RDFSource;
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory() {
        _super.apply(this, arguments);
    }
    Factory.prototype.is = function (object) {
        //@formatter:off
        return (_super.prototype.is.call(this, object) &&
            object.types.indexOf(RDFClass) !== -1);
        //@formatter:on
    };
    Factory.prototype.from = function (resourceOrResources) {
        var superResult = _super.prototype.from.call(this, resourceOrResources);
        var resources = Utils.isArray(superResult) ? superResult : [superResult];
        for (var i = 0, length_1 = resources.length; i < length_1; i++) {
            var resource = resources[i];
            if (!this.hasClassProperties(resource))
                this.injectBehaviour(resource);
        }
        if (Utils.isArray(resourceOrResources))
            return resources;
        else
            return resources[0];
    };
    Factory.prototype.hasRDFClass = function (resource) {
        return (resource.types.indexOf(RDFClass) !== -1);
    };
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "memberOfRelation") &&
            Utils.hasPropertyDefined(resource, "hasMemberRelation"));
    };
    Factory.prototype.injectBehaviour = function (resource) {
        return resource;
    };
    return Factory;
})(RDF.Resource.Factory);
exports.Factory = Factory;
var factory = new Factory();
exports.factory = factory;
//@formatter:off
//@formatter:on 
//# sourceMappingURL=RDFSource.js.map