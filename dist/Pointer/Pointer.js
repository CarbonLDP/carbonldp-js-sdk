"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelDecorator_1 = require("../Model/ModelDecorator");
var Utils_1 = require("../Utils");
exports.Pointer = {
    PROTOTYPE: {
        get $id() { return ""; },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.Pointer.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.Pointer.isDecorated(object))
            return object;
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.Pointer.PROTOTYPE, object);
    },
    is: function (value) {
        return Utils_1.isObject(value)
            && exports.Pointer.isDecorated(value);
    },
    create: function (data) {
        var clone = Object.assign({}, data);
        return exports.Pointer.createFrom(clone);
    },
    createFrom: function (object) {
        return exports.Pointer.decorate(object);
    },
    areEqual: function (pointer1, pointer2) {
        return pointer1.$id === pointer2.$id;
    },
    getIDs: function (pointers) {
        return pointers
            .map(function (pointer) { return pointer.$id; });
    },
    getID: function (pointerOrIRI) {
        return Utils_1.isObject(pointerOrIRI) ? pointerOrIRI.$id : pointerOrIRI;
    },
};

//# sourceMappingURL=Pointer.js.map
