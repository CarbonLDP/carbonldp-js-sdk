"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Resource_1 = require("./Resource");
var Utils_1 = require("./Utils");
exports.Fragment = {
    isDecorated: function (object) {
        return Utils_1.isObject(object) &&
            object.hasOwnProperty("_document");
    },
    is: function (object) {
        return Resource_1.Resource.is(object) &&
            exports.Fragment.isDecorated(object);
    },
    create: function (document, id) {
        return this.createFrom({}, document, id);
    },
    createFrom: function (object, document, id) {
        var fragment = exports.Fragment.decorate(object);
        if (id)
            fragment.id = id;
        fragment._document = document;
        return fragment;
    },
    decorate: function (object) {
        if (exports.Fragment.isDecorated(object))
            return object;
        Resource_1.Resource.decorate(object);
        var fragment = object;
        Object.defineProperties(fragment, {
            "_document": {
                writable: true,
                enumerable: false,
                configurable: true,
            },
        });
        return fragment;
    },
};

//# sourceMappingURL=Fragment.js.map
