/// <reference path="../../typings/es6/es6.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NS = require("./../NS");
var RDF = require("./../RDF");
var Container = require("./Container");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.C.Class.AccessPoint;
exports.DEFINITION = Utils.M.from({
    "membershipResource": {
        "uri": NS.LDP.Predicate.membershipResource,
        "multi": false,
        "literal": false,
    },
});
var Injector = (function (_super) {
    __extends(Injector, _super);
    function Injector() {
        _super.call(this, exports.RDF_CLASS, [Container.injector]);
    }
    Injector.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "membershipResource"));
    };
    Injector.prototype.is = function (object) {
        return (_super.prototype.is.call(this, object) &&
            this.hasRDFClass(object) &&
            this.hasClassProperties(object));
    };
    Injector.prototype.injectBehavior = function (resource) {
        RDF.Resource.Factory.injectDescriptions(resource, exports.DEFINITION);
        return resource;
    };
    return Injector;
})(RDF.AbstractInjector);
exports.Injector = Injector;
exports.injector = new Injector();

//# sourceMappingURL=AccessPoint.js.map
