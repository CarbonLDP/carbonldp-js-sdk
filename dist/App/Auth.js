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
var Agents_1 = require("./Agents");
var Roles_1 = require("./Roles");
var Auth_1 = require("./../Auth");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(appContext) {
        var _this = _super.call(this, appContext) || this;
        _this.roles = new Roles_1.default(appContext);
        _this.agents = new Agents_1.default(appContext);
        return _this;
    }
    return Class;
}(Auth_1.default));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Auth.js.map
