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
var Document = require("./Document");
var Documents = require("./Documents");
var Errors = require("./Errors");
var Fragment = require("./Fragment");
var HTTP = require("./HTTP");
var JSONLD = require("./JSONLD");
var LDP = require("./LDP");
var LDPatch = require("./LDPatch");
var Messaging = require("./Messaging");
var NamedFragment = require("./NamedFragment");
var NS = require("./NS");
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
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(urlOrSettings) {
        var _this = _super.call(this) || this;
        _this.settings = {
            vocabulary: "vocabulary/#",
            paths: {
                system: {
                    slug: ".system/",
                    paths: {
                        platform: "platform/",
                        instance: "instance/",
                        credentials: "credentials/",
                        users: "users/",
                        roles: "roles/",
                    },
                },
            },
        };
        if (Utils.isString(urlOrSettings)) {
            if (!RDF.URI.Util.hasProtocol(urlOrSettings))
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
            _this.settings = Utils.O.extend(_this.settings, urlOrSettings, { objects: true });
        }
        if (!_this._baseURI.endsWith("/"))
            _this._baseURI = _this._baseURI + "/";
        _this.messaging = new Messaging.Service.Class(_this);
        return _this;
    }
    Object.defineProperty(Class, "version", {
        get: function () { return "1.0.0-alpha.11"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "version", {
        get: function () { return Class.version; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.getPlatformMetadata = function () {
        return this._getDocumentMetadata("system.platform");
    };
    Class.prototype.getInstanceMetadata = function () {
        return this._getDocumentMetadata("system.instance");
    };
    Class.prototype._getDocumentMetadata = function (metadataPath) {
        var _this = this;
        return Promise.resolve()
            .then(function () { return _this._resolvePath(metadataPath); })
            .then(function (metadataURI) { return _this.documents.get(metadataURI); });
    };
    Class.AccessPoint = AccessPoint;
    Class.Auth = Auth;
    Class.Document = Document;
    Class.Documents = Documents;
    Class.Errors = Errors;
    Class.Fragment = Fragment;
    Class.HTTP = HTTP;
    Class.JSONLD = JSONLD;
    Class.LDP = LDP;
    Class.LDPatch = LDPatch;
    Class.Messaging = Messaging;
    Class.NamedFragment = NamedFragment;
    Class.NS = NS;
    Class.ObjectSchema = ObjectSchema;
    Class.PersistedDocument = PersistedDocument;
    Class.PersistedFragment = PersistedFragment;
    Class.PersistedNamedFragment = PersistedNamedFragment;
    Class.PersistedResource = PersistedResource;
    Class.Pointer = Pointer;
    Class.RDF = RDF;
    Class.Resource = Resource;
    Class.SDKContext = SDKContext;
    Class.Settings = Settings;
    Class.SHACL = SHACL;
    Class.SPARQL = SPARQL;
    Class.System = System;
    Class.Utils = Utils;
    return Class;
}(AbstractContext.Class));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Carbon.js.map
