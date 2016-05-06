"use strict";
var jsonld = require("jsonld");
var JSONParser_1 = require("./JSONParser");
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (input) {
        var _this = this;
        var jsonParser = new JSONParser_1.default();
        return jsonParser.parse(input).then(function (parsedObject) {
            return _this.expandJSON(parsedObject);
        });
    };
    Class.prototype.expandJSON = function (parsedObject, options) {
        return new Promise(function (resolve, reject) {
            jsonld.expand(parsedObject, options, function (error, expanded) {
                if (error) {
                    reject(error);
                }
                parsedObject = expanded;
                resolve(expanded);
            });
        });
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;
