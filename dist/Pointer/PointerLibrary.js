"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _getPointer(pointerLibrary, id) {
    return "$id" in pointerLibrary ?
        pointerLibrary.$getPointer(id) :
        pointerLibrary.getPointer(id);
}
exports._getPointer = _getPointer;

//# sourceMappingURL=PointerLibrary.js.map
