"use strict";

System.register(["./../NS"], function (_export, _context) {
    var NS, RDF_CLASS, SCHEMA, Factory, factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_NS) {
            NS = _NS;
        }],
        execute: function () {
            _export("RDF_CLASS", RDF_CLASS = NS.LDP.Class.RDFSource);

            _export("RDF_CLASS", RDF_CLASS);

            _export("SCHEMA", SCHEMA = {
                "created": {
                    "@id": NS.C.Predicate.created,
                    "@type": NS.XSD.DataType.dateTime
                },
                "modified": {
                    "@id": NS.C.Predicate.modified,
                    "@type": NS.XSD.DataType.dateTime
                }
            });

            _export("SCHEMA", SCHEMA);

            _export("Factory", Factory = function Factory() {
                _classCallCheck(this, Factory);
            });

            _export("Factory", Factory);

            _export("factory", factory = new Factory());

            _export("factory", factory);
        }
    };
});
//# sourceMappingURL=RDFSource.js.map
