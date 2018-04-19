"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransientFragment_1 = require("./TransientFragment");
var URI_1 = require("./RDF/URI");
var Utils_1 = require("./Utils");
exports.TransientNamedFragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object.hasOwnProperty("slug") && !object.propertyIsEnumerable("slug");
    },
    is: function (object) {
        return TransientFragment_1.TransientFragment.is(object)
            && exports.TransientNamedFragment.isDecorated(object);
    },
    create: function (document, slug) {
        return this.createFrom({}, document, slug);
    },
    createFrom: function (object, document, slug) {
        var id = document.id + "#" + slug;
        var fragment = TransientFragment_1.TransientFragment.createFrom(object, document, id);
        return exports.TransientNamedFragment.decorate(fragment);
    },
    decorate: function (object) {
        if (exports.TransientNamedFragment.isDecorated(object))
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

//# sourceMappingURL=TransientNamedFragment.js.map
