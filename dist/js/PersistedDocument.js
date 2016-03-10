System.register(["./Document", "./Utils", "./RDF/URI"], function(exports_1) {
    var Document, Utils, URI;
    var Factory;
    function isDirty() {
        // TODO
        return null;
    }
    function refresh() {
        // TODO
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
    function executeRawASKQuery(askQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this._documents.executeRawASKQuery(this.id, askQuery, requestOptions);
    }
    function executeRawSELECTQuery(selectQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this._documents.executeRawSELECTQuery(this.id, selectQuery, requestOptions);
    }
    function executeRawCONSTRUCTQuery(constructQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this._documents.executeRawCONSTRUCTQuery(this.id, constructQuery, requestOptions);
    }
    function executeRawDESCRIBEQuery(describeQuery, requestOptions) {
        if (requestOptions === void 0) { requestOptions = {}; }
        return this._documents.executeRawDESCRIBEQuery(this.id, describeQuery, requestOptions);
    }
    return {
        setters:[
            function (Document_1) {
                Document = Document_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            },
            function (URI_1) {
                URI = URI_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (document) {
                    return (Utils.hasPropertyDefined(document, "_documents") &&
                        Utils.hasPropertyDefined(document, "_etag") &&
                        Utils.hasFunction(document, "refresh") &&
                        Utils.hasFunction(document, "save") &&
                        Utils.hasFunction(document, "destroy") &&
                        Utils.hasFunction(document, "executeRawASKQuery") &&
                        Utils.hasFunction(document, "executeRawSELECTQuery") &&
                        Utils.hasFunction(document, "executeRawDESCRIBEQuery") &&
                        Utils.hasFunction(document, "executeRawCONSTRUCTQuery"));
                };
                Factory.is = function (object) {
                    return Utils.isObject(object)
                        && Document.Factory.hasClassProperties(object)
                        && Factory.hasClassProperties(object);
                };
                Factory.create = function (uri, documents) {
                    var document = Document.Factory.create(uri);
                    return Factory.decorate(document, documents);
                };
                Factory.createFrom = function (object, uri, documents) {
                    var document = Document.Factory.createFrom(object, uri);
                    return Factory.decorate(document, documents);
                };
                Factory.decorate = function (document, documents) {
                    if (Factory.hasClassProperties(document))
                        return document;
                    var persistedDocument = document;
                    Object.defineProperties(persistedDocument, {
                        "_documents": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: documents,
                        },
                        "_etag": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: null,
                        },
                        "hasPointer": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: (function () {
                                var superFunction = persistedDocument.hasPointer;
                                return function (id) {
                                    if (superFunction.call(this, id))
                                        return true;
                                    return !URI.Util.isBNodeID(id)
                                        && this._documents.hasPointer(id);
                                };
                            })(),
                        },
                        "getPointer": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: (function () {
                                var superFunction = persistedDocument.getPointer;
                                var inScopeFunction = persistedDocument.inScope;
                                return function (id) {
                                    if (inScopeFunction.call(this, id))
                                        return superFunction.call(this, id);
                                    return this._documents.getPointer(id);
                                };
                            })(),
                        },
                        "inScope": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: (function () {
                                var superFunction = persistedDocument.inScope;
                                return function (idOrPointer) {
                                    if (superFunction.call(this, idOrPointer))
                                        return true;
                                    return this._documents.inScope(idOrPointer);
                                };
                            })(),
                        },
                        "refresh": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: refresh,
                        },
                        "save": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: save,
                        },
                        "destroy": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: destroy,
                        },
                        "executeRawASKQuery": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: executeRawASKQuery,
                        },
                        "executeRawSELECTQuery": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: executeRawSELECTQuery,
                        },
                        "executeRawCONSTRUCTQuery": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: executeRawCONSTRUCTQuery,
                        },
                        "executeRawDESCRIBEQuery": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: executeRawDESCRIBEQuery,
                        },
                    });
                    /*
            
                    // TODO: Overwrite isDirty to also take into account the fragments state
                    // TODO: Update with the new comparison system
                    persistedDocument.isDirty = (function():() => boolean {
                        let superFunction:() => boolean = persistedDocument.isDirty;
                        return function():boolean {
                            return superFunction.call( this ) || isDirty.call( this );
                        };
                    })();
            
                    */
                    return persistedDocument;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=PersistedDocument.js.map
