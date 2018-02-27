"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JSONParser_1 = require("../HTTP/JSONParser");
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var jsonParser = new JSONParser_1.JSONParser();
        return jsonParser.parse(input).then(function (parsedObject) {
            return parsedObject;
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=RawResultsParser.js.map
