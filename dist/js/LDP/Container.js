/// <reference path="../../typings/typings.d.ts" />
System.register(["./../NS", "./../Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("RDF_CLASS", RDF_CLASS = NS.LDP.Class.Container);
            exports_1("SCHEMA", SCHEMA = {
                "contains": {
                    "@id": NS.LDP.Predicate.contains,
                    "@container": "@set",
                    "@type": "@id",
                },
                "members": {
                    "@id": NS.LDP.Predicate.member,
                    "@container": "@set",
                    "@type": "@id",
                },
                "memberOfRelation": {
                    "@id": NS.LDP.Predicate.memberOfRelation,
                    "@type": "@id",
                },
                "hasMemberRelation": {
                    "@id": NS.LDP.Predicate.hasMemberRelation,
                    "@type": "@id",
                },
                "insertedContentRelation": {
                    "@id": NS.LDP.Predicate.insertedContentRelation,
                    "@type": "@id",
                },
            });
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "memberOfRelation") &&
                        Utils.hasPropertyDefined(resource, "hasMemberRelation"));
                };
                Factory.hasRDFClass = function (resourceOrExpandedObject) {
                    var types = [];
                    if ("@type" in resourceOrExpandedObject) {
                        types = resourceOrExpandedObject["@type"];
                    }
                    else if ("types" in resourceOrExpandedObject) {
                        // TODO: Use proper class
                        var resource = resourceOrExpandedObject;
                        types = resource.types;
                    }
                    return (types.indexOf(RDF_CLASS) !== -1 ||
                        types.indexOf(NS.LDP.Class.BasicContainer) !== -1 ||
                        types.indexOf(NS.LDP.Class.DirectContainer) !== -1 ||
                        types.indexOf(NS.LDP.Class.IndirectContainer) !== -1);
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=Container.js.map
