System.register(["./Fragment", "./RDF", "./Utils"], function(exports_1) {
    var Fragment, RDF, Utils;
    var Factory, factory;
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
                Factory.prototype.hasClassProperties = function (resource) {
                    return (Utils.hasPropertyDefined(resource, "slug"));
                };
                Factory.prototype.create = function (slug, document) {
                    return this.createFrom({}, slug, document);
                };
                Factory.prototype.createFrom = function (object, slug, document) {
                    var uri = document.id + "#" + slug;
                    var fragment = Fragment.factory.createFrom(object, uri, document);
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
            })();
            exports_1("Factory", Factory);
            exports_1("factory", factory = new Factory());
        }
    }
});

//# sourceMappingURL=NamedFragment.js.map
