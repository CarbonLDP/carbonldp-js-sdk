var Utils = require("../Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return ((!Utils.isNull(value)) &&
            Utils.isObject(value) &&
            Utils.hasProperty(value, "@id"));
    };
    Factory.create = function (uri) {
        return {
            "@id": uri
        };
    };
    return Factory;
})();
exports.Factory = Factory;
var Util = (function () {
    function Util() {
    }
    Util.areEqual = function (node1, node2) {
        return node1["@id"] === node2["@id"];
    };
    return Util;
})();
exports.Util = Util;

//# sourceMappingURL=RDFNode.js.map
