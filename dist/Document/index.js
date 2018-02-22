"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C_1 = require("../Vocabularies/C");
var LDP_1 = require("../Vocabularies/LDP");
var XSD_1 = require("../Vocabularies/XSD");
var factory_1 = require("./factory");
exports.Document = {
    TYPE: C_1.C.Document,
    SCHEMA: {
        "contains": {
            "@id": LDP_1.LDP.contains,
            "@container": "@set",
            "@type": "@id",
        },
        "members": {
            "@id": LDP_1.LDP.member,
            "@container": "@set",
            "@type": "@id",
        },
        "membershipResource": {
            "@id": LDP_1.LDP.membershipResource,
            "@type": "@id",
        },
        "isMemberOfRelation": {
            "@id": LDP_1.LDP.isMemberOfRelation,
            "@type": "@id",
        },
        "hasMemberRelation": {
            "@id": LDP_1.LDP.hasMemberRelation,
            "@type": "@id",
        },
        "insertedContentRelation": {
            "@id": LDP_1.LDP.insertedContentRelation,
            "@type": "@id",
        },
        "created": {
            "@id": C_1.C.created,
            "@type": XSD_1.XSD.dateTime,
        },
        "modified": {
            "@id": C_1.C.modified,
            "@type": XSD_1.XSD.dateTime,
        },
        "defaultInteractionModel": {
            "@id": C_1.C.defaultInteractionModel,
            "@type": "@id",
        },
        "accessPoints": {
            "@id": C_1.C.accessPoint,
            "@type": "@id",
            "@container": "@set",
        },
    },
    is: factory_1.isDocument,
    isDecorated: factory_1.isDecoratedDocument,
    create: factory_1.createDocument,
    createFrom: factory_1.createDocumentFrom,
    decorate: factory_1.decorateDocument,
};
exports.default = exports.Document;

//# sourceMappingURL=index.js.map
