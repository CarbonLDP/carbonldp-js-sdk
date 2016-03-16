"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Apps_1 = require("./Apps");
var Auth = require("./Auth");
var AbstractContext_1 = require("./AbstractContext");
var Document = require("./Document");
var Documents_1 = require("./Documents");
var HTTP = require("./HTTP");
var RDF = require("./RDF");
var settings_1 = require("./settings");
var Utils = require("./Utils");
var Carbon = (function (_super) {
    __extends(Carbon, _super);
    function Carbon(settings) {
        _super.call(this);
        settings = settings ? settings : settings_1.default;
        Utils.M.extend(this.settings, Utils.M.from(settings));
        this.apps = new Apps_1.default(this);
    }
    Object.defineProperty(Carbon, "version", {
        get: function () { return "0.17.4-ALPHA"; },
        enumerable: true,
        configurable: true
    });
    Carbon.prototype.resolve = function (uri) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        var finalURI = this.settings.get("http.ssl") ? "https://" : "http://";
        finalURI += this.settings.get("domain") + "/" + this.getSetting("platform.container");
        return RDF.URI.Util.resolve(finalURI, uri);
    };
    Carbon.prototype.getAPIDescription = function () {
        return this.documents.get("api/").then(function (_a) {
            var description = _a[0], response = _a[1];
            return description;
        });
    };
    Carbon.Apps = Apps_1.default;
    Carbon.Auth = Auth;
    Carbon.Document = Document;
    Carbon.Documents = Documents_1.default;
    Carbon.HTTP = HTTP;
    Carbon.RDF = RDF;
    Carbon.Utils = Utils;
    return Carbon;
}(AbstractContext_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Carbon;

//# sourceMappingURL=Carbon.js.map
