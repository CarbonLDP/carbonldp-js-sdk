"use strict";

System.register(["./Document", "./Utils"], function (_export, _context) {
    var Document, Utils, _createClass, Factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function isDirty() {
        return null;
    }

    function refresh() {
        return null;
    }

    function save() {
        var _this = this;

        return this._documents.save(this).then(function (response) {
            return [_this, response];
        });
    }

    function destroy() {
        return this._documents.delete(this);
    }

    function executeSELECTQuery(selectQuery) {
        return this._documents.executeSELECTQuery(this.id, selectQuery);
    }

    return {
        setters: [function (_Document) {
            Document = _Document;
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

            _export("Factory", Factory = function () {
                function Factory() {
                    _classCallCheck(this, Factory);
                }

                _createClass(Factory, null, [{
                    key: "hasClassProperties",
                    value: function hasClassProperties(document) {
                        return Utils.hasPropertyDefined(document, "_documents") && Utils.hasPropertyDefined(document, "_etag") && Utils.hasFunction(document, "refresh") && Utils.hasFunction(document, "save") && Utils.hasFunction(document, "destroy") && Utils.hasFunction(document, "executeSELECTQuery");
                    }
                }, {
                    key: "is",
                    value: function is(object) {
                        return Factory.hasClassProperties(object);
                    }
                }, {
                    key: "create",
                    value: function create(uri, documents) {
                        var document = Document.factory.create(uri);
                        return Factory.decorate(document, documents);
                    }
                }, {
                    key: "createFrom",
                    value: function createFrom(object, uri, documents) {
                        var document = Document.factory.createFrom(object, uri);
                        return Factory.decorate(document, documents);
                    }
                }, {
                    key: "decorate",
                    value: function decorate(document, documents) {
                        if (Factory.hasClassProperties(document)) return document;
                        var persistedDocument = document;
                        Object.defineProperties(persistedDocument, {
                            "_documents": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: documents
                            },
                            "_etag": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: null
                            },
                            "hasPointer": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: function () {
                                    var superFunction = persistedDocument.hasPointer;
                                    return function (id) {
                                        if (superFunction.call(this, id)) return true;
                                        return this._documents.hasPointer(id);
                                    };
                                }()
                            },
                            "getPointer": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: function () {
                                    var superFunction = persistedDocument.getPointer;
                                    var inScopeFunction = persistedDocument.inScope;
                                    return function (id) {
                                        if (inScopeFunction.call(this, id)) return superFunction.call(this, id);
                                        return this._documents.getPointer(id);
                                    };
                                }()
                            },
                            "inScope": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: function () {
                                    var superFunction = persistedDocument.inScope;
                                    return function (id) {
                                        if (superFunction.call(this, id)) return true;
                                        return this._documents.inScope(id);
                                    };
                                }()
                            },
                            "refresh": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: refresh
                            },
                            "save": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: save
                            },
                            "destroy": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: destroy
                            },
                            "executeSELECTQuery": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: executeSELECTQuery
                            }
                        });
                        return persistedDocument;
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);
        }
    };
});
//# sourceMappingURL=PersistedDocument.js.map
