"use strict";
var NS = require("./../NS");
var Pointer = require("./../Pointer");
var Resource = require("./../Resource");
var URI = require("./../RDF/URI");
exports.TICKETS_CONTAINER = "auth-tickets/";
exports.RDF_CLASS = NS.CS.Class.Ticket;
exports.SCHEMA = {
    "forURI": {
        "@id": NS.CS.Predicate.forIRI,
        "@type": "@id",
    },
    "expirationTime": {
        "@id": NS.CS.Predicate.expirationTime,
        "@type": NS.XSD.DataType.dateTime,
    },
    "ticketKey": {
        "@id": NS.CS.Predicate.ticketKey,
        "@type": NS.XSD.DataType.string,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.create = function (uri) {
        return Factory.createFrom(Resource.Factory.create(URI.Util.generateBNodeID()), uri);
    };
    Factory.createFrom = function (object, uri) {
        var ticket = object;
        ticket.forURI = Pointer.Factory.create(uri);
        ticket.types.push(exports.RDF_CLASS);
        return ticket;
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=Ticket.js.map
