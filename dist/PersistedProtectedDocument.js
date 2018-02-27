"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Auth = __importStar(require("./Auth"));
var Errors_1 = require("./HTTP/Errors");
var PersistedDocument = __importStar(require("./PersistedDocument"));
var Utils = __importStar(require("./Utils"));
var CS_1 = require("./Vocabularies/CS");
var Factory = (function () {
    function Factory() {
    }
    Factory.hasClassProperties = function (object) {
        return Utils.isObject(object)
            && Utils.hasFunction(object, "getACL");
    };
    Factory.is = function (object) {
        return Factory.hasClassProperties(object)
            && PersistedDocument.Factory.is(object);
    };
    Factory.decorate = function (document, documents) {
        var persistedProtectedDocument = document;
        if (Factory.hasClassProperties(document))
            return persistedProtectedDocument;
        PersistedDocument.Factory.decorate(document, documents);
        Object.defineProperties(persistedProtectedDocument, {
            "getACL": {
                writable: false,
                enumerable: false,
                configurable: true,
                value: getACL,
            },
        });
        return persistedProtectedDocument;
    };
    return Factory;
}());
exports.Factory = Factory;
function getACL(requestOptions) {
    var protectedDocument = this;
    var aclPromise;
    if (protectedDocument.isResolved()) {
        aclPromise = Promise.resolve(protectedDocument.accessControlList);
    }
    else {
        aclPromise = protectedDocument.executeSELECTQuery("SELECT ?acl WHERE {\n\t\t\t<" + protectedDocument.id + "> <" + CS_1.CS.accessControlList + "> ?acl.\n\t\t}").then(function (_a) {
            var results = _a[0];
            return results.bindings[0].acl;
        });
    }
    return aclPromise.then(function (acl) {
        return protectedDocument._documents.get(acl.id, requestOptions);
    }).then(function (_a) {
        var acl = _a[0], response = _a[1];
        if (!acl.hasType(Auth.ACL.RDF_CLASS))
            throw new Errors_1.BadResponseError("The response does not contains a " + Auth.ACL.RDF_CLASS + " object.", response);
        return [acl, response];
    });
}

//# sourceMappingURL=PersistedProtectedDocument.js.map
