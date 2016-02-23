System.register(["./../Errors", "./../Utils"], function(exports_1) {
    var Errors, Utils;
    var Class, Util;
    function prefixWithObjectSchema(uri, objectSchema) {
        var prefixEntries = objectSchema.prefixes.entries();
        while (true) {
            var result = prefixEntries.next();
            if (result.done)
                return uri;
            var _a = result.value, prefix = _a[0], prefixURI = _a[1];
            if (!Util.isAbsolute(prefixURI.toString()))
                continue;
            if (!uri.startsWith(prefixURI.toString()))
                continue;
            return Util.prefix(uri, prefix, prefixURI.toString());
        }
    }
    return {
        setters:[
            function (Errors_1) {
                Errors = Errors_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Class = (function () {
                function Class(stringValue) {
                    this.stringValue = stringValue;
                }
                Class.prototype.toString = function () {
                    return this.stringValue;
                };
                return Class;
            })();
            exports_1("Class", Class);
            Util = (function () {
                function Util() {
                }
                Util.hasFragment = function (uri) {
                    return uri.indexOf("#") !== -1;
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
                    if (uri.startsWith(baseURI)) {
                        if (Utils.S.endsWith(baseURI, "/"))
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
                Util.resolve = function (parentURI, childURI) {
                    if (Util.isAbsolute(childURI) || Util.isPrefixed(childURI))
                        return childURI;
                    var finalURI = parentURI;
                    if (!Utils.S.endsWith(parentURI, "/"))
                        finalURI += "/";
                    if (Utils.S.startsWith(childURI, "/")) {
                        finalURI = finalURI + childURI.substr(1, childURI.length);
                    }
                    else
                        finalURI += childURI;
                    return finalURI;
                };
                Util.removeProtocol = function (uri) {
                    if (Utils.S.startsWith(uri, "https://"))
                        return uri.substr(5, uri.length);
                    if (Utils.S.startsWith(uri, "http://"))
                        return uri.substr(4, uri.length);
                    return uri;
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
            })();
            exports_1("Util", Util);
            exports_1("default",Class);
        }
    }
});

//# sourceMappingURL=URI.js.map
