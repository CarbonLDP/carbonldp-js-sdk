"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var Pointer_1 = require("./../Pointer");
var URI_1 = require("./../RDF/URI");
var Resource_1 = require("./../Resource");
exports.TICKETS_CONTAINER = "auth-tickets/";
exports.RDF_CLASS = CS_1.CS.Ticket;
exports.SCHEMA = {
    "forURI": {
        "@id": CS_1.CS.forIRI,
        "@type": "@id",
    },
    "expirationTime": {
        "@id": CS_1.CS.expirationTime,
        "@type": XSD_1.XSD.dateTime,
    },
    "ticketKey": {
        "@id": CS_1.CS.ticketKey,
        "@type": XSD_1.XSD.string,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.create = function (uri) {
        return Factory.createFrom(Resource_1.Resource.create(URI_1.URI.generateBNodeID()), uri);
    };
    Factory.createFrom = function (object, uri) {
        var ticket = object;
        ticket.forURI = Pointer_1.Pointer.create(uri);
        ticket.types.push(exports.RDF_CLASS);
        return ticket;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Ticket.js.map
