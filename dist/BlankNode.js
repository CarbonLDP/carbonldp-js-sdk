"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var Fragment_1 = require("./Fragment");
var URI = __importStar(require("./RDF/URI"));
exports.BlankNode = {
    is: function (object) {
        return Fragment_1.Fragment.is(object) &&
            URI.Util.isBNodeID(object.id);
    },
    create: function (document, id) {
        return exports.BlankNode.createFrom({}, document, id);
    },
    createFrom: function (object, document, id) {
        if (id && !URI.Util.isBNodeID(id))
            throw new Errors_1.IllegalArgumentError("The id \"" + id + "\" is not an blank node label");
        if (!id)
            id = URI.Util.generateBNodeID();
        return Fragment_1.Fragment.createFrom(object, document, id);
    },
};
exports.default = exports.BlankNode;

//# sourceMappingURL=BlankNode.js.map
