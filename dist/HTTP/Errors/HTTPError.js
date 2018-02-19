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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = __importDefault(require("./../../Errors/AbstractError"));
var Resource = __importStar(require("./../../Resource"));
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(message, response) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, Class.prototype);
        Resource.Factory.createFrom(_this);
        _this.errors = [];
        _this.requestID = null;
        _this.response = response;
        _this.statusCode = response.status;
        return _this;
    }
    Object.defineProperty(Class, "statusCode", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "name", {
        get: function () { return "HTTPError"; },
        enumerable: true,
        configurable: true
    });
    return Class;
}(AbstractError_1.default));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=HTTPError.js.map
