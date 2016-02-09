"use strict";

System.register([], function (_export, _context) {
    var _createClass, AbstractError;

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
        setters: [],
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

            AbstractError = function (_Error) {
                _inherits(AbstractError, _Error);

                function AbstractError(message) {
                    _classCallCheck(this, AbstractError);

                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AbstractError).call(this, message));

                    _this.message = message;
                    return _this;
                }

                _createClass(AbstractError, [{
                    key: "toString",
                    value: function toString() {
                        return this.name + ":" + this.message;
                    }
                }, {
                    key: "name",
                    get: function get() {
                        return "AbstractError";
                    }
                }]);

                return AbstractError;
            }(Error);

            _export("default", AbstractError);
        }
    };
});
//# sourceMappingURL=AbstractError.js.map
