"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractContext_1 = require("./AbstractContext");
var Agent = require("./Agent");
var Agents = require("./Agents");
var App = require("./App");
var Apps = require("./Apps");
var Auth = require("./Auth");
var Document = require("./Document");
var Documents_1 = require("./Documents");
var Errors = require("./Errors");
var Fragment = require("./Fragment");
var HTTP = require("./HTTP");
var JSONLDConverter = require("./JSONLDConverter");
var LDP = require("./LDP");
var NamedFragment = require("./NamedFragment");
var NS = require("./NS");
var ObjectSchema = require("./ObjectSchema");
var Persisted = require("./Persisted");
var PersistedApp = require("./PersistedApp");
var PersistedDocument = require("./PersistedDocument");
var PersistedFragment = require("./PersistedFragment");
var PersistedNamedFragment = require("./PersistedNamedFragment");
var PersistedResource = require("./PersistedResource");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Resource = require("./Resource");
var SDKContext = require("./SDKContext");
var settings_1 = require("./settings");
var SPARQL = require("./SPARQL");
var Utils = require("./Utils");
var Carbon = (function (_super) {
    __extends(Carbon, _super);
    function Carbon(settings) {
        _super.call(this);
        settings = settings ? settings : settings_1.default;
        Utils.M.extend(this.settings, Utils.M.from(settings));
        this.apps = new Apps.Class(this);
    }
    Object.defineProperty(Carbon, "version", {
        get: function () { return "0.22.0-ALPHA"; },
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
    Carbon.Agent = Agent;
    Carbon.Agents = Agents;
    Carbon.App = App;
    Carbon.Apps = Apps;
    Carbon.Auth = Auth;
    Carbon.Document = Document;
    Carbon.Documents = Documents_1.default;
    Carbon.Errors = Errors;
    Carbon.Fragment = Fragment;
    Carbon.HTTP = HTTP;
    Carbon.JSONLDConverter = JSONLDConverter;
    Carbon.LDP = LDP;
    Carbon.NamedFragment = NamedFragment;
    Carbon.NS = NS;
    Carbon.ObjectSchema = ObjectSchema;
    Carbon.Persisted = Persisted;
    Carbon.PersistedApp = PersistedApp;
    Carbon.PersistedDocument = PersistedDocument;
    Carbon.PersistedFragment = PersistedFragment;
    Carbon.PersistedNamedFragment = PersistedNamedFragment;
    Carbon.PersistedResource = PersistedResource;
    Carbon.Pointer = Pointer;
    Carbon.RDF = RDF;
    Carbon.Resource = Resource;
    Carbon.SDKContext = SDKContext;
    Carbon.SPARQL = SPARQL;
    Carbon.Utils = Utils;
    return Carbon;
}(AbstractContext_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Carbon;

//# sourceMappingURL=Carbon.js.map
