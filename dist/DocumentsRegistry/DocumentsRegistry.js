"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("../Document/Document");
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var GeneralRegistry_1 = require("../GeneralRegistry/GeneralRegistry");
var ModelDecorator_1 = require("../Model/ModelDecorator");
var URI_1 = require("../RDF/URI");
exports.DocumentsRegistry = {
    PROTOTYPE: {
        register: function (id) {
            return this.getPointer(id, true);
        },
        _getLocalID: function (id) {
            if (URI_1.URI.hasFragment(id))
                throw new IllegalArgumentError_1.IllegalArgumentError("\"" + id + "\" is out of scope.");
            return GeneralRegistry_1.GeneralRegistry.PROTOTYPE._getLocalID.call(this, id);
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.DocumentsRegistry.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.DocumentsRegistry.isDecorated(object))
            return object;
        var base = Object.assign(object, {
            __modelDecorator: Document_1.Document,
        });
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(base, GeneralRegistry_1.GeneralRegistry);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.DocumentsRegistry.PROTOTYPE, target);
    },
    create: function (data) {
        return exports.DocumentsRegistry.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        var registry = exports.DocumentsRegistry.decorate(object);
        return GeneralRegistry_1.GeneralRegistry.createFrom(registry);
    },
};

//# sourceMappingURL=DocumentsRegistry.js.map
