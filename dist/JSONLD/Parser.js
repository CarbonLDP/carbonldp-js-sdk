"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser_1 = require("../HTTP/JSONParser");
var Processor_1 = __importDefault(require("./Processor"));
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var jsonParser = new JSONParser_1.JSONParser();
        return jsonParser.parse(input).then(function (parsedObject) {
            return Processor_1.default.expand(parsedObject);
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Parser.js.map
