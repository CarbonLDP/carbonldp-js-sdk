"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (body) {
        return new Promise(function (resolve, reject) {
            try {
                resolve(JSON.parse(body));
            }
            catch (error) {
                reject(error);
            }
        });
    };
    return Class;
}());
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=JSONParser.js.map
