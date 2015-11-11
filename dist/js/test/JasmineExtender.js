function serialize(descriptor) {
    return "JSON" + JSON.stringify(descriptor);
}
exports.serialize = serialize;
function toJSON(descriptor) {
    return "JSON" + JSON.stringify(descriptor);
}
exports.MODULE = "module";
exports.SUBMODULE = "submodule";
exports.CLASS = "class";
exports.INTERFACE = "interface";
exports.STATIC = "static";
exports.INSTANCE = "instance";
exports.CONSTRUCTOR = "constructor";
exports.METHOD = "method";
exports.SIGNATURE = "signature";
exports.PROPERTY = "property";
exports.SUPER_CLASS = "super-class";
function module(name, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        suiteType: exports.MODULE,
        name: name,
        description: description
    };
    return toJSON(descriptor);
}
exports.module = module;
function submodule(access, name, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        suiteType: exports.SUBMODULE,
        access: access,
        name: name,
        description: description
    };
    return toJSON(descriptor);
}
exports.submodule = submodule;
function clazz(name, description, parent, interfaces) {
    if (parent === void 0) { parent = null; }
    if (interfaces === void 0) { interfaces = null; }
    var descriptor = {
        suiteType: exports.CLASS,
        name: name,
        description: description,
        parent: parent,
        interfaces: interfaces
    };
    return toJSON(descriptor);
}
exports.clazz = clazz;
function interfaze(name, description, parent) {
    if (parent === void 0) { parent = null; }
    var descriptor = {
        suiteType: exports.INTERFACE,
        name: name,
        description: description,
        parent: parent
    };
    return toJSON(descriptor);
}
exports.interfaze = interfaze;
function constructor(name, description) {
    var descriptor = {
        suiteType: exports.CONSTRUCTOR,
        name: name,
        description: description
    };
    return toJSON(descriptor);
}
exports.constructor = constructor;
function hasInterface(access, name, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        access: access,
        specType: exports.INTERFACE,
        name: name,
        description: description
    };
    return toJSON(descriptor);
}
exports.hasInterface = hasInterface;
function isDefined() {
    return "defined";
}
exports.isDefined = isDefined;
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
        access: exports.STATIC,
        specType: exports.CONSTRUCTOR,
        description: description,
        arguments: constructorArguments
    };
    return toJSON(descriptor);
}
exports.hasConstructor = hasConstructor;
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
        specType: exports.METHOD,
        name: name,
        description: description,
        arguments: methodArguments,
        returns: returns
    };
    return toJSON(descriptor);
}
exports.hasMethod = hasMethod;
/* tslint:disable: typedef */
exports.method = hasMethod;
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
        specType: exports.SIGNATURE,
        description: description,
        arguments: methodArguments,
        returns: returns
    };
    return toJSON(descriptor);
}
exports.hasSignature = hasSignature;
function hasProperty(access, name, type, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        access: access,
        specType: exports.PROPERTY,
        name: name,
        type: type,
        description: description
    };
    return toJSON(descriptor);
}
exports.hasProperty = hasProperty;
/* tslint:disable: typedef */
exports.property = hasProperty;
/* tslint:enable: typedef */
function extendsClass(name) {
    var descriptor = {
        specType: exports.SUPER_CLASS,
        name: name
    };
    return toJSON(descriptor);
}
exports.extendsClass = extendsClass;

//# sourceMappingURL=JasmineExtender.js.map
