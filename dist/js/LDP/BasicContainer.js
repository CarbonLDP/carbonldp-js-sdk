/// <reference path="../../typings/es6/es6.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NS = require("./../NS");
var RDF = require("./../RDF");
var Container = require("./Container");
var RDF_CLASS = NS.LDP.Class.BasicContainer;
var Injector = (function (_super) {
    __extends(Injector, _super);
    function Injector() {
        _super.call(this, RDF_CLASS, [Container.injector]);
    }
    Injector.prototype.is = function (object) {
        return (_super.prototype.is.call(this, object) &&
            this.hasRDFClass(object) &&
            this.hasClassProperties(object));
    };
    Injector.prototype.hasRDFClass = function (resource) {
        return (resource.types.indexOf(NS.LDP.Class.BasicContainer) !== -1);
    };
    Injector.prototype.hasClassProperties = function (resource) {
        return true;
    };
    Injector.prototype.injectBehaviour = function (resource) {
        return resource;
    };
    return Injector;
})(RDF.AbstractInjector);
exports.Injector = Injector;
exports.injector = new Injector();

//# sourceMappingURL=BasicContainer.js.map
