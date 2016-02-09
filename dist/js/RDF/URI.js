"use strict";

System.register(["./../Utils"], function (_export, _context) {
    var Utils, _slicedToArray, _createClass, Class, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function prefixWithObjectSchema(uri, objectSchema) {
        var prefixEntries = objectSchema.prefixes.entries();

        while (true) {
            var result = prefixEntries.next();
            if (result.done) return uri;

            var _result$value = _slicedToArray(result.value, 2);

            var prefix = _result$value[0];
            var prefixURI = _result$value[1];
            if (!Util.isAbsolute(prefixURI.toString())) continue;
            if (!uri.startsWith(prefixURI.toString())) continue;
            return Util.prefix(uri, prefix, prefixURI.toString());
        }
    }

    return {
        setters: [function (_Utils) {
            Utils = _Utils;
        }],
        execute: function () {
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
                function Class(stringValue) {
                    _classCallCheck(this, Class);

                    this.stringValue = stringValue;
                }

                _createClass(Class, [{
                    key: "toString",
                    value: function toString() {
                        return this.stringValue;
                    }
                }]);

                return Class;
            }());

            _export("Class", Class);

            _export("Util", Util = function () {
                function Util() {
                    _classCallCheck(this, Util);
                }

                _createClass(Util, null, [{
                    key: "hasFragment",
                    value: function hasFragment(uri) {
                        return uri.indexOf("#") !== -1;
                    }
                }, {
                    key: "hasProtocol",
                    value: function hasProtocol(uri) {
                        return Utils.S.startsWith(uri, "https://") || Utils.S.startsWith(uri, "http://");
                    }
                }, {
                    key: "isAbsolute",
                    value: function isAbsolute(uri) {
                        if (Utils.S.startsWith(uri, "http://")) return true;
                        if (Utils.S.startsWith(uri, "https://")) return true;
                        if (Utils.S.startsWith(uri, "://")) return true;
                        return false;
                    }
                }, {
                    key: "isRelative",
                    value: function isRelative(uri) {
                        return !Util.isAbsolute(uri);
                    }
                }, {
                    key: "isBNodeID",
                    value: function isBNodeID(uri) {
                        return Utils.S.startsWith(uri, "_:");
                    }
                }, {
                    key: "isPrefixed",
                    value: function isPrefixed(uri) {
                        return !Util.isAbsolute(uri) && Utils.S.contains(uri, ":");
                    }
                }, {
                    key: "isFragmentOf",
                    value: function isFragmentOf(fragmentURI, uri) {
                        if (!Util.hasFragment(fragmentURI)) return false;
                        return Util.getDocumentURI(fragmentURI) === uri;
                    }
                }, {
                    key: "isBaseOf",
                    value: function isBaseOf(baseURI, uri) {
                        if (baseURI === uri) return true;
                        if (baseURI === "") return true;

                        if (uri.startsWith(baseURI)) {
                            if (Utils.S.endsWith(baseURI, "/")) return true;
                            var relativeURI = uri.substring(baseURI.length);
                            if (Utils.S.startsWith(relativeURI, "/") || Utils.S.startsWith(relativeURI, "#")) return true;
                        }

                        return false;
                    }
                }, {
                    key: "getRelativeURI",
                    value: function getRelativeURI(absoluteURI, base) {
                        return absoluteURI.substring(base.length);
                    }
                }, {
                    key: "getDocumentURI",
                    value: function getDocumentURI(uri) {
                        var parts = uri.split("#");
                        if (parts.length > 2) throw new Error("IllegalArgument: The URI provided has more than one # sign.");
                        return parts[0];
                    }
                }, {
                    key: "getFragment",
                    value: function getFragment(uri) {
                        var parts = uri.split("#");
                        if (parts.length < 2) return null;
                        if (parts.length > 2) throw new Error("IllegalArgument: The URI provided has more than one # sign.");
                        return parts[1];
                    }
                }, {
                    key: "resolve",
                    value: function resolve(parentURI, childURI) {
                        var finalURI = parentURI;
                        if (!Utils.S.endsWith(parentURI, "/")) finalURI += "/";

                        if (Utils.S.startsWith(childURI, "/")) {
                            finalURI = finalURI + childURI.substr(1, childURI.length);
                        } else finalURI += childURI;

                        return finalURI;
                    }
                }, {
                    key: "removeProtocol",
                    value: function removeProtocol(uri) {
                        if (Utils.S.startsWith(uri, "https://")) return uri.substr(5, uri.length);
                        if (Utils.S.startsWith(uri, "http://")) return uri.substr(4, uri.length);
                        return uri;
                    }
                }, {
                    key: "prefix",
                    value: function prefix(uri, prefixOrObjectSchema) {
                        var prefixURI = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                        var objectSchema = !Utils.isString(prefixOrObjectSchema) ? prefixOrObjectSchema : null;
                        var prefix = Utils.isString(prefixOrObjectSchema) ? prefixOrObjectSchema : null;
                        if (objectSchema !== null) return prefixWithObjectSchema(uri, objectSchema);
                        return prefix + ":" + uri.substring(prefixURI.length);
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=URI.js.map
