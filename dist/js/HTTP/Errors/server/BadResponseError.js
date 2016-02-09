"use strict";

System.register(["./../HTTPError"], function (_export, _context) {
    var HTTPError, _createClass, name, statusCode, Class;

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
        setters: [function (_HTTPError2) {
            HTTPError = _HTTPError2.default;
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

            name = "BadResponseError";
            statusCode = 0;

            Class = function (_HTTPError) {
                _inherits(Class, _HTTPError);

                function Class() {
                    _classCallCheck(this, Class);

                    return _possibleConstructorReturn(this, Object.getPrototypeOf(Class).apply(this, arguments));
                }

                _createClass(Class, [{
                    key: "name",
                    get: function get() {
                        return name;
                    }
                }], [{
                    key: "statusCode",
                    get: function get() {
                        return statusCode;
                    }
                }]);

                return Class;
            }(HTTPError);

            _export("default", Class);
        }
    };
});
//# sourceMappingURL=BadResponseError.js.map
