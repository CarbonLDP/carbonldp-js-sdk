"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLevelRegExp(property) {
    if (property)
        property += ".";
    var parsedName = property.replace(/\./g, "\\.");
    return new RegExp("^" + parsedName + "[^.]+$");
}
exports.getLevelRegExp = getLevelRegExp;

//# sourceMappingURL=Utils.js.map
