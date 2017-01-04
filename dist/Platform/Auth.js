"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Agents = require("./Agents");
var Auth = require("./../Auth");
var Errors = require("./../Errors");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(platformContext) {
        var _this = _super.call(this, platformContext) || this;
        _this.agents = new Agents.Class(platformContext);
        return _this;
    }
    Object.defineProperty(Class.prototype, "roles", {
        get: function () { throw new Errors.NotImplementedError("Currently there is no support for Platform Roles"); },
        set: function (role) { },
        enumerable: true,
        configurable: true
    });
    return Class;
}(Auth.Class));
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Auth.js.map
