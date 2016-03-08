System.register(["./NS"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NS;
    var RDF_CLASS, SCHEMA;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.C.Class.API);
            exports_1("SCHEMA", SCHEMA = {
                "version": {
                    "@id": NS.C.Predicate.version,
                    "@type": NS.XSD.DataType.string,
                },
                "buildDate": {
                    "@id": NS.C.Predicate.buildDate,
                    "@type": NS.XSD.DataType.dateTime,
                },
            });
        }
    }
});

//# sourceMappingURL=APIDescription.js.map
