var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NS = require("./../NS");
var RDF = require("./../RDF");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.Token;
exports.DEFINITION = Utils.M.from({
    "key": {
        "uri": NS.CS.Predicate.tokenKey,
        "multi": false,
        "literal": true,
    },
    "expirationTime": {
        "uri": NS.CS.Predicate.expirationTime,
        "multi": false,
        "literal": true,
    },
});
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory() {
        _super.apply(this, arguments);
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "key") &&
            Utils.hasPropertyDefined(resource, "expirationTime"));
    };
    Factory.prototype.from = function (objects) {
        if (!Utils.isArray(objects))
            return this.singleFrom(objects);
        for (var i = 0, length_1 = objects.length; i < length_1; i++) {
            var resource = objects[i];
            this.injectBehavior(resource);
        }
        return objects;
    };
    Factory.prototype.hasRDFClass = function (resource) {
        return resource.types.indexOf(exports.RDF_CLASS) !== -1;
    };
    Factory.prototype.injectBehavior = function (node) {
        var token = node;
        _super.prototype.injectBehavior.call(this, node);
        if (Factory.hasClassProperties(token))
            return token;
        RDF.Resource.Factory.injectDescriptions(token, exports.DEFINITION);
        return token;
    };
    return Factory;
})(RDF.Resource.Factory);
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=Token.js.map
