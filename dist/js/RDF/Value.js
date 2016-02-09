"use strict";

System.register(["./List", "./Literal", "./../NS", "./RDFNode"], function (_export, _context) {
    var List, Literal, NS, RDFNode, _createClass, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_List) {
            List = _List;
        }, function (_Literal) {
            Literal = _Literal;
        }, function (_NS) {
            NS = _NS;
        }, function (_RDFNode) {
            RDFNode = _RDFNode;
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

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "areEqual",
                    value: function areEqual(value1, value2) {
                        if (Literal.Factory.is(value1) && Literal.Factory.is(value2)) {
                            return Literal.Util.areEqual(value1, value2);
                        } else if (RDFNode.Factory.is(value1) && RDFNode.Factory.is(value2)) {
                            return RDFNode.Util.areEqual(value1, value2);
                        } else return false;
                    }
                }, {
                    key: "getProperty",
                    value: function getProperty(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        if (!propertyValues.length) return null;
                        var propertyValue = propertyValues[0];
                        return Util.parseValue(propertyValue, pointerLibrary);
                    }
                }, {
                    key: "getPropertyPointer",
                    value: function getPropertyPointer(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = propertyValues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var propertyValue = _step.value;
                                if (!RDFNode.Factory.is(propertyValue)) continue;
                                return pointerLibrary.getPointer(propertyValue["@id"]);
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

                        return null;
                    }
                }, {
                    key: "getPropertyLiteral",
                    value: function getPropertyLiteral(expandedObject, propertyURI, literalType) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = propertyValues[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var propertyValue = _step2.value;
                                if (!Literal.Factory.is(propertyValue)) continue;
                                if (!Literal.Factory.hasType(propertyValue, literalType)) continue;
                                return Literal.Factory.parse(propertyValue);
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

                        return null;
                    }
                }, {
                    key: "getPropertyList",
                    value: function getPropertyList(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyList = Util.getList(propertyValues);
                        if (!propertyList) return null;
                        var listValues = [];
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = propertyList["@list"][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var listValue = _step3.value;
                                listValues.push(Util.parseValue(listValue, pointerLibrary));
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

                        return listValues;
                    }
                }, {
                    key: "getPropertyPointerList",
                    value: function getPropertyPointerList(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyList = Util.getList(propertyValues);
                        if (!propertyList) return null;
                        var listPointers = [];
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = propertyList["@list"][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var listValue = _step4.value;
                                if (!RDFNode.Factory.is(listValue)) continue;
                                var pointer = pointerLibrary.getPointer(listValue["@id"]);
                                listPointers.push(pointer);
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

                        return listPointers;
                    }
                }, {
                    key: "getPropertyLiteralList",
                    value: function getPropertyLiteralList(expandedObject, propertyURI, literalType) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyList = Util.getList(propertyValues);
                        if (!propertyList) return null;
                        var listLiterals = [];
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = propertyList["@list"][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var listValue = _step5.value;
                                if (!Literal.Factory.is(listValue)) continue;
                                if (!Literal.Factory.hasType(listValue, literalType)) continue;
                                listLiterals.push(Literal.Factory.parse(listValue));
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

                        return listLiterals;
                    }
                }, {
                    key: "getProperties",
                    value: function getProperties(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        if (!propertyValues.length) return null;
                        var properties = [];
                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = propertyValues[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var propertyValue = _step6.value;
                                properties.push(Util.parseValue(propertyValue, pointerLibrary));
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

                        return properties;
                    }
                }, {
                    key: "getPropertyPointers",
                    value: function getPropertyPointers(expandedObject, propertyURI, pointerLibrary) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        if (!propertyValues.length) return null;
                        var propertyPointers = [];
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                            for (var _iterator7 = propertyValues[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var propertyValue = _step7.value;
                                if (!RDFNode.Factory.is(propertyValue)) continue;
                                var pointer = pointerLibrary.getPointer(propertyValue["@id"]);
                                propertyPointers.push(pointer);
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

                        return propertyPointers;
                    }
                }, {
                    key: "getPropertyURIs",
                    value: function getPropertyURIs(expandedObject, propertyURI) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        if (!propertyValues.length) return null;
                        var propertyURIs = [];
                        var _iteratorNormalCompletion8 = true;
                        var _didIteratorError8 = false;
                        var _iteratorError8 = undefined;

                        try {
                            for (var _iterator8 = propertyValues[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                var propertyValue = _step8.value;
                                if (!RDFNode.Factory.is(propertyValue)) continue;
                                propertyURIs.push(propertyValue["@id"]);
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

                        return propertyURIs;
                    }
                }, {
                    key: "getPropertyLiterals",
                    value: function getPropertyLiterals(expandedObject, propertyURI, literalType) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyLiterals = [];
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;

                        try {
                            for (var _iterator9 = propertyValues[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                var propertyValue = _step9.value;
                                if (!Literal.Factory.is(propertyValue)) continue;
                                if (!Literal.Factory.hasType(propertyValue, literalType)) continue;
                                propertyLiterals.push(Literal.Factory.parse(propertyValue));
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

                        return propertyLiterals;
                    }
                }, {
                    key: "getPropertyLanguageMap",
                    value: function getPropertyLanguageMap(expandedObject, propertyURI) {
                        var propertyValues = expandedObject[propertyURI];
                        if (!propertyValues) return null;
                        var propertyLanguageMap = {};
                        var _iteratorNormalCompletion10 = true;
                        var _didIteratorError10 = false;
                        var _iteratorError10 = undefined;

                        try {
                            for (var _iterator10 = propertyValues[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                var propertyValue = _step10.value;
                                if (!Literal.Factory.is(propertyValue)) continue;
                                if (!Literal.Factory.hasType(propertyValue, NS.XSD.DataType.string)) continue;
                                var languageTag = propertyValue["@language"];
                                if (!languageTag) continue;
                                propertyLanguageMap[languageTag] = Literal.Factory.parse(propertyValue);
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

                        return propertyLanguageMap;
                    }
                }, {
                    key: "getList",
                    value: function getList(propertyValues) {
                        var _iteratorNormalCompletion11 = true;
                        var _didIteratorError11 = false;
                        var _iteratorError11 = undefined;

                        try {
                            for (var _iterator11 = propertyValues[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                                var propertyValue = _step11.value;
                                if (!List.Factory.is(propertyValue)) continue;
                                return propertyValue;
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

                        return null;
                    }
                }, {
                    key: "parseValue",
                    value: function parseValue(propertyValue, pointerLibrary) {
                        if (Literal.Factory.is(propertyValue)) {
                            return Literal.Factory.parse(propertyValue);
                        } else if (RDFNode.Factory.is(propertyValue)) {
                            return pointerLibrary.getPointer(propertyValue["@id"]);
                        } else if (List.Factory.is(propertyValue)) {
                            var parsedValue = [];
                            var listValues = propertyValue["@list"];
                            var _iteratorNormalCompletion12 = true;
                            var _didIteratorError12 = false;
                            var _iteratorError12 = undefined;

                            try {
                                for (var _iterator12 = listValues[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                    var listValue = _step12.value;
                                    parsedValue.push(this.parseValue(listValue, pointerLibrary));
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

                            return parsedValue;
                        } else {}
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);
        }
    };
});
//# sourceMappingURL=Value.js.map
