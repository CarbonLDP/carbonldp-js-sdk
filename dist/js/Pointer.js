System.register(["./Utils"], function(exports_1) {
    var Utils;
    var Factory, Util;
    return {
        setters:[
            function (Utils_1) {
                Utils = Utils_1;
            }],
        execute: function() {
            Factory = (function () {
                function Factory() {
                }
                Factory.hasClassProperties = function (object) {
                    return !!(Utils.hasPropertyDefined(object, "_id") &&
                        Utils.hasPropertyDefined(object, "_resolved") &&
                        Utils.hasPropertyDefined(object, "id") &&
                        Utils.hasFunction(object, "isResolved") &&
                        Utils.hasPropertyDefined(object, "resolve"));
                };
                Factory.is = function (value) {
                    return !!(Utils.isObject(value) &&
                        Factory.hasClassProperties(value));
                };
                Factory.create = function (id) {
                    id = !!id ? id : "";
                    var pointer = Factory.decorate({});
                    pointer.id = id;
                    return pointer;
                };
                Factory.decorate = function (object) {
                    if (Factory.hasClassProperties(object))
                        return object;
                    Object.defineProperties(object, {
                        "_id": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: "",
                        },
                        "_resolved": {
                            writable: true,
                            enumerable: false,
                            configurable: true,
                            value: false,
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
                        "isResolved": {
                            writable: false,
                            enumerable: false,
                            configurable: true,
                            value: function () {
                                return this._resolved;
                            },
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
            exports_1("Factory", Factory);
            Util = (function () {
                function Util() {
                }
                Util.getIDs = function (pointers) {
                    var ids = [];
                    for (var _i = 0; _i < pointers.length; _i++) {
                        var pointer = pointers[_i];
                        ids.push(pointer.id);
                    }
                    return ids;
                };
                Util.resolveAll = function (pointers) {
                    var promises = pointers.map(function (pointer) { return pointer.resolve(); });
                    return Promise.all(promises).then(function (results) {
                        var resolvedPointers = results.map(function (result) { return result[0]; });
                        var responses = results.map(function (result) { return result[1]; });
                        return [resolvedPointers, responses];
                    });
                };
                return Util;
            })();
            exports_1("Util", Util);
        }
    }
});

//# sourceMappingURL=Pointer.js.map
