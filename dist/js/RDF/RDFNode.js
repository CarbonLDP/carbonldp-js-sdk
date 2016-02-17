System.register(["./../Utils"], function(exports_1) {
    var Utils;
    var Factory, Util;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.is = function (value) {
                    return ((!Utils.isNull(value)) &&
                        Utils.isObject(value) &&
                        Utils.hasProperty(value, "@id"));
                };
                Factory.create = function (uri) {
                    return {
                        "@id": uri
                    };
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.areEqual = function (node1, node2) {
                    return node1["@id"] === node2["@id"];
                };
                Util.getPropertyURI = function (node, predicate) {
                    if (!(predicate in node))
                        return null;
                    if (!Utils.isArray(node[predicate]))
                        return null;
                    var uris = node[predicate]
                        .filter(function (value) { return Factory.is(value); })
                        .map(function (value) { return value["@id"]; });
                    return uris.length > 0 ? uris[0] : null;
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});

//# sourceMappingURL=RDFNode.js.map
