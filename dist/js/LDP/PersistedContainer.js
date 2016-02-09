"use strict";

System.register(["./../Utils"], function (_export, _context) {
    var Utils, _createClass, Factory;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function createChild() {
        var slugOrObject = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        var object = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var slug = Utils.isString(slugOrObject) ? slugOrObject : null;
        object = !!slugOrObject && !Utils.isString(slugOrObject) ? slugOrObject : !!object ? object : null;
        var document = object;

        if (slug !== null) {
            return this._documents.createChild(this.id, slug, document);
        } else return this._documents.createChild(this.id, document);
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
                    value: function hasClassProperties(document) {
                        return Utils.hasFunction(document, "createChild");
                    }
                }, {
                    key: "decorate",
                    value: function decorate(persistedDocument) {
                        if (Factory.hasClassProperties(persistedDocument)) return persistedDocument;
                        Object.defineProperties(persistedDocument, {
                            "createChild": {
                                writable: false,
                                enumerable: false,
                                configurable: true,
                                value: createChild
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
//# sourceMappingURL=PersistedContainer.js.map
