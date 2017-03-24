"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractContext = require("./AbstractContext");
var AccessPoint = require("./AccessPoint");
var App = require("./App");
var Apps = require("./Apps");
var Auth = require("./Auth");
var Document = require("./Document");
var Documents = require("./Documents");
var Errors = require("./Errors");
var Fragment = require("./Fragment");
var HTTP = require("./HTTP");
var JSONLD = require("./JSONLD");
var LDP = require("./LDP");
var NamedFragment = require("./NamedFragment");
var NS = require("./NS");
var ObjectSchema = require("./ObjectSchema");
var PersistedApp = require("./PersistedApp");
var PersistedDocument = require("./PersistedDocument");
var PersistedFragment = require("./PersistedFragment");
var PersistedNamedFragment = require("./PersistedNamedFragment");
var PersistedResource = require("./PersistedResource");
var Platform = require("./Platform");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Resource = require("./Resource");
var SDKContext = require("./SDKContext");
var Settings = require("./Settings");
var SPARQL = require("./SPARQL");
var Utils = require("./Utils");
var Carbon = (function (_super) {
    __extends(Carbon, _super);
    function Carbon(settings) {
        var _this = _super.call(this) || this;
        _this.auth = new Platform.Auth.Class(_this);
        settings = settings ? Utils.extend({}, Settings.defaultSettings, settings) : Settings.defaultSettings;
        Utils.M.extend(_this.settings, Utils.M.from(settings));
        _this.apps = new Apps.Class(_this);
        return _this;
    }
    Object.defineProperty(Carbon, "version", {
        get: function () { return "0.41.0"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carbon.prototype, "version", {
        get: function () { return Carbon.version; },
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
    return Carbon;
}(AbstractContext.Class));
Carbon.AccessPoint = AccessPoint;
Carbon.App = App;
Carbon.Apps = Apps;
Carbon.Auth = Auth;
Carbon.Document = Document;
Carbon.Documents = Documents;
Carbon.Errors = Errors;
Carbon.Fragment = Fragment;
Carbon.HTTP = HTTP;
Carbon.JSONLD = JSONLD;
Carbon.LDP = LDP;
Carbon.NamedFragment = NamedFragment;
Carbon.NS = NS;
Carbon.ObjectSchema = ObjectSchema;
Carbon.PersistedApp = PersistedApp;
Carbon.PersistedDocument = PersistedDocument;
Carbon.PersistedFragment = PersistedFragment;
Carbon.PersistedNamedFragment = PersistedNamedFragment;
Carbon.PersistedResource = PersistedResource;
Carbon.Platform = Platform;
Carbon.Pointer = Pointer;
Carbon.RDF = RDF;
Carbon.Resource = Resource;
Carbon.SDKContext = SDKContext;
Carbon.Settings = Settings;
Carbon.SPARQL = SPARQL;
Carbon.Utils = Utils;
exports.Carbon = Carbon;
exports.default = Carbon;

//# sourceMappingURL=Carbon.js.map
