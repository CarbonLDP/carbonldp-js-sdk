var PersistedResource = require("./PersistedResource");
var Utils = require("./Utils");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (fragment) {
        return (true);
    };
    Factory.from = function (fragments) {
        if (!Utils.isArray(fragments))
            return Factory.singleFrom(fragments);
        var persistedFragments = [];
        for (var i = 0, length_1 = fragments.length; i < length_1; i++) {
            var fragment = fragments[i];
            persistedFragments.push(Factory.singleFrom(fragment));
        }
        return persistedFragments;
    };
    Factory.singleFrom = function (fragment) {
        var persisted = PersistedResource.Factory.from(fragment);
        return Factory.hasClassProperties(fragment) ? persisted : Factory.injectBehavior(persisted);
    };
    Factory.injectBehavior = function (persisted) {
        if (Factory.hasClassProperties(persisted))
            return persisted;
        return persisted;
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=PersistedFragment.js.map
