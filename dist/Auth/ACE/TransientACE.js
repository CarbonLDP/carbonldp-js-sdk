"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fragment_1 = require("../../Fragment");
var Vocabularies_1 = require("../../Vocabularies");
exports.TransientACE = {
    TYPE: Vocabularies_1.CS.AccessControlEntry,
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientACE.createFrom(copy);
    },
    createFrom: function (object) {
        var ace = Fragment_1.TransientFragment.decorate(object);
        ace.addType(exports.TransientACE.TYPE);
        return ace;
    },
};

//# sourceMappingURL=TransientACE.js.map
