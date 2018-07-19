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
var ModelDecorator_1 = require("../Model/ModelDecorator");
var Utils_1 = require("../Utils");
var EventEmitterDocumentsRepositoryTrait_1 = require("./Traits/EventEmitterDocumentsRepositoryTrait");
var QueryableDocumentsRepositoryTrait_1 = require("./Traits/QueryableDocumentsRepositoryTrait");
var SPARQLDocumentsRepositoryTrait_1 = require("./Traits/SPARQLDocumentsRepositoryTrait");
exports.DocumentsRepository = {
    create: function (data) {
        return exports.DocumentsRepository.createFrom(__assign({}, data));
    },
    createFrom: function (object) {
        return ModelDecorator_1.ModelDecorator
            .decorateMultiple(object, QueryableDocumentsRepositoryTrait_1.QueryableDocumentsRepositoryTrait, SPARQLDocumentsRepositoryTrait_1.SPARQLDocumentsRepositoryTrait, EventEmitterDocumentsRepositoryTrait_1.EventEmitterDocumentsRepositoryTrait);
    },
    is: function (value) {
        return Utils_1.isObject(value)
            && QueryableDocumentsRepositoryTrait_1.QueryableDocumentsRepositoryTrait.isDecorated(value)
            && SPARQLDocumentsRepositoryTrait_1.SPARQLDocumentsRepositoryTrait.isDecorated(value)
            && EventEmitterDocumentsRepositoryTrait_1.EventEmitterDocumentsRepositoryTrait.isDecorated(value);
    },
};

//# sourceMappingURL=DocumentsRepository.js.map
