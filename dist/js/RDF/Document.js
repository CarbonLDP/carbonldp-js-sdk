"use strict";

System.register(["./RDFNode", "../Utils", "./URI"], function (_export, _context) {
    var RDFNode, Utils, URI, _createClass, Factory, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_RDFNode) {
            RDFNode = _RDFNode;
        }, function (_Utils) {
            Utils = _Utils;
        }, function (_URI) {
            URI = _URI;
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
                    key: "is",
                    value: function is(object) {
                        return Utils.hasProperty(object, "@graph");
                    }
                }, {
                    key: "create",
                    value: function create(resources, uri) {
                        var document = uri ? RDFNode.Factory.create(uri) : {};
                        document["@graph"] = resources;
                        return document;
                    }
                }]);

                return Factory;
            }());

            _export("Factory", Factory);

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "getDocuments",
                    value: function getDocuments(value) {
                        if (Utils.isArray(value)) {
                            if (value.length === 0) return value;
                            if (Factory.is(value[0])) return value;
                            if (RDFNode.Factory.is(value[0])) return [Factory.create(value)];
                        } else if (Utils.isObject(value)) {
                            if (Factory.is(value)) return [value];
                            if (RDFNode.Factory.is(value)) return [Factory.create([value])];
                        } else throw new Error("IllegalArgument: The value structure isn't valid.");
                    }
                }, {
                    key: "getResources",
                    value: function getResources(value) {
                        var documents = Util.getDocuments(value);
                        var resources = [];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = documents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var document = _step.value;
                                resources = resources.concat(document["@graph"]);
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

                        return resources;
                    }
                }, {
                    key: "getDocumentResources",
                    value: function getDocumentResources(document) {
                        var resources = Util.getResources(document);
                        var documentResources = [];

                        for (var i = 0, length = resources.length; i < length; i++) {
                            var resource = resources[i];
                            var uri = resource["@id"];
                            if (!uri) continue;
                            if (!URI.Util.hasFragment(uri) && !URI.Util.isBNodeID(uri)) documentResources.push(resource);
                        }

                        return documentResources;
                    }
                }, {
                    key: "getFragmentResources",
                    value: function getFragmentResources(document, documentResource) {
                        var resources = Util.getResources(document);
                        var documentURIToMatch = null;

                        if (documentResource) {
                            if (Utils.isString(documentResource)) {
                                documentURIToMatch = documentResource;
                            } else documentURIToMatch = documentResource["@id"];
                        }

                        var fragmentResources = [];

                        for (var i = 0, length = resources.length; i < length; i++) {
                            var resource = resources[i];
                            var uri = resource["@id"];
                            if (!uri) continue;
                            if (!URI.Util.hasFragment(uri)) continue;

                            if (!documentURIToMatch) {
                                fragmentResources.push(resource);
                            } else {
                                var documentURI = URI.Util.getDocumentURI(uri);
                                if (documentURI === documentURIToMatch) fragmentResources.push(resource);
                            }
                        }

                        return fragmentResources;
                    }
                }, {
                    key: "getBNodeResources",
                    value: function getBNodeResources(document) {
                        var resources = Util.getResources(document);
                        var bnodes = [];

                        for (var i = 0, length = resources.length; i < length; i++) {
                            var resource = resources[i];
                            if (!("@id" in resource) || URI.Util.isBNodeID(resource["@id"])) bnodes.push(resource);
                        }

                        return bnodes;
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);
        }
    };
});
//# sourceMappingURL=Document.js.map
