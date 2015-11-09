/// <reference path="../typings/es6/es6.d.ts" />
var Auth_1 = require("./Auth");
var Documents_1 = require("./Documents");
var Utils = require("./Utils");
var Parent = (function () {
    function Parent() {
        this.settings = new Map();
        this.definitions = new Map();
        this.Auth = new Auth_1.default(this);
        this.Documents = new Documents_1.default(this);
    }
    Parent.prototype.resolve = function (relativeURI) {
        throw new Error("Method needs to be implemented by child.");
    };
    Parent.prototype.hasSetting = function (name) {
        return (this.settings.has(name) ||
            (this.parent && this.parent.hasSetting(name)));
    };
    Parent.prototype.getSetting = function (name) {
        if (this.settings.has(name))
            return this.settings.get(name);
        if (this.parent && this.parent.hasSetting(name))
            return this.parent.getSetting(name);
        return null;
    };
    Parent.prototype.setSetting = function (name, value) {
        this.settings.set(name, value);
    };
    Parent.prototype.deleteSetting = function (name) {
        this.settings.delete(name);
    };
    Parent.prototype.hasDefinition = function (uri) {
        if (this.definitions.has(uri))
            return true;
        if (this.parent && this.parent.hasDefinition(uri))
            return true;
        return false;
    };
    Parent.prototype.getDefinition = function (uri) {
        var descriptions = new Map();
        if (this.definitions.has(uri)) {
            Utils.M.extend(descriptions, this.definitions.get(uri));
            if (this.parent && this.parent.hasDefinition(uri))
                Utils.M.extend(descriptions, this.parent.getDefinition(uri));
        }
        return descriptions;
    };
    Parent.prototype.getDefinitionURIs = function () {
        var uris = Utils.A.from(this.definitions.keys());
        if (this.parent)
            uris = Utils.A.joinWithoutDuplicates(uris, this.parent.getDefinitionURIs());
        return uris;
    };
    Parent.prototype.addDefinition = function (uri, descriptions) {
        var extender;
        if (Utils.isMap(descriptions)) {
            extender = descriptions;
        }
        else if (Utils.isObject(descriptions)) {
            extender = Utils.M.from(descriptions);
        }
        else
            throw new Error("IllegalArgument");
        if (this.definitions.has(uri)) {
            Utils.M.extend(this.definitions.get(uri), extender);
        }
        else {
            this.definitions.set(uri, extender);
        }
    };
    Parent.prototype.setDefinition = function (uri, descriptions) {
        var extender;
        if (Utils.isMap(descriptions)) {
            extender = descriptions;
        }
        else if (Utils.isObject(descriptions)) {
            extender = Utils.M.from(descriptions);
        }
        else
            throw new Error("IllegalArgument");
        this.definitions.set(uri, extender);
    };
    Parent.prototype.deleteDefinition = function (uri) {
        this.definitions.delete(uri);
    };
    return Parent;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Parent;

//# sourceMappingURL=Parent.js.map
