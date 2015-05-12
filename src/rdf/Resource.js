define(["require", "exports", './Literal', '../Utils', '../namespaces/RDF'], function (require, exports, Literal, Utils, RDF) {
    function hasType(type) {
        var property = RDF.Predicate.type;
        if (!this.hasOwnProperty(property))
            return false;
        var values = Utils.isArray(this[property]) ? this[property] : [this[property]];
        return (function () {
            for (var i = 0, length = values.length; i < length; i++) {
                var value = values[i];
                if (value['@id'] == type)
                    return true;
            }
            return false;
        })();
    }
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
        if (!Utils.hasProperty(value, '@id'))
            return null;
        return value['@id'];
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
            for (var i = 0, length = propertyArray.length; i < length; i++) {
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
            for (var i = 0, length = values.length; i < length; i++) {
                var value = values[i];
                if (Utils.hasProperty(value, '@id'))
                    uris.push(value['@id']);
            }
        }
        uris = tieArray(this, propertyURI, uris);
        return uris;
    }
    function addProperty(propertyURI, value) {
        var propertyArray = this.getProperties(propertyURI);
        var propertyValue;
        if (Factory.is(value)) {
            propertyValue = {
                '@id': value['@id']
            };
        }
        else
            propertyValue = Literal.Factory.from(value);
        propertyArray.push(propertyValue);
        this[propertyURI] = propertyArray;
    }
    function setProperty(propertyURI, value) {
        this.removeProperty(propertyURI);
        if (Utils.isNull(value))
            return;
        this.addProperty(propertyURI, value);
    }
    function removeProperty(propertyURI) {
        delete this[propertyURI];
    }
    function tieArray(resource, property, array) {
        array.push = (function () {
            return function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                for (var i = 0, length = items.length; i < length; i++) {
                    resource.addProperty(property, items[i]);
                }
                return Array.prototype.push.call(array, items);
            };
        }());
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
        Factory.is = function (object) {
            if (Utils.isNull(object))
                return false;
            if (!Utils.isObject(object))
                return false;
            return Utils.hasProperty(object, '@id');
        };
        Factory.from = function (objectOrObjects) {
            var objects = Utils.isArray(objectOrObjects) ? objectOrObjects : [objectOrObjects];
            var resources = [];
            for (var i = 0, length = objects.length; i < length; i++) {
                var resource = objects[i];
                Object.defineProperties(resource, {
                    'uri': {
                        get: function () {
                            return this['@id'];
                        },
                        set: function (value) {
                            this['@id'] = value;
                        },
                        enumerable: false
                    }
                });
                resource.hasType = hasType;
                resource.hasProperty = hasProperty;
                resource.getProperty = getProperty;
                resource.getPropertyValue = getPropertyValue;
                resource.getPropertyURI = getPropertyURI;
                resource.getProperties = getProperties;
                resource.getPropertyValues = getPropertyValues;
                resource.getPropertyURIs = getPropertyURIs;
                resource.addProperty = addProperty;
                resource.setProperty = setProperty;
                resource.removeProperty = removeProperty;
                resources.push(resource);
            }
            if (Utils.isArray(objectOrObjects))
                return resources;
            else
                return resources[0];
        };
        Factory.injectDescriptions = function (resourceOrResources, descriptions) {
            var resources = Utils.isArray(resourceOrResources) ? resourceOrResources : [resourceOrResources];
            for (var i = 0, length = resources.length; i < length; i++) {
                var resource = resources[i];
                for (var j = 0, descriptionLength = descriptions.length; j < descriptionLength; j++) {
                    var description = descriptions[j];
                    var getter, setter;
                    if (Utils.isNull(description.literal)) {
                        // The type isn't known, inject generic versions
                        if (description.multi)
                            getter = Factory.genericMultipleGetter(description);
                        else
                            getter = Factory.genericGetter(description);
                    }
                    else if (!description.literal) {
                        if (description.multi)
                            getter = Factory.urisGetter(description);
                        else
                            getter = Factory.uriGetter(description);
                    }
                    else {
                        if (description.multi)
                            getter = Factory.literalsGetter(description);
                        else
                            getter = Factory.literalGetter(description);
                    }
                    setter = Factory.setter(description);
                    Object.defineProperty(resource, description.name, {
                        enumerable: false,
                        get: getter,
                        set: setter
                    });
                }
            }
            if (Utils.isArray(resourceOrResources))
                return resources;
            else
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
        return Factory;
    })();
    exports.Factory = Factory;
});
//# sourceMappingURL=Resource.js.map