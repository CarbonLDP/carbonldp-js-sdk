System.register(["./Fragment", "./RDF", "./Utils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Fragment, RDF, Utils;
    var Factory;
    return {
        setters:[
            function (Fragment_1) {
                Fragment = Fragment_1;
            },
            function (RDF_1) {
                RDF = RDF_1;
            },
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "slug"));
                };
                Factory.create = function (slug, document) {
                    return this.createFrom({}, slug, document);
                };
                Factory.createFrom = function (object, slug, document) {
                    var uri = document.id + "#" + slug;
                    var fragment = Fragment.Factory.createFrom(object, uri, document);
                    if (this.hasClassProperties(fragment))
                        return fragment;
                    Object.defineProperties(fragment, {
                        "slug": {
                            enumerable: false,
                            configurable: true,
                            get: function () {
                                return RDF.URI.Util.getFragment(fragment.id);
                            },
                            set: function (value) {
                                this.id = this.document.id + "#" + value;
                            },
                        },
                    });
                    return fragment;
                };
                return Factory;
            }());
            exports_1("Factory", Factory);
        }
    }
});

//# sourceMappingURL=NamedFragment.js.map
