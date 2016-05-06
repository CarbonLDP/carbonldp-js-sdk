"use strict";
var Class = (function () {
    function Class() {
    }
    Class.prototype.parse = function (body) {
        return new Promise(function (resolve, reject) {
            resolve(body);
        });
    };
    return Class;
}());
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;
