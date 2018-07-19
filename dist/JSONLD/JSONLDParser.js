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
var JSONLDProcessor_1 = require("./JSONLDProcessor");
var JSONLDParser = (function (_super) {
    __extends(JSONLDParser, _super);
    function JSONLDParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONLDParser.prototype.parse = function (input) {
        return _super.prototype.parse.call(this, input).then(JSONLDProcessor_1.JSONLDProcessor.expand);
    };
    return JSONLDParser;
}(JSONParser_1.JSONParser));
exports.JSONLDParser = JSONLDParser;

//# sourceMappingURL=JSONLDParser.js.map
