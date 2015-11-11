/// <reference path="../typings/es6/es6.d.ts" />
var NS = require("./NS");
var Utils = require("./Utils");
exports.RDF_CLASS = NS.C.Class.API;
exports.DEFINITION = Utils.M.from({
    "version": {
        "uri": NS.C.Predicate.version,
        "multi": false,
        "literal": true
    },
    "buildDate": {
        "uri": NS.C.Predicate.buildDate,
        "multi": false,
        "literal": true
    }
});

//# sourceMappingURL=APIDescription.js.map
