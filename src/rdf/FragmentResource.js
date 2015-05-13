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
                var resource = resources[i];
                resource = Resource.Factory.is(resource) ? resource : Resource.Factory.from(resource);
                var fragment = resource;
                if (!Factory.is(fragment))
                    Factory.injectBehaviour(fragment);
                fragments.push(fragment);
            }
            if (Utils.isArray(resourceOrResources))
                return fragments;
            else
                return fragments[0];
        };
        Factory.injectBehaviour = function (fragment) {
            Object.defineProperty(fragment, 'slug', {
                writable: true,
                enumerable: false
            });
            if (!fragment.uri)
                fragment.slug = null;
            else
                fragment.slug = '#' + URI.Util.getFragment(fragment.uri);
            return fragment;
        };
        return Factory;
    })();
    exports.Factory = Factory;
    //@formatter:off
});
//@formatter:on 
//# sourceMappingURL=FragmentResource.js.map