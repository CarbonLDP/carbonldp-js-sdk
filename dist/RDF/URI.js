"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IllegalArgumentError_1 = require("../Errors/IllegalArgumentError");
var Utils_1 = require("../Utils");
exports.URI = {
    hasFragment: function (uri) {
        return uri.indexOf("#") !== -1;
    },
    hasQuery: function (uri) {
        return uri.indexOf("?") !== -1;
    },
    hasProtocol: function (uri) {
        return Utils_1.StringUtils.startsWith(uri, "https://") || Utils_1.StringUtils.startsWith(uri, "http://");
    },
    isAbsolute: function (uri) {
        return Utils_1.StringUtils.startsWith(uri, "http://")
            || Utils_1.StringUtils.startsWith(uri, "https://")
            || Utils_1.StringUtils.startsWith(uri, "://");
    },
    isRelative: function (uri) {
        return !exports.URI.isAbsolute(uri);
    },
    isBNodeID: function (uri) {
        return Utils_1.StringUtils.startsWith(uri, "_:");
    },
    generateBNodeID: function () {
        return "_:" + Utils_1.UUIDUtils.generate();
    },
    isPrefixed: function (uri) {
        return !exports.URI.isAbsolute(uri) && !exports.URI.isBNodeID(uri) && Utils_1.StringUtils.contains(uri, ":");
    },
    isFragmentOf: function (fragmentURI, uri) {
        if (!exports.URI.hasFragment(fragmentURI))
            return false;
        var documentURI = exports.URI.getDocumentURI(fragmentURI);
        return documentURI === "" || documentURI === uri;
    },
    isBaseOf: function (baseURI, uri) {
        if (baseURI === uri)
            return true;
        if (baseURI === "")
            return true;
        if (exports.URI.isRelative(uri) && !exports.URI.isPrefixed(uri))
            return true;
        if (uri.startsWith(baseURI)) {
            if (Utils_1.StringUtils.endsWith(baseURI, "/") || Utils_1.StringUtils.endsWith(baseURI, "#"))
                return true;
            var relativeURI = uri.substring(baseURI.length);
            if (Utils_1.StringUtils.startsWith(relativeURI, "/") || Utils_1.StringUtils.startsWith(relativeURI, "#"))
                return true;
        }
        return false;
    },
    getRelativeURI: function (absoluteURI, base) {
        if (!absoluteURI.startsWith(base))
            return absoluteURI;
        return absoluteURI.substring(base.length);
    },
    getDocumentURI: function (uri) {
        var parts = uri.split("#");
        if (parts.length > 2)
            throw new Error("IllegalArgument: The URI provided has more than one # sign.");
        return parts[0];
    },
    getFragment: function (uri) {
        var parts = uri.split("#");
        if (parts.length < 2)
            return null;
        if (parts.length > 2)
            throw new Error("IllegalArgument: The URI provided has more than one # sign.");
        return parts[1];
    },
    getSlug: function (uri) {
        var uriParts = uri.split("#");
        if (uriParts.length === 2)
            return exports.URI.getSlug(uriParts[1]);
        if (uriParts.length > 2)
            throw new IllegalArgumentError_1.IllegalArgumentError("Invalid URI: The uri contains two '#' symbols.");
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
    },
    getParameters: function (uri) {
        var parameters = new Map();
        if (!exports.URI.hasQuery(uri))
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
    },
    resolve: function (parentURI, childURI) {
        if (!parentURI || exports.URI.isAbsolute(childURI) || exports.URI.isBNodeID(childURI) || exports.URI.isPrefixed(childURI))
            return childURI;
        var protocol = parentURI.substr(0, parentURI.indexOf("://") + 3);
        var path = parentURI.substr(parentURI.indexOf("://") + 3, parentURI.length - 1);
        if (path.lastIndexOf("/") === -1)
            path += "/";
        if (Utils_1.StringUtils.startsWith(childURI, "?") || Utils_1.StringUtils.startsWith(childURI, "#")) {
            if (exports.URI.hasQuery(path))
                path = path.substr(0, path.indexOf("?"));
            if (exports.URI.hasFragment(path) && (!Utils_1.StringUtils.startsWith(childURI, "?") || Utils_1.StringUtils.endsWith(path, "#")))
                path = exports.URI.getDocumentURI(path);
        }
        else {
            path = path.substr(0, path.lastIndexOf("/") + 1);
            if (!Utils_1.StringUtils.endsWith(path, "?") && !Utils_1.StringUtils.endsWith(path, "#") && !Utils_1.StringUtils.endsWith(path, "/"))
                path += "/";
        }
        if (Utils_1.StringUtils.startsWith(childURI, "/")) {
            childURI = childURI.substr(1, childURI.length);
        }
        return protocol + path + childURI;
    },
    removeProtocol: function (uri) {
        if (!exports.URI.hasProtocol(uri))
            return uri;
        return uri.substring(uri.indexOf("://") + 3);
    },
    prefix: function (uri, prefixOrObjectSchema, prefixURI) {
        if (!Utils_1.isString(prefixOrObjectSchema))
            return prefixWithObjectSchema(uri, prefixOrObjectSchema);
        var prefix = prefixOrObjectSchema;
        if (exports.URI.isPrefixed(uri) || !uri.startsWith(prefixURI))
            return uri;
        return prefix + ":" + uri.substring(prefixURI.length);
    },
};
function prefixWithObjectSchema(uri, objectSchema) {
    var prefixEntries = objectSchema.prefixes.entries();
    while (true) {
        var result = prefixEntries.next();
        if (result.done)
            return uri;
        var _a = result.value, prefix = _a[0], prefixURI = _a[1];
        if (!exports.URI.isAbsolute(prefixURI))
            continue;
        if (!uri.startsWith(prefixURI))
            continue;
        return exports.URI.prefix(uri, prefix, prefixURI);
    }
}

//# sourceMappingURL=URI.js.map
