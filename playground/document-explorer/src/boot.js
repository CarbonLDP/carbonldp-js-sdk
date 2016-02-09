import { bootstrap } from "angular2/platform/browser";
import { provide } from "angular2/core";
import { FORM_PROVIDERS } from "angular2/common";
import { ROUTER_PROVIDERS, APP_BASE_HREF } from "angular2/router";
import { HTTP_PROVIDERS } from "angular2/http";
import AppComponent from "./AppComponent";
import Carbon from "carbon/Carbon";
let carbon = new Carbon();
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
bootstrap(AppComponent, [
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: "/" }),
    provide(Carbon, { useValue: carbon }),
]);
//# sourceMappingURL=boot.js.map