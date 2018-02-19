"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var Builder = __importStar(require("./SPARQL/Builder"));
exports.Builder = Builder;
var QueryDocument = __importStar(require("./SPARQL/QueryDocument"));
exports.QueryDocument = QueryDocument;
var RawResults = __importStar(require("./SPARQL/RawResults"));
exports.RawResults = RawResults;
var RawResultsParser = __importStar(require("./SPARQL/RawResultsParser"));
exports.RawResultsParser = RawResultsParser;
var SELECTResults = __importStar(require("./SPARQL/SELECTResults"));
exports.SELECTResults = SELECTResults;
var Service_1 = __importDefault(require("./SPARQL/Service"));
exports.Service = Service_1.default;

//# sourceMappingURL=SPARQL.js.map
