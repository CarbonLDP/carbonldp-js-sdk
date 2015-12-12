var Utils = require("../Utils");
var Util = (function () {
    function Util() {
    }
    Util.hasFragment = function (uri) {
        return uri.indexOf("#") !== -1;
    };
    Util.hasProtocol = function (uri) {
        return Utils.S.startsWith(uri, "https://") || Utils.S.startsWith(uri, "http://");
    };
    Util.isAbsolute = function (uri) {
        if (Utils.S.startsWith(uri, "http://"))
            return true;
        if (Utils.S.startsWith(uri, "https://"))
            return true;
        if (Utils.S.startsWith(uri, "://"))
            return true;
    };
    Util.isRelative = function (uri) {
        return !Util.isAbsolute(uri);
    };
    Util.isBNodeID = function (uri) {
        return Utils.S.startsWith(uri, "_:");
    };
    Util.isPrefixed = function (uri) {
        return !Util.isAbsolute(uri) && Utils.S.contains(uri, ":");
    };
    Util.isFragmentOf = function (fragmentURI, uri) {
        if (!Util.hasFragment(fragmentURI))
            return false;
        return Util.getDocumentURI(fragmentURI) === uri;
    };
    Util.isBaseOf = function (baseURI, uri) {
        if (baseURI === uri)
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
    Util.resolve = function (parentURI, childURI) {
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
    return Util;
})();
exports.Util = Util;

//# sourceMappingURL=URI.js.map
