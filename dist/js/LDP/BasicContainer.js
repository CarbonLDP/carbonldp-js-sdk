/// <reference path="./../../typings/typings.d.ts" />
System.register(["./../NS"], function(exports_1) {
    var NS;
    var RDF_CLASS, Factory;
    return {
        setters:[
            function (NS_1) {
                NS = NS_1;
            }],
        execute: function() {
            exports_1("RDF_CLASS", RDF_CLASS = NS.LDP.Class.BasicContainer);
            Factory = (function () {
                function Factory() {
                }
                Factory.hasRDFClass = function (pointerOrExpandedObject) {
                    var types = [];
                    if ("@type" in pointerOrExpandedObject) {
                        types = pointerOrExpandedObject["@type"];
                    }
                    else if ("types" in pointerOrExpandedObject) {
                        types = pointerOrExpandedObject.types;
                    }
                    return types.indexOf(NS.LDP.Class.BasicContainer) !== -1;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=BasicContainer.js.map
