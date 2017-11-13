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
var iri_1 = require("sparqler/iri");
var tokens_1 = require("sparqler/tokens");
var NS_1 = require("../NS");
var ObjectSchema_1 = require("../ObjectSchema");
var Pointer = require("../Pointer");
var RDF_1 = require("../RDF");
var Utils_1 = require("../Utils");
var Tokens_1 = require("./Tokens");
var Class = (function () {
    function Class(jsonldConverter) {
        this.prefixesMap = new Map();
        this.jsonldConverter = jsonldConverter;
        this.addToken = new Tokens_1.AddToken();
        this.deleteToken = new Tokens_1.DeleteToken();
        this.updateLists = [];
    }
    Class.prototype.getPatch = function () {
        var patch = new Tokens_1.LDPatchToken();
        this.prefixesMap.forEach(function (prefix) { return patch.prologues.push(prefix); });
        (_a = patch.statements).push.apply(_a, this.updateLists);
        if (this.addToken.triples.length)
            patch.statements.push(this.addToken);
        if (this.deleteToken.triples.length)
            patch.statements.push(this.deleteToken);
        return "" + patch;
        var _a;
    };
    Class.prototype.addResource = function (schema, oldResource, newResource) {
        var _this = this;
        var id = newResource.id;
        var resource = iri_1.isBNodeLabel(id) ?
            new tokens_1.BlankNodeToken(id) : this.compactIRI(schema, id);
        var addTriples = new tokens_1.SubjectToken(resource);
        var deleteTriples = new tokens_1.SubjectToken(resource);
        new Set(Object.keys(oldResource).concat(Object.keys(newResource))).forEach(function (propertyName) {
            var predicateURI = _this.getPropertyIRI(schema, propertyName);
            var definition = schema.properties.get(propertyName);
            var oldValue = oldResource[propertyName];
            var newValue = newResource[propertyName];
            if (definition && definition.containerType === ObjectSchema_1.ContainerType.LIST && isValidValue(oldValue)) {
                if (!isValidValue(newValue)) {
                    _this.updateLists.push(new Tokens_1.UpdateListToken(resource, predicateURI, new Tokens_1.SliceToken(0), new tokens_1.CollectionToken()));
                    deleteTriples.addPredicate(new tokens_1.PredicateToken(predicateURI)
                        .addObject(new tokens_1.CollectionToken()));
                    return;
                }
                var tempDefinition = __assign({}, definition, { containerType: ObjectSchema_1.ContainerType.SET });
                var oldObjects = _this.getObjects(oldValue, schema, tempDefinition);
                var newObjects = _this.getObjects(newValue, schema, tempDefinition);
                getListDelta(oldObjects, newObjects).forEach(function (updateDelta) {
                    var collection = new tokens_1.CollectionToken();
                    updateDelta.objects.forEach(collection.addObject, collection);
                    _this.updateLists.push(new Tokens_1.UpdateListToken(resource, predicateURI, updateDelta.objects.length ?
                        new Tokens_1.SliceToken(updateDelta.slice[0], updateDelta.slice[0]) : new (Tokens_1.SliceToken.bind.apply(Tokens_1.SliceToken, [void 0].concat(updateDelta.slice)))(), collection));
                });
            }
            else {
                var oldObjects = _this.getObjects(oldValue, schema, definition);
                var newObjects = _this.getObjects(newValue, schema, definition);
                var setDelta = getArrayDelta(oldObjects, newObjects);
                var addValues = function (objects, triple) {
                    if (!objects.length)
                        return;
                    var predicate = new tokens_1.PredicateToken(predicateURI);
                    objects.forEach(predicate.addObject, predicate);
                    triple.addPredicate(predicate);
                };
                addValues(setDelta.toAdd, addTriples);
                addValues(setDelta.toDelete, deleteTriples);
            }
        });
        if (addTriples.predicates.length)
            this.addToken.triples.push(addTriples);
        if (deleteTriples.predicates.length)
            this.deleteToken.triples.push(deleteTriples);
    };
    Class.prototype.getPropertyIRI = function (schema, propertyName) {
        var uri = schema.properties.has(propertyName) ?
            schema.properties.get(propertyName).uri.stringValue :
            propertyName;
        return this.compactIRI(schema, uri);
    };
    Class.prototype.getObjects = function (value, schema, definition) {
        var values = (Array.isArray(value) ?
            !definition || definition.containerType !== null ? value : value.slice(0, 1) :
            [value]).filter(isValidValue);
        if (definition && definition.containerType === ObjectSchema_1.ContainerType.LIST) {
            if (!isValidValue(value))
                return [];
            var collection = new tokens_1.CollectionToken();
            (_a = collection.objects).push.apply(_a, this.expandValues(values, schema, definition));
            return [collection];
        }
        if (definition && definition.containerType === ObjectSchema_1.ContainerType.LANGUAGE) {
            return this.expandLanguageMap(values, schema);
        }
        return this.expandValues(values, schema, definition);
        var _a;
    };
    Class.prototype.expandValues = function (values, schema, definition) {
        var _this = this;
        var areDefinedLiteral = definition && definition.literal !== null ? definition.literal : null;
        return values.map(function (value) {
            var isLiteral = areDefinedLiteral !== null ? areDefinedLiteral : !Pointer.Factory.is(value);
            if (isLiteral)
                return _this.expandLiteral(value, schema, definition);
            return _this.expandPointer(value, schema);
        }).filter(isValidValue);
    };
    Class.prototype.expandLanguageMap = function (values, schema) {
        var _this = this;
        if (!values.length)
            return [];
        var languageMap = values[0];
        return Object.keys(languageMap).map(function (key) {
            var value = languageMap[key];
            var tempDefinition = new ObjectSchema_1.DigestedPropertyDefinition();
            tempDefinition.language = key;
            tempDefinition.literalType = new RDF_1.URI.Class(NS_1.XSD.DataType.string);
            return _this.expandLiteral(value, schema, tempDefinition);
        }).filter(isValidValue);
    };
    Class.prototype.expandPointer = function (value, schema) {
        var id = Pointer.Factory.is(value) ? value.id : value;
        if (!Utils_1.isString(id))
            return null;
        return iri_1.isBNodeLabel(id) ?
            new tokens_1.BlankNodeToken(id) :
            this.compactIRI(schema, id);
    };
    Class.prototype.expandLiteral = function (value, schema, definition) {
        var type = definition && definition.literalType ?
            definition.literalType.stringValue :
            guessType(value);
        if (!this.jsonldConverter.literalSerializers.has(type))
            return null;
        value = this.jsonldConverter.literalSerializers.get(type).serialize(value);
        var literal = new tokens_1.LiteralToken(value);
        if (type !== NS_1.XSD.DataType.string)
            literal.setType(this.compactIRI(schema, type));
        if (definition && definition.language !== void 0)
            literal.setLanguage(definition.language);
        return literal;
    };
    Class.prototype.compactIRI = function (schema, iri) {
        if (iri_1.isRelative(iri) && schema.vocab)
            iri = schema.vocab + iri;
        var matchPrefix = Array.from(schema.prefixes.entries())
            .find(function (_a) {
            var prefixURI = _a[1];
            return iri.startsWith(prefixURI.stringValue);
        });
        if (matchPrefix === void 0)
            return new tokens_1.IRIToken(iri);
        var namespace = matchPrefix[0], prefixIRI = matchPrefix[1].stringValue;
        if (!this.prefixesMap.has(namespace))
            this.prefixesMap.set(namespace, new Tokens_1.PrefixToken(namespace, new tokens_1.IRIToken(prefixIRI)));
        return new tokens_1.PrefixedNameToken(namespace, iri.substr(prefixIRI.length));
    };
    return Class;
}());
exports.Class = Class;
function guessType(value) {
    if (Utils_1.isFunction(value))
        return null;
    if (Utils_1.isString(value))
        return NS_1.XSD.DataType.string;
    if (Utils_1.isDate(value))
        return NS_1.XSD.DataType.dateTime;
    if (Utils_1.isNumber(value))
        return NS_1.XSD.DataType.float;
    if (Utils_1.isBoolean(value))
        return NS_1.XSD.DataType.boolean;
    return null;
}
function getArrayDelta(oldValues, newValues) {
    var objectMapper = function (object) { return ["" + object, object]; };
    var toAdd = new Map(newValues.map(objectMapper));
    var toDelete = new Map(oldValues.map(objectMapper));
    toAdd.forEach(function (value, identifier) {
        if (!toDelete.has(identifier))
            return;
        toDelete.delete(identifier);
        toAdd.delete(identifier);
    });
    return {
        toAdd: Array.from(toAdd.values()),
        toDelete: Array.from(toDelete.values()),
    };
}
function getListDelta(oldValues, newValues) {
    var nodeMapper = function (object, index) { return ({
        identifier: "" + object,
        object: object,
        index: index,
    }); };
    var oldPositions = oldValues.map(nodeMapper);
    var newPositions = newValues.map(nodeMapper);
    var addsSet = new Set(newPositions);
    var deletes = [];
    var offset = 0;
    var remnants = newPositions;
    oldPositions.forEach(function (oldNode) {
        var currentIndex = remnants.findIndex(function (newNode) { return newNode.identifier === oldNode.identifier; });
        if (currentIndex === -1) {
            oldNode.index -= offset++;
            deletes.push(oldNode);
        }
        else {
            addsSet.delete(remnants[currentIndex]);
            remnants = remnants.slice(currentIndex + 1);
        }
    });
    var updates = [];
    var last;
    deletes.forEach(function (node) {
        if (last && last.slice[0] === node.index) {
            last.slice = [last.slice[0], last.slice[1] + 1];
            return;
        }
        updates.push(last = {
            slice: [node.index, node.index + 1],
            objects: [],
        });
    });
    last = void 0;
    addsSet.forEach(function (node) {
        if (last && last.slice[1] === node.index) {
            last.slice = [last.slice[0], node.index + 1];
            last.objects.push(node.object);
            return;
        }
        updates.push(last = {
            slice: [node.index, node.index + 1],
            objects: [node.object],
        });
    });
    return updates;
}
function isValidValue(value) {
    return value !== null && value !== void 0;
}
exports.default = Class;

//# sourceMappingURL=DeltaCreator.js.map
