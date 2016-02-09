"use strict";

System.register(["./Apps", "./Auth", "./AbstractContext", "./Document", "./Documents", "./HTTP", "./RDF", "./settings", "./Utils"], function (_export, _context) {
    var Apps, Auth, AbstractContext, Document, Documents, HTTP, RDF, defaultSettings, Utils, _slicedToArray, _createClass, Carbon;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_Apps) {
            Apps = _Apps.default;
        }, function (_Auth) {
            Auth = _Auth;
        }, function (_AbstractContext2) {
            AbstractContext = _AbstractContext2.default;
        }, function (_Document) {
            Document = _Document;
        }, function (_Documents) {
            Documents = _Documents.default;
        }, function (_HTTP) {
            HTTP = _HTTP;
        }, function (_RDF) {
            RDF = _RDF;
        }, function (_settings) {
            defaultSettings = _settings.default;
        }, function (_Utils) {
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

            Carbon = function (_AbstractContext) {
                _inherits(Carbon, _AbstractContext);

                function Carbon(settings) {
                    _classCallCheck(this, Carbon);

                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Carbon).call(this));

                    settings = settings ? settings : defaultSettings;
                    Utils.M.extend(_this.settings, Utils.M.from(settings));
                    _this.apps = new Apps(_this);
                    return _this;
                }

                _createClass(Carbon, [{
                    key: "resolve",
                    value: function resolve(uri) {
                        if (RDF.URI.Util.isAbsolute(uri)) return uri;
                        var finalURI = this.settings.get("http.ssl") ? "https://" : "http://";
                        finalURI += this.settings.get("domain") + "/" + this.getSetting("platform.container");
                        return RDF.URI.Util.resolve(finalURI, uri);
                    }
                }, {
                    key: "getAPIDescription",
                    value: function getAPIDescription() {
                        return this.Documents.get("api/").then(function (_ref) {
                            var _ref2 = _slicedToArray(_ref, 2);

                            var description = _ref2[0];
                            var response = _ref2[1];
                            return description;
                        });
                    }
                }], [{
                    key: "version",
                    get: function get() {
                        return "0.12.0-ALPHA";
                    }
                }]);

                return Carbon;
            }(AbstractContext);

            Carbon.Apps = Apps;
            Carbon.Auth = Auth;
            Carbon.Document = Document;
            Carbon.Documents = Documents;
            Carbon.HTTP = HTTP;
            Carbon.RDF = RDF;
            Carbon.Utils = Utils;

            _export("default", Carbon);
        }
    };
});
//# sourceMappingURL=Carbon.js.map
