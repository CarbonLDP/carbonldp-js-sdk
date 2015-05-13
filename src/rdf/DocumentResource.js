define(["require", "exports", './Resource', './FragmentResource', './URI', '../Utils'], function (require, exports, Resource, FragmentResource, URI, Utils) {
    function getFragmentSlug(fragmentURI) {
        var fragmentSlug;
        if (URI.Util.isAbsolute(fragmentURI)) {
            // TODO: Handle
            throw new Error('IllegalArgument: Absolute URIs are not currently supported.');
        }
        else {
            if (URI.Util.hasFragment(fragmentURI))
                fragmentSlug = URI.Util.getFragment(fragmentURI);
            else
                fragmentSlug = fragmentURI;
        }
        return '#' + fragmentSlug;
    }
    function hasFragment(uri) {
        return !Utils.isNull(this.getFragment(uri));
    }
    function getFragment(uri) {
        var fragmentSlug = getFragmentSlug(uri);
        var documentResource = this;
        var fragments = documentResource._fragments;
        for (var i = 0, length_1 = fragments.length; i < length_1; i++) {
            var fragment = fragments[i];
            if (fragment.slug === fragmentSlug)
                return fragment;
        }
        return null;
    }
    function getFragments() {
        var documentResource = this;
        return documentResource._fragments.slice();
    }
    function createFragment(uri) {
        var fragmentSlug = getFragmentSlug(uri);
        var documentResource = this;
        if (documentResource.hasFragment(fragmentSlug))
            throw new Error('Conflict: A fragment already exists with that slug.');
        var fragment = FragmentResource.Factory.create(fragmentSlug);
        documentResource._fragments.push(fragment);
        return fragment;
    }
    function deleteFragment(uri) {
        var fragmentSlug = getFragmentSlug(uri);
        var documentResource = this;
        for (var i = 0, length_2 = documentResource._fragments.length; i < length_2; i++) {
            var fragment = documentResource._fragments[i];
            if (fragment.slug === fragmentSlug) {
                documentResource._fragments.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    var Factory = (function () {
        function Factory() {
        }
        Factory.is = function (value) {
            //@formatter:off
            return (Resource.Factory.is(value) &&
                Utils.hasProperty(value, '_fragments') &&
                Utils.hasFunction(value, 'hasFragment') &&
                Utils.hasFunction(value, 'getFragment') &&
                Utils.hasFunction(value, 'getFragments') &&
                Utils.hasFunction(value, 'createFragment') &&
                Utils.hasFunction(value, 'deleteFragment'));
            //@formatter:on
        };
        Factory.from = function (resource, fragments) {
            if (fragments === void 0) { fragments = []; }
            resource = Resource.Factory.is(resource) ? resource : Resource.Factory.from(resource);
            var documentResource = resource;
            if (!Factory.is(documentResource))
                Factory.injectBehaviour(documentResource);
            Factory.addFragments(documentResource, fragments);
            return documentResource;
        };
        Factory.injectBehaviour = function (resource) {
            Object.defineProperty(resource, '_fragments', {
                writable: false,
                enumerable: false,
                configurable: false,
                value: []
            });
            var documentResource = resource;
            documentResource.hasFragment = hasFragment;
            documentResource.getFragment = getFragment;
            documentResource.getFragments = getFragments;
            documentResource.createFragment = createFragment;
            documentResource.deleteFragment = deleteFragment;
            return documentResource;
        };
        Factory.addFragments = function (documentResource, fragments) {
            for (var i = 0, length_3 = fragments.length; i < length_3; i++) {
                var resource = fragments[i];
                var fragment = FragmentResource.Factory.from(resource);
                documentResource._fragments.push(fragment);
            }
        };
        return Factory;
    })();
    exports.Factory = Factory;
});
//# sourceMappingURL=DocumentResource.js.map