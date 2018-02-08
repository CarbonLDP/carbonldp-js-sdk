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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
    function Class(domain, ssl, settings) {
        if (ssl === void 0) { ssl = true; }
        var _this = _super.call(this) || this;
        domain = RDF.URI.Util.removeProtocol(domain);
        if (!domain.endsWith("/"))
            domain = domain + "/";
        _this._baseURI = (ssl ? "https://" : "http://") + domain;
        var internalSettings = __assign({}, Settings.defaultSettings, !settings ? {} : {
            vocabulary: settings.vocabulary,
        });
        Utils.M.extend(_this.settings, Utils.M.from(internalSettings));
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
        var _this = this;
        if (!this.hasSetting("system.platform.metadata"))
            return Promise.reject(new Errors.IllegalStateError("The \"system.platform.metadata\" setting hasn't been defined."));
        return Promise.resolve()
            .then(function () { return _this.resolveSystemURI(_this.getSetting("system.platform.metadata")); })
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
