define(["require", "exports", './Resource', './URI', '../Utils'], function (require, exports, Resource, URI, Utils) {
    var Factory = (function () {
        function Factory() {
        }
        Factory.is = function (resource) {
            if (Utils.hasProperty(resource, 'slug'))
                return true;
            return false;
        };
        Factory.create = function (slug) {
            slug = URI.Util.hasFragment(slug) ? URI.Util.getFragment(slug) : slug;
            slug = '#' + slug;
            var resource = Resource.Factory.create();
            var fragment = Factory.from(resource);
            fragment.slug = slug;
            return fragment;
        };
        Factory.from = function (resourceOrResources) {
            var resources = Utils.isArray(resourceOrResources) ? resourceOrResources : [resourceOrResources];
            var fragments = [];
            for (var i = 0, length_1 = resources.length; i < length_1; i++) {
                var fragment = resources[i];
                if (!Factory.is(fragment)) {
                    Object.defineProperty(fragment, 'slug', {
                        writable: true,
                        enumerable: false
                    });
                    if (!fragment.uri)
                        fragment.slug = null;
                    else
                        fragment.slug = '#' + URI.Util.getFragment(fragment.uri);
                }
                fragments.push(fragment);
            }
            if (Utils.isArray(resourceOrResources))
                return fragments;
            else
                return fragments[0];
        };
        return Factory;
    })();
    exports.Factory = Factory;
    //@formatter:off
});
//@formatter:on 
//# sourceMappingURL=FragmentResource.js.map