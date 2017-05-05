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
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(settings) {
        var _this = _super.call(this) || this;
        _this.auth = new Platform.Auth.Class(_this);
        settings = settings ? Utils.extend({}, Settings.defaultSettings, settings) : Settings.defaultSettings;
        Utils.M.extend(_this.settings, Utils.M.from(settings));
        return _this;
    }
    Object.defineProperty(Class, "version", {
        get: function () { return "0.42.0"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "version", {
        get: function () { return Class.version; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.resolve = function (uri) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        var finalURI = this.settings.get("http.ssl") ? "https://" : "http://";
        finalURI += this.settings.get("domain") + "/" + this.getSetting("platform.container");
        return RDF.URI.Util.resolve(finalURI, uri);
    };
    Class.prototype.getAPIDescription = function () {
        return this.documents.get("api/").then(function (_a) {
            var description = _a[0], response = _a[1];
            return description;
        });
    };
    return Class;
}(AbstractContext.Class));
Class.AccessPoint = AccessPoint;
Class.Auth = Auth;
Class.Document = Document;
Class.Documents = Documents;
Class.Errors = Errors;
Class.Fragment = Fragment;
Class.HTTP = HTTP;
Class.JSONLD = JSONLD;
Class.LDP = LDP;
Class.NamedFragment = NamedFragment;
Class.NS = NS;
Class.ObjectSchema = ObjectSchema;
Class.PersistedDocument = PersistedDocument;
Class.PersistedFragment = PersistedFragment;
Class.PersistedNamedFragment = PersistedNamedFragment;
Class.PersistedResource = PersistedResource;
Class.Platform = Platform;
Class.Pointer = Pointer;
Class.RDF = RDF;
Class.Resource = Resource;
Class.SDKContext = SDKContext;
Class.Settings = Settings;
Class.SPARQL = SPARQL;
Class.Utils = Utils;
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Carbon.js.map
