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
var tokens_1 = require("sparqler/tokens");
var QueryVariable = (function (_super) {
    __extends(QueryVariable, _super);
    function QueryVariable(name, index) {
        var _this = _super.call(this, name
            .replace(/[.]/g, "__")
            .replace(/[^0-9A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/g, "_")) || this;
        _this.index = index;
        return _this;
    }
    QueryVariable.prototype.toString = function () {
        if (process.env.NODE_ENV === "prod")
            return "?_" + this.index;
        return _super.prototype.toString.call(this);
    };
    return QueryVariable;
}(tokens_1.VariableToken));
exports.QueryVariable = QueryVariable;

//# sourceMappingURL=QueryVariable.js.map
