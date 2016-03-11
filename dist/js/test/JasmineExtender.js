System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MODULE, CLASS, INTERFACE, STATIC, INSTANCE, CONSTRUCTOR, METHOD, SIGNATURE, PROPERTY, SUPER_CLASS, REEXPORTS, DEFAULTEXPORT, ENUM, DECORATED, property;
    function serialize(descriptor) {
        return "JSON" + JSON.stringify(descriptor);
    }
    exports_1("serialize", serialize);
    function toJSON(descriptor) {
        return "JSON" + JSON.stringify(descriptor);
    }
    function module(name, description) {
        if (description === void 0) { description = null; }
        var descriptor = {
            suiteType: MODULE,
            name: name,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("module", module);
    function clazz(name, description, parent, interfaces) {
        if (parent === void 0) { parent = null; }
        if (interfaces === void 0) { interfaces = null; }
        var descriptor = {
            suiteType: CLASS,
            name: name,
            description: description,
            parent: parent,
            interfaces: interfaces,
        };
        return toJSON(descriptor);
    }
    exports_1("clazz", clazz);
    function interfaze(name, description, parent) {
        if (parent === void 0) { parent = null; }
        var descriptor = {
            suiteType: INTERFACE,
            name: name,
            description: description,
            parent: parent,
        };
        return toJSON(descriptor);
    }
    exports_1("interfaze", interfaze);
    function enumeration(name, description) {
        if (description === void 0) { description = null; }
        var descriptor = {
            suiteType: ENUM,
            name: name,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("enumeration", enumeration);
    function constructor(description) {
        if (description === void 0) { description = null; }
        var descriptor = {
            suiteType: CONSTRUCTOR,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("constructor", constructor);
    function reexports(access, name, originalLocation) {
        var descriptor = {
            specType: REEXPORTS,
            access: access,
            name: name,
            originalLocation: originalLocation,
        };
        return toJSON(descriptor);
    }
    exports_1("reexports", reexports);
    function decoratedObject(description, type) {
        var descriptor = {
            suiteType: DECORATED,
            type: type,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("decoratedObject", decoratedObject);
    function hasInterface(access, name, description) {
        if (description === void 0) { description = null; }
        var descriptor = {
            access: access,
            specType: INTERFACE,
            name: name,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("hasInterface", hasInterface);
    function isDefined() {
        return "is defined";
    }
    exports_1("isDefined", isDefined);
    function hasConstructor(argumentsOrDescription, constructorArguments) {
        if (argumentsOrDescription === void 0) { argumentsOrDescription = null; }
        if (constructorArguments === void 0) { constructorArguments = null; }
        var description = null;
        if (typeof argumentsOrDescription === "string") {
            description = argumentsOrDescription;
        }
        else if (Object.prototype.toString.call(argumentsOrDescription) === "[object Array]") {
            constructorArguments = argumentsOrDescription;
        }
        var descriptor = {
            access: STATIC,
            specType: CONSTRUCTOR,
            description: description,
            arguments: constructorArguments,
        };
        return toJSON(descriptor);
    }
    exports_1("hasConstructor", hasConstructor);
    function hasMethod(access, name, descriptionOrArgumentsOrReturns, argumentsOrReturns, returns) {
        if (descriptionOrArgumentsOrReturns === void 0) { descriptionOrArgumentsOrReturns = null; }
        if (argumentsOrReturns === void 0) { argumentsOrReturns = null; }
        if (returns === void 0) { returns = null; }
        var description = null, methodArguments = [];
        if (typeof descriptionOrArgumentsOrReturns === "string") {
            description = descriptionOrArgumentsOrReturns;
        }
        else if (Object.prototype.toString.call(descriptionOrArgumentsOrReturns) === "[object Array]") {
            methodArguments = descriptionOrArgumentsOrReturns;
        }
        else if (descriptionOrArgumentsOrReturns) {
            returns = descriptionOrArgumentsOrReturns;
        }
        if (Object.prototype.toString.call(argumentsOrReturns) === "[object Array]") {
            methodArguments = argumentsOrReturns;
        }
        else if (argumentsOrReturns) {
            returns = argumentsOrReturns;
        }
        var descriptor = {
            access: access,
            specType: METHOD,
            name: name,
            description: description,
            arguments: methodArguments,
            returns: returns,
        };
        return toJSON(descriptor);
    }
    exports_1("hasMethod", hasMethod);
    function method(access, name, description) {
        if (description === void 0) { description = null; }
        var descriptor = {
            access: access,
            suiteType: METHOD,
            name: name,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("method", method);
    function hasSignature(descriptionOrArgumentsOrReturns, argumentsOrReturns, returns) {
        if (descriptionOrArgumentsOrReturns === void 0) { descriptionOrArgumentsOrReturns = null; }
        if (argumentsOrReturns === void 0) { argumentsOrReturns = null; }
        if (returns === void 0) { returns = null; }
        var description = null;
        var methodArguments = null;
        if (typeof descriptionOrArgumentsOrReturns === "string") {
            description = descriptionOrArgumentsOrReturns;
        }
        else if (Object.prototype.toString.call(descriptionOrArgumentsOrReturns) === "[object Array]") {
            methodArguments = descriptionOrArgumentsOrReturns;
        }
        else if (descriptionOrArgumentsOrReturns) {
            returns = descriptionOrArgumentsOrReturns;
        }
        if (Object.prototype.toString.call(argumentsOrReturns) === "[object Array]") {
            methodArguments = argumentsOrReturns;
        }
        else if (argumentsOrReturns) {
            returns = argumentsOrReturns;
        }
        var descriptor = {
            specType: SIGNATURE,
            description: description,
            arguments: methodArguments,
            returns: returns,
        };
        return toJSON(descriptor);
    }
    exports_1("hasSignature", hasSignature);
    function hasProperty(access, name, type, description) {
        if (description === void 0) { description = null; }
        var descriptor = {
            access: access,
            specType: PROPERTY,
            name: name,
            type: type,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("hasProperty", hasProperty);
    /* tslint:enable: typedef */
    function extendsClass(name) {
        var descriptor = {
            specType: SUPER_CLASS,
            name: name,
        };
        return toJSON(descriptor);
    }
    exports_1("extendsClass", extendsClass);
    function hasDefaultExport(exportName, description) {
        if (description === void 0) { description = null; }
        var descriptor = {
            specType: DEFAULTEXPORT,
            name: exportName,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("hasDefaultExport", hasDefaultExport);
    function hasEnumeral(name, description) {
        if (description === void 0) { description = null; }
        var descriptor = {
            specType: ENUM,
            name: name,
            description: description,
        };
        return toJSON(descriptor);
    }
    exports_1("hasEnumeral", hasEnumeral);
    return {
        setters:[],
        execute: function() {
            exports_1("MODULE", MODULE = "module");
            exports_1("CLASS", CLASS = "class");
            exports_1("INTERFACE", INTERFACE = "interface");
            exports_1("STATIC", STATIC = "static");
            exports_1("INSTANCE", INSTANCE = "instance");
            exports_1("CONSTRUCTOR", CONSTRUCTOR = "constructor");
            exports_1("METHOD", METHOD = "method");
            exports_1("SIGNATURE", SIGNATURE = "signature");
            exports_1("PROPERTY", PROPERTY = "property");
            exports_1("SUPER_CLASS", SUPER_CLASS = "super-class");
            exports_1("REEXPORTS", REEXPORTS = "reexports");
            exports_1("DEFAULTEXPORT", DEFAULTEXPORT = "defaultExport");
            exports_1("ENUM", ENUM = "enum");
            exports_1("DECORATED", DECORATED = "decoratedObject");
            /* tslint:disable: typedef */
            exports_1("property", property = hasProperty);
        }
    }
});

//# sourceMappingURL=JasmineExtender.js.map
