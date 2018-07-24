"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var tokens_1 = require("sparqler/tokens");
var Utils_1 = require("../JSONLD/Utils");
var ContainerType_1 = require("../ObjectSchema/ContainerType");
var DigestedObjectSchemaProperty_1 = require("../ObjectSchema/DigestedObjectSchemaProperty");
var PointerType_1 = require("../ObjectSchema/PointerType");
var Pointer_1 = require("../Pointer/Pointer");
var Utils_2 = require("../Utils");
var XSD_1 = require("../Vocabularies/XSD");
var Tokens_1 = require("./Tokens");
var typesDefinition = new DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty();
typesDefinition.literal = false;
typesDefinition.pointerType = PointerType_1.PointerType.ID;
typesDefinition.containerType = ContainerType_1.ContainerType.SET;
var DeltaCreator = (function () {
    function DeltaCreator(context) {
        this.prefixesMap = new Map();
        this.context = context;
        this.addToken = new Tokens_1.AddToken();
        this.deleteToken = new Tokens_1.DeleteToken();
        this.updateLists = [];
    }
    DeltaCreator.prototype.getPatch = function () {
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
    DeltaCreator.prototype.addResource = function (id, previousResource, currentResource) {
        var _this = this;
        var schema = this.__getSchema(id, previousResource, currentResource);
        var resource = iri_1.isBNodeLabel(id) ?
            new tokens_1.BlankNodeToken(id) : this.__compactIRI(schema, id);
        var updateLists = [];
        var addTriples = new tokens_1.SubjectToken(resource);
        var deleteTriples = new tokens_1.SubjectToken(resource);
        new Set([
            "types"
        ].concat(Object.keys(previousResource), Object.keys(currentResource))).forEach(function (propertyName) {
            if (propertyName === "$id")
                return;
            var predicateURI = propertyName === "types" ?
                "a" : _this._getPropertyIRI(schema, propertyName);
            var definition = predicateURI === "a" ?
                typesDefinition : schema.getProperty(propertyName);
            var oldValue = previousResource[propertyName];
            var newValue = currentResource[propertyName];
            if (definition && definition.containerType === ContainerType_1.ContainerType.LIST && __isValidValue(oldValue)) {
                var listUpdates = [];
                if (!__isValidValue(newValue)) {
                    deleteTriples.addPredicate(new tokens_1.PredicateToken(predicateURI).addObject(new tokens_1.CollectionToken()));
                    listUpdates.push({ slice: [0, void 0], objects: [] });
                }
                else {
                    definition.containerType = ContainerType_1.ContainerType.SET;
                    listUpdates.push.apply(listUpdates, __getListDelta(_this.__getObjects(oldValue, schema, definition), _this.__getObjects(newValue, schema, definition)));
                }
                if (!listUpdates.length)
                    return;
                _this.__addPrefixFrom(predicateURI, schema);
                listUpdates.forEach(function (updateDelta) {
                    var collection = new tokens_1.CollectionToken();
                    updateDelta.objects.forEach(function (object) {
                        collection.addObject(object);
                        _this.__addPrefixFrom(object, schema);
                    });
                    updateLists.push(new Tokens_1.UpdateListToken(resource, predicateURI, updateDelta.objects.length ?
                        new Tokens_1.SliceToken(updateDelta.slice[0], updateDelta.slice[0]) : new (Tokens_1.SliceToken.bind.apply(Tokens_1.SliceToken, [void 0].concat(updateDelta.slice)))(), collection));
                });
            }
            else {
                var oldObjects = _this.__getObjects(oldValue, schema, definition);
                var newObjects = _this.__getObjects(newValue, schema, definition);
                var setDelta = __getArrayDelta(oldObjects, newObjects);
                var addValues = function (objects, triple) {
                    if (!objects.length)
                        return;
                    var predicate = new tokens_1.PredicateToken(predicateURI);
                    objects.forEach(function (object) {
                        predicate.addObject(object);
                        _this.__addPrefixFrom(object, schema);
                    });
                    triple.addPredicate(predicate);
                };
                addValues(setDelta.toAdd, addTriples);
                addValues(setDelta.toDelete, deleteTriples);
            }
        });
        (_a = this.updateLists).push.apply(_a, updateLists);
        if (addTriples.predicates.length)
            this.addToken.triples.push(addTriples);
        if (deleteTriples.predicates.length)
            this.deleteToken.triples.push(deleteTriples);
        var predicates = updateLists.concat(addTriples.predicates, deleteTriples.predicates);
        if (!predicates.length)
            return;
        this.__addPrefixFrom(resource, schema);
        predicates.forEach(function (x) { return _this.__addPrefixFrom(x.predicate, schema); });
        var _a;
    };
    DeltaCreator.prototype.__getSchema = function (id, previousResource, currentResource) {
        var types = new Set();
        if ("types" in previousResource)
            previousResource
                .types.forEach(types.add, types);
        if ("types" in currentResource)
            currentResource
                .types.forEach(types.add, types);
        var mergeResource = {
            $id: id,
            types: Array.from(types),
            _queryableMetadata: currentResource._queryableMetadata || previousResource._queryableMetadata,
        };
        return this.context
            .registry.getSchemaFor(mergeResource);
    };
    DeltaCreator.prototype._getPropertyIRI = function (schema, propertyName) {
        var propertyDefinition = schema.properties.get(propertyName);
        var uri = propertyDefinition && propertyDefinition.uri ?
            propertyDefinition.uri :
            propertyName;
        return this.__compactIRI(schema, uri);
    };
    DeltaCreator.prototype.__getObjects = function (value, schema, definition) {
        var values = (Array.isArray(value) ?
            !definition || definition.containerType !== null ? value : value.slice(0, 1) :
            [value]).filter(__isValidValue);
        if (definition && definition.containerType === ContainerType_1.ContainerType.LIST) {
            if (!__isValidValue(value))
                return [];
            var collection = new tokens_1.CollectionToken();
            (_a = collection.objects).push.apply(_a, this.__expandValues(values, schema, definition));
            return [collection];
        }
        if (definition && definition.containerType === ContainerType_1.ContainerType.LANGUAGE) {
            return this.__expandLanguageMap(values, schema);
        }
        return this.__expandValues(values, schema, definition);
        var _a;
    };
    DeltaCreator.prototype.__expandValues = function (values, schema, definition) {
        var _this = this;
        var areDefinedLiteral = definition && definition.literal !== null ? definition.literal : null;
        return values.map(function (value) {
            var isLiteral = areDefinedLiteral !== null ? areDefinedLiteral : !Pointer_1.Pointer.is(value);
            if (isLiteral)
                return _this.__expandLiteral(value, schema, definition);
            return _this.__expandPointer(value, schema);
        }).filter(__isValidValue);
    };
    DeltaCreator.prototype.__expandLanguageMap = function (values, schema) {
        var _this = this;
        if (!values.length)
            return [];
        var languageMap = values[0];
        return Object.keys(languageMap).map(function (key) {
            var value = languageMap[key];
            var tempDefinition = new DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty();
            tempDefinition.language = key;
            tempDefinition.literalType = XSD_1.XSD.string;
            return _this.__expandLiteral(value, schema, tempDefinition);
        }).filter(__isValidValue);
    };
    DeltaCreator.prototype.__expandPointer = function (value, schema) {
        var id = Pointer_1.Pointer.is(value) ? value.$id : value;
        if (!Utils_2.isString(id))
            return null;
        return iri_1.isBNodeLabel(id) ?
            new tokens_1.BlankNodeToken(id) :
            this.__compactIRI(schema, id);
    };
    DeltaCreator.prototype.__expandLiteral = function (value, schema, definition) {
        var type = definition && definition.literalType ?
            definition.literalType :
            Utils_1._guessXSDType(value);
        if (!this.context.jsonldConverter.literalSerializers.has(type))
            return null;
        value = this.context.jsonldConverter.literalSerializers.get(type).serialize(value);
        var literal = new tokens_1.LiteralToken(value);
        if (type !== XSD_1.XSD.string)
            literal.setType(this.__compactIRI(schema, type));
        if (definition && definition.language !== void 0)
            literal.setLanguage(definition.language);
        return literal;
    };
    DeltaCreator.prototype.__compactIRI = function (schema, iri) {
        iri = schema.resolveURI(iri, { vocab: true });
        var matchPrefix = Array.from(schema.prefixes.entries())
            .find(function (_a) {
            var prefixURI = _a[1];
            return iri.startsWith(prefixURI);
        });
        if (!matchPrefix)
            return new tokens_1.IRIToken(iri);
        return new tokens_1.PrefixedNameToken(matchPrefix[0], iri.substr(matchPrefix[1].length));
    };
    DeltaCreator.prototype.__addPrefixFrom = function (object, schema) {
        var _this = this;
        if (object instanceof tokens_1.CollectionToken)
            return object.objects.forEach(function (collectionObject) {
                _this.__addPrefixFrom(collectionObject, schema);
            });
        if (object instanceof tokens_1.LiteralToken)
            return this.__addPrefixFrom(object.type, schema);
        if (!(object instanceof tokens_1.PrefixedNameToken))
            return;
        var namespace = object.namespace;
        if (this.prefixesMap.has(namespace))
            return;
        var iri = schema.prefixes.get(namespace);
        this.prefixesMap.set(namespace, new Tokens_1.PrefixToken(namespace, new tokens_1.IRIToken(iri)));
    };
    return DeltaCreator;
}());
exports.DeltaCreator = DeltaCreator;
function __getArrayDelta(oldValues, newValues) {
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
function __getListDelta(oldValues, newValues) {
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
function __isValidValue(value) {
    return value !== null && value !== void 0;
}

//# sourceMappingURL=DeltaCreator.js.map
