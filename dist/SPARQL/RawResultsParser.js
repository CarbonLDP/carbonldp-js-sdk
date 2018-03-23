"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser_1 = require("../HTTP/JSONParser");
var SPARQLRawResultsParser = (function (_super) {
    __extends(SPARQLRawResultsParser, _super);
    function SPARQLRawResultsParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SPARQLRawResultsParser.prototype.parse = function (input) {
        return _super.prototype.parse.call(this, input).then(function (object) { return object; });
    };
    return SPARQLRawResultsParser;
}(JSONParser_1.JSONParser));
exports.SPARQLRawResultsParser = SPARQLRawResultsParser;

//# sourceMappingURL=RawResultsParser.js.map
