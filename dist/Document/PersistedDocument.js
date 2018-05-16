"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Resource_1 = require("../Resource");
var TransientDocument_1 = require("./TransientDocument");
var Utils_1 = require("../Utils");
var PROTOTYPE = {
    _resolved: false,
    _eTag: void 0,
    isResolved: function () {
        return !!this._resolved;
    },
    isOutdated: function () {
        return this._eTag === null;
    },
};
exports.PersistedDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.PersistedDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, Resource_1.PersistedResource);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    is: function (value) {
        return TransientDocument_1.TransientDocument.is(value)
            && Resource_1.PersistedResource.isDecorated(value)
            && exports.PersistedDocument.isDecorated(value);
    },
};

//# sourceMappingURL=PersistedDocument.js.map
