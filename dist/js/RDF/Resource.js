/// <reference path="../../typings/es6/es6.d.ts" />
var Literal = require("./Literal");
var Utils = require("./../Utils");
var RDFNode = require("./RDFNode");
function hasProperty(propertyURI) {
    return Utils.hasProperty(this, propertyURI);
}
function getProperty(propertyURI) {
    var values = this.getProperties(propertyURI);
    return values[0];
}
function getPropertyValue(propertyURI) {
    var propertyObject = this.getProperty(propertyURI);
    if (Utils.isNull(propertyObject))
        return null;
    if (!Literal.Factory.is(propertyObject))
        return null;
    return Literal.Factory.parse(propertyObject);
}
function getPropertyURI(propertyURI) {
    var value = this.getProperty(propertyURI);
    if (Utils.isNull(value))
        return null;
    if (!Utils.hasProperty(value, "@id"))
        return null;
    return value["@id"];
}
function getProperties(propertyURI) {
    if (!this.hasProperty(propertyURI))
        return [];
    return Utils.isArray(this[propertyURI]) ? this[propertyURI] : [this[propertyURI]];
}
function getPropertyValues(propertyURI) {
    var values = [];
    if (this.hasProperty(propertyURI)) {
        var propertyArray = this.getProperties(propertyURI);
        for (var i = 0, length_1 = propertyArray.length; i < length_1; i++) {
            var value = propertyArray[i];
            if (Literal.Factory.is(value))
                values.push(Literal.Factory.parse(value));
        }
    }
    values = tieArray(this, propertyURI, values);
    return values;
}
function getPropertyURIs(propertyURI) {
    var uris = [];
    if (this.hasProperty(propertyURI)) {
        var values = this.getProperties(propertyURI);
        for (var i = 0, length_2 = values.length; i < length_2; i++) {
            var value = values[i];
            if (Utils.hasProperty(value, "@id"))
                uris.push(value["@id"]);
        }
    }
    uris = tieArray(this, propertyURI, uris);
    return uris;
}
function addProperty(propertyURI, value) {
    var propertyArray = this.getProperties(propertyURI);
    var propertyValue;
    if (RDFNode.Factory.is(value)) {
        propertyValue = {
            "@id": value["@id"]
        };
    }
    else
        propertyValue = Literal.Factory.from(value);
    var callbacks = this._propertyAddedCallbacks;
    for (var i = 0, length_3 = callbacks.length; i < length_3; i++) {
        var callback = callbacks[i];
        callback.call(this, propertyURI, propertyValue);
    }
    propertyArray.push(propertyValue);
    this[propertyURI] = propertyArray;
}
function setProperty(propertyURI, value) {
    this.deleteProperty(propertyURI);
    if (Utils.isNull(value))
        return;
    this.addProperty(propertyURI, value);
}
function deleteProperty(propertyURI) {
    var callbacks = this._propertyDeletedCallbacks;
    for (var i = 0, length_4 = callbacks.length; i < length_4; i++) {
        var callback = callbacks[i];
        callback.call(this, propertyURI);
    }
    delete this[propertyURI];
}
function tieArray(resource, property, array) {
    array.push = (function () {
        return function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            for (var i = 0, length_5 = items.length; i < length_5; i++) {
                resource.addProperty(property, items[i]);
            }
            return Array.prototype.push.call(array, items);
        };
    })();
    // TODO: concat
    // TODO: join
    // TODO: pop
    // TODO: reverse
    // TODO: shift
    // TODO: slice
    // TODO: sort
    // TODO: splice
    // TODO: unshift
    return array;
}
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "_propertyAddedCallbacks") &&
            Utils.hasPropertyDefined(resource, "_propertyDeletedCallbacks") &&
            Utils.hasPropertyDefined(resource, "uri") &&
            Utils.hasPropertyDefined(resource, "types") &&
            Utils.hasFunction(resource, "hasProperty") &&
            Utils.hasFunction(resource, "getProperty") &&
            Utils.hasFunction(resource, "getPropertyValue") &&
            Utils.hasFunction(resource, "getPropertyURI") &&
            Utils.hasFunction(resource, "getProperties") &&
            Utils.hasFunction(resource, "getPropertyValues") &&
            Utils.hasFunction(resource, "getPropertyURIs") &&
            Utils.hasFunction(resource, "addProperty") &&
            Utils.hasFunction(resource, "setProperty") &&
            Utils.hasFunction(resource, "deleteProperty"));
    };
    Factory.injectDefinitions = function (resourceOrResources, definitions) {
        var resources = Utils.isArray(resourceOrResources) ? resourceOrResources : [resourceOrResources];
        for (var i = 0, length_6 = resources.length; i < length_6; i++) {
            var resource = resources[i];
            for (var j = 0, length_7 = resource.types.length; i < length_7; j++) {
                var type = resource.types[i];
                var descriptions = new Map();
                if (definitions.has(type)) {
                    Utils.M.extend(descriptions, definitions.get(type));
                }
                if (descriptions.size() !== 0)
                    Factory.injectDescriptions(resource, descriptions);
            }
        }
        if (Utils.isArray(resourceOrResources))
            return resources;
        return resources[0];
    };
    Factory.injectDescriptions = function (resourceOrResources, descriptionsMapOrObject) {
        var resources = Utils.isArray(resourceOrResources) ? resourceOrResources : [resourceOrResources];
        var descriptions;
        if (Utils.isMap(descriptionsMapOrObject)) {
            descriptions = descriptionsMapOrObject;
        }
        else if (Utils.isObject(descriptionsMapOrObject)) {
            descriptions = Utils.M.from(descriptionsMapOrObject);
        }
        else
            throw new Error("IllegalArgument");
        for (var i = 0, length_8 = resources.length; i < length_8; i++) {
            var resource = resources[i];
            var descriptionNames = descriptions.keys();
            var next = descriptionNames.next();
            while (!next.done) {
                var name_1 = next.value;
                var description = descriptions.get(name_1);
                var getter = void 0, setter = void 0;
                if (Utils.isNull(description.literal)) {
                    // The type isn't known, inject generic versions
                    if (description.multi) {
                        getter = Factory.genericMultipleGetter(description);
                    }
                    else
                        getter = Factory.genericGetter(description);
                }
                else if (!description.literal) {
                    if (description.multi) {
                        getter = Factory.urisGetter(description);
                    }
                    else
                        getter = Factory.uriGetter(description);
                }
                else {
                    if (description.multi) {
                        getter = Factory.literalsGetter(description);
                    }
                    else
                        getter = Factory.literalGetter(description);
                }
                setter = Factory.setter(description);
                Object.defineProperty(resource, name_1, {
                    enumerable: false,
                    get: getter,
                    set: setter
                });
                next = descriptionNames.next();
            }
        }
        if (Utils.isArray(resourceOrResources))
            return resources;
        return resources[0];
    };
    Factory.genericGetter = function (description) {
        var uri = description.uri;
        return function () {
            return this.getProperty(uri);
        };
    };
    Factory.genericMultipleGetter = function (description) {
        var uri = description.uri;
        return function () {
            return this.getProperties(uri);
        };
    };
    Factory.uriGetter = function (description) {
        var uri = description.uri;
        return function () {
            return this.getPropertyURI(uri);
        };
    };
    Factory.urisGetter = function (description) {
        var uri = description.uri;
        return function () {
            return this.getPropertyURIs(uri);
        };
    };
    Factory.literalGetter = function (description) {
        var uri = description.uri;
        return function () {
            return this.getPropertyValue(uri);
        };
    };
    Factory.literalsGetter = function (description) {
        var uri = description.uri;
        return function () {
            return this.getPropertyValues(uri);
        };
    };
    Factory.setter = function (description) {
        var uri = description.uri;
        return function (value) {
            this.setProperty(uri, value);
        };
    };
    Factory.prototype.is = function (value) {
        return (
        // RDFNode.Factory.is( value ) &&
        (!Utils.isNull(value)) &&
            Utils.isObject(value) &&
            Factory.hasClassProperties(value));
    };
    Factory.prototype.create = function () {
        var resource = {};
        return this.from(resource);
    };
    Factory.prototype.from = function (objects) {
        if (!Utils.isArray(objects))
            return this.singleFrom(objects);
        for (var i = 0, length_9 = objects.length; i < length_9; i++) {
            var resource = objects[i];
            this.injectBehavior(resource);
        }
        return objects;
    };
    Factory.prototype.singleFrom = function (object) {
        return this.injectBehavior(object);
    };
    Factory.prototype.hasRDFClass = function (resource) {
        // TODO: Implement
        return true;
    };
    Factory.prototype.injectBehavior = function (node) {
        var resource = node;
        if (Factory.hasClassProperties(resource))
            return resource;
        Object.defineProperties(resource, {
            "_propertyAddedCallbacks": {
                writable: false,
                enumerable: false,
                value: []
            },
            "_propertyDeletedCallbacks": {
                writable: false,
                enumerable: false,
                value: []
            },
            "types": {
                get: function () {
                    if (!this["@type"])
                        this["@type"] = [];
                    return this["@type"];
                },
                set: function (value) {
                    // TODO: Implement
                },
                enumerable: false
            },
            "uri": {
                get: function () {
                    return this["@id"];
                },
                set: function (value) {
                    this["@id"] = value;
                },
                enumerable: false
            },
            "hasProperty": {
                writable: false,
                enumerable: false,
                value: hasProperty
            },
            "getProperty": {
                writable: false,
                enumerable: false,
                value: getProperty
            },
            "getPropertyValue": {
                writable: false,
                enumerable: false,
                value: getPropertyValue
            },
            "getPropertyURI": {
                writable: false,
                enumerable: false,
                value: getPropertyURI
            },
            "getProperties": {
                writable: false,
                enumerable: false,
                value: getProperties
            },
            "getPropertyValues": {
                writable: false,
                enumerable: false,
                value: getPropertyValues
            },
            "getPropertyURIs": {
                writable: false,
                enumerable: false,
                value: getPropertyURIs
            },
            "addProperty": {
                writable: false,
                enumerable: false,
                value: addProperty
            },
            "setProperty": {
                writable: false,
                enumerable: false,
                value: setProperty
            },
            "deleteProperty": {
                writable: false,
                enumerable: false,
                value: deleteProperty
            }
        });
        return resource;
    };
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory;

//# sourceMappingURL=Resource.js.map
