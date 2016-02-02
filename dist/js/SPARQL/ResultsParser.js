/// <reference path="./../../typings/tsd.d.ts" />
var JSONParser_1 = require("./../HTTP/JSONParser");
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var jsonParser = new JSONParser_1.default();
        return jsonParser.parse(input).then(function (parsedObject) {
            // TODO: Add sugar
            return parsedObject;
        });
    };
    return Class;
})();
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=ResultsParser.js.map
