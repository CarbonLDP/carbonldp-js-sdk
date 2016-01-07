var NS = require("./../NS");
exports.RDF_CLASS = NS.LDP.Class.RDFSource;
exports.SCHEMA = {
    "created": {
        "@id": NS.C.Predicate.created,
        "@type": NS.XSD.DataType.dateTime,
    },
    "modified": {
        "@id": NS.C.Predicate.modified,
        "@type": NS.XSD.DataType.dateTime,
    },
};
var Factory = (function () {
    function Factory() {
    }
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=RDFSource.js.map
