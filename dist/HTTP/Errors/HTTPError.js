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
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractError_1 = require("./../../Errors/AbstractError");
var Resource = require("./../../Resource");
var HTTPError = (function (_super) {
    __extends(HTTPError, _super);
    function HTTPError(message, response) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, HTTPError.prototype);
        Resource.Factory.createFrom(_this);
        _this.errors = [];
        _this.requestID = null;
        _this.response = response;
        _this.statusCode = response.status;
        return _this;
    }
    Object.defineProperty(HTTPError, "statusCode", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HTTPError.prototype, "name", {
        get: function () { return "HTTPError"; },
        enumerable: true,
        configurable: true
    });
    return HTTPError;
}(AbstractError_1.default));
exports.default = HTTPError;

//# sourceMappingURL=HTTPError.js.map
