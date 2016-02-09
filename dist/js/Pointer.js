"use strict";

System.register(["./Utils"], function (_export, _context) {
    var Utils, _createClass, Factory, Util;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_Utils) {
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
                    value: function hasClassProperties(object) {
                        return !!(Utils.hasPropertyDefined(object, "_id") && Utils.hasPropertyDefined(object, "_resolved") && Utils.hasPropertyDefined(object, "id") && Utils.hasFunction(object, "isResolved") && Utils.hasPropertyDefined(object, "resolve"));
                    }
                }, {
                    key: "is",
                    value: function is(value) {
                        return !!(Utils.isObject(value) && Factory.hasClassProperties(value));
                    }
                }, {
                    key: "create",
                    value: function create(id) {
                        id = !!id ? id : "";
                        var pointer = Factory.decorate({});
                        pointer.id = id;
                        return pointer;
                    }
                }, {
                    key: "decorate",
                    value: function decorate(object) {
                        if (Factory.hasClassProperties(object)) return object;
                        Object.defineProperties(object, {
                            "_id": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: ""
                            },
                            "_resolved": {
                                writable: true,
                                enumerable: false,
                                configurable: true,
                                value: false
                            },
                            "id": {
                                enumerable: false,
                                configurable: true,
                                get: function get() {
                                    if (!this._id) return "";
                                    return this._id;
                                },
                                set: function set(value) {
                                    this._id = value;
                                }
                            },
                            "isResolved": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: function value() {
                                    return this._resolved;
                                }
                            },
                            "resolve": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: function value() {
                                    var _this = this;

                                    return new Promise(function (resolve, reject) {
                                        return _this;
                                    });
                                }
                            }
                        });
                        return object;
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
                    key: "getIDs",
                    value: function getIDs(pointers) {
                        var ids = [];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = pointers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var pointer = _step.value;
                                ids.push(pointer.id);
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

                        return ids;
                    }
                }]);

                return Util;
            }());

            _export("Util", Util);
        }
    };
});
//# sourceMappingURL=Pointer.js.map
