var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Parent_1 = require("./Parent");
var Platform = (function (_super) {
    __extends(Platform, _super);
    function Platform(parent) {
        _super.call(this);
        this.parent = parent;
    }
    return Platform;
})(Parent_1.default);

//# sourceMappingURL=Platform.js.map
