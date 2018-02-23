"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("./Fragment");
var RDF = __importStar(require("./RDF"));
var Utils = __importStar(require("./Utils"));
var Factory = (function () {
    function Factory() {
    }
    Factory.createFrom = function (object, idOrDocument, document) {
        var id = !!idOrDocument && Utils.isString(idOrDocument) ? idOrDocument : RDF.URI.Util.generateBNodeID();
        document = document || idOrDocument;
        return Fragment_1.Fragment.createFrom(object, document, id);
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=BlankNode.js.map
