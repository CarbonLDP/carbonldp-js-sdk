/// <reference path="../../typings/typings.d.ts" />
System.register(["./../NS", "./../Pointer", "./../Utils"], function(exports_1) {
    var NS, Pointer, Utils;
    var RDF_CLASS, SCHEMA, Factory, factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
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
                "memberOfRelation": {
                    "@id": NS.LDP.Predicate.memberOfRelation,
                    "@type": "@id",
                },
                "hasMemberRelation": {
                    "@id": NS.LDP.Predicate.hasMemberRelation,
                    "@type": "@id",
                },
            });
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "memberOfRelation") &&
                        Utils.hasPropertyDefined(resource, "hasMemberRelation"));
                };
                Factory.prototype.hasRDFClass = function (pointerOrExpandedObject) {
                    var types = [];
                    if ("@type" in pointerOrExpandedObject) {
                        types = pointerOrExpandedObject["@type"];
                    }
                    else if ("types" in pointerOrExpandedObject) {
                        // TODO: Use proper class
                        var resource = pointerOrExpandedObject;
                        types = Pointer.Util.getIDs(resource.types);
                    }
                    return (types.indexOf(RDF_CLASS) !== -1 ||
                        types.indexOf(NS.LDP.Class.BasicContainer) !== -1 ||
                        types.indexOf(NS.LDP.Class.DirectContainer) !== -1 ||
                        types.indexOf(NS.LDP.Class.IndirectContainer) !== -1);
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

//# sourceMappingURL=Container.js.map
