"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors = require("./../Errors");
var Utils = require("./../Utils");
var Class = (function () {
    function Class(stringValue) {
        this.stringValue = stringValue;
    }
    Class.prototype.toString = function () {
        return this.stringValue;
    };
    return Class;
}());
exports.Class = Class;
var Util = (function () {
    function Util() {
    }
    Util.hasFragment = function (uri) {
        return uri.indexOf("#") !== -1;
    };
    Util.hasQuery = function (uri) {
        return uri.indexOf("?") !== -1;
    };
    Util.hasProtocol = function (uri) {
        return Utils.S.startsWith(uri, "https://") || Utils.S.startsWith(uri, "http://");
    };
    Util.isAbsolute = function (uri) {
        return Utils.S.startsWith(uri, "http://")
            || Utils.S.startsWith(uri, "https://")
            || Utils.S.startsWith(uri, "://");
    };
    Util.isRelative = function (uri) {
        return !Util.isAbsolute(uri);
    };
    Util.isBNodeID = function (uri) {
        return Utils.S.startsWith(uri, "_:");
    };
    Util.generateBNodeID = function () {
        return "_:" + Utils.UUID.generate();
    };
    Util.isPrefixed = function (uri) {
        return !Util.isAbsolute(uri) && !Util.isBNodeID(uri) && Utils.S.contains(uri, ":");
    };
    Util.isFragmentOf = function (fragmentURI, uri) {
        if (!Util.hasFragment(fragmentURI))
            return false;
        return Util.getDocumentURI(fragmentURI) === uri;
    };
    Util.isBaseOf = function (baseURI, uri) {
        if (baseURI === uri)
            return true;
        if (baseURI === "")
            return true;
        if (Util.isRelative(uri) && !Util.isPrefixed(uri))
            return true;
        if (uri.startsWith(baseURI)) {
            if (Utils.S.endsWith(baseURI, "/") || Utils.S.endsWith(baseURI, "#"))
                return true;
            var relativeURI = uri.substring(baseURI.length);
            if (Utils.S.startsWith(relativeURI, "/") || Utils.S.startsWith(relativeURI, "#"))
                return true;
        }
        return false;
    };
    Util.getRelativeURI = function (absoluteURI, base) {
        if (!absoluteURI.startsWith(base))
            return absoluteURI;
        return absoluteURI.substring(base.length);
    };
    Util.getDocumentURI = function (uri) {
        var parts = uri.split("#");
        if (parts.length > 2)
            throw new Error("IllegalArgument: The URI provided has more than one # sign.");
        return parts[0];
    };
    Util.getFragment = function (uri) {
        var parts = uri.split("#");
        if (parts.length < 2)
            return null;
        if (parts.length > 2)
            throw new Error("IllegalArgument: The URI provided has more than one # sign.");
        return parts[1];
    };
    Util.getSlug = function (uri) {
        var uriParts = uri.split("#");
        if (uriParts.length === 2)
            return Util.getSlug(uriParts[1]);
        if (uriParts.length > 2)
            throw new Errors.IllegalArgumentError("Invalid URI: The uri contains two '#' symbols.");
        uri = uriParts[0];
        if (uri === "")
            return uri;
        if (uri === "/")
            return uri;
        var parts = uri.split("/");
        if (parts[parts.length - 1] === "") {
            return parts[parts.length - 2] + "/";
        }
        else {
            return parts[parts.length - 1];
        }
    };
    Util.getParameters = function (uri) {
        var parameters = new Map();
        if (!Util.hasQuery(uri))
            return parameters;
        uri.replace(/^.*\?/, "").split("&").forEach(function (param) {
            var parts = param.replace(/\+/g, " ").split("=");
            var key = parts.shift();
            var val = parts.length > 0 ? parts.join("=") : null;
            if (!parameters.has(key)) {
                parameters.set(key, val);
            }
            else {
                parameters.set(key, [].concat(parameters.get(key), val));
            }
        });
        return parameters;
    };
    Util.resolve = function (parentURI, childURI) {
        if (!parentURI || Util.isAbsolute(childURI) || Util.isBNodeID(childURI) || Util.isPrefixed(childURI))
            return childURI;
        var protocol = parentURI.substr(0, parentURI.indexOf("://") + 3);
        var path = parentURI.substr(parentURI.indexOf("://") + 3, parentURI.length - 1);
        if (path.lastIndexOf("/") === -1)
            path += "/";
        if (Utils.S.startsWith(childURI, "?") || Utils.S.startsWith(childURI, "#")) {
            if (Util.hasQuery(path))
                path = path.substr(0, path.indexOf("?"));
            if (Util.hasFragment(path) && (!Utils.S.startsWith(childURI, "?") || Utils.S.endsWith(path, "#")))
                path = Util.getDocumentURI(path);
        }
        else {
            path = path.substr(0, path.lastIndexOf("/") + 1);
            if (!Utils.S.endsWith(path, "?") && !Utils.S.endsWith(path, "#") && !Utils.S.endsWith(path, "/"))
                path += "/";
        }
        if (Utils.S.startsWith(childURI, "/")) {
            childURI = childURI.substr(1, childURI.length);
        }
        return protocol + path + childURI;
    };
    Util.removeProtocol = function (uri) {
        if (!Util.hasProtocol(uri))
            return uri;
        return uri.substring(uri.indexOf("://") + 3);
    };
    Util.prefix = function (uri, prefixOrObjectSchema, prefixURI) {
        if (prefixURI === void 0) { prefixURI = null; }
        var objectSchema = !Utils.isString(prefixOrObjectSchema) ? prefixOrObjectSchema : null;
        var prefix = Utils.isString(prefixOrObjectSchema) ? prefixOrObjectSchema : null;
        if (objectSchema !== null)
            return prefixWithObjectSchema(uri, objectSchema);
        if (Util.isPrefixed(uri) || !uri.startsWith(prefixURI))
            return uri;
        return prefix + ":" + uri.substring(prefixURI.length);
    };
    return Util;
}());
exports.Util = Util;
function prefixWithObjectSchema(uri, objectSchema) {
    var prefixEntries = objectSchema.prefixes.entries();
    while (true) {
        var result = prefixEntries.next();
        if (result.done)
            return uri;
        var _a = result.value, prefix = _a[0], prefixURI = _a[1];
        if (!Util.isAbsolute(prefixURI))
            continue;
        if (!uri.startsWith(prefixURI))
            continue;
        return Util.prefix(uri, prefix, prefixURI);
    }
}
exports.default = Class;

//# sourceMappingURL=URI.js.map
