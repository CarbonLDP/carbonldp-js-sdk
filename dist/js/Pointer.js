var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (value) {
        return !!(Utils.isObject(value) &&
            Utils.hasProperty(value, "uri") &&
            Utils.hasFunction(value, "resolve"));
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=Pointer.js.map
