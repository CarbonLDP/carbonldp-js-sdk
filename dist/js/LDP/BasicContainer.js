/// <reference path="./../../typings/typings.d.ts" />
System.register(["./../NS", "./../Pointer"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NS, Pointer;
    var RDF_CLASS, Factory, factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            },
            function (Pointer_1) {
                Pointer = Pointer_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.LDP.Class.BasicContainer);
            Factory = (function () {
                function Factory() {
                }
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
                    return types.indexOf(NS.LDP.Class.BasicContainer) !== -1;
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

//# sourceMappingURL=BasicContainer.js.map
