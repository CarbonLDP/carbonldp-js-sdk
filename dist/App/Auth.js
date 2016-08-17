"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Roles_1 = require("./Roles");
var Auth_1 = require("./../Auth");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(appContext) {
        _super.call(this, appContext);
        this.roles = new Roles_1.default(appContext);
    }
    return Class;
}(Auth_1.default));
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=Auth.js.map
