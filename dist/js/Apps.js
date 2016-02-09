"use strict";

System.register(["./App", "./RDF", "./Utils", "./NS/CS"], function (_export, _context) {
    var App, RDF, Utils, CS, _slicedToArray, _createClass, Apps;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_App) {
            App = _App;
        }, function (_RDF) {
            RDF = _RDF;
        }, function (_Utils) {
            Utils = _Utils;
        }, function (_NSCS) {
            CS = _NSCS;
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

            _export("Apps", Apps = function () {
                function Apps(context) {
                    _classCallCheck(this, Apps);

                    this.context = context;
                }

                _createClass(Apps, [{
                    key: "get",
                    value: function get(uri) {
                        var _this = this;

                        var appsContainerURI = this.getAppsContainerURI();

                        if (RDF.URI.Util.isRelative(uri)) {
                            if (!Utils.S.startsWith(uri, appsContainerURI)) uri = RDF.URI.Util.resolve(appsContainerURI, uri);
                            uri = this.context.resolve(uri);
                        }

                        return this.context.Documents.get(uri).then(function (_ref) {
                            var _ref2 = _slicedToArray(_ref, 2);

                            var document = _ref2[0];
                            var response = _ref2[1];
                            if (!document.types.indexOf(CS.Class.Application)) throw new Error("The resource fetched is not a cs:Application.");
                            return new App.Context(_this.context, document);
                        });
                    }
                }, {
                    key: "getAppsContainerURI",
                    value: function getAppsContainerURI() {
                        if (!this.context.hasSetting("platform.apps.container")) throw new Error("The apps container URI hasn't been set.");
                        return this.context.getSetting("platform.apps.container");
                    }
                }]);

                return Apps;
            }());

            _export("Apps", Apps);

            _export("default", Apps);
        }
    };
});
//# sourceMappingURL=Apps.js.map
