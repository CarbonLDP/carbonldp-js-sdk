"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        object.id = object._document.id + "#" + object.slug;
        return exports.TransientNamedFragment.decorate(object);
    },
    decorate: function (object) {
        if (exports.TransientNamedFragment.isDecorated(object))
            return object;
        Fragment_1.TransientFragment.decorate(object);
        var namedFragment = object;
        Object.defineProperties(namedFragment, {
            "slug": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return RDF_1.URI.getFragment(this.id);
                },
                set: function (value) {
                    this.id = this._document.id + "#" + value;
                },
            },
        });
        return namedFragment;
    },
};

//# sourceMappingURL=TransientNamedFragment.js.map
