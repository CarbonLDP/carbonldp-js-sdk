/// <reference path="./../typings/tsd.d.ts" />
var Auth_1 = require("./Auth");
var ContextDigester = require("./ContextDigester");
var Documents_1 = require("./Documents");
var Context = (function () {
    function Context(parentContext) {
        if (parentContext === void 0) { parentContext = null; }
        this.parentContext = parentContext;
        this.settings = new Map();
        this.mainContext = new ContextDigester.DigestedContext();
        this.classContexts = new Map();
        this.Auth = new Auth_1.default(this);
        this.Documents = new Documents_1.default(this);
    }
    Context.prototype.getBaseURI = function () {
        return this.resolve("");
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
    Context.prototype.getMainContext = function () {
        return this.mainContext;
    };
    Context.prototype.expandMainContext = function (contextOrContexts) {
        var digestedContext = ContextDigester.Class.digestContext(contextOrContexts);
        this.mainContext = ContextDigester.Class.combineDigestedContexts([this.mainContext, digestedContext]);
    };
    Context.prototype.setMainContext = function (contextOrContexts) {
        this.mainContext = ContextDigester.Class.digestContext(contextOrContexts);
    };
    Context.prototype.hasClassContext = function (classURI) {
        return this.classContexts.has(classURI);
    };
    Context.prototype.getClassContext = function (classURI) {
        return this.classContexts.get(classURI);
    };
    Context.prototype.expandClassContext = function (classURI, contextOrContexts) {
        if (!this.classContexts.has(classURI)) {
            this.setClassContext(classURI, contextOrContexts);
            return;
        }
        var digestedContext = ContextDigester.Class.digestContext(contextOrContexts);
        digestedContext = ContextDigester.Class.combineDigestedContexts([this.classContexts.get(classURI), digestedContext]);
        this.classContexts.set(classURI, digestedContext);
    };
    Context.prototype.setClassContext = function (classURI, contextOrContexts) {
        var digestedContext = ContextDigester.Class.digestContext(contextOrContexts);
        digestedContext = ContextDigester.Class.combineDigestedContexts([this.mainContext, digestedContext]);
        this.classContexts.set(classURI, digestedContext);
    };
    return Context;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Context;

//# sourceMappingURL=Context.js.map
