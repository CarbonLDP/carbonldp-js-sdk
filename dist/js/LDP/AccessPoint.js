/// <reference path="../../typings/typings.d.ts" />
System.register(["./../NS", "./../Utils"], function(exports_1) {
    var NS, Utils;
    var RDF_CLASS, SCHEMA, Factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.C.Class.AccessPoint);
            exports_1("SCHEMA", SCHEMA = {
                "membershipResource": {
                    "@id": NS.LDP.Predicate.membershipResource,
                    "@type": "@id",
                },
            });
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "membershipResource"));
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=AccessPoint.js.map
