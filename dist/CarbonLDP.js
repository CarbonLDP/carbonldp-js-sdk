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
var iri_1 = require("sparqler/iri");
var AbstractContext = require("./AbstractContext");
var AccessPoint = require("./AccessPoint");
var Auth = require("./Auth");
var BlankNode = require("./BlankNode");
var Document = require("./Document");
var Documents = require("./Documents");
var Errors = require("./Errors");
var Fragment = require("./Fragment");
var HTTP = require("./HTTP");
var JSONLD = require("./JSONLD");
var LDP = require("./LDP");
var LDPatch = require("./LDPatch");
var Messaging = require("./Messaging");
var ModelFactory = require("./ModelFactory");
var NamedFragment = require("./NamedFragment");
var ObjectSchema = require("./ObjectSchema");
var PersistedDocument = require("./PersistedDocument");
var PersistedFragment = require("./PersistedFragment");
var PersistedNamedFragment = require("./PersistedNamedFragment");
var PersistedResource = require("./PersistedResource");
var Pointer = require("./Pointer");
var RDF = require("./RDF");
var Resource = require("./Resource");
var SDKContext = require("./SDKContext");
var Settings = require("./Settings");
var SHACL = require("./SHACL");
var SPARQL = require("./SPARQL");
var System = require("./System");
var Utils = require("./Utils");
var Vocabularies = require("./Vocabularies");
var CarbonLDP = (function (_super) {
    __extends(CarbonLDP, _super);
    function CarbonLDP(urlOrSettings) {
        var _this = _super.call(this) || this;
        _this.settings = {
            vocabulary: "vocabulary/#",
            paths: {
                system: {
                    slug: ".system/",
                    paths: {
                        platform: "platform/",
                        credentials: "credentials/",
                        users: "users/",
                        roles: "roles/",
                    },
                },
            },
        };
        if (Utils.isString(urlOrSettings)) {
            if (!RDF.URI.URI.hasProtocol(urlOrSettings))
                throw new Errors.IllegalArgumentError("The URL must contain a valid protocol: \"http://\", \"https://\".");
            _this._baseURI = urlOrSettings;
        }
        else {
            if (!Utils.isString(urlOrSettings.host))
                throw new Errors.IllegalArgumentError("The settings object must contains a valid host string.");
            if (iri_1.hasProtocol(urlOrSettings.host))
                throw new Errors.IllegalArgumentError("The host must not contain a protocol.");
            if (urlOrSettings.host.includes(":"))
                throw new Errors.IllegalArgumentError("The host must not contain a port.");
            _this._baseURI = "" + (urlOrSettings.ssl === false ? "http://" : "https://") + urlOrSettings.host;
            if (Utils.isNumber(urlOrSettings.port)) {
                if (_this._baseURI.endsWith("/"))
                    _this._baseURI = _this._baseURI.slice(0, -1);
                _this._baseURI += ":" + urlOrSettings.port;
            }
            urlOrSettings.ssl = urlOrSettings.host = urlOrSettings.port = null;
            _this.settings = Utils.ObjectUtils.extend(_this.settings, urlOrSettings, { objects: true });
        }
        if (!_this._baseURI.endsWith("/"))
            _this._baseURI = _this._baseURI + "/";
        _this.messaging = new Messaging.Service.MessagingService(_this);
        return _this;
    }
    Object.defineProperty(CarbonLDP, "version", {
        get: function () { return "1.0.0-alpha.11"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarbonLDP.prototype, "version", {
        get: function () { return CarbonLDP.version; },
        enumerable: true,
        configurable: true
    });
    CarbonLDP.prototype.getPlatformMetadata = function () {
        var _this = this;
        return Utils.promiseMethod(function () {
            var uri = _this._resolvePath("system.platform");
            return _this.documents.get(uri);
        });
    };
    CarbonLDP.AbstractContext = AbstractContext;
    CarbonLDP.AccessPoint = AccessPoint;
    CarbonLDP.Auth = Auth;
    CarbonLDP.BlankNode = BlankNode;
    CarbonLDP.Document = Document;
    CarbonLDP.Documents = Documents;
    CarbonLDP.Errors = Errors;
    CarbonLDP.Fragment = Fragment;
    CarbonLDP.HTTP = HTTP;
    CarbonLDP.JSONLD = JSONLD;
    CarbonLDP.LDP = LDP;
    CarbonLDP.LDPatch = LDPatch;
    CarbonLDP.Messaging = Messaging;
    CarbonLDP.ModelFactory = ModelFactory;
    CarbonLDP.NamedFragment = NamedFragment;
    CarbonLDP.Vocabularies = Vocabularies;
    CarbonLDP.ObjectSchema = ObjectSchema;
    CarbonLDP.PersistedDocument = PersistedDocument;
    CarbonLDP.PersistedFragment = PersistedFragment;
    CarbonLDP.PersistedNamedFragment = PersistedNamedFragment;
    CarbonLDP.PersistedResource = PersistedResource;
    CarbonLDP.Pointer = Pointer;
    CarbonLDP.RDF = RDF;
    CarbonLDP.Resource = Resource;
    CarbonLDP.SDKContext = SDKContext;
    CarbonLDP.Settings = Settings;
    CarbonLDP.SHACL = SHACL;
    CarbonLDP.SPARQL = SPARQL;
    CarbonLDP.System = System;
    CarbonLDP.Utils = Utils;
    return CarbonLDP;
}(AbstractContext.AbstractContext));
exports.CarbonLDP = CarbonLDP;
exports.default = CarbonLDP;

//# sourceMappingURL=CarbonLDP.js.map
