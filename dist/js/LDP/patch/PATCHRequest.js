var RDF = require("../../RDF");
var Factory = (function () {
    function Factory() {
    }
    Factory.create = function (objectOrObjects) {
        if (objectOrObjects === void 0) { objectOrObjects = []; }
        var patch = RDF.Resource.factory.create();
        // TODO: Implement
        return null;
    };
    Factory.injectBehaviour = function (value) {
        // TODO: Implement
        return null;
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=PATCHRequest.js.map
