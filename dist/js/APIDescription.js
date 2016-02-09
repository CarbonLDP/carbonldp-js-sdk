"use strict";

System.register(["./NS"], function (_export, _context) {
    var NS, RDF_CLASS, SCHEMA;
    return {
        setters: [function (_NS) {
            NS = _NS;
        }],
        execute: function () {
            _export("RDF_CLASS", RDF_CLASS = NS.C.Class.API);

            _export("RDF_CLASS", RDF_CLASS);

            _export("SCHEMA", SCHEMA = {
                "version": {
                    "@id": NS.C.Predicate.version,
                    "@type": NS.XSD.DataType.string
                },
                "buildDate": {
                    "@id": NS.C.Predicate.buildDate,
                    "@type": NS.XSD.DataType.dateTime
                }
            });

            _export("SCHEMA", SCHEMA);
        }
    };
});
//# sourceMappingURL=APIDescription.js.map
