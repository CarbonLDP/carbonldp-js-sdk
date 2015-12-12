var Utils = require("./Utils");
var Modifications = (function () {
    function Modifications() {
        this.add = new Map();
        this.set = new Map();
        this.delete = new Map();
    }
    return Modifications;
})();
exports.Modifications = Modifications;
var ModificationType;
(function (ModificationType) {
    ModificationType[ModificationType["ADD"] = 0] = "ADD";
    ModificationType[ModificationType["SET"] = 1] = "SET";
    ModificationType[ModificationType["DELETE"] = 2] = "DELETE";
})(ModificationType || (ModificationType = {}));
exports.ModificationType = ModificationType;
function isDirty() {
    return this._dirty;
}
var Factory = (function () {
    function Factory() {
    }
    Factory.is = function (object) {
        return (Utils.hasPropertyDefined(object, "_dirty") &&
            Utils.hasPropertyDefined(object, "_modifications") &&
            Utils.hasFunction(object, "isDirty"));
    };
    Factory.from = function (objectOrObjects) {
        var objects = Utils.isArray(objectOrObjects) ? objectOrObjects : [objectOrObjects];
        var values = [];
        for (var i = 0, length_1 = objects.length; i < length_1; i++) {
            var value = objects[i];
            if (!Factory.is(value))
                Factory.injectBehavior(value);
            values.push(value);
        }
        if (Utils.isArray(objectOrObjects))
            return values;
        return values[0];
    };
    Factory.injectBehavior = function (value) {
        Object.defineProperties(value, {
            "_dirty": {
                writable: true,
                enumerable: false,
                value: false,
            },
            "_modifications": {
                writable: false,
                enumerable: false,
                value: new Modifications(),
            },
        });
        value.isDirty = isDirty;
        return value;
    };
    return Factory;
})();
exports.Factory = Factory;

//# sourceMappingURL=Persisted.js.map
