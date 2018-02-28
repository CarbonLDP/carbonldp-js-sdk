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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser_1 = require("../HTTP/JSONParser");
var Processor_1 = __importDefault(require("./Processor"));
var JSONLDParser = (function (_super) {
    __extends(JSONLDParser, _super);
    function JSONLDParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONLDParser.prototype.parse = function (input) {
        return _super.prototype.parse.call(this, input).then(Processor_1.default.expand);
    };
    return JSONLDParser;
}(JSONParser_1.JSONParser));
exports.JSONLDParser = JSONLDParser;
exports.default = JSONLDParser;

//# sourceMappingURL=Parser.js.map
