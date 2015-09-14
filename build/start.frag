(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        var exports = factory();
        root.Carbon = exports.default;
        root.C = exports.Carbon;
    }
}(this, function () {