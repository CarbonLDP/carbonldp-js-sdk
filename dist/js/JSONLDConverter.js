"use strict";

System.register(["./Errors", "./ObjectSchema", "./NS", "./Pointer", "./RDF", "./Utils"], function (_export, _context) {
    var Errors, ObjectSchema, NS, Pointer, RDF, Utils, _createClass, Class;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Errors) {
            Errors = _Errors;
        }, function (_ObjectSchema) {
            ObjectSchema = _ObjectSchema;
        }, function (_NS) {
            NS = _NS;
        }, function (_Pointer) {
            Pointer = _Pointer;
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

            _export("Class", Class = function () {
                function Class() {
                    var literalSerializers = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    _classCallCheck(this, Class);

                    this._literalSerializers = !!literalSerializers ? literalSerializers : Class.getDefaultSerializers();
                }

                _createClass(Class, [{
                    key: "compact",
                    value: function compact(expandedObjectOrObjects, targetObjectOrObjectsOrDigestedContext, digestedSchemaOrPointerLibrary) {
                        var pointerLibrary = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
                        var targetObjectOrObjects = !pointerLibrary ? null : targetObjectOrObjectsOrDigestedContext;
                        var digestedSchema = !pointerLibrary ? targetObjectOrObjectsOrDigestedContext : digestedSchemaOrPointerLibrary;
                        pointerLibrary = !pointerLibrary ? digestedSchemaOrPointerLibrary : pointerLibrary;
                        if (!Utils.isArray(expandedObjectOrObjects)) return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, digestedSchema, pointerLibrary);
                        var expandedObjects = expandedObjectOrObjects;
                        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];

                        for (var i = 0, length = expandedObjects.length; i < length; i++) {
                            var expandedObject = expandedObjects[i];
                            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
                            this.compactSingle(expandedObject, targetObject, digestedSchema, pointerLibrary);
                        }

                        return targetObjects;
                    }
                }, {
                    key: "expand",
                    value: function expand(compactedObjectOrObjects, digestedSchema) {
                        var pointerValidator = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                        if (!Utils.isArray(compactedObjectOrObjects)) return this.expandSingle(compactedObjectOrObjects, digestedSchema, pointerValidator);
                    }
                }, {
                    key: "expandSingle",
                    value: function expandSingle(compactedObject, digestedSchema, pointerValidator) {
                        var _this = this;

                        var expandedObject = {};
                        expandedObject["@id"] = !!compactedObject["id"] ? compactedObject["id"] : "";
                        if (!!compactedObject["types"]) expandedObject["@type"] = compactedObject["types"];
                        Utils.forEachOwnProperty(compactedObject, function (propertyName, value) {
                            if (propertyName === "id") return;

                            if (digestedSchema.properties.has(propertyName)) {
                                var definition = digestedSchema.properties.get(propertyName);

                                var expandedValue = _this.expandProperty(value, definition, pointerValidator);

                                if (!expandedValue) return;
                                expandedObject[definition.uri.toString()] = expandedValue;
                            } else {}
                        });
                        return expandedObject;
                    }
                }, {
                    key: "expandProperty",
                    value: function expandProperty(propertyValue, propertyDefinition, pointerValidator) {
                        switch (propertyDefinition.containerType) {
                            case null:
                                if (propertyDefinition.literal) {
                                    return this.expandPropertyLiteral(propertyValue, propertyDefinition.literalType.toString());
                                } else if (propertyDefinition.literal === false) {
                                    return this.expandPropertyPointer(propertyValue, pointerValidator);
                                } else {
                                    return this.expandPropertyValue(propertyValue, pointerValidator);
                                }

                                break;

                            case ObjectSchema.ContainerType.LIST:
                                if (propertyDefinition.literal) {
                                    return this.expandPropertyLiteralList(propertyValue, propertyDefinition.literalType.toString());
                                } else if (propertyDefinition.literal === false) {
                                    return this.expandPropertyPointerList(propertyValue, pointerValidator);
                                } else {
                                    return this.expandPropertyList(propertyValue, pointerValidator);
                                }

                                break;

                            case ObjectSchema.ContainerType.SET:
                                if (propertyDefinition.literal) {
                                    return this.expandPropertyLiterals(propertyValue, propertyDefinition.literalType.toString());
                                } else if (propertyDefinition.literal === false) {
                                    return this.expandPropertyPointers(propertyValue, pointerValidator);
                                } else {
                                    return this.expandPropertyValues(propertyValue, pointerValidator);
                                }

                                break;

                            case ObjectSchema.ContainerType.LANGUAGE:
                                return this.expandPropertyLanguageMap(propertyValue);

                            default:
                                throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
                        }
                    }
                }, {
                    key: "expandPropertyValue",
                    value: function expandPropertyValue(propertyValue, pointerValidator) {
                        if (Utils.isArray(propertyValue)) {
                            return this.expandPropertyValues(propertyValue, pointerValidator);
                        } else {
                            var expandedValue = this.expandValue(propertyValue, pointerValidator);
                            if (!expandedValue) return null;
                            return [expandedValue];
                        }
                    }
                }, {
                    key: "expandPropertyPointer",
                    value: function expandPropertyPointer(propertyValue, pointerValidator) {
                        var expandedPointer = this.expandPointer(propertyValue, pointerValidator);
                        if (!expandedPointer) return null;
                        return [expandedPointer];
                    }
                }, {
                    key: "expandPropertyLiteral",
                    value: function expandPropertyLiteral(propertyValue, literalType) {
                        var serializedValue = this.serializeLiteral(propertyValue, literalType);
                        if (serializedValue === null) return null;
                        return [{
                            "@value": serializedValue,
                            "@type": literalType
                        }];
                    }
                }, {
                    key: "expandPropertyList",
                    value: function expandPropertyList(propertyValues, pointerValidator) {
                        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
                        var expandedArray = this.expandArray(propertyValues, pointerValidator);
                        if (!expandedArray) return null;
                        return [{
                            "@list": expandedArray
                        }];
                    }
                }, {
                    key: "expandPropertyPointerList",
                    value: function expandPropertyPointerList(propertyValues, pointerValidator) {
                        var listValues = this.expandPropertyPointers(propertyValues, pointerValidator);
                        return [{
                            "@list": listValues
                        }];
                    }
                }, {
                    key: "expandPropertyLiteralList",
                    value: function expandPropertyLiteralList(propertyValues, literalType) {
                        var listValues = this.expandPropertyLiterals(propertyValues, literalType);
                        return [{
                            "@list": listValues
                        }];
                    }
                }, {
                    key: "expandPropertyValues",
                    value: function expandPropertyValues(propertyValue, pointerValidator) {
                        var expandedArray = this.expandArray(propertyValue, pointerValidator);
                        if (!expandedArray) return null;
                        return expandedArray;
                    }
                }, {
                    key: "expandPropertyPointers",
                    value: function expandPropertyPointers(propertyValues, pointerValidator) {
                        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
                        var expandedPointers = [];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = propertyValues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var propertyValue = _step.value;
                                var expandedPointer = this.expandPointer(propertyValue, pointerValidator);
                                if (!expandedPointer) continue;
                                expandedPointers.push(expandedPointer);
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

                        return expandedPointers;
                    }
                }, {
                    key: "expandPropertyLiterals",
                    value: function expandPropertyLiterals(propertyValues, literalType) {
                        propertyValues = Utils.isArray(propertyValues) ? propertyValues : [propertyValues];
                        var listValues = [];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = propertyValues[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var propertyValue = _step2.value;
                                var serializedValue = this.serializeLiteral(propertyValue, literalType);
                                if (!serializedValue) continue;
                                listValues.push({
                                    "@value": serializedValue,
                                    "@type": literalType
                                });
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

                        return listValues;
                    }
                }, {
                    key: "expandPropertyLanguageMap",
                    value: function expandPropertyLanguageMap(propertyValue) {
                        var _this2 = this;

                        if (!Utils.isObject(propertyValue)) {
                            return null;
                        }

                        var mapValues = [];
                        Utils.forEachOwnProperty(propertyValue, function (languageTag, value) {
                            var serializedValue = _this2.literalSerializers.get(NS.XSD.DataType.string).serialize(value);

                            mapValues.push({
                                "@value": serializedValue,
                                "@type": NS.XSD.DataType.string,
                                "@language": languageTag
                            });
                        });
                        return mapValues;
                    }
                }, {
                    key: "serializeLiteral",
                    value: function serializeLiteral(propertyValue, literalType) {
                        if (Pointer.Factory.is(propertyValue)) {
                            return null;
                        }

                        if (!this.literalSerializers.has(literalType)) {
                            return null;
                        }

                        try {
                            return this.literalSerializers.get(literalType).serialize(propertyValue);
                        } catch (error) {
                            return null;
                        }
                    }
                }, {
                    key: "expandPointer",
                    value: function expandPointer(propertyValue, pointerValidator) {
                        if (!Pointer.Factory.is(propertyValue)) {
                            return null;
                        }

                        if (!!pointerValidator && !pointerValidator.inScope(propertyValue)) {
                            return null;
                        }

                        return {
                            "@id": propertyValue.id
                        };
                    }
                }, {
                    key: "expandArray",
                    value: function expandArray(propertyValue, pointerValidator) {
                        var listValues = [];
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = propertyValue[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var listValue = _step3.value;
                                var expandedValue = this.expandValue(listValue, pointerValidator);
                                if (!expandedValue) continue;
                                listValues.push(expandedValue);
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

                        if (!listValues.length) return null;
                        return listValues;
                    }
                }, {
                    key: "expandValue",
                    value: function expandValue(propertyValue, pointerValidator) {
                        if (Utils.isArray(propertyValue)) {
                            return null;
                        } else if (Pointer.Factory.is(propertyValue)) {
                            return this.expandPointer(propertyValue, pointerValidator);
                        } else {
                            return this.expandLiteral(propertyValue);
                        }
                    }
                }, {
                    key: "expandLiteral",
                    value: function expandLiteral(literalValue) {
                        var serializedValue = undefined;
                        var literalType = undefined;

                        switch (true) {
                            case Utils.isFunction(literalValue):
                                return null;

                            case Utils.isDate(literalValue):
                                literalType = NS.XSD.DataType.dateTime;
                                break;

                            case Utils.isNumber(literalValue):
                                literalType = NS.XSD.DataType.float;
                                break;

                            case Utils.isBoolean(literalValue):
                                literalType = NS.XSD.DataType.boolean;
                                break;

                            case Utils.isString(literalValue):
                                literalType = NS.XSD.DataType.string;
                                break;

                            default:
                                return null;
                        }

                        serializedValue = this.literalSerializers.get(literalType).serialize(literalValue);
                        return {
                            "@value": serializedValue,
                            "@type": literalType
                        };
                    }
                }, {
                    key: "compactSingle",
                    value: function compactSingle(expandedObject, targetObject, digestedSchema, pointerLibrary) {
                        var _this3 = this;

                        var propertyURINameMap = this.getPropertyURINameMap(digestedSchema);
                        if (!expandedObject["@id"]) throw new Errors.IllegalArgumentError("The expandedObject doesn't have an @id defined.");
                        targetObject["id"] = expandedObject["@id"];
                        targetObject["types"] = !!expandedObject["@type"] ? expandedObject["@type"] : [];
                        Utils.forEachOwnProperty(expandedObject, function (propertyURI, value) {
                            if (propertyURI === "@id") return;
                            if (propertyURI === "@type") return;

                            if (propertyURINameMap.has(propertyURI)) {
                                var propertyName = propertyURINameMap.get(propertyURI);

                                _this3.assignProperty(targetObject, expandedObject, propertyName, digestedSchema, pointerLibrary);
                            } else {
                                _this3.assignURIProperty(targetObject, expandedObject, propertyURI, pointerLibrary);
                            }
                        });
                        return targetObject;
                    }
                }, {
                    key: "assignProperty",
                    value: function assignProperty(compactedObject, expandedObject, propertyName, digestedSchema, pointerLibrary) {
                        var propertyDefinition = digestedSchema.properties.get(propertyName);
                        compactedObject[propertyName] = this.getPropertyValue(expandedObject, propertyDefinition, pointerLibrary);
                    }
                }, {
                    key: "assignURIProperty",
                    value: function assignURIProperty(compactedObject, expandedObject, propertyURI, pointerLibrary) {
                        var guessedDefinition = new ObjectSchema.DigestedPropertyDefinition();
                        guessedDefinition.uri = new RDF.URI.Class(propertyURI);
                        guessedDefinition.containerType = this.getPropertyContainerType(expandedObject[propertyURI]);
                        compactedObject[propertyURI] = this.getPropertyValue(expandedObject, guessedDefinition, pointerLibrary);
                    }
                }, {
                    key: "getPropertyContainerType",
                    value: function getPropertyContainerType(propertyValues) {
                        if (propertyValues.length === 1) {
                            if (RDF.List.Factory.is(propertyValues[0])) return ObjectSchema.ContainerType.LIST;
                        } else {
                            return ObjectSchema.ContainerType.SET;
                        }

                        return null;
                    }
                }, {
                    key: "getPropertyValue",
                    value: function getPropertyValue(expandedObject, propertyDefinition, pointerLibrary) {
                        var propertyURI = propertyDefinition.uri.toString();

                        switch (propertyDefinition.containerType) {
                            case null:
                                if (propertyDefinition.literal) {
                                    return this.getPropertyLiteral(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                                } else if (propertyDefinition.literal === false) {
                                    return this.getPropertyPointer(expandedObject, propertyURI, pointerLibrary);
                                } else {
                                    return this.getProperty(expandedObject, propertyURI, pointerLibrary);
                                }

                                break;

                            case ObjectSchema.ContainerType.LIST:
                                if (propertyDefinition.literal) {
                                    return this.getPropertyLiteralList(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                                } else if (propertyDefinition.literal === false) {
                                    return this.getPropertyPointerList(expandedObject, propertyURI, pointerLibrary);
                                } else {
                                    return this.getPropertyList(expandedObject, propertyURI, pointerLibrary);
                                }

                                break;

                            case ObjectSchema.ContainerType.SET:
                                if (propertyDefinition.literal) {
                                    return this.getPropertyLiterals(expandedObject, propertyURI, propertyDefinition.literalType.toString());
                                } else if (propertyDefinition.literal === false) {
                                    return this.getPropertyPointers(expandedObject, propertyURI, pointerLibrary);
                                } else {
                                    return this.getProperties(expandedObject, propertyURI, pointerLibrary);
                                }

                                break;

                            case ObjectSchema.ContainerType.LANGUAGE:
                                return this.getPropertyLanguageMap(expandedObject, propertyURI);

                            default:
                                throw new Errors.IllegalArgumentError("The containerType specified is not supported.");
                        }
                    }
                }, {
                    key: "getProperty",
                    value: function getProperty(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        if (!propertyValues.length) return null;
                        var propertyValue = propertyValues[0];
                        return this.parseValue(propertyValue, pointerLibrary);
                    }
                }, {
                    key: "getPropertyPointer",
                    value: function getPropertyPointer(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = propertyValues[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var propertyValue = _step4.value;
                                if (!RDF.Node.Factory.is(propertyValue)) continue;
                                return pointerLibrary.getPointer(propertyValue["@id"]);
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }

                        return null;
                    }
                }, {
                    key: "getPropertyLiteral",
                    value: function getPropertyLiteral(expandedObject, propertyURI, literalType) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = propertyValues[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var propertyValue = _step5.value;
                                if (!RDF.Literal.Factory.is(propertyValue)) continue;
                                if (!RDF.Literal.Factory.hasType(propertyValue, literalType)) continue;
                                return RDF.Literal.Factory.parse(propertyValue);
                            }
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }

                        return null;
                    }
                }, {
                    key: "getPropertyList",
                    value: function getPropertyList(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyList = this.getList(propertyValues);
                        if (!propertyList) return null;
                        var listValues = [];
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = propertyList["@list"][Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var listValue = _step6.value;
                                listValues.push(this.parseValue(listValue, pointerLibrary));
                            }
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }
                            } finally {
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
                                }
                            }
                        }

                        return listValues;
                    }
                }, {
                    key: "getPropertyPointerList",
                    value: function getPropertyPointerList(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyList = this.getList(propertyValues);
                        if (!propertyList) return null;
                        var listPointers = [];
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                            for (var _iterator7 = propertyList["@list"][Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var listValue = _step7.value;
                                if (!RDF.Node.Factory.is(listValue)) continue;
                                var pointer = pointerLibrary.getPointer(listValue["@id"]);
                                listPointers.push(pointer);
                            }
                        } catch (err) {
                            _didIteratorError7 = true;
                            _iteratorError7 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                    _iterator7.return();
                                }
                            } finally {
                                if (_didIteratorError7) {
                                    throw _iteratorError7;
                                }
                            }
                        }

                        return listPointers;
                    }
                }, {
                    key: "getPropertyLiteralList",
                    value: function getPropertyLiteralList(expandedObject, propertyURI, literalType) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyList = this.getList(propertyValues);
                        if (!propertyList) return null;
                        var listLiterals = [];
                        var _iteratorNormalCompletion8 = true;
                        var _didIteratorError8 = false;
                        var _iteratorError8 = undefined;

                        try {
                            for (var _iterator8 = propertyList["@list"][Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                var listValue = _step8.value;
                                if (!RDF.Literal.Factory.is(listValue)) continue;
                                if (!RDF.Literal.Factory.hasType(listValue, literalType)) continue;
                                listLiterals.push(RDF.Literal.Factory.parse(listValue));
                            }
                        } catch (err) {
                            _didIteratorError8 = true;
                            _iteratorError8 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                    _iterator8.return();
                                }
                            } finally {
                                if (_didIteratorError8) {
                                    throw _iteratorError8;
                                }
                            }
                        }

                        return listLiterals;
                    }
                }, {
                    key: "getProperties",
                    value: function getProperties(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        if (!propertyValues.length) return null;
                        var properties = [];
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                            for (var _iterator9 = propertyValues[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                var propertyValue = _step9.value;
                                properties.push(this.parseValue(propertyValue, pointerLibrary));
                            }
                        } catch (err) {
                            _didIteratorError9 = true;
                            _iteratorError9 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }
                            } finally {
                                if (_didIteratorError9) {
                                    throw _iteratorError9;
                                }
                            }
                        }

                        return properties;
                    }
                }, {
                    key: "getPropertyPointers",
                    value: function getPropertyPointers(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        if (!propertyValues.length) return null;
                        var propertyPointers = [];
                        var _iteratorNormalCompletion10 = true;
                        var _didIteratorError10 = false;
                        var _iteratorError10 = undefined;

                        try {
                            for (var _iterator10 = propertyValues[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var propertyValue = _step10.value;
                                if (!RDF.Node.Factory.is(propertyValue)) continue;
                                var pointer = pointerLibrary.getPointer(propertyValue["@id"]);
                                propertyPointers.push(pointer);
                            }
                        } catch (err) {
                            _didIteratorError10 = true;
                            _iteratorError10 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                    _iterator10.return();
                                }
                            } finally {
                                if (_didIteratorError10) {
                                    throw _iteratorError10;
                                }
                            }
                        }

                        return propertyPointers;
                    }
                }, {
                    key: "getPropertyLiterals",
                    value: function getPropertyLiterals(expandedObject, propertyURI, literalType) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyLiterals = [];
                        var _iteratorNormalCompletion11 = true;
                        var _didIteratorError11 = false;
                        var _iteratorError11 = undefined;

                        try {
                            for (var _iterator11 = propertyValues[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                var propertyValue = _step11.value;
                                if (!RDF.Literal.Factory.is(propertyValue)) continue;
                                if (!RDF.Literal.Factory.hasType(propertyValue, literalType)) continue;
                                propertyLiterals.push(RDF.Literal.Factory.parse(propertyValue));
                            }
                        } catch (err) {
                            _didIteratorError11 = true;
                            _iteratorError11 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                    _iterator11.return();
                                }
                            } finally {
                                if (_didIteratorError11) {
                                    throw _iteratorError11;
                                }
                            }
                        }

                        return propertyLiterals;
                    }
                }, {
                    key: "getPropertyLanguageMap",
                    value: function getPropertyLanguageMap(expandedObject, propertyURI) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyLanguageMap = {};
                        var _iteratorNormalCompletion12 = true;
                        var _didIteratorError12 = false;
                        var _iteratorError12 = undefined;

                        try {
                            for (var _iterator12 = propertyValues[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                var propertyValue = _step12.value;
                                if (!RDF.Literal.Factory.is(propertyValue)) continue;
                                if (!RDF.Literal.Factory.hasType(propertyValue, NS.XSD.DataType.string)) continue;
                                var languageTag = propertyValue["@language"];
                                if (!languageTag) continue;
                                propertyLanguageMap[languageTag] = RDF.Literal.Factory.parse(propertyValue);
                            }
                        } catch (err) {
                            _didIteratorError12 = true;
                            _iteratorError12 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                    _iterator12.return();
                                }
                            } finally {
                                if (_didIteratorError12) {
                                    throw _iteratorError12;
                                }
                            }
                        }

                        return propertyLanguageMap;
                    }
                }, {
                    key: "getList",
                    value: function getList(propertyValues) {
                        var _iteratorNormalCompletion13 = true;
                        var _didIteratorError13 = false;
                        var _iteratorError13 = undefined;

                        try {
                            for (var _iterator13 = propertyValues[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                var propertyValue = _step13.value;
                                if (!RDF.List.Factory.is(propertyValue)) continue;
                                return propertyValue;
                            }
                        } catch (err) {
                            _didIteratorError13 = true;
                            _iteratorError13 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                    _iterator13.return();
                                }
                            } finally {
                                if (_didIteratorError13) {
                                    throw _iteratorError13;
                                }
                            }
                        }

                        return null;
                    }
                }, {
                    key: "getPropertyURINameMap",
                    value: function getPropertyURINameMap(digestedSchema) {
                        var map = new Map();
                        digestedSchema.properties.forEach(function (definition, propertyName) {
                            map.set(definition.uri.toString(), propertyName);
                        });
                        return map;
                    }
                }, {
                    key: "parseValue",
                    value: function parseValue(propertyValue, pointerLibrary) {
                        if (RDF.Literal.Factory.is(propertyValue)) {
                            return RDF.Literal.Factory.parse(propertyValue);
                        } else if (RDF.Node.Factory.is(propertyValue)) {
                            return pointerLibrary.getPointer(propertyValue["@id"]);
                        } else if (RDF.List.Factory.is(propertyValue)) {
                            var parsedValue = [];
                            var listValues = propertyValue["@list"];
                            var _iteratorNormalCompletion14 = true;
                            var _didIteratorError14 = false;
                            var _iteratorError14 = undefined;

                            try {
                                for (var _iterator14 = listValues[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                    var listValue = _step14.value;
                                    parsedValue.push(this.parseValue(listValue, pointerLibrary));
                                }
                            } catch (err) {
                                _didIteratorError14 = true;
                                _iteratorError14 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                        _iterator14.return();
                                    }
                                } finally {
                                    if (_didIteratorError14) {
                                        throw _iteratorError14;
                                    }
                                }
                            }

                            return parsedValue;
                        } else {}
                    }
                }, {
                    key: "literalSerializers",
                    get: function get() {
                        return this._literalSerializers;
                    }
                }], [{
                    key: "getDefaultSerializers",
                    value: function getDefaultSerializers() {
                        var literalSerializers = new Map();
                        literalSerializers.set(NS.XSD.DataType.date, RDF.Literal.Serializers.XSD.dateSerializer);
                        literalSerializers.set(NS.XSD.DataType.dateTime, RDF.Literal.Serializers.XSD.dateTimeSerializer);
                        literalSerializers.set(NS.XSD.DataType.time, RDF.Literal.Serializers.XSD.timeSerializer);
                        literalSerializers.set(NS.XSD.DataType.integer, RDF.Literal.Serializers.XSD.integerSerializer);
                        literalSerializers.set(NS.XSD.DataType.int, RDF.Literal.Serializers.XSD.integerSerializer);
                        literalSerializers.set(NS.XSD.DataType.unsignedInt, RDF.Literal.Serializers.XSD.unsignedIntegerSerializer);
                        literalSerializers.set(NS.XSD.DataType.float, RDF.Literal.Serializers.XSD.floatSerializer);
                        literalSerializers.set(NS.XSD.DataType.double, RDF.Literal.Serializers.XSD.floatSerializer);
                        literalSerializers.set(NS.XSD.DataType.boolean, RDF.Literal.Serializers.XSD.booleanSerializer);
                        literalSerializers.set(NS.XSD.DataType.string, RDF.Literal.Serializers.XSD.stringSerializer);
                        return literalSerializers;
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=JSONLDConverter.js.map
