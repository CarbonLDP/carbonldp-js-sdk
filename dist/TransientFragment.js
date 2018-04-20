"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./Errors");
var TransientResource_1 = require("./TransientResource");
var Utils_1 = require("./Utils");
exports.TransientFragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object.hasOwnProperty("_document");
    },
    is: function (object) {
        return TransientResource_1.TransientResource.is(object) &&
            exports.TransientFragment.isDecorated(object);
    },
    create: function (document, id) {
        return this.createFrom({}, document, id);
    },
    createFrom: function (object, document, id) {
        var fragment = exports.TransientFragment.decorate(object);
        if (id)
            fragment.id = id;
        fragment._document = document;
        return fragment;
    },
    decorate: function (object) {
        if (exports.TransientFragment.isDecorated(object))
            return object;
        TransientResource_1.TransientResource.decorate(object);
        var fragment = object;
        Object.defineProperties(fragment, {
            "_document": {
                writable: true,
                enumerable: false,
                configurable: true,
            },
            "resolve": {
                configurable: true,
                value: resolveFragment,
            },
        });
        return fragment;
    },
};
function resolveFragment() {
    throw new Errors_1.IllegalActionError("A fragment cannot be resolved by itself.");
}

//# sourceMappingURL=TransientFragment.js.map
