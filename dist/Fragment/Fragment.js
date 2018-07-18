"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = require("../Model/ModelDecorator");
var QueryablePointer_1 = require("../QueryDocuments/QueryablePointer");
var TransientFragment_1 = require("./TransientFragment");
exports.Fragment = {
    PROTOTYPE: {
        get $repository() {
            return this.$registry;
        },
        set $repository(document) {
            this.$registry = document;
        },
        get _resolved() {
            return this.$document._resolved;
        },
        set _resolved(_value) { },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.Fragment.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Fragment.isDecorated(object))
            return object;
        var forced = Object.assign(object, {
            $document: object.$registry,
            $repository: object.$registry,
        });
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(forced, TransientFragment_1.TransientFragment, QueryablePointer_1.QueryablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Fragment.PROTOTYPE, target);
    },
    create: TransientFragment_1.TransientFragment.create,
    createFrom: TransientFragment_1.TransientFragment.createFrom,
};

//# sourceMappingURL=Fragment.js.map
