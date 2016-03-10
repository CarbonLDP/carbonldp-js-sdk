System.register(["./../Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    var Factory;
    function createChild(slugOrObject, object) {
        if (slugOrObject === void 0) { slugOrObject = null; }
        if (object === void 0) { object = null; }
        var slug = Utils.isString(slugOrObject) ? slugOrObject : null;
        object = !!slugOrObject && !Utils.isString(slugOrObject) ? slugOrObject : (!!object ? object : null);
        // TODO: Check if the object is a document
        // TODO: If it's not a document turn it and any of the objects related to it into document/fragments
        var document = object;
        if (slug !== null) {
            return this._documents.createChild(this.id, slug, document);
        }
        else
            return this._documents.createChild(this.id, document);
    }
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (document) {
                    return (Utils.hasFunction(document, "createChild"));
                };
                Factory.decorate = function (persistedDocument) {
                    if (Factory.hasClassProperties(persistedDocument))
                        return persistedDocument;
                    Object.defineProperties(persistedDocument, {
                        "createChild": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: createChild,
                        },
                    });
                    return persistedDocument;
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=PersistedContainer.js.map
