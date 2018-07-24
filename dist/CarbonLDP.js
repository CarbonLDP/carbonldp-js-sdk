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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var iri_1 = require("sparqler/iri");
var AccessPoint_1 = require("./AccessPoint/AccessPoint");
var TransientAccessPoint_1 = require("./AccessPoint/TransientAccessPoint");
var AbstractContext_1 = require("./Context/AbstractContext");
var DocumentsContext_1 = require("./Context/DocumentsContext");
var GlobalContext_1 = require("./Context/GlobalContext");
var Document_1 = require("./Document/Document");
var Errors = __importStar(require("./Errors"));
var IllegalArgumentError_1 = require("./Errors/IllegalArgumentError");
var Fragment_1 = require("./Fragment/Fragment");
var TransientFragment_1 = require("./Fragment/TransientFragment");
var FreeResources_1 = require("./FreeResources/FreeResources");
var HTTP = __importStar(require("./HTTP"));
var JSONLD = __importStar(require("./JSONLD"));
var LDP = __importStar(require("./LDP"));
var LDPatch = __importStar(require("./LDPatch"));
var Messaging = __importStar(require("./Messaging"));
var ContainerType_1 = require("./ObjectSchema/ContainerType");
var DigestedObjectSchema_1 = require("./ObjectSchema/DigestedObjectSchema");
var DigestedObjectSchemaProperty_1 = require("./ObjectSchema/DigestedObjectSchemaProperty");
var ObjectSchemaDigester_1 = require("./ObjectSchema/ObjectSchemaDigester");
var ObjectSchemaUtils_1 = require("./ObjectSchema/ObjectSchemaUtils");
var PointerType_1 = require("./ObjectSchema/PointerType");
var Pointer_1 = require("./Pointer/Pointer");
var RDF = __importStar(require("./RDF"));
var Resource_1 = require("./Resource/Resource");
var SHACL = __importStar(require("./SHACL"));
var SPARQL = __importStar(require("./SPARQL"));
var System = __importStar(require("./System"));
var Utils = __importStar(require("./Utils"));
var Vocabularies = __importStar(require("./Vocabularies"));
var CarbonLDP = (function (_super) {
    __extends(CarbonLDP, _super);
    function CarbonLDP(urlOrSettings) {
        var _this = _super.call(this, __getURLFrom(urlOrSettings)) || this;
        _this._settings = {
            vocabulary: "vocabularies/main/#",
            paths: {
                system: {
                    slug: ".system/",
                    paths: {
                        platform: "platform/",
                        credentials: "credentials/",
                        roles: "roles/",
                    },
                },
                users: {
                    slug: "users/",
                    paths: {
                        me: "me/",
                    },
                },
            },
        };
        _this._extendsSettings(__getSettingsFrom(urlOrSettings));
        _this.documents = _this.registry.getPointer(_this._baseURI, true);
        return _this;
    }
    Object.defineProperty(CarbonLDP, "version", {
        get: function () { return "5.0.0-alpha.1"; },
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
    CarbonLDP.AbstractContext = AbstractContext_1.AbstractContext;
    CarbonLDP.AccessPoint = AccessPoint_1.AccessPoint;
    CarbonLDP.TransientAccessPoint = TransientAccessPoint_1.TransientAccessPoint;
    CarbonLDP.Errors = Errors;
    CarbonLDP.FreeResources = FreeResources_1.FreeResources;
    CarbonLDP.HTTP = HTTP;
    CarbonLDP.JSONLD = JSONLD;
    CarbonLDP.LDP = LDP;
    CarbonLDP.LDPatch = LDPatch;
    CarbonLDP.Messaging = Messaging;
    CarbonLDP.Vocabularies = Vocabularies;
    CarbonLDP.ObjectSchemaUtils = ObjectSchemaUtils_1.ObjectSchemaUtils;
    CarbonLDP.ObjectSchemaDigester = ObjectSchemaDigester_1.ObjectSchemaDigester;
    CarbonLDP.DigestedObjectSchemaProperty = DigestedObjectSchemaProperty_1.DigestedObjectSchemaProperty;
    CarbonLDP.PointerType = PointerType_1.PointerType;
    CarbonLDP.ContainerType = ContainerType_1.ContainerType;
    CarbonLDP.DigestedObjectSchema = DigestedObjectSchema_1.DigestedObjectSchema;
    CarbonLDP.Document = Document_1.Document;
    CarbonLDP.Fragment = Fragment_1.Fragment;
    CarbonLDP.TransientFragment = TransientFragment_1.TransientFragment;
    CarbonLDP.Pointer = Pointer_1.Pointer;
    CarbonLDP.RDF = RDF;
    CarbonLDP.TransientResource = Resource_1.Resource;
    CarbonLDP.GlobalContext = GlobalContext_1.GlobalContext;
    CarbonLDP.SHACL = SHACL;
    CarbonLDP.SPARQL = SPARQL;
    CarbonLDP.System = System;
    CarbonLDP.Utils = Utils;
    return CarbonLDP;
}(DocumentsContext_1.DocumentsContext));
exports.CarbonLDP = CarbonLDP;
function __getURLFrom(urlOrSettings) {
    return Utils.isString(urlOrSettings) ?
        __getURLFromString(urlOrSettings) :
        __getURLFromSettings(urlOrSettings);
}
function __getURLFromString(url) {
    if (!RDF.URI.hasProtocol(url))
        throw new IllegalArgumentError_1.IllegalArgumentError("The URL must contain a valid protocol: \"http://\", \"https://\".");
    if (url.endsWith("/"))
        return url;
    return url + "/";
}
function __getURLFromSettings(settings) {
    if (!Utils.isString(settings.host))
        throw new IllegalArgumentError_1.IllegalArgumentError("The settings object must contains a valid host string.");
    if (iri_1.hasProtocol(settings.host))
        throw new IllegalArgumentError_1.IllegalArgumentError("The host must not contain a protocol.");
    if (settings.host.includes(":"))
        throw new IllegalArgumentError_1.IllegalArgumentError("The host must not contain a port.");
    var protocol = settings.ssl === false ? "http://" : "https://";
    var host = settings.host.endsWith("/") ? settings.host.slice(0, -1) : settings.host;
    var url = "" + protocol + host + "/";
    if (!Utils.isNumber(settings.port))
        return url;
    return url.slice(0, -1) + (":" + settings.port + "/");
}
function __getSettingsFrom(urlOrSettings) {
    if (Utils.isString(urlOrSettings))
        return {};
    return Object.assign({}, urlOrSettings, { ssl: null, host: null, port: null });
}

//# sourceMappingURL=CarbonLDP.js.map
