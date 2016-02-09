"use strict";

System.register(["./Errors", "./RDF", "./Utils"], function (_export, _context) {
    var Errors, RDF, Utils, _createClass, ContainerType, DigestedObjectSchema, DigestedPropertyDefinition, Digester;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Errors) {
            Errors = _Errors;
        }, function (_RDF) {
            RDF = _RDF;
        }, function (_Utils) {
            Utils = _Utils;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("ContainerType", ContainerType);

            (function (ContainerType) {
                ContainerType[ContainerType["SET"] = 0] = "SET";
                ContainerType[ContainerType["LIST"] = 1] = "LIST";
                ContainerType[ContainerType["LANGUAGE"] = 2] = "LANGUAGE";
            })(ContainerType || _export("ContainerType", ContainerType = {}));

            _export("DigestedObjectSchema", DigestedObjectSchema = function DigestedObjectSchema() {
                _classCallCheck(this, DigestedObjectSchema);

                this.base = "";
                this.prefixes = new Map();
                this.properties = new Map();
                this.prefixedURIs = new Map();
            });

            _export("DigestedObjectSchema", DigestedObjectSchema);

            _export("DigestedPropertyDefinition", DigestedPropertyDefinition = function DigestedPropertyDefinition() {
                _classCallCheck(this, DigestedPropertyDefinition);

                this.uri = null;
                this.literal = null;
                this.literalType = null;
                this.language = null;
                this.containerType = null;
            });

            _export("DigestedPropertyDefinition", DigestedPropertyDefinition);

            _export("Digester", Digester = function () {
                function Digester() {
                    _classCallCheck(this, Digester);
                }

                _createClass(Digester, null, [{
                    key: "digestSchema",
                    value: function digestSchema(schemaOrSchemas) {
                        if (!Utils.isArray(schemaOrSchemas)) return Digester.digestSingleSchema(schemaOrSchemas);
                        var digestedSchemas = [];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = schemaOrSchemas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var schema = _step.value;
                                digestedSchemas.push(Digester.digestSingleSchema(schema));
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        return Digester.combineDigestedObjectSchemas(digestedSchemas);
                    }
                }, {
                    key: "combineDigestedObjectSchemas",
                    value: function combineDigestedObjectSchemas(digestedSchemas) {
                        if (digestedSchemas.length === 0) throw new Errors.IllegalArgumentError("At least one DigestedObjectSchema needs to be specified.");
                        var combinedSchema = digestedSchemas.shift();
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = digestedSchemas[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var digestedSchema = _step2.value;
                                Utils.M.extend(combinedSchema.prefixes, digestedSchema.prefixes);
                                Utils.M.extend(combinedSchema.prefixedURIs, digestedSchema.prefixedURIs);
                                Utils.M.extend(combinedSchema.properties, digestedSchema.properties);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        Digester.resolvePrefixedURIs(combinedSchema);
                        return combinedSchema;
                    }
                }, {
                    key: "digestSingleSchema",
                    value: function digestSingleSchema(schema) {
                        var digestedSchema = new DigestedObjectSchema();

                        for (var propertyName in schema) {
                            if (!schema.hasOwnProperty(propertyName)) continue;
                            if (propertyName === "@reverse") continue;
                            if (propertyName === "@index") continue;
                            if (propertyName === "@base") continue;
                            if (propertyName === "@vocab") continue;
                            var propertyValue = schema[propertyName];

                            if (Utils.isString(propertyValue)) {
                                if (RDF.URI.Util.isPrefixed(propertyName)) throw new Errors.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                                var uri = new RDF.URI.Class(propertyValue);
                                if (RDF.URI.Util.isPrefixed(uri.stringValue)) uri = Digester.resolvePrefixedURI(uri, digestedSchema);
                                digestedSchema.prefixes.set(propertyName, uri);
                            } else if (!!propertyValue && Utils.isObject(propertyValue)) {
                                var schemaDefinition = propertyValue;
                                var digestedDefinition = new DigestedPropertyDefinition();

                                if ("@id" in schemaDefinition) {
                                    if (RDF.URI.Util.isPrefixed(propertyName)) throw new Errors.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
                                    if (!Utils.isString(schemaDefinition["@id"])) throw new Errors.IllegalArgumentError("@id needs to point to a string");
                                    digestedDefinition.uri = Digester.resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@id"]), digestedSchema);
                                } else if (RDF.URI.Util.isPrefixed(propertyName)) {
                                    digestedDefinition.uri = Digester.resolvePrefixedURI(new RDF.URI.Class(propertyName), digestedSchema);
                                } else {
                                    throw new Errors.IllegalArgumentError("Every property definition needs to have a uri defined.");
                                }

                                if ("@type" in schemaDefinition) {
                                    if (!Utils.isString(schemaDefinition["@type"])) throw new Errors.IllegalArgumentError("@type needs to point to a string");

                                    if (schemaDefinition["@type"] === "@id") {
                                        digestedDefinition.literal = false;
                                    } else {
                                        digestedDefinition.literal = true;
                                        digestedDefinition.literalType = Digester.resolvePrefixedURI(new RDF.URI.Class(schemaDefinition["@type"]), digestedSchema);
                                    }
                                }

                                if ("@language" in schemaDefinition) {
                                    if (!Utils.isString(schemaDefinition["@language"])) throw new Errors.IllegalArgumentError("@language needs to point to a string");
                                    digestedDefinition.language = schemaDefinition["@language"];
                                }

                                if ("@container" in schemaDefinition) {
                                    switch (schemaDefinition["@container"]) {
                                        case "@set":
                                            digestedDefinition.containerType = ContainerType.SET;
                                            break;

                                        case "@list":
                                            digestedDefinition.containerType = ContainerType.LIST;
                                            break;

                                        case "@language":
                                            if (digestedDefinition.language !== null) throw new Errors.IllegalArgumentError("@container cannot be set to @language when the property definition already contains an @language tag.");
                                            digestedDefinition.containerType = ContainerType.LANGUAGE;
                                            break;

                                        default:
                                            throw new Errors.IllegalArgumentError("@container needs to be equal to '@list', '@set', or '@language'");
                                    }
                                }

                                digestedSchema.properties.set(propertyName, digestedDefinition);
                            } else {
                                throw new Errors.IllegalArgumentError("ObjectSchema Properties can only have string values or object values.");
                            }
                        }

                        Digester.resolvePrefixedURIs(digestedSchema);
                        return digestedSchema;
                    }
                }, {
                    key: "resolvePrefixedURIs",
                    value: function resolvePrefixedURIs(digestedSchema) {
                        digestedSchema.prefixes.forEach(function (prefixValue, prefixName) {
                            if (!digestedSchema.prefixedURIs.has(prefixName)) return;
                            var prefixedURIs = digestedSchema.prefixedURIs.get(prefixName);
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = prefixedURIs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var prefixedURI = _step3.value;
                                    Digester.resolvePrefixedURI(prefixedURI, digestedSchema);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }

                            digestedSchema.prefixedURIs.delete(prefixName);
                        });
                        return digestedSchema;
                    }
                }, {
                    key: "resolvePrefixedURI",
                    value: function resolvePrefixedURI(uri, digestedSchema) {
                        if (!RDF.URI.Util.isPrefixed(uri.stringValue)) return uri;
                        var uriParts = uri.stringValue.split(":");
                        var prefix = uriParts[0];
                        var slug = uriParts[1];

                        if (digestedSchema.prefixes.has(prefix)) {
                            uri.stringValue = digestedSchema.prefixes.get(prefix) + slug;
                        } else {
                            if (!digestedSchema.prefixedURIs.has(prefix)) digestedSchema.prefixedURIs.set(prefix, []);
                            digestedSchema.prefixedURIs.get(prefix).push(uri);
                        }

                        return uri;
                    }
                }]);

                return Digester;
            }());

            _export("Digester", Digester);
        }
    };
});
//# sourceMappingURL=ObjectSchema.js.map
