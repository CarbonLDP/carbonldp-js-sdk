"use strict";
var JSONParser_1 = require("./../HTTP/JSONParser");
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var jsonParser = new JSONParser_1.default();
        return jsonParser.parse(input).then(function (parsedObject) {
            return parsedObject;
        });
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;
