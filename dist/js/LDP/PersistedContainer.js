System.register(["./../Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Utils;
    var Factory;
    function createChild(slugOrDocument, document) {
        if (slugOrDocument === void 0) { slugOrDocument = null; }
        if (document === void 0) { document = null; }
        var slug = Utils.isString(slugOrDocument) ? slugOrDocument : null;
        document = !!slugOrDocument && !Utils.isString(slugOrDocument) ? slugOrDocument : (!!document ? document : null);
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
