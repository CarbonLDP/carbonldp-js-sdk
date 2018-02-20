"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./C"));
__export(require("./CS"));
__export(require("./LDP"));
__export(require("./RDF"));
__export(require("./SHACL"));
var VCARD = __importStar(require("./VCARD"));
exports.VCARD = VCARD;
var XSD = __importStar(require("./XSD"));
exports.XSD = XSD;

//# sourceMappingURL=index.js.map
