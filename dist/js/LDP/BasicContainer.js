/// <reference path="./../../typings/tsd.d.ts" />
var NS = require("./../NS");
var Pointer = require("./../Pointer");
exports.RDF_CLASS = NS.LDP.Class.BasicContainer;
var Factory = (function () {
    function Factory() {
    }
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
        return types.indexOf(NS.LDP.Class.BasicContainer) !== -1;
    };
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=BasicContainer.js.map
