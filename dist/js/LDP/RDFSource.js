System.register(["./../NS"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NS;
    var RDF_CLASS, SCHEMA, Factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.LDP.Class.RDFSource);
            exports_1("SCHEMA", SCHEMA = {
                "created": {
                    "@id": NS.C.Predicate.created,
                    "@type": NS.XSD.DataType.dateTime,
                },
                "modified": {
                    "@id": NS.C.Predicate.modified,
                    "@type": NS.XSD.DataType.dateTime,
                },
            });
            Factory = (function () {
                function Factory() {
                }
                return Factory;
            }());
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=RDFSource.js.map
