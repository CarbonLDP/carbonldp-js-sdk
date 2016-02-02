var ValueTypes = (function () {
    function ValueTypes() {
    }
    Object.defineProperty(ValueTypes, "URI", {
        get: function () { return "uri"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueTypes, "LITERAL", {
        get: function () { return "literal"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValueTypes, "BNODE", {
        get: function () { return "bnode"; },
        enumerable: true,
        configurable: true
    });
    return ValueTypes;
})();
exports.ValueTypes = ValueTypes;

//# sourceMappingURL=Results.js.map
