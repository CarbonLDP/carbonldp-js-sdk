"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("./Errors/IllegalArgumentError");
var PersistedProtectedDocument_1 = require("./PersistedProtectedDocument");
var URI_1 = require("./RDF/URI");
var Utils_1 = require("./Utils");
exports.Endpoint = {
    isDecorated: function (object) {
        return Utils_1.isObject(object)
            && object.hasOwnProperty("_ModelFactory")
            && object["get"] === get
            && object["createChild"] === createChild
            && object["createChildren"] === createChildren
            && object["createChildAndRetrieve"] === createChildAndRetrieve
            && object["createChildrenAndRetrieve"] === createChildrenAndRetrieve
            && object["listChildren"] === listChildren
            && object["listMembers"] === listMembers
            && object["getChildren"] === getChildren
            && object["getMembers"] === getMembers
            && object["delete"] === deleteChild;
    },
    decorate: function (object, documents) {
        if (exports.Endpoint.isDecorated(object))
            return object;
        PersistedProtectedDocument_1.PersistedProtectedDocument.decorate(object, documents);
        return Object.defineProperties(object, {
            "_ModelFactory": {
                configurable: true,
            },
            "get": {
                configurable: true,
                value: get,
            },
            "createChild": {
                configurable: true,
                value: createChild,
            },
            "createChildren": {
                configurable: true,
                value: createChildren,
            },
            "createChildAndRetrieve": {
                configurable: true,
                value: createChildAndRetrieve,
            },
            "createChildrenAndRetrieve": {
                configurable: true,
                value: createChildrenAndRetrieve,
            },
            "listChildren": {
                configurable: true,
                value: listChildren,
            },
            "listMembers": {
                configurable: true,
                value: listMembers,
            },
            "getChildren": {
                configurable: true,
                value: getChildren,
            },
            "getMembers": {
                configurable: true,
                value: getMembers,
            },
            "delete": {
                configurable: true,
                value: deleteChild,
            },
        });
    },
    resolveEndpointURI: function (endpoint, relativeURI) {
        return Utils_1.promiseMethod(function () {
            if (!URI_1.URI.isBaseOf(endpoint.id, relativeURI))
                throw new IllegalArgumentError_1.IllegalArgumentError("The URI \"" + relativeURI + "\" isn't a child of \"" + endpoint.id + "\".");
            return URI_1.URI.resolve(endpoint.id, relativeURI);
        });
    },
    resolveChildBase: function (endpoint, objects) {
        return Utils_1.promiseMethod(function () {
            if (!endpoint._ModelFactory || !endpoint._ModelFactory.validateBase)
                return objects;
            if (!Array.isArray(objects)) {
                if (endpoint._ModelFactory.validateBase(objects))
                    return objects;
                throw new IllegalArgumentError_1.IllegalArgumentError("Invalid base child object for the \"" + endpoint.id + "\" endpoint.");
            }
            if (objects.every(function (object) { return endpoint._ModelFactory.validateBase(object); }))
                return objects;
            throw new IllegalArgumentError_1.IllegalArgumentError("Invalid base child objects for the \"" + endpoint.id + "\" endpoint.");
        });
    },
    decorateEndpointChild: function (endpoint, documents) {
        if (!endpoint._ModelFactory || !endpoint._ModelFactory.decorate)
            return documents;
        if (!Array.isArray(documents))
            return endpoint._ModelFactory.decorate(documents, endpoint._documents);
        return documents
            .map(function (document) { return endpoint._ModelFactory.decorate(document, endpoint._documents); });
    },
};
function get(relativeURI, optionsOrQueryBuilderFn, queryBuilderFn) {
    var _this = this;
    return exports.Endpoint
        .resolveEndpointURI(this, relativeURI)
        .then(function (absoluteURI) { return _this._documents
        .get(absoluteURI, optionsOrQueryBuilderFn, queryBuilderFn); })
        .then(function (document) { return exports.Endpoint.decorateEndpointChild(_this, document); });
}
function createChild(child, slugOrRequestOptions, requestOptions) {
    var _this = this;
    return exports.Endpoint
        .resolveChildBase(this, child)
        .then(function (base) { return _this._documents
        .createChild(_this.id, base, slugOrRequestOptions, requestOptions); })
        .then(function (document) { return exports.Endpoint.decorateEndpointChild(_this, document); });
}
function createChildren(children, slugsOrRequestOptions, requestOptions) {
    var _this = this;
    return exports.Endpoint
        .resolveChildBase(this, children)
        .then(function (bases) { return _this._documents
        .createChildren(_this.id, bases, slugsOrRequestOptions, requestOptions); })
        .then(function (documents) { return exports.Endpoint.decorateEndpointChild(_this, documents); });
}
function createChildAndRetrieve(child, slugOrRequestOptions, requestOptions) {
    var _this = this;
    return exports.Endpoint
        .resolveChildBase(this, child)
        .then(function (base) { return _this._documents
        .createChildAndRetrieve(_this.id, base, slugOrRequestOptions, requestOptions); })
        .then(function (document) { return exports.Endpoint.decorateEndpointChild(_this, document); });
}
function createChildrenAndRetrieve(children, slugsOrRequestOptions, requestOptions) {
    var _this = this;
    return exports.Endpoint
        .resolveChildBase(this, children)
        .then(function (bases) { return _this._documents
        .createChildrenAndRetrieve(_this.id, bases, slugsOrRequestOptions, requestOptions); })
        .then(function (documents) { return exports.Endpoint.decorateEndpointChild(_this, documents); });
}
function listChildren(requestOptions) {
    var _this = this;
    return this._documents
        .listChildren(this.id, requestOptions)
        .then(function (documents) { return exports.Endpoint.decorateEndpointChild(_this, documents); });
}
function listMembers(requestOptions) {
    var _this = this;
    return this._documents
        .listMembers(this.id, requestOptions)
        .then(function (documents) { return exports.Endpoint.decorateEndpointChild(_this, documents); });
}
function getChildren(requestOptionsOrQueryBuilderFn, queryBuilderFn) {
    var _this = this;
    return this._documents
        .getChildren(this.id, requestOptionsOrQueryBuilderFn, queryBuilderFn)
        .then(function (documents) { return exports.Endpoint.decorateEndpointChild(_this, documents); });
}
function getMembers(requestOptionsOrQueryBuilderFn, childrenQuery) {
    var _this = this;
    return this._documents
        .getMembers(this.id, requestOptionsOrQueryBuilderFn, childrenQuery)
        .then(function (documents) { return exports.Endpoint.decorateEndpointChild(_this, documents); });
}
function deleteChild(relativeURIOrOptions, requestOptions) {
    var _this = this;
    var relativeURI = Utils_1.isString(relativeURIOrOptions) ? relativeURIOrOptions : "";
    if (Utils_1.isObject(relativeURIOrOptions))
        requestOptions = relativeURIOrOptions;
    return exports.Endpoint
        .resolveEndpointURI(this, relativeURI)
        .then(function (uri) { return _this._documents
        .delete(uri, requestOptions); });
}

//# sourceMappingURL=Endpoint.js.map
