/// <reference path="../../typings/es6/es6.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NS = require("./../NS");
var RDF = require("./../RDF");
var RDFSource = require("./RDFSource");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.LDP.Class.Container;
exports.DEFINITION = Utils.M.from({
    "memberOfRelation": {
        "uri": NS.LDP.Predicate.memberOfRelation,
        "multi": false,
        "literal": false,
    },
    "hasMemberRelation": {
        "uri": NS.LDP.Predicate.hasMemberRelation,
        "multi": false,
        "literal": false,
    },
});
var Injector = (function (_super) {
    __extends(Injector, _super);
    function Injector() {
        _super.call(this, exports.RDF_CLASS, [RDFSource.injector]);
    }
    Injector.prototype.is = function (object) {
        return (_super.prototype.is.call(this, object) &&
            this.hasRDFClass(object) &&
            this.hasClassProperties(object));
    };
    Injector.prototype.hasRDFClass = function (resource) {
        return (resource.types.indexOf(exports.RDF_CLASS) !== -1 ||
            resource.types.indexOf(NS.LDP.Class.BasicContainer) !== -1 ||
            resource.types.indexOf(NS.LDP.Class.DirectContainer) !== -1 ||
            resource.types.indexOf(NS.LDP.Class.IndirectContainer) !== -1);
    };
    Injector.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "memberOfRelation") &&
            Utils.hasPropertyDefined(resource, "hasMemberRelation"));
    };
    Injector.prototype.injectBehaviour = function (resource) {
        RDF.Resource.Factory.injectDescriptions(resource, exports.DEFINITION);
        return resource;
    };
    return Injector;
})(RDF.AbstractInjector);
exports.Injector = Injector;
exports.injector = new Injector();

//# sourceMappingURL=Container.js.map
