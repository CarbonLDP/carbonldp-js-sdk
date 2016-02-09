"use strict";

System.register(["jsonld", "./Errors", "./HTTP", "./RDF", "./Utils", "./JSONLDConverter", "./PersistedDocument", "./Pointer", "./ObjectSchema", "./NS/LDP", "./SPARQL"], function (_export, _context) {
    var jsonld, Errors, HTTP, RDF, Utils, JSONLDConverter, PersistedDocument, Pointer, ObjectSchema, LDP, SPARQL, _typeof, _createClass, _slicedToArray, Documents;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function parse(input) {
        try {
            return JSON.parse(input);
        } catch (error) {
            throw error;
        }
    }

    function expand(_ref, options) {
        var _ref2 = _slicedToArray(_ref, 2);

        var result = _ref2[0];
        var response = _ref2[1];
        return new Promise(function (resolve, reject) {
            jsonld.expand(result, options, function (error, expanded) {
                if (error) {
                    throw error;
                }

                result = expanded;
                resolve([result, response]);
            });
        });
    }

    return {
        setters: [function (_jsonld) {
            jsonld = _jsonld;
        }, function (_Errors) {
            Errors = _Errors;
        }, function (_HTTP) {
            HTTP = _HTTP;
        }, function (_RDF) {
            RDF = _RDF;
        }, function (_Utils) {
            Utils = _Utils;
        }, function (_JSONLDConverter) {
            JSONLDConverter = _JSONLDConverter;
        }, function (_PersistedDocument) {
            PersistedDocument = _PersistedDocument;
        }, function (_Pointer) {
            Pointer = _Pointer;
        }, function (_ObjectSchema) {
            ObjectSchema = _ObjectSchema;
        }, function (_NSLDP) {
            LDP = _NSLDP;
        }, function (_SPARQL) {
            SPARQL = _SPARQL;
        }],
        execute: function () {
            _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
                return typeof obj;
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
            };

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

            _slicedToArray = function () {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;

                    try {
                        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);

                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i["return"]) _i["return"]();
                        } finally {
                            if (_d) throw _e;
                        }
                    }

                    return _arr;
                }

                return function (arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError("Invalid attempt to destructure non-iterable instance");
                    }
                };
            }();

            Documents = function () {
                function Documents() {
                    var context = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    _classCallCheck(this, Documents);

                    this.context = context;
                    this.pointers = new Map();

                    if (!!this.context && !!this.context.parentContext) {
                        var contextJSONLDConverter = this.context.parentContext.Documents.jsonldConverter;
                        this._jsonldConverter = new JSONLDConverter.Class(contextJSONLDConverter.literalSerializers);
                    } else {
                        this._jsonldConverter = new JSONLDConverter.Class();
                    }
                }

                _createClass(Documents, [{
                    key: "inScope",
                    value: function inScope(idOrPointer) {
                        var id = Pointer.Factory.is(idOrPointer) ? idOrPointer.id : idOrPointer;
                        if (RDF.URI.Util.isBNodeID(id)) return false;

                        if (!!this.context) {
                            var baseURI = this.context.getBaseURI();
                            if (RDF.URI.Util.isAbsolute(id) && RDF.URI.Util.isBaseOf(baseURI, id)) return true;
                        } else {
                            if (RDF.URI.Util.isAbsolute(id)) return true;
                        }

                        if (!!this.context && !!this.context.parentContext) return this.context.parentContext.Documents.inScope(id);
                        return false;
                    }
                }, {
                    key: "hasPointer",
                    value: function hasPointer(id) {
                        id = this.getPointerID(id);
                        if (this.pointers.has(id)) return true;
                        if (!!this.context && !!this.context.parentContext) return this.context.parentContext.Documents.hasPointer(id);
                        return false;
                    }
                }, {
                    key: "getPointer",
                    value: function getPointer(id) {
                        var localID = this.getPointerID(id);

                        if (!localID) {
                            if (!!this.context && !!this.context.parentContext) return this.context.parentContext.Documents.getPointer(id);
                            throw new Errors.IllegalArgumentError("The pointer id is not supported by this module.");
                        }

                        var pointer = undefined;

                        if (!this.pointers.has(localID)) {
                            pointer = this.createPointer(localID);
                            this.pointers.set(localID, pointer);
                        }

                        return this.pointers.get(localID);
                    }
                }, {
                    key: "get",
                    value: function get(uri) {
                        var _this = this;

                        var requestOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        var pointerID = this.getPointerID(uri);
                        if (!!this.context) uri = this.context.resolve(uri);

                        if (this.pointers.has(pointerID)) {
                            var _ret = function () {
                                var pointer = _this.getPointer(uri);

                                if (pointer.isResolved()) {
                                    return {
                                        v: new Promise(function (resolve, reject) {
                                            resolve([pointer, null]);
                                        })
                                    };
                                }
                            }();

                            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                        }

                        if (this.context && this.context.Auth.isAuthenticated()) this.context.Auth.addAuthentication(requestOptions);
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
                        return HTTP.Request.Service.get(uri, requestOptions).then(function (response) {
                            var parsedObject = parse(response.data);
                            return expand([parsedObject, response]);
                        }).then(function (_ref3) {
                            var _ref4 = _slicedToArray(_ref3, 2);

                            var expandedResult = _ref4[0];
                            var response = _ref4[1];
                            var etag = HTTP.Response.Util.getETag(response);
                            if (etag === null) throw new HTTP.Errors.BadResponseError("The response doesn't contain an ETag", response);
                            var rdfDocuments = RDF.Document.Util.getDocuments(expandedResult);

                            var rdfDocument = _this.getRDFDocument(rdfDocuments, response);

                            var documentResources = RDF.Document.Util.getDocumentResources(rdfDocument);
                            if (documentResources.length > 1) throw new HTTP.Errors.BadResponseError("The RDFDocument contains more than one document resource.", response);
                            if (documentResources.length === 0) throw new HTTP.Errors.BadResponseError("The RDFDocument doesn\'t contain a document resource.", response);
                            var documentResource = documentResources[0];
                            var fragmentResources = RDF.Document.Util.getBNodeResources(rdfDocument);
                            var namedFragmentResources = RDF.Document.Util.getFragmentResources(rdfDocument);

                            var documentPointer = _this.getPointer(uri);

                            documentPointer._resolved = true;
                            var document = PersistedDocument.Factory.createFrom(documentPointer, uri, _this);
                            document._etag = etag;
                            var fragments = [];
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = fragmentResources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var fragmentResource = _step.value;
                                    fragments.push(document.createFragment(fragmentResource["@id"]));
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

                            var namedFragments = [];
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = namedFragmentResources[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var namedFragmentResource = _step2.value;
                                    namedFragments.push(document.createNamedFragment(namedFragmentResource["@id"]));
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

                            _this.compact(documentResource, document, document);

                            _this.compact(fragmentResources, fragments, document);

                            _this.compact(namedFragmentResources, namedFragments, document);

                            return [document, response];
                        });
                    }
                }, {
                    key: "createChild",
                    value: function createChild(parentURI, slugOrChildDocument) {
                        var _this2 = this;

                        var childDocumentOrRequestOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                        var requestOptions = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
                        var slug = Utils.isString(slugOrChildDocument) ? slugOrChildDocument : null;
                        var childDocument = !Utils.isString(slugOrChildDocument) ? slugOrChildDocument : childDocumentOrRequestOptions;
                        requestOptions = !Utils.isString(slugOrChildDocument) ? childDocumentOrRequestOptions : requestOptions;
                        if (PersistedDocument.Factory.is(childDocument)) return Utils.P.createRejectedPromise(new Errors.IllegalArgumentError("The childDocument provided has been already persisted."));

                        if (childDocument.id) {
                            if (!RDF.URI.Util.isBaseOf(parentURI, childDocument.id)) return Utils.P.createRejectedPromise(new Errors.IllegalArgumentError("The childDocument's URI is not relative to the parentURI specified"));
                        }

                        if (this.context && this.context.Auth.isAuthenticated()) this.context.Auth.addAuthentication(requestOptions);
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
                        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.Container, requestOptions);
                        if (slug !== null) HTTP.Request.Util.setSlug(slug, requestOptions);
                        var body = childDocument.toJSON(this, this.jsonldConverter);
                        return HTTP.Request.Service.post(parentURI, body, requestOptions).then(function (response) {
                            var locationHeader = response.headers.get("Location");
                            if (locationHeader === null || locationHeader.values.length < 1) throw new HTTP.Errors.BadResponseError("The response is missing a Location header.", response);
                            if (locationHeader.values.length !== 1) throw new HTTP.Errors.BadResponseError("The response contains more than one Location header.", response);
                            var locationURI = locationHeader.values[0].toString();

                            var pointer = _this2.getPointer(locationURI);

                            return [pointer, response];
                        });
                    }
                }, {
                    key: "save",
                    value: function save(persistedDocument) {
                        var requestOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        if (this.context && this.context.Auth.isAuthenticated()) this.context.Auth.addAuthentication(requestOptions);
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                        HTTP.Request.Util.setContentTypeHeader("application/ld+json", requestOptions);
                        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
                        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
                        var body = persistedDocument.toJSON(this, this.jsonldConverter);
                        return HTTP.Request.Service.put(persistedDocument.id, body, requestOptions).then(function (response) {
                            return [persistedDocument, response];
                        });
                    }
                }, {
                    key: "delete",
                    value: function _delete(persistedDocument) {
                        var requestOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        if (this.context && this.context.Auth.isAuthenticated()) this.context.Auth.addAuthentication(requestOptions);
                        HTTP.Request.Util.setAcceptHeader("application/ld+json", requestOptions);
                        HTTP.Request.Util.setPreferredInteractionModel(LDP.Class.RDFSource, requestOptions);
                        HTTP.Request.Util.setIfMatchHeader(persistedDocument._etag, requestOptions);
                        return HTTP.Request.Service.delete(persistedDocument.id, persistedDocument.toJSON(), requestOptions);
                    }
                }, {
                    key: "getSchemaFor",
                    value: function getSchemaFor(object) {
                        if ("@id" in object) {
                            return this.getDigestedObjectSchemaForExpandedObject(object);
                        } else {
                            return this.getDigestedObjectSchemaForDocument(object);
                        }
                    }
                }, {
                    key: "executeSELECTQuery",
                    value: function executeSELECTQuery(documentURI, selectQuery) {
                        var requestOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

                        if (!RDF.URI.Util.isAbsolute(documentURI)) {
                            if (!this.context) throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
                            documentURI = this.context.resolve(documentURI);
                        }

                        if (this.context && this.context.Auth.isAuthenticated()) this.context.Auth.addAuthentication(requestOptions);
                        return SPARQL.Service.executeSELECTQuery(documentURI, selectQuery, requestOptions);
                    }
                }, {
                    key: "getRDFDocument",
                    value: function getRDFDocument(rdfDocuments, response) {
                        if (rdfDocuments.length === 0) throw new HTTP.Errors.BadResponseError("No document was returned.", response);
                        if (rdfDocuments.length > 1) throw new Error("Unsupported: Multiple graphs are currently not supported.");
                        return rdfDocuments[0];
                    }
                }, {
                    key: "getPointerID",
                    value: function getPointerID(uri) {
                        if (RDF.URI.Util.isBNodeID(uri)) throw new Errors.IllegalArgumentError("BNodes cannot be fetched directly.");

                        if (!!this.context) {
                            if (RDF.URI.Util.isRelative(uri)) {
                                var baseURI = this.context.getBaseURI();
                                if (!RDF.URI.Util.isBaseOf(baseURI, uri)) return null;
                                return uri.substring(baseURI.length);
                            } else {
                                return uri;
                            }
                        } else {
                            if (RDF.URI.Util.isRelative(uri)) throw new Errors.IllegalArgumentError("This Documents instance doesn't support relative URIs.");
                            return uri;
                        }
                    }
                }, {
                    key: "createPointer",
                    value: function createPointer(localID) {
                        var _this3 = this;

                        var id = !!this.context ? this.context.resolve(localID) : localID;
                        var pointer = Pointer.Factory.create(id);
                        Object.defineProperty(pointer, "resolve", {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: function value() {
                                return _this3.get(id);
                            }
                        });
                        return pointer;
                    }
                }, {
                    key: "compact",
                    value: function compact(expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary) {
                        if (!Utils.isArray(expandedObjectOrObjects)) return this.compactSingle(expandedObjectOrObjects, targetObjectOrObjects, pointerLibrary);
                        var expandedObjects = expandedObjectOrObjects;
                        var targetObjects = !!targetObjectOrObjects ? targetObjectOrObjects : [];

                        for (var i = 0, length = expandedObjects.length; i < length; i++) {
                            var expandedObject = expandedObjects[i];
                            var targetObject = targetObjects[i] = !!targetObjects[i] ? targetObjects[i] : {};
                            this.compactSingle(expandedObject, targetObject, pointerLibrary);
                        }

                        return targetObjects;
                    }
                }, {
                    key: "compactSingle",
                    value: function compactSingle(expandedObject, targetObject, pointerLibrary) {
                        var digestedSchema = this.getDigestedObjectSchemaForExpandedObject(expandedObject);
                        return this.jsonldConverter.compact(expandedObject, targetObject, digestedSchema, pointerLibrary);
                    }
                }, {
                    key: "getDigestedObjectSchemaForExpandedObject",
                    value: function getDigestedObjectSchemaForExpandedObject(expandedObject) {
                        var types = this.getExpandedObjectTypes(expandedObject);
                        return this.getDigestedObjectSchema(types);
                    }
                }, {
                    key: "getDigestedObjectSchemaForDocument",
                    value: function getDigestedObjectSchemaForDocument(document) {
                        var types = this.getDocumentTypes(document);
                        return this.getDigestedObjectSchema(types);
                    }
                }, {
                    key: "getDigestedObjectSchema",
                    value: function getDigestedObjectSchema(objectTypes) {
                        var digestedSchema = undefined;

                        if (!!this.context) {
                            var typesDigestedObjectSchemas = [this.context.getObjectSchema()];
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = objectTypes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var type = _step3.value;
                                    if (this.context.getObjectSchema(type)) typesDigestedObjectSchemas.push(this.context.getObjectSchema(type));
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

                            if (typesDigestedObjectSchemas.length > 1) {
                                digestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas(typesDigestedObjectSchemas);
                            } else {
                                digestedSchema = typesDigestedObjectSchemas[0];
                            }
                        } else {
                            digestedSchema = new ObjectSchema.DigestedObjectSchema();
                        }

                        return digestedSchema;
                    }
                }, {
                    key: "getExpandedObjectTypes",
                    value: function getExpandedObjectTypes(expandedObject) {
                        if (!expandedObject["@type"]) return [];
                        return expandedObject["@type"];
                    }
                }, {
                    key: "getDocumentTypes",
                    value: function getDocumentTypes(document) {
                        if (!document.types) return [];
                        return document.types;
                    }
                }, {
                    key: "jsonldConverter",
                    get: function get() {
                        return this._jsonldConverter;
                    }
                }]);

                return Documents;
            }();

            _export("default", Documents);
        }
    };
});
//# sourceMappingURL=Documents.js.map
