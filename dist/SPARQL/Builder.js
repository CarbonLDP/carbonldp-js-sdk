"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sparqler_1 = require("sparqler");
exports.Class = sparqler_1.default;
var queryPrototype = sparqler_1.default.prototype;
var superInit = queryPrototype.initInterfaces;
queryPrototype.initInterfaces = function () {
    superInit.call(this);
    var self = this;
    this.interfaces.finishSelect = {
        execute: function () {
            return self._documents.executeSELECTQuery(self._entryPoint, self.toCompactString());
        },
        executeRaw: function () {
            return self._documents.executeRawSELECTQuery(self._entryPoint, self.toCompactString());
        },
    };
};
exports.default = sparqler_1.default;

//# sourceMappingURL=Builder.js.map
