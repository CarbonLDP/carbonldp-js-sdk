"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../core");
var Fragment_1 = require("../Fragment");
var Resource_1 = require("../Resource");
var Utils_1 = require("../Utils");
var TransientDocument_1 = require("./TransientDocument");
var PROTOTYPE = {
    _resolved: false,
    _eTag: void 0,
    get _savedFragments() { return []; },
    isResolved: function () {
        return !!this._resolved;
    },
    isOutdated: function () {
        return this._eTag === null;
    },
    _syncSavedFragments: function () {
        this._savedFragments = Array
            .from(this._resourcesMap.values())
            .map(Fragment_1.Fragment.decorate);
        this._savedFragments
            .forEach(function (fragment) { return fragment._syncSnapshot(); });
    },
};
exports.BasePersistedDocument = {
    PROTOTYPE: PROTOTYPE,
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && core_1.ModelDecorator
                .hasPropertiesFrom(PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.BasePersistedDocument.isDecorated(object))
            return object;
        var resource = core_1.ModelDecorator
            .decorateMultiple(object, TransientDocument_1.TransientDocument, Resource_1.PersistedResource);
        return core_1.ModelDecorator
            .definePropertiesFrom(PROTOTYPE, resource);
    },
    is: function (value) {
        return TransientDocument_1.TransientDocument.is(value)
            && Resource_1.PersistedResource.isDecorated(value)
            && exports.BasePersistedDocument.isDecorated(value);
    },
};

//# sourceMappingURL=BasePersistedDocument.js.map
