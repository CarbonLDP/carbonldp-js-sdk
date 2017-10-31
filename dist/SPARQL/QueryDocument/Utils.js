"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLevelRegExp(property) {
    var parsedName = property.replace(".", "\\.");
    return new RegExp("^" + parsedName + "\\.[^.]+$");
}
exports.getLevelRegExp = getLevelRegExp;

//# sourceMappingURL=Utils.js.map
