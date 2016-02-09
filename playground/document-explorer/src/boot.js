System.register(["angular2/platform/browser", "angular2/core", "angular2/common", "angular2/router", "angular2/http", "./AppComponent", "carbon/Carbon"], function(exports_1) {
    var browser_1, core_1, common_1, router_1, http_1, AppComponent_1, Carbon_1;
    var carbon;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (AppComponent_1_1) {
                AppComponent_1 = AppComponent_1_1;
            },
            function (Carbon_1_1) {
                Carbon_1 = Carbon_1_1;
            }],
        execute: function() {
            carbon = new Carbon_1.default();
            carbon.setSetting("domain", "local.carbonldp.com");
            carbon.extendObjectSchema({
                "acl": "http://www.w3.org/ns/auth/acl#",
                "api": "http://purl.org/linked-data/api/vocab#",
                "c": "https://carbonldp.com/ns/v1/platform#",
                "cs": "https://carbonldp.com/ns/v1/security#",
                "cp": "https://carbonldp.com/ns/v1/patch#",
                "cc": "http://creativecommons.org/ns#",
                "cert": "http://www.w3.org/ns/auth/cert#",
                "dbp": "http://dbpedia.org/property/",
                "dc": "http://purl.org/dc/terms/",
                "doap": "http://usefulinc.com/ns/doap#",
                "example": "http://example.org/ns#",
                "ex": "http://example.org/ns#",
                "exif": "http://www.w3.org/2003/12/exif/ns#",
                "fn": "http://www.w3.org/2005/xpath-functions#",
                "foaf": "http://xmlns.com/foaf/0.1/",
                "geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
                "geonames": "http://www.geonames.org/ontology#",
                "gr": "http://purl.org/goodrelations/v1#",
                "http": "http://www.w3.org/2006/http#",
                "ldp": "http://www.w3.org/ns/ldp#",
                "log": "http://www.w3.org/2000/10/swap/log#",
                "owl": "http://www.w3.org/2002/07/owl#",
                "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
                "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
                "rei": "http://www.w3.org/2004/06/rei#",
                "rsa": "http://www.w3.org/ns/auth/rsa#",
                "rss": "http://purl.org/rss/1.0/",
                "sd": "http://www.w3.org/ns/sparql-service-description#",
                "sfn": "http://www.w3.org/ns/sparql#",
                "sioc": "http://rdfs.org/sioc/ns#",
                "skos": "http://www.w3.org/2004/02/skos/core#",
                "swrc": "http://swrc.ontoware.org/ontology#",
                "types": "http://rdfs.org/sioc/types#",
                "vcard": "http://www.w3.org/2001/vcard-rdf/3.0#",
                "wot": "http://xmlns.com/wot/0.1/",
                "xhtml": "http://www.w3.org/1999/xhtml#",
                "xsd": "http://www.w3.org/2001/XMLSchema#"
            });
            browser_1.bootstrap(AppComponent_1.default, [
                common_1.FORM_PROVIDERS,
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                core_1.provide(router_1.APP_BASE_HREF, { useValue: "/" }),
                core_1.provide(Carbon_1.default, { useValue: carbon }),
            ]);
        }
    }
});
//# sourceMappingURL=boot.js.map