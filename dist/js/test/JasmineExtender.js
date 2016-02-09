"use strict";

System.register([], function (_export, _context) {
    var MODULE, SUBMODULE, CLASS, INTERFACE, STATIC, INSTANCE, CONSTRUCTOR, METHOD, SIGNATURE, PROPERTY, SUPER_CLASS, property;

    function toJSON(descriptor) {
        return "JSON" + JSON.stringify(descriptor);
    }

    return {
        setters: [],
        execute: function () {
            function serialize(descriptor) {
                return "JSON" + JSON.stringify(descriptor);
            }

            _export("serialize", serialize);

            _export("MODULE", MODULE = "module");

            _export("MODULE", MODULE);

            _export("SUBMODULE", SUBMODULE = "submodule");

            _export("SUBMODULE", SUBMODULE);

            _export("CLASS", CLASS = "class");

            _export("CLASS", CLASS);

            _export("INTERFACE", INTERFACE = "interface");

            _export("INTERFACE", INTERFACE);

            _export("STATIC", STATIC = "static");

            _export("STATIC", STATIC);

            _export("INSTANCE", INSTANCE = "instance");

            _export("INSTANCE", INSTANCE);

            _export("CONSTRUCTOR", CONSTRUCTOR = "constructor");

            _export("CONSTRUCTOR", CONSTRUCTOR);

            _export("METHOD", METHOD = "method");

            _export("METHOD", METHOD);

            _export("SIGNATURE", SIGNATURE = "signature");

            _export("SIGNATURE", SIGNATURE);

            _export("PROPERTY", PROPERTY = "property");

            _export("PROPERTY", PROPERTY);

            _export("SUPER_CLASS", SUPER_CLASS = "super-class");

            _export("SUPER_CLASS", SUPER_CLASS);

            function _module(name) {
                var description = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                var descriptor = {
                    suiteType: MODULE,
                    name: name,
                    description: description
                };
                return toJSON(descriptor);
            }

            _export("module", _module);

            function submodule(access, name) {
                var description = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var descriptor = {
                    suiteType: SUBMODULE,
                    access: access,
                    name: name,
                    description: description
                };
                return toJSON(descriptor);
            }

            _export("submodule", submodule);

            function clazz(name, description) {
                var parent = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var interfaces = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
                var descriptor = {
                    suiteType: CLASS,
                    name: name,
                    description: description,
                    parent: parent,
                    interfaces: interfaces
                };
                return toJSON(descriptor);
            }

            _export("clazz", clazz);

            function interfaze(name, description) {
                var parent = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var descriptor = {
                    suiteType: INTERFACE,
                    name: name,
                    description: description,
                    parent: parent
                };
                return toJSON(descriptor);
            }

            _export("interfaze", interfaze);

            function constructor(name, description) {
                var descriptor = {
                    suiteType: CONSTRUCTOR,
                    name: name,
                    description: description
                };
                return toJSON(descriptor);
            }

            _export("constructor", constructor);

            function hasInterface(access, name) {
                var description = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var descriptor = {
                    access: access,
                    specType: INTERFACE,
                    name: name,
                    description: description
                };
                return toJSON(descriptor);
            }

            _export("hasInterface", hasInterface);

            function isDefined() {
                return "is defined";
            }

            _export("isDefined", isDefined);

            function hasConstructor() {
                var argumentsOrDescription = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var constructorArguments = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                var description = null;

                if (typeof argumentsOrDescription === "string") {
                    description = argumentsOrDescription;
                } else if (Object.prototype.toString.call(argumentsOrDescription) === "[object Array]") {
                    constructorArguments = argumentsOrDescription;
                }

                var descriptor = {
                    access: STATIC,
                    specType: CONSTRUCTOR,
                    description: description,
                    arguments: constructorArguments
                };
                return toJSON(descriptor);
            }

            _export("hasConstructor", hasConstructor);

            function hasMethod(access, name) {
                var descriptionOrArgumentsOrReturns = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var argumentsOrReturns = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
                var returns = arguments.length <= 4 || arguments[4] === undefined ? null : arguments[4];
                var description = null,
                    methodArguments = [];

                if (typeof descriptionOrArgumentsOrReturns === "string") {
                    description = descriptionOrArgumentsOrReturns;
                } else if (Object.prototype.toString.call(descriptionOrArgumentsOrReturns) === "[object Array]") {
                    methodArguments = descriptionOrArgumentsOrReturns;
                } else if (descriptionOrArgumentsOrReturns) {
                    returns = descriptionOrArgumentsOrReturns;
                }

                if (Object.prototype.toString.call(argumentsOrReturns) === "[object Array]") {
                    methodArguments = argumentsOrReturns;
                } else if (argumentsOrReturns) {
                    returns = argumentsOrReturns;
                }

                var descriptor = {
                    access: access,
                    specType: METHOD,
                    name: name,
                    description: description,
                    arguments: methodArguments,
                    returns: returns
                };
                return toJSON(descriptor);
            }

            _export("hasMethod", hasMethod);

            function method(access, name) {
                var description = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var descriptor = {
                    access: access,
                    suiteType: METHOD,
                    name: name,
                    description: description
                };
                return toJSON(descriptor);
            }

            _export("method", method);

            function hasSignature() {
                var descriptionOrArgumentsOrReturns = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                var argumentsOrReturns = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
                var returns = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
                var description = null;
                var methodArguments = null;

                if (typeof descriptionOrArgumentsOrReturns === "string") {
                    description = descriptionOrArgumentsOrReturns;
                } else if (Object.prototype.toString.call(descriptionOrArgumentsOrReturns) === "[object Array]") {
                    methodArguments = descriptionOrArgumentsOrReturns;
                } else if (descriptionOrArgumentsOrReturns) {
                    returns = descriptionOrArgumentsOrReturns;
                }

                if (Object.prototype.toString.call(argumentsOrReturns) === "[object Array]") {
                    methodArguments = argumentsOrReturns;
                } else if (argumentsOrReturns) {
                    returns = argumentsOrReturns;
                }

                var descriptor = {
                    specType: SIGNATURE,
                    description: description,
                    arguments: methodArguments,
                    returns: returns
                };
                return toJSON(descriptor);
            }

            _export("hasSignature", hasSignature);

            function hasProperty(access, name, type) {
                var description = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
                var descriptor = {
                    access: access,
                    specType: PROPERTY,
                    name: name,
                    type: type,
                    description: description
                };
                return toJSON(descriptor);
            }

            _export("hasProperty", hasProperty);

            _export("property", property = hasProperty);

            _export("property", property);

            function extendsClass(name) {
                var descriptor = {
                    specType: SUPER_CLASS,
                    name: name
                };
                return toJSON(descriptor);
            }

            _export("extendsClass", extendsClass);
        }
    };
});
//# sourceMappingURL=JasmineExtender.js.map
