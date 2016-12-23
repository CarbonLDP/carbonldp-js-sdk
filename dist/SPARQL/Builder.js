"use strict";
var sparqler_1 = require("sparqler");
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sparqler_1.default;

//# sourceMappingURL=Builder.js.map
