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
var Agents = require("./../Auth/Agents");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(appContext) {
        return _super.call(this, appContext) || this;
    }
    Class.prototype.get = function (agentURI, requestOptions) {
        return _super.prototype.get.call(this, agentURI, requestOptions);
    };
    return Class;
}(Agents.Class));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Agents.js.map
