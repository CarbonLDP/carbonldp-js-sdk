System.register(["./../Utils"], function(exports_1) {
    var Utils;
    var Factory;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.is = function (value) {
                    return ((!Utils.isNull(value)) &&
                        Utils.isObject(value) &&
                        Utils.hasProperty(value, "@list"));
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=List.js.map
