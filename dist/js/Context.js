/// <reference path="../typings/es6/es6.d.ts" />
var Auth_1 = require("./Auth");
var Documents_1 = require("./Documents");
var Errors = require("./Errors");
var Utils = require("./Utils");
var Context = (function () {
    function Context() {
        this.settings = new Map();
        this.definitions = new Map();
        this.Auth = new Auth_1.default(this);
        this.Documents = new Documents_1.default(this);
    }
    Context.prototype.resolve = function (relativeURI) {
        throw new Errors.IllegalStateError("Method needs to be implemented by child.");
    };
    Context.prototype.hasSetting = function (name) {
        return (this.settings.has(name) ||
            (this.parentContext && this.parentContext.hasSetting(name)));
    };
    Context.prototype.getSetting = function (name) {
        if (this.settings.has(name))
            return this.settings.get(name);
        if (this.parentContext && this.parentContext.hasSetting(name))
            return this.parentContext.getSetting(name);
        return null;
    };
    Context.prototype.setSetting = function (name, value) {
        this.settings.set(name, value);
    };
    Context.prototype.deleteSetting = function (name) {
        this.settings.delete(name);
    };
    Context.prototype.hasDefinition = function (uri) {
        if (this.definitions.has(uri))
            return true;
        if (this.parentContext && this.parentContext.hasDefinition(uri))
            return true;
        return false;
    };
    Context.prototype.getDefinition = function (uri) {
        var descriptions = new Map();
        if (this.definitions.has(uri)) {
            Utils.M.extend(descriptions, this.definitions.get(uri));
            if (this.parentContext && this.parentContext.hasDefinition(uri))
                Utils.M.extend(descriptions, this.parentContext.getDefinition(uri));
        }
        return descriptions;
    };
    Context.prototype.getDefinitionURIs = function () {
        var uris = Utils.A.from(this.definitions.keys());
        if (this.parentContext)
            uris = Utils.A.joinWithoutDuplicates(uris, this.parentContext.getDefinitionURIs());
        return uris;
    };
    Context.prototype.addDefinition = function (uri, descriptions) {
        var extender;
        if (Utils.isMap(descriptions)) {
            extender = descriptions;
        }
        else if (Utils.isObject(descriptions)) {
            extender = Utils.M.from(descriptions);
        }
        else
            throw new Errors.IllegalArgumentError("descriptions must be a Map or an Object");
        if (this.definitions.has(uri)) {
            Utils.M.extend(this.definitions.get(uri), extender);
        }
        else {
            this.definitions.set(uri, extender);
        }
    };
    Context.prototype.setDefinition = function (uri, descriptions) {
        var extender;
        if (Utils.isMap(descriptions)) {
            extender = descriptions;
        }
        else if (Utils.isObject(descriptions)) {
            extender = Utils.M.from(descriptions);
        }
        else
            throw new Errors.IllegalArgumentError("descriptions must be a Map or an Object");
        this.definitions.set(uri, extender);
    };
    Context.prototype.deleteDefinition = function (uri) {
        this.definitions.delete(uri);
    };
    return Context;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Context;

//# sourceMappingURL=Context.js.map
