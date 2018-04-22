"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("./Fragment");
var URI_1 = require("./RDF/URI");
var Utils_1 = require("./Utils");
exports.TransientNamedFragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object.hasOwnProperty("slug") && !object.propertyIsEnumerable("slug");
    },
    is: function (object) {
        return Fragment_1.TransientFragment.is(object)
            && exports.TransientNamedFragment.isDecorated(object);
    },
    create: function (document, slug) {
        return this.createFrom({}, document, slug);
    },
    createFrom: function (object, document, slug) {
        var base = Object.assign(object, {
            _document: document,
            id: document.id + "#" + slug,
        });
        return exports.TransientNamedFragment.decorate(base);
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

//# sourceMappingURL=TransientNamedFragment.js.map
