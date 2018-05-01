"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("../../Fragment");
var Vocabularies_1 = require("../../Vocabularies");
exports.TransientACE = {
    TYPE: Vocabularies_1.CS.AccessControlEntry,
    is: function (value) {
        return Fragment_1.TransientFragment.is(value)
            && value.hasOwnProperty("granting")
            && value.hasOwnProperty("permissions")
            && value.hasOwnProperty("subjects")
            && value.hasOwnProperty("subjectsClass");
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientACE.createFrom(copy);
    },
    createFrom: function (object) {
        Fragment_1.TransientFragment.decorate(object);
        var ace = object;
        ace.addType(exports.TransientACE.TYPE);
        return ace;
    },
};

//# sourceMappingURL=TransientACE.js.map
