"use strict";
var Utils_1 = require("../Utils");
function serialize(descriptor) {
    return "JSON" + JSON.stringify(descriptor);
}
exports.serialize = serialize;
function toJSON(descriptor) {
    return "JSON" + JSON.stringify(descriptor);
}
exports.MODULE = "module";
exports.CLASS = "class";
exports.INTERFACE = "interface";
exports.STATIC = "static";
exports.INSTANCE = "instance";
exports.CONSTRUCTOR = "constructor";
exports.METHOD = "method";
exports.SIGNATURE = "signature";
exports.PROPERTY = "property";
exports.SUPER_CLASS = "super-class";
exports.REEXPORTS = "reexports";
exports.DEFAULTEXPORT = "defaultExport";
exports.ENUM = "enum";
exports.DECORATED = "decoratedObject";
function module(name, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        suiteType: exports.MODULE,
        name: name,
        description: description,
    };
    return toJSON(descriptor);
}
exports.module = module;
function clazz(name, description, parent, interfaces) {
    if (parent === void 0) { parent = null; }
    if (interfaces === void 0) { interfaces = null; }
    var descriptor = {
        suiteType: exports.CLASS,
        name: name,
        description: description,
        parent: parent,
        interfaces: interfaces,
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
        parent: parent,
    };
    return toJSON(descriptor);
}
exports.interfaze = interfaze;
function enumeration(name, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        suiteType: exports.ENUM,
        name: name,
        description: description,
    };
    return toJSON(descriptor);
}
exports.enumeration = enumeration;
function constructor(description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        suiteType: exports.CONSTRUCTOR,
        description: description,
    };
    return toJSON(descriptor);
}
exports.constructor = constructor;
function reexports(access, name, originalLocation) {
    var descriptor = {
        specType: exports.REEXPORTS,
        access: access,
        name: name,
        originalLocation: originalLocation,
    };
    return toJSON(descriptor);
}
exports.reexports = reexports;
function decoratedObject(description, type) {
    var descriptor = {
        suiteType: exports.DECORATED,
        type: type,
        description: description,
    };
    return toJSON(descriptor);
}
exports.decoratedObject = decoratedObject;
function hasInterface(access, name, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        access: access,
        specType: exports.INTERFACE,
        name: name,
        description: description,
    };
    return toJSON(descriptor);
}
exports.hasInterface = hasInterface;
function isDefined() {
    return "is defined";
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
        arguments: constructorArguments,
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
        returns: returns,
    };
    return toJSON(descriptor);
}
exports.hasMethod = hasMethod;
function method(access, name, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        access: access,
        suiteType: exports.METHOD,
        name: name,
        description: description,
    };
    return toJSON(descriptor);
}
exports.method = method;
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
        returns: returns,
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
        description: description,
    };
    return toJSON(descriptor);
}
exports.hasProperty = hasProperty;
exports.property = hasProperty;
function extendsClass(name) {
    var descriptor = {
        specType: exports.SUPER_CLASS,
        name: name,
    };
    return toJSON(descriptor);
}
exports.extendsClass = extendsClass;
function hasDefaultExport(exportName, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        specType: exports.DEFAULTEXPORT,
        name: exportName,
        description: description,
    };
    return toJSON(descriptor);
}
exports.hasDefaultExport = hasDefaultExport;
function hasEnumeral(name, description) {
    if (description === void 0) { description = null; }
    var descriptor = {
        specType: exports.ENUM,
        name: name,
        description: description,
    };
    return toJSON(descriptor);
}
exports.hasEnumeral = hasEnumeral;
if (typeof XMLHttpRequest === "undefined") {
    var nock_1 = require('nock');
    var URL_1 = require("url");
    var methods_1 = ["OPTIONS", "HEAD", "GET", "POST", "PUT", "PATCH", "DELETE"];
    jasmine.Ajax = (function () {
        var requests = [];
        var scope = nock_1(/.*/);
        scope.persist();
        scope.on("request", updateRequests);
        function install() {
            nock_1.disableNetConnect();
        }
        function uninstall() {
            requests = [];
            nock_1.cleanAll();
            nock_1.enableNetConnect();
        }
        function andReturn(requests) {
            return function (options) {
                for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                    var req = requests_1[_i];
                    req.reply(options.status || 200, options.responseText || options.response || "", options.responseHeaders || {});
                }
            };
        }
        function stubRequest(url, data, method) {
            if (method === void 0) { method = "*"; }
            var path = url;
            if (Utils_1.isString(url)) {
                var parsedURL = URL_1.parse(url);
                path = parsedURL.path;
            }
            var currentRequests = [];
            var currentMethods = [method];
            if (method === "*")
                currentMethods = methods_1;
            for (var _i = 0, currentMethods_1 = currentMethods; _i < currentMethods_1.length; _i++) {
                var key = currentMethods_1[_i];
                var interceptor = scope.keyedInterceptors[(key + " /.*/" + path)];
                if (interceptor)
                    nock_1.removeInterceptor(interceptor[0]);
                currentRequests.push(scope.intercept(path, key, data || undefined));
            }
            return {
                method: method,
                andReturn: andReturn(currentRequests)
            };
        }
        function updateRequests(req, interceptor) {
            requests.push({
                url: req.path,
                method: interceptor.method,
                requestHeaders: req.headers,
            });
        }
        function requestMostRecent() {
            return requests[requests.length - 1];
        }
        function requestAt(index) {
            return requests[index];
        }
        function requestFilter(urlToMatch) {
            var results = [];
            for (var _i = 0, requests_2 = requests; _i < requests_2.length; _i++) {
                var request = requests_2[_i];
                var url = request.url;
                if (urlToMatch instanceof RegExp && urlToMatch.test(url)
                    || urlToMatch instanceof Function && urlToMatch(request)
                    || urlToMatch === url) {
                    results.push(request);
                }
            }
            return results;
        }
        return {
            install: install,
            uninstall: uninstall,
            stubRequest: stubRequest,
            requests: {
                mostRecent: requestMostRecent,
                at: requestAt,
                filter: requestFilter,
            },
        };
    })();
}
