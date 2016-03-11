System.register(["./PersistedFragment"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PersistedFragment;
    var Factory;
    return {
        setters:[
            function (PersistedFragment_1) {
                PersistedFragment = PersistedFragment_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.decorate = function (fragment, snapshot) {
                    if (snapshot === void 0) { snapshot = {}; }
                    PersistedFragment.Factory.decorate(fragment, snapshot);
                    return fragment;
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=PersistedNamedFragment.js.map
