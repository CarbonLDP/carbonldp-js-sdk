define(["require", "exports", './Apps', './Documents', './RDF', './Resources', './REST', './configuration'], function (require, exports, Apps_1, Documents_1, RDF, Resources_1, REST, configuration) {
    exports.RDF = RDF;
    exports.REST = REST;
    var Carbon = (function () {
        function Carbon(configuration) {
            this.Definitions = new Map();
            this.Apps = new Apps_1.default(this, configuration.appsContainer);
            this.Documents = new Documents_1.default(this);
            this.Resources = new Resources_1.default(this.Documents);
        }
        Carbon.prototype.resolve = function (relativeURI) {
            var finalURI = this.configuration.useSSL ? 'https://' : 'http://';
            finalURI += this.configuration.domain;
            return RDF.URI.Util.resolve(finalURI, relativeURI);
        };
        return Carbon;
    })();
    exports.Carbon = Carbon;
    exports.default = new Carbon(configuration);
});
//@formatter:on 
//# sourceMappingURL=Carbon.js.map