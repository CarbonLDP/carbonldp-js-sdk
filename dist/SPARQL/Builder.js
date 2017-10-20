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
var sparqler_1 = require("sparqler");
var decorators_1 = require("sparqler/clauses/decorators");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(documents, entryPoint) {
        return _super.call(this, function (container, object) {
            var finishObject = decorators_1.finishDecorator(container, object);
            return Object.assign(finishObject, {
                execute: function () {
                    return documents.executeSELECTQuery(entryPoint, finishObject.toCompactString());
                },
                executeRaw: function () {
                    return documents.executeRawSELECTQuery(entryPoint, finishObject.toCompactString());
                },
            });
        }) || this;
    }
    return Class;
}(sparqler_1.SPARQLER));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Builder.js.map
