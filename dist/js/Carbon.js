/// <reference path="../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var APIDescription = require('./APIDescription');
var Apps_1 = require('./Apps');
var Auth_1 = require('./Auth');
var Document = require('./Document');
var Documents_1 = require('./Documents');
var HTTP = require('./HTTP');
var Parent_1 = require('./Parent');
var RDF = require('./RDF');
var settings_1 = require('./settings');
var Utils = require('./Utils');
var Carbon = (function (_super) {
    __extends(Carbon, _super);
    function Carbon(settings) {
        _super.call(this);
        settings = settings ? settings : settings_1.default;
        Utils.M.extend(this.settings, Utils.M.from(settings));
        this.registerDefaultDefinitions();
        this.apps = new Apps_1.default(this);
    }
    Carbon.prototype.resolve = function (uri) {
        if (RDF.URI.Util.isAbsolute(uri))
            return uri;
        var finalURI = this.settings.get("http.ssl") ? 'https://' : 'http://';
        finalURI += this.settings.get("domain");
        return RDF.URI.Util.resolve(finalURI, uri);
    };
    Carbon.prototype.getAPIDescription = function () {
        return this.Documents.get('platform/api/').then(function (processedResponse) {
            return processedResponse.result;
        });
    };
    Carbon.prototype.registerDefaultDefinitions = function () {
        this.addDefinition(APIDescription.RDFClass, APIDescription.Definition);
    };
    Carbon.Apps = Apps_1.default;
    Carbon.Auth = Auth_1.default;
    Carbon.Document = Document;
    Carbon.Documents = Documents_1.default;
    Carbon.HTTP = HTTP;
    Carbon.RDF = RDF;
    Carbon.Utils = Utils;
    Carbon.version = '0.9.2-ALPHA';
    return Carbon;
})(Parent_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Carbon;

//# sourceMappingURL=Carbon.js.map
