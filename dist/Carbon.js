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
var SPARQL = require("./SPARQL");
var System = require("./System");
var Utils = require("./Utils");
var Class = (function (_super) {
    __extends(Class, _super);
    function Class(domain, ssl, settings) {
        if (ssl === void 0) { ssl = true; }
        var _this = _super.call(this) || this;
        domain = RDF.URI.Util.hasProtocol(domain) ? domain.substring(domain.indexOf("://") + 3) : domain;
        domain = Utils.S.endsWith(domain, "/") ? domain : domain + "/";
        _this._baseURI = (ssl ? "https://" : "http://") + domain;
        settings = settings ? Utils.extend({}, Settings.defaultSettings, settings) : Settings.defaultSettings;
        Utils.M.extend(_this.settings, Utils.M.from(settings));
        _this._messaging = new Messaging.Service.Class(_this);
        return _this;
    }
    Object.defineProperty(Class, "version", {
        get: function () { return "1.0.0-alpha.1"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Class.prototype, "version", {
        get: function () { return Class.version; },
        enumerable: true,
        configurable: true
    });
    Class.prototype.getPlatformMetadata = function () {
        return this.getDocumentMetadata("system.platform.metadata");
    };
    Class.prototype.getInstanceMetadata = function () {
        return this.getDocumentMetadata("system.instance.metadata");
    };
    Class.prototype.connectMessaging = function (optionsOrOnConnect, onConnectOrOnError, onError) {
        if (Utils.isFunction(optionsOrOnConnect)) {
            this._messaging.connect(optionsOrOnConnect, onConnectOrOnError);
        }
        else {
            this._messaging.setOptions(optionsOrOnConnect);
            this._messaging.connect(onConnectOrOnError, onError);
        }
    };
    Class.prototype.getDocumentMetadata = function (metadataSetting) {
        var _this = this;
        if (!this.hasSetting(metadataSetting))
            return Promise.reject(new Errors.IllegalStateError("The \"" + metadataSetting + "\" setting hasn't been defined."));
        return Promise.resolve()
            .then(function () { return _this.resolveSystemURI(_this.getSetting(metadataSetting)); })
            .then(function (metadataURI) { return _this.documents.get(metadataURI); })
            .then(function (_a) {
            var metadataDocument = _a[0];
            return metadataDocument;
        });
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
    Class.SPARQL = SPARQL;
    Class.System = System;
    Class.Utils = Utils;
    return Class;
}(AbstractContext.Class));
exports.Class = Class;
exports.default = Class;

//# sourceMappingURL=Carbon.js.map
