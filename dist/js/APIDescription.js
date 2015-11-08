/// <reference path="../typings/es6/es6.d.ts" />
var NS = require('./NS');
var Utils = require('./Utils');
var RDFClass = NS.C.Class.API;
exports.RDFClass = RDFClass;
var Definition = Utils.M.from({
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
exports.Definition = Definition;

//# sourceMappingURL=APIDescription.js.map
