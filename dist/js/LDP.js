System.register(["./LDP/AccessPoint", "./LDP/BasicContainer", "./LDP/Container", "./LDP/PersistedContainer", "./LDP/RDFSource"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccessPoint, BasicContainer, Container, PersistedContainer, RDFSource;
    return {
        setters:[
            function (AccessPoint_1) {
                AccessPoint = AccessPoint_1;
            },
            function (BasicContainer_1) {
                BasicContainer = BasicContainer_1;
            },
            function (Container_1) {
                Container = Container_1;
            },
            function (PersistedContainer_1) {
                PersistedContainer = PersistedContainer_1;
            },
            function (RDFSource_1) {
                RDFSource = RDFSource_1;
            }],
        execute: function() {
            exports_1("AccessPoint", AccessPoint);
            exports_1("BasicContainer", BasicContainer);
            exports_1("Container", Container);
            exports_1("PersistedContainer", PersistedContainer);
            exports_1("RDFSource", RDFSource);
        }
    }
});

//# sourceMappingURL=LDP.js.map
