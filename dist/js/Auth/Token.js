System.register(["./../NS", "./../Pointer", "./../Utils"], function(exports_1) {
    var NS, Pointer, Utils;
    var RDF_CLASS, CONTEXT, Factory, factory;
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
            exports_1("RDF_CLASS", RDF_CLASS = NS.CS.Class.Token);
            exports_1("CONTEXT", CONTEXT = {
                "key": {
                    "@id": NS.CS.Predicate.tokenKey,
                    "@type": NS.XSD.DataType.string,
                },
                "expirationTime": {
                    "@id": NS.CS.Predicate.expirationTime,
                    "@type": NS.XSD.DataType.dateTime,
                },
            });
            Factory = (function () {
                function Factory() {
                }
                Factory.prototype.hasClassProperties = function (object) {
                    return (Utils.isObject(object) &&
                        Utils.hasPropertyDefined(object, "key") &&
                        Utils.hasPropertyDefined(object, "expirationTime"));
                };
                Factory.prototype.decorate = function (object) {
                    if (this.hasClassProperties(object))
                        return object;
                    return object;
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
                    return types.indexOf(RDF_CLASS) !== -1;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

//# sourceMappingURL=Token.js.map
