var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Utils = require("./../Utils");
exports.RDF_CLASS = NS.CS.Class.Token;
exports.CONTEXT = {
    "key": {
        "@id": NS.CS.Predicate.tokenKey,
        "@type": NS.XSD.DataType.string,
    },
    "expirationTime": {
        "@id": NS.CS.Predicate.expirationTime,
        "@type": NS.XSD.DataType.dateTime,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.hasClassProperties = function (object) {
        return (Utils.isObject(object) &&
            Utils.hasPropertyDefined(object, "key") &&
            Utils.hasPropertyDefined(object, "expirationTime"));
    };
    Factory.prototype.decorate = function (object) {
        if (this.hasClassProperties(object))
            return object;
        return object;
    };
    Factory.prototype.hasRDFClass = function (pointerOrExpandedObject) {
        var types = [];
        if ("@type" in pointerOrExpandedObject) {
            types = pointerOrExpandedObject["@type"];
        }
        else if ("types" in pointerOrExpandedObject) {
            // TODO: Use proper class
            var resource = pointerOrExpandedObject;
            types = Pointer.Util.getIDs(resource.types);
        }
        return types.indexOf(exports.RDF_CLASS) !== -1;
    };
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=Token.js.map
