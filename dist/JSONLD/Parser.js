"use strict";
var JSONParser_1 = require("./../HTTP/JSONParser");
var Processor_1 = require("./Processor");
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var jsonParser = new JSONParser_1.default();
        return jsonParser.parse(input).then(function (parsedObject) {
            return Processor_1.default.expand(parsedObject);
        });
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Parser.js.map
