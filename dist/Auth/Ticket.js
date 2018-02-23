"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var CS_1 = require("../Vocabularies/CS");
var XSD_1 = require("../Vocabularies/XSD");
var Pointer_1 = require("./../Pointer");
var URI = __importStar(require("./../RDF/URI"));
var Resource = __importStar(require("./../Resource"));
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
        return Factory.createFrom(Resource.Factory.create(URI.Util.generateBNodeID()), uri);
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
