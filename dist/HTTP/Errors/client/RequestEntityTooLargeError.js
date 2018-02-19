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
var HTTPError_1 = __importDefault(require("./../HTTPError"));
var name = "RequestEntityTooLargeError";
var statusCode = 413;
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message, response) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return statusCode; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return name; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(HTTPError_1.default));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=RequestEntityTooLargeError.js.map
