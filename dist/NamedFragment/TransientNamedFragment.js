"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var Fragment_1 = require("../Fragment");
var RDF_1 = require("../RDF");
var Utils_1 = require("../Utils");
exports.TransientNamedFragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object.hasOwnProperty("slug") && !object.propertyIsEnumerable("slug");
    },
    is: function (value) {
        return Fragment_1.TransientFragment.is(value)
            && exports.TransientNamedFragment.isDecorated(value);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientNamedFragment.createFrom(copy);
    },
    createFrom: function (object) {
        var slug = object.slug;
        var namedFragment = exports.TransientNamedFragment.decorate(object);
        namedFragment.slug = slug;
        return namedFragment;
    },
    decorate: function (object) {
        if (exports.TransientNamedFragment.isDecorated(object))
            return object;
        Fragment_1.TransientFragment.decorate(object);
        var namedFragment = object;
        Object.defineProperties(namedFragment, {
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    var registryID = this._registry && this._registry.id || "";
                    return registryID + "#" + RDF_1.URI.getFragment(this._id);
                },
                set: function (value) {
                    var fragment = RDF_1.URI.getFragment(value);
                    if (!fragment)
                        throw new Errors_1.IllegalActionError("Cannot assign \"" + value + "\" as a named fragment ID.");
                    var registryID = this._registry && this._registry.id || "";
                    if (!RDF_1.URI.isBaseOf(registryID, value))
                        throw new Errors_1.IllegalActionError("\"" + value + "\" it's outside \"" + registryID + "\"'s scope.");
                    this._id = registryID + "#" + fragment;
                },
            },
            "slug": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return RDF_1.URI.getFragment(this._id);
                },
                set: function (value) {
                    var registryID = this._registry && this._registry.id || "";
                    this._id = registryID + "#" + value;
                },
            },
        });
        return namedFragment;
    },
};

//# sourceMappingURL=TransientNamedFragment.js.map
