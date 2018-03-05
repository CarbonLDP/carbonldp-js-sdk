"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("./Fragment");
var URI_1 = require("./RDF/URI");
var Utils_1 = require("./Utils");
exports.NamedFragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object.hasOwnProperty("slug") && !object.propertyIsEnumerable("slug");
    },
    is: function (object) {
        return Fragment_1.Fragment.is(object)
            && exports.NamedFragment.isDecorated(object);
    },
    create: function (document, slug) {
        return this.createFrom({}, document, slug);
    },
    createFrom: function (object, document, slug) {
        var id = document.id + "#" + slug;
        var fragment = Fragment_1.Fragment.createFrom(object, document, id);
        return exports.NamedFragment.decorate(fragment);
    },
    decorate: function (object) {
        if (exports.NamedFragment.isDecorated(object))
            return object;
        var namedFragment = object;
        Object.defineProperties(namedFragment, {
            "slug": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return URI_1.URI.getFragment(this.id);
                },
                set: function (value) {
                    this.id = this._document.id + "#" + value;
                },
            },
        });
        return namedFragment;
    },
};
exports.default = exports.NamedFragment;

//# sourceMappingURL=NamedFragment.js.map
