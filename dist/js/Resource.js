var Utils = require("./Utils");
function hasType(type) {
    return this.types.indexOf(type) !== -1;
}
var Factory = (function () {
    function Factory() {
    }
    Factory.prototype.hasClassProperties = function (resource) {
        return (Utils.hasPropertyDefined(resource, "_id") &&
            Utils.hasPropertyDefined(resource, "id") &&
            Utils.hasPropertyDefined(resource, "types") &&
            Utils.hasPropertyDefined(resource, "resolve"));
    };
    Factory.prototype.create = function (id, types) {
        if (id === void 0) { id = null; }
        if (types === void 0) { types = null; }
        return this.createFrom({}, id, types);
    };
    Factory.prototype.createFrom = function (object, id, types) {
        if (id === void 0) { id = null; }
        if (types === void 0) { types = null; }
        id = !!id ? id : "";
        types = !!types ? types : [];
        var resource = this.decorate(object);
        resource.id = id;
        resource.types = types;
        return resource;
    };
    Factory.prototype.decorate = function (object) {
        if (this.hasClassProperties(object))
            return object;
        Object.defineProperties(object, {
            "_id": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: "",
            },
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    if (!this._id)
                        return "";
                    return this._id;
                },
                set: function (value) {
                    this._id = value;
                },
            },
            "types": {
                writable: true,
                enumerable: false,
                configurable: true,
                value: [],
            },
            "resolve": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        return _this;
                    });
                },
            },
        });
        return object;
    };
    return Factory;
})();
exports.Factory = Factory;
exports.factory = new Factory();

//# sourceMappingURL=Resource.js.map
