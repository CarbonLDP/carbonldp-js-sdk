"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Errors_1 = require("./../Errors");
var NS = __importStar(require("./../NS"));
var Resource = __importStar(require("./../Resource"));
exports.RDF_CLASS = NS.CS.Class.UsernameAndPasswordCredentials;
exports.SCHEMA = {
    "username": {
        "@id": NS.CS.Predicate.username,
        "@type": NS.XSD.DataType.string,
    },
    "password": {
        "@id": NS.CS.Predicate.password,
        "@type": NS.XSD.DataType.string,
    },
};
var Factory = (function () {
    function Factory() {
    }
    Factory.create = function (username, password) {
        return Factory.createFrom({}, username, password);
    };
    Factory.createFrom = function (object, username, password) {
        var credentials = Resource.Factory.createFrom(object);
        if (!username)
            throw new Errors_1.IllegalArgumentError("The credentials username cannot be empty.");
        if (!password)
            throw new Errors_1.IllegalArgumentError("The credentials password cannot be empty.");
        credentials.addType(exports.RDF_CLASS);
        return Object.assign(credentials, {
            username: username,
            password: password,
        });
    };
    return Factory;
}());
exports.Factory = Factory;

//# sourceMappingURL=UsernameAndPasswordCredentials.js.map
