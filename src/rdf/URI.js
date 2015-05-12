define(["require", "exports", '../Utils'], function (require, exports, Utils) {
    var Util = (function () {
        function Util() {
        }
        Util.hasFragment = function (uri) {
            return uri.indexOf('#') != -1;
        };
        Util.isAbsolute = function (uri) {
            if (Utils.S.startsWith(uri, 'http://'))
                return true;
            if (Utils.S.startsWith(uri, 'https://'))
                return true;
            if (Utils.S.startsWith(uri, '://'))
                return true;
        };
        Util.isRelative = function (uri) {
            return !Util.isAbsolute(uri);
        };
        Util.getDocumentURI = function (uri) {
            var parts = uri.split('#');
            if (parts.length > 2)
                throw new Error('IllegalArgument: The URI provided has more than one # sign.');
            return parts[0];
        };
        Util.resolve = function (parentURI, childURI) {
            var finalURI = parentURI;
            if (!Utils.S.endsWith(parentURI, '/'))
                finalURI += '/';
            if (Utils.S.startsWith(childURI, '/'))
                finalURI = finalURI + childURI.substr(1, childURI.length);
            else
                finalURI += childURI;
            return finalURI;
        };
        return Util;
    })();
    exports.Util = Util;
});
//# sourceMappingURL=URI.js.map