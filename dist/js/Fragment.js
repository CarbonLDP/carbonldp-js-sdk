System.register(["./Resource", "./Utils"], function(exports_1) {
    var Resource, Utils;
    var Factory, Util;
    return {
        setters:[
            function (Resource_1) {
                Resource = Resource_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "document"));
                };
                Factory.create = function (idOrDocument, document) {
                    if (document === void 0) { document = null; }
                    return this.createFrom({}, idOrDocument, document);
                };
                Factory.createFrom = function (object, idOrDocument, document) {
                    if (document === void 0) { document = null; }
                    var id = !!document ? idOrDocument : Util.generateID();
                    var resource = Resource.Factory.createFrom(object, id);
                    if (Factory.hasClassProperties(resource))
                        return resource;
                    Object.defineProperties(resource, {
                        "document": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: document,
                        },
                    });
                    return resource;
                };
                return Factory;
            })();
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.generateID = function () {
                    return "_:" + Utils.UUID.generate();
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});

//# sourceMappingURL=Fragment.js.map
