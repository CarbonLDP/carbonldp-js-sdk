/// <reference path="./../typings/tsd.d.ts" />
var Errors = require("./Errors");
var RDF = require("./RDF");
var Utils = require("./Utils");
(function (ContainerType) {
    ContainerType[ContainerType["SET"] = 0] = "SET";
    ContainerType[ContainerType["LIST"] = 1] = "LIST";
    ContainerType[ContainerType["LANGUAGE"] = 2] = "LANGUAGE";
})(exports.ContainerType || (exports.ContainerType = {}));
var ContainerType = exports.ContainerType;
var DigestedContext = (function () {
    function DigestedContext() {
        this.base = "";
        this.prefixes = new Map();
        this.properties = new Map();
        this.prefixedURIs = new Map();
    }
    return DigestedContext;
})();
exports.DigestedContext = DigestedContext;
var DigestedDefinition = (function () {
    function DigestedDefinition() {
        this.uri = null;
        this.literal = null;
        this.literalType = null;
        this.language = null;
        this.containerType = null;
    }
    return DigestedDefinition;
})();
exports.DigestedDefinition = DigestedDefinition;
var URI = (function () {
    function URI(stringValue) {
        this.stringValue = stringValue;
    }
    URI.prototype.toString = function () {
        return this.stringValue;
    };
    return URI;
})();
exports.URI = URI;
var Class = (function () {
    function Class() {
    }
    Class.digestContext = function (contextOrContexts) {
        if (!Utils.isArray(contextOrContexts))
            return Class.digestSingleContext(contextOrContexts);
        var digestedContexts = [];
        for (var _i = 0, _a = contextOrContexts; _i < _a.length; _i++) {
            var context = _a[_i];
            digestedContexts.push(Class.digestSingleContext(context));
        }
        return Class.combineDigestedContexts(digestedContexts);
    };
    Class.combineDigestedContexts = function (digestedContexts) {
        if (digestedContexts.length === 0)
            throw new Errors.IllegalArgumentError("At least one digestedContext needs to be specified.");
        var combinedContext = digestedContexts.shift();
        for (var _i = 0; _i < digestedContexts.length; _i++) {
            var digestedContext = digestedContexts[_i];
            Utils.M.extend(combinedContext.prefixes, digestedContext.prefixes);
            Utils.M.extend(combinedContext.prefixedURIs, digestedContext.prefixedURIs);
            Utils.M.extend(combinedContext.properties, digestedContext.properties);
        }
        Class.resolvePrefixedURIs(combinedContext);
        return combinedContext;
    };
    Class.digestSingleContext = function (context) {
        var digestedContext = new DigestedContext();
        for (var propertyName in context) {
            if (!context.hasOwnProperty(propertyName))
                continue;
            if (propertyName === "@reverse")
                continue;
            if (propertyName === "@index")
                continue;
            if (propertyName === "@base")
                continue;
            if (propertyName === "@vocab")
                continue;
            var propertyValue = context[propertyName];
            if (Utils.isString(propertyValue)) {
                if (RDF.URI.Util.isPrefixed(propertyName))
                    throw new Errors.IllegalArgumentError("A prefixed property cannot be equal to another URI.");
                var uri = new URI(propertyValue);
                if (RDF.URI.Util.isPrefixed(uri.stringValue))
                    uri = Class.resolvePrefixedURI(uri, digestedContext);
                digestedContext.prefixes.set(propertyName, uri);
            }
            else if (!!propertyValue && Utils.isObject(propertyValue)) {
                var contextDefinition = propertyValue;
                var digestedDefinition = new DigestedDefinition();
                if ("@id" in contextDefinition) {
                    if (RDF.URI.Util.isPrefixed(propertyName))
                        throw new Errors.IllegalArgumentError("A prefixed property cannot have assigned another URI.");
                    if (!Utils.isString(contextDefinition["@id"]))
                        throw new Errors.IllegalArgumentError("@id needs to point to a string");
                    digestedDefinition.uri = Class.resolvePrefixedURI(new URI(contextDefinition["@id"]), digestedContext);
                }
                else if (RDF.URI.Util.isPrefixed(propertyName)) {
                    digestedDefinition.uri = Class.resolvePrefixedURI(new URI(propertyName), digestedContext);
                }
                else {
                    // TODO: Handle @vocab or @base case
                    throw new Errors.IllegalArgumentError("Every property definition needs to have a uri defined.");
                }
                if ("@type" in contextDefinition) {
                    if (!Utils.isString(contextDefinition["@type"]))
                        throw new Errors.IllegalArgumentError("@type needs to point to a string");
                    if (contextDefinition["@type"] === "@id") {
                        digestedDefinition.literal = false;
                    }
                    else {
                        digestedDefinition.literal = true;
                        digestedDefinition.literalType = Class.resolvePrefixedURI(new URI(contextDefinition["@type"]), digestedContext);
                    }
                }
                if ("@language" in contextDefinition) {
                    if (!Utils.isString(contextDefinition["@language"]))
                        throw new Errors.IllegalArgumentError("@language needs to point to a string");
                    digestedDefinition.language = contextDefinition["@language"];
                }
                if ("@container" in contextDefinition) {
                    switch (contextDefinition["@container"]) {
                        case "@set":
                            digestedDefinition.containerType = ContainerType.SET;
                            break;
                        case "@list":
                            digestedDefinition.containerType = ContainerType.LIST;
                            break;
                        case "@language":
                            if (digestedDefinition.language !== null)
                                throw new Errors.IllegalArgumentError("@container cannot be set to @language when the property definition already contains an @language tag.");
                            digestedDefinition.containerType = ContainerType.LANGUAGE;
                            break;
                        default:
                            throw new Errors.IllegalArgumentError("@container needs to be equal to '@list', '@set', or '@language'");
                    }
                }
                digestedContext.properties.set(propertyName, digestedDefinition);
            }
            else {
                throw new Errors.IllegalArgumentError("Context Properties can only have string values or object values.");
            }
        }
        Class.resolvePrefixedURIs(digestedContext);
        return digestedContext;
    };
    Class.resolvePrefixedURIs = function (digestedContext) {
        digestedContext.prefixes.forEach(function (prefixValue, prefixName) {
            if (!digestedContext.prefixedURIs.has(prefixName))
                return;
            var prefixedURIs = digestedContext.prefixedURIs.get(prefixName);
            for (var _i = 0; _i < prefixedURIs.length; _i++) {
                var prefixedURI = prefixedURIs[_i];
                Class.resolvePrefixedURI(prefixedURI, digestedContext);
            }
            digestedContext.prefixedURIs.delete(prefixName);
        });
        return digestedContext;
    };
    Class.resolvePrefixedURI = function (uri, digestedContext) {
        var uriParts = uri.stringValue.split(":");
        var prefix = uriParts[0];
        var slug = uriParts[1];
        if (digestedContext.prefixes.has(prefix)) {
            uri.stringValue = digestedContext.prefixes.get(prefix) + slug;
        }
        else {
            if (!digestedContext.prefixedURIs.has(prefix))
                digestedContext.prefixedURIs.set(prefix, []);
            digestedContext.prefixedURIs.get(prefix).push(uri);
        }
        return uri;
    };
    return Class;
})();
exports.Class = Class;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Class;

//# sourceMappingURL=ContextDigester.js.map
