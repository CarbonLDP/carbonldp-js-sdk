"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("../../DocumentsRepository/Utils");
var ModelDecorator_1 = require("../../Model/ModelDecorator");
var QueryablePointer_1 = require("../../QueryDocuments/QueryablePointer");
var LDPDocumentTrait_1 = require("./LDPDocumentTrait");
exports.QueryableDocumentTrait = {
    PROTOTYPE: {
        getChildren: function (uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrQueryBuilderFnOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).getChildren.apply(_a, [_uri].concat(_args));
        },
        getMembers: function (uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrQueryBuilderFnOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).getMembers.apply(_a, [_uri].concat(_args));
        },
        listChildren: function (uriOrOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).listChildren.apply(_a, [_uri].concat(_args));
        },
        listMembers: function (uriOrOptions, requestOptions) {
            var _a;
            var _b = Utils_1._parseURIParams(this, uriOrOptions, arguments), _uri = _b._uri, _args = _b._args;
            return (_a = this.$repository).listMembers.apply(_a, [_uri].concat(_args));
        },
    },
    isDecorated: function (object) {
        return ModelDecorator_1.ModelDecorator
            .hasPropertiesFrom(exports.QueryableDocumentTrait.PROTOTYPE, object);
    },
    decorate: function (object) {
        if (exports.QueryableDocumentTrait.isDecorated(object))
            return object;
        var forced = object;
        var target = ModelDecorator_1.ModelDecorator
            .decorateMultiple(forced, LDPDocumentTrait_1.LDPDocumentTrait, QueryablePointer_1.QueryablePointer);
        return ModelDecorator_1.ModelDecorator
            .definePropertiesFrom(exports.QueryableDocumentTrait.PROTOTYPE, target);
    },
};

//# sourceMappingURL=QueryableDocumentTrait.js.map
