"use strict";
var NS = require("./NS");
exports.RDF_CLASS = NS.C.Class.API;
exports.SCHEMA = {
    "version": {
        "@id": NS.C.Predicate.version,
        "@type": NS.XSD.DataType.string,
    },
    "buildDate": {
        "@id": NS.C.Predicate.buildDate,
        "@type": NS.XSD.DataType.dateTime,
    },
};
