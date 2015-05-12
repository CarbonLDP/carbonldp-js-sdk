define(["require", "exports", '../Utils'], function (require, exports, Utils) {
    var Factory = (function () {
        function Factory() {
        }
        Factory.is = function (value) {
            if (!Utils.isObject(value))
                return false;
            if (!Utils.hasProperty(value, '@id'))
                return false;
            return true;
        };
        return Factory;
    })();
    exports.Factory = Factory;
});
//# sourceMappingURL=RDFNode.js.map