"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("../Errors");
var Fragment_1 = require("../Fragment");
var RDF_1 = require("../RDF");
exports.TransientBlankNode = {
    is: function (value) {
        return Fragment_1.TransientFragment.is(value) &&
            RDF_1.URI.isBNodeID(value.id);
    },
    create: function (data) {
        var copy = Object.assign({}, data);
        return exports.TransientBlankNode.createFrom(copy);
    },
    createFrom: function (object) {
        if (!object.id) {
            object.id = RDF_1.URI.generateBNodeID();
        }
        else if (!RDF_1.URI.isBNodeID(object.id)) {
            throw new Errors_1.IllegalArgumentError("The id \"" + object.id + "\" is not a blank node label.");
        }
        return exports.TransientBlankNode.decorate(object);
    },
    decorate: function (object) {
        var resource = Fragment_1.TransientFragment.decorate(object);
        Object.defineProperties(resource, {
            "id": {
                enumerable: false,
                configurable: true,
                get: function () {
                    return this._id;
                },
                set: function (value) {
                    if (!RDF_1.URI.isBNodeID(value))
                        throw new Errors_1.IllegalActionError("Cannot assign \"" + value + "\" as a blank node ID.");
                    this._id = value;
                },
            },
        });
        return resource;
    },
};

//# sourceMappingURL=TransientBlankNode.js.map
