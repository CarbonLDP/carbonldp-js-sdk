"use strict";

System.register(["./SDKContext", "./ObjectSchema"], function (_export, _context) {
    var SDKContext, ObjectSchema, _createClass, AbstractContext;

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
        setters: [function (_SDKContext) {
            SDKContext = _SDKContext;
        }, function (_ObjectSchema) {
            ObjectSchema = _ObjectSchema;
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

            AbstractContext = function (_SDKContext$Class) {
                _inherits(AbstractContext, _SDKContext$Class);

                function AbstractContext() {
                    var parentContext = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    _classCallCheck(this, AbstractContext);

                    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AbstractContext).call(this));

                    _this._parentContext = !!parentContext ? parentContext : SDKContext.instance;
                    _this.generalObjectSchema = !!parentContext ? null : new ObjectSchema.DigestedObjectSchema();
                    return _this;
                }

                _createClass(AbstractContext, [{
                    key: "parentContext",
                    get: function get() {
                        return this._parentContext;
                    }
                }]);

                return AbstractContext;
            }(SDKContext.Class);

            _export("default", AbstractContext);
        }
    };
});
//# sourceMappingURL=AbstractContext.js.map
