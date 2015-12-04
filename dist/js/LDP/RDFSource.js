var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NS = require("./../NS");
var RDF = require("./../RDF");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.LDP.Class.RDFSource;
var Injector = (function (_super) {
    __extends(Injector, _super);
    function Injector() {
        _super.call(this, exports.RDF_CLASS, [RDF.Resource.factory]);
    }
    Injector.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "memberOfRelation") &&
            Utils.hasPropertyDefined(resource, "hasMemberRelation"));
    };
    Injector.prototype.is = function (object) {
        return (this.hasRDFClass(object));
    };
    return Injector;
})(RDF.AbstractInjector);
exports.Injector = Injector;
exports.injector = new Injector();

//# sourceMappingURL=RDFSource.js.map
